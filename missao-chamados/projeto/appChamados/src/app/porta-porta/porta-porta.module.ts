import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PortaPortaPageRoutingModule } from './porta-porta-routing.module';

import { PortaPortaPage } from './porta-porta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PortaPortaPageRoutingModule
  ],
  declarations: [PortaPortaPage]
})
export class PortaPortaPageModule {}
