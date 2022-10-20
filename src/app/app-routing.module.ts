import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidoComponent } from './components/bienvenido/bienvenido.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path : '', redirectTo : 'bienvenido', pathMatch : 'full'},
  {path: 'bienvenido',component : BienvenidoComponent},
  {path: 'home',component : HomeComponent},
  {path: 'ingreso', loadChildren: () => import('./components/ingreso/ingreso.module').then(m => m.IngresoModule) },
  {path: '**',component : ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
