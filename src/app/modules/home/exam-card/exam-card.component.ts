import { Simulado } from './../../../shared/interfaces/simulado';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'exam-card',
  templateUrl: './exam-card.component.html',
  styleUrls: ['./exam-card.component.scss']
})
export class ExamCardComponent implements OnInit {
  @Input() exam!: Simulado;

  constructor() { }

  ngOnInit(): void {
  }

}
