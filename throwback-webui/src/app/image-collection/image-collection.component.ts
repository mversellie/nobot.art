import {Component, Input} from '@angular/core';
import {NgClass, NgForOf, NgStyle} from "@angular/common";
import {ImageChipComponent} from "./image-chip/image-chip.component";
import {ScrollerModule} from "primeng/scroller";
import {ImageScrollerComponent} from "./image-scroller/image-scroller.component";

@Component({
  selector: 'app-image-collection',
  standalone: true,
    imports: [
        NgStyle,
        NgForOf,
        ImageChipComponent,
        NgClass,
        ScrollerModule,
        ImageScrollerComponent
    ],
  templateUrl: './image-collection.component.html'
})
export class ImageCollectionComponent {
    @Input() images:any;
    @Input() showCreator:boolean = true

    getViews(image:any){
        return this.doesMetaExist(image) ? image.userMeta.view_count: 1
    }

    getLikes(image:any){
        return this.doesMetaExist(image) ? image.userMeta.like_count: 0
    }

    doesMetaExist(image:any){
        return typeof image.userMeta !== "undefined"
    }
}
