import {Component} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ContentGetterService} from "../services/content-getter.service";
import {ContentResponse} from "../objects/ContentResponse";
import {of} from "rxjs";

@Component({
  selector: 'app-content-page',
  standalone: true,
  imports: [],
  templateUrl: './content-page.component.html',
  styleUrl: './content-page.component.css'
})
export class ContentPageComponent {

  paramMapObs:ParamMap | null = null ;

  contentData : ContentResponse =
      new ContentResponse("","", "","", new Date(),"","");

  constructor(private route:ActivatedRoute, private contentService:ContentGetterService) {

    console.log("content page loaded")

    this.route.paramMap.subscribe( (data) => {
      this.paramMapObs = data;
    });

    of(this.paramMapObs).subscribe( (map:ParamMap | null ) => {
      let urlToShip = "-1";
      if(map != null){
        if(map.get("contentItemId") !== null){
          // @ts-ignore
          urlToShip = map.get("contentItemId");
        }
      }

      this.contentService.getContentData(urlToShip).subscribe(
          (data:ContentResponse) => {
            this.contentData = data}
      )
    })
  }

}
