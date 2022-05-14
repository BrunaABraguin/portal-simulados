import { Selecionadas } from '../../shared/interfaces/selecionadas';
import { Questao } from './../../shared/interfaces/questao';
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
  public options: string[] = ['A', 'B', 'C', 'D', 'E'];
  public simulado!: Simulado;
  public inicio: any;
  public fim: any;
  public isLoading: boolean = true;
  public tempoRestante: any;
  public progresso: number = 0;
  public showHour: boolean = false;
  public questions!: Questao[];
  public restantes!: number;

  constructor(
    private route: ActivatedRoute,
    private simuladoService: SimuladoService
  ) {}

  ngOnInit() {
    this.getSimuladoById();
    this.fimSimulado();
    this.cronometro();
  }

  ngOnDestroy(): void {
    localStorage.removeItem(`fim-${this.simulado.id}`);
    localStorage.removeItem(`inicio-${this.simulado.id}`);
  }

  getSimuladoById(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    const questoesSalvas = localStorage.getItem(`exam-${id}`);

    this.simuladoService.getSimuladoById(id).subscribe((simulado) => {
      this.simulado = simulado;

      if (questoesSalvas === null) {
        this.questions = simulado.perguntas;
      } else {
        this.questions = JSON.parse(questoesSalvas);
        this.progresso = Number(localStorage.getItem('progresso'));
        this.verificarRestantes();
      }
      this.isLoading = false;
    });
  }

  inicioSimulado(): void {
    this.inicio = localStorage.getItem(`inicio-${this.simulado.id}`);
    if (this.inicio === null) {
      this.inicio = new Date();
      localStorage.setItem(`inicio-${this.simulado.id}`, new Date().toString());
    }
  }

  fimSimulado(): void {
    this.inicioSimulado();
    this.fim = localStorage.getItem(`fim-${this.simulado.id}`);

    if (this.fim === null) {
      this.fim = new Date(this.inicio);
      this.fim.setTime(this.fim.getTime() + this.simulado.duracao * 60 * 1000);
      localStorage.setItem(`fim-${this.simulado.id}`, this.fim.toString());
    }
  }

  cronometro(): void {
    this.fim = new Date(this.fim);

    const miliseconds = this.fim.getTime() - new Date().getTime();
    const seconds = miliseconds / 1000;

    this.tempoRestante = seconds;

    if (this.tempoRestante > 3600) {
      this.showHour = true;
    }
  }

  saveExam(selecionada: Selecionadas): void {
    this.questions.find((question) => {
      if (question.id === selecionada.questao.id) {
        question.alternativas.find((alternativa) => {
          if (selecionada.alternativa.id === alternativa.id) {
            alternativa.checked = true;
            if (question.respondida === false) {
              question.respondida = true;
              this.progresso++;
            }
          } else {
            alternativa.checked = false;
          }
        });
        localStorage.setItem(
          `exam-${this.simulado.id}`,
          JSON.stringify(this.questions)
        );
        localStorage.setItem('progresso', this.progresso.toString());
        this.verificarRestantes();
      }
    });
  }

  verificarRestantes(): void {
    this.restantes = this.questions.length - this.progresso;
  }
}
