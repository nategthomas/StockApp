var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { Poll } from "../newpolls/poll.model";
import { PollService } from "../newpolls/poll.service";
var SinglePoll = (function () {
    function SinglePoll(pollService) {
        this.pollService = pollService;
    }
    SinglePoll.prototype.onClick = function () {
        this.pollService.clickedPoll(this.poll);
    };
    return SinglePoll;
}());
__decorate([
    Input(),
    __metadata("design:type", Poll)
], SinglePoll.prototype, "poll", void 0);
SinglePoll = __decorate([
    Component({
        selector: 'app-singlepoll',
        templateUrl: './singlepoll.component.html',
        styles: ["\n    .well {\n      background-color:  white;\n    }\n    .titular {\n      text-align: center;\n      font-size: 1.25em;\n      color: #42ab9e;\n    }\n    .titular:hover {\n      cursor: pointer;\n    }\n    "]
    }),
    __metadata("design:paramtypes", [PollService])
], SinglePoll);
export { SinglePoll };
