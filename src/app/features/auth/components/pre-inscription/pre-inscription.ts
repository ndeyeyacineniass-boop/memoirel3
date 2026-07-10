import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

interface PreInscriptionData {
  genre: 'Mme' | 'M' | 'Mlle';
  nom: string;
  prenom: string;
  lieuNaissance: string;
  dateNaissance: string;
  adresse: string;
  email: string;
  telephone: string;
  paysOrigine: string;
  niveauEtude: string;
  baccalaureat: 'Serie S' | 'Serie G' | 'Serie L' | 'Autres';
  niveauIntegrer: 'Licence 1' | 'Licence 2' | 'Licence 3' | 'Master 1' | 'Master 2' | 'Doctorat';
  departement: 'Genie Informatique' | 'Reseaux et Systemes' | 'Gestion et Management' | 'Intelligence Artificielle et Ingenierie de donnees';
  captcha: string;
}

@Component({
  selector: 'app-pre-inscription',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './pre-inscription.html',
  styleUrls: ['./pre-inscription.css']
})
export class PreInscriptionComponent {
  currentStep = 1;
  totalSteps = 5;
  
  formData: PreInscriptionData = {
    genre: 'M',
    nom: '',
    prenom: '',
    lieuNaissance: '',
    dateNaissance: '',
    adresse: '',
    email: '',
    telephone: '',
    paysOrigine: '',
    niveauEtude: '',
    baccalaureat: 'Serie S',
    niveauIntegrer: 'Licence 1',
    departement: 'Genie Informatique',
    captcha: ''
  };

  captchaQuestion = '8 + 7 = ?';
  captchaAnswer = '15';
  
  constructor(private router: Router) {}

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  canProceedToNext(): boolean {
    switch (this.currentStep) {
      case 1: // Informations personnelles
        return !!this.formData.nom && !!this.formData.prenom && !!this.formData.lieuNaissance && !!this.formData.dateNaissance;
      case 2: // Contact
        return !!this.formData.adresse && !!this.formData.email && !!this.formData.telephone && !!this.formData.paysOrigine;
      case 3: // Études
        return !!this.formData.niveauEtude;
      case 4: // Choix académiques
        return true; // Ces champs ont des valeurs par défaut
      case 5: // Captcha
        return !!this.formData.captcha;
      default:
        return false;
    }
  }

  onSubmit() {
    // Validation du captcha
    if (this.formData.captcha !== this.captchaAnswer) {
      alert('Veuillez résoudre correctement le captcha');
      return;
    }

    // Validation des champs requis
    if (!this.isFormValid()) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Simulation de l'envoi
    console.log('Données de pré-inscription:', this.formData);
    alert('Votre demande de pré-inscription a été envoyée avec succès !');
    
    // Redirection vers la page d'accueil
    this.router.navigate(['/visitor/home']);
  }

  private isFormValid(): boolean {
    return !!(
      this.formData.nom &&
      this.formData.prenom &&
      this.formData.lieuNaissance &&
      this.formData.dateNaissance &&
      this.formData.adresse &&
      this.formData.email &&
      this.formData.telephone &&
      this.formData.paysOrigine
    );
  }

  onCancel() {
    this.router.navigate(['/visitor/home']);
  }
}
