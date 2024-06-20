import {Component, Input} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-gallery-chip',
  standalone: true,
  imports: [ RouterLink
  ],
  templateUrl: './gallery-chip.component.html',
  styleUrl: './gallery-chip.component.css'
})
export class GalleryChipComponent {
  @Input() title:string;
  @Input() file:string;
  @Input() creator:string;
  @Input() url_safe_title:string;


  constructor(private router:Router) {
  }

  goToContent(){
    return "/" + this.creator + "/" + this.url_safe_title;
  }

  getThumbnailLink(){
    return environment["S3-URL"] + this.file;
  }
}
