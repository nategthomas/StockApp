import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs";
import {Params} from "@angular/router";

@Injectable()
export class TwitterService {
  constructor(private http: Http) {}



  signIn() {
    window.location.href = "http://localhost:3000/twitter/login"
  }



  onLogout() {
    localStorage.clear();
  }

  loggedIn() {
    return localStorage.getItem('user') !== null;
  }

}
//window.location.href ="http://localhost:3000/twitter/login"
