import { Simulado } from './../../../shared/interfaces/simulado';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
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

  public getSimuladoById(idSimulado: string): Observable<any> {
    return new Observable((observer) => {
      this.http
        .get(`${environment.API_URL}/simulados/${idSimulado}`)
        .subscribe((response: any) => {
          observer.next(response.data[0].simulado);
          observer.complete();
        });
    });
  }

  public createQuestion(newQuestao: any) {
    const token = localStorage.getItem('token');
    const header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    let data = newQuestao;

    return this.http.post(`${environment.API_URL}/questoes`, data, header);
  }

  public getDisciplinas(): Observable<any> {
    return new Observable((observer) => {
      this.http
        .get(`${environment.API_URL}/disciplinas`)
        .subscribe((response) => {
          observer.next(response);
          observer.complete();
        });
    });
  }

  public saveTest(simulado: Simulado) {
    const token = localStorage.getItem('token');
    const header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    let data = simulado;

    return this.http.post(`${environment.API_URL}/simuladoRespondido`, data, header);
  }
}
