import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intern-home',
  templateUrl: './intern-home.component.html',
  styleUrls: ['./intern-home.component.css']
})

export class InternHomeComponent {
  constructor(private router: Router) {}
goToProfile() {
  this.router.navigate(['/profile']);
}
goToCalendar() {
  this.router.navigate(['/intern-calendar']);
}
goToRequestCertificate() {
  this.router.navigate(['/request-certificate']);
}
goToInternMessages() {
  this.router.navigate(['/intern-messages']);
}
}
