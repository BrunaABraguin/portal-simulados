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
  doubtShow: boolean = false;
  placeholder!: string;
  sendSuccess: boolean = false;
  title!: string;
  feedback!: string;
  public showWidgetLogged!: boolean;

  constructor(private feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.showWidget();
  }

  private showWidget() {
    localStorage.getItem('token')
      ? (this.showWidgetLogged = true)
      : (this.showWidgetLogged = false);
  }

  public ideaForms() {
    this.title = '💡 Ideia';
    this.ideaShow = !this.ideaShow;
    this.placeholder =
      'Teve uma ideia de melhoria ou de nova funcionalidade? Conta pra gente!';
  }

  public issueForms() {
    this.title = '🐛 Problema';
    this.issueShow = !this.issueShow;
    this.placeholder =
      'Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo...';
  }

  public suggestionForms() {
    this.title = '📝 Sugestão';
    this.suggestionShow = !this.suggestionShow;
    this.placeholder = 'Queremos te ouvir. O que você gostaria de nos dizer? ';
  }

  public doubtForms() {
    this.title = '🤔 Dúvida';
    this.suggestionShow = !this.suggestionShow;
    this.placeholder = 'Tem alguma dúvida sobre o conteúdo? Conte pra gente!';
  }

  public closeForms() {
    this.ideaShow = false;
    this.issueShow = false;
    this.suggestionShow = false;
    this.sendSuccess = false;
    this.doubtShow = false;
  }

  public sendFeedback() {
    if (this.feedback) {
      this.ideaShow = false;
      this.issueShow = false;
      this.suggestionShow = false;
      this.doubtShow = false;

      const feedback: Feedback = {
        tipo: this.title.split(' ')[1],
        mensagem: this.feedback,
      };

      this.sendSuccess = true;
      this.feedback = '';
      
      this.feedbackService.feedback(feedback).subscribe((response) => {
        setTimeout(() => {
          this.closeForms();
        }, 2000);
      });
    }
  }
}
