import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-date',
  template: '<div></div>',
  standalone:true
})
export class MockDateComponent {
  @Input() dateInput :string;
}
