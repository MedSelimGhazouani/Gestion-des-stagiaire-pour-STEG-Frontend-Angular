import { Component, OnInit } from '@angular/core';
import { CertificateService } from 'src/app/core/Services/CertificateService/certificate-request.service';
import { CertificateRequest } from '../../Models/certificate-request.model';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-intern-certificates',
  templateUrl: './intern-certificates.component.html',
  styleUrls: ['./intern-certificates.component.css']
})
export class InternCertificatesComponent implements OnInit {
  certificateRequests: CertificateRequest[] = [];
  columnsToDisplay = ['name', 'type', 'reason', 'status', 'actions'];
  loading = false;

  constructor(
    private certificateService: CertificateService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCertificateRequests();
  }

  loadCertificateRequests(): void {
    this.loading = true;
    this.certificateService.getAllRequests().subscribe({
      next: (data) => {
        this.certificateRequests = data.map(req => ({ ...req, showFullReason: false }));
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching certificate requests', err);
        this.loading = false;
      }
    });
  }

  approveCertificate(request: CertificateRequest): void {
    this.certificateService.approveRequest(request.id!).subscribe({
      next: (updated) => {
        request.status = 'APPROVED';
        this.showSnackBar('Request approved and email sent!');
      },
      error: () => this.showSnackBar('Error approving request', true)
    });
  }

  rejectCertificate(request: CertificateRequest): void {
    this.certificateService.rejectRequest(request.id!).subscribe({
      next: () => {
        request.status = 'REJECTED';
        this.showSnackBar('Request rejected');
      },
      error: () => this.showSnackBar('Error rejecting request', true)
    });
  }

  getStatusClass(status: string): string {
    return {
      REQUESTED: 'badge badge-warning',
      APPROVED: 'badge badge-success',
      REJECTED: 'badge badge-danger'
    }[status] || 'badge badge-secondary';
  }

  toggleReason(request: CertificateRequest): void {
    request.showFullReason = !request.showFullReason;
  }

  private showSnackBar(message: string, isError = false) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: isError ? ['snackbar-error'] : ['snackbar-success']
    });
  }
}