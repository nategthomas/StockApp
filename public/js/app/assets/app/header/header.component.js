var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { TwitterService } from "./twitter.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
var HeaderComponent = (function () {
    function HeaderComponent(twitterService, activatedRoute, location) {
        this.twitterService = twitterService;
        this.activatedRoute = activatedRoute;
        this.location = location;
        this.isCollapsed = true;
    }
    HeaderComponent.prototype.toggleCollapse = function () {
        this.isCollapsed = !this.isCollapsed;
    };
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activatedRoute.queryParams.subscribe(function (params) {
            if (params['valid']) {
                var user = params['valid'];
                var token = params['token'];
                var userID = params['userid'];
                localStorage.setItem('user', user);
                localStorage.setItem('token', token);
                localStorage.setItem('userID', userID);
                _this.user = user;
                _this.location.replaceState('');
            }
            else {
                var lsUser = localStorage.getItem('user');
                _this.user = lsUser;
            }
        });
    };
    HeaderComponent.prototype.twitterAuth = function () {
        this.twitterService.signIn();
    };
    HeaderComponent.prototype.isLoggedIn = function () {
        return this.twitterService.loggedIn();
    };
    HeaderComponent.prototype.logout = function () {
        this.twitterService.onLogout();
    };
    return HeaderComponent;
}());
HeaderComponent = __decorate([
    Component({
        selector: 'app-header',
        templateUrl: './header.component.html',
        styleUrls: ['./header.component.css']
    }),
    __metadata("design:paramtypes", [TwitterService, ActivatedRoute, Location])
], HeaderComponent);
export { HeaderComponent };
