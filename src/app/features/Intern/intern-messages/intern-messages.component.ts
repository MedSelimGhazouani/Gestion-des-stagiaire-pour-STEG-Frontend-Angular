import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/core/Services/MessageService/message.service';
import { AuthserviceService } from 'src/app/core/Services/AuthService/authservice.service';
import { User } from '../../Models/user.model';
import { Message } from '../../Models/Message.model';

@Component({
  selector: 'app-intern-messages',
  templateUrl: './intern-messages.component.html',
  styleUrls: ['./intern-messages.component.scss']
})
export class InternMessagesComponent implements OnInit {

  currentUserId!: string;
  admin!: User;            // loaded admin
  adminId!: string;

  loading = false;
  errorMsg = '';
  messages: Message[] = [];
  newMessage = '';

  constructor(
    private messageService: MessageService,
    private authService: AuthserviceService
  ) {}

  ngOnInit(): void {
    // 🔐 who am I?
    this.currentUserId = this.authService.getCurrentUserId();
    if (!this.currentUserId) {
      this.errorMsg = 'Unable to identify current user.';
      return;
    }

    // 👮 load admin
    this.messageService.getAdminUser().subscribe({
      next: admin => {
        this.admin = admin;
        this.adminId = admin.id || '';
        if (!this.adminId) {
          this.errorMsg = 'Admin ID missing.';
          return;
        }
        this.loadConversation();
      },
      error: err => {
        console.error('Failed to load admin', err);
        this.errorMsg = 'Could not load admin account.';
      }
    });
  }

  loadConversation(): void {
    if (!this.currentUserId || !this.adminId) return;
    this.loading = true;
    this.messageService.getConversation(this.currentUserId, this.adminId).subscribe({
      next: msgs => {
        this.messages = msgs;
        this.loading = false;
        // mark read
        this.messageService.markConversationRead(this.currentUserId, this.adminId).subscribe();
      },
      error: err => {
        console.error('Error loading conversation', err);
        this.errorMsg = 'Could not load messages.';
        this.loading = false;
      }
    });
  }

  sendMessage(): void {
    const text = this.newMessage.trim();
    if (!text || !this.adminId) return;

    // optimistic push
    const temp: Message = {
      senderId: this.currentUserId,
      receiverId: this.adminId,
      content: text,
      timestamp: new Date().toISOString(),
      read: false
    };
    this.messages.push(temp);

    this.messageService.sendMessage(this.currentUserId, this.adminId, text).subscribe({
      next: saved => {
        // replace last temp if you want; simplest is append saved
        // but to avoid duplicates you could pop temp first.
        this.messages[this.messages.length - 1] = saved;
      },
      error: err => {
        console.error('Error sending message', err);
        this.errorMsg = 'Message not sent.';
      }
    });

    this.newMessage = '';
  }

  // convenience binding for template
  get partnerName(): string {
    return this.admin?.fullName || 'Admin';
  }
}
