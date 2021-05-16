import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Parroquia, Provincia, Proyecto } from '../models/proyecto';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {  
    
  private _ubicacionURL = environment.wetchUrl+'/assets/ubicacion.json';

  proyecto_url= environment.apiUrl+"/api/proyecto";  
  
  constructor(
    private http: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

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

  public getJSON(): Observable<Provincia[]> {
    return this.http.get<Provincia[]>(this._ubicacionURL, this.httpOptions);
  }

  // public getyJSON(): Observable<Prov[]> {
    // private _jsonURL = 'assets/provincias.json';
  //   return this.http.get<Prov[]>(this._jsonURL, this.httpOptions)
  //   .pipe(            
  //     map((currentValue, index)=>{
  //       let indice:number=1;
  //       let objects:Prov[]=[];        
  //       for (const property in currentValue) {
  //         let provincia = new Prov();          
  //         provincia.provincia = currentValue[property].provincia;          
  //         provincia.id = indice.toString();
  //         provincia.codigo = property.toString();
  //         indice++;            
  //         let codeParroquia:number = 1;          
  //         let indiceCanton:number=1;
  //         for (const canton in currentValue[property].cantones) {
  //           let canton_= new Cant();
  //           canton_.id = provincia.id+'.'+indiceCanton.toString(); 
  //           canton_.canton = currentValue[property].cantones[canton].canton;
  //           canton_.codigo = canton.toString();
  //           indiceCanton++;
  //           provincia.cantones.push(canton_);            
  //           let indiceParroquia:number=1;
  //           for (const parroquia in currentValue[property].cantones[canton].parroquias) {
  //             let parroq = new Parroq();
  //             parroq.id = provincia.id+'.'+indiceCanton.toString()+'.'+ indiceParroquia.toString(); 
  //             parroq.codigo = parroquia.toString();
  //             parroq.nombre = currentValue[property].cantones[canton].parroquias[parroquia].toString();              
  //             indiceParroquia++;
  //             canton_.parroquias.push(parroq)
  //           }            
  //         }
  //         console.log(provincia)
  //         objects.push(provincia)
  //       }
  // 	      return objects;
  //     })    
  //   )
  // }
}

