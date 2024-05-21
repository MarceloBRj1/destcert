import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private authService: AuthService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  ngOnInit(): void {}

  onLogin() {
    this.authService.login(this.loginForm.value).subscribe(
      (res) => {
        console.log('Login success:', res);
        const { token, userId } = res;
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        this._router.navigateByUrl('/todo');
      },
      (error) => {
        console.error('Error while logging in:', error);
      }
    );
  }
}
