export class Especialista{
    id !: string;
    nombre !: string;
    apellido !: string;
    edad !: number;
    dni !: number;
    especialidades !: Array<string>;
    mail !: string;   
    imagen !: string;
    emailVerificado !: boolean;
    perfil !: string;

    constructor(id : string,nombre : string,apellido : string,edad : number,dni : number,especialidades : Array<string>,
        mail : string,imagen : string, emailVerificado : boolean, perfil : string){
            this.id = id;
            this.nombre = nombre;
            this.apellido = apellido;
            this.edad = edad;
            this.dni = dni;
            this.especialidades = especialidades;
            this.mail = mail;
            this.imagen = imagen;
            this.emailVerificado = emailVerificado;
            this.perfil = perfil;
    }

    toJSON(){
        const json={
            id : this.id,
            nombre : this.nombre,
            apellido : this.apellido,
            edad : this.edad,
            dni : this.dni,
            especialidades : this.especialidades,
            mail : this.mail,
            imagen : this.imagen,
            emailVerificado : this.emailVerificado,
            perfil : this.perfil
        }
        return json;
    }
}