import {Component, OnInit, OnDestroy, ViewChild} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Poll} from "../newpolls/poll.model";
import {PollService} from "../newpolls/poll.service";
import { ChartModule } from 'angular2-chartjs';
import {Subscription} from "rxjs/Subscription";
import {ChartComponent} from 'angular2-chartjs';

import {ErrorService} from "../errors/error.service";

@Component({
  selector: 'app-mypolls',
  templateUrl: './mypolls.component.html',
  styleUrls: ['./mypolls.component.css']
})


export class MypollsComponent implements OnInit {

  constructor(private pollService: PollService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private errorService: ErrorService ) {
    activatedRoute.queryParams.subscribe((params: Params) => {
      this.id = params['data'];
      this.userid = params['userid'];
    })
  }
  @ViewChild(ChartComponent) chartComponent: ChartComponent;
  subscription: Subscription;
  polls: Poll[];
  poll: Poll;
  id: string;
  userid: string;
  customTrue: boolean = false;

  type = 'doughnut';
  data = {
    labels: [],
    datasets: [{
      label: 'Nate pie',
      data: [],
      backgroundColor: [
        'rgb(66,152,181)',
        'rgb(173,196,204)',
        'rgb(146,176,106)',
        'rgb(225,157,41)',
        'rgb(221,95,50)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',

      ],
      borderColor: [
        'rgb(255,255,255)',
        'rgb(255,255,255)',
        'rgb(255,255,255)',
        'rgb(255,255,255)',
        'rgb(255,255,255)',
        'rgb(255,255,255)',
        'rgb(255,255,255)',
        'rgb(255,255,255)'
      ],
      borderWidth: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3]
    }]
  };
  options = {
    responsive: true,
    maintainAspectRatio: false
  };


  ngOnInit() {
    this.pollService.getMyPoll(this.id)
    .subscribe((poll: Poll) => {
      this.poll = poll;
      this.data.labels = poll.options;
      this.data.datasets[0].data = poll.votes;
      this.chartComponent.chart.update();
    })

  }

  onclick(defaults, custom) {
    if ((defaults !== "Make a custom option") && (defaults !== "")) {
      var index = this.poll.options.indexOf(defaults);
      this.pollService.addVote(index, this.poll)
      .subscribe((vote: Poll) => {
        this.poll = vote;
        this.data.datasets[0].data = vote.votes;
        this.data.labels = vote.options;
        this.chartComponent.chart.update();
      })
    }
    else if ((defaults === "Make a custom option") &&  (custom !== "" ))  {
        this.pollService.addCustom(custom, this.poll)
        .subscribe((vote: Poll) => {
          this.poll = vote;
          this.data.datasets[0].data = vote.votes;
          this.data.labels = vote.options;
          this.chartComponent.chart.update();
        })
    }
    else if ( (defaults === "") || (custom === "") ) {
      this.errorService.handleError({title: "No Option Selected",
                                    error: {message: "You must select an option"} }
                                   )
    }

  }

  Creator() {
    return (localStorage.getItem('userID') === this.userid)
  }

  onDelete() {
    this.pollService.deletePoll(this.poll)
    .subscribe(deleted => console.log(deleted));
    this.router.navigateByUrl('/allmypolls');
  }

  addCustom(selected) {
    if (selected === "Make a custom option") {
      this.customTrue = true;
    }
  }

  getCustomTrue() {
    return this.customTrue;
  }

}
