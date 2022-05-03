import { Simulado } from '../../shared/interfaces/simulado';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SimuladoService } from './service/simulado.service';

@Component({
  selector: 'app-simulado',
  templateUrl: './simulado.component.html',
  styleUrls: ['./simulado.component.scss'],
})
export class SimuladoComponent implements OnInit {
  simulado!: Simulado;
  demo: any;
  inicio: any;
  fim: any;
  tempoRestante: any;
  quantidadeQuestoes!: number;

  constructor(
    private route: ActivatedRoute,
    private simuladoService: SimuladoService
  ) {}

  ngOnInit(): void {
    this.getSimuladoById();
    this.fimSimulado();
    this.cronometro();

    this.quantidadeQuestoes = this.simulado.perguntas.length;
  }

  ngOnDestroy(): void {
    localStorage.removeItem('inicio');
    localStorage.removeItem('fim');
  }

  getSimuladoById(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.simuladoService.getSimuladoById(id).subscribe((simulado) => {
      this.simulado = simulado;
    });
  }

  inicioSimulado(): void {
    this.inicio = localStorage.getItem('inicio');
    if (this.inicio === null) {
      this.inicio = new Date();
      localStorage.setItem('inicio', new Date().toString());
    }
  }

  fimSimulado(): void {
    this.inicioSimulado();

    this.fim = localStorage.getItem('fim');

    if (this.fim === null) {
      this.fim = new Date(this.inicio);
      this.fim.setTime(this.fim.getTime() + this.simulado.duracao * 60 * 1000);
      localStorage.setItem('fim', this.fim.toString());
    }
  }

  cronometro(): void {
    this.fim = new Date(this.fim);

    const miliseconds = this.fim.getTime() - new Date().getTime();
    const seconds = miliseconds / 1000;
    this.tempoRestante = seconds;
  }
}
