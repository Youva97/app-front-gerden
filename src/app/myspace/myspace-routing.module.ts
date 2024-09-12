import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyspacePage } from './myspace.page';

const routes: Routes = [
  {
    path: '',
    component: MyspacePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyspacePageRoutingModule {}
