import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login, LoginToken } from '../model/login';

@Injectable()
export class LoginService {
  constructor(private readonly http: HttpClient) {}

  public login(data: Login): Observable<LoginToken> {
    return this.http.post<LoginToken>('/api/auth/login', data);
  }
}
