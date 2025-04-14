import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SocketserviceService } from '../socketservice.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-chat-panel',
  templateUrl: './chat-panel.component.html',
  styleUrls: ['./chat-panel.component.css']
})
export class ChatPanelComponent {
  message = '';
  messagesMap: { [userId: string]: any[] } = {};
  selectedUser: any = null;
  users: any = { users: [] };
  loginuserID: any = null;
  loginuserName: any = null;
  typingUsers: Set<string> = new Set(); // to track who's typing
  typing: boolean = false;
  typingUserId: any = null;

  constructor(
    private socketService: SocketserviceService,
    private router: Router,
    private authservice: AuthService
  ) { }

  ngOnInit(): void {
    this.loginuserID = localStorage.getItem('userId');
    this.loginuserName = localStorage.getItem('username');
    this.socketService.connect(this.loginuserID);
    this.loadUsers();

    this.socketService.onMessage((msg) => {

      const senderId = msg.senderId;
      if (!this.messagesMap[senderId]) {
        this.messagesMap[senderId] = [];
      }

      this.messagesMap[senderId].push({ ...msg, type: 'received' });
    });

    this.socketService.onTyping((data) => {
      if (this.selectedUser?._id === data.senderId) {
        this.typingUsers.add(data.senderId);
        this.typing = true;
        console.log("this.typingUsers", this.typingUsers)
        setTimeout(() => this.typingUsers.delete(data.senderId), 3000);
      }
    });

    this.socketService.onStopTyping().subscribe(() => {
      this.typing = false;
      this.typingUserId = null;
    });
  }

  sendMessage() {
    this.typing = false
    if (!this.selectedUser || !this.message.trim()) return;

    const payload = {
      senderId: this.loginuserID,
      receiverId: this.selectedUser._id,
      message: this.message
    };

    if (!this.messagesMap[this.selectedUser._id]) {
      this.messagesMap[this.selectedUser._id] = [];
    }

    this.messagesMap[this.selectedUser._id].push({ ...payload, type: 'sent' });
    this.socketService.sendMessage(payload);
    this.message = '';
    
  }

  onTyping() {
    if (!this.selectedUser) return;
    debugger
    this.socketService.sendTyping({
      senderId: this.loginuserID,
      receiverId: this.selectedUser._id
    });
  }

  openChat(user: any) {
    this.selectedUser = user;
    this.authservice.getMessagesBetweenUsers(this.loginuserID, user._id).subscribe((messages: any[]) => {
      this.messagesMap[user._id] = messages.map(msg => ({
        ...msg,
        type: msg.senderId === this.loginuserID ? 'sent' : 'received'
      }));
    });
  }

  loadUsers() {
    this.authservice.getAllUsers().subscribe({
      next: (res: any) => {
        this.users.users = res.users
          .filter((u: any) => u._id !== this.loginuserID);
      },
      error: (err: any) => console.log('Failed to load users', err)
    });
  }

  backToLogin() {
    this.router.navigate(['/login']);
  }

  get currentMessages() {
    return this.selectedUser ? this.messagesMap[this.selectedUser._id] || [] : [];
  }

  isTyping(): boolean {
    return this.selectedUser && this.typingUsers.has(this.selectedUser._id);
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }
}
