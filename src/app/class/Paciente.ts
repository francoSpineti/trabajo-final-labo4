export class Paciente{
    id !: string;
    nombre !: string;
    apellido !: string;
    edad !: number;
    dni !: number;
    obraSocial !: string;
    mail !: string;
    imagenUno !: string;
    imagenDos !: string;
    perfil !: string;

    constructor(id : string,nombre : string,apellido : string,edad : number,dni : number,obraSocial : string,
        mail : string,imagenUno : string, imagenDos : string, perfil : string){
            this.id = id;
            this.nombre = nombre;
            this.apellido = apellido;
            this.edad = edad;
            this.dni = dni;
            this.obraSocial = obraSocial;
            this.mail = mail;
            this.imagenUno = imagenUno;
            this.imagenDos = imagenDos;
            this.perfil = perfil;
    }

    toJSON(){
        const json={
            id : this.id,
            nombre : this.nombre,
            apellido : this.apellido,
            edad : this.edad,
            dni : this.dni,
            obraSocial : this.obraSocial,
            mail : this.mail,
            imagenUno : this.imagenUno,
            imagenDos : this.imagenDos,
            perfil : this.perfil
        }
        return json;
    }
}