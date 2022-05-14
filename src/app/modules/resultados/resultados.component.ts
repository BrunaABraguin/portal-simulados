import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.scss'],
})
export class ResultadosComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public doughnutChartLabels: string[] = ['Acertos', 'Erros'];
  public doughnutChartNumbers: number[] = [350, 450];
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
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Acertos', backgroundColor: '#69F0AE', hoverBackgroundColor: '#69F0AE' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Erros', backgroundColor: '#FF6384', hoverBackgroundColor: '#FF6384' },
    ],
  };

  constructor() {}

  ngOnInit(): void {}
}
