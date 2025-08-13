import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/features/Models/user.model';
import { MatTableDataSource } from '@angular/material/table';
import { AuthserviceService } from 'src/app/core/Services/AuthService/authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  users: User[] = [];
  filteredUsers = new MatTableDataSource<User>();
  searchText: string = '';

  totalUsers = 0;
  pendingCount = 0;
  verifiedCount = 0;

  columnsToDisplay: string[] = ['photo', 'name', 'email', 'tel', 'specialty'];

  constructor(private userService: AuthserviceService, private router: Router) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getAllInterns().subscribe({
      next: (users: User[]) => {
        this.users = users;
        this.filteredUsers.data = users;

        this.totalUsers = users.length;
        this.pendingCount = users.filter(u => u.status === 'INACTIVE').length;
        this.verifiedCount = users.filter(u => u.status === 'ACTIVE').length;
      },
      error: (err) => {
        console.error('Failed to load users:', err);
      }
    });
  }
onUserRowClick(user: any) {
  this.router.navigate(['/admin/intern-detail', user.id]);
}

  applyFilter(): void {
    const filterValue = this.searchText.trim().toLowerCase();
    this.filteredUsers.filter = filterValue;
  }

  verify(user: User): void {
    this.userService.verifyIntern(user.id!).subscribe({
      next: () => {
        user.status = 'ACTIVE';
        this.fetchUsers();
      },
      error: err => console.error('Verification failed', err)
    });
  }

  delete(user: User): void {
    this.userService.deleteUser(user.id!).subscribe({
      next: () => {
        this.fetchUsers();
      },
      error: err => console.error('Delete failed', err)
    });
  }

  

}
