import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FashionOneComponent } from './fashion/fashion-one/fashion-one.component';
import { FashionTwoComponent } from './fashion/fashion-two/fashion-two.component';

const routes: Routes = [
  {
    path: '',
    component: FashionTwoComponent
  },
  {
    path: 'two',
    component: FashionOneComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
