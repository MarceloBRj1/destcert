import { Routes } from '@angular/router';
import { RegisterComponent } from './core/pages/register/register.component';
import { MasterComponent } from './core/layouts/master/master.component';
import { LoginComponent } from './core/pages/login/login.component';
import { authGuard } from './core/guards/auth.guard';



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
    canActivate: [authGuard],
  }
];
