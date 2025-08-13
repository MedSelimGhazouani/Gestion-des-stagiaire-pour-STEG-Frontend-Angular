import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/core/Services/MessageService/message.service';
import { AuthserviceService } from 'src/app/core/Services/AuthService/authservice.service';
import { ConversationSummary } from '../../Models/ConversationSummary.model';
import { Message } from '../../Models/Message.model';

@Component({
  selector: 'app-admin-messages',
  templateUrl: './admin-messages.component.html',
  styleUrls: ['./admin-messages.component.scss']
})
export class AdminMessagesComponent implements OnInit {

  adminId!: string;
  conversations: ConversationSummary[] = [];
  selectedConversation: ConversationSummary | null = null;
  messages: Message[] = [];
  newMessage = '';
  loadingMessages = false;

  constructor(
    private messageService: MessageService,
    private authService: AuthserviceService
  ) {}

  ngOnInit(): void {
    this.adminId = this.authService.getCurrentUserId(); // Admin ID from login
    this.loadConversations();
  }

  loadConversations(): void {
    this.messageService.getInbox(this.adminId).subscribe({
  next: inbox => {
    console.log('Inbox data:', inbox); // ✅ Check what comes back
    this.conversations = inbox;
  },
  error: err => console.error('Error loading inbox', err)
});

  }
toggleDarkMode(event: Event) {
  const isDark = (event.target as HTMLInputElement).checked;
  document.body.classList.toggle('dark-mode', isDark);
}

  selectConversation(convo: ConversationSummary): void {
    this.selectedConversation = convo;
    this.loadMessages(convo.partnerId);
  }

  loadMessages(partnerId: string): void {
    this.loadingMessages = true;
    this.messageService.getConversation(this.adminId, partnerId).subscribe({
      next: msgs => {
        this.messages = msgs;
        this.loadingMessages = false;
        this.messageService.markConversationRead(this.adminId, partnerId).subscribe();
      },
      error: err => {
        console.error('Error loading messages', err);
        this.loadingMessages = false;
      }
    });
  }

  sendMessage(): void {
    const content = this.newMessage.trim();
    if (!content || !this.selectedConversation) return;

    const partnerId = this.selectedConversation.partnerId;

    // Optimistic push
    const temp: Message = {
      senderId: this.adminId,
      receiverId: partnerId,
      content,
      timestamp: new Date().toISOString(),
      read: false
    };
    this.messages.push(temp);

    this.messageService.sendMessage(this.adminId, partnerId, content).subscribe({
      next: msg => {
        this.messages[this.messages.length - 1] = msg;
      },
      error: err => console.error('Error sending message', err)
    });

    this.newMessage = '';
  }
}
