import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LogService } from './log.service';
import Swal from 'sweetalert2';
import { Paciente } from '../class/Paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  dbPath : string = "/usuarios";
  private pacientesColeccion !: AngularFirestoreCollection<Paciente>;
  pacientes : Observable<Paciente[]>;
  paciente !: Observable<Paciente>;

  constructor(
    private afs: AngularFirestore,
    private db : AngularFirestore,
    private router : Router,
    private authService: AngularFireAuth,
    private logService : LogService) {
    this.pacientesColeccion = this.db.collection<Paciente>(this.dbPath);
    this.pacientes = this.pacientesColeccion.valueChanges(this.dbPath);
  }

  obtenerEmailPacienteLogueado():string{
    let obj = JSON.parse(localStorage.getItem('paciente')!);
    return obj.email;
  }

  obtenerPacientePorEmail(mail:string) {
    return new Promise<any>((resolve)=> {
    this.db.collection(this.dbPath, ref => ref.where('mail','==', mail)).valueChanges().subscribe(users => resolve(users))})
  }

  async registrar(nombre : string,apellido : string,edad : number,dni : number,obraSocial : string,
    mail : string,contraseña : string,imagenUno : string, imagenDos : string){
    this.authService.createUserWithEmailAndPassword(mail,contraseña)
    .then(res =>{
      this.sendEmailVerification(res.user);
      this.conectarPaciente(mail,false,null,nombre,apellido,edad,dni,obraSocial,imagenUno,imagenDos);
    })
    .catch(error => this.popUpMensaje('Error',error.message,true));
  }

  async sendEmailVerification(user : any) {
    return await user.sendEmailVerification();
  }

  async conectarPaciente(mail:string,login:boolean,obj ?: any,nombre ?: string,apellido ?: string,
    edad ?: number,dni ?: number,obraSocial ?: string,imagenUno ?: string, imagenDos ?: string){
      if(login){
        let paciente : Paciente = new Paciente(obj[0].id,obj[0].nombre,obj[0].apellido,obj[0].edad,obj[0].dni,obj[0].obraSocial,obj[0].mail,obj[0].imagenUno,obj[0].imagenDos,obj[0].perfil);
        localStorage.setItem('paciente',JSON.stringify(paciente));
        this.router.navigate(['/home']);
      }else{
        let id = this.afs.createId();
        let paciente : Paciente = new Paciente(id,nombre!,apellido!,edad!,dni!,obraSocial!,mail,imagenUno!,imagenDos!,'paciente');
        this.afs.collection(this.dbPath).doc(id).set(paciente.toJSON());
        this.logService.guardarLog(mail,"registro de usuario");
        this.popUpMensaje('Registrado exitosamente!','Se le ha enviado un email para verificar su cuenta.',false);
        this.router.navigate(['ingreso/login']);
      }
    }

  cerrarSesion() {
    localStorage.removeItem('paciente');
    this.router.navigate(['/']);
  }

  popUpMensaje(titulo : string,mensaje : string,error : boolean){
    Swal.fire(
       titulo,
       mensaje,
       error ? 'error' : 'success'
    )
  }

}