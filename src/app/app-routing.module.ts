import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'ingreso', loadChildren: () => import('./components/ingreso/ingreso.module').then(m => m.IngresoModule) }, { path: 'navbar', loadChildren: () => import('./components/navbar/navbar.module').then(m => m.NavbarModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
