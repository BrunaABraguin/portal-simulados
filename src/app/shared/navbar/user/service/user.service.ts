import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../../../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(protected http: HttpClient) {}

  public register(usuario: User): Observable<any> {
    return this.http.post(`${environment.API_URL}/auth/register`, usuario);
  }

  public login(usuario: User): Observable<any> {
    return this.http.post(`${environment.API_URL}/auth/login`, usuario);
  }
}
