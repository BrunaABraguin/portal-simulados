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
    return new Observable((observer) => {
      this.http
        .get(`${environment.API_URL}/simulados`)
        .subscribe((response) => {
          observer.next(response);
          observer.complete();
        });
    });
  }

  public getSimuladoById(id: string): Observable<any> {
    return new Observable((observer) => {
      this.http
        .get(`${environment.API_URL}/simulados/${id}`)
        .subscribe((response: any) => {
          observer.next(response.data[0].simulado);
          observer.complete();
        });
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
