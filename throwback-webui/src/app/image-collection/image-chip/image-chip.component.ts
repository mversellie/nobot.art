import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {environment} from "../../../environments/environment";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-image-chip',
  standalone: true,
    imports: [
        RouterLink,
        NgIf
    ],
  templateUrl: './image-chip.component.html',
  styleUrl: './image-chip.component.scss'
})
export class ImageChipComponent {
    // @ts-ignore
    @Input() title:string;
    @Input() file:string;
    @Input() creator:string;
    @Input() url_safe_title:string;
    @Input() showCreator:boolean = true;

    goToContent(){
        return "/" + this.creator + "/" + this.url_safe_title;
    }

    goToUserGallery(){
        return "/" + this.creator
    }

    getThumbnailLink(){
        return environment["S3-URL"] + this.file;
    }


}
