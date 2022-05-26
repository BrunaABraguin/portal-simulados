import { Feedback } from './../interfaces/feedback';
import { FeedbackService } from './feedback.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit {
  ideaShow: boolean = false;
  issueShow: boolean = false;
  suggestionShow: boolean = false;
  sendSuccess: boolean = false;
  title!: string;
  feedback!: string;

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {}

  public ideaForms() {
    this.title = '💡 Ideia';
    this.ideaShow = !this.ideaShow;
  }

  public issueForms() {
    this.title = '🐛 Problema';
    this.issueShow = !this.issueShow;
  }

  public suggestionForms() {
    this.title = '📝 Sugestão';
    this.suggestionShow = !this.suggestionShow;
  }

  public closeForms() {
    this.ideaShow = false;
    this.issueShow = false;
    this.suggestionShow = false;
    this.sendSuccess = false;
  }

  public sendFeedback() {
    if (this.feedback) {
      this.ideaShow = false;
      this.issueShow = false;
      this.suggestionShow = false;
      this.sendSuccess = true;

      const feedback: Feedback = {
        tipo: this.title.split(' ')[1],
        mensagem: this.feedback,
      };

      this.feedbackService.feedback(feedback);

      setTimeout(() => {
        this.closeForms();
      }, 2000);
    }
  }
}
