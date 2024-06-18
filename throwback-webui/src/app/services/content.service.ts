import { Injectable } from '@angular/core';
import {ContentResponse} from "../objects/ContentResponse";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, Observable} from "rxjs";
import {AuthenticationService} from "./authentication.service";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class ContentService {
  constructor(private http:HttpClient, private auth:AuthenticationService) { }

  getContentData(user:String,content_name:String):Observable<ContentResponse> {
    const url = environment["api-url"] +"/content/" + user + "/" + content_name ;
    console.log("hitting: " + url)
    // @ts-ignore
    return this.http.get(url).pipe(map(res => res['payload']));
  }

  shipContentData(title:string,description:string,files:FileList){
    const form:FormData = new FormData();
    form.append("name",title)
    form.append("description",description)
    let aFile = files.item(0)
    // @ts-ignore
    form.append("upload",aFile,aFile.name)

    const headers = new HttpHeaders()
        .set('Authorization', this.auth.getToken());

    console.log("Ship")
    return this.http.post(environment["api-url"] + "/content",form,{headers:headers})
  }
}
