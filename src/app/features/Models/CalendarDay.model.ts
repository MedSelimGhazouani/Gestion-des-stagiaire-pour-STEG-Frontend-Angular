import { InternTask } from "./intern-task.model";

export interface CalendarDay {
  date: Date | null;   // null means empty grid cell
  task?: InternTask;
}
