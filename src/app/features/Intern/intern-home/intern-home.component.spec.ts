import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternHomeComponent } from './intern-home.component';

describe('InternHomeComponent', () => {
  let component: InternHomeComponent;
  let fixture: ComponentFixture<InternHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InternHomeComponent]
    });
    fixture = TestBed.createComponent(InternHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
