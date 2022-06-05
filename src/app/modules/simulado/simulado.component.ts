import { Selecionadas } from '../../shared/interfaces/selecionadas';
import { Questao } from './../../shared/interfaces/questao';
import { Simulado } from '../../shared/interfaces/simulado';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SimuladoService } from './service/simulado.service';

@Component({
  selector: 'app-simulado',
  templateUrl: './simulado.component.html',
  styleUrls: ['./simulado.component.scss'],
})
export class SimuladoComponent implements OnInit {
  public options: string[] = ['A', 'B', 'C', 'D', 'E'];
  public simulado!: Simulado;
  public inicio: any;
  public fim: any;
  public tempoRestante: any = 0;
  public progresso: number = 0;
  public showHour: boolean = false;
  public questions!: Questao[];
  public restantes!: number;
  public percentualProgresso: number = 0;
  public quantidadeQuestoes: number = 0;
  public idSimulado: string = String(this.route.snapshot.paramMap.get('id'));

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private simuladoService: SimuladoService
  ) {}

  ngOnInit() {
    this.getSimuladoById();
  }

  ngOnDestroy(): void {
    localStorage.removeItem(`fim-${this.idSimulado}`);
    localStorage.removeItem(`inicio-${this.idSimulado}`);
  }

  public getSimuladoById(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    const questoesSalvas = localStorage.getItem(`exam-${id}`);

    this.simuladoService.getSimuladoById(id).subscribe((simulado) => {
      this.simulado = simulado;

      if (this.simulado) {
        this.fimSimulado();
        this.cronometro();

        if (questoesSalvas != null) {
          this.questions = JSON.parse(questoesSalvas);
          this.progresso = Number(localStorage.getItem(`progresso-${id}`));
        } else {
          this.questions = simulado.questoes;
        }
        this.restantes = this.remainingQuestions();

        this.quantidadeQuestoes = this.questions.length;
      }
    });
  }

  public inicioSimulado(): void {
    this.inicio = localStorage.getItem(`inicio-${this.idSimulado}`);
    if (this.inicio === null) {
      this.inicio = new Date();
      localStorage.setItem(`inicio-${this.idSimulado}`, new Date().toString());
    }
  }

  public fimSimulado(): void {
    this.inicioSimulado();
    this.fim = localStorage.getItem(`fim-${this.idSimulado}`);

    if (this.fim === null) {
      this.fim = new Date(this.inicio);
      this.fim.setTime(this.fim.getTime() + this.simulado.duracao * 60 * 1000);
      localStorage.setItem(`fim-${this.idSimulado}`, this.fim.toString());
    }
  }

  public cronometro(): void {
    this.fim = new Date(this.fim);
    const miliseconds = this.fim.getTime() - new Date().getTime();
    const seconds = miliseconds / 1000;

    this.tempoRestante = seconds;

    if (this.tempoRestante > 3600) {
      this.showHour = true;
    }
  }

  public saveExam(selecionada: Selecionadas): void {
    this.questions.find((question) => {
      if (question._id === selecionada.questao._id) {
        question.alternativas.find((alternativa) => {
          if (selecionada.alternativa.enunciado == alternativa.enunciado) {
            alternativa.isSelected = true;
            if (question.respondida === false) {
              question.respondida = true;
              this.progresso++;
            }
          } else {
            alternativa.isSelected = false;
          }
        });
        localStorage.setItem(
          `exam-${this.idSimulado}`,
          JSON.stringify(this.questions)
        );
        localStorage.setItem(
          `progresso-${this.idSimulado}`,
          this.progresso.toString()
        );
      }
    });

    this.restantes = this.remainingQuestions();
    this.percentualProgresso = this.percentProgress();
  }

  public sendExam(): void {
    if (this.restantes > 0) {
      alert('Você ainda não respondeu todas as questões!');
    } else {
      this.setTempoSimulado();
      this.router.navigate([`/resultados/${this.idSimulado}`]);
    }
  }

  public setTempoSimulado(): void {
    const finalizado = localStorage.getItem(`tempoSimulado-${this.idSimulado}`);

    if (finalizado == null) {
      let now = new Date().getTime();
      this.inicio = new Date(this.inicio).getTime();
      let tempo = this.inicio - now;
      tempo = tempo / 1000;
      tempo = tempo / 60;
      tempo = Math.abs(tempo);
      tempo = Math.round(tempo);
      localStorage.setItem(
        `tempoSimulado-${this.idSimulado}`,
        `${tempo} minuto(s)`.toString()
      );
    }
  }

  public percentProgress(): number {
    return Number(((this.progresso / this.questions.length) * 100).toFixed(1));
  }

  public remainingQuestions(): number {
    return this.questions.length - this.progresso;
  }
}
