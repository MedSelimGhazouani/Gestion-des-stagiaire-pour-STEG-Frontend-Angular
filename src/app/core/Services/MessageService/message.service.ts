import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/features/Models/user.model';
import { ConversationSummary } from 'src/app/features/Models/ConversationSummary.model';
import { Message } from 'src/app/features/Models/Message.model';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private msgApi = 'https://gestion-des-stagiaire-pour-steg-backend.onrender.com/api/messages';
  private userApi = 'https://gestion-des-stagiaire-pour-steg-backend.onrender.com/api/users';

  constructor(private http: HttpClient) {}

  /** Get the first Admin user. */
  getAdminUser(): Observable<User> {
    return this.http.get<User>(`${this.userApi}/admin`);
  }

  /** Full conversation between 2 users. */
  getConversation(userA: string, userB: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.msgApi}/conversation/${userA}/${userB}`);
  }

  /** Send a message. */
  sendMessage(senderId: string, receiverId: string, content: string): Observable<Message> {
    return this.http.post<Message>(`${this.msgApi}/send`, { senderId, receiverId, content });
  }

  /** Mark partner→current as read. */
  markConversationRead(currentUserId: string, partnerId: string): Observable<void> {
    return this.http.put<void>(`${this.msgApi}/read/${currentUserId}/${partnerId}`, {});
  }

  /** (Optional) inbox summaries — not used in single‑admin mode but kept. */
  getInbox(userId: string): Observable<ConversationSummary[]> {
    return this.http.get<ConversationSummary[]>(`${this.msgApi}/inbox/${userId}`);
  }
}
