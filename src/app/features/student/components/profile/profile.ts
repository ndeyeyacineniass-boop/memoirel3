import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
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
    MatTabsModule,
    MatDividerModule,
    MatChipsModule,
    MatProgressBarModule,
    MatSnackBarModule
  ],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  passwordForm!: FormGroup;
  activeTab = 0;
  loading = false;
  avatarPreview: string | null = null;

  // Données simulées du profil
  profileData = {
    id: 1,
    nom: 'Dupont',
    prenom: 'Jean',
    email: 'jean.dupont@email.com',
    telephone: '+33 6 12 34 56 78',
    dateNaissance: new Date('1995-03-15'),
    adresse: '123 Rue de la Paix',
    ville: 'Paris',
    pays: 'France',
    codePostal: '75001',
    role: 'STUDENT',
    bio: 'Étudiant passionné par le développement web et les nouvelles technologies.',
    specialites: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
    avatar: null,
    derniereConnexion: new Date('2024-01-15T10:30:00'),
    dateInscription: new Date('2023-09-01')
  };

  // Données académiques
  academicData = {
    averageGrade: 16.5,
    totalCredits: 120,
    completedCourses: 24
  };

  // Statistiques du profil
  profileStats = [
    {
      label: 'Cours suivis',
      value: '24',
      icon: 'school',
      color: 'primary'
    },
    {
      label: 'Devoirs rendus',
      value: '18',
      icon: 'assignment',
      color: 'accent'
    },
    {
      label: 'Moyenne générale',
      value: '16.5/20',
      icon: 'star',
      color: 'warn'
    },
    {
      label: 'Heures de formation',
      value: '156h',
      icon: 'schedule',
      color: 'primary'
    }
  ];

  // Historique des connexions
  connectionHistory = [
    {
      date: new Date('2024-01-15T10:30:00'),
      ip: '192.168.1.100',
      device: 'Chrome sur Windows',
      location: 'Paris, France'
    },
    {
      date: new Date('2024-01-14T15:45:00'),
      ip: '192.168.1.100',
      device: 'Chrome sur Windows',
      location: 'Paris, France'
    },
    {
      date: new Date('2024-01-13T09:20:00'),
      ip: '10.0.0.50',
      device: 'Safari sur iPhone',
      location: 'Paris, France'
    }
  ];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.initializeForms();
  }

  ngOnInit(): void {
    this.loadProfileData();
  }

  private initializeForms(): void {
    // Formulaire principal du profil
    this.profileForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required, Validators.pattern(/^[0-9+\-\s()]+$/)]],
      dateNaissance: ['', Validators.required],
      adresse: ['', Validators.required],
      ville: ['', Validators.required],
      pays: ['', Validators.required],
      codePostal: ['', Validators.required],
      bio: ['', Validators.maxLength(500)],
      specialites: [[]]
    });

    // Formulaire de changement de mot de passe
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  private passwordMatchValidator(group: FormGroup): {[key: string]: any} | null {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { 'passwordMismatch': true };
  }

  private loadProfileData(): void {
    this.profileForm.patchValue({
      nom: this.profileData.nom,
      prenom: this.profileData.prenom,
      email: this.profileData.email,
      telephone: this.profileData.telephone,
      dateNaissance: this.profileData.dateNaissance,
      adresse: this.profileData.adresse,
      ville: this.profileData.ville,
      pays: this.profileData.pays,
      codePostal: this.profileData.codePostal,
      bio: this.profileData.bio,
      specialites: [...this.profileData.specialites]
    });
  }

  onProfileSubmit(): void {
    if (this.profileForm.valid) {
      this.loading = true;
      
      // Simulation de sauvegarde
      setTimeout(() => {
        this.loading = false;
        this.snackBar.open('Profil mis à jour avec succès !', 'Fermer', {
          duration: 3000
        });
      }, 1500);
    }
  }

  onPasswordSubmit(): void {
    if (this.passwordForm.valid) {
      this.loading = true;
      
      // Simulation de changement de mot de passe
      setTimeout(() => {
        this.loading = false;
        this.passwordForm.reset();
        this.snackBar.open('Mot de passe modifié avec succès !', 'Fermer', {
          duration: 3000
        });
      }, 1500);
    }
  }

  onAvatarChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.avatarPreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeSpecialite(specialite: string): void {
    const specialites = this.profileForm.get('specialites')?.value || [];
    const index = specialites.indexOf(specialite);
    if (index >= 0) {
      specialites.splice(index, 1);
      this.profileForm.patchValue({ specialites });
    }
  }

  addSpecialite(event: any): void {
    const value = event.target.value.trim();
    if (value && !this.profileForm.get('specialites')?.value?.includes(value)) {
      const specialites = [...(this.profileForm.get('specialites')?.value || []), value];
      this.profileForm.patchValue({ specialites });
      event.target.value = '';
    }
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  formatDateTime(date: Date): string {
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getInitials(): string {
    return `${this.profileData.prenom.charAt(0)}${this.profileData.nom.charAt(0)}`.toUpperCase();
  }

  getRoleLabel(role: string): string {
    switch (role) {
      case 'STUDENT': return 'Étudiant';
      case 'TEACHER': return 'Enseignant';
      case 'ADMIN': return 'Administrateur';
      case 'VISITOR': return 'Visiteur';
      default: return role;
    }
  }

  getDaysSinceRegistration(): number {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - this.profileData.dateInscription.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
}
