import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { AdminHeaderComponent } from './shared/components/admin/admin-header/admin-header.component';
import { AdminFooterComponent } from './shared/components/admin/admin-footer/admin-footer.component';
import { AdminSidebarComponent } from './shared/components/admin/admin-sidebar/admin-sidebar.component';
import { UserHeaderComponent } from './shared/components/user/user-header/user-header.component';
import { UserFooterComponent } from './shared/components/user/user-footer/user-footer.component';
import { AdminHomeComponent } from './shared/components/admin/admin-home/admin-home.component';
import { UserHomeComponent } from './shared/components/user/user-home/user-home.component';
import { LoginComponent } from './features/Intern/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from './shared/modal/modal.component';
import { InternModule } from './features/Intern/inter.module';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { InternHomeComponent } from './features/Intern/intern-home/intern-home.component';
import { InternProfileComponent } from './features/Intern/intern-profile/intern-profile.component';
import { EditInternProfileComponent } from './features/Intern/edit-intern-profile/edit-intern-profile.component';
import { InternCalendarComponent } from './features/Intern/intern-calendar/intern-calendar.component';
import { RequestCertificateComponent } from './features/Intern/request-certificate/request-certificate.component';
import { InternMessagesComponent } from './features/Intern/intern-messages/intern-messages.component';
import { MainAdminLayoutComponent } from './layouts/main-admin-layout/main-admin-layout.component';
import { AdminDashboardComponent } from './features/Admin/admin-dashboard/admin-dashboard.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForgotPasswordComponent } from './features/Intern/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './features/Intern/reset-password/reset-password.component';
import { InternRequestComponent } from './features/Admin/intern-request/intern-request.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { InternCertificatesComponent } from './features/Admin/intern-certificates/intern-certificates.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AdminMessagesComponent } from './features/Admin/admin-messages/admin-messages.component';
import { InternDetailsComponent } from './features/Admin/intern-details/intern-details.component';
import { SharedModule } from "src/app/shared/shared.module";




@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    UserLayoutComponent,
    AdminHeaderComponent,
    AdminFooterComponent,
    AdminSidebarComponent,
    UserHeaderComponent,
    UserFooterComponent,
    AdminHomeComponent,
    UserHomeComponent,
    MainLayoutComponent,
    InternHomeComponent,
    InternProfileComponent,
    EditInternProfileComponent,
    RequestCertificateComponent,
    InternMessagesComponent,
    MainAdminLayoutComponent,
    AdminDashboardComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    InternRequestComponent,
    InternCertificatesComponent,
    AdminMessagesComponent,
    InternDetailsComponent,
         

    
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatSortModule,
    BrowserAnimationsModule,
    MatSnackBarModule, // ✅ Add this here
    HttpClientModule,
    MatProgressBarModule,
    SharedModule
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
