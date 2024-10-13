import {Component, Input, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {ImageChipComponent} from "../image-chip/image-chip.component";

@Component({
  selector: 'app-image-scroller',
  standalone: true,
  imports: [
    NgForOf,
    ImageChipComponent
  ],
  templateUrl: './image-scroller.component.html',
  styleUrl: './image-scroller.component.scss'
})
export class ImageScrollerComponent{
  @Input() images:any;
  @Input() views:number;
  @Input() likes:number
  @Input() showCreator:boolean


  getViews(image:any){
    return this.doesMetaExist(image) ? image.userMeta.view_count: 1
  }

  getLikes(image:any){
    return this.doesMetaExist(image) ? image.userMeta.like_count: 0
  }

  doesMetaExist(image:any){
    return typeof image.userMeta !== "undefined"
  }



}
