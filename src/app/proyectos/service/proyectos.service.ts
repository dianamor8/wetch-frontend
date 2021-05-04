import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Proyecto } from '../models/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {
  
  proyecto_url= environment.apiUrl+"/api/proyecto";  
  
  constructor(
    private http: HttpClient
  ) { }

  // OBTENER TODOS LOS PROYECTOS POR USUARIO. 
  getAllProyecto():Observable<Proyecto[]>{    
    return this.http.get<Proyecto[]>(this.proyecto_url, {withCredentials:true});    
  }

  //AGREGAR NUEVO PROYECTO
  addProyecto(proyecto:Proyecto):Observable<Proyecto>{
    return this.http.post<Proyecto>(this.proyecto_url, proyecto, { withCredentials:true});    
  }
 
  //ACTUALIZAR PROYECTO
  updateProyecto(proyecto:Proyecto):Observable<Proyecto>{        
    return this.http.put<Proyecto>(this.proyecto_url+`/${proyecto.id}`, proyecto, {withCredentials:true});    
  }

  //ELIMINAR PROYECTO
  deleteProyecto(proyecto:Proyecto):Observable<any>{    
    return this.http.delete<any>(this.proyecto_url+`/${proyecto.id}`, {withCredentials:true});    
  }
}
