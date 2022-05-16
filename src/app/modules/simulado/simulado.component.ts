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
  public tempoRestante: any;
  public progresso: number = 0;
  public showHour: boolean = false;
  public questions!: Questao[];
  public restantes!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private simuladoService: SimuladoService
  ) {}

  ngOnInit() {
    this.getSimuladoById();
    this.fimSimulado();
    this.cronometro();
    this.verificarRestantes();
  }

  ngOnDestroy(): void {
    localStorage.removeItem(`fim-${this.simulado.id}`);
    localStorage.removeItem(`inicio-${this.simulado.id}`);
  }

  public getSimuladoById(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    const questoesSalvas = localStorage.getItem(`exam-${id}`);

    this.simuladoService.getSimuladoById(id).subscribe((simulado) => {
      this.simulado = simulado;

      if (questoesSalvas === null) {
        this.questions = simulado.questoes;
      } else {
        this.questions = JSON.parse(questoesSalvas);
        this.progresso = Number(localStorage.getItem(`progresso-${id}`));
        this.verificarRestantes();
      }
    });
  }

  public inicioSimulado(): void {
    this.inicio = localStorage.getItem(`inicio-${this.simulado.id}`);
    if (this.inicio === null) {
      this.inicio = new Date();
      localStorage.setItem(`inicio-${this.simulado.id}`, new Date().toString());
    }
  }

  public fimSimulado(): void {
    this.inicioSimulado();
    this.fim = localStorage.getItem(`fim-${this.simulado.id}`);

    if (this.fim === null) {
      this.fim = new Date(this.inicio);
      this.fim.setTime(this.fim.getTime() + this.simulado.duracao * 60 * 1000);
      localStorage.setItem(`fim-${this.simulado.id}`, this.fim.toString());
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
        localStorage.setItem(
          `progresso-${this.simulado.id}`,
          this.progresso.toString()
        );
        this.verificarRestantes();
      }
    });
  }

  public verificarRestantes(): void {
    this.restantes = this.questions.length - this.progresso;
  }

  public sendExam(): void {
    if (this.restantes > 0) {
      alert('Você ainda não respondeu todas as questões!');
    } else {
      this.setTempoSimulado();
      this.router.navigate([`/resultados/${this.simulado.id}`]);
    }
  }

  public setTempoSimulado(): void {
    let now = new Date().getTime();
    this.inicio = new Date(this.inicio).getTime();
    let tempo = this.inicio - now;
    tempo = tempo / 1000;
    tempo = tempo / 60;
    tempo = Math.abs(tempo);
    tempo = Math.round(tempo);
    localStorage.setItem(
      `tempoSimulado-${this.simulado.id}`,
      `${tempo} minutos`.toString()
    );
  }
}
