import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternDetailsComponent } from './intern-details.component';

describe('InternDetailsComponent', () => {
  let component: InternDetailsComponent;
  let fixture: ComponentFixture<InternDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InternDetailsComponent]
    });
    fixture = TestBed.createComponent(InternDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
