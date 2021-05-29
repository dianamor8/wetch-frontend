import { HttpClient, HttpHeaderResponse, HttpHeaders, HttpParams, HttpResponse, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, delay, tap } from 'rxjs/operators';
import { Profile } from '../models/profile';
import { User, UserSystem } from '../models/user';
import { environment } from './../../../environments/environment';


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
  logout_url= environment.apiUrl+"/api/logout";
  changePassword_url = environment.apiUrl+'/api/change-password';
  validateNewUser_url = environment.apiUrl+'/api/validateAccount';
  profile_url = environment.apiUrl+'/api/profile';
  usersSystem_url = environment.apiUrl+'/api/users-list';
  roles_url = environment.apiUrl+'/api/roles-update';
  removeUser_url = environment.apiUrl+'/api/remove-user';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient,
              private tokenService: HttpXsrfTokenExtractor
    ) { }

  login(email:string, password:string):Observable<any>{
    let params = new HttpParams();
    params = params.append('email', email);
    params = params.append('password', password); 
    return this.http.post(this.login_url, this.httpOptions, {params:params, withCredentials:true});
  }

  register(user:User, url:string):Observable<any>{
    let params = new HttpParams();
    params = params.append('name', user.name);
    params = params.append('email', user.email);
    params = params.append('password', user.password); 
    params = params.append('url', url); 
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
    let header = new HttpHeaders();
   
    header = header.set('Authorization', tokenType);
    header = header.set('Content-Type', 'application/json');    
   
    let headerName = 'X-XSRF-TOKEN';
    const token_xsrf = this.tokenService.getToken();  
   
    if (token_xsrf !== null) {
      header = header.set(headerName, token_xsrf);            
    }
    return this.http.get(this.verifyToken_url, {headers:header});
  }
 

  loginBackend():Observable<HttpResponse<any>>{    
    return this.http.get<any>(this.authenticateBackend_url, {withCredentials:true, observe: 'response'});
  }

  logOut():Observable<any>{    
    const header = new HttpHeaders();    
    header.set('Content-Type', 'application/json');    
    return this.http.post(this.logout_url, {headers:header}, {withCredentials:true});
  }

  changePassword(password:string):Observable<any>{
    let params = new HttpParams();    
    params = params.append('password', password); 
    return this.http.post(this.changePassword_url, this.httpOptions, {params:params, withCredentials:true});
  }

  validateNewUser(token:any):Observable<any>{    
    let tokenType  = 'Bearer '+token;
    let header = new HttpHeaders();
   
    header = header.set('Authorization', tokenType);
    header = header.set('Content-Type', 'application/json');    
   
    let headerName = 'X-XSRF-TOKEN';
    const token_xsrf = this.tokenService.getToken();  
   
    if (token_xsrf !== null) {
      header = header.set(headerName, token_xsrf);            
    }
    return this.http.post(this.validateNewUser_url, this.httpOptions, {headers:header,  withCredentials:true});
  }

  //ACTUALIZAR PROFILE
  updateProfile(profile:Profile):Observable<Profile>{        
    return this.http.put<Profile>(this.profile_url+`/${profile.id}`, profile, {withCredentials:true});    
  }

  // OBTENER TODOS LOS USUARIOS DEL SISTEMA. 
  getAllUsersSystem():Observable<UserSystem[]>{    
    return this.http.get<UserSystem[]>(this.usersSystem_url, {withCredentials:true});    
  }

  updateRoles(userSystem:UserSystem):Observable<UserSystem>{    
    return this.http.post<UserSystem>(this.roles_url, userSystem, {withCredentials:true});
  }

  updateStatusUser(userSystem:UserSystem):Observable<UserSystem>{    
    return this.http.post<UserSystem>(this.removeUser_url, userSystem, {withCredentials:true});
  }

}
