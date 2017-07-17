import { Component, OnInit} from '@angular/core';
import {TwitterService} from "./twitter.service"
import {Router, ActivatedRoute, Params} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private twitterService: TwitterService, private activatedRoute: ActivatedRoute, private location: Location) {}
  user: string;

  isCollapsed: boolean = true;

 toggleCollapse(): void {
   this.isCollapsed = !this.isCollapsed;
 }

  ngOnInit () {
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
