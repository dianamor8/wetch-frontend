import { User } from "src/app/auth/models/user";
import { TipoAcabado } from "src/app/prefactibilidad/models/acabado";

export class Proyecto {
  id: number;
  titulo: string;
  fecha: Date;
  updated_at: Date;
  solicitante:string;
  descripcion:string;
  prefactibilidads: Prefactibilidad[];
  ubicacion: Ubicacion;
  propietario:User;
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
  fecha: string;
  propietario: User;
  typeArea: string;
  areaConstruccion: AreaConstruccion;
  acabado: TipoAcabado;
  subtotalAreaConstruccion: number;
  areaCirculacionParedes: number;
  areaTotalConstruccion: number;
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

