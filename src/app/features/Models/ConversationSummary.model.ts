export interface ConversationSummary {
  partnerId: string;
  partnerName: string;
  partnerEmail?: string;
  partnerPhotoUrl?: string;
  lastMessagePreview: string;
  lastMessageTime: Date;
  lastMessageFromPartner: boolean;
  unreadCount: number;
}