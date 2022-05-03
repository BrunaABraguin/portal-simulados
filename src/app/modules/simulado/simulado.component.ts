import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SimuladoService } from './simulado.service';

@Component({
  selector: 'app-simulado',
  templateUrl: './simulado.component.html',
  styleUrls: ['./simulado.component.scss'],
})
export class SimuladoComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private simuladoService: SimuladoService
  ) {}

  ngOnInit(): void {
    this.getSimulado();
  }

  getSimulado() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.simuladoService.getSimulado(id).subscribe((simulado) => {
      console.log(simulado);
    });
  }
}
