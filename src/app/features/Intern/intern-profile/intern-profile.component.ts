import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/core/Services/AuthService/authservice.service';
import { User } from '../../Models/user.model';

@Component({
  selector: 'app-intern-profile',
  templateUrl: './intern-profile.component.html',
  styleUrls: ['./intern-profile.component.css']
})
export class InternProfileComponent {

  constructor(private router: Router, private authService: AuthserviceService) {}

 user: User | null = null;
  ngOnInit(): void {
    this.authService.getLoggedInUserProfile().subscribe({
      next: (data: User) => {
        this.user = data;
      },
      error: (err) => {
        console.error('Failed to load profile', err);
      }
    });
  }
  goToEditProfile() {
  this.router.navigate(['/edit-profile']);
}

// intern-profile.component.ts
 logout() {
  this.authService.logout().subscribe({
    next: (res) => {
      console.log(res.message); // "Logout successful."
      this.router.navigate(['/login']);
    },
    error: (err) => {
      console.error('Logout failed', err);
    }
  });
}


}
