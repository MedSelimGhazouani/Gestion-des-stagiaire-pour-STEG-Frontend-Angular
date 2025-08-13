import { Component, Input, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/core/Services/AuthService/authservice.service';
import { InternTask, TaskStatus } from 'src/app/features/Models/intern-task.model';
import { CalendarDay } from '../../Models/CalendarDay.model';
import { InternTaskService } from 'src/app/core/Services/InternTasks/intern-tasks.service';

@Component({
  selector: 'app-intern-calendar',
  templateUrl: './intern-calendar.component.html',
  styleUrls: ['./intern-calendar.component.css'] // or .css
})
export class InternCalendarComponent implements OnInit {
  @Input() internId!: string;

  /** Disable editing when true (Admin read-only view). */
  @Input() readOnly = false;

  // Calendar structure
  currentYear!: number;
  currentMonth!: number; // 0-11
  monthNames = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ];
  weekDays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  calendarDays: CalendarDay[] = [];

  // Data
  tasksMap = new Map<string, InternTask>();  // key = yyyy-MM-dd

  // Modal
  showTaskModal = false;
  selectedDay: CalendarDay | null = null;

  constructor(
    private taskService: InternTaskService,
    private authService: AuthserviceService
  ){}

  ngOnInit(): void {
  if (!this.internId) {
    this.internId = this.authService.getCurrentUserId();
  }

  const today = new Date();
  this.currentYear = today.getFullYear();
  this.currentMonth = today.getMonth();
  this.buildCalendar();
  this.loadTasksForMonth();
}


  // ----------------- Calendar Builder -----------------
  buildCalendar(): void {
    this.calendarDays = [];

    const firstOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    const lastOfMonth  = new Date(this.currentYear, this.currentMonth + 1, 0); // last day of month

    const startWeekday = firstOfMonth.getDay(); // 0=Sun
    const daysInMonth  = lastOfMonth.getDate();

    // Leading blanks
    for (let i = 0; i < startWeekday; i++) {
      this.calendarDays.push({ date: null });
    }

    // Real days
    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(this.currentYear, this.currentMonth, day);
      const iso = this.toISO(dateObj);
      this.calendarDays.push({
        date: dateObj,
        task: this.tasksMap.get(iso)
      });
    }
  }

  // ----------------- Month Navigation -----------------
  prevMonth(): void {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.refreshCalendar();
  }

  nextMonth(): void {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.refreshCalendar();
  }

  private refreshCalendar(): void {
    this.buildCalendar();
    this.loadTasksForMonth();
  }

  // ----------------- Load Tasks -----------------
  loadTasksForMonth(): void {
    const from = this.toISO(new Date(this.currentYear, this.currentMonth, 1));
    const to   = this.toISO(new Date(this.currentYear, this.currentMonth + 1, 0));

    this.taskService.getTasksForRange(this.internId, from, to).subscribe({
      next: tasks => {
        this.tasksMap.clear();
        tasks.forEach(t => this.tasksMap.set(t.taskDate, t));
        // rebind into calendar cells
        this.calendarDays = this.calendarDays.map(cd => {
          if (!cd.date) return cd;
          const iso = this.toISO(cd.date);
          return { ...cd, task: this.tasksMap.get(iso) };
        });
      },
      error: err => console.error('Error loading tasks', err)
    });
  }

  // ----------------- Modal Handling -----------------
  openTaskModal(day: CalendarDay): void {
  if (!day.date) return;

  // Ensure the day has a task object to bind to
  if (!day.task) {
    day.task = {
      internId: this.internId,
      taskDate: this.toISO(day.date),
      description: '',
      status: 'PENDING'
    };
  }

  // Just reference the actual day (or shallow copy preserving Date)
  this.selectedDay = {
    ...day,
    date: day.date, // still a Date
    task: { ...day.task } // copy task so user can cancel without mutating live data
  };

  this.showTaskModal = true;
}


  closeTaskModal(): void {
    this.showTaskModal = false;
    this.selectedDay = null;
  }

 private statusMap: Record<string, TaskStatus> = {
  'PENDING': 'PENDING',
  'Pending': 'PENDING',
  'pending': 'PENDING',
  'IN_PROGRESS': 'IN_PROGRESS',
  'In Progress': 'IN_PROGRESS',
  'in progress': 'IN_PROGRESS',
  'COMPLETED': 'COMPLETED',
  'Completed': 'COMPLETED',
  'completed': 'COMPLETED',
};

saveTask(): void {
  if (!this.selectedDay?.date || !this.selectedDay.task) return;

  const iso = this.selectedDay.task.taskDate || this.toISO(this.selectedDay.date);
  const uiStatus = this.selectedDay.task.status || 'PENDING';
  const normalized = this.statusMap[uiStatus] ?? 'PENDING';

  const payload = {
    description: this.selectedDay.task.description?.trim() || '',
    status: normalized
  };

  this.taskService.upsertTask(this.internId, iso, payload).subscribe({
    next: saved => {
      this.tasksMap.set(saved.taskDate, saved);
      this.calendarDays = this.calendarDays.map(cd =>
        cd.date && this.toISO(cd.date) === saved.taskDate ? { ...cd, task: saved } : cd
      );
      this.closeTaskModal();
    },
    error: err => console.error('Error saving task', err)
  });
}



  // ----------------- Utils -----------------
 private toISO(date: Date | string): string {
  if (typeof date === 'string') {
    // Already yyyy-MM-dd?
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
    const d = new Date(date);
    return isNaN(d.getTime()) ? '' : d.toISOString().split('T')[0];
  }
  return date.toISOString().split('T')[0];
}
}
