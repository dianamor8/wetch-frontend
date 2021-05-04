import { User } from "src/app/auth/models/user";
import { TipoAreaVivienda } from "./tipo-area-vivienda";

export class Ambiente {
    id:number;
    nombre:string;
    descripcion:string;
    propietario:User=null;
    areas:AreaVivienda[]=[];    

    // addArea(area:AreaVivienda){
    //     this.areas.push(area);
    // }

    constructor(){        
    }
}

export class AreaVivienda {
    id:number;
    area:number;
    unidadMedida:string;
    tipoAreaVivienda:TipoAreaVivienda;

	// constructor(area:number, tipoAreaVivienda:TipoAreaVivienda) {
    //     this.area = area;        
    //     this.unidadMedida = 'metro cuadrado';
    //     this.tipoAreaVivienda = tipoAreaVivienda;
	// }
	
    constructor(){
        this.unidadMedida = 'metro cuadrado'
    }
    
}