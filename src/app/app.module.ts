import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { SimuladoComponent } from './modules/simulado/simulado.component';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { HomeComponent } from './modules/home/home.component';
import { GoogleLoginProvider, SocialLoginModule } from '@abacritt/angularx-social-login';
import { FeedbackComponent } from './shared/widget/feedback.component';

@NgModule({
  declarations: [
    AppComponent,
    SimuladoComponent,
    PageNotFoundComponent,
    PageNotFoundComponent,
    HomeComponent,
    FeedbackComponent,
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
    MatTooltipModule
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
