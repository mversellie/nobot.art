import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NobotComment} from "./CommentPojo";
import {SingleCommentComponent} from "./single-comment/single-comment.component";
import {CommentWriterComponent} from "./comment-writer/comment-writer.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [
    SingleCommentComponent,
    CommentWriterComponent,
    NgForOf
  ],
  template: `<div><div class="my-5" *ngFor="let aComment of comments"> 
                <app-single-comment [comment]="aComment"/>
                <hr/>
                </div><app-comment-writer (aNewCommentFromEditor)="signalWriteNewComment($event)" [threadName]="threadName"/></div>`,
  styleUrl: './comment-section.component.css'
})
export class CommentSectionComponent {
  @Input() comments : NobotComment[];
  @Input() threadName: string;
  @Output() writeNewComment = new EventEmitter<string>();

  signalWriteNewComment(input:string){
    this.writeNewComment.emit(input)
  }

}
