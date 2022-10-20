import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LogService } from './log.service';
import Swal from 'sweetalert2';
import { Administrador } from '../class/Administrador';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  dbPath : string = "/usuarios";
  private administradoresColeccion !: AngularFirestoreCollection<Administrador>;
  administradores : Observable<Administrador[]>;
  administrador !: Observable<Administrador>;

  constructor(
    private afs: AngularFirestore,
    private db : AngularFirestore,
    private router : Router,
    private authService: AngularFireAuth,
    private logService : LogService) {
    this.administradoresColeccion = this.db.collection<Administrador>(this.dbPath);
    this.administradores = this.administradoresColeccion.valueChanges(this.dbPath);
  }

  obtenerEmailAdministradorLogueado():string{
    let obj = JSON.parse(localStorage.getItem('administrador')!);
    return obj.email;
  }

  obtenerAdministradorPorMail(mail:string) {
    return new Promise<any>((resolve)=> {
    this.db.collection(this.dbPath, ref => ref.where('mail','==', mail)).valueChanges().subscribe(users => resolve(users))})
  }

  registrar(nombre : string,apellido : string,edad : number,dni : number,
    mail : string,contraseña : string,imagen : string){
    this.authService.createUserWithEmailAndPassword(mail,contraseña)
    .then(res =>{
      this.conectarAdministrador(mail,false,null,nombre,apellido,edad,dni,imagen);
    })
    .catch(error => this.popUpMensaje('Error',error.message,true));
  }

  async conectarAdministrador(mail:string,login:boolean,obj ?: any,nombre ?: string,apellido ?: string,
    edad ?: number,dni ?: number,imagen ?: string){
      if(login){
        let administrador : Administrador = new Administrador(obj[0].id,obj[0].nombre,obj[0].apellido,obj[0].edad,obj[0].dni,obj[0].mail,obj[0].imagen,obj[0].perfil);
        localStorage.setItem('administrador',JSON.stringify(administrador));
        this.router.navigate(['/home']);
      }else{
        let id = this.afs.createId();
        let administrador : Administrador = new Administrador(id,nombre!,apellido!,edad!,dni!,mail,imagen!,'admin');
        this.afs.collection(this.dbPath).doc(id).set(administrador.toJSON());
        this.logService.guardarLog(mail,"registro de usuario");
        this.router.navigate(['ingreso/login']);
      }
    }

  cerrarSesion() {
    localStorage.removeItem('administrador');
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
