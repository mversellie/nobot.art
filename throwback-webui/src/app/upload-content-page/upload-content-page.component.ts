import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ContentGetterService} from "../services/content-getter.service";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-upload-content-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgOptimizedImage
  ],
  templateUrl: './upload-content-page.component.html',
  styleUrl: './upload-content-page.component.css'
})
export class UploadContentPageComponent {
  contentForm:FormGroup ;

  // @ts-ignore
  filesToUpload:FileList;

  constructor(private contentService:ContentGetterService) {
    this.contentForm = new FormGroup({
      fileData:new FormControl(),
      contentName:new FormControl(),
      contentDescription:new FormControl()
    });
  }

  onSubmit(){
    console.log(this.contentForm)
    this.contentService.shipContentData(
        this.contentForm.value["contentName"],
        this.contentForm.value["contentDescription"],
        this.filesToUpload
  ).subscribe((hi) => console.log(hi))
  }

  handle_file(event:any) {
    this.filesToUpload = event.files
    const previewFile = this.filesToUpload.item(0)
    if(previewFile != null) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(previewFile)
      fileReader.onload = function (e) {
        let imageElement = document.getElementById("content-frame");
        if (this != null && this.result != null && imageElement != null) {
          // @ts-ignore
          imageElement.setAttribute("src", this.result)
        }
      }
    }
  }

}
