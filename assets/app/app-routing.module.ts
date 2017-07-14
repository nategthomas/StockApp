import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {NewpollsComponent} from "./newpolls/newpolls.component";
import {MypollsComponent} from "./mypolls/mypolls.component";
import {AllmypollsComponent} from "./mypolls/allmypolls.component";
import {TestComponent} from "./newpolls/test.component";
import {AllpollsComponent} from "./allpolls/allpolls.component"


const appRoutes: Routes = [
  {path: '', component: NewpollsComponent},
  {path: 'newpolls', component: NewpollsComponent},
  {path: 'mypolls', component: MypollsComponent},
  {path: 'allmypolls', component: AllmypollsComponent},
  {path: 'allpolls', component: AllpollsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
