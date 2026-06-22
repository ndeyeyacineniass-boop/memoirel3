import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { UserRole } from '../../../../core/models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  email = '';
  password = '';
  role: UserRole = 'STUDENT';
  isLoading = false;
  hidePassword = true;
  loading = false;

  constructor(private router: Router) {}

  async onSubmit() {
    if (!this.email || !this.password) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    this.loading = true;

    try {
      // Vérification des comptes de test
      const success = this.verifyTestCredentials(this.email, this.password, this.role);
      
      if (success) {
        // Stocker les informations de connexion
        localStorage.setItem('currentUser', JSON.stringify({
          email: this.email,
          role: this.role,
          nom: this.getTestUserName(this.role),
          prenom: this.getTestUserFirstName(this.role)
        }));
        localStorage.setItem('isAuthenticated', 'true');
        
        // Notifier l'application de la connexion
        this.updateGlobalAuthState();
        
        // Rediriger selon le rôle
        this.redirectAfterLogin();
      } else {
        alert('Email, mot de passe ou rôle incorrect.');
      }
    } catch (error) {
      alert('Une erreur est survenue lors de la connexion.');
    } finally {
      this.loading = false;
    }
  }

  private verifyTestCredentials(email: string, password: string, role: UserRole): boolean {
    const testAccounts: Record<string, { email: string; password: string }> = {
      'ADMIN': { email: 'admin@isi.edu.sn', password: 'admin123' },
      'ASSISTANT': { email: 'assistant@isi.edu.sn', password: 'assistant123' },
      'COMPTABLE': { email: 'comptable@isi.edu.sn', password: 'comptable123' },
      'TEACHER': { email: 'enseignant@isi.edu.sn', password: 'enseignant123' },
      'STUDENT': { email: 'etudiant@isi.edu.sn', password: 'etudiant123' }
    };

    if (role === 'VISITOR') {
      return false;
    }

    const account = testAccounts[role];
    return account && account.email === email && account.password === password;
  }

  private getTestUserName(role: UserRole): string {
    const names: Record<string, string> = {
      'ADMIN': 'Administrateur',
      'ASSISTANT': 'Assistant',
      'COMPTABLE': 'Comptable',
      'TEACHER': 'Enseignant',
      'STUDENT': 'Diallo'
    };
    return names[role] || '';
  }

  private getTestUserFirstName(role: UserRole): string {
    const firstNames: Record<string, string> = {
      'ADMIN': 'Admin',
      'ASSISTANT': 'Assistant',
      'COMPTABLE': 'Comptable',
      'TEACHER': 'Prof',
      'STUDENT': 'Fatou'
    };
    return firstNames[role] || '';
  }

  onRegisterClick() {
    this.router.navigate(['/auth/register']);
  }

  private updateGlobalAuthState() {
    // Dispatcher un événement personnalisé pour notifier l'App component
    const event = new CustomEvent('userAuthenticated', {
      detail: {
        email: this.email,
        role: this.role,
        nom: this.getTestUserName(this.role),
        prenom: this.getTestUserFirstName(this.role)
      }
    });
    window.dispatchEvent(event);
  }

  private redirectAfterLogin() {
    switch (this.role) {
      case 'ADMIN':
        this.router.navigate(['/admin']);
        break;
      case 'ASSISTANT':
        this.router.navigate(['/assistant']);
        break;
      case 'COMPTABLE':
        this.router.navigate(['/comptable']);
        break;
      case 'TEACHER':
        this.router.navigate(['/teacher']);
        break;
      case 'STUDENT':
        this.router.navigate(['/student']);
        break;
      default:
        this.router.navigate(['/']);
    }
  }
}