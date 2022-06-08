import { Alternativa } from './shared/interfaces/alternativa';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SimuladoService } from './modules/simulado/service/simulado.service';
import { Disciplina } from './shared/interfaces/disciplina';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'Simulados';
  public user = JSON.parse(localStorage.getItem('user') || '{}');

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) {}

  public createQuestion(): void {
    const dialogRef = this.dialog.open(CreateQuestionDialog, {
      width: '500px',
      maxHeight: '90vh',
    });
  }

  public createTest(): void {
    const dialogRef = this.dialog.open(CreateTestDialog, {
      width: '500px',
      maxHeight: '90vh',
    });
  }
}

@Component({
  selector: 'app-create-question-dialog',
  templateUrl:
    '../../src/app/modules/simulado/dialogs/create-question-dialog.html',
  styleUrls: ['./app.component.scss'],
})
export class CreateQuestionDialog implements OnInit {
  constructor(private simuladoService: SimuladoService, private _snackBar: MatSnackBar) {}
  public alphabetic: Array<String> = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  public user = JSON.parse(localStorage.getItem('user') || '{}');
  public disciplinas: Array<Disciplina> = [];
  public alternativas: Array<Alternativa> = [];
  public updateCorreta: boolean = false;
  public newDisciplina!: string;
  public newAssunto!: string;
  public newEnunciado!: string;
  public newComentarios!: string;

  public ngOnInit(): void {
    this.getDisciplinas();
    this.addAlternativa(0, 'Alternativa 1', false, false);
    this.addAlternativa(1, 'Alternativa 2', false, false);
  }

  public getDisciplinas(): void {
    this.simuladoService.getDisciplinas().subscribe((response) => {
      this.disciplinas = response.data;
    });
  }

  public addAlternativa(
    i: number,
    enunciado: string,
    isSelected: boolean,
    isCorrect: boolean
  ): void {
    const findAlternativa = this.alternativas[i];
    const index = this.alternativas.indexOf(findAlternativa);

    if (findAlternativa) {
      this.alternativas[index].enunciado = enunciado;
      this.alternativas[index].isSelected = isSelected;
      this.alternativas[index].isCorrect = isCorrect;
    } else {
      this.alternativas.push({
        enunciado: enunciado,
        isSelected: isSelected,
        isCorrect: isCorrect,
      });
    }
  }

  public setNewDisciplina(disciplina: string): void {
    this.newDisciplina = disciplina;
  }

  public setNewAssunto(assunto: string): void {
    this.newAssunto = assunto;
  }

  public createQuestion(): void {
    let newQuestao: any = {
      disciplina: this.newDisciplina,
      assunto: this.newAssunto,
      enunciado: this.newEnunciado,
      comentarios: this.newComentarios,
      alternativas: this.alternativas,
      autor: this.user.id,
    }

    this.simuladoService.createQuestion(newQuestao).subscribe((response: any) => {
      if (response.success == true) {
      {
        this._snackBar.open('Questão cadastrada com sucesso', 'OK');
      }

      if (response.success == false) {
        this._snackBar.open(response.msg, 'OK');
      }

    });
  };
}

@Component({
  selector: 'app-create-question-dialog',
  templateUrl: '../../src/app/modules/simulado/dialogs/create-test-dialog.html',
  styleUrls: ['./app.component.scss'],
})
export class CreateTestDialog {}
