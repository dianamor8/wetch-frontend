import { TestBed } from '@angular/core/testing';

import { PrefactibilidadService } from './prefactibilidad.service';

describe('PrefactibilidadService', () => {
  let service: PrefactibilidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrefactibilidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
