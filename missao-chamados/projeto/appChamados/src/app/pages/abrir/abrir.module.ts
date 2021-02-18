import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AbrirPageRoutingModule } from './abrir-routing.module';

import { AbrirPage } from './abrir.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AbrirPageRoutingModule
  ],
  declarations: [AbrirPage]
})
export class AbrirPageModule {}
