import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { RecaptchaErrorParameters } from 'ng-recaptcha';
import { finalize } from 'rxjs';
import { Especialista } from 'src/app/class/Especialista';
import { EspecialistaService } from 'src/app/services/especialista.service';

@Component({
  selector: 'app-form-especialista',
  templateUrl: './form-especialista.component.html',
  styleUrls: ['./form-especialista.component.css']
})
export class FormEspecialistaComponent implements OnInit {

  formGroup !: FormGroup;
  especialista !: Especialista;
  lista = new Array<string>();
  imagen1: any= '';
  foto !: File;
  auxReferencia : any;
  captcha !: string;

  constructor(
    private formBuilder : FormBuilder,
    private especialistaService : EspecialistaService,
    private storage: AngularFireStorage) { }

  ngOnInit(): void {

    this.formGroup = this.formBuilder.group({
      'nombre' : ['',[Validators.required]],
      'apellido' : ['',[Validators.required]],
      'edad' : ['',[Validators.required,Validators.min(18),Validators.max(99)]],
      'dni' : ['',[Validators.required,Validators.min(11111111),Validators.max(99999999)]],
      'mail' : ['',[Validators.required,Validators.email]],
      'password' : ['',Validators.required],
      'especialidad' : [],
      'imagen' : ['',[Validators.required,Validators.nullValidator]]
    });
  }

  crearEspecialista(){
    const nombre = this.formGroup.controls['nombre'].value;
    const apellido = this.formGroup.controls['apellido'].value;
    const edad = this.formGroup.controls['edad'].value;
    const dni = this.formGroup.controls['dni'].value;
    const mail = this.formGroup.controls['mail'].value;
    const password = this.formGroup.controls['password'].value;
    this.limpiarForm();
    let rutaImagen : string = "";
    //cargo foto
    let ruta : string = "especialistas/".concat(dni.toString());
    const rutaRef = this.storage.ref(ruta);
    this.auxReferencia = this.storage.upload(ruta,this.foto).snapshotChanges().pipe(
      finalize(()=>{
        rutaRef.getDownloadURL().subscribe(url =>{
                rutaImagen = url;
                this.especialistaService.conectarEspecialista(mail,false,null,nombre,apellido,edad,dni,this.lista,rutaImagen,false);
              });
            })
          ).subscribe();
  }

  agregar(){
    const especialidad = this.formGroup.controls['especialidad'].value;
    if(especialidad == null){
    }
    else if(especialidad !== null || especialidad != undefined || especialidad !== "" ){
        this.lista.push(especialidad);
        this.formGroup.controls['especialidad'].setValue('');
        (<HTMLInputElement> document.getElementById('botonAgregar')).disabled = true;
    }
  }

  mostrarImagen(event:any) {
    let file = event.target.files[0];
    if(file != undefined){
      var reader = new FileReader();
      this.foto = file;
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
      this.imagen1 = (<FileReader>event.target).result;
     }
    }else{
      this.imagen1 = '';
    }
  }

  limpiarForm(){
    this.formGroup.reset();
  }

  public resolved(captchaResponse: string): void {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
    this.captcha = captchaResponse;
  }

  public onError(errorDetails: RecaptchaErrorParameters): void {
    console.log(`reCAPTCHA error encountered; details:`, errorDetails);
  }

  verificar(){
    if(this.formGroup.controls['especialidad'].value != ''){
      (<HTMLInputElement> document.getElementById('botonAgregar')).disabled = false;
    }
  }

}
