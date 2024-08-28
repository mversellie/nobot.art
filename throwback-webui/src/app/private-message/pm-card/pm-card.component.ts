import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { PrivateMessageService } from '../private-message.service';
import {NgClass, NgForOf} from "@angular/common";
import {PrivateMessageChoiceData} from "../private-message-choice-data";
import {AvatarComponent} from "../../avatar/avatar.component";

@Component({
    selector: 'app-pm-card',
    templateUrl: './pm-card.component.html',
    imports: [
        NgClass,
        NgForOf,
        AvatarComponent
    ],
    standalone: true
})
export class PmCardComponent {

    @Input() message: PrivateMessageChoiceData;
    @Input() messageIndex:number

    constructor(private privateMessageService: PrivateMessageService) { }

    select() {
       // @ts-ignore
        this.privateMessageService.loadMessage(this.messageIndex)
    }
}
