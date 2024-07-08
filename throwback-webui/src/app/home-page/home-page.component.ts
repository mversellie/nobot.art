import { Component } from '@angular/core';
import {ActivatedRoute, ParamMap, Params} from "@angular/router";
import {ContentResponse} from "../objects/ContentResponse";
import {ContentService} from "../services/content.service";
import {of} from "rxjs";
import {GalleryComponent} from "../gallery/gallery.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    GalleryComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  paramMapObs:Params ;
  parentGalleryData:Array<ContentResponse>
  page:number = 1
  pageSize:number = 20
  constructor(private contentService:ContentService,private route:ActivatedRoute){
    this.route.params.subscribe( (data) => {this.paramMapObs = data;});
    of(this.paramMapObs).subscribe((map:Params) => this.paramMapObsFunction(map))
  }

  paramMapObsFunction = (map:Params) => {
    if (map != null) {
      const page = map["page"]
      this.page = Number(page)
      const page_size = map["page_size"]
      this.pageSize = Number(page_size)
      this.contentService.getLatest(page,page_size)
          .subscribe((data) =>
          {this.parentGalleryData = data})
    }
  }
}
