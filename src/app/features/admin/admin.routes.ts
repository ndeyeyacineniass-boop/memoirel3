import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/dashboard/dashboard';

export const ADMIN_ROUTES: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: AdminDashboardComponent }
];
