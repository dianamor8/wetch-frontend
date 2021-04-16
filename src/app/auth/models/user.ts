export class User {
    
    public id:number|null;
    public name:string;
    public email:string;
    public password:string;

    public constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }

}
