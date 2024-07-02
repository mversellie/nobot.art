import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {RouterLink} from "@angular/router";
import {ContentResponse} from "../objects/ContentResponse";
import {NgForOf} from "@angular/common";
import {GalleryChipComponent} from "./gallery-chip/gallery-chip.component";

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [
    NgForOf,
    GalleryChipComponent,
      RouterLink
  ],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
  @Input() galleryData:Array<ContentResponse> = [];
  @Input() itemsPerRow = 4;
  @Input() page:number = 1
  @Input() pageSize:number = 20

}
