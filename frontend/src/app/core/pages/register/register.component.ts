import { HttpClient } from '@angular/common/http';
import { Component} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CreateUserRequestDto, CreateUserResponseDto } from '../../interfaces/user.interface';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private http: HttpClient, private _router: Router) {}

  registerObj = {
    username: '',
    email: '',
    password: '',
  }


  onRegister(event: SubmitEvent) {
    this.http.post<CreateUserResponseDto>('http://localhost:3000/api/register', this.registerObj).subscribe((res) => {
      console.log(res)
    })
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const username = form.elements.namedItem('username') as HTMLInputElement;
    const email = form.elements.namedItem('email') as HTMLInputElement;
    const password = form.elements.namedItem('password') as HTMLInputElement;

    const body: CreateUserRequestDto = {
      name: username.value,
      email: email.value,
      password: password.value,
    }
    this._router.navigate(['login']);
  }

}
