import { Component, Input, Output } from '@angular/core';

import {Poll} from "../newpolls/poll.model";
import {PollService} from "../newpolls/poll.service";


@Component({
  selector: 'app-singlepoll',
  templateUrl: './singlepoll.component.html',
  styles: [`
    .well {
      background-color:  white;
    }
    .titular {
      text-align: center;
      font-size: 1.25em;
      color: #42ab9e;
    }
    .titular:hover {
      cursor: pointer;
      background-color: #e7e7e7;
    }
    `]
})

export class SinglePoll {
  @Input() poll: Poll;

  constructor(private pollService: PollService){}


  onClick() {
    this.pollService.clickedPoll(this.poll);
  }



}
