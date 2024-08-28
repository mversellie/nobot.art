import {Component, Input, Output} from '@angular/core';
import {PmCardComponent} from ".././pm-card/pm-card.component";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {PrivateMessageChoiceData} from "../private-message-choice-data";
import {PrivateMessageService} from "../private-message.service";

@Component({
    selector: 'app-chat-sidebar',
    templateUrl: './chat-sidebar.component.html',
    imports: [
        PmCardComponent,
        FormsModule,
        NgForOf
    ],
    standalone: true
})
export class ChatSidebarComponent {
    @Input() privateMessageChoices:PrivateMessageChoiceData[]

    constructor(private privateMessageService:PrivateMessageService) {
    }
}
