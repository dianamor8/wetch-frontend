import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { TipoAcabado } from '../models/acabado';
import { Ambiente, AreaVivienda } from '../models/ambiente';
import { TipoAreaVivienda } from '../models/tipo-area-vivienda';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrefactibilidadService {

  tipoAreaVivienda_url= environment.apiUrl+"/api/tipoAreaVivienda";  
  ambiente_url= environment.apiUrl+"/api/ambiente";  
  acabado_url= environment.apiUrl+"/api/tipoAcabado";  

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  // OBTENER TODOS LOS TIPOS DE AREA DE VIVIENDA POR USUARIO. 
  getAllTipoAreaVivienda():Observable<TipoAreaVivienda[]>{    
    return this.http.get<TipoAreaVivienda[]>(this.tipoAreaVivienda_url, {withCredentials:true});        
  }

  //AGREGAR NUEVO TIPO DE VIVIENDA
  addTipoAreaVivienda(tipoAreaVivienda:TipoAreaVivienda):Observable<TipoAreaVivienda>{
    let params = new HttpParams();
    params = params.append('nombre', tipoAreaVivienda.nombre);
    params = params.append('factorCirculacionParedes', tipoAreaVivienda.factorCirculacionParedes.toString());
    params = params.append('factorDireccionTecnica', tipoAreaVivienda.factorDireccionTecnica.toString());    
    return this.http.post<TipoAreaVivienda>(this.tipoAreaVivienda_url, this.httpOptions, {params:params, withCredentials:true});    
  }
 
  //ACTUALIZAR TIPO VIVIENDA
  updateTipoAreaVivienda(tipoAreaVivienda:TipoAreaVivienda):Observable<TipoAreaVivienda>{    
    let params = new HttpParams();
    params = params.append('nombre', tipoAreaVivienda.nombre);
    params = params.append('factorCirculacionParedes', tipoAreaVivienda.factorCirculacionParedes.toString());
    params = params.append('factorDireccionTecnica', tipoAreaVivienda.factorDireccionTecnica.toString());    
    return this.http.put<TipoAreaVivienda>(this.tipoAreaVivienda_url+`/${tipoAreaVivienda.id}`, this.httpOptions, {params:params, withCredentials:true});    
  }

  //ELIMINAR TIPO VIVIENDA
  deleteTipoAreaVivienda(tipoAreaVivienda:TipoAreaVivienda):Observable<any>{    
    return this.http.delete<any>(this.tipoAreaVivienda_url+`/${tipoAreaVivienda.id}`, {withCredentials:true});    
  }

  //AGREGAR NUEVO AMBIENTE
  addAmbiente(ambiente:Ambiente):Observable<Ambiente>{
    return this.http.post<Ambiente>(this.ambiente_url, ambiente, {withCredentials:true});
  }

  // OBTENER TODOS LOS AMBIENTES POR USUARIO 
  getAllAmbiente():Observable<Ambiente[]>{    
    return this.http.get<Ambiente[]>(this.ambiente_url, {withCredentials:true});    
  }

  //ACTUALIZAR AMBIENTE
  updateAmbiente(ambiente:Ambiente):Observable<Ambiente>{        
    return this.http.put<Ambiente>(this.ambiente_url+`/${ambiente.id}`, ambiente, {withCredentials:true});
  }


  //ELIMINAR AMBIENTE
  deleteAmbiente(ambiente:Ambiente):Observable<any>{    
    return this.http.delete<any>(this.ambiente_url+`/${ambiente.id}`, {withCredentials:true});    
  }


  // OBTENER TODOS LOS TIPOS DE ACABADOS DE VIVIENDA POR USUARIO. 
  getAllAcabado():Observable<TipoAcabado[]>{    
    return this.http.get<TipoAcabado[]>(this.acabado_url, {withCredentials:true});    
  }

  //AGREGAR NUEVO ACABADO
  addAcabado(acabado:TipoAcabado):Observable<TipoAcabado>{
    return this.http.post<TipoAcabado>(this.acabado_url, acabado, { withCredentials:true});    
  }
 
  //ACTUALIZAR ACABADO
  updateAcabado(acabado:TipoAcabado):Observable<TipoAcabado>{        
    return this.http.put<TipoAcabado>(this.acabado_url+`/${acabado.id}`, acabado, {withCredentials:true});    
  }

  //ELIMINAR ACABADO
  deleteAcabado(acabado:TipoAcabado):Observable<any>{    
    return this.http.delete<any>(this.acabado_url+`/${acabado.id}`, {withCredentials:true});    
  }
}
