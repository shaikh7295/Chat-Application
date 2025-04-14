import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketserviceService {
  private readonly SERVER_URL = 'http://localhost:5001';
  constructor() { }
  socket: any


  connect(userId: string) {
    this.socket = io(this.SERVER_URL, {
      query: { userId }
    });

    this.socket.on('connect', () => {
      console.log('Connected to socket server');
    });
  }

  sendMessage(data: any) {
    debugger
    this.socket.emit('message:send', data);
  }

  onMessage(callback: (data: any) => void) {
    debugger
    this.socket.on('message:receive', callback);
  }

  sendTyping(data: any) {
    debugger
    this.socket.emit('user:typing', data);
  }

  onTyping(callback: (data: any) => void) {
    this.socket.on('user:typing', callback);
  }

  acknowledgeDelivered(messageId: string) {
    this.socket.emit('message:delivered', messageId);
  }
  emitTyping(senderId: string, receiverId: string) {
    this.socket.emit('user:typing', { senderId, receiverId });
  }

  emitStopTyping(senderId: string, receiverId: string) {
    this.socket.emit('user:stopTyping', { senderId, receiverId });
  }

  onStopTyping() {
    return this.socket.fromEvent('user:stopTyping');
  }


  acknowledgeRead(messageId: string) {
    this.socket.emit('message:read', messageId);
  }

  disconnect() {
    if (this.socket) this.socket.disconnect();
  }
}
