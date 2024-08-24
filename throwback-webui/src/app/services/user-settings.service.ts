import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService{

  constructor(private http:HttpClient) {
  }

  shipSettingsUpdate(profilePictureFiles:FileList,formData:FormGroup) {

    const form:FormData = new FormData();
    Object.keys(formData).forEach((key: string) => {
      form.append(key,formData.get(key)?.value)
    });
    if(profilePictureFiles != null && profilePictureFiles.length > 0) {
      let aFile = profilePictureFiles.item(0)
      // @ts-ignore
      form.append("upload",aFile,aFile.name)
    }


    return this.http.put(environment["api-url"] + "/users",form)
  }


}