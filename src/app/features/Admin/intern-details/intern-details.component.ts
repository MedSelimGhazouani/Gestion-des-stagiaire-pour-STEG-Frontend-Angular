import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/features/Models/user.model';
import { AuthserviceService } from 'src/app/core/Services/AuthService/authservice.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-intern-details',
  templateUrl: './intern-details.component.html',
  styleUrls: ['./intern-details.component.scss']
})
export class InternDetailsComponent implements OnInit {
  intern!: User | null;
  internId!: string;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthserviceService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.internId = this.route.snapshot.paramMap.get('id') || '';
    this.loadInternInfo();
  }

  loadInternInfo() {
    this.authService.getUserById(this.internId).subscribe({
      next: (user) => (this.intern = user),
      error: (err) => console.error('Error fetching intern info', err)
    });
  }

  goBack() {
    this.location.back();
  }
}
