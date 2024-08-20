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
  templateUrl: './image-collection.component.html',
  styleUrl: './image-collection.component.scss'
})
export class ImageCollectionComponent {
    @Input() images:any;
}
