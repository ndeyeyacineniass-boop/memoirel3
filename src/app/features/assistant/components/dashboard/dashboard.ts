import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminHeaderComponent } from '../../../admin/components/header/header';

@Component({
  selector: 'app-assistant-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AdminHeaderComponent
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AssistantDashboardComponent implements OnInit {
  activeTab = 'dashboard';
  showNewEvaluationModal = false;
  showNewAnnouncementModal = false;
  showCalendarModal = false;
  
  // Propriétés pour le header
  currentUser = { nom: 'SARR', prenom: 'Aminata', role: 'ASSISTANT' };
  isAuthenticated = true;

  ngOnInit() {
    // Initialisation du composant
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  // Méthodes pour la gestion des préinscriptions
  viewDossier(candidatId: string): void {
    alert(`📄 Consultation du dossier - Candidat ${candidatId}\n\n📋 Informations disponibles :\n- Formulaire de préinscription complet\n- Documents d'identité\n- Diplômes et relevés de notes\n- Lettre de motivation\n- Justificatifs de domicile\n\n✅ Dossier prêt pour validation`);
  }

  validateInscription(candidatId: string): void {
    if (confirm(`Valider la préinscription du candidat ${candidatId} ?\n\nCela va :\n- Changer le statut vers "Validé"\n- Autoriser le comptable à enregistrer le paiement\n- Envoyer une notification au candidat`)) {
      alert(`✅ Préinscription validée avec succès\n\n👤 Candidat ${candidatId}\n📧 Email de confirmation envoyé\n💰 Paiement autorisé pour le comptable`);
    }
  }

  rejectInscription(candidatId: string): void {
    const reason = prompt('Motif du refus :');
    if (reason) {
      alert(`❌ Préinscription refusée\n\n👤 Candidat ${candidatId}\n📝 Motif : ${reason}\n📧 Email de notification envoyé`);
    }
  }

  requestDocuments(candidatId: string): void {
    alert(`📄 Demande de documents - Candidat ${candidatId}\n\n📋 Actions disponibles :\n- Spécifier les documents manquants\n- Envoyer un email de rappel\n- Fixer une date limite\n- Programmer un suivi automatique\n\n⚠️ Fonctionnalité à implémenter`);
  }

  sendConvocation(candidatId: string): void {
    alert(`📧 Envoi de convocation - Candidat ${candidatId}\n\n📋 Types disponibles :\n- Convocation pour entretien\n- Convocation pour examen d'entrée\n- Convocation pour remise de documents\n\n✅ Email automatique envoyé avec les détails`);
  }

  followUpCandidate(candidatId: string): void {
    alert(`📞 Relance candidat - Candidat ${candidatId}\n\n📋 Actions de suivi :\n- Envoi d'email de rappel\n- Appel téléphonique\n- SMS de notification\n- Prolongation de délai\n\n⚠️ Documents toujours manquants`);
  }

  // Méthodes pour la gestion des évaluations
  viewEvaluation(evaluationId: string): void {
    alert(`📊 Détails de l'évaluation ${evaluationId}\n\n📋 Informations :\n- Type : Examen Final\n- Matière : Programmation\n- Date : 15/06/2024\n- Durée : 2h\n- Coefficient : 2\n- Étudiants inscrits : 25\n\n📝 Prêt pour la saisie des notes`);
  }

  enterGrades(evaluationId: string): void {
    alert(`📝 Saisie des notes - Évaluation ${evaluationId}\n\n📋 Interface de saisie :\n- Liste des étudiants inscrits\n- Champs de notes (/20)\n- Validation automatique\n- Sauvegarde en temps réel\n\n✅ Prêt pour la saisie`);
  }

  editEvaluation(evaluationId: string): void {
    alert(`✏️ Modification de l'évaluation ${evaluationId}\n\n🔧 Éléments modifiables :\n- Date et heure\n- Durée de l'épreuve\n- Coefficient\n- Instructions spéciales\n- Modalités d'examen\n\n⚠️ Attention : Les étudiants seront notifiés des changements`);
  }

  viewGrades(evaluationId: string): void {
    alert(`📊 Consultation des notes - Évaluation ${evaluationId}\n\n📋 Statistiques :\n- Moyenne de classe : 14.5/20\n- Note la plus haute : 18/20\n- Note la plus basse : 8/20\n- Taux de réussite : 88%\n\n✅ Notes saisies et vérifiées`);
  }

  editGrades(evaluationId: string): void {
    alert(`📝 Modification des notes - Évaluation ${evaluationId}\n\n🔧 Actions disponibles :\n- Corriger une note individuelle\n- Ajouter des notes manquantes\n- Justifier les modifications\n- Historique des changements\n\n⚠️ Toute modification sera tracée`);
  }

  publishGrades(evaluationId: string): void {
    if (confirm(`Publier les notes de l'évaluation ${evaluationId} ?\n\nCela va :\n- Rendre les notes visibles aux étudiants\n- Envoyer des notifications automatiques\n- Mettre à jour les moyennes générales\n- Permettre les réclamations`)) {
      alert(`🔄 Notes publiées avec succès\n\n📊 Évaluation ${evaluationId}\n📧 Notifications envoyées aux étudiants\n📈 Moyennes mises à jour`);
    }
  }

  generateBulletins(): void {
    if (confirm('Générer les bulletins de notes ?\n\nCela va :\n- Créer les bulletins pour tous les étudiants\n- Calculer les moyennes générales\n- Générer les PDF automatiquement\n- Les rendre disponibles en téléchargement')) {
      alert('📄 Génération des bulletins lancée\n\n⏳ Traitement en cours...\n📊 Calcul des moyennes\n📁 Génération des PDF\n✅ Bulletins prêts dans quelques minutes');
    }
  }

  // Méthodes pour les communications
  viewAnnouncement(announcementId: string): void {
    alert(`📢 Détails de l'annonce ${announcementId}\n\n📋 Contenu :\n- Titre : Calendrier des Examens\n- Type : Information officielle\n- Destinataires : Tous les étudiants\n- Date de publication : 01/06/2024\n- Statut : Publié et actif\n\n👥 Lu par 95% des étudiants`);
  }

  editAnnouncement(announcementId: string): void {
    alert(`✏️ Modification de l'annonce ${announcementId}\n\n🔧 Éléments modifiables :\n- Titre et contenu\n- Destinataires ciblés\n- Date de publication\n- Date d'expiration\n- Niveau de priorité\n\n⚠️ Les modifications seront notifiées aux destinataires`);
  }
}
