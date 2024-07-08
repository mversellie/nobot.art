import {Component} from '@angular/core';
import {ActivatedRoute, ParamMap, Params, Router} from "@angular/router";
import {ContentService} from "../services/content.service";
import {ContentResponse} from "../objects/ContentResponse";
import {from, of} from "rxjs";
import {CommentSectionComponent} from "../comment-section/comment-section.component";
import {CommentService} from "../services/comment.service";
import {NobotComment} from "../comment-section/CommentPojo";
import {AvatarComponent} from "../avatar/avatar.component";

@Component({
  selector: 'app-content-page',
  standalone: true,
  imports: [
    CommentSectionComponent,
    AvatarComponent
  ],
  templateUrl: './content-page.component.html',
  styleUrl: './content-page.component.css'
})
export class ContentPageComponent {

  params:Params = {};
  imageUrl:string = ""
  threadName:string = "";
  comments:NobotComment[]

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
