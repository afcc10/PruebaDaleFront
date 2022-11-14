import { TestBed } from '@angular/core/testing';

import { VentaApiService } from './venta-api.service';

describe('VentaApiService', () => {
  let service: VentaApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VentaApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
