var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PollService } from "../newpolls/poll.service";
import { ChartComponent } from 'angular2-chartjs';
import { ErrorService } from "../errors/error.service";
var MypollsComponent = (function () {
    function MypollsComponent(pollService, activatedRoute, router, errorService) {
        var _this = this;
        this.pollService = pollService;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.errorService = errorService;
        this.customTrue = false;
        this.type = 'doughnut';
        this.data = {
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
        this.options = {
            responsive: true,
            maintainAspectRatio: false
        };
        activatedRoute.queryParams.subscribe(function (params) {
            _this.id = params['data'];
            _this.userid = params['userid'];
        });
    }
    MypollsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pollService.getMyPoll(this.id)
            .subscribe(function (poll) {
            _this.poll = poll;
            _this.data.labels = poll.options;
            _this.data.datasets[0].data = poll.votes;
            _this.chartComponent.chart.update();
        });
    };
    MypollsComponent.prototype.onclick = function (defaults, custom) {
        var _this = this;
        if ((defaults !== "Make a custom option") && (defaults !== "")) {
            var index = this.poll.options.indexOf(defaults);
            this.pollService.addVote(index, this.poll)
                .subscribe(function (vote) {
                _this.poll = vote;
                _this.data.datasets[0].data = vote.votes;
                _this.data.labels = vote.options;
                _this.chartComponent.chart.update();
            });
        }
        else if ((defaults === "Make a custom option") && (custom !== "")) {
            this.pollService.addCustom(custom, this.poll)
                .subscribe(function (vote) {
                _this.poll = vote;
                _this.data.datasets[0].data = vote.votes;
                _this.data.labels = vote.options;
                _this.chartComponent.chart.update();
            });
        }
        else if ((defaults === "") || (custom === "")) {
            this.errorService.handleError({ title: "No Option Selected",
                error: { message: "You must select an option" } });
        }
    };
    MypollsComponent.prototype.Creator = function () {
        return (localStorage.getItem('userID') === this.userid);
    };
    MypollsComponent.prototype.onDelete = function () {
        this.pollService.deletePoll(this.poll)
            .subscribe(function (deleted) { return console.log(deleted); });
        this.router.navigateByUrl('/allmypolls');
    };
    MypollsComponent.prototype.addCustom = function (selected) {
        if (selected === "Make a custom option") {
            this.customTrue = true;
        }
    };
    MypollsComponent.prototype.getCustomTrue = function () {
        return this.customTrue;
    };
    return MypollsComponent;
}());
__decorate([
    ViewChild(ChartComponent),
    __metadata("design:type", ChartComponent)
], MypollsComponent.prototype, "chartComponent", void 0);
MypollsComponent = __decorate([
    Component({
        selector: 'app-mypolls',
        templateUrl: './mypolls.component.html',
        styleUrls: ['./mypolls.component.css']
    }),
    __metadata("design:paramtypes", [PollService,
        ActivatedRoute,
        Router,
        ErrorService])
], MypollsComponent);
export { MypollsComponent };
