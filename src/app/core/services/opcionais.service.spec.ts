import { TestBed } from '@angular/core/testing';

import { OpcionaisService } from './opcionais.service';

describe('OpcionaisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpcionaisService = TestBed.get(OpcionaisService);
    expect(service).toBeTruthy();
  });
});
