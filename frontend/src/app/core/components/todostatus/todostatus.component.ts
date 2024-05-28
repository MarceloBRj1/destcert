import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-todostatus',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, FormsModule,MatProgressSpinnerModule],
  templateUrl: './todostatus.component.html',
  styleUrls: ['./todostatus.component.scss']
})
export class TodoStatusComponent implements OnInit {
  todos: any[] = [];
  filteredTodos: any[] = [];
  hasTodos: boolean = false;
  loading: boolean = true;
  userId: string | null = null;
  todoForm: FormGroup;
  editTodoForm: FormGroup;
  searchTerm: string = '';
  showEditForm: boolean = false;
  selectedTodo: any = null;

  constructor(private todoService: TodoService, private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      name: ['', Validators.required],
      completed: [false]
    });
    this.editTodoForm = this.fb.group({
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
          this.filteredTodos = todos;
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
      this.filterTodos();
      this.todoService.createTodo(newTodo).subscribe(
        (todo) => {
          this.todos.push(todo);
          this.todoForm.reset({ completed: false });
          this.filterTodos();
          this.hasTodos = true;
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
        this.filterTodos();
      },
      (error) => {
        console.error('Error deleting the whole:', error);
      }
    );
  }
  editTodo(todo: any): void {
    this.selectedTodo = todo;
    this.editTodoForm.patchValue({
      name: todo.name,
      completed: todo.completed
    });
    this.showEditForm = true;
  }
  updateTodo(): void {
    if (this.editTodoForm.valid && this.selectedTodo) {
      const todoId = this.selectedTodo.id;
      const { name, completed } = this.editTodoForm.value;
      this.todoService.updateTodo(todoId, { name, completed }).subscribe(
        (updatedTodo) => {
          const index = this.todos.findIndex(todo => todo.id === todoId);
          if (index !== -1) {
            this.todos[index] = updatedTodo;
          }
          this.filterTodos();
          this.cancelEdit();
        },
        (error) => {
          console.error('Error updating Todo:', error);
        }
      );
    }
}
  cancelEdit(): void {
    this.showEditForm = false;
    this.selectedTodo = null;
    this.editTodoForm.reset();
  }
  filterTodos(): void {
    if (this.searchTerm) {
      this.filteredTodos = this.todos.filter(todo =>
        todo.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredTodos = this.todos;
    }
  }
}
