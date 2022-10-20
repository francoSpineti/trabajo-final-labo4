import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.css']
})
export class PerfilesComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  cargarForm(perfil:string){
    if(perfil === 'paciente'){
      this.router.navigate(['ingreso/form-paciente']);
    }else if(perfil === 'especialista'){
      this.router.navigate(['ingreso/form-especialista']);
    }
  }
}
