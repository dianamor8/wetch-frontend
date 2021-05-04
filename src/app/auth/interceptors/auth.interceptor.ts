import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

headerName = 'X-XSRF-TOKEN';
auth_token =null;
constructor(private tokenService: HttpXsrfTokenExtractor,
            private store:Store<AppState>) {}

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
  this.store.select('authApp').subscribe((resp)=>{
    this.auth_token = resp.access_token;
  })  
  
  if (this.auth_token) {
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${this.auth_token}`)
    });  
  }

  if (req.method === 'GET' || req.method === 'HEAD') {
    console.log(req.headers.keys() + '>>>headers +' +req.method)                
    return next.handle(req);
  }
  
  // ADDING X-XSRF-TOKEN
  const token = this.tokenService.getToken();
    
  if (token !== null && !req.headers.has(this.headerName)) {
    req = req.clone({headers: req.headers.set(this.headerName, token)});      
  }

  req = req.clone({
    headers: req.headers.set('Access-Control-Allow-Credentials', 'true')
  });

  console.log(req.headers.keys() + '>>>headers+'+req.method)

  return next.handle(req);

  }
}