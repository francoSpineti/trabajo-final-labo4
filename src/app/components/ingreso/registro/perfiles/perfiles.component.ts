import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css']
})
export class PerfilesComponent implements OnInit {

  adminLogueado !: boolean;

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  //ver despues esto
  estaLogueado(){
    let obj = JSON.parse(localStorage.getItem('administrador')!);
    obj != null ? this.adminLogueado = true : this.adminLogueado = false;
  }

  cargarForm(perfil:string){
    if(perfil === 'paciente'){
      this.router.navigate(['ingreso/form-paciente']);
    }else if(perfil === 'especialista'){
      this.router.navigate(['ingreso/form-especialista']);
    }else{
      this.router.navigate(['ingreso/form-administrador']);
    }
  }
}
