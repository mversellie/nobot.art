import {Component, Input} from '@angular/core';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-discourse-html-scrubber',
  standalone: true,
  imports: [],
  template: '<span [innerHTML]="sanitize(scrub)"></span>'
})
export class DiscourseHtmlScrubberComponent {
  @Input() scrub:String

  constructor(protected sanitizer: DomSanitizer) {}

  public sanitize(value: any): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
