import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { AuthserviceService } from 'src/app/core/Services/AuthService/authservice.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {
  accountForm!: FormGroup; // Added definite assignment assertion
  showPassword = false;
  isLoading = false;
  showTermsModal = false;
  showPrivacyModal = false;
  enableAdminRegistration = false;
    selectedPhoto!: File;


  constructor(private fb: FormBuilder, private authService: AuthserviceService) {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.accountForm = this.fb.group({
      role: ['intern', Validators.required],
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      password: ['', [
        Validators.required, 
        Validators.minLength(8),
        this.passwordStrengthValidator()
      ]],
      confirmPassword: ['', [Validators.required]],
      university: [''],
      specialty: [''],
            photo: [null],

      termsAccepted: [false, [Validators.requiredTrue]]
    }, { validators: this.passwordMatchValidator });
  }

  // Password strength validator
  passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (!value) {
        return null;
      }

      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumeric = /[0-9]/.test(value);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);

      const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;

      return !passwordValid ? { passwordStrength: true } : null;
    };
  }

  // Password match validator
  passwordMatchValidator: ValidatorFn = (control: AbstractControl): { [key: string]: any } | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password && confirmPassword && password !== confirmPassword 
      ? { mismatch: true } 
      : null;
  };

  // Get password strength class for UI
  getPasswordStrengthClass(): string {
    const password = this.accountForm.get('password')?.value;
    if (!password) return 'strength-none';

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumeric = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const lengthValid = password.length >= 8;

    if (!lengthValid) return 'strength-weak';
    if (!(hasUpperCase && hasLowerCase && hasNumeric)) return 'strength-medium';
    return hasSpecialChar ? 'strength-strong' : 'strength-medium';
  }

  // Get password strength text for UI
  getPasswordStrengthText(): string {
    const strengthClass = this.getPasswordStrengthClass();
    return strengthClass.includes('weak') ? 'Weak' : 
           strengthClass.includes('medium') ? 'Medium' : 'Strong';
  }

  // Rest of your existing methods...
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  openTermsModal(event: Event): void {
    event.preventDefault();
    this.showTermsModal = true;
  }

  closeTermsModal(): void {
    this.showTermsModal = false;
  }

  openPrivacyModal(event: Event): void {
    event.preventDefault();
    this.showPrivacyModal = true;
  }

  closePrivacyModal(): void {
    this.showPrivacyModal = false;
  }

 onSubmit(): void {
  if (this.accountForm.invalid) {
    this.accountForm.markAllAsTouched();
    return;
  }

  this.isLoading = true;
  const formValue = this.accountForm.value;

  const formData = new FormData();
  formData.append('fullName', formValue.fullName);
  formData.append('email', formValue.email);
  formData.append('password', formValue.password);
  formData.append('university', formValue.university || '');
  formData.append('specialty', formValue.specialty || '');
  formData.append('phone', formValue.phone);

  if (this.selectedPhoto) {
    formData.append('photo', this.selectedPhoto); // ✅ match DTO
  }

  this.authService.registerIntern(formData).subscribe({
    next: (response) => {
      console.log('Registration successful:', response);
      alert('Registration successful');
    },
    error: (error) => {
      console.error('Registration failed:', error);
      let msg = 'Registration failed';
      if (error.error) {
        if (typeof error.error === 'string') {
          msg = error.error;
        } else if (error.error.message) {
          msg = error.error.message;
        }
      }
      alert(msg);
    },
    complete: () => {
      this.isLoading = false;
    }
  });
}



onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.selectedPhoto = input.files[0];
  }
}

}