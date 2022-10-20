export class Usuario{
    id ?: string;
    nombre ?: string;
    apellido ?: string;
    edad ?: number;
    dni ?: number;
    obraSocial ?: string;
    mail ?: string;
    imagenUno ?: string;
    imagenDos ?: string;
    perfil ?: string;
    especialidades ?: Array<string>;

    constructor(id ?: string,nombre ?: string,apellido ?: string,edad ?: number,dni ?: number,obraSocial ?: string,
        mail ?: string,imagenUno ?: string, imagenDos ?: string, perfil ?: string, especialidades ?:  Array<string>){
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
            this.especialidades = especialidades;
    }

}