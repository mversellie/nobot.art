import {Component, OnInit} from '@angular/core';
import {PmWindowComponent} from "./pm-window/pm-window.component";
import {PmSidebarComponent} from "./pm-sidebar/pm-sidebar.component";
import {PrivateMessageService} from "./private-message.service";

@Component({
    templateUrl: './private-message-page.component.html',
    imports: [
        PmWindowComponent,
        PmSidebarComponent
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
