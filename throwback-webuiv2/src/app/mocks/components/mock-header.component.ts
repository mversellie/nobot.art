import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  template: '<div></div>',
})
export class MockHeaderComponent {
  @Input() username:string;
}
