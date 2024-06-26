import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService{

  constructor(private http:HttpClient, private auth:AuthenticationService) {
  }

  shipSettingsUpdate(profilePictureFiles:FileList) {
    const form:FormData = new FormData();
    let profilePicture = profilePictureFiles.item(0)
    // @ts-ignore
    form.append("upload",profilePicture,profilePicture.name)

    const headers = new HttpHeaders()
        .set('Authorization', this.auth.getToken());

    return this.http.put(environment["api-url"] + "/users",form,{headers:headers})
  }
}