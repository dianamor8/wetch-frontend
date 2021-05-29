import { User } from "src/app/auth/models/user";
import { TipoAcabado } from "src/app/prefactibilidad/models/acabado";
import { Ambiente, AreaVivienda } from "src/app/prefactibilidad/models/ambiente";
import { TipoAreaVivienda } from "src/app/prefactibilidad/models/tipo-area-vivienda";

export class Proyecto {
  id: number;
  titulo: string;
  fecha: Date;
  updated_at: Date;
  solicitante:string;
  descripcion:string;
  prefactibilidads: Prefactibilidad[];
  ubicacion: Ubicacion;
  propietario:Propietario;
  constructor(){}
}

export class Propietario{
  id:number;
  nombre:string;
  constructor(){}
}

export class Ubicacion {
  id: number;
  provincia: string;
  canton: string;
  parroquia: string;
  direccion:string;
  propietario: User;
  constructor(){}
}

export class Prefactibilidad {
  id: number;
  fecha: Date;
  propietario: User;
  typeArea: TipoAreaVivienda;
  areaConstruccion: AreaConstruccion;
  acabado: TipoAcabado;
  items:ItemPrefactibilidad[];  
  subtotalAreaConstruccion: number;
  areaCirculacionParedes: number;
  areaTotalConstruccion: number;
  proyecto:number;
  nroPlantas:number;
  costoConstruccion:number;
  costoDireccionTecnica:number;
  costoTotalConstruccion:number;
  costoEstudioPorMetro:number;
  costoEstudios:number;
  inversionTotal:number;
  constructor(){}
}

export class ItemPrefactibilidad {
  id: number;
  cantidad:number;
  subtotal:number;
  ambiente: Ambiente;  
  areaVivienda: AreaVivienda;  
  constructor(){}
}

export class AreaConstruccion {
  id: number;    
  retiroFrontal: number;
  retiroPosterior: number;
  retiroLateralIzquierdo: number;
  retiroLateralDerecho: number;
  medidaFrente: number;
  medidaFondo: number;
  areaTotal: number;
  cos: number;
  areaCOS: number;
  costoTotalTerreno:number;
  valorSueloUrbano:number;
  propietario: User;
  constructor(){}
}

export class Provincia{
  id:string;
  codigo:string;
  provincia:string;
  cantones: Canton[] =[];
  constructor(){}
}

export class Canton{
  id:string;
  codigo:string;
  canton:string;
  parroquias: Parroquia[]=[];  
  constructor(){}
}

export class Parroquia{
  id:string;
  codigo:string;
  nombre:string;  
  constructor(){}
}

