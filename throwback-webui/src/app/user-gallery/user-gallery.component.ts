import {Component, Input, ViewChild} from '@angular/core';
import {ContentService} from "../services/content.service";
import {ActivatedRoute, ParamMap, Params} from "@angular/router";
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
  @ViewChild("galleryChild") galleryChild:GalleryComponent
  paramMapObs:Params | null = null ;
  parentGalleryData:Array<ContentResponse>
  page:number = 1
  pageSize:number = 20
  constructor(private contentService:ContentService,private route:ActivatedRoute){
    this.route.params.subscribe( (data) => {this.paramMapObs = data;});
    of(this.paramMapObs).subscribe((map:Params| null) => this.paramMapObsFunction(map))
  }

  paramMapObsFunction = (map:Params | null) => {
    if (map != null) {
      const page = map["page"]
      if(page != null) {
        this.page = Number(page)
      }
      const username = map["contentUsername"]
      const page_size = map["page_size"]
      if(page_size != null) {
        this.pageSize = Number(page_size)
      }
      this.contentService.getGalleryForUser(username,page,page_size)
          .subscribe((contents) => this.parentGalleryData = contents)
    }
  }
}
