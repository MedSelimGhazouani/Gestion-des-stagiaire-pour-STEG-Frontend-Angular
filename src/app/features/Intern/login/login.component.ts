import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from 'src/app/core/Services/AuthService/authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword: boolean = false;
  isLoading: boolean = false;
  loginError: string | null = null;
loginSuccess: string | null = null;

errorMessage: string = '';


  constructor(private router: Router,private fb: FormBuilder, private authService: AuthserviceService) {} // ✅ Inject FormBuilder here

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  /*onLogin() {
    if (this.loginForm.invalid) return;
    this.isLoading = true;
    // 🔐 Add login logic here
  }*/
 onLogin() {
  if (this.loginForm.invalid) return;

 this.authService.login(this.loginForm.value).subscribe({
  next: (user) => {
    this.authService.setCurrentUser(user); // ✅ Save user in service & localStorage

    // Redirect based on role
    if (user.role === 'ADMIN') {
      this.router.navigate(['/admin/admin-dashboard']);
    } else if (user.role === 'INTERN') {
      this.router.navigate(['/dashboard']);
    }
  },
  error: (err) => {
    this.errorMessage = 'Login failed. Please check your credentials.';
  }
});

}
}
