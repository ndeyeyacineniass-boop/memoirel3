import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Interfaces
interface Formation {
  id: string;
  nom: string;
  description: string;
  duree: string;
  niveau: string;
  prix: number;
}

interface Inscription {
  id: string;
  etudiantId: string;
  formationId: string;
  dateInscription: string;
  statut: string;
}

interface Evaluation {
  id: string;
  type: string;
  formationId: string;
  titre: string;
  date: string;
  duree: string;
  coefficient: number;
}

interface Note {
  id: string;
  etudiantId: string;
  evaluationId: string;
  valeur: number;
  commentaire?: string;
  datePublication: string;
}

interface Etudiant {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  dateNaissance: string;
}

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class StudentDashboardComponent implements OnInit {
  activeTab = 'inscriptions';
  reclamationMotif = '';
  reclamationForm: FormGroup;
  showReclamation = false;
  selectedNoteId = '';

  // Données simulées
  formations: Formation[] = [
    {
      id: '1',
      nom: 'Intelligence Artificielle',
      description: 'Formation complète en IA et Machine Learning',
      duree: '2 ans',
      niveau: 'Master',
      prix: 750000
    },
    {
      id: '2',
      nom: 'Développement Web Full Stack',
      description: 'Maîtrisez le développement web moderne',
      duree: '1 an',
      niveau: 'Licence',
      prix: 500000
    },
    {
      id: '3',
      nom: 'Cybersécurité',
      description: 'Protection des systèmes informatiques',
      duree: '1.5 ans',
      niveau: 'Master',
      prix: 650000
    }
  ];

  inscriptions: Inscription[] = [
    {
      id: '1',
      etudiantId: 'student1',
      formationId: '1',
      dateInscription: '2024-01-15',
      statut: 'confirmée'
    },
    {
      id: '2',
      etudiantId: 'student1',
      formationId: '2',
      dateInscription: '2024-02-20',
      statut: 'en attente'
    }
  ];

  evaluations: Evaluation[] = [
    {
      id: '1',
      type: 'Examen',
      formationId: '1',
      titre: 'Examen Final IA',
      date: '2024-06-15',
      duree: '120',
      coefficient: 2
    },
    {
      id: '2',
      type: 'TP',
      formationId: '1',
      titre: 'TP Machine Learning',
      date: '2024-05-20',
      duree: '180',
      coefficient: 1
    }
  ];

  notes: Note[] = [
    {
      id: '1',
      etudiantId: 'student1',
      evaluationId: '1',
      valeur: 16,
      commentaire: 'Excellent travail, très bonne compréhension des concepts',
      datePublication: '2024-06-20'
    },
    {
      id: '2',
      etudiantId: 'student1',
      evaluationId: '2',
      valeur: 14,
      commentaire: 'Bon travail, quelques améliorations possibles',
      datePublication: '2024-05-25'
    }
  ];

  etudiants: Etudiant[] = [
    {
      id: 'student1',
      nom: 'Diouf',
      prenom: 'Awa',
      email: 'awa.diouf@isi.edu.sn',
      telephone: '+221 77 123 45 67',
      dateNaissance: '2000-05-15'
    }
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.reclamationForm = this.fb.group({
      motif: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Initialisation
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  getFormationName(formationId: string): string {
    return this.formations.find(f => f.id === formationId)?.nom || 'Formation inconnue';
  }

  getEvaluationName(evaluationId: string): string {
    return this.evaluations.find(e => e.id === evaluationId)?.titre || 'Évaluation inconnue';
  }

  getStatutColor(statut: string): string {
    switch (statut) {
      case 'confirmée': return 'success';
      case 'en attente': return 'warning';
      case 'annulée': return 'danger';
      default: return 'secondary';
    }
  }

  getStatutMessage(statut: string): string {
    switch (statut) {
      case 'en attente': return 'En cours de traitement par l\'administration';
      case 'confirmée': return 'Inscription validée - Vous pouvez commencer les cours';
      case 'annulée': return 'Inscription annulée - Contactez l\'administration';
      default: return '';
    }
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('fr-FR');
  }

  handleReclamation(noteId: string): void {
    if (this.reclamationForm.valid) {
      const motif = this.reclamationForm.get('motif')?.value;
      alert(`Réclamation envoyée pour la note ${noteId}. Motif: ${motif}`);
      this.reclamationForm.reset();
    } else {
      alert('Veuillez expliquer le motif de votre réclamation.');
    }
  }

  showReclamationModal(noteId: string): void {
    this.selectedNoteId = noteId;
    this.showReclamation = true;
  }

  closeReclamationModal(): void {
    this.showReclamation = false;
    this.selectedNoteId = '';
    this.reclamationForm.reset();
  }

  getStudentInscriptions(): Inscription[] {
    return this.inscriptions.filter(i => i.etudiantId === 'student1');
  }

  getStudentNotes(): Note[] {
    return this.notes.filter(n => n.etudiantId === 'student1');
  }

  getCurrentStudent(): Etudiant | undefined {
    return this.etudiants.find(e => e.id === 'student1');
  }
}
