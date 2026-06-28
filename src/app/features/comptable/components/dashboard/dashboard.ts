import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminHeaderComponent } from '../../../admin/components/header/header';

@Component({
  selector: 'app-comptable-dashboard',
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
export class ComptableDashboardComponent implements OnInit {
  activeTab = 'dashboard';
  showPaymentModalVisible = false;
  
  // Propriétés pour le header
  currentUser = { nom: 'DIENG', prenom: 'Mamadou', role: 'COMPTABLE' };
  isAuthenticated = true;
  
  // Données du modal de paiement
  selectedCandidateName = '';
  selectedAmount = '';
  paymentMode = '';
  paymentDate = '';
  checkNumber = '';
  transferRef = '';
  paymentComments = '';

  ngOnInit() {
    // Initialisation du composant
    this.paymentDate = new Date().toISOString().split('T')[0]; // Date du jour par défaut
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  // Méthodes pour la gestion des candidats
  viewCandidate(candidatId: string): void {
    const candidatData = {
      '1': { nom: 'DIOP Amadou', formation: 'Licence Informatique', statut: 'En attente' },
      '2': { nom: 'NDIAYE Fatou', formation: 'Master Réseaux', statut: 'Validé' },
      '3': { nom: 'FALL Omar', formation: 'Développement Web', statut: 'Payé' },
      '4': { nom: 'BA Aissatou', formation: 'Licence Comptabilité', statut: 'Refusé' }
    };
    
    const candidat = candidatData[candidatId as keyof typeof candidatData];
    if (candidat) {
      alert(`👤 Dossier candidat - ${candidat.nom}\n\n📋 Informations :\n- Formation : ${candidat.formation}\n- Statut de validation : ${candidat.statut}\n- Date de préinscription : Janvier 2024\n\n💡 Seuls les candidats "Validés" peuvent effectuer le paiement`);
    }
  }

  recordPayment(candidatId: string): void {
    // Vérifier que le candidat est validé
    if (candidatId === '2') {
      this.openPaymentModal('2');
    } else {
      alert('❌ Paiement non autorisé\n\nSeuls les candidats avec le statut "Validé" par l\'assistant peuvent effectuer le paiement d\'inscription.');
    }
  }

  openPaymentModal(candidatId: string): void {
    const candidatData = {
      '2': { nom: 'NDIAYE Fatou', montant: '900 000 FCFA' },
      '5': { nom: 'SECK Moussa', montant: '750 000 FCFA' }
    };
    
    const candidat = candidatData[candidatId as keyof typeof candidatData];
    if (candidat) {
      this.selectedCandidateName = candidat.nom;
      this.selectedAmount = candidat.montant;
      this.showPaymentModalVisible = true;
      
      // Réinitialiser le formulaire
      this.paymentMode = '';
      this.checkNumber = '';
      this.transferRef = '';
      this.paymentComments = '';
    }
  }

  confirmPayment(): void {
    if (!this.paymentMode || !this.paymentDate) {
      alert('⚠️ Veuillez remplir tous les champs obligatoires');
      return;
    }

    const receiptNumber = 'REC-' + new Date().getFullYear() + '-' + String(Math.floor(Math.random() * 1000)).padStart(3, '0');
    
    alert(`✅ Paiement enregistré avec succès\n\n👤 Candidat : ${this.selectedCandidateName}\n💰 Montant : ${this.selectedAmount}\n💳 Mode : ${this.getPaymentModeLabel()}\n📅 Date : ${this.paymentDate}\n🧾 Reçu N° : ${receiptNumber}\n\n📧 Notification envoyée à l'admin pour création du compte étudiant`);
    
    this.showPaymentModalVisible = false;
  }

  getPaymentModeLabel(): string {
    const modes: { [key: string]: string } = {
      'especes': 'Espèces',
      'cheque': 'Chèque',
      'virement': 'Virement bancaire'
    };
    return modes[this.paymentMode] || this.paymentMode;
  }

  downloadReceipt(paymentId: string): void {
    alert(`📄 Téléchargement du reçu de paiement ${paymentId}\n\n📋 Contenu du reçu :\n- Informations du candidat\n- Détails du paiement\n- Numéro de référence\n- Cachet de l'établissement\n\n💾 Fichier PDF généré automatiquement`);
  }

  // Méthodes pour le suivi des encaissements
  refreshPayments(): void {
    alert('🔄 Actualisation des données\n\n📊 Mise à jour :\n- Liste des candidats validés\n- Statuts de paiement\n- Nouveaux paiements autorisés\n\n✅ Données actualisées');
  }

  viewPaymentDetails(paymentId: string): void {
    const paymentData = {
      '1': { candidat: 'FALL Omar', montant: '600 000 FCFA', mode: 'Espèces', ref: 'REC-2024-001' },
      '2': { candidat: 'DIALLO Mariama', montant: '750 000 FCFA', mode: 'Chèque', ref: 'CHQ-456789' }
    };
    
    const payment = paymentData[paymentId as keyof typeof paymentData];
    if (payment) {
      alert(`💳 Détails du paiement ${paymentId}\n\n📋 Informations :\n- Candidat : ${payment.candidat}\n- Montant : ${payment.montant}\n- Mode : ${payment.mode}\n- Référence : ${payment.ref}\n- Date : 25/01/2024\n- Statut : Encaissé\n\n📄 Reçu disponible en téléchargement`);
    }
  }

  exportReport(): void {
    if (confirm('Exporter le rapport comptable ?\n\nCela va générer :\n- Liste complète des paiements\n- Statistiques d\'encaissement\n- Détails par mode de paiement\n- Candidats en attente')) {
      alert('📊 Export du rapport lancé\n\n📁 Génération en cours...\n💾 Format : Excel (.xlsx)\n📧 Le fichier sera disponible dans quelques instants\n\n✅ Export terminé - Rapport_Paiements_2024.xlsx');
    }
  }
}
