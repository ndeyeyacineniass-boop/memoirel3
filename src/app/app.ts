import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { filter } from 'rxjs/operators';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { User } from './core/models/user.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LoadingSpinnerComponent,
    MatProgressBarModule
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit, OnDestroy {
  currentUser: User | null = null;
  isAuthenticated: boolean = false;
  loading: boolean = false;
  private destroy$ = new Subject<void>();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.initializeApp();
    this.listenToAuthEvents();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private initializeApp(): void {
    this.loadUserData();
  }

  private loadUserData(): void {
    // Vérifier s'il y a un utilisateur connecté dans le localStorage
    const storedUser = localStorage.getItem('currentUser');
    const storedAuth = localStorage.getItem('isAuthenticated');
    
    if (storedUser && storedAuth === 'true') {
      try {
        this.currentUser = JSON.parse(storedUser);
        this.isAuthenticated = true;
        console.log('Utilisateur restauré depuis le localStorage:', this.currentUser);
      } catch (error) {
        console.error('Erreur lors de la restauration de l\'utilisateur:', error);
        this.clearStoredAuth();
      }
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
        this.currentUser = event.detail.user;
        this.isAuthenticated = event.detail.isAuthenticated;
        console.log('État d\'authentification mis à jour:', this.currentUser);
      }
    });
  }

  onLogout(): void {
    this.isAuthenticated = false;
    this.currentUser = null;
    this.clearStoredAuth();
    this.router.navigate(['/']);
  }
}
