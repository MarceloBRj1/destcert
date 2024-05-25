import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUserRequestDto, CreateUserResponseDto } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api';


  constructor(
    private http: HttpClient

  ) { }


  createUser(body: CreateUserRequestDto) {
    return this.http.post<CreateUserResponseDto>(`http://localhost:3000/api/register`, body);
  }
}
