import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-todostatus',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, FormsModule],
  templateUrl: './todostatus.component.html',
  styleUrls: ['./todostatus.component.scss']
})
export class TodoStatusComponent implements OnInit {
  todos: any[] = [];
  hasTodos: boolean = false;
  loading: boolean = true;
  userId: string | null = null;
  todoForm: FormGroup;

  constructor(private todoService: TodoService, private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      name: ['', Validators.required],
      completed: [false]
    });
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');

    if (this.userId) {
      this.todoService.getTodosById(this.userId).subscribe(
        (todos) => {
          this.todos = todos;
          this.hasTodos = todos.length > 0;
          this.loading = false;
        },
        (error) => {
          console.error('Error to find todos:', error);
          this.loading = false;
        }
      );
    } else {
      this.loading = false;
    }
  }
  addTodo(): void {
    if (this.todoForm.valid && this.userId) {
      const userId = Number(this.userId);
      const newTodo = {
        userId: Number(this.userId),
        name: this.todoForm.value.name,
        completed: this.todoForm.value.completed
      };

      this.todoService.createTodo(newTodo).subscribe(
        (todo) => {
          this.todos.push(todo);
          this.todoForm.reset({ completed: false });
        },
        (error) => {
          console.error('Error to create Todo:', error);
        }
      );
    }
  }
  deleteTodo(todoId: number): void {
    this.todoService.deleteTodo(todoId).subscribe(
      () => {
        this.todos = this.todos.filter(todo => todo.id !== todoId);
      },
      (error) => {
        console.error('Error deleting the whole:', error);
      }
    );
  }
}
