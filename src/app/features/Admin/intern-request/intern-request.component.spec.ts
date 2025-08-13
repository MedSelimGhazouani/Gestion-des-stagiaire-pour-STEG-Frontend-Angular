import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternRequestComponent } from './intern-request.component';

describe('InternRequestComponent', () => {
  let component: InternRequestComponent;
  let fixture: ComponentFixture<InternRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InternRequestComponent]
    });
    fixture = TestBed.createComponent(InternRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
