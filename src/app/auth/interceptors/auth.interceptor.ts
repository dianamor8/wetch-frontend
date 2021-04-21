import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

headerName = 'X-XSRF-TOKEN';
constructor(private tokenService: HttpXsrfTokenExtractor) {}

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const token = localStorage.getItem('auth_token');
    // if (!token) {
    //   return next.handle(req);
    // }
    
    // const headers = req.clone({
    //   headers: req.headers.set('Authorization', `Bearer ${token}`)
    // });
    // return next.handle(headers);
    // ADDING X-XSRF-TOKEN

    if (req.method === 'GET' || req.method === 'HEAD') {                
        return next.handle(req);
    }
    
    const token = this.tokenService.getToken();
    
    if (token !== null && !req.headers.has(this.headerName)) {
      req = req.clone({headers: req.headers.set(this.headerName, token)});      
    }

    req = req.clone({
      headers: req.headers.set('Access-Control-Allow-Credentials', 'true')
    });
    return next.handle(req);
  }
}