import { Feedback } from './../interfaces/feedback';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(protected http: HttpClient) { }

  public feedback(feedback: Feedback): void {
    console.log(feedback);
    this.http
      .post(`${environment.API_URL}/feedbacks`, feedback)
      .subscribe(
        (response: any) => {
          console.log(response);
        },
        (error: any) => {
          console.log(error);
        }
      );
  }
}
