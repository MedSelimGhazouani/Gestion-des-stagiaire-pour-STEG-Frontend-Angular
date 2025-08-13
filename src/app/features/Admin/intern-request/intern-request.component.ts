import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/core/Services/AuthService/authservice.service';
import { User } from '../../Models/user.model';

@Component({
  selector: 'app-intern-request',
  templateUrl: './intern-request.component.html',
  styleUrls: ['./intern-request.component.css']
})
export class InternRequestComponent implements OnInit {
  pendingInterns: User[] = [];
  columnsToDisplay = ['photo', 'name', 'email', 'specialty', 'actions'];

  constructor(private authService: AuthserviceService) {}

  ngOnInit(): void {
    this.authService.getAllInterns().subscribe(users => {
      this.pendingInterns = users.filter(user => user.status === 'INACTIVE');
    });
  }
fetchUsers(): void {
    this.authService.getAllInterns().subscribe({
      next: (users: User[]) => {
        this.pendingInterns = users;
       
      },
      error: (err) => {
        console.error('Failed to load users:', err);
      }
    });
  }
  verify(user: User): void {
    this.authService.verifyIntern(user.id!).subscribe({
      next: () => {
        user.status = 'ACTIVE';
        this.fetchUsers();
      },
      error: err => console.error('Verification failed', err)
    });
  }

  delete(user: User): void {
    this.authService.deleteUser(user.id!).subscribe({
      next: () => {
        this.fetchUsers();
      },
      error: err => console.error('Delete failed', err)
    });
  }
}