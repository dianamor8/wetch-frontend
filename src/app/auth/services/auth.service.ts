import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  login_url="http://localhost:8888/api/login";
  user_exist="http://localhost:8888/api/verifyUser";
  sigIn_url="http://localhost:8888/api/register";

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

  register(user:User):Observable<any>{
    let params = new HttpParams();
    params = params.append('name', user.name);
    params = params.append('email', user.email);
    params = params.append('password', user.password); 
    return this.http.post(this.sigIn_url, this.httpOptions, {params:params});
  }

  userExist(email:string):Observable<any>{
    let params = new HttpParams();
    params = params.append('email', email);
    return this.http.get<User>(this.user_exist, {params:params});
  }


}
