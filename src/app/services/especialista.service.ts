import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LogService } from './log.service';
import Swal from 'sweetalert2';
import { Especialista } from '../class/Especialista';

@Injectable({
  providedIn: 'root'
})
export class EspecialistaService {

  dbPath : string = "/usuarios";
  private especialistasColeccion !: AngularFirestoreCollection<Especialista>;
  especialistas : Observable<Especialista[]>;
  especialista !: Observable<Especialista>;

  constructor(
    private afs: AngularFirestore,
    private db : AngularFirestore,
    private router : Router,
    private authService: AngularFireAuth,
    private logService : LogService) {
    this.especialistasColeccion = this.db.collection<Especialista>(this.dbPath);
    this.especialistas = this.especialistasColeccion.valueChanges(this.dbPath);
  }

  obtenerEmailEspecialistaLogueado():string{
    let obj = JSON.parse(localStorage.getItem('especialista')!);
    return obj.email;
  }

  obtenerEspecialistaPorMail(mail:string) {
    return new Promise<any>((resolve)=> {
    this.db.collection(this.dbPath, ref => ref.where('mail','==', mail)).valueChanges().subscribe(users => resolve(users))})
  }

  registrar(nombre : string,apellido : string,edad : number,dni : number,especialidades : Array<string>,
    mail : string,contraseña : string,imagen : string, emailVerificado : boolean){
    this.authService.createUserWithEmailAndPassword(mail,contraseña)
    .then(res =>{
      this.sendEmailVerification(res.user);
      this.conectarEspecialista(mail,false,null,nombre,apellido,edad,dni,especialidades,imagen,emailVerificado);
    })
    .catch(error => this.popUpMensaje('Error',error.message,true));
  }

  async conectarEspecialista(mail:string,login:boolean,obj ?: any,nombre ?: string,apellido ?: string,
    edad ?: number,dni ?: number,especialidades ?: Array<string>,imagen ?: string, emailVerificado ?: boolean){
      if(login){
        let especialista : Especialista = new Especialista(obj[0].id,obj[0].nombre,obj[0].apellido,obj[0].edad,obj[0].dni,obj[0].especialidades,obj[0].mail,obj[0].imagen,obj[0].emailVerificado,obj[0].perfil);
        localStorage.setItem('especialista',JSON.stringify(especialista));
        this.logService.guardarLog(mail,"inicio de sesion");
        this.router.navigate(['/home']);
      }else{
        let id = this.afs.createId();
        let especialista : Especialista = new Especialista(id,nombre!,apellido!,edad!,dni!,especialidades!,mail,imagen!,emailVerificado!,'especialista');
        this.afs.collection(this.dbPath).doc(id).set(especialista.toJSON());
        this.logService.guardarLog(mail,"registro de usuario");
        this.popUpMensaje('Registrado exitosamente!','Podrá ingresar a la aplicación cuando un administrador lo habilite.',false);
        this.router.navigate(['/ingreso/login']);
      }
    }

    async sendEmailVerification(user : any) {
      return await user.sendEmailVerification();
    }

  cerrarSesion() {
    localStorage.removeItem('especialista');
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
