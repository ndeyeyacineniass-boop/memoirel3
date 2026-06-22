import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

export type ErrorType = 'error' | 'warning' | 'info' | 'success';
export type ErrorSize = 'small' | 'medium' | 'large';

export interface ErrorAction {
  label: string;
  action: string;
  color?: 'primary' | 'accent' | 'warn';
  icon?: string;
}

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule
  ],
  templateUrl: './error-message.html',
  styleUrls: ['./error-message.scss']
})
export class ErrorMessageComponent {
  @Input() type: ErrorType = 'error';
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() details?: string;
  @Input() size: ErrorSize = 'medium';
  @Input() showIcon: boolean = true;
  @Input() showActions: boolean = false;
  @Input() actions: ErrorAction[] = [];
  @Input() dismissible: boolean = false;
  @Input() autoDismiss: boolean = false;
  @Input() autoDismissDelay: number = 5000;
  @Output() actionClick = new EventEmitter<string>();
  @Output() dismiss = new EventEmitter<void>();

  ngOnInit(): void {
    if (this.autoDismiss) {
      setTimeout(() => {
        this.onDismiss();
      }, this.autoDismissDelay);
    }
  }

  get errorIcon(): string {
    switch (this.type) {
      case 'success': return 'check_circle';
      case 'warning': return 'warning';
      case 'info': return 'info';
      default: return 'error';
    }
  }

  get errorColor(): string {
    switch (this.type) {
      case 'success': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'info': return 'text-blue-600';
      default: return 'text-red-600';
    }
  }

  get errorBgColor(): string {
    switch (this.type) {
      case 'success': return 'bg-green-50 border-green-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'info': return 'bg-blue-50 border-blue-200';
      default: return 'bg-red-50 border-red-200';
    }
  }

  get errorBorderColor(): string {
    switch (this.type) {
      case 'success': return 'border-green-200';
      case 'warning': return 'border-yellow-200';
      case 'info': return 'border-blue-200';
      default: return 'border-red-200';
    }
  }

  get containerClass(): string {
    const baseClass = 'error-message';
    const sizeClass = `error-message--${this.size}`;
    const typeClass = `error-message--${this.type}`;
    
    return `${baseClass} ${sizeClass} ${typeClass}`.trim();
  }

  onActionClick(action: string): void {
    this.actionClick.emit(action);
  }

  onDismiss(): void {
    this.dismiss.emit();
  }

  getTitle(): string {
    if (this.title) return this.title;
    
    switch (this.type) {
      case 'success': return 'Succès';
      case 'warning': return 'Attention';
      case 'info': return 'Information';
      default: return 'Erreur';
    }
  }
}
