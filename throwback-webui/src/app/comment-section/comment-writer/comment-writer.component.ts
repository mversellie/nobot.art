import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CommentService} from "../../services/comment.service";

@Component({
  selector: 'app-comment-writer',
  standalone: true,
  imports: [
    FormsModule
  ],
  template: `<div class="vstack">
                <div class="form-group">
                  <textarea [(ngModel)]="commentDraft" class="form-control" id="commentDraft" rows="3"></textarea>
                </div>
                <div class="d-flex flex-row-reverse"><button id="submit-button" type="button" class="btn btn-primary" (click)="onSubmit()">Post</button>
                </div></div>`,
  styleUrl: './comment-writer.component.css'
})
export class CommentWriterComponent {
  @Output() aNewCommentFromEditor = new EventEmitter<string>();
  @Input() threadName:string;
  commentDraft:string = "Enter comment";

  onSubmit(){
    this.aNewCommentFromEditor.emit(this.commentDraft)
  }


}
