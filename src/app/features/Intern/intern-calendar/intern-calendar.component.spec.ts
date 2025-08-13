import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternCalendarComponent } from './intern-calendar.component';

describe('InternCalendarComponent', () => {
  let component: InternCalendarComponent;
  let fixture: ComponentFixture<InternCalendarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InternCalendarComponent]
    });
    fixture = TestBed.createComponent(InternCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
