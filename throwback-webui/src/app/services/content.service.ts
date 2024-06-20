import { Injectable } from '@angular/core';
import {ContentResponse} from "../objects/ContentResponse";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthenticationService} from "./authentication.service";
import {environment} from "../../environments/environment";
import {ContentCacheService} from "./content-cache.service";


@Injectable({
  providedIn: 'root'
})
export class ContentService {
  constructor(private http:HttpClient, private auth:AuthenticationService,private cache:ContentCacheService) {

  }

  async getContentData(user:String,content_name:String):Promise<ContentResponse> {

    const endSection = user + "/" + content_name
    const cachedContent = this.cache.cacheGet(endSection)
    if(cachedContent != undefined){
      console.log("cache hit on: " + endSection)
      return Promise.resolve(cachedContent);
    }
    const url = environment["api-url"] +"/content/" + user + "/" + content_name ;
    const getResponse = await fetch(url);
    const getBody = await getResponse.json()
    this.cache.cacheStore(user + "/" + content_name,getBody)
    return Promise.resolve(getBody)
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
