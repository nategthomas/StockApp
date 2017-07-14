import {Component, OnInit} from "@angular/core";

import {Poll} from "./poll.model";
import {PollService} from "./poll.service";
import {Subscription} from "rxjs/Subscription";


@Component({
  selector: 'app-test',
  template: `
   {{poll?.title}}
  `,
  styles: [`

    `]
})

export class TestComponent {
  constructor(private pollService: PollService) {
    this. subscription = this.pollService.getClickedPoll().subscribe(
      (poll: Poll) => {
        this.poll = poll;
        console.log(this.poll);
      })
  }

  poll: Poll;
  subscription: Subscription;



}
