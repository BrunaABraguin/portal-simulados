import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './modules/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimuladoComponent } from './modules/simulado/simulado.component';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { ResultadosComponent } from './modules/resultados/resultados.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'simulado/:id',
    component: SimuladoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'resultados/:id',
    component: ResultadosComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: PageNotFoundComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
