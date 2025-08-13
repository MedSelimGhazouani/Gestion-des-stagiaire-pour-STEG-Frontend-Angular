import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternCertificatesComponent } from './intern-certificates.component';

describe('InternCertificatesComponent', () => {
  let component: InternCertificatesComponent;
  let fixture: ComponentFixture<InternCertificatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InternCertificatesComponent]
    });
    fixture = TestBed.createComponent(InternCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
