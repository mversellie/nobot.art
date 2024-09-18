import {Component} from '@angular/core';
import {ActivatedRoute, Params, RouterLink} from "@angular/router";
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
import {of} from "rxjs";
import {AvatarComponent} from "../avatar/avatar.component";
import {DiscourseHtmlScrubberComponent} from "../discourse-html-scrubber/discourse-html-scrubber.component";
import {environment} from "../../environments/environment";
import {LikeButtonComponent} from "../like-button/like-button.component";
import {ImageChipComponent} from "../image-collection/image-chip/image-chip.component";
import {TagModule} from "primeng/tag";
import {ContentService} from "../services/content.service";

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
        DiscourseHtmlScrubberComponent,
        LikeButtonComponent,
        ImageChipComponent,
        TagModule,
    ],
    templateUrl: './content-page.component.html'
})
export class ContentPageComponent{

    title:string = "aTitle"
    description:string = "this is a really really long description"
    username:string = "username"
    isLiked:boolean = false

    params:Params = {};
    imageUrl:string = ""
    threadName:string = "";
    viewCount:number = 0
    comments:NobotComment[] = []
    contentName:string;

    contentData : ContentResponse;

    constructor(private contentService:ContentService,private commentService:CommentService,private route:ActivatedRoute) {
        this.contentData =  new ContentResponse("","", "", new Date(),"","");

        this.route.params.subscribe( (data) => {
            this.params = data;
        });

        this.route.data.subscribe( ({content}) => {
            this.contentData = content;
            this.imageUrl= environment["S3-URL"] + "/" + content.filename
            this.username = content.creator
            if(typeof content.userMeta !== 'undefined') {
                this.isLiked = content.userMeta.viewer_status == 1
                this.viewCount = content.userMeta.view_count
            }
        });

        of(this.params).subscribe( (map:Params ) => {
            let contentUsername = "";
            if(map != null){
                if(map["contentUsername"] !== null){
                    contentUsername = map["contentUsername"];
                    this.username = contentUsername
                }

                if(map["contentName"] !== null){
                    this.contentName = map["contentName"];
                }
                this.threadName= contentUsername + "/" + this.contentName
                commentService.getContentComments(this.threadName).subscribe((data:any) => {
                    this.comments = data["comments"]
                })
            }
        })
    }

    submitNewComment(comment:string,threadName:string){
        this.commentService.shipContentComment(comment,threadName).subscribe((out) =>
        {console.log(out);
            location.reload()})
    }

    likeOrUnlike(){
        this.contentService.likeOrUnlike(!this.isLiked,this.username,this.contentName).subscribe((data)=>
        { // @ts-ignore
            this.isLiked= data["isLiked"]})
    }

}
