import { Simulado } from './../../shared/interfaces/simulado';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  user!: any;
  loggedIn!: boolean;
  showFiller = false;
  data: Simulado[] = [
    {
      id: 1,
      nome: 'Simulado 1',
      descricao: 'Descrição do simulado 1',
      data_inicio: '01/01/2020',
      data_fim: '01/01/2020',
      data_criacao: '01/01/2020',
      data_atualizacao: '01/01/2020',
      ativo: true,
      simulado_questoes: [],
      duracao: 60,
      simulado_questoes_count: 0
    },
    {
      id: 2,
      nome: 'Simulado 2',
      descricao: 'Descrição do simulado 2',
      data_inicio: '01/01/2020',
      data_fim: '01/01/2020',
      data_criacao: '01/01/2020',
      data_atualizacao: '01/01/2020',
      ativo: true,
      simulado_questoes: [],
      duracao: 60,
      simulado_questoes_count: 0
    },
    {
      id: 3,
      nome: 'Simulado 3',
      descricao: 'Descrição do simulado 3',
      data_inicio: '01/01/2020',
      data_fim: '01/01/2020',
      data_criacao: '01/01/2020',
      data_atualizacao: '01/01/2020',
      ativo: true,
      simulado_questoes: [],
      duracao: 60,
      simulado_questoes_count: 0
    },
    {
      id: 4,
      nome: 'Simulado 4',
      descricao: 'Descrição do simulado 4',
      data_inicio: '01/01/2020',
      data_fim: '01/01/2020',
      data_criacao: '01/01/2020',
      data_atualizacao: '01/01/2020',
      ativo: true,
      simulado_questoes: [],
      duracao: 60,
      simulado_questoes_count: 0
    },
    {
      id: 5,
      nome: 'Simulado 5',
      descricao: 'Descrição do simulado 5',
      data_inicio: '01/01/2020',
      data_fim: '01/01/2020',
      data_criacao: '01/01/2020',
      data_atualizacao: '01/01/2020',
      ativo: true,
      simulado_questoes: [],
      duracao: 60,
      simulado_questoes_count: 0
    }
  ];


  constructor(private authService: SocialAuthService, private router: Router) {}

  ngOnInit(): void {
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
}
