import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecaptchaErrorParameters } from 'ng-recaptcha';
import { finalize } from 'rxjs';
import { Paciente } from 'src/app/class/Paciente';
import { PacienteService } from 'src/app/services/paciente.service';

@Component({
  selector: 'app-form-paciente',
  templateUrl: './form-paciente.component.html',
  styleUrls: ['./form-paciente.component.css']
})
export class FormPacienteComponent implements OnInit {

  formGroup !: FormGroup;
  paciente !: Paciente;
  imagen1: any= '';
  imagen2: any= ''; 
  foto1 ?: File;
  foto2 ?: File;
  auxReferencia : any;
  captcha ?: string;

  constructor(
    private formBuilder : FormBuilder,
    private pacienteService : PacienteService,
    private storage: AngularFireStorage) { }

  ngOnInit(): void {
      this.formGroup = this.formBuilder.group({
      'nombre' : ['',[Validators.required]],
      'apellido' : ['',[Validators.required]],
      'edad' : ['',[Validators.required,Validators.min(18),Validators.max(99)]],
      'dni' : ['',[Validators.required,Validators.min(11111111),Validators.max(99999999)]],
      'mail' : ['',[Validators.required,Validators.email]],
      'password' : ['',Validators.required],
      'obraSocial' : ['',Validators.required],
      'imagenUno' : ['',[Validators.required,Validators.nullValidator]],
      'imagenDos' : ['',[Validators.required,Validators.nullValidator]]
    });
  }

  crearPaciente(){
    const nombre = this.formGroup.controls['nombre'].value;
    const apellido = this.formGroup.controls['apellido'].value;
    const edad = this.formGroup.controls['edad'].value;
    const dni = this.formGroup.controls['dni'].value;
    const mail = this.formGroup.controls['mail'].value;
    const password = this.formGroup.controls['password'].value;
    const obraSocial = this.formGroup.controls['obraSocial'].value;
    this.limpiarImagenes();
    this.limpiarForm();
    this.captcha = "";
    let rutaImagen1 : string = "";
    let rutaImagen2 : string = "";
    //cargo fotos
    let ruta : string = "pacientes/"+dni;
    const rutaRef = this.storage.ref(ruta);
     this.auxReferencia = this.storage.upload(ruta,this.foto1).snapshotChanges().pipe(
      finalize(()=>{
        rutaRef.getDownloadURL().subscribe(url =>{
          rutaImagen1 = url;
          let ruta2 : string = "pacientes/"+ dni + "_2";
          const rutaRef2 = this.storage.ref(ruta2);
          this.auxReferencia = this.storage.upload(ruta2,this.foto2).snapshotChanges().pipe(
            finalize(()=>{
                rutaRef2.getDownloadURL().subscribe(url =>{
                  rutaImagen2 = url;
                  this.pacienteService.registrar(nombre,apellido,edad,dni,obraSocial,mail,password,rutaImagen1,rutaImagen2);
              });
            })
          ).subscribe();
        });
      })
    ).subscribe();
  }

  mostrarImagen1(event:any) {
      let file = event.target.files[0];
      if(file != undefined){
        var reader = new FileReader();
        this.foto1 = file;
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event) => {
        this.imagen1 = (<FileReader>event.target).result;
       }
      }else{
        this.imagen1 = '';
      }
  }

  mostrarImagen2(event:any) {
    let file = event.target.files[0];
    if(file != undefined){
      var reader = new FileReader();
      this.foto2 = file;
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
      this.imagen2 = (<FileReader>event.target).result;
     }
    }else{
      this.imagen2 = '';
    }
  }

  limpiarImagenes(){
    this.imagen1 = '';
    this.imagen2 = '';
  }

  limpiarForm(){
    this.formGroup.reset();
  }

  public resolved(captchaResponse: any): void {
    this.captcha = captchaResponse;
  }

  public onError(errorDetails: RecaptchaErrorParameters): void {
    console.log(`reCAPTCHA error encountered; details:`, errorDetails);
  }

}
