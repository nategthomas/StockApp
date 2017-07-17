import {Component, OnInit} from "@angular/core";

import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import {Poll} from "./poll.model";
import {PollService} from "./poll.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-newpolls',
  templateUrl: './newpolls.component.html',
  styles: [`
    .contain {
      background-color: #f8f8f8;
      padding: 20px 10px 20px 10px;
      border-radius: 5px;

    }
    h1 {
      margin-bottom: 25px;
    }
    .add {
      background-color: #42ab9e;
      border-color: #42ab9e;
    }

    `]
})

export class NewpollsComponent {
  constructor(private pollService: PollService, private router: Router) {}

pollForm = new FormGroup({
  title: new FormControl(null, Validators.required),
  options: new FormArray([
    new FormControl(null, Validators.required)
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
      this.pollForm.value.options,
      undefined,
      undefined
    )
    this.pollService.makePoll(poll)
    .subscribe(data => {
      console.log(data);
      this.router.navigate(['/mypolls'], { queryParams: {data: data._id, userid: data.creator._id} })

    }
    )
  }


}
