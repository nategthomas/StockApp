import {Component, OnInit, OnDestroy, ViewChild} from "@angular/core";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Poll} from "../newpolls/poll.model";
import {PollService} from "../newpolls/poll.service";
import { ChartModule } from 'angular2-chartjs';
import {Subscription} from "rxjs/Subscription";
import {ChartComponent} from 'angular2-chartjs';

@Component({
  selector: 'app-mypolls',
  templateUrl: './mypolls.component.html',
  styleUrls: ['./mypolls.component.css']
})


export class MypollsComponent implements OnInit {
  @ViewChild(ChartComponent) chartComponent: ChartComponent;
  subscription: Subscription;
  polls: Poll[];
  poll: Poll;
  id: string;

  type = 'doughnut';
  data = {
    labels: [],
    datasets: [{
      label: 'Nate pie',
      data: [],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)'
      ],
      borderWidth: [1,1,1]
    }]
  };
  options = {
    responsive: true,
    maintainAspectRatio: false
  };


  constructor(private pollService: PollService, private activatedRoute: ActivatedRoute, private router: Router ) {
    activatedRoute.queryParams.subscribe((params: Params) => {
      this.id = params['data'];
    })
  }

  ngOnInit() {
    this.pollService.getMyPoll(this.id)
    .subscribe((poll: Poll) => {
      this.poll = poll;
      this.data.labels = poll.options;
      this.data.datasets[0].data = poll.votes;
      this.chartComponent.chart.update();
    })

  }

  onclick(selected) {
    var index = this.poll.options.indexOf(selected);
    this.pollService.addVote(index, this.poll)
    .subscribe((vote: Poll) => {
      console.log(vote);
      this.poll = vote;
      this.data.datasets[0].data = vote.votes;
      this.data.labels = vote.options;
      this.chartComponent.chart.update();
    })
  }

  onDelete() {
    this.pollService.deletePoll(this.poll)
    .subscribe(deleted => console.log(deleted));
    this.router.navigateByUrl('/allmypolls');
  }

}
