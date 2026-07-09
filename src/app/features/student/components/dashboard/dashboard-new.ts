import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminHeaderComponent } from '../../../admin/components/header/header';

@Component({
  selector: 'app-student-dashboard-new',
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
export class StudentDashboardNewComponent implements OnInit {
  activeTab = 'dashboard';
  showReclamation = false;
  showUploadModal = false;
  selectedNoteId = '';
  reclamationMotif = '';
  reclamationJustification = '';
  
  // Propriétés pour le header
  currentUser = { nom: 'DIALLO', prenom: 'Fatou', role: 'STUDENT' };
  isAuthenticated = true;

  // Données simulées
  currentStudent = {
    id: '1',
    nom: 'Diallo',
    prenom: 'Fatou',
    email: 'fatou.diallo@isi.edu.sn',
    formation: 'Licence en Informatique'
  };

  studentNotes = [
    {
      id: '1',
      evaluationId: '1',
      valeur: 16,
      datePublication: '2024-06-15',
      commentaire: 'Très bon travail, continuez ainsi'
    },
    {
      id: '2',
      evaluationId: '2',
      valeur: 14,
      datePublication: '2024-06-10',
      commentaire: 'Bonne compréhension des concepts'
    },
    {
      id: '3',
      evaluationId: '3',
      valeur: 12,
      datePublication: '2024-06-05',
      commentaire: 'Peut mieux faire'
    }
  ];

  evaluations = [
    { id: '1', nom: 'Examen Final Programmation', type: 'Examen', coefficient: 2 },
    { id: '2', nom: 'TP Bases de données', type: 'TP', coefficient: 1 },
    { id: '3', nom: 'Contrôle Réseaux', type: 'Contrôle', coefficient: 1.5 }
  ];

  ngOnInit() {
    // Initialisation du composant
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  getCurrentStudent() {
    return this.currentStudent;
  }

  getStudentNotes() {
    return this.studentNotes;
  }

  getEvaluationName(evaluationId: string): string {
    const evaluation = this.evaluations.find(e => e.id === evaluationId);
    return evaluation ? evaluation.nom : 'Évaluation inconnue';
  }

  getStudentAverage(): string {
    if (this.studentNotes.length === 0) return '0.00';
    const total = this.studentNotes.reduce((sum, note) => sum + note.valeur, 0);
    return (total / this.studentNotes.length).toFixed(2);
  }

  getPassedEvaluations(): number {
    return this.studentNotes.filter(note => note.valeur >= 10).length;
  }

  getTotalEvaluations(): number {
    return this.studentNotes.length;
  }

  getClassRank(): string {
    return '3ème';
  }

  getUnreadNotifications(): number {
    return 2;
  }

  getAvailableDocuments(): number {
    return 3;
  }

  getNoteClass(note: number): string {
    if (note >= 16) return 'moyenne-excellente';
    if (note >= 14) return 'moyenne-bonne';
    if (note >= 10) return 'moyenne-moyenne';
    return 'moyenne-faible';
  }

  // Méthodes pour les notes
  viewNoteDetails(noteId: string): void {
    const note = this.studentNotes.find(n => n.id === noteId);
    if (note) {
      const evaluation = this.evaluations.find(e => e.id === note.evaluationId);
      alert(`📊 Détails de votre note\n\n📋 Évaluation : ${evaluation?.nom}\n📝 Type : ${evaluation?.type}\n⭐ Note : ${note.valeur}/20\n📅 Date : ${note.datePublication}\n💬 Commentaire : ${note.commentaire}\n🔢 Coefficient : ${evaluation?.coefficient}`);
    }
  }

  showReclamationModal(noteId: string): void {
    this.selectedNoteId = noteId;
    this.showReclamation = true;
    this.reclamationMotif = '';
    this.reclamationJustification = '';
  }

  closeReclamationModal(): void {
    this.showReclamation = false;
    this.selectedNoteId = '';
  }

  submitReclamation(): void {
    if (!this.reclamationMotif.trim()) {
      alert('⚠️ Veuillez saisir un motif pour votre réclamation');
      return;
    }

    const note = this.studentNotes.find(n => n.id === this.selectedNoteId);
    if (note) {
      const evaluation = this.evaluations.find(e => e.id === note.evaluationId);
      alert(`✅ Réclamation envoyée avec succès\n\n📋 Évaluation : ${evaluation?.nom}\n⭐ Note contestée : ${note.valeur}/20\n📝 Motif : ${this.reclamationMotif}\n\n🔄 Votre réclamation sera traitée par l'assistant dans les 48h\n📧 Vous recevrez une notification de la réponse`);
    }

    this.closeReclamationModal();
  }

  // Méthodes pour les notifications
  markAllAsRead(): void {
    alert('✅ Toutes les notifications ont été marquées comme lues\n\n📧 Notifications mises à jour\n🔔 Compteur remis à zéro');
  }

  viewCalendar(calendarId: string): void {
    alert(`📅 Calendrier des Examens - Semestre 2\n\n📋 Dates importantes :\n• 15/06/2024 - Examen Final Programmation\n• 18/06/2024 - Examen Bases de données\n• 20/06/2024 - Examen Réseaux\n• 22/06/2024 - Projet de fin d'année\n\n⏰ Tous les examens commencent à 8h00\n📍 Amphithéâtre A - Campus principal`);
  }

  readAnnouncement(announcementId: string): void {
    alert(`📢 Nouvelle évaluation programmée\n\n📋 Détails :\n• Matière : Programmation Web\n• Type : TP noté\n• Date : 25/06/2024\n• Durée : 3 heures\n• Coefficient : 1.5\n\n📚 Chapitres à réviser :\n- HTML/CSS avancé\n- JavaScript ES6+\n- Frameworks modernes\n\n✅ Notification marquée comme lue`);
  }

  viewGradeNotification(notificationId: string): void {
    alert(`🎯 Publication des notes - TP Bases de données\n\n📊 Vos résultats :\n• Note obtenue : 14/20\n• Moyenne de classe : 12.5/20\n• Votre rang : 8ème/25\n• Commentaire : "Bonne compréhension des concepts"\n\n📈 Cette note améliore votre moyenne générale\n📚 Prochaine évaluation : Examen final le 18/06`);
  }

  // Méthodes pour les documents
  viewBulletin(bulletinId: string): void {
    alert(`📄 Bulletin Semestre 1 - 2024\n\n📊 Résumé :\n• Moyenne générale : ${this.getStudentAverage()}/20\n• Rang : ${this.getClassRank()} sur 25\n• Évaluations : ${this.getTotalEvaluations()}\n• Réussites : ${this.getPassedEvaluations()}\n\n📋 Matières :\n• Programmation : 16/20\n• Bases de données : 14/20\n• Réseaux : 12/20\n\n🎓 Mention : Assez Bien`);
  }

  viewCertificate(certificateId: string): void {
    alert(`📜 Certificat de Scolarité 2024\n\n✅ Certifie que :\n👤 ${this.currentStudent.prenom} ${this.currentStudent.nom}\n🎓 Est régulièrement inscrit(e) en ${this.currentStudent.formation}\n📅 Pour l'année académique 2023-2024\n🏫 À l'Institut Supérieur d'Informatique\n\n📍 Dakar, le 10 janvier 2024\n🖊️ Le Directeur des Études`);
  }

  viewTranscript(transcriptId: string): void {
    alert(`📋 Relevé de Notes - Licence 2\n\n📊 Résultats académiques :\n• Année : 2022-2023\n• Formation : Licence en Informatique\n• Moyenne annuelle : 14.2/20\n• Rang : 5ème/30\n• Mention : Bien\n\n📚 Matières validées :\n• Algorithmes : 15/20\n• Programmation : 16/20\n• Mathématiques : 13/20\n• Anglais : 14/20\n\n✅ Passage en Licence 3 autorisé`);
  }

  downloadDocument(documentId: string): void {
    const documents = {
      '1': 'Bulletin_Semestre1_2024.pdf',
      '2': 'Certificat_Scolarite_2024.pdf',
      '3': 'Releve_Notes_Licence2.pdf'
    };
    
    const filename = documents[documentId as keyof typeof documents];
    if (filename) {
      alert(`📥 Téléchargement lancé\n\n📄 Document : ${filename}\n💾 Taille : 2.4 MB\n📁 Destination : Dossier Téléchargements\n\n✅ Le téléchargement va commencer automatiquement`);
    }
  }

  downloadLatestBulletin(): void {
    this.downloadDocument('1');
  }
}
