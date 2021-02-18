import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AbrirPage } from './abrir.page';

const routes: Routes = [
  {
    path: '',
    component: AbrirPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AbrirPageRoutingModule {}
