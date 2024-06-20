import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ContentService} from "../services/content.service";
import {NgOptimizedImage} from "@angular/common";
import {ContentResponse} from "../objects/ContentResponse";
import {ContentCacheService} from "../services/content-cache.service";
import {Router} from "@angular/router";

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

  constructor(private contentService:ContentService,
              private cacheService:ContentCacheService,private router:Router) {
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
  ).subscribe((hi:Object) => {
      const response = hi as ContentResponse
      const key = response.creator + "/" + response.url_safe_name;
      this.cacheService.cacheStore(key,response);
      this.router.navigate(["/" ,response.creator,response.url_safe_name]);
    })}


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
