import { Component } from '@angular/core';
import { AuthserviceService } from 'src/app/core/Services/AuthService/authservice.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

 email = '';
  message = '';
  error = '';

  constructor(private authService: AuthserviceService) {}

  onSubmit() {
    this.authService.forgotPassword(this.email).subscribe({
      next: (res) => {
        this.message = res.message;
        this.error = '';
      },
      error: (err) => {
        this.error = err.error.error;
        this.message = '';
      }
    });
  }
}