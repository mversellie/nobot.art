import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ContentGetterService} from "../services/content-getter.service";
import {ContentResponse} from "../objects/ContentResponse";

@Component({
  selector: 'app-content-page',
  standalone: true,
  imports: [],
  templateUrl: './content-page.component.html',
  styleUrl: './content-page.component.css'
})
export class ContentPageComponent {

  contentData : ContentResponse =
      new ContentResponse("","", "","", new Date(),"","");

  constructor(private route:ActivatedRoute,private contentService:ContentGetterService) {
    this.route.params.subscribe( params =>
        contentService.getContentData(params["contentItemId"]).then((data:ContentResponse) => this.contentData = data));
  }

}
