import { Routes } from '@angular/router';
import { InscriptionFormComponent } from './components/inscription-form/inscription-form';

export const VISITOR_ROUTES: Routes = [
  { path: '', redirectTo: 'nouvelle', pathMatch: 'full' },
  { path: 'nouvelle', component: InscriptionFormComponent }
];
