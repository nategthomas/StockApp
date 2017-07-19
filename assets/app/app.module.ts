import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartModule } from 'angular2-chartjs';
import { CookieService } from 'ngx-cookie-service';


import { AppComponent } from "./app.component";
import {HeaderComponent} from "./header/header.component";
import {AppRoutingModule} from "./app-routing.module";
import {NewpollsComponent} from "./newpolls/newpolls.component";
import {TwitterService}  from "./header/twitter.service";
import {PollService} from "./newpolls/poll.service";
import {MypollsComponent} from "./mypolls/mypolls.component";
import {AllmypollsComponent} from "./mypolls/allmypolls.component";
import {SinglePoll} from "./mypolls/singlepoll.component";
import {ErrorComponent} from "./errors/error.component";
import {ErrorService} from "./errors/error.service";
import {AllpollsComponent} from "./allpolls/allpolls.component"




@NgModule({
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
export class AppModule {

}
