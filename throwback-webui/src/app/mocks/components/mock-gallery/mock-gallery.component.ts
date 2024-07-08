import {Component, Input} from '@angular/core';
import {ContentResponse} from "../../../objects/ContentResponse";

@Component({
  selector: 'app-gallery',
  standalone: true,
  template: '<div></div>',
})
export class MockGalleryComponent {
  @Input() galleryData:Array<ContentResponse> = [];
  @Input() itemsPerRow = 4;
  @Input() page:number = 1
  @Input() pageSize:number = 20
}
