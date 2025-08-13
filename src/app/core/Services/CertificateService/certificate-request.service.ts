import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CertificateRequest } from 'src/app/features/Models/certificate-request.model';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {
  private apiUrl = 'https://gestion-des-stagiaire-pour-steg-backend.onrender.com/api/certificates';

  constructor(private http: HttpClient) {}

  requestCertificate(internId: string, payload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/request/${internId}`, payload);
  }

  approveRequest(id: string): Observable<CertificateRequest> {
    return this.http.put<CertificateRequest>(`${this.apiUrl}/approve/${id}`, {});
  }

  rejectRequest(id: string): Observable<CertificateRequest> {
    return this.http.put<CertificateRequest>(`${this.apiUrl}/reject/${id}`, {});
  }

  getInternRequests(internId: string): Observable<CertificateRequest[]> {
    return this.http.get<CertificateRequest[]>(`${this.apiUrl}/intern/${internId}`);
  }

  deleteRequest(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getAllRequests(): Observable<CertificateRequest[]> {
    return this.http.get<CertificateRequest[]>(`${this.apiUrl}/all`);
  }

  updateRequestStatus(requestId: string, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-status/${requestId}`, { status });
  }
}
