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
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Poll } from "./poll.model";
import { PollService } from "./poll.service";
import { Router } from "@angular/router";
var NewpollsComponent = (function () {
    function NewpollsComponent(pollService, router) {
        this.pollService = pollService;
        this.router = router;
        this.pollForm = new FormGroup({
            title: new FormControl(null, Validators.required),
            options: new FormArray([
                new FormControl(null, Validators.required)
            ])
        });
    }
    Object.defineProperty(NewpollsComponent.prototype, "options", {
        get: function () { return this.pollForm.get('options'); },
        enumerable: true,
        configurable: true
    });
    NewpollsComponent.prototype.onAddOption = function () {
        this.options.push(new FormControl());
    };
    NewpollsComponent.prototype.onSubmit = function () {
        var _this = this;
        var poll = new Poll(this.pollForm.value.title, this.pollForm.value.options, undefined, undefined);
        this.pollService.makePoll(poll)
            .subscribe(function (data) {
            console.log(data);
            _this.router.navigate(['/mypolls'], { queryParams: { data: data._id, userid: data.creator._id } });
        });
    };
    return NewpollsComponent;
}());
NewpollsComponent = __decorate([
    Component({
        selector: 'app-newpolls',
        templateUrl: './newpolls.component.html',
        styles: ["\n    .contain {\n      background-color: #f8f8f8;\n      padding: 20px 10px 20px 10px;\n      border-radius: 5px;\n\n    }\n    h1 {\n      margin-bottom: 25px;\n    }\n    .add {\n      background-color: #42ab9e;\n      border-color: #42ab9e;\n    }\n\n    "]
    }),
    __metadata("design:paramtypes", [PollService, Router])
], NewpollsComponent);
export { NewpollsComponent };
