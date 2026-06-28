import { Routes } from '@angular/router';

export const comptableRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/dashboard/dashboard').then(m => m.ComptableDashboardComponent),
  }
];
