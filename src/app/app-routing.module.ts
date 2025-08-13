import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { CreateAccountComponent } from './features/Intern/create-account/create-account.component';
import { LoginComponent } from './features/Intern/login/login.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { InternHomeComponent } from './features/Intern/intern-home/intern-home.component';
import { InternProfileComponent } from './features/Intern/intern-profile/intern-profile.component';
import { EditInternProfileComponent } from './features/Intern/edit-intern-profile/edit-intern-profile.component';
import { InternCalendarComponent } from './features/Intern/intern-calendar/intern-calendar.component';
import { RequestCertificateComponent } from './features/Intern/request-certificate/request-certificate.component';
import { InternMessagesComponent } from './features/Intern/intern-messages/intern-messages.component';
import { AdminDashboardComponent } from './features/Admin/admin-dashboard/admin-dashboard.component';
import { ForgotPasswordComponent } from './features/Intern/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './features/Intern/reset-password/reset-password.component';
import { InternRequestComponent } from './features/Admin/intern-request/intern-request.component';
import { InternCertificatesComponent } from './features/Admin/intern-certificates/intern-certificates.component';
import { AdminMessagesComponent } from './features/Admin/admin-messages/admin-messages.component';
import { InternDetailsComponent } from './features/Admin/intern-details/intern-details.component';

const routes: Routes = [
  { path: 'admin',
    component: AdminLayoutComponent },
  { path: 'user',
    component: UserLayoutComponent
  },

   { path: 'login',
    component: LoginComponent
  },

  { path: 'create-account',
    component: CreateAccountComponent
  },
  
  { path: 'forget-password',
    component: ForgotPasswordComponent
  },
  { path: 'reset-password',
    component: ResetPasswordComponent
  },

  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
     
      { path: 'admin-dashboard', component: AdminDashboardComponent },
            { path: 'interns-requests', component: InternRequestComponent },
             { path: 'intern-certificates', component: InternCertificatesComponent },
                          { path: 'admin-messages', component: AdminMessagesComponent },
                         { path: 'intern-detail/:id', component: InternDetailsComponent },

                          

             

            

      //{ path: 'dashboard', component: AdminDashboardComponent },
      //{ path: 'manage-interns', component: ManageInternsComponent },
      //{ path: 'job-postings', component: JobPostingsComponent },
      // Add more routes here as needed
    ]
  },

  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: InternHomeComponent },
      { path: 'profile', component: InternProfileComponent },
   { path: 'edit-profile', component: EditInternProfileComponent },  // <-- this one is required
    { path: 'intern-calendar', component: InternCalendarComponent },
        { path: 'request-certificate', component: RequestCertificateComponent },
        { path: 'intern-messages', component: InternMessagesComponent },

        

    

      //{ path: 'profile', component: ProfileComponent },
      // other routes
    ]
  },
{ 
    path: '', 
    component: CreateAccountComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
