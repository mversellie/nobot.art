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
export class GalleryComponent implements OnChanges {
  galleryAsRows:Array<Array<ContentResponse>> = [];
  @Input() galleryData:Array<ContentResponse> = [];
  @Input() itemsPerRow = 4;
  @Input() page:number = 1
  @Input() pageSize:number = 20

  ngOnChanges(changes: SimpleChanges) {
    this.rowifyContent(this.galleryData,this.itemsPerRow)}


  rowifyContent = (content:Array<ContentResponse>, itemsInRow:number) => {
    let mainCount = 0;
    this.galleryAsRows = [];
    while (mainCount < content.length){
      let theCurrentRow:Array<ContentResponse> = [];
      let rowCount = 0
      while ((mainCount < content.length) && (rowCount < itemsInRow)){
        theCurrentRow.push(content[mainCount]);
        rowCount++;
        mainCount++;
      }
      this.galleryAsRows.push(theCurrentRow);
    }
  }
}
