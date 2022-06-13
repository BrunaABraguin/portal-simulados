import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../../../interfaces/user';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(protected http: HttpClient) {}

  public register(user: User): Observable<any> {
    return this.http.post(`${environment.API_URL}/auth/register`, user);
  }

  public login(user: User): Observable<any> {
    return this.http.post(`${environment.API_URL}/auth/login`, user);
  }

  public google(user: SocialUser): Observable<any> {
    const body = {
      email: user.email,
      name: user.name,
      googleId: user.id,
    };

    return this.http.post(`${environment.API_URL}/auth/google`, body);
  }
}
