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
  title!: string;
  constructor() {}

  ngOnInit(): void {}

  ideaForms() {
    this.title = '💡 Ideia';
    this.ideaShow = !this.ideaShow;
  }

  issueForms() {
    this.title = '🐛 Problema';
    this.issueShow = !this.issueShow;
  }

  suggestionForms() {
    this.title = '📝 Sugestão';
    this.suggestionShow = !this.suggestionShow;
  }

  closeForms() {
    this.ideaShow = false;
    this.issueShow = false;
    this.suggestionShow = false;
  }
}
