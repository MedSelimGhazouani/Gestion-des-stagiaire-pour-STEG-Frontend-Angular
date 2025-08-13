import { TestBed } from '@angular/core/testing';
import { InternTaskService } from './intern-tasks.service';


describe('InternTasksService', () => {
  let service: InternTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
