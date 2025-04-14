import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { ExternalApiService } from '../external-api.service'
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { SocketserviceService } from '../socketservice.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  register: FormGroup;
  isLoginForm: boolean = true
  LoginUser:string=''
  constructor(public externalApi: ExternalApiService, public router: Router, private authService: AuthService, private socketService: SocketserviceService) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
    this.register = new FormGroup({
      username: new FormControl('', []),
      password: new FormControl('', []),
      email: new FormControl('', [])
    })
  }

  onSubmit() {

    if (this.loginForm.value) {
      console.log(this.loginForm.value)
      this.authService.login(this.loginForm.value).subscribe({
        next: res => {
          console.log(res)
          localStorage.setItem('token', res.token);
          localStorage.setItem('userId', res.user.id);
          localStorage.setItem('username', res.user.username); 
        
          // this.socketService.connect(res.user.id); 
          this.router.navigate(['/chat-panel']);

        },
        error: err => {
          console.log('error while login', err)
          alert(err.error?.error || 'Login failed')
        }
      });


    }
  }

  onRegister() {
    console.log(this.register.value)
    if (this.register.valid) {
      this.authService.register(this.register.value).subscribe({
        next: res => {
          this.isLoginForm = true
        },
        error: err => alert(err.error?.error || 'Registration failed')
      });
    }

  }

  toggleForm() {
    this.isLoginForm = !this.isLoginForm;
  }
  _v() {
    return this.loginForm.value;
  }
}
