import { TestBed } from '@angular/core/testing';

import { BackendPlayerService } from './backend-player.service';

describe('BackendPlayerService', () => {
  let service: BackendPlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendPlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
