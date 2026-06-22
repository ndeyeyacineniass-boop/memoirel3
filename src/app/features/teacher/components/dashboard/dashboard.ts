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
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class TeacherDashboardComponent implements OnInit {
  activeTab = 'evaluations';
  showNewEvaluationModal = false;
  newEvaluationForm: FormGroup;

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
    },
    {
      id: '3',
      type: 'Contrôle',
      formationId: '2',
      titre: 'Contrôle JavaScript',
      date: '2024-06-10',
      duree: '60',
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
    },
    {
      id: '3',
      etudiantId: 'student2',
      evaluationId: '3',
      valeur: 18,
      commentaire: 'Parfait, excellent niveau',
      datePublication: '2024-06-12'
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
    },
    {
      id: 'student2',
      nom: 'Diallo',
      prenom: 'Mamadou',
      email: 'mamadou.diallo@isi.edu.sn',
      telephone: '+221 77 234 56 78',
      dateNaissance: '1999-08-22'
    }
  ];

  constructor(private fb: FormBuilder, private router: Router) {
    this.newEvaluationForm = this.fb.group({
      type: ['', Validators.required],
      formationId: ['', Validators.required],
      titre: ['', Validators.required],
      date: ['', Validators.required],
      duree: [''],
      coefficient: ['']
    });
  }

  ngOnInit(): void {
    // Initialisation
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  openNewEvaluationModal(): void {
    this.showNewEvaluationModal = true;
  }

  closeNewEvaluationModal(): void {
    this.showNewEvaluationModal = false;
    this.newEvaluationForm.reset();
  }

  createEvaluation(): void {
    if (this.newEvaluationForm.valid) {
      const newEvaluation = this.newEvaluationForm.value;
      alert(`Évaluation créée : ${newEvaluation.titre}`);
      this.closeNewEvaluationModal();
    } else {
      alert('Veuillez remplir tous les champs obligatoires.');
    }
  }

  publishResults(): void {
    alert('Les résultats ont été publiés avec succès !');
  }

  getFormationName(formationId: string): string {
    return this.formations.find(f => f.id === formationId)?.nom || 'Formation inconnue';
  }

  getEtudiantName(etudiantId: string): string {
    const etudiant = this.etudiants.find(e => e.id === etudiantId);
    return etudiant ? `${etudiant.prenom} ${etudiant.nom}` : 'Étudiant inconnu';
  }

  calculateStats(): any {
    const moyenne = this.notes.reduce((sum, note) => sum + note.valeur, 0) / this.notes.length;
    const noteMax = Math.max(...this.notes.map(n => n.valeur));
    const noteMin = Math.min(...this.notes.map(n => n.valeur));
    const tauxReussite = (this.notes.filter(n => n.valeur >= 10).length / this.notes.length) * 100;

    return { moyenne, noteMax, noteMin, tauxReussite };
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('fr-FR');
  }

  getEvaluationTypeIcon(type: string): string {
    switch (type) {
      case 'Examen': return '📝';
      case 'TP': return '💻';
      case 'Contrôle': return '📋';
      case 'Projet': return '🚀';
      default: return '📚';
    }
  }

  getFormationStats(formationId: string): any {
    const formationEvaluations = this.evaluations.filter(e => e.formationId === formationId);
    const formationNotes = this.notes.filter(note => 
      this.evaluations.find(evaluation => evaluation.id === note.evaluationId)?.formationId === formationId
    );
    
    const moyenne = formationNotes.length > 0 
      ? formationNotes.reduce((sum, note) => sum + note.valeur, 0) / formationNotes.length 
      : 0;
    const reussite = formationNotes.length > 0 
      ? (formationNotes.filter(note => note.valeur >= 10).length / formationNotes.length) * 100 
      : 0;
    
    return {
      evaluations: formationEvaluations.length,
      notes: formationNotes.length,
      moyenne,
      reussite
    };
  }

  // Méthodes helper pour le template
  getEvaluationTitle(evaluationId: string): string {
    const evaluation = this.evaluations.find(e => e.id === evaluationId);
    return evaluation?.titre || 'Évaluation inconnue';
  }

  getEvaluationFormationId(evaluationId: string): string {
    const evaluation = this.evaluations.find(e => e.id === evaluationId);
    return evaluation?.formationId || '';
  }
}
