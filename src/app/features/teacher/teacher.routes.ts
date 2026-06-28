import { Routes } from '@angular/router';

export const teacherRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/dashboard/dashboard-new').then(m => m.TeacherDashboardNewComponent),
  }
];
