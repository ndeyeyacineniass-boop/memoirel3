export type UserRole = 'VISITOR' | 'STUDENT' | 'TEACHER' | 'ASSISTANT' | 'COMPTABLE' | 'ADMIN';

export interface User {
  id: number;
  email: string;
  nom: string;
  prenom: string;
  role: UserRole;
  dateNaissance?: Date;
  telephone?: string;
  adresse?: string;
  ville?: string;
  pays?: string;
  codePostal?: string;
  dateInscription?: Date;
  derniereConnexion?: Date;
  actif: boolean;
  avatar?: string;
  bio?: string;
  specialites?: string[];
  formations?: number[];
  notes?: number[];
  paiements?: number[];
  documents?: number[];
}

export interface UserProfile extends User {
  formationsSuivies: Formation[];
  notesObtenues: Note[];
  paiementsEffectues: Paiement[];
  documentsDeposes: Document[];
}

export interface Formation {
  id: number;
  nom: string;
  description: string;
  duree: string;
  niveau: string;
  prix: number;
  places: number;
  placesDisponibles: number;
  image: string;
  tags: string[];
  dateDebut?: Date;
  dateFin?: Date;
  statut: 'ACTIVE' | 'INACTIVE' | 'COMPLETE';
}

export interface Note {
  id: number;
  etudiantId: number;
  formationId: number;
  note: number;
  coefficient: number;
  commentaire?: string;
  dateEvaluation: Date;
  typeEvaluation: 'CONTROLE' | 'EXAMEN' | 'PROJET' | 'PARTICIPATION';
}

export interface Paiement {
  id: number;
  etudiantId: number;
  formationId: number;
  montant: number;
  datePaiement: Date;
  methodePaiement: 'ESPECES' | 'VIREMENT' | 'CHEQUE' | 'CARTE';
  statut: 'EN_ATTENTE' | 'VALIDE' | 'ANNULE';
  reference?: string;
  justificatif?: string;
}

export interface Document {
  id: number;
  etudiantId: number;
  nom: string;
  type: 'CIN' | 'PHOTO' | 'DIPLOME' | 'RELEVE' | 'CERTIFICAT' | 'AUTRE';
  url: string;
  taille: number;
  dateDepot: Date;
  statut: 'EN_ATTENTE' | 'VALIDE' | 'REJETE';
  commentaire?: string;
}
