import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { JwtService } from '../../services/jwt.service';
import { FooterComponent } from '../../components/footer/footer.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, FooterComponent, MatProgressSpinnerModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private authService: AuthService,
    private jwtService: JwtService,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  onLogin() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.authService.login(this.loginForm.value).subscribe(
        (res) => {
          console.log('Login success:', res);
          const { token, userId } = res;
          this.jwtService.token = token;
          localStorage.setItem('userId', userId);
          this._router.navigateByUrl('/todo');
          this.loading = false;
        },
        (error) => {
          console.error('Error while logging in:', error);
          alert('Invalid credentials');
          this.loading = false;
        }
      );
    }
  }

  goToRegister() {
    this._router.navigate(['/register']);
  }
}
