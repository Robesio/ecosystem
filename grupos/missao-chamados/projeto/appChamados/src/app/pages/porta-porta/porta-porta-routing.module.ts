import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PortaPortaPage } from './porta-porta.page';

const routes: Routes = [
  {
    path: '',
    component: PortaPortaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PortaPortaPageRoutingModule {}
