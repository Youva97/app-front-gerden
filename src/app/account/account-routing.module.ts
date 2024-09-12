import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountHomePage } from './account.page';

const routes: Routes = [
  {
    path: '',
    component: AccountHomePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountHomePageRoutingModule {}
