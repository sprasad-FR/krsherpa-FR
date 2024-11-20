import { TestBed } from '@angular/core/testing';

import { HttpDispatcherService } from './http-dispatcher.service';

describe('HttpDispatcherService', () => {
  let service: HttpDispatcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpDispatcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
