import {Component} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ContentService} from "../services/content.service";
import {ContentResponse} from "../objects/ContentResponse";
import {from, of} from "rxjs";

@Component({
  selector: 'app-content-page',
  standalone: true,
  imports: [],
  templateUrl: './content-page.component.html',
  styleUrl: './content-page.component.css'
})
export class ContentPageComponent {

  paramMapObs:ParamMap | null = null ;
  imageUrl:string = ""

  contentData : ContentResponse;

  constructor(private route:ActivatedRoute, private contentService:ContentService, private router:Router) {

    console.log("content page loaded")

    this.contentData =  new ContentResponse("","", "", new Date(),"","");


  this.route.paramMap.subscribe( (data) => {
      this.paramMapObs = data;
    });

    of(this.paramMapObs).subscribe( (map:ParamMap | null ) => {
      let contentUsername = "-1";
      let contentName = "-1";
      if(map != null){
        if(map.get("contentUsername") !== null){
          // @ts-ignore
          contentUsername = map.get("contentUsername");
        }

        if(map.get("contentName") !== null){
          // @ts-ignore
          contentName = map.get("contentName");
        }
      }

      from(this.contentService.getContentData(contentUsername,contentName)).subscribe(
          (data:ContentResponse) => {
            console.log(data)
            this.contentData = data;
            this.imageUrl= "https://127.0.0.1:9000/main/" + data.filename
          }
      )
    })
  }

}
