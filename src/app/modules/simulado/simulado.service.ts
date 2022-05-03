import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Exam } from 'src/app/shared/interfaces/exam';
import data from '../../shared/mocks/exams.json';

@Injectable({
  providedIn: 'root',
})
export class SimuladoService {
  constructor() {}

  getSimulado(id: number): Observable<Exam> {
    return new Observable((observer) => {
      const exam = data.find((s: { id: number; }) => s.id === id);
      if (exam) {
        observer.next(exam);
      } else {
        observer.error('Simulado não encontrado');
      }
    });
  }
}
