import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { map } from 'rxjs/operators';

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
    // .pipe(map((res => res.constructor)));
  }

  authenticateEmail(user: { email: string; password: String}){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:8080/users/authenticate', user, {headers: headers})
    // .pipe(map((res => res.constructor)));
  }

  storeUserData(token: any, userEmail: any){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(userEmail));
    this.authToken = token;
    this.user = userEmail;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
