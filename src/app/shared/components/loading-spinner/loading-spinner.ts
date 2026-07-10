import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';

export type SpinnerType = 'circular' | 'linear' | 'dots' | 'pulse';
export type SpinnerSize = 'small' | 'medium' | 'large';
export type SpinnerColor = 'primary' | 'accent' | 'warn' | 'white';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  templateUrl: './loading-spinner.html',
  styleUrls: ['./loading-spinner.scss']
})
export class LoadingSpinnerComponent {
  @Input() type: SpinnerType = 'circular';
  @Input() size: SpinnerSize = 'medium';
  @Input() color: SpinnerColor = 'primary';
  @Input() message: string = '';
  @Input() showMessage: boolean = true;
  @Input() overlay: boolean = false;
  @Input() fullScreen: boolean = false;

  get spinnerSize(): number {
    switch (this.size) {
      case 'small': return 24;
      case 'large': return 64;
      default: return 40;
    }
  }

  get spinnerClass(): string {
    const baseClass = 'loading-spinner';
    const sizeClass = `loading-spinner--${this.size}`;
    const colorClass = `loading-spinner--${this.color}`;
    const overlayClass = this.overlay ? 'loading-spinner--overlay' : '';
    const fullScreenClass = this.fullScreen ? 'loading-spinner--fullscreen' : '';
    
    return `${baseClass} ${sizeClass} ${colorClass} ${overlayClass} ${fullScreenClass}`.trim();
  }

  get containerClass(): string {
    if (this.fullScreen) {
      return 'fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90';
    }
    if (this.overlay) {
      return 'absolute inset-0 z-40 flex items-center justify-center bg-white bg-opacity-75';
    }
    return 'flex items-center justify-center';
  }
}
