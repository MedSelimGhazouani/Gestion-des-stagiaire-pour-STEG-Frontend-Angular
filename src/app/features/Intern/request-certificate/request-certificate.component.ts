import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CertificateService } from 'src/app/core/Services/CertificateService/certificate-request.service';
import { AuthserviceService } from 'src/app/core/Services/AuthService/authservice.service';

@Component({
  selector: 'app-request-certificate',
  templateUrl: './request-certificate.component.html',
  styleUrls: ['./request-certificate.component.css']
})
export class RequestCertificateComponent implements OnInit {
  requestForm!: FormGroup;
  internId: string = '';
  loading: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private certService: CertificateService,
    private authService: AuthserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.internId = this.authService.getCurrentUserId();

    if (!this.internId) {
      console.error('Intern ID not found! Redirecting to login...');
      this.router.navigate(['/login']);
      return;
    }

    this.requestForm = this.fb.group({
      type: ['', Validators.required],
      reason: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    if (this.requestForm.invalid) return;

    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    const payload = {
      type: this.requestForm.value.type,
      reason: this.requestForm.value.reason
    };

    this.certService.requestCertificate(this.internId, payload).subscribe({
      next: (res) => {
        this.successMessage = '✅ Request submitted successfully!';
        this.requestForm.reset();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error submitting request:', err);
        this.errorMessage = '❌ Failed to submit request. Try again later.';
        this.loading = false;
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/intern/dashboard']);
  }
}
