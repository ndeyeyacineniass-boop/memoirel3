import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminHeaderComponent } from '../../../admin/components/header/header';

interface Evaluation {
  id: string;
  titre: string;
  formationId: string;
  type: string;
  date: string;
  heure?: string;
  duree: number;
  coefficient: number;
  statut: string;
  instructions?: string;
}

interface Formation {
  id: string;
  nom: string;
}

interface Student {
  id: string;
  nom: string;
  prenom: string;
  formationId: string;
  note?: number;
  commentaire?: string;
}

interface FormationStat {
  formationName: string;
  evaluations: number;
  notesSaisies: number;
  moyenne: number;
  noteMax: number;
  noteMin: number;
  tauxReussite: number;
}

@Component({
  selector: 'app-teacher-dashboard-new',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AdminHeaderComponent
  ],
  templateUrl: './dashboard-new.html',
  styleUrls: ['./dashboard-new.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TeacherDashboardNewComponent implements OnInit {
  activeTab = 'dashboard';
  showNewEvaluationModal = false;
  selectedEvaluationForGrades = '';
  
  // Propriétés pour le header
  currentUser = { nom: 'FALL', prenom: 'Ibrahima', role: 'TEACHER' };
  isAuthenticated = true;

  // Données pour nouvelle évaluation
  newEvaluation: Partial<Evaluation> = {
    type: '',
    formationId: '',
    titre: '',
    date: '',
    heure: '',
    duree: 120,
    coefficient: 1,
    instructions: ''
  };

  // Données simulées
  formations: Formation[] = [
    { id: '1', nom: 'Licence en Informatique' },
    { id: '2', nom: 'Master Réseaux & Sécurité' },
    { id: '3', nom: 'Développement Web & Mobile' },
    { id: '4', nom: 'Licence en Comptabilité' }
  ];

  evaluations: Evaluation[] = [
    {
      id: '1',
      titre: 'Examen Final Programmation Java',
      formationId: '1',
      type: 'Examen',
      date: '2024-06-15',
      heure: '08:00',
      duree: 180,
      coefficient: 2,
      statut: 'Terminée',
      instructions: 'Apporter votre calculatrice'
    },
    {
      id: '2',
      titre: 'TP Bases de données',
      formationId: '1',
      type: 'TP',
      date: '2024-06-10',
      heure: '14:00',
      duree: 120,
      coefficient: 1,
      statut: 'Terminée'
    },
    {
      id: '3',
      titre: 'Contrôle Réseaux',
      formationId: '2',
      type: 'Contrôle',
      date: '2024-06-20',
      heure: '10:00',
      duree: 90,
      coefficient: 1.5,
      statut: 'Programmée'
    },
    {
      id: '4',
      titre: 'Projet Final Développement Web',
      formationId: '3',
      type: 'Projet',
      date: '2024-06-25',
      duree: 240,
      coefficient: 3,
      statut: 'En cours'
    }
  ];

  studentsForGrading: Student[] = [];

  // Données simulées pour les étudiants
  allStudents: Student[] = [
    { id: '1', nom: 'Diallo', prenom: 'Fatou', formationId: '1', note: 16, commentaire: 'Excellent travail' },
    { id: '2', nom: 'Fall', prenom: 'Omar', formationId: '1', note: 14, commentaire: 'Bonne compréhension' },
    { id: '3', nom: 'Ndiaye', prenom: 'Awa', formationId: '1', note: 12, commentaire: 'Peut mieux faire' },
    { id: '4', nom: 'Ba', prenom: 'Moussa', formationId: '2', note: 18, commentaire: 'Parfait' },
    { id: '5', nom: 'Seck', prenom: 'Aissatou', formationId: '2', note: 15, commentaire: 'Très bien' }
  ];

  ngOnInit() {
    // Initialisation du composant
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  // Méthodes utilitaires
  getFormationName(formationId: string): string {
    const formation = this.formations.find(f => f.id === formationId);
    return formation ? formation.nom : 'Formation inconnue';
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  }

  getTypeClass(type: string): string {
    const classes: { [key: string]: string } = {
      'Examen': 'examen',
      'TP': 'tp',
      'Contrôle': 'controle',
      'Projet': 'projet'
    };
    return classes[type] || 'examen';
  }

  getStatutClass(statut: string): string {
    const classes: { [key: string]: string } = {
      'Programmée': 'programmee',
      'En cours': 'encours',
      'Terminée': 'terminee'
    };
    return classes[statut] || 'programmee';
  }

  // Méthodes pour les évaluations
  viewEvaluation(evaluationId: string): void {
    const evaluation = this.evaluations.find(e => e.id === evaluationId);
    if (evaluation) {
      alert(`📅 Détails de l'évaluation\n\n📋 Titre : ${evaluation.titre}\n🎓 Formation : ${this.getFormationName(evaluation.formationId)}\n📝 Type : ${evaluation.type}\n📅 Date : ${this.formatDate(evaluation.date)}\n⏰ Heure : ${evaluation.heure || 'Non définie'}\n⏱️ Durée : ${evaluation.duree} minutes\n🔢 Coefficient : ${evaluation.coefficient}\n📊 Statut : ${evaluation.statut}\n\n📝 Instructions : ${evaluation.instructions || 'Aucune instruction spéciale'}`);
    }
  }

  editEvaluation(evaluationId: string): void {
    alert(`✏️ Modification de l'évaluation ${evaluationId}\n\n🔧 Vous pouvez modifier :\n- Date et heure\n- Durée de l'épreuve\n- Coefficient\n- Instructions\n- Titre\n\n⚠️ Les étudiants seront automatiquement notifiés des changements`);
  }

  enterGrades(evaluationId: string): void {
    this.selectedEvaluationForGrades = evaluationId;
    this.setActiveTab('notes');
    this.loadStudentsForEvaluation();
  }

  deleteEvaluation(evaluationId: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette évaluation ?\n\nCette action est irréversible.')) {
      alert(`🗑️ Évaluation supprimée\n\n✅ L'évaluation ${evaluationId} a été supprimée avec succès\n📧 Les étudiants ont été notifiés de l'annulation`);
    }
  }

  createEvaluation(): void {
    if (!this.newEvaluation.titre || !this.newEvaluation.type || !this.newEvaluation.formationId || !this.newEvaluation.date) {
      alert('⚠️ Veuillez remplir tous les champs obligatoires');
      return;
    }

    const newId = (this.evaluations.length + 1).toString();
    const evaluation: Evaluation = {
      id: newId,
      titre: this.newEvaluation.titre!,
      formationId: this.newEvaluation.formationId!,
      type: this.newEvaluation.type!,
      date: this.newEvaluation.date!,
      heure: this.newEvaluation.heure,
      duree: this.newEvaluation.duree || 120,
      coefficient: this.newEvaluation.coefficient || 1,
      statut: 'Programmée',
      instructions: this.newEvaluation.instructions
    };

    this.evaluations.push(evaluation);
    
    alert(`✅ Évaluation programmée avec succès\n\n📋 Titre : ${evaluation.titre}\n🎓 Formation : ${this.getFormationName(evaluation.formationId)}\n📅 Date : ${this.formatDate(evaluation.date)}\n📧 Les étudiants ont été notifiés`);
    
    this.showNewEvaluationModal = false;
    this.resetNewEvaluationForm();
  }

  resetNewEvaluationForm(): void {
    this.newEvaluation = {
      type: '',
      formationId: '',
      titre: '',
      date: '',
      heure: '',
      duree: 120,
      coefficient: 1,
      instructions: ''
    };
  }

  // Méthodes pour la saisie des notes
  getCompletedEvaluations(): Evaluation[] {
    return this.evaluations.filter(e => e.statut === 'Terminée');
  }

  loadStudentsForEvaluation(): void {
    if (!this.selectedEvaluationForGrades) {
      this.studentsForGrading = [];
      return;
    }

    const evaluation = this.evaluations.find(e => e.id === this.selectedEvaluationForGrades);
    if (evaluation) {
      // Simuler le chargement des étudiants pour cette formation
      this.studentsForGrading = this.allStudents.filter(s => s.formationId === evaluation.formationId);
    }
  }

  trackByStudentId(index: number, student: Student): string {
    return student.id;
  }

  updateGrade(studentId: string, note: string): void {
    const student = this.studentsForGrading.find(s => s.id === studentId);
    if (student) {
      student.note = parseFloat(note) || 0;
    }
  }

  updateComment(studentId: string, commentaire: string): void {
    const student = this.studentsForGrading.find(s => s.id === studentId);
    if (student) {
      student.commentaire = commentaire;
    }
  }

  validateGrade(studentId: string): void {
    const student = this.studentsForGrading.find(s => s.id === studentId);
    if (student && student.note !== undefined && student.note !== null) {
      alert(`✅ Note validée\n\n👤 Étudiant : ${student.prenom} ${student.nom}\n📊 Note : ${student.note}/20\n💬 Commentaire : ${student.commentaire || 'Aucun'}\n\n📝 La note a été sauvegardée`);
    }
  }

  getGradeStatus(note?: number): string {
    if (note === undefined || note === null) return 'Non saisie';
    if (note >= 16) return 'Excellent';
    if (note >= 14) return 'Bien';
    if (note >= 10) return 'Passable';
    return 'Insuffisant';
  }

  getGradeStatusClass(note?: number): string {
    if (note === undefined || note === null) return 'attente';
    if (note >= 16) return 'confirmee';
    if (note >= 14) return 'programmee';
    if (note >= 10) return 'encours';
    return 'reject';
  }

  publishGrades(): void {
    if (!this.selectedEvaluationForGrades) return;

    const evaluation = this.evaluations.find(e => e.id === this.selectedEvaluationForGrades);
    const notesCount = this.studentsForGrading.filter(s => s.note !== undefined && s.note !== null).length;

    if (confirm(`Publier les notes de l'évaluation "${evaluation?.titre}" ?\n\n📊 ${notesCount} notes seront publiées\n📧 Les étudiants recevront une notification\n\n⚠️ Une fois publiées, les notes seront visibles par les étudiants`)) {
      alert(`📤 Notes publiées avec succès\n\n📋 Évaluation : ${evaluation?.titre}\n📊 ${notesCount} notes publiées\n📧 Notifications envoyées aux étudiants\n\n✅ Les étudiants peuvent maintenant consulter leurs résultats`);
    }
  }

  // Méthodes pour les statistiques
  getTotalEvaluations(): number {
    return this.evaluations.length;
  }

  getTotalGrades(): number {
    return this.allStudents.filter(s => s.note !== undefined && s.note !== null).length;
  }

  getAverageGrade(): string {
    const notesWithValues = this.allStudents.filter(s => s.note !== undefined && s.note !== null);
    if (notesWithValues.length === 0) return '0.00';
    const total = notesWithValues.reduce((sum, s) => sum + (s.note || 0), 0);
    return (total / notesWithValues.length).toFixed(2);
  }

  getSuccessRate(): number {
    const notesWithValues = this.allStudents.filter(s => s.note !== undefined && s.note !== null);
    if (notesWithValues.length === 0) return 0;
    const passed = notesWithValues.filter(s => (s.note || 0) >= 10).length;
    return Math.round((passed / notesWithValues.length) * 100);
  }

  getEvaluationsThisMonth(): number {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    return this.evaluations.filter(e => {
      const evalDate = new Date(e.date);
      return evalDate.getMonth() === currentMonth && evalDate.getFullYear() === currentYear;
    }).length;
  }

  getPendingGrades(): number {
    return this.getCompletedEvaluations().length * 25 - this.getTotalGrades(); // Simulé: 25 étudiants par évaluation
  }

  getTotalStudents(): number {
    return this.allStudents.length;
  }

  getFormationStats(): FormationStat[] {
    return this.formations.map(formation => {
      const formationEvaluations = this.evaluations.filter(e => e.formationId === formation.id);
      const formationStudents = this.allStudents.filter(s => s.formationId === formation.id);
      const notesWithValues = formationStudents.filter(s => s.note !== undefined && s.note !== null);
      
      const moyenne = notesWithValues.length > 0 
        ? notesWithValues.reduce((sum, s) => sum + (s.note || 0), 0) / notesWithValues.length
        : 0;
      
      const noteMax = notesWithValues.length > 0 
        ? Math.max(...notesWithValues.map(s => s.note || 0))
        : 0;
      
      const noteMin = notesWithValues.length > 0 
        ? Math.min(...notesWithValues.map(s => s.note || 0))
        : 0;
      
      const tauxReussite = notesWithValues.length > 0 
        ? Math.round((notesWithValues.filter(s => (s.note || 0) >= 10).length / notesWithValues.length) * 100)
        : 0;

      return {
        formationName: formation.nom,
        evaluations: formationEvaluations.length,
        notesSaisies: notesWithValues.length,
        moyenne: Math.round(moyenne * 100) / 100,
        noteMax,
        noteMin,
        tauxReussite
      };
    });
  }

  getNoteClass(note: number): string {
    if (note >= 16) return 'moyenne-excellente';
    if (note >= 14) return 'moyenne-bonne';
    if (note >= 10) return 'moyenne-moyenne';
    return 'moyenne-faible';
  }

  getSuccessRateClass(rate: number): string {
    if (rate >= 80) return 'confirmee';
    if (rate >= 60) return 'programmee';
    if (rate >= 40) return 'encours';
    return 'reject';
  }

  exportReport(): void {
    if (confirm('Exporter le rapport d\'activité ?\n\nCela va générer :\n- Statistiques détaillées par formation\n- Liste des évaluations et notes\n- Graphiques de performance\n- Analyse des résultats')) {
      alert('📊 Export du rapport lancé\n\n📁 Génération en cours...\n💾 Format : Excel (.xlsx)\n📧 Le fichier sera disponible dans quelques instants\n\n✅ Export terminé - Rapport_Enseignant_2024.xlsx');
    }
  }
}
