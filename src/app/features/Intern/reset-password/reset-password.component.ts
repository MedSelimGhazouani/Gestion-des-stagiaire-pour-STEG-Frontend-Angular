import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthserviceService } from 'src/app/core/Services/AuthService/authservice.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

 token = '';
  newPassword = '';
  message = '';
  error = '';

  constructor(private route: ActivatedRoute, private authService: AuthserviceService) {}

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
  }

  onSubmit() {
    this.authService.resetPassword(this.token, this.newPassword).subscribe({
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