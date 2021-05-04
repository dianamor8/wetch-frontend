export class Profile {
    
    public id:number|null;
    public firstName:string;
    public lastName:string;    

    public constructor(init?: Partial<Profile>) {
        Object.assign(this, init);
    }

}