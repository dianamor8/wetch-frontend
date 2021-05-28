import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { Contacto } from '../models/contacto';


@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  
  constructor(
    private http: HttpClient
  ){

  }
  contacto_url= environment.apiUrl+"/api/contacto";

  // OBTENER TODOS LOS CONTACTOS 
  getAllContactos():Observable<Contacto[]>{    
    return this.http.get<Contacto[]>(this.contacto_url, {withCredentials:true});        
  }

  //ELIMINAR CONTACTO
  deleteContacto(contacto:Contacto):Observable<any>{    
    return this.http.delete<any>(this.contacto_url+`/${contacto.id}`, {withCredentials:true});    
  }

  //UPDATE CONTACTO
  updateContacto(contacto:Contacto):Observable<Contacto>{    

    return this.http.put<Contacto>(this.contacto_url+`/${contacto.id}`, contacto,{withCredentials:true});    
  }

  //NUEVO CONTACTO
  addContacto(contacto:Contacto):Observable<Contacto>{
    return this.http.post<Contacto>(this.contacto_url, contacto, { withCredentials:true});    
  }
}

