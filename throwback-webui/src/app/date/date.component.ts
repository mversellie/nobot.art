import {Component, Input, input} from '@angular/core';

@Component({
  selector: 'app-date',
  standalone: true,
  imports: [],
  template: '<div>{{formatDate(dateInput)}}</div>>'
})
export class DateComponent {
  @Input() dateInput:Date ;

  formatDate(dateInput:Date){
    return dateInput.toLocaleString('en-US');
  }
}
