import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {NobotComment} from "../CommentPojo";
import {AvatarComponent} from "../../avatar/avatar.component";
import {RouterLink} from "@angular/router";
import {DateComponent} from "../../date/date.component";

@Component({
  selector: 'app-single-comment',
  standalone: true,
  imports: [
    AvatarComponent,
    RouterLink,
    DateComponent
  ],
  templateUrl: './single-comment.component.html',
  styleUrl: './single-comment.component.css'
})
export class SingleCommentComponent{
  @Input() comment:NobotComment
  @ViewChild("avatar") avatar:AvatarComponent;
  @ViewChild("dateCreated") dateChild:DateComponent;
}
