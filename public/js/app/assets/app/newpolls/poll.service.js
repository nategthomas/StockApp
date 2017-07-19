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
import { Http, Headers } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { Subject } from "rxjs/Subject";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Poll } from "./poll.model";
import { ErrorService } from "../errors/error.service";
import { CookieService } from 'ngx-cookie-service';
var PollService = (function () {
    function PollService(http, errorService, cookieService) {
        this.http = http;
        this.errorService = errorService;
        this.cookieService = cookieService;
        this.polls = [];
        this.pollisClicked = new Subject();
        this.url = 'https://voter-app1.herokuapp.com';
        this.url1 = 'http://localhost:3000';
    }
    PollService.prototype.clickedPoll = function (poll) {
        this.pollisClicked.next(poll);
    };
    PollService.prototype.getClickedPoll = function () {
        return this.pollisClicked.asObservable();
    };
    PollService.prototype.makePoll = function (poll) {
        var _this = this;
        var body = JSON.stringify(poll);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.post(this.url + '/polls' + token, body, { headers: headers })
            .map(function (response) { return response.json().obj; })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    PollService.prototype.getmyPolls = function () {
        var _this = this;
        var token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.get(this.url + '/polls/mypolls' + token)
            .map(function (response) {
            var polls = response.json().obj;
            var transPoll = [];
            for (var _i = 0, polls_1 = polls; _i < polls_1.length; _i++) {
                var poll = polls_1[_i];
                transPoll.push(new Poll(poll.title, poll.options, poll.creator, poll._id));
            }
            _this.polls = transPoll;
            return transPoll;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    PollService.prototype.getMyPoll = function (id) {
        var _this = this;
        return this.http.get(this.url + '/polls/mypoll?id=' + id)
            .map(function (response) {
            var tempPoll = response.json().obj;
            var myPoll = new Poll(tempPoll.title, tempPoll.options, tempPoll.creator, tempPoll._id, tempPoll.votes);
            return myPoll;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    PollService.prototype.addVote = function (index, poll) {
        var _this = this;
        var body = JSON.stringify(poll);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var token = localStorage.getItem('token')
            ? "&token=" + localStorage.getItem('token')
            : "";
        var cookie = "&cookie=" + this.cookieService.get('VoterApp');
        return this.http.patch(this.url + '/polls/vote' + '?index=' + index + token + cookie, body, { headers: headers })
            .map(function (response) {
            var tempPoll = response.json().obj;
            var myPoll = new Poll(tempPoll.title, tempPoll.options, tempPoll.creator, tempPoll._id, tempPoll.votes);
            return myPoll;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    PollService.prototype.addCustom = function (custom, poll) {
        var _this = this;
        var body = JSON.stringify(poll);
        var headers = new Headers({ 'Content-Type': 'application/json' });
        var token = localStorage.getItem('token')
            ? "?token=" + localStorage.getItem('token')
            : "";
        var cookie = "&cookie=" + this.cookieService.get('VoterApp');
        return this.http.post(this.url + '/polls/custom' + '?custom=' + custom + token + cookie, body, { headers: headers })
            .map(function (response) {
            var tempPoll = response.json().obj;
            var myPoll = new Poll(tempPoll.title, tempPoll.options, tempPoll.creator, tempPoll._id, tempPoll.votes);
            return myPoll;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    PollService.prototype.deletePoll = function (poll) {
        var _this = this;
        var id = poll.pollid;
        var token = localStorage.getItem('token') ? "?token=" + localStorage.getItem('token') : '';
        return this.http.delete(this.url + '/polls/' + id + token)
            .map(function (response) { return response.json().obj; })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    PollService.prototype.getAllPolls = function () {
        var _this = this;
        return this.http.get(this.url + '/polls')
            .map(function (response) {
            var polls = response.json().obj;
            var transPoll = [];
            for (var _i = 0, polls_2 = polls; _i < polls_2.length; _i++) {
                var poll = polls_2[_i];
                transPoll.push(new Poll(poll.title, poll.options, poll.creator, poll._id));
            }
            return transPoll;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    return PollService;
}());
PollService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http, ErrorService, CookieService])
], PollService);
export { PollService };
