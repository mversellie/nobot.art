import {Component, signal, ViewChild, WritableSignal} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {of} from "rxjs";
import {StyleClassModule} from "primeng/styleclass";
import {ImageCollectionComponent} from "../image-collection/image-collection.component";
import {ContentService} from "../services/content.service";

@Component({
  selector: 'app-user-gallery',
  standalone: true,
    imports: [
        StyleClassModule,
        ImageCollectionComponent
    ],
  templateUrl: './user-gallery.component.html',
  styleUrl: './user-gallery.component.scss'
})
export class UserGalleryComponent {

    galleryContents:WritableSignal<any> = signal([])
    // @ts-ignore
    @ViewChild("galleryChild") galleryChild:ImageCollectionComponent
    page:number = 1
    pageSize:number = 20
    paramMapObs:Params | null = null ;


    constructor(private contentService:ContentService,private route:ActivatedRoute){
        this.route.params.subscribe( (data) => {this.paramMapObs = data;});
        of(this.paramMapObs).subscribe((map:Params| null) => this.paramMapObsFunction(map))
    }

    paramMapObsFunction = (map:Params | null) => {
        if (map != null) {
            const pageIn = map["page"]
            if(pageIn != null) {
                this.page = Number(pageIn)
            }
            const username = map["contentUsername"]
            const page_sizeIn = map["page_size"]
            if(page_sizeIn != null) {
                this.pageSize = Number(page_sizeIn)
            }
            this.contentService.getGalleryForUser(username,this.page,this.pageSize)
                .subscribe((next) =>  {this.galleryContents.set(next)})
        }
    }
}
