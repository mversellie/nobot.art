import {Component, Input} from '@angular/core';
import {ContentService} from "../services/content.service";
import {ActivatedRoute, ParamMap} from "@angular/router";
import {of} from "rxjs";
import {ContentResponse} from "../objects/ContentResponse";
import {GalleryComponent} from "../gallery/gallery.component";

@Component({
  selector: 'app-user-gallery',
  standalone: true,
  imports: [
    GalleryComponent
  ],
  templateUrl: './user-gallery.component.html',
  styleUrl: './user-gallery.component.css'
})
export class UserGalleryComponent {
  paramMapObs:ParamMap | null = null ;
  parentGalleryData:Array<ContentResponse>
  page:number = 1
  pageSize:number = 20
  constructor(private contentService:ContentService,private route:ActivatedRoute){
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
          .subscribe((contents) => this.parentGalleryData = contents)
    }
  }


}
