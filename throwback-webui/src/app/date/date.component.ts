import {Component, Input, input} from '@angular/core';

@Component({
  selector: 'app-date',
  standalone: true,
  imports: [],
  template: '<div>{{formatDate(dateInput)}}</div>'
})
export class DateComponent {
  @Input() dateInput:string ;
  day:string;
  month:string;
  year:string
  timeString:string

  formatDate(dateInput:string){
    const dashSplit = dateInput.split("-")
    this.year = dashSplit[0];
    this.month = dashSplit[1];
    const dayAndTime = dashSplit[2]
    const dayAndTimeSplit = dayAndTime.split("T")
    this.day = dayAndTimeSplit[0]
    const timeSplit = dayAndTimeSplit[1].split(":")
    this.timeString = `${timeSplit[0]}:${timeSplit[1]}`
    return `${this.month}/${this.day}/${this.year} - ${this.timeString}`
  }
}
