import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminHeaderComponent } from '../header/header';

// Interfaces basées sur le projet React
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
  statut: 'en attente' | 'confirmée' | 'annulée';
}

interface Etudiant {
  id: string;
  nom: string;
  prenom: string;
  email: string;
}

interface Note {
  id: string;
  evaluationId: string;
  etudiantId: string;
  valeur: number;
}

interface Evaluation {
  id: string;
  type: 'Examen' | 'TP' | 'Contrôle' | 'Projet';
  formationId: string;
  titre: string;
  date: string;
  duree: number;
  coefficient: number;
  statut: 'programmée' | 'en cours' | 'terminée';
}

@Component({
  selector: 'app-admin-dashboard',
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
export class AdminDashboardComponent implements OnInit {
  activeTab = 'dashboard'; // Commencer par le tableau de bord
  showNewPersonnelModal = false;
  currentUser: any = null;
  isAuthenticated: boolean = false;
  
  // Nouveau personnel
  newPersonnelRole = '';

  // Données statiques identiques au projet React
  formations: Formation[] = [
    {
      id: '1',
      nom: 'Licence en Informatique',
      description: 'Formation complète en informatique : programmation, bases de données, réseaux et génie logiciel.',
      duree: '3 ans',
      niveau: 'Licence',
      prix: 750000
    },
    {
      id: '2',
      nom: 'Master Réseaux & Sécurité',
      description: 'Spécialisation en réseaux informatiques, cybersécurité et administration système.',
      duree: '2 ans',
      niveau: 'Master',
      prix: 900000
    },
    {
      id: '3',
      nom: 'Développement Web & Mobile',
      description: 'Formation intensive en développement d\'applications web et mobiles modernes.',
      duree: '18 mois',
      niveau: 'Certification',
      prix: 600000
    },
    {
      id: '4',
      nom: 'Intelligence Artificielle',
      description: 'Formation avancée en IA, machine learning et deep learning.',
      duree: '2 ans',
      niveau: 'Master',
      prix: 1000000
    },
    {
      id: '5',
      nom: 'Maintenance Informatique',
      description: 'Formation technique en maintenance et réparation d\'équipements informatiques.',
      duree: '1 an',
      niveau: 'Certification',
      prix: 450000
    }
  ];

  inscriptions: Inscription[] = [
    {
      id: '1',
      etudiantId: '1',
      formationId: '1',
      dateInscription: '2024-01-15',
      statut: 'confirmée'
    },
    {
      id: '2',
      etudiantId: '2',
      formationId: '2',
      dateInscription: '2024-01-10',
      statut: 'confirmée'
    },
    {
      id: '3',
      etudiantId: '3',
      formationId: '1',
      dateInscription: '2024-01-20',
      statut: 'en attente'
    },
    {
      id: '4',
      etudiantId: '4',
      formationId: '3',
      dateInscription: '2024-01-25',
      statut: 'en attente'
    }
  ];

  etudiants: Etudiant[] = [
    {
      id: '1',
      nom: 'Diouf',
      prenom: 'Awa',
      email: 'awa.diouf@isi.edu.sn'
    },
    {
      id: '2',
      nom: 'Sall',
      prenom: 'Mamadou',
      email: 'mamadou.sall@isi.edu.sn'
    },
    {
      id: '3',
      nom: 'Diallo',
      prenom: 'Fatou',
      email: 'fatou.diallo@isi.edu.sn'
    },
    {
      id: '4',
      nom: 'Ba',
      prenom: 'Ibrahima',
      email: 'ibrahima.ba@isi.edu.sn'
    }
  ];

  notes: Note[] = [
    {
      id: '1',
      evaluationId: '1',
      etudiantId: '1',
      valeur: 16
    },
    {
      id: '2',
      evaluationId: '1',
      etudiantId: '2',
      valeur: 14
    },
    {
      id: '3',
      evaluationId: '2',
      etudiantId: '1',
      valeur: 18
    }
  ];

  evaluations: Evaluation[] = [
    {
      id: '1',
      type: 'Examen',
      formationId: '1',
      titre: 'Examen Final Programmation',
      date: '2024-06-15',
      duree: 120,
      coefficient: 2,
      statut: 'programmée'
    },
    {
      id: '2',
      type: 'TP',
      formationId: '1',
      titre: 'TP Bases de données',
      date: '2024-06-10',
      duree: 60,
      coefficient: 1,
      statut: 'programmée'
    }
  ];

  newFormation = {
    nom: '',
    description: '',
    duree: '',
    niveau: '',
    prix: ''
  };

  ngOnInit() {
    this.loadUserData();
    this.listenToAuthEvents();
  }

  private loadUserData(): void {
    const storedUser = localStorage.getItem('currentUser');
    const storedAuth = localStorage.getItem('isAuthenticated');

    console.log('Dashboard - localStorage currentUser:', storedUser);
    console.log('Dashboard - localStorage isAuthenticated:', storedAuth);

    if (storedUser && storedAuth === 'true') {
      try {
        this.currentUser = JSON.parse(storedUser);
        this.isAuthenticated = true;
        console.log('Dashboard - Utilisateur chargé:', this.currentUser);
      } catch (error) {
        console.error('Erreur lors de la restauration de l\'utilisateur:', error);
        this.clearStoredAuth();
      }
    } else {
      console.log('Dashboard - Aucun utilisateur trouvé dans localStorage');
    }
  }

  private clearStoredAuth(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAuthenticated');
    this.currentUser = null;
    this.isAuthenticated = false;
  }

  private listenToAuthEvents(): void {
    window.addEventListener('userAuthenticated', (event: any) => {
      if (event.detail) {
        this.currentUser = {
          email: event.detail.email,
          role: event.detail.role,
          nom: event.detail.nom,
          prenom: event.detail.prenom
        };
        this.isAuthenticated = true;
        console.log('Utilisateur authentifié dans le dashboard:', this.currentUser);
      }
    });
  }

  // Méthodes pour changer d'onglet
  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  // Méthodes utilitaires
  getFormationName(formationId: string): string {
    return this.formations.find(f => f.id === formationId)?.nom || 'Formation inconnue';
  }

  getEtudiantName(etudiantId: string): string {
    const etudiant = this.etudiants.find(e => e.id === etudiantId);
    return etudiant ? `${etudiant.prenom} ${etudiant.nom}` : 'Étudiant inconnu';
  }

  getStatutColor(statut: string): string {
    switch (statut) {
      case 'confirmée': return 'success';
      case 'en attente': return 'warning';
      case 'annulée': return 'danger';
      default: return 'muted';
    }
  }

  // Méthodes pour les statistiques
  calculateGlobalStats() {
    const totalInscriptions = this.inscriptions.length;
    const inscriptionsConfirmees = this.inscriptions.filter(i => i.statut === 'confirmée').length;
    const inscriptionsEnAttente = this.inscriptions.filter(i => i.statut === 'en attente').length;
    
    // Calcul du taux de réussite basé sur les inscriptions confirmées
    const tauxReussite = totalInscriptions > 0 ? (inscriptionsConfirmees / totalInscriptions) * 100 : 0;
    
    // Calcul de la moyenne générale des notes
    let totalNotes = 0;
    let noteCount = 0;
    
    this.notes.forEach(note => {
      totalNotes += note.valeur;
      noteCount++;
    });
    
    const moyenne = noteCount > 0 ? totalNotes / noteCount : 0;
    
    return {
      totalInscriptions,
      inscriptionsConfirmees,
      inscriptionsEnAttente,
      moyenne,
      tauxReussite
    };
  }

  // Méthodes pour les actions
  handleCreateFormation() {
    if (this.newFormation.nom && this.newFormation.description && this.newFormation.duree && this.newFormation.niveau) {
      const newFormation: Formation = {
        id: (this.formations.length + 1).toString(),
        nom: this.newFormation.nom,
        description: this.newFormation.description,
        duree: this.newFormation.duree,
        niveau: this.newFormation.niveau,
        prix: this.newFormation.prix ? parseInt(this.newFormation.prix.toString()) : 0
      };
      
      this.formations.push(newFormation);
      this.resetFormationForm();
    }
  }

  resetFormationForm() {
    this.newFormation = {
      nom: '',
      description: '',
      duree: '',
      niveau: '',
      prix: ''
    };
  }

  handleApproveInscription(inscriptionId: string) {
    const inscription = this.inscriptions.find(i => i.id === inscriptionId);
    if (inscription) {
      inscription.statut = 'confirmée';
    }
  }

  handleRejectInscription(inscriptionId: string) {
    const inscription = this.inscriptions.find(i => i.id === inscriptionId);
    if (inscription) {
      inscription.statut = 'annulée';
    }
  }

  handleGenerateBulletin() {
    // Logique pour générer les bulletins
    console.log('Bulletins générés');
  }

  // Méthodes pour l'analyse par formation
  getFormationInscriptionCount(formationId: string): number {
    return this.inscriptions.filter(i => i.formationId === formationId).length;
  }

  getFormationEvaluationCount(formationId: string): number {
    return this.evaluations.filter(e => e.formationId === formationId).length;
  }

  getFormationAverage(formationId: string): number {
    const formationEvaluations = this.evaluations.filter(e => e.formationId === formationId);
    const formationNotes = this.notes.filter(note => 
      formationEvaluations.some(evaluation => evaluation.id === note.evaluationId)
    );
    
    if (formationNotes.length === 0) return 0;
    
    const total = formationNotes.reduce((sum, note) => sum + note.valeur, 0);
    return total / formationNotes.length;
  }

  getFormationSuccessRate(formationId: string): number {
    const formationEvaluations = this.evaluations.filter(e => e.formationId === formationId);
    const formationNotes = this.notes.filter(note => 
      formationEvaluations.some(evaluation => evaluation.id === note.evaluationId)
    );
    
    if (formationNotes.length === 0) return 0;
    
    const successCount = formationNotes.filter(note => note.valeur >= 10).length;
    return (successCount / formationNotes.length) * 100;
  }

  // Méthodes pour les bulletins
  getNotesForEtudiant(etudiantId: string): Note[] {
    return this.notes.filter(n => n.etudiantId === etudiantId);
  }

  getStudentAverage(etudiantId: string): number {
    const notes = this.getNotesForEtudiant(etudiantId);
    if (notes.length === 0) return 0;
    
    const total = notes.reduce((sum, note) => sum + note.valeur, 0);
    return total / notes.length;
  }

  getInscriptionForEtudiant(etudiantId: string): Inscription | undefined {
    return this.inscriptions.find(i => i.etudiantId === etudiantId);
  }

  // Méthodes manquantes pour les bulletins
  getInscriptionFormationId(etudiantId: string): string {
    const inscription = this.inscriptions.find(i => i.etudiantId === etudiantId);
    return inscription ? inscription.formationId : '';
  }

  getEtudiantMoyenne(etudiantId: string): number {
    const etudiantNotes = this.notes.filter(n => n.etudiantId === etudiantId);
    if (etudiantNotes.length === 0) return 0;
    return etudiantNotes.reduce((sum, note) => sum + note.valeur, 0) / etudiantNotes.length;
  }

  getMoyenneClass(moyenne: number): string {
    if (moyenne >= 16) return 'moyenne-excellente';
    if (moyenne >= 14) return 'moyenne-bonne';
    if (moyenne >= 10) return 'moyenne-moyenne';
    return 'moyenne-faible';
  }

  getEtudiantEvaluationsCount(etudiantId: string): number {
    return this.notes.filter(n => n.etudiantId === etudiantId).length;
  }

  getInscriptionStatut(etudiantId: string): string {
    const inscription = this.inscriptions.find(i => i.etudiantId === etudiantId);
    return inscription ? inscription.statut : 'non inscrit';
  }

  // Méthodes pour les résultats globaux (correction des noms)
  getFormationInscriptionsCount(formationId: string): number {
    return this.inscriptions.filter(i => i.formationId === formationId).length;
  }

  getFormationEvaluationsCount(formationId: string): number {
    return this.evaluations.filter(e => e.formationId === formationId).length;
  }

  getFormationMoyenne(formationId: string): number {
    const formationEvaluations = this.evaluations.filter(e => e.formationId === formationId);
    const formationNotes = this.notes.filter(note => 
      formationEvaluations.find(evaluation => evaluation.id === note.evaluationId)
    );
    
    if (formationNotes.length === 0) return 0;
    return formationNotes.reduce((sum, note) => sum + note.valeur, 0) / formationNotes.length;
  }

  getFormationTauxReussite(formationId: string): number {
    const formationEvaluations = this.evaluations.filter(e => e.formationId === formationId);
    const formationNotes = this.notes.filter(note => 
      formationEvaluations.find(evaluation => evaluation.id === note.evaluationId)
    );
    
    if (formationNotes.length === 0) return 0;
    return (formationNotes.filter(note => note.valeur >= 10).length / formationNotes.length) * 100;
  }

  // Méthodes pour les évaluations
  getEvaluationTypeClass(type: string): string {
    switch (type) {
      case 'Examen': return 'examen';
      case 'TP': return 'tp';
      case 'Projet': return 'projet';
      case 'Contrôle': return 'controle';
      default: return 'actif';
    }
  }

  getEvaluationStatutClass(statut: string): string {
    switch (statut) {
      case 'programmée': return 'programmee';
      case 'en cours': return 'encours';
      case 'terminée': return 'terminee';
      default: return 'actif';
    }
  }

  // Méthodes d'action
  downloadBulletin(etudiantId: string): void {
    alert(`Téléchargement du bulletin de l'étudiant ${etudiantId} - À implémenter`);
  }

  viewEtudiantProfile(etudiantId: string): void {
    alert(`Voir le profil de l'étudiant ${etudiantId} - À implémenter`);
  }

  editEtudiant(etudiantId: string): void {
    alert(`Modifier l'étudiant ${etudiantId} - À implémenter`);
  }

  deleteEtudiant(etudiantId: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?')) {
      alert(`Suppression de l'étudiant ${etudiantId} - À implémenter`);
    }
  }

  viewEvaluationDetails(evaluationId: string): void {
    alert(`Voir les détails de l'évaluation ${evaluationId} - À implémenter`);
  }

  editEvaluation(evaluationId: string): void {
    alert(`Modifier l'évaluation ${evaluationId} - À implémenter`);
  }

  deleteEvaluation(evaluationId: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette évaluation ?')) {
      alert(`Suppression de l'évaluation ${evaluationId} - À implémenter`);
    }
  }

  // Nouvelles méthodes pour les fonctionnalités admin
  createEtudiantAccount(candidatId: string): void {
    const candidatNames = ['Awa Diouf', 'Moussa Fall', 'Fatou Ba', 'Ibrahima Ndiaye'];
    const candidatName = candidatNames[parseInt(candidatId) - 1] || 'Candidat';
    
    if (confirm(`Créer un compte étudiant pour ${candidatName} ?\n\nCela va :\n- Créer le compte avec identifiants\n- Envoyer les informations par email\n- Activer l'accès à la plateforme`)) {
      alert(`✅ Compte créé avec succès pour ${candidatName}\n\n📧 Email envoyé avec :\n- Identifiant de connexion\n- Mot de passe temporaire\n- Lien vers la plateforme\n\n👤 L'étudiant peut maintenant se connecter`);
    }
  }

  createPersonnelAccount(): void {
    if (!this.newPersonnelRole) {
      alert('Veuillez sélectionner un rôle');
      return;
    }

    const roleNames = {
      'ASSISTANT': 'Assistant',
      'TEACHER': 'Enseignant', 
      'COMPTABLE': 'Comptable'
    };

    const roleName = roleNames[this.newPersonnelRole as keyof typeof roleNames];
    
    if (confirm(`Créer un compte ${roleName} ?\n\nCela va :\n- Générer les identifiants de connexion\n- Configurer les permissions selon le rôle\n- Envoyer les informations par email`)) {
      alert(`✅ Compte ${roleName} créé avec succès\n\n📧 Email envoyé avec :\n- Identifiant de connexion\n- Mot de passe temporaire\n- Instructions de première connexion\n- Permissions associées au rôle`);
      
      // Fermer le modal et réinitialiser
      this.showNewPersonnelModal = false;
      this.newPersonnelRole = '';
    }
  }

  // Méthode pour actualiser le tableau de bord
  refreshDashboard(): void {
    // Simuler une actualisation des données
    console.log('Actualisation du tableau de bord...');
    // Ici on pourrait faire un appel API pour récupérer les dernières données
    // Pour l'instant, on simule juste l'actualisation
    setTimeout(() => {
      console.log('Tableau de bord actualisé');
    }, 500);
  }

  // ===== FONCTIONS POUR LES BOUTONS D'ACTION =====

  // Fonctions pour les préinscriptions
  viewPreinscriptionDossier(candidatId: string): void {
    const candidatNames = ['Awa Diouf', 'Moussa Fall', 'Fatou Ba', 'Ibrahima Ndiaye'];
    const candidatName = candidatNames[parseInt(candidatId) - 1] || 'Candidat';
    alert(`📄 Dossier de préinscription - ${candidatName}\n\n📋 Informations disponibles :\n- Formulaire de préinscription\n- Documents d'identité\n- Diplômes et relevés de notes\n- Lettre de motivation\n- Justificatifs de domicile\n\n✅ Dossier complet et validé par l'assistant`);
  }

  // Fonctions pour le personnel
  viewPersonnelProfile(personnelId: string): void {
    const personnelData = {
      'P001': { nom: 'Fatou Sall', role: 'Assistant', service: 'Administration' },
      'P002': { nom: 'Mamadou Diallo', role: 'Enseignant', service: 'Programmation' },
      'P003': { nom: 'Aminata Ba', role: 'Comptable', service: 'Finance' },
      'P004': { nom: 'Ibrahima Diop', role: 'Assistant', service: 'Scolarité' }
    };
    
    const personnel = personnelData[personnelId as keyof typeof personnelData];
    if (personnel) {
      alert(`👤 Profil Personnel - ${personnel.nom}\n\n📋 Informations :\n- Rôle : ${personnel.role}\n- Service : ${personnel.service}\n- Statut : Actif\n- Date d'embauche : 10/01/2024\n- Permissions : Configurées selon le rôle\n\n📧 Email : ${personnel.nom.toLowerCase().replace(' ', '.')}@isi.edu.sn`);
    }
  }

  editPersonnelProfile(personnelId: string): void {
    const personnelData = {
      'P001': 'Fatou Sall',
      'P002': 'Mamadou Diallo', 
      'P003': 'Aminata Ba',
      'P004': 'Ibrahima Diop'
    };
    
    const personnelName = personnelData[personnelId as keyof typeof personnelData];
    if (personnelName) {
      alert(`✏️ Modification du profil - ${personnelName}\n\n🔧 Actions disponibles :\n- Modifier les informations personnelles\n- Changer le service/spécialité\n- Mettre à jour les permissions\n- Modifier l'adresse email\n- Réinitialiser le mot de passe\n\n⚠️ Fonctionnalité à implémenter`);
    }
  }

  togglePersonnelStatus(personnelId: string, currentStatus: string): void {
    const personnelData = {
      'P001': 'Fatou Sall',
      'P002': 'Mamadou Diallo',
      'P003': 'Aminata Ba', 
      'P004': 'Ibrahima Diop'
    };
    
    const personnelName = personnelData[personnelId as keyof typeof personnelData];
    const action = currentStatus === 'Actif' ? 'désactiver' : 'réactiver';
    const newStatus = currentStatus === 'Actif' ? 'inactif' : 'actif';
    
    if (personnelName) {
      if (confirm(`Êtes-vous sûr de vouloir ${action} le compte de ${personnelName} ?\n\nCela va :\n- ${action === 'désactiver' ? 'Bloquer' : 'Débloquer'} l'accès à la plateforme\n- ${action === 'désactiver' ? 'Suspendre' : 'Restaurer'} les permissions\n- Notifier par email`)) {
        alert(`✅ Compte ${newStatus} avec succès\n\n👤 ${personnelName}\n📧 Email de notification envoyé\n🔄 Changement effectif immédiatement`);
      }
    }
  }

  // Fonctions pour les étudiants
  viewStudentProfile(etudiantId: string): void {
    const etudiant = this.etudiants.find(e => e.id === etudiantId);
    if (etudiant) {
      const inscription = this.getInscriptionForEtudiant(etudiantId);
      const formation = inscription ? this.getFormationName(inscription.formationId) : 'Aucune';
      const moyenne = this.getStudentAverage(etudiantId);
      
      alert(`🎓 Profil Étudiant - ${etudiant.prenom} ${etudiant.nom}\n\n📋 Informations :\n- Email : ${etudiant.email}\n- Formation : ${formation}\n- Moyenne générale : ${moyenne.toFixed(2)}/20\n- Statut : ${inscription?.statut || 'Non inscrit'}\n- Nombre d'évaluations : ${this.getEtudiantEvaluationsCount(etudiantId)}\n\n📚 Accès aux notes, bulletins et évaluations disponible`);
    }
  }

  resetStudentPassword(etudiantId: string): void {
    const etudiant = this.etudiants.find(e => e.id === etudiantId);
    if (etudiant) {
      if (confirm(`Réinitialiser le mot de passe de ${etudiant.prenom} ${etudiant.nom} ?\n\nCela va :\n- Générer un nouveau mot de passe temporaire\n- Envoyer les nouvelles informations par email\n- Forcer la modification à la prochaine connexion`)) {
        alert(`🔐 Mot de passe réinitialisé avec succès\n\n👤 ${etudiant.prenom} ${etudiant.nom}\n📧 Email envoyé à : ${etudiant.email}\n🔑 Nouveau mot de passe temporaire : ISI2024temp\n⚠️ L'étudiant devra le modifier à la prochaine connexion`);
      }
    }
  }

  toggleStudentAccountStatus(etudiantId: string): void {
    const etudiant = this.etudiants.find(e => e.id === etudiantId);
    if (etudiant) {
      const currentStatus = this.getInscriptionStatut(etudiantId);
      const action = currentStatus === 'confirmée' ? 'désactiver' : 'activer';
      
      if (confirm(`Êtes-vous sûr de vouloir ${action} le compte de ${etudiant.prenom} ${etudiant.nom} ?\n\nCela va :\n- ${action === 'désactiver' ? 'Bloquer' : 'Débloquer'} l'accès à la plateforme\n- ${action === 'désactiver' ? 'Suspendre' : 'Restaurer'} l'accès aux cours\n- Notifier l'étudiant par email`)) {
        alert(`✅ Compte ${action === 'désactiver' ? 'désactivé' : 'activé'} avec succès\n\n👤 ${etudiant.prenom} ${etudiant.nom}\n📧 Email de notification envoyé\n🔄 Changement effectif immédiatement`);
      }
    }
  }
}

