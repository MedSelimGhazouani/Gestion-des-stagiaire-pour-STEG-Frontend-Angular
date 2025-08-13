import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInternProfileComponent } from './edit-intern-profile.component';

describe('EditInternProfileComponent', () => {
  let component: EditInternProfileComponent;
  let fixture: ComponentFixture<EditInternProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditInternProfileComponent]
    });
    fixture = TestBed.createComponent(EditInternProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
