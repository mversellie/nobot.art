import {Component, OnInit} from '@angular/core';
import {ChatBoxComponent} from "./chat-box/chat-box.component";
import {ChatSidebarComponent} from "./chat-sidebar/chat-sidebar.component";
import {PrivateMessageService} from "./private-message.service";

@Component({
    templateUrl: './private-message-page.component.html',
    imports: [
        ChatBoxComponent,
        ChatSidebarComponent
    ],
    standalone: true
})
export class PrivateMessagePageComponent {

    constructor(protected messageService:PrivateMessageService) {
    }

    loadMessage(index:number){
        this.messageService.loadMessage(index)
    }
}
