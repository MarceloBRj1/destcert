import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { CreateUserRequestDto } from '../../interfaces/user.interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule, CommonModule, AsyncPipe],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private userService: UserService,
  ) {}

  ngOnInit(): void {}

  onRegister(event: SubmitEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const username = form.elements.namedItem('username') as HTMLInputElement;
    const email = form.elements.namedItem('email') as HTMLInputElement;
    const password = form.elements.namedItem('password') as HTMLInputElement;

    const body: CreateUserRequestDto = {
      username: username.value,
      email: email.value,
      password: password.value,
    };

    this.userService
      .createUser(body)
      .subscribe((res) =>
        this._router
          .navigate(['login'])
          .then(() =>
            alert(
              `Congratulations, ${res.name}. You have signed up successfully. Wish you have a nice experience.`
            )
          )
      );
  }

}
