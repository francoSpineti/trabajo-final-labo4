import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat/';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BienvenidoComponent } from './components/bienvenido/bienvenido.component';
import { HomeComponent } from './components/home/home.component';
import { IngresoRoutingModule } from './components/ingreso/ingreso-routing.module';
import { NavbarModule } from './components/navbar/navbar.module';
import { ErrorComponent } from './components/error/error.component';
import { RecaptchaModule,RecaptchaFormsModule } from 'ng-recaptcha';
import { HabilitarEspecialistasComponent } from './components/habilitar-especialistas/habilitar-especialistas.component';

@NgModule({
  declarations: [
    AppComponent,
    BienvenidoComponent,
    HomeComponent,
    ErrorComponent,
    HabilitarEspecialistasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    HttpClientModule,
    AngularFireStorageModule,
    IngresoRoutingModule,
    NavbarModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
