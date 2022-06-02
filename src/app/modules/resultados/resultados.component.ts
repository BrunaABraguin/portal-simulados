import { Questao } from './../../shared/interfaces/questao';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { SimuladoService } from '../simulado/service/simulado.service';
import { Simulado } from 'src/app/shared/interfaces/simulado';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss'],
})
export class ResultadosComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  public finishExam: boolean = false;
  public questions!: Questao[];
  public acertos: number = 0;
  public erros: number = 0;
  public porcentagemAcertos: number = 0;
  public tempoSimulado!: string;

  public doughnutChartLabels: string[] = ['Acertos', 'Erros'];
  public doughnutChartNumbers: number[] = [];

  public barChartType: ChartType = 'bar';
  public barChartLabels: string[] = [];
  public barChartDataAcertos: number[] = [];
  public barChartDataErros: number[] = [];

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      {
        data: this.doughnutChartNumbers,
        backgroundColor: ['#69F0AE', '#FF6384'],
        hoverBackgroundColor: ['#69F0AE', '#FF6384'],
      },
    ],
  };
  public doughnutChartType: ChartType = 'doughnut';

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 0,
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      {
        data: this.barChartDataAcertos,
        label: 'Acertos',
        backgroundColor: '#69F0AE',
        hoverBackgroundColor: '#69F0AE',
      },
      {
        data: this.barChartDataErros,
        label: 'Erros',
        backgroundColor: '#FF6384',
        hoverBackgroundColor: '#FF6384',
      },
    ],
  };
  public simulado!: Simulado;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private simuladoService: SimuladoService
  ) {}

  ngOnInit(): void {
    this.getTempoSimulado();
    this.getSimulado();
    this.getQuestions();
    this.initPercentage();
    this.buildBarChartLabels();
    this.buildBarChartData();
    this.checkFinishExam();
  }

  public getQuestions(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    const questoesSalvas = localStorage.getItem(`exam-${id}`);

    if (questoesSalvas) {
      this.questions = JSON.parse(questoesSalvas);

      this.questions.forEach((question) => {
        if (question.respondida) {
          question.alternativas.forEach((alternativa) => {
            if (alternativa.isCorrect && alternativa.isSelected) {
              this.acertos++;
            } else if (!alternativa.isCorrect && alternativa.isSelected) {
              this.erros++;
            }
          });
        } else {
          this.erros++;
        }
      });
      this.doughnutChartNumbers.push(this.acertos);
      this.doughnutChartNumbers.push(this.erros);
    }
  }

  public initPercentage(): void {
    this.porcentagemAcertos = Number(
      ((this.acertos / this.questions.length) * 100).toFixed(2)
    );
  }

  public getSimulado(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    const questoesSalvas = localStorage.getItem(`exam-${id}`);

    this.simuladoService.getSimuladoById(id).subscribe((simulado) => {
      this.simulado = simulado;

      if (questoesSalvas === null) {
        this.questions = simulado.questoes;
        localStorage.setItem(`exam-${id}`, JSON.stringify(this.questions));
      } else {
        this.questions = JSON.parse(questoesSalvas);
      }
    });
  }

  public buildBarChartLabels(): void {
    this.questions.forEach((question) => {
      if (
        question.disciplina &&
        this.barChartLabels.indexOf(question.disciplina) === -1
      ) {
        this.barChartLabels.push(question.disciplina);
        this.barChartDataAcertos.push(0);
        this.barChartDataErros.push(0);
      }
    });
  }

  public buildBarChartData(): void {
    this.questions.forEach((question) => {
      let index = this.barChartLabels.indexOf(question.disciplina);
      if (question.respondida) {
        question.alternativas.forEach((alternativa) => {
          if (alternativa.isCorrect && alternativa.isSelected) {
            this.barChartDataAcertos[index]++;
          } else if (!alternativa.isCorrect && alternativa.isSelected) {
            this.barChartDataErros[index]++;
          }
        });
      }

      if (!question.respondida) {
        this.barChartDataErros[index]++;
      }
    });
  }

  public getTempoSimulado(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    let tempo = localStorage.getItem(`tempoSimulado-${id}`);
    if (tempo) {
      this.tempoSimulado = tempo;
    } else {
      this.tempoSimulado = '0 minuto(s)';
    }
  }

  public checkFinishExam(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    let progresso = localStorage.getItem(`progresso-${id}`);

    if (progresso) {
      if (this.questions.length === Number(progresso)) {
      }
    } else {
      this.router.navigate([`/simulado/${id}`]);
    }
  }
}
