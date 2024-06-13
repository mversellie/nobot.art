import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {ContentGetterService} from "../services/content-getter.service";

@Component({
  selector: 'app-upload-content-page',
  standalone: true,
  imports: [
    ReactiveFormsModule
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
  }

}
