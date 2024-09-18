import {Component, Input} from '@angular/core';
import {NgForOf, NgStyle} from "@angular/common";
import {ImageChipData} from "./image-chip/ImageChipData";
import {ImageChipComponent} from "./image-chip/image-chip.component";

@Component({
  selector: 'app-image-collection',
  standalone: true,
    imports: [
        NgStyle,
        NgForOf,
        ImageChipComponent
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
