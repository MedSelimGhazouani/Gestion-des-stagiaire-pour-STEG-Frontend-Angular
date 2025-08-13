import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternMessagesComponent } from './intern-messages.component';

describe('InternMessagesComponent', () => {
  let component: InternMessagesComponent;
  let fixture: ComponentFixture<InternMessagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InternMessagesComponent]
    });
    fixture = TestBed.createComponent(InternMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
