import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { Product } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _url = environment.url;
  private _paths: any = {
    products: '/products',
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
      this.http.get(`${this._url}${this._paths.products}`, httpOptions)
        .subscribe((data: any) => {
          data.status.error ? rej(data.message) : res(data);
        }, (error: any) => rej(error));
    });
  }

  deleteProduct(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': this.getToken()
      })
    };

    return new Promise((res, rej) => {
      this.http.delete(`${this._url}${this._paths.products}/${id}`, httpOptions)
        .subscribe((data: any) => {
          data.status.error ? rej(data.message) : res(data);
        }, (error: any) => rej(error));
    });
  }

  editProduct(req) {
    const body = new HttpParams()
      .set('name', req.name)
      .set('category', req.category)
      .set('price', req.price)
      .set('stock', req.stock);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': this.getToken()
      })
    };

    console.log(body);

    return new Promise((res, rej) => {
      this.http.put(`${this._url}${this._paths.products}/${req.id}`, body.toString(), httpOptions)
        .subscribe((data: any) => {
          data.status.error ? rej(data.message) : res(data);
        }, (error: any) => rej(error));
    });
  }

  createProduct(req) {        
    req.stock = parseInt(req.stock, 10);
    const body = new HttpParams()
      .set('name', req.name)
      .set('category', req.category)
      .set('price', req.price)
      .set('stock', req.stock);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': this.getToken()
      })
    };
    
    console.log(body);
    

    return new Promise((res, rej) => {
      this.http.post(`${this._url}${this._paths.products}`, body.toString(), httpOptions)
        .subscribe((data: any) => {
          data.status.error ? rej(data.message) : res(data);
        }, (error: any) => rej(error));
    });
  }

  getToken() {
    return localStorage.getItem('token');
  }

}
