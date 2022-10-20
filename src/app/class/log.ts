export class Log{

    private id !: string;
    private email !: string;
    private fecha !: string;
    private hora !: string
    private accion !: string;

    constructor(id : string, email : string, fecha : string, hora : string, accion : string){
        this.id = id;
        this.email = email;
        this.fecha = fecha;
        this.hora = hora;
        this.accion = accion;
    }

    toJson():any{
        const json={
            id: this.id,
            email : this.email,
            fecha : this.fecha,
            hora : this.hora,
            accion : this.accion
        }
        return json;
    }

    public getID():string{
        return this.id;
    }

    public getEmail():string{
        return this.email;
    }

    public getFecha():string{
        return this.fecha;
    }

    public getHora():string{
        return this.hora;
    }

    public getAccion():string{
        return this.accion;
    }
}