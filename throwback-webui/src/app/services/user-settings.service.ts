import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService{

  constructor(private http:HttpClient, private userService:UserService) {
  }

  shipSettingsUpdate(profilePictureFiles:FileList) {
    const form:FormData = new FormData();
    let profilePicture = profilePictureFiles.item(0)
    // @ts-ignore
    form.append("upload",profilePicture,profilePicture.name)

    const idToken = this.userService.getToken();
    let headers = new HttpHeaders();
    if(idToken != null) {
      headers = new HttpHeaders().set('Authorization', `Bearer ${idToken}`);
    }

    console.log(headers)


    return this.http.put(environment["api-url"] + "/users",form,{headers:headers})
  }
}