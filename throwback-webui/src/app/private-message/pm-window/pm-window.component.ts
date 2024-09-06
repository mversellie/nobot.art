import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { PrivateMessageService } from '../private-message.service';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {OverlayPanelModule} from "primeng/overlaypanel";
import {NgForOf} from "@angular/common";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {InputTextModule} from "primeng/inputtext";
import {PrivateMessageChoiceData} from "../private-message-choice-data";
import {DiscourseHtmlScrubberComponent} from "../../discourse-html-scrubber/discourse-html-scrubber.component";
import {AvatarComponent} from "../../avatar/avatar.component";
import {InputTextareaModule} from "primeng/inputtextarea";

@Component({
    selector: 'app-pm-window',
    templateUrl: './pm-window.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        FormsModule,
        OverlayPanelModule,
        NgForOf,
        ButtonModule,
        RippleModule,
        InputTextModule,
        DiscourseHtmlScrubberComponent,
        AvatarComponent,
        ReactiveFormsModule,
        InputTextareaModule
    ],
    standalone: true
})
export class PmWindowComponent {

    privateMessageForm:FormGroup ;

    @Input() thread:PrivateMessageChoiceData

    constructor(private pmService:PrivateMessageService) {
        this.privateMessageForm = new FormGroup({
            content:new FormControl(),
        });
    }

    sendMessage(){
        this.pmService.reply(this.privateMessageForm.get("content")?.value);
    }
}
