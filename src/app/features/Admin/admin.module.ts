import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // required for [(ngModel)]
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { InternCalendarComponent } from '../Intern/intern-calendar/intern-calendar.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [

  ],
  imports: [
     CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatSortModule,
        BrowserAnimationsModule, 
            MatProgressBarModule, 
            MatSnackBarModule ,      // ✅ Add this
// ✅ Required for Material
  SharedModule,        // <-- Add this


  ],
   schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdminModule {}
