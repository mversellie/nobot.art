import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf} from "@angular/common";
import {formatArtDate} from "../services/ArtDateFormatter";
import {RouterLink} from "@angular/router";
import {ButtonModule} from "primeng/button";
import {EditorModule} from "primeng/editor";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NobotComment} from "../objects/CommentPojo";
import {environment} from "../../environments/environment";
import {InputTextareaModule} from "primeng/inputtextarea";

@Component({
    selector: 'app-comments',
    standalone: true,
    imports: [
        NgForOf,
        RouterLink,
        RouterLink,
        ButtonModule,
        EditorModule,
        ReactiveFormsModule,
        InputTextareaModule,
        FormsModule
    ],
    templateUrl: './comment-section.component.html'
})
export class CommentSectionComponent {

    @Input() comments : NobotComment[] = [];
    // @ts-ignore
    @Input() threadName: string;
    @Output() writeNewComment = new EventEmitter<string>();
    draftedComment:string = ""

    signalWriteNewComment(){
        this.writeNewComment.emit(this.draftedComment)
    }

    getImgLink(username:string){
        let imgLink = "/img/default-avatar.png" ;
        if(username != null) {
            imgLink = environment["S3-URL"] + "pfp-" + username + ".png"
        }
        return imgLink
    }

    rowCount = 3;

    protected readonly formatArtDate = formatArtDate;
}
