import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountHomePage } from './account.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { AccountHomePageRoutingModule } from './account-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    AccountHomePageRoutingModule,
  ],
  declarations: [AccountHomePage],
})
export class AccountHomeModule {}
