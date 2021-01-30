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
    localStorage.setItem('email', JSON.stringify(userEmail));
    this.authToken = token;
    this.user = userEmail;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  getProfile() {
    let headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('http://localhost:8080/users/profile', {headers: headers})
    // .pipe(map((res => res.constructor)));
  }
}
