import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngresoRoutingModule } from './ingreso-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { FloatingButtonComponent } from './floating-button/floating-button.component';
import { PerfilesComponent } from './registro/perfiles/perfiles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormPacienteComponent } from './registro/form-paciente/form-paciente.component';
import { FormEspecialistaComponent } from './registro/form-especialista/form-especialista.component';
import { RecaptchaModule,RecaptchaFormsModule } from 'ng-recaptcha';

@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
    FloatingButtonComponent,
    PerfilesComponent,
    FormPacienteComponent,
    FormEspecialistaComponent
  ],
  imports: [
    CommonModule,
    IngresoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ]
})
export class IngresoModule { }
