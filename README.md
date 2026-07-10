# ISI Management Angular

Application de gestion éducative migrée de React vers Angular 18.

## 🎯 **Page d'Accueil - Reproduction Fidèle du React**

La page d'accueil Angular est maintenant **100% identique** au projet React `Visitor.tsx` avec :

### **✅ Sections Implémentées**
- **Header Navigation** : Logo ISI + boutons Connexion/Inscription
- **Hero Section** : Image d'accueil avec titre et description
- **Campus Section** : Statistiques + images du campus (500+ étudiants, 50+ enseignants, 10+ laboratoires, 95% insertion pro)
- **Formations List** : 5 formations avec cartes détaillées
- **CTA Section** : Appel à l'action avec boutons
- **Modal Pré-inscription** : Formulaire complet de pré-inscription

### **🖼️ Images Utilisées**
- `/src/assets/accueil.jpg` - Image hero principale
- `/src/assets/image2.png` - Image campus
- `/src/assets/image3.jpg` - Image étudiants
- `/src/assets/image4.jpg` - Image laboratoire
- `/src/assets/logoo.png` - Logo ISI

### **🎨 Design Identique**
- **Couleurs** : Bleu primaire (#3b82f6), gris neutres
- **Typographie** : Inter font, tailles et poids identiques
- **Espacements** : Marges, paddings et gaps identiques
- **Animations** : Hover effects, transitions, ombres
- **Responsive** : Mobile-first, breakpoints identiques

### **⚙️ Fonctionnalités**
- **Pré-inscription** : Formulaire complet avec validation
- **Navigation** : Liens vers login et register
- **Formations** : 5 formations avec détails (durée, prix, niveau)
- **Statistiques** : Chiffres clés du campus ISI

## 🔐 **Comptes de Test**

### **Admin**
- **Email** : `admin@isi.edu.sn`
- **Mot de passe** : `admin123`
- **Rôle** : Administrateur

### **Enseignant**
- **Email** : `prof@isi.edu.sn`
- **Mot de passe** : `prof123`
- **Rôle** : Enseignant

### **Étudiant**
- **Email** : `awa.diouf@isi.edu.sn`
- **Mot de passe** : `awa123`
- **Rôle** : Étudiant

## 🚀 **Démarrage**

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
ng serve --port 4212

# Ouvrir http://localhost:4212
```

## 📱 **Interface Responsive**

- **Desktop** : Layout en grille avec sidebar
- **Tablet** : Adaptation des colonnes
- **Mobile** : Stack vertical, navigation adaptée

## 🔧 **Structure du Projet**

```
src/
├── app/
│   ├── features/
│   │   ├── visitor/          # Page d'accueil
│   │   ├── auth/            # Login/Register
│   │   ├── admin/           # Interface admin
│   │   ├── student/         # Interface étudiant
│   │   └── teacher/         # Interface enseignant
│   ├── shared/              # Composants partagés
│   └── core/                # Services et modèles
└── assets/                  # Images et ressources
```

## 🎨 **Migration Complète React → Angular**

### **Phase 1 : UI Components ✅**
- ✅ Page d'accueil (Visitor.tsx → HomeComponent)
- ✅ Login (Login.tsx → LoginComponent)
- ✅ Register (Register.tsx → RegisterComponent)
- ✅ Admin Dashboard (Admin.tsx → AdminDashboardComponent)

### **Phase 2 : State Management** (À venir)
- NgRx Store + Effects
- Services Angular
- Guards et Interceptors

### **Phase 3 : API Integration** (À venir)
- HTTP Client
- Services backend
- Authentification JWT

---

**La page d'accueil est maintenant parfaitement identique au projet React !** 🎉
