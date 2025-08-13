export interface Message {
  id?: string;
  senderId: string;
  senderName?: string;
  receiverId: string;
  receiverName?: string;
  content: string;
  timestamp: string;   // ISO string
  read: boolean;
}
