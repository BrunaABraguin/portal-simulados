import { Questao } from './../../shared/interfaces/questao';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss'],
})
export class ResultadosComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  public questions!: Questao[];
  public acertos: number = 0;
  public erros: number = 0;
  public porcentagemAcertos: number = 0;
  public doughnutChartLabels: string[] = ['Acertos', 'Erros'];
  public doughnutChartNumbers: number[] = [0, 0];
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
        min: 10,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'> = {
    labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Acertos',
        backgroundColor: '#69F0AE',
        hoverBackgroundColor: '#69F0AE',
      },
      {
        data: [28, 48, 40, 19, 86, 27, 90],
        label: 'Erros',
        backgroundColor: '#FF6384',
        hoverBackgroundColor: '#FF6384',
      },
    ],
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getQuestions();
    this.initPercentage();
  }

  public getQuestions(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    const questoesSalvas = localStorage.getItem(`exam-${id}`);

    if (questoesSalvas) {
      this.questions = JSON.parse(questoesSalvas);

      this.questions.forEach((question) => {
        if (question.respondida) {
          question.alternativas.forEach((alternativa) => {
            if (alternativa.isCorrect && alternativa.checked) {
              this.acertos++;
            } else if (!alternativa.isCorrect && alternativa.checked) {
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
}
