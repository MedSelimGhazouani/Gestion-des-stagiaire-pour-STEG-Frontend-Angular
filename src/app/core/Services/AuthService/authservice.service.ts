import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from 'src/app/features/Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  private apiUrl = 'https://gestion-des-stagiaire-pour-steg-backend.onrender.com/api/users';
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  registerIntern(data: any): Observable<string> {
    return this.http.post(`${this.apiUrl}/register-intern`, data, { responseType: 'text' });
  }

  login(credentials: any): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, credentials, { withCredentials: true });
  }

  logout() {
    return this.http.post<{ message: string }>(`${this.apiUrl}/logout`, {}, { withCredentials: true });
  }

  setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getAllInterns(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/all-interns`);
  }

  verifyIntern(userId: string): Observable<string> {
    return this.http.post(`${this.apiUrl}/verify-intern/${userId}`, null, { responseType: 'text' });
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }

  getLoggedInUserProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profile`, { withCredentials: true });
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  forgotPassword(email: string) {
    return this.http.post<{ message: string }>(`${this.apiUrl}/forgot-password`, { email });
  }

  resetPassword(token: string, newPassword: string) {
    return this.http.post<{ message: string }>(`${this.apiUrl}/reset-password`, {
      token,
      newPassword
    });
  }

  getCertificateRequests(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/certificate-requests`);
  }

  getCurrentUserId(): string {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user?.id || '';
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // ✅ Final version of updateInternProfile
  updateInternProfile(id: string, user: User, image?: File): Observable<any> {
    const formData = new FormData();

    const userBlob = new Blob([JSON.stringify(user)], {
      type: 'application/json'
    });

    formData.append('user', userBlob);

    if (image) {
      formData.append('image', image);
    }

    return this.http.put(`${this.apiUrl}/update/${id}`, formData);
  }

  getLoggedInUser(): User | null {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }
}
