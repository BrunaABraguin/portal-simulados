import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Simulado } from 'src/app/shared/interfaces/simulado';
import examsMock from '../../../shared/mocks/simulados.json';
import questionsMock from '../../../shared/mocks/questoes.json';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SimuladoService {
  constructor(protected http: HttpClient) {}

  public getSimulados(): Observable<any> {
    this.http.get(`${environment.API_URL}/simulados`).subscribe((response) => {
      console.log(response);
    });
    
    examsMock.forEach((exam) => {
      const questionsIds = exam?.perguntas;
      this.getQuestions(questionsIds).subscribe((questions) => {
        exam.perguntas = questions;
      });
    });

    return new Observable((observer) => {
      observer.next(examsMock);
      observer.complete();
    });
  }

  public getSimuladoById(id: string): Observable<Simulado> {
    return new Observable((observer) => {
      const exam = examsMock.find((s: { id: string }) => s.id === id);
      if (exam) {
        const questionsIds = exam?.perguntas;
        this.getQuestions(questionsIds).subscribe((questions) => {
          const simulado: Simulado = {
            ...exam,
            perguntas: questions,
          };
          observer.next(simulado);
          observer.complete();
        });
      } else {
        observer.error();
      }
    });
  }

  public getQuestions(questionsIds: string[]): Observable<any> {
    return new Observable((observer) => {
      const questions = questionsMock.filter((q: { id: string }) =>
        questionsIds.includes(q.id)
      );

      observer.next(questions);
      observer.complete();
    });
  }
}
