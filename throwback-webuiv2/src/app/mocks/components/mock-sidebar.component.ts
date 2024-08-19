import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  template: '<div></div>',
})
export class MockSidebarComponent {
  @Input() username:string
}
