import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // login_url="http://wetch-api.morenaestudios.com/api/login";
  login_url="http://localhost:8888/api/login";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  login(email:string, password:string):Observable<any>{
    let params = new HttpParams();
    params = params.append('email', email);
    params = params.append('password', password); 
    return this.http.post(this.login_url, this.httpOptions, {params:params});
  }

}
