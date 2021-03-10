import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PontoColetaPageRoutingModule } from './ponto-coleta-routing.module';

import { PontoColetaPage } from './ponto-coleta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PontoColetaPageRoutingModule
  ],
  declarations: [PontoColetaPage]
})
export class PontoColetaPageModule {}
