import {Component, OnInit, ViewChild, ElementRef} from "@angular/core";
import {Router} from "@angular/router";
import {Poll} from "../newpolls/poll.model";
import {PollService} from "../newpolls/poll.service";

@Component({
  selector: 'app-allmypolls',
  templateUrl: './allmypolls.component.html',
  styles: [`
    .contain {
      background-color:  #f8f8f8;
      padding: 20px 10px 20px 10px;
      border-radius: 5px;

    }
    h1, h3 {
      text-align: center;
    }
    `]
})


export class AllmypollsComponent implements OnInit {

  constructor(private pollService: PollService, private router: Router) {}
  polls: Poll[];
  poll: Poll;

    ngOnInit() {
      this.pollService.getmyPolls()
      .subscribe((polls: Poll[]) => {
        this.polls = polls;
      })

    }

    onClic(poll: Poll) {
      this.router.navigate(['/mypolls'], { queryParams: {data: poll.pollid, userid: poll.user} })
    }


}
