import { Profile } from "./profile";

export class User {
    private _id: number|null;
    private _name: string;
    private _email: string;
    private _password:string;
    private _email_verified_at: string;
    private _permissions: Permission[];
    private _roles: Role[];
    private _profile: Profile;

    get id() {
      return this._id
    }
    
    set id(val: number|null) {
      this._id = val
    }
    
    get name() {
      return this._name
    }
    
    set name(val: string) {
      this._name = val
    }
    
    get email() {
      return this._email
    }
    
    set email(val: string) {
      this._email = val
    }
    
    get password() {
      return this._password
    }
    
    set password(val: string) {
      this._password = val
    }
    
    get email_verified_at() {
      return this._email_verified_at
    }
    
    set email_verified_at(val: string) {
      this._email_verified_at = val
    }
    
    get permissions() {
      return this._permissions
    }
    
    set permissions(val: Permission[]) {
      this._permissions = val
    }
    
    get roles() {
      return this._roles
    }
    
    set roles(val: Role[]) {
      this._roles = val
    }

    set profile(val: Profile) {
      this._profile = val
    }
    
    get profile() {
      return this._profile
    }
    

    public constructor(init?: Partial<User>) {
        Object.assign(this, init);        
    }


    isAdministrador():boolean{
        if(!this.roles){
            return false;
        }
        if(this.roles.filter((rol)=>rol.name==='Administrador').length!==0){
            return true;
        }
        return false;
    }
    
    isPlanificador():boolean{        
        if(!this.roles){
            return false;
        }
        if(this.roles.filter((rol)=>rol.name==='Planificador').length!==0){
            return true;
        }
        return false;
    }

    isCliente():boolean{
        if(!this.roles){
            return false;
        }
        if(this.roles.filter((rol)=>rol.name==='Cliente').length!==0){
            return true;
        }
        return false;
    }

    hasPermission(nombrePermiso:string):boolean{
      let rolaux = this.roles.find(rol=>{
        let permissionaux= rol.permissions.find(permission=> permission.name === nombrePermiso);
          return permissionaux?true:false
        });
      return rolaux ? true:false;
    }
}
  
export class Role {
    private _id: number;
    private _name: string;
    private _permissions: Permission[];

    get id() {
      return this._id
    }
    
    set id(val: number) {
      this._id = val
    }
    
    get name() {
      return this._name
    }
    
    set name(val: string) {
      this._name = val
    }
    
    get permissions() {
      return this._permissions
    }
    
    set permissions(val: Permission[]) {
      this._permissions = val
    }
    
    public constructor(init?: Partial<Role>) {
        Object.assign(this, init);        
    }

    
}
  
export class Permission {
    private _id: number;
    private _name: string;

    get id() {
      return this._id
    }
    
    set id(val: number) {
      this._id = val
    }
    
    get name() {
      return this._name
    }
    
    set name(val: string) {
      this._name = val
    }

    public constructor(init?: Partial<Permission>) {
        Object.assign(this, init);        
    }
   
}

export class UserSystem {
  id:number;
  name:string;
  email:string;
  admin:boolean;
  planificador:boolean;
  cliente:boolean;
  active:boolean;
  constructor(){}
}