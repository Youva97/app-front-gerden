import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyspacePageRoutingModule } from './myspace-routing.module';

import { MyspacePage } from './myspace.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyspacePageRoutingModule
  ],
  declarations: [MyspacePage]
})
export class MyspacePageModule {}
