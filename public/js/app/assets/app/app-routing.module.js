var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NewpollsComponent } from "./newpolls/newpolls.component";
import { MypollsComponent } from "./mypolls/mypolls.component";
import { AllmypollsComponent } from "./mypolls/allmypolls.component";
import { AllpollsComponent } from "./allpolls/allpolls.component";
var appRoutes = [
    { path: '', component: AllpollsComponent },
    { path: 'newpolls', component: NewpollsComponent },
    { path: 'mypolls', component: MypollsComponent },
    { path: 'allmypolls', component: AllmypollsComponent },
    { path: 'allpolls', component: AllpollsComponent },
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forRoot(appRoutes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
