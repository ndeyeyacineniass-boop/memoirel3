import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class AdminHeaderComponent {
  @Input() user: any = null;
  @Input() isAuthenticated: boolean = false;

  constructor(private router: Router) {}

  getRoleLabel(role: string): string {
    // Convertir le rôle en majuscules pour la comparaison (format UserRole)
    const normalizedRole = role?.toUpperCase();
    
    switch (normalizedRole) {
      case 'ADMIN': return 'Administrateur';
      case 'ASSISTANT': return 'Assistant';
      case 'COMPTABLE': return 'Comptable';
      case 'TEACHER': return 'Enseignant';
      case 'STUDENT': return 'Étudiant';
      default: return 'Visiteur';
    }
  }

  logout(): void {
    // Émettre un événement pour informer l'application de la déconnexion
    const event = new CustomEvent('userLogout');
    window.dispatchEvent(event);
    
    // Rediriger vers la page de connexion
    this.router.navigate(['/auth/login']);
  }
}
