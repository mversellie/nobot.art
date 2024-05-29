import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ContentGetterService} from "../services/content-getter.service";

@Component({
  selector: 'app-content-page',
  standalone: true,
  imports: [],
  templateUrl: './content-page.component.html',
  styleUrl: './content-page.component.css'
})
export class ContentPageComponent {

  contentUrl: String = "";

  constructor(private route:ActivatedRoute,private contentService:ContentGetterService) {
    this.route.params.subscribe( params => this.contentUrl =
        contentService.getContentUrlById(params["contentItemId"]));
  }

}
