import {Component, Input} from '@angular/core';
import {ImageChipData} from "./ImageChipData";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-image-chip',
  standalone: true,
    imports: [
        RouterLink
    ],
  templateUrl: './image-chip.component.html',
  styleUrl: './image-chip.component.scss'
})
export class ImageChipComponent {
    // @ts-ignore
    @Input() content:ImageChipData;

}
