import { HttpClient, HttpHeaderResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';
import { User } from '../models/user';
import { environment } from './../../../environments/environment';


export interface Config {
  headers: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authenticateBackend_url = environment.apiUrl+'/sanctum/csrf-cookie'  
  login_url= environment.apiUrl+"/api/login";
  user_exist=environment.apiUrl+"/api/verifyUser";
  sigIn_url=environment.apiUrl+"/api/register";
  resetPassword_url=environment.apiUrl+"/api/reset-password";  
  verifyToken_url=environment.apiUrl+"/api/verifyToken";  

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  login(email:string, password:string):Observable<any>{
    let params = new HttpParams();
    params = params.append('email', email);
    params = params.append('password', password); 
    return this.http.post(this.login_url, this.httpOptions, {params:params, withCredentials:true});
  }

  register(user:User):Observable<any>{
    let params = new HttpParams();
    params = params.append('name', user.name);
    params = params.append('email', user.email);
    params = params.append('password', user.password); 
    return this.http.post(this.sigIn_url, this.httpOptions, {params:params,  withCredentials:true});
  }

  userExist(email:string):Observable<any>{
    let params = new HttpParams();
    params = params.append('email', email);
    return this.http.get<User>(this.user_exist, {params:params, withCredentials:true});
  }

  resetPassword(email:string, url:string):Observable<any>{
    let params = new HttpParams();
    params = params.append('email', email);
    params = params.append('url', url);
    return this.http.get(this.resetPassword_url, {params:params,  withCredentials:true});
  }

  verifyToken(token:any):Observable<any>{    
    let tokenType  = 'Bearer '+token;
    const header = new HttpHeaders();
    console.log(token);
    header.set('Authorization', tokenType);
    header.set('Content-Type', 'application/json');    
    // const headers = {headers:header}; 
    return this.http.get(this.verifyToken_url, {headers:header, withCredentials:true});
  }
 

  loginBackend():Observable<HttpResponse<any>>{    
    return this.http.get<any>(this.authenticateBackend_url, {withCredentials:true, observe: 'response'});
  }
}
