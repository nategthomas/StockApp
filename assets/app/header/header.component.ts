import { Component, OnInit} from '@angular/core';
import {TwitterService} from "./twitter.service"
import {Router, ActivatedRoute, Params} from "@angular/router";
import {Location} from "@angular/common";

import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private twitterService: TwitterService,
              private activatedRoute: ActivatedRoute, private location: Location, private cookieService: CookieService) {}

  user: string;
  isCollapsed: boolean = true;
  cookieValue = 'unknown';

 toggleCollapse(): void {
   this.isCollapsed = !this.isCollapsed;
 }

  ngOnInit () {
    if ( this.cookieService.get('VoterApp') === "") {
      var now = new Date();
      var time = now.getTime();
      var expireTime = time + 1000*36000;
      var uuid = new Date().getTime().toString();
      this.cookieService.set( 'VoterApp', uuid, expireTime );
    }
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params['valid']) {
        let user = params['valid'];
        let token = params['token'];
        let userID = params['userid']
        localStorage.setItem('user', user);
        localStorage.setItem('token', token);
        localStorage.setItem('userID', userID);
        this.user = user;
        this.location.replaceState('');
      }
      else {
        var lsUser = localStorage.getItem('user')
        this.user = lsUser;
      }
    })
  }

  twitterAuth() {
    this.twitterService.signIn();
    }

    isLoggedIn() {
      return this.twitterService.loggedIn();
    }

    logout() {
      this.twitterService.onLogout()
    }

}
