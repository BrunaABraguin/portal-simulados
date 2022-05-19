import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../../../interfaces/usuario';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(protected http: HttpClient) {}

  public register(usuario: Usuario): Observable<any> {
    return this.http.post(`${environment.API_URL}/auth/register`, usuario);
  }

  public login(usuario: Usuario): Observable<any> {
    return this.http.post(`${environment.API_URL}/auth/login`, usuario);
  }
}
