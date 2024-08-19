import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-avatar',
  standalone: true,
  template: '<div></div>'
})
export class MockAvatarComponent {
  @Input() toSettings = false;
  @Input() username:string;
  @Input() circle = false;
  @Input() small = false;
}
