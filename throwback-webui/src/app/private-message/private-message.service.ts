import {Injectable, signal, WritableSignal} from '@angular/core';
import {PrivateMessageChoiceData, PrivateMessageReply} from "./private-message-choice-data";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {UserService} from "../services/user.service";

@Injectable(
    {
        providedIn:"root"
    }
)
export class PrivateMessageService {
    currentMessageChoice:WritableSignal<number> = signal(0)
    messages:WritableSignal<PrivateMessageChoiceData[]> = signal([])

    endpoint:string = environment["api-url"] + "/private-messages"

    constructor(protected http:HttpClient,protected userService:UserService) {
        // @ts-ignore
        http.get(this.endpoint).subscribe((data) => {
            // @ts-ignore
            let privateMessages:PrivateMessageChoiceData[] = data.privateMessages
            this.messages.set(privateMessages);
            if (privateMessages.length > 0){
                this.loadMessage(0)
            }})
    }

    loadMessage(messageIndex:number){
        // @ts-ignore
        this.http.get(this.endpoint + "/" + this.messages()[messageIndex].id.toString()).subscribe((data) => {
            const tempMessages: PrivateMessageChoiceData[] = this.messages();
            // @ts-ignore
            tempMessages[messageIndex].replies = data["replies"];
            this.messages.set(tempMessages)
            this.currentMessageChoice.set(messageIndex)
        })
    }

    reply(content:string){
        const messageIndex = this.currentMessageChoice();
        // @ts-ignore
        this.http.post(this.endpoint + "/" + this.messages()[messageIndex].id.toString(),{"content":content})
            .subscribe((data) => {
                let tempMessages: PrivateMessageChoiceData[] = this.messages();
                // @ts-ignore
                tempMessages[messageIndex].replies.push(this.makeTempReplyForGui(content))
                this.messages.set(tempMessages)
        })
    }

    makeTempReplyForGui(content:string){
        let nextReply=new PrivateMessageReply();
        nextReply.username = this.userService.username()
        nextReply.content = content;
        nextReply.date = "a time";
        return nextReply
    }

}
