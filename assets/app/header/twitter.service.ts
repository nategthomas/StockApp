import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs";
import {Params} from "@angular/router";

@Injectable()
export class TwitterService {
  constructor(private http: Http) {}

  private url: string = 'https://voter-app1.herokuapp.com';
  private url1: string = 'http://localhost:3000';

  signIn() {
    window.location.href = this.url + "/twitter/login";
  }



  onLogout() {
    localStorage.clear();
  }

  loggedIn() {
    return localStorage.getItem('user') !== null;
  }

}
