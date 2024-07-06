import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {UserSettingsService} from "../services/user-settings.service";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-user-settings-page',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './user-settings-page.component.html',
  styleUrl: './user-settings-page.component.css'
})
export class UserSettingsPageComponent {
  contentForm:FormGroup ;

  // @ts-ignore
  filesToUpload:FileList;

  constructor(private userSettingsService:UserSettingsService,private authService:AuthenticationService) {
    this.contentForm = new FormGroup({
      fileData:new FormControl(),
    });
  }

  onSubmit(){
    this.userSettingsService.shipSettingsUpdate(this.filesToUpload
    ).subscribe((hi:Object) => {
      this.authService.refreshToken()
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
