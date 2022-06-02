import { Simulado } from './../../../shared/interfaces/simulado';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'exam-card',
  templateUrl: './exam-card.component.html',
  styleUrls: ['./exam-card.component.scss']
})
export class ExamCardComponent implements OnInit {
  @Input() exam!: Simulado;
  public prazoExpirado: boolean = false;

  constructor() { }

  ngOnInit(): void {
    const dataFinal = new Date(this.exam.data_fim);
    const dataAtual = new Date();

    if (dataFinal < dataAtual) {
      this.prazoExpirado = true;
    }

  }

}
