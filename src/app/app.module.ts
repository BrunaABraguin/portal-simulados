import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { SimuladoComponent } from './modules/simulado/simulado.component';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { LoginComponent } from './modules/login/login.component';

@NgModule({
  declarations: [AppComponent, SimuladoComponent, PageNotFoundComponent, PageNotFoundComponent, LoginComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatChipsModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
