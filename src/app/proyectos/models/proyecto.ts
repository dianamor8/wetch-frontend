import { User } from "src/app/auth/models/user";
import { TipoAcabado } from "src/app/prefactibilidad/models/acabado";

export class Proyecto {
  id: number;
  titulo: string;
  fecha: string;
  prefactibilidads: Prefactibilidad[];
  ubicacion: Ubicacion;
  constructor(){}
}

export class Ubicacion {
  id: number;
  provincia: string;
  canton: string;
  sector: string;
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
  propietarioVivienda: string;
  callePrincipal: string;
  calleSecundaria: string;
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