import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './inscription-form.html',
  styleUrls: ['./inscription-form.scss']
})
export class InscriptionFormComponent implements OnInit {
  inscriptionForm: FormGroup;
  currentStep = 0;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.inscriptionForm = this.fb.group({
      // Informations personnelles
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      dateNaissance: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s()]+$/)]],
      adresse: ['', Validators.required],
      ville: ['', Validators.required],
      pays: ['', Validators.required],
      codePostal: ['', Validators.required],
      
      // Formation souhaitée
      formationId: ['', Validators.required],
      
      // Documents
      documents: this.fb.array([]),
      
      // Conditions
      accepteConditions: [false, Validators.requiredTrue],
      accepteNewsletter: [false]
    });
  }

  ngOnInit(): void {
    // Initialisation du composant
  }

  onSubmit(): void {
    if (this.inscriptionForm.valid) {
      this.loading = true;
      
      // Simulation d'envoi
      setTimeout(() => {
        this.loading = false;
        // Redirection vers la page de confirmation
        this.router.navigate(['/inscription/confirmation']);
      }, 2000);
    }
  }

  nextStep(): void {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  goToStep(step: number): void {
    this.currentStep = step;
  }

  isStepValid(step: number): boolean {
    switch (step) {
      case 0:
        return (this.inscriptionForm.get('nom')?.valid ?? false) && 
               (this.inscriptionForm.get('prenom')?.valid ?? false) &&
               (this.inscriptionForm.get('dateNaissance')?.valid ?? false) &&
               (this.inscriptionForm.get('email')?.valid ?? false) &&
               (this.inscriptionForm.get('telephone')?.valid ?? false);
      case 1:
        return (this.inscriptionForm.get('adresse')?.valid ?? false) &&
               (this.inscriptionForm.get('ville')?.valid ?? false) &&
               (this.inscriptionForm.get('pays')?.valid ?? false) &&
               (this.inscriptionForm.get('codePostal')?.valid ?? false);
      case 2:
        return this.inscriptionForm.get('formationId')?.valid ?? false;
      case 3:
        return this.inscriptionForm.get('accepteConditions')?.valid ?? false;
      default:
        return false;
    }
  }
}
