import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor( private http: HttpClient) { }

  registerUser(user: { name: String; email: string; username: String; password: String; }){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/users/register', user, {headers: headers})
    .pipe(map((res => res.constructor)));
    // .map((res: { json: () => any; }) => res.json());
  }
}
