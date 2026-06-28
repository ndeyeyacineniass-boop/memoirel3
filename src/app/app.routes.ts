import { Routes } from '@angular/router';
import { HomeComponent } from './features/visitor/components/home/home';
import { FormationsComponent } from './features/visitor/components/formations/formations';
import { NotFoundComponent } from './shared/components/not-found/not-found';

export const routes: Routes = [
  { path: '', redirectTo: '/visitor/home', pathMatch: 'full' },
  { 
    path: 'visitor', 
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'formations', component: FormationsComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  { path: 'home', redirectTo: '/visitor/home', pathMatch: 'full' }, // Compatibilité
  { 
    path: 'auth', 
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  { 
    path: 'inscription', 
    loadChildren: () => import('./features/visitor/visitor.routes').then(m => m.VISITOR_ROUTES)
  },
  { 
    path: 'student', 
    loadChildren: () => import('./features/student/student.routes').then(m => m.STUDENT_ROUTES)
  },
  { 
    path: 'teacher', 
    loadChildren: () => import('./features/teacher/teacher.routes').then(m => m.teacherRoutes)
  },
  { 
    path: 'assistant', 
    loadChildren: () => import('./features/assistant/assistant.routes').then(m => m.assistantRoutes)
  },
  { 
    path: 'comptable', 
    loadChildren: () => import('./features/comptable/comptable.routes').then(m => m.comptableRoutes)
  },
  { 
    path: 'admin', 
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES)
  },
  { path: '**', component: NotFoundComponent }
];
