var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartModule } from 'angular2-chartjs';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { AppRoutingModule } from "./app-routing.module";
import { NewpollsComponent } from "./newpolls/newpolls.component";
import { TwitterService } from "./header/twitter.service";
import { PollService } from "./newpolls/poll.service";
import { MypollsComponent } from "./mypolls/mypolls.component";
import { AllmypollsComponent } from "./mypolls/allmypolls.component";
import { SinglePoll } from "./mypolls/singlepoll.component";
import { ErrorComponent } from "./errors/error.component";
import { ErrorService } from "./errors/error.service";
import { AllpollsComponent } from "./allpolls/allpolls.component";
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            AppComponent,
            HeaderComponent,
            NewpollsComponent,
            MypollsComponent,
            AllmypollsComponent,
            SinglePoll,
            ErrorComponent,
            AllpollsComponent
        ],
        imports: [
            FormsModule,
            ReactiveFormsModule,
            HttpModule,
            BrowserModule,
            AppRoutingModule,
            ChartModule
        ],
        providers: [
            TwitterService,
            PollService,
            ErrorService,
            CookieService
        ],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
