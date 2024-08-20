import { Component } from '@angular/core';
import { Comment } from 'src/app/main/api/blog';
import {ActivatedRoute, Params, RouterLink, RouterModule} from "@angular/router";
import {CommentSectionComponent} from "../comment-section/comment-section.component";
import {InputTextModule} from "primeng/inputtext";
import {SidebarModule} from "primeng/sidebar";
import {BadgeModule} from "primeng/badge";
import {RadioButtonModule} from "primeng/radiobutton";
import {InputSwitchModule} from "primeng/inputswitch";
import {ButtonModule} from "primeng/button";
import {TooltipModule} from "primeng/tooltip";
import {RippleModule} from "primeng/ripple";
import {AppConfigModule} from "../layout/config/app.config.module";
import {StyleClassModule} from "primeng/styleclass";
import {CalendarModule} from "primeng/calendar";
import {CommonModule} from "@angular/common";
import {NobotComment} from "../objects/CommentPojo";
import {ContentResponse} from "../objects/ContentResponse";
import {CommentService} from "../services/comment.service";
import {ContentService} from "../services/content.service";
import {from, of} from "rxjs";
import {AvatarComponent} from "../avatar/avatar.component";

@Component({
    standalone: true,
    imports: [
        CommentSectionComponent,
        InputTextModule,
        SidebarModule,
        BadgeModule,
        RadioButtonModule,
        InputSwitchModule,
        ButtonModule,
        TooltipModule,
        RippleModule,
        AppConfigModule,
        StyleClassModule,
        CalendarModule,
        CommonModule,
        RouterLink,
        RouterLink,
        AvatarComponent,
    ],
    templateUrl: './content-page.component.html'
})
export class ContentPageComponent {

    title:string = "aTitle"
    description:string = "this is a really really long description"
    username:string = "username"

    params:Params = {};
    imageUrl:string = ""
    threadName:string = "";
    comments:NobotComment[] = []

    contentData : ContentResponse;

    constructor(private commentService:CommentService,private route:ActivatedRoute, private contentService:ContentService) {

        this.contentData =  new ContentResponse("","", "", new Date(),"","");


        this.route.params.subscribe( (data) => {
            this.params = data;
        });

        of(this.params).subscribe( (map:Params ) => {
            let contentUsername = "";
            let contentName = "";
            if(map != null){
                if(map["contentUsername"] !== null){
                    contentUsername = map["contentUsername"];
                }

                if(map["contentName"] !== null){
                    contentName = map["contentName"];
                }
                this.threadName= contentUsername + "/" + contentName
                commentService.getContentComments(this.threadName).subscribe((data:any) => {
                    this.comments = data["comments"]
                })
                from(this.contentService.getContentData(contentUsername,contentName)).subscribe(
                    (data:ContentResponse) => {
                        this.contentData = data;
                        this.imageUrl= "https://127.0.0.1:9000/main/" + data.filename
                        this.username = data.creator
                    }
                )
            }
        })
    }

    submitNewComment(comment:string,threadName:string){
        this.commentService.shipContentComment(comment,threadName).subscribe((out) =>
        {console.log(out);
            location.reload()})
    }

}
