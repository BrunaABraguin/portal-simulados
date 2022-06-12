import { Observable } from 'rxjs';
import { Feedback } from './../interfaces/feedback';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(protected http: HttpClient) { }

  public feedback(feedback: Feedback): Observable<any> {
    const token = localStorage.getItem('token');
    const header = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return this.http.post(`${environment.API_URL}/feedbacks`, feedback, header);
  }
}
