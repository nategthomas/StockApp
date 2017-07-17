import {Injectable, EventEmitter} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import 'rxjs/Rx';
import {Observable} from "rxjs";
import {Subject} from "rxjs/Subject";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {Params} from "@angular/router";

import {Poll} from "./poll.model";
import {ErrorService} from "../errors/error.service";

@Injectable()
export class PollService {
  private polls: Poll[] = [];

  constructor(private http: Http, private errorService: ErrorService) {}

  pollisClicked = new Subject<Poll>();
  private url: string = 'https://voter-app1.herokuapp.com';
  private url1: string = 'http://localhost:3000';

  clickedPoll(poll: Poll) {
    this.pollisClicked.next(poll);
  }

  getClickedPoll(): Observable<Poll> {
    return this.pollisClicked.asObservable();
  }



  makePoll(poll: Poll) {
    const body = JSON.stringify(poll);
    const headers = new Headers({'Content-Type': 'application/json'});
    const token = localStorage.getItem('token')
    ? '?token=' + localStorage.getItem('token')
    : '';
    return this.http.post(this.url + '/polls' + token, body, {headers: headers})
    .map((response: Response) => response.json().obj)
    .catch((error: Response) => {
      this.errorService.handleError(error.json());
      return Observable.throw(error.json());
    })
  }


  getmyPolls() {
    var token = localStorage.getItem('token')
    ? '?token=' + localStorage.getItem('token')
    : '';
    return this.http.get(this.url + '/polls/mypolls' + token)
    .map((response: Response) => {
      const polls = response.json().obj;
      let transPoll: Poll[] = [];
      for (let poll of polls) {
        transPoll.push(new Poll(poll.title,
                                poll.options,
                                poll.creator,
                                poll._id))
      }
      this.polls = transPoll;
      return transPoll;
    })
    .catch((error: Response) => {
      this.errorService.handleError(error.json());
      return Observable.throw(error.json());
    })
  }


  getMyPoll(id) {
    return this.http.get(this.url + '/polls/mypoll?id=' + id)
    .map((response: Response) => {
      var tempPoll = response.json().obj
      var myPoll = new Poll(tempPoll.title,
                            tempPoll.options,
                            tempPoll.creator,
                            tempPoll._id,
                            tempPoll.votes)
    return myPoll;
    })
    .catch((error: Response) => {
      this.errorService.handleError(error.json());
      return Observable.throw(error.json());
    })
  }


  addVote(index, poll) {
    const body = JSON.stringify(poll);
    const headers = new Headers({'Content-Type': 'application/json'});
    const token = localStorage.getItem('token')
    ? "?token=" + localStorage.getItem('token')
    : "";
    return this.http.patch(this.url + '/polls/vote' + token + '&index=' + index, body, {headers: headers})
    .map((response: Response) => {
      var tempPoll = response.json().obj
      var myPoll = new Poll(tempPoll.title,
                            tempPoll.options,
                            tempPoll.creator,
                            tempPoll._id,
                            tempPoll.votes)
    return myPoll;
    })
    .catch((error: Response) => {
      this.errorService.handleError(error.json());
      return Observable.throw(error.json());
    })
  }

  addCustom(custom, poll) {
    const body = JSON.stringify(poll);
    const headers = new Headers({'Content-Type': 'application/json'});
    const token = localStorage.getItem('token')
    ? "?token=" + localStorage.getItem('token')
    : "";
    return this.http.post(this.url + '/polls/custom' + token + '&custom=' + custom, body, {headers: headers})
    .map((response: Response) => {
      var tempPoll = response.json().obj
      var myPoll = new Poll(tempPoll.title,
                            tempPoll.options,
                            tempPoll.creator,
                            tempPoll._id,
                            tempPoll.votes)
    return myPoll;
    })
    .catch((error: Response) => {
      this.errorService.handleError(error.json());
      return Observable.throw(error.json());
    })
  }

  deletePoll(poll: Poll) {
    var id = poll.pollid
    const token = localStorage.getItem('token') ? "?token=" + localStorage.getItem('token') : '';
    return this.http.delete(this.url + '/polls/' + id + token)
    .map((response: Response) => response.json().obj)
    .catch((error: Response) => {
      this.errorService.handleError(error.json());
      return Observable.throw(error.json())
    })
  }

  getAllPolls() {
    return this.http.get(this.url + '/polls')
    .map((response: Response) => {
      const polls = response.json().obj;
      let transPoll: Poll[] = [];
      for (let poll of polls) {
        transPoll.push(new Poll(poll.title,
                                poll.options,
                                poll.creator,
                                poll._id))
      }
      return transPoll;
    })
    .catch((error: Response) => {
      this.errorService.handleError(error.json());
      return Observable.throw(error.json())
    })
  }

}
