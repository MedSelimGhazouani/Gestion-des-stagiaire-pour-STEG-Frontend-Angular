export interface CertificateRequest {
  id: string; // Ensure this is required
  type: string;
  reason: string;
  status: 'REQUESTED' | 'APPROVED' | 'REJECTED';
  requestedAt: string;
  intern: {
    id: string;
    fullName: string;
    email: string;
    photoUrl?: string;
    specialty?: string;
  };
  showFullReason?: boolean; // ✅ Add this optional field for UI
}
