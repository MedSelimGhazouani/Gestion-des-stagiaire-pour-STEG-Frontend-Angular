import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/features/Models/user.model';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/core/Services/AuthService/authservice.service';

@Component({
  selector: 'app-edit-intern-profile',
  templateUrl: './edit-intern-profile.component.html',
  styleUrls: ['./edit-intern-profile.component.css']
})
export class EditInternProfileComponent implements OnInit {
  editForm!: FormGroup;
  user!: User;
  selectedFile: File | null = null;
  previewUrl?: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthserviceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.getLoggedInUserProfile().subscribe({
      next: (data: User) => {
        this.user = data;

        this.editForm = this.fb.group({
          email: [data.email || '', [Validators.required, Validators.email]],
          phone: [data.phone || '', [Validators.required, Validators.pattern(/^\d{8}$/)]],
          
        });

        this.previewUrl = data.profileImageUrl;
      },
      error: (error: any) => {
        console.error('Failed to load user:', error);
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onSubmit(): void {
    if (this.editForm.invalid || !this.user.id) return;

    const updatedUser: User = {
      ...this.user,
      ...this.editForm.value
    };

    this.authService.updateInternProfile(this.user.id, updatedUser, this.selectedFile ?? undefined).subscribe({
      next: () => {
        alert('Profile updated successfully!');
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        console.error('Profile update failed:', error);
        alert('Update failed.');
      }
    });
  }
}
