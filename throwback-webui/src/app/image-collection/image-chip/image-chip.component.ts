import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {environment} from "../../../environments/environment";
import {NgIf} from "@angular/common";
import {TagModule} from "primeng/tag";

@Component({
  selector: 'app-image-chip',
  standalone: true,
    imports: [
        RouterLink,
        NgIf,
        TagModule
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
    @Input() likes:number;
    @Input() views:number;

    goToContent(){
        return "/" + this.creator + "/" + this.url_safe_title;
    }

    goToUserGallery(){
        return "/" + this.creator
    }

    getThumbnailLink(){
        return environment["S3-URL"] + "/" + this.file;
    }


}
