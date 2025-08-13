// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalComponent } from './modal/modal.component';
import { InternCalendarComponent } from '../features/Intern/intern-calendar/intern-calendar.component';

@NgModule({
  declarations: [
    ModalComponent,
    InternCalendarComponent  // ✅ Declare here
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ModalComponent,
    InternCalendarComponent  // ✅ Export after declaring
  ]
})
export class SharedModule {}
