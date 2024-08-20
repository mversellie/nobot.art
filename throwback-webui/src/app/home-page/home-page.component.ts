import {Component, signal, ViewChild, WritableSignal} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {ContentResponse} from "../objects/ContentResponse";
import {ContentService} from "../services/content.service";
import {of} from "rxjs";
import {ImageCollectionComponent} from "../image-collection/image-collection.component";

@Component({
  selector: 'app-home-page',
  standalone: true,
    imports: [
        ImageCollectionComponent
    ],
  templateUrl: './home-page.component.html'
})
export class HomePageComponent {
    newestContent:WritableSignal<Array<ContentResponse>> = signal([])
    // @ts-ignore
    @ViewChild("newestContentSection") newestContentSection:ImageCollectionComponent

    paramMapObs:Params ;
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
                {this.newestContent.set(data)})
        }
    }
}
