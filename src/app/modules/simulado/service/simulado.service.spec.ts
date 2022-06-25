import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SimuladoService } from './simulado.service';

describe('SimuladoService', () => {
  let service: SimuladoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SimuladoService],
    });
    service = TestBed.inject(SimuladoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
