export class Administrador{
    id !: string;
    nombre !: string;
    apellido !: string;
    edad !: number;
    dni !: number;
    mail !: string;
    imagen !: string;
    perfil !: string;

    constructor(id : string,nombre : string,apellido : string,edad : number,dni : number,mail : string,imagen : string, perfil : string){
            this.id = id;
            this.nombre = nombre;
            this.apellido = apellido;
            this.edad = edad;
            this.dni = dni;
            this.mail = mail;
            this.imagen = imagen;
            this.perfil = perfil;
    }

    toJSON(){
        const json={
            id : this.id,
            nombre : this.nombre,
            apellido : this.apellido,
            edad : this.edad,
            dni : this.dni,
            mail : this.mail,
            imagen : this.imagen,
            perfil : this.perfil
        }
        return json;
    }
}