import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { PreInscriptionComponent } from './components/pre-inscription/pre-inscription';

export const AUTH_ROUTES: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'pre-inscription', component: PreInscriptionComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
