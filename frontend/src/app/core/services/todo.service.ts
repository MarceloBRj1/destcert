import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'http://localhost:3000';
  constructor(private http : HttpClient) { }

  getTodosById(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/todo/${userId}`);
  }
  getTodos(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }
  createTodo(todo: { userId: number; name: string; completed: boolean }): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/todo/${todo.userId}`, todo);
  }
  deleteTodo(todoId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/api/todo/${todoId}`);
  }
}
