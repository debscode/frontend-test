import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { Login } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _url = environment.url;
  private _userToken: string;
  private _userEmail: string;
  private _paths: any = {
    login: '/login',
  }

  constructor(private http: HttpClient) { }

  readToken() {
    this._userToken = localStorage.getItem('token') ? localStorage.getItem('token') : '';
    return this._userToken;
  }

  readEmail() {
    this._userEmail = localStorage.getItem('email') ? localStorage.getItem('email') : '';
    return this._userEmail;
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
    this._userToken = token;
  }

  saveEmail(email: string) {
    localStorage.setItem('email', email);
    this._userEmail = email;
  }

  isAuth(): boolean {
    this.readToken();
    return this._userToken.length > 2;
  }

  login(req: Login) {
    const body = new HttpParams()
      .set('email', req.email)
      .set('password', req.password);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    return new Promise((res, rej) => {
      this.http.post(`${this._url}${this._paths.login}`, body.toString(), httpOptions)
        .subscribe((data: any) => {
          data.status.error ? rej(data.message) : res(data.data);
        }, (error: any) => rej(error));
    });
  }

}
