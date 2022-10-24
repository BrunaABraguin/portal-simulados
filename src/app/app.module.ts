import { UserService } from './shared/navbar/user/service/user.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, CreateQuestionDialog, CreateTestDialog } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SimuladoComponent } from './modules/simulado/simulado.component';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { HomeComponent } from './modules/home/home.component';
import { GoogleLoginProvider, SocialLoginModule } from '@abacritt/angularx-social-login';
import { FeedbackComponent } from './shared/widget/feedback.component';
import {
  NavbarComponent
} from './shared/navbar/navbar.component';
import { CountdownModule } from 'ngx-countdown';
import { ResultadosComponent } from './modules/resultados/resultados.component';
import { QuestionCardComponent } from './shared/question-card/question-card.component';
import { NgChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { ExamCardComponent } from './modules/home/exam-card/exam-card.component';
import { AvatarModule } from 'ngx-avatar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginDialog } from './shared/navbar/user/login-dialog/login-dialog.component';
import { RegisterDialog } from './shared/navbar/user/register-dialog/register-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateTestDialog,
    CreateQuestionDialog,
    SimuladoComponent,
    PageNotFoundComponent,
    PageNotFoundComponent,
    HomeComponent,
    FeedbackComponent,
    NavbarComponent,
    LoginDialog,
    RegisterDialog,
    ResultadosComponent,
    QuestionCardComponent,
    ExamCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatChipsModule,
    MatCardModule,
    SocialLoginModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatMenuModule,
    MatInputModule,
    MatGridListModule,
    MatDividerModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MatProgressBarModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    MatFormFieldModule,
    CountdownModule,
    NgChartsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    AvatarModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: true,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '767633973756-8c4q5qp5dhrftollm5r9f3u7p3rgdqvb.apps.googleusercontent.com'
            ),
          },
        ],
        onError: (err: any) => {
          console.error(err);
        },
      },
    },
    UserService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
