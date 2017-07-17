var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { PollService } from "../newpolls/poll.service";
var AllmypollsComponent = (function () {
    function AllmypollsComponent(pollService, router) {
        this.pollService = pollService;
        this.router = router;
    }
    AllmypollsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.pollService.getmyPolls()
            .subscribe(function (polls) {
            _this.polls = polls;
        });
    };
    AllmypollsComponent.prototype.onClic = function (poll) {
        this.router.navigate(['/mypolls'], { queryParams: { data: poll.pollid, userid: poll.user } });
    };
    return AllmypollsComponent;
}());
AllmypollsComponent = __decorate([
    Component({
        selector: 'app-allmypolls',
        templateUrl: './allmypolls.component.html',
        styles: ["\n    .contain {\n      background-color:  #f8f8f8;\n      padding: 20px 10px 20px 10px;\n      border-radius: 5px;\n\n    }\n    h1, h3 {\n      text-align: center;\n    }\n    "]
    }),
    __metadata("design:paramtypes", [PollService, Router])
], AllmypollsComponent);
export { AllmypollsComponent };
