var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import 'rxjs/Rx';
var TwitterService = (function () {
    function TwitterService(http) {
        this.http = http;
        this.url = 'https://voter-app1.herokuapp.com';
        this.url1 = 'http://localhost:3000';
    }
    TwitterService.prototype.signIn = function () {
        window.location.href = this.url + "/twitter/login";
    };
    TwitterService.prototype.onLogout = function () {
        localStorage.clear();
    };
    TwitterService.prototype.loggedIn = function () {
        return localStorage.getItem('user') !== null;
    };
    return TwitterService;
}());
TwitterService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], TwitterService);
export { TwitterService };
