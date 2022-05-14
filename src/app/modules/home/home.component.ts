import { SimuladoService } from './../simulado/service/simulado.service';
import { Simulado } from '../../shared/interfaces/simulado';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import data from '../../shared/mocks/simulados.json';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public user!: any;
  public loggedIn!: boolean;
  public data!: Simulado[];

  constructor(
    private authService: SocialAuthService,
    private router: Router,
    private simuladoService: SimuladoService
  ) {}

  ngOnInit(): void {
    this.getSimulados();
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = user != null;
    });
  }

  logout(): void {
    this.authService.signOut().then(() => this.router.navigate(['']));
  }

  loginWithGoogle(): void {
    this.authService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then(() => this.router.navigate(['']));
  }

  getSimulados(): void {
    this.simuladoService.getSimulados().subscribe((simulados) => {
      this.data = simulados;
    });
  }
}
