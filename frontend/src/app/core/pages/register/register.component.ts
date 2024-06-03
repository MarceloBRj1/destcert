import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { CreateUserRequestDto } from '../../interfaces/user.interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, AsyncPipe],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private userService: UserService,
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  onRegister(event: SubmitEvent) {
    event.preventDefault();
    if (this.registerForm.valid) {
      const body: CreateUserRequestDto = this.registerForm.value;

      this.userService.createUser(body).subscribe((res) => {
        this._router.navigate(['login']).then(() => {
          alert(`Congratulations, ${res.name}. You have signed up successfully. Wish you have a nice experience.`);
        });
      }, (error) => {
        console.error('Error during registration:', error);
        alert('Registration failed. Please try again.');
      });
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }
}
