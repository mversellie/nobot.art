import { Component } from '@angular/core';
import {ActivatedRoute, ParamMap, RouterLink} from "@angular/router";
import {ContentResponse} from "../objects/ContentResponse";
import {ContentService} from "../services/content.service";
import {of} from "rxjs";
import {NgForOf} from "@angular/common";
import {GalleryChipComponent} from "./gallery-chip/gallery-chip.component";

@Component({
  selector: 'app-gallery-page',
  standalone: true,
  imports: [
    NgForOf,
    GalleryChipComponent,
      RouterLink
  ],
  templateUrl: './gallery-page.component.html',
  styleUrl: './gallery-page.component.css'
})
export class GalleryPageComponent {
  paramMapObs:ParamMap | null = null ;
  galleryAsRows:Array<Array<ContentResponse>> = [];
  galleryData:Array<ContentResponse> = [];
  defaulttemsPerRow = 4;
  page:number = 1
  pageSize:number = 20

  constructor(private contentService:ContentService,private route:ActivatedRoute) {
    this.route.paramMap.subscribe( (data) => {this.paramMapObs = data;});
    of(this.paramMapObs).subscribe((map:ParamMap| null) => this.paramMapObsFunction(map))
  }

  paramMapObsFunction = (map:ParamMap| null) => {
    if (map != null) {
      const page = map.get("page")
      this.page = Number(page)
      const username = map.get("contentUsername")
      const page_size = map.get("page_size")
      this.pageSize = Number(page_size)
      // @ts-ignore
      this.contentService.getGalleryForUser(username,page,page_size)
          .subscribe((contents) => this.processContent(contents))
    }
  }

  processContent = (content:any) => {
    this.galleryData = content
    this.rowifyContent(this.galleryData,this.defaulttemsPerRow)
  }

  rowifyContent = (content:Array<ContentResponse>, itemsInRow:number) => {
    let mainCount = 0
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
