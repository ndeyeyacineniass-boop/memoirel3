import { Routes } from '@angular/router';

export const assistantRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/dashboard/dashboard').then(m => m.AssistantDashboardComponent),
  }
];
