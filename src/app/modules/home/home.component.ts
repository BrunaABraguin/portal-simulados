import { SimuladoService } from './../simulado/service/simulado.service';
import { Simulado } from '../../shared/interfaces/simulado';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public user!: any;
  public simulados!: Simulado[];
  public isLoading: boolean = true;

  constructor(private simuladoService: SimuladoService) {}

  ngOnInit(): void {
    this.getSimulados();
  }

  public getSimulados(): void {
    this.simuladoService.getSimulados().subscribe((simulados) => {
      this.simulados = simulados.data[0];
      if (this.simulados) {
        this.isLoading = false;
      }
    });
  }
}
