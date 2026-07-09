import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Formation {
  id: string;
  nom: string;
  description: string;
  niveau: string;
  duree: string;
  prix: number;
}

interface PreInscriptionData {
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  motivation: string;
}

@Component({
  selector: 'app-formations',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './formations.html',
  styleUrls: ['./formations.css']
})
export class FormationsComponent {
  showPreInscriptionModal = false;
  selectedFormationId: string | null = null;
  
  preInscriptionData: PreInscriptionData = {
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    motivation: ''
  };

  formations: Formation[] = [
    {
      id: '1',
      nom: 'Licence en Informatique',
      description: 'Formation complète en informatique : programmation, bases de données, réseaux et génie logiciel.',
      niveau: 'Licence',
      duree: '3 ans',
      prix: 750000
    },
    {
      id: '2',
      nom: 'Master Réseaux & Sécurité',
      description: 'Spécialisation avancée en administration réseaux, cybersécurité et infrastructures IT.',
      niveau: 'Master',
      duree: '2 ans',
      prix: 900000
    },
    {
      id: '3',
      nom: 'Développement Web & Mobile',
      description: 'Formation intensive en développement d\'applications web et mobiles modernes.',
      niveau: 'Certification',
      duree: '18 mois',
      prix: 650000
    },
    {
      id: '4',
      nom: 'Intelligence Artificielle',
      description: 'Formation spécialisée en IA, machine learning et data science.',
      niveau: 'Master',
      duree: '2 ans',
      prix: 1000000
    },
    {
      id: '5',
      nom: 'Maintenance Informatique',
      description: 'Formation pratique en maintenance et réparation de systèmes informatiques.',
      niveau: 'Certification',
      duree: '1 an',
      prix: 450000
    }
  ];

  openPreInscription(formationId: string): void {
    this.selectedFormationId = formationId;
    this.showPreInscriptionModal = true;
  }

  closePreInscription(): void {
    this.showPreInscriptionModal = false;
    this.selectedFormationId = null;
    this.resetForm();
  }

  handlePreInscription(): void {
    if (this.preInscriptionData.nom && this.preInscriptionData.prenom && this.preInscriptionData.email) {
      alert('Pré-inscription envoyée ! Vous recevrez une réponse sous 48h.');
      this.closePreInscription();
    } else {
      alert('Veuillez remplir tous les champs obligatoires.');
    }
  }

  getSelectedFormationName(): string {
    if (!this.selectedFormationId) return '';
    const formation = this.formations.find(f => f.id === this.selectedFormationId);
    return formation ? formation.nom : '';
  }

  private resetForm(): void {
    this.preInscriptionData = {
      nom: '',
      prenom: '',
      email: '',
      telephone: '',
      motivation: ''
    };
  }
}
