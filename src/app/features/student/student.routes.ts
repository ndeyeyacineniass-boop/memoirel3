import { Routes } from '@angular/router';

export const STUDENT_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/dashboard/dashboard-new').then(m => m.StudentDashboardNewComponent),
  }
];
