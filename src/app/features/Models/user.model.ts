export interface User {
  id?: string;                // MongoDB ID (optional when creating)
  fullName: string;
  email: string;
  password?: string;          // Usually not sent from backend for security, but used in frontend forms
  phone?: string;
  //profileImageUrl?: string;

  role: 'INTERN' | 'ADMIN';

  status?: 'ACTIVE' | 'INACTIVE';

  department?: string;
  specialty?: string;
  university?: string;
  level?: string;
  internshipType?: string;

  startDate?: string;         // ISO date string (e.g. "2025-07-12")
  endDate?: string;  
    profileImageUrl?: string;

  assignedSupervisorId?: string;

  resetToken?: string;

  

  certificateRequested?: boolean;
}
