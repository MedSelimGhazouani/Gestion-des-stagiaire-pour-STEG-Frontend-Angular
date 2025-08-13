import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InternTask } from 'src/app/features/Models/intern-task.model';

@Injectable({ providedIn: 'root' })
export class InternTaskService {
  private baseUrl = 'https://gestion-des-stagiaire-pour-steg-backend.onrender.com/api/tasks';

  constructor(private http: HttpClient) {}

  /**
   * Load all tasks for intern in a date range (inclusive).
   * Dates must be ISO 'yyyy-MM-dd'.
   */
  getTasksForRange(internId: string, from: string, to: string): Observable<InternTask[]> {
  const params = new HttpParams().set('from', from).set('to', to);
  return this.http.get<InternTask[]>(`${this.baseUrl}/intern/${internId}/range`, { params });
}

  /**
   * Upsert task for intern + date.
   */
  upsertTask(internId: string, date: string, payload: { description: string; status: string }): Observable<InternTask> {
    return this.http.post<InternTask>(`${this.baseUrl}/intern/${internId}/${date}`, payload);
  }

  deleteTask(taskId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${taskId}`);
  }
 getTasks(internId: string, from: string, to: string): Observable<InternTask[]> {
  return this.getTasksForRange(internId, from, to);
}


}
