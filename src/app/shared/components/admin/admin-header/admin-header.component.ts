import { Component, AfterViewInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/core/Services/AuthService/authservice.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements AfterViewInit {
  isDarkMode = false;
  constructor(
    private router: Router,
    private authService: AuthserviceService,
    private renderer: Renderer2
  ) {}

   ngOnInit(): void {
    const saved = localStorage.getItem('darkMode');
    if (saved === 'true') {
      this.enableDarkMode();
    }
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      this.enableDarkMode();
    } else {
      this.disableDarkMode();
    }
    localStorage.setItem('darkMode', String(this.isDarkMode));
  }

  enableDarkMode(): void {
    this.renderer.addClass(document.body, 'dark-mode');
  }
  disableDarkMode(): void {
    this.renderer.removeClass(document.body, 'dark-mode');
  }
  ngAfterViewInit() {
    const colorSwitch = document.getElementById('colorSwitch') as HTMLInputElement;

    if (colorSwitch) {
      colorSwitch.addEventListener('change', () => {
        if (colorSwitch.checked) {
          this.renderer.addClass(document.body, 'dark-mode');
        } else {
          this.renderer.removeClass(document.body, 'dark-mode');
        }
      });
    }
  }

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



