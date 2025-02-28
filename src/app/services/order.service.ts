import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  // url: string = 'http://localhost:3000/api/v1/order/'
  url: string = 'https://json-db-backend.vercel.app/api/v1/order/'
  // option = {
  //   headers: {
  //     Authorization: `Bearer ${localStorage.getItem('TOKEN')}`
  //   }
  // }

  // getToken(){
  //   const localToken = localStorage.getItem('TOKEN')
  //   const token = localToken ? localToken : ''
  //   return token
  // }

  getOption(){
    const localToken = localStorage.getItem('TOKEN')
    const token = localToken ? localToken : ''
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  }
  

  constructor(private http: HttpClient) { }

  // perform CRUD funtions

  create(data: Order): Observable<Order> {
    return this.http.post<Order>(this.url, data, this.getOption())
  }

  readAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.url, this.getOption())
  }

  readOne(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.url}${id}`, this.getOption())
  }

  update(data: Order): Observable<Order> {
    return this.http.put<Order>(`${this.url}${data.id}`, data, this.getOption())
  }

  delete(id: number): Observable<Order> {
    return this.http.delete<Order>(`${this.url}${id}`, this.getOption())
  }
}
