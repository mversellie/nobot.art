import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService{

  constructor(private http:HttpClient) {
  }

  shipSettingsUpdate(profilePictureFiles:FileList) {
    const form:FormData = new FormData();
    let profilePicture = profilePictureFiles.item(0)
    // @ts-ignore
    form.append("upload",profilePicture,profilePicture.name)

    let headers = new HttpHeaders();

    console.log(headers)


    return this.http.put(environment["api-url"] + "/users",form)
  }
}