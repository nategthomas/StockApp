import {Component, OnInit} from "@angular/core";

import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import {Poll} from "./poll.model";
import {PollService} from "./poll.service";

@Component({
  selector: 'app-newpolls',
  templateUrl: './newpolls.component.html',
  styles: [`

    `]
})

export class NewpollsComponent {
  constructor(private pollService: PollService) {}

pollForm = new FormGroup({
  title: new FormControl(),
  options: new FormArray([
    new FormControl()
  ])
});



  get options(): FormArray { return this.pollForm.get('options') as FormArray}

  onAddOption() {
    this.options.push(
      new FormControl()
    )
  }


  onSubmit() {
    const poll = new Poll(
      this.pollForm.value.title,
      this.pollForm.value.options
    )
    this.pollService.makePoll(poll)
    .subscribe(data => console.log(data)
    )
  }


}
