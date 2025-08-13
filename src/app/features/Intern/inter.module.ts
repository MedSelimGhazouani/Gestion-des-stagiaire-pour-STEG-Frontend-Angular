import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateAccountComponent } from './create-account/create-account.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { InternProfileComponent } from './intern-profile/intern-profile.component';

@NgModule({
  declarations: [
    CreateAccountComponent,
LoginComponent,
  ],
  imports: [
        FormsModule,
    CommonModule,
    ReactiveFormsModule,
        RouterModule,  // ✅ REQUIRED for routerLink to work
  SharedModule,        // <-- Add this
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // ✅ Only if you're still getting modal errors
})
export class InternModule { }
