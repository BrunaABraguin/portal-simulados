import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../../../interfaces/usuario';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(protected http: HttpClient) {}

  public register(usuario: Usuario): void {
    this.http
      .post(`${environment.API_URL}/auth/register`, usuario)
      .subscribe(
        (response: any) => {
          console.log(response);
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  public login(usuario: Usuario): void {
    this.http.post(`${environment.API_URL}/auth/login`, usuario).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
