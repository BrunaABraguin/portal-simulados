import { Questao } from './../interfaces/questao';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Alternativa } from '../interfaces/alternativa';
import { Selecionadas } from '../interfaces/alternativaQuestaoSelecionadas';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss'],
})
export class QuestionCardComponent implements OnInit {
  options: string[] = ['A', 'B', 'C', 'D', 'E'];
  selecionadas!: Selecionadas;
  @Input() question!: Questao;
  @Input() i!: number;
  @Output() alternativaQuestaoSelecionadas = new EventEmitter<Selecionadas>();

  constructor() {}

  ngOnInit(): void {}

  saveExam(alternativaSelecionada: Alternativa, questaoSelectionada: Questao): void {
    this.selecionadas = {
      alternativa: alternativaSelecionada,
      questao: questaoSelectionada,
    };

    this.alternativaQuestaoSelecionadas.emit(this.selecionadas);
  }
}
