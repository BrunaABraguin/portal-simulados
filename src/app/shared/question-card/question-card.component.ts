import { Simulado } from './../interfaces/simulado';
import { Questao } from './../interfaces/questao';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Alternativa } from '../interfaces/alternativa';
import { Selecionadas } from '../interfaces/selecionadas';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question-card',
  templateUrl: './question-card.component.html',
  styleUrls: ['./question-card.component.scss'],
})
export class QuestionCardComponent implements OnInit {
  public options: string[] = ['A', 'B', 'C', 'D', 'E'];
  public selecionadas!: Selecionadas;
  public questions!: Questao[];
  @Input() question!: Questao;
  @Input() i!: number;
  @Input() mostrarResposta!: boolean;
  @Output() alternativaQuestaoSelecionadas = new EventEmitter<Selecionadas>();

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    const questoesSalvas = localStorage.getItem(`exam-${id}`);

    if (this.mostrarResposta && questoesSalvas) {
      this.questions = JSON.parse(questoesSalvas);
    }
  }

  saveExam(
    alternativaSelecionada: Alternativa,
    questaoSelectionada: Questao
  ): void {
    this.selecionadas = {
      alternativa: alternativaSelecionada,
      questao: questaoSelectionada,
    };

    this.alternativaQuestaoSelecionadas.emit(this.selecionadas);
  }
}
