import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

export type FieldType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'textarea' | 'select' | 'date' | 'checkbox' | 'radio' | 'file' | 'chips';

export interface FieldOption {
  value: any;
  label: string;
  disabled?: boolean;
}

export interface FieldValidation {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  min?: number;
  max?: number;
  email?: boolean;
  custom?: (value: any) => boolean;
}

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormFieldComponent),
      multi: true
    }
  ],
  templateUrl: './form-field.html',
  styleUrls: ['./form-field.scss']
})
export class FormFieldComponent implements ControlValueAccessor {
  @Input() type: FieldType = 'text';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() name: string = '';
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() options: FieldOption[] = [];
  @Input() validation: FieldValidation = {};
  @Input() helpText: string = '';
  @Input() errorText: string = '';
  @Input() showLabel: boolean = true;
  @Input() showHelpText: boolean = true;
  @Input() showErrorText: boolean = true;
  @Input() appearance: 'outline' | 'fill' | 'standard' = 'outline';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() maxFileSize: number = 5 * 1024 * 1024; // 5MB
  @Input() acceptedFileTypes: string[] = [];
  @Input() multiple: boolean = false;

  value: any = '';
  touched: boolean = false;
  onChange = (value: any) => {};
  onTouched = () => {};

  get fieldClass(): string {
    const baseClass = 'form-field';
    const sizeClass = `form-field--${this.size}`;
    const typeClass = `form-field--${this.type}`;
    
    return `${baseClass} ${sizeClass} ${typeClass}`.trim();
  }

  get isRequired(): boolean {
    return this.required || this.validation.required || false;
  }

  get hasError(): boolean {
    return !!this.errorText;
  }

  get isFileType(): boolean {
    return this.type === 'file';
  }

  get isSelectType(): boolean {
    return this.type === 'select';
  }

  get isDateType(): boolean {
    return this.type === 'date';
  }

  get isCheckboxType(): boolean {
    return this.type === 'checkbox';
  }

  get isRadioType(): boolean {
    return this.type === 'radio';
  }

  get isChipsType(): boolean {
    return this.type === 'chips';
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange(event: any): void {
    const value = event.target?.value || event.value || event.checked;
    this.value = value;
    this.onChange(value);
    this.markAsTouched();
  }

  onFileChange(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      const fileList = Array.from(files);
      this.value = this.multiple ? fileList : fileList[0];
      this.onChange(this.value);
      this.markAsTouched();
    }
  }

  onChipAdd(event: any): void {
    if (event.value && event.value.trim()) {
      const newChip = event.value.trim();
      if (!this.value.includes(newChip)) {
        this.value = [...this.value, newChip];
        this.onChange(this.value);
        this.markAsTouched();
      }
      event.chipInput?.clear();
    }
  }

  onChipRemove(chip: string): void {
    this.value = this.value.filter((c: string) => c !== chip);
    this.onChange(this.value);
    this.markAsTouched();
  }

  private markAsTouched(): void {
    if (!this.touched) {
      this.touched = true;
      this.onTouched();
    }
  }

  validateFile(file: File): boolean {
    if (this.maxFileSize && file.size > this.maxFileSize) {
      this.errorText = `Le fichier est trop volumineux. Taille maximale: ${this.maxFileSize / (1024 * 1024)}MB`;
      return false;
    }

    if (this.acceptedFileTypes.length > 0) {
      const fileType = file.type;
      if (!this.acceptedFileTypes.includes(fileType)) {
        this.errorText = `Type de fichier non supporté. Types acceptés: ${this.acceptedFileTypes.join(', ')}`;
        return false;
      }
    }

    return true;
  }
}
