import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Comment} from "../CommentPojo";
import {AvatarComponent} from "../../avatar/avatar.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-single-comment',
  standalone: true,
  imports: [
    AvatarComponent,
    RouterLink
  ],
  templateUrl: './single-comment.component.html',
  styleUrl: './single-comment.component.css'
})
export class SingleCommentComponent implements OnChanges,OnInit{
  @Input() comment:Comment

  ngOnChanges() {
    console.log("in comp: " + this.comment)
  }

  ngOnInit(){
    console.log("in comp: " + this.comment)
  }
}
