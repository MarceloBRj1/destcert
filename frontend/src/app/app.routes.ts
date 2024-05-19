import { Routes } from '@angular/router';
import { RegisterComponent } from './core/pages/register/register.component';
import { MasterComponent } from './core/layouts/master/master.component';
import { TodoComponent } from './core/pages/todo/todo.component';
import { LoginComponent } from './core/pages/login/login.component';



export const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full'
  },
  {
    path: 'todo',
    component: MasterComponent,
    children: [
      {
        path: 'todo',
        component: MasterComponent
      }
    ]
  }
];
