import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NobotComment} from "../../comment-section/CommentPojo";

@Component({
  selector: 'app-comment-section',
  standalone: true,
  template: '<div></div>'
})
export class MockCommentSectionComponent {
  @Input() comments : NobotComment[];
  @Input() threadName: string;
  @Output() writeNewComment = new EventEmitter<string>();
}
