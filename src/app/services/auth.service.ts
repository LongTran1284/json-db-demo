import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // url: string = 'http://localhost:3000/api/v1/auth'
  url: string = 'https://json-db-backend.vercel.app/api/v1/auth'
  // user: any = {
  //   "email":"admin@gmail.com",
	//   "password": "123"
  // }

  constructor(private http: HttpClient) { }

  login(user: any): Observable<any>{
    //{withCredentials: true}
    // return this.http.post<any>(this.url, user).pipe(
    //   tap((res: any) => {
    //     localStorage.setItem('TOKEN', res.token)
    //   })
    // ) 
    return this.http.post<any>(`${this.url}/login`, user)
  }

  signup(user: any): Observable<any>{
    return this.http.post<any>(`${this.url}/create-new-user`, user)
  }
}
