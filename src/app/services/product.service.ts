import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _url = environment.url;  
  private _paths: any = {
    getProducts: '/products',
  }
  constructor(private http: HttpClient) { }

  getProducts() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': this.getToken()
      })
    };

    return new Promise((res, rej) => {
      this.http.get(`${this._url}${this._paths.getProducts}`, httpOptions)
        .subscribe((data: any) => {
          data.status.error ? rej(data.message) : res(data);
        }, (error: any) => rej(error));
    });
  }

  getToken(){
    return localStorage.getItem('token');
  }

}
