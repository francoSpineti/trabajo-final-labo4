import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { PacienteService } from './paciente.service';
import Swal from 'sweetalert2';
import { EspecialistaService } from './especialista.service';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  dbPath : string = "/usuarios";

  constructor(
    private afs: AngularFirestore,
    private db : AngularFirestore,
    private authService: AngularFireAuth,
    private pacienteService : PacienteService,
    private especialistaService : EspecialistaService,
    private adminService : AdminService
  ) { }

  obtenerUsuarioPorMail(mail:string) {
    return new Promise<any>((resolve)=> {
    this.db.collection(this.dbPath, ref => ref.where('mail','==', mail)).valueChanges().subscribe(users => resolve(users))})
  }

  login(mail : string, contraseña : string){
    this.authService.signInWithEmailAndPassword(mail,contraseña)
    .then( res =>{
          this.obtenerUsuarioPorMail(mail)
            .then(resp => {
                if(resp[0].perfil === 'admin'){
                  this.adminService.conectarAdministrador(mail,true,resp);
                }else{
                  if(res.user?.emailVerified){
                    if(resp[0].perfil === 'paciente'){
                      this.pacienteService.conectarPaciente(mail,true,resp);
                    }else if(resp[0].perfil === 'especialista'){
                      this.especialistaService.conectarEspecialista(mail,true,resp);
                    }
                  }else{
                    this.popUpMensaje('Error','Su email no se encuentra verificado, por favor verifiquelo.',true);
                  }
                }
            })
            .catch(error => {this.popUpMensaje('Error',error.message,true)});
      }
    )
    .catch(error => {this.popUpMensaje('Error',error.message,true)});
  }

  popUpMensaje(titulo : string,mensaje : string,error : boolean){
    Swal.fire(
       titulo,
       mensaje,
       error ? 'error' : 'success'
    )
  }

}
