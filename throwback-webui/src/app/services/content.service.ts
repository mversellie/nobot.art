import { Injectable } from '@angular/core';
import {ContentResponse} from "../objects/ContentResponse";
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {ContentCacheService} from "./content-cache.service";
import {map} from "rxjs";
import {UserService} from "./user.service";


@Injectable({
  providedIn: 'root'
})
export class ContentService {
  constructor(private http:HttpClient, private auth:UserService,private cache:ContentCacheService) {

  }

  async getContentData(user:String,content_name:String):Promise<ContentResponse> {

    const endSection = user + "/" + content_name
    const cachedContent = this.cache.cacheGet(endSection)
    if(cachedContent != undefined){
      return Promise.resolve(cachedContent);
    }
    const url = environment["api-url"] +"/content/" + user + "/" + content_name ;
    const getResponse = await fetch(url);
    const getBody = await getResponse.json()
    this.cache.cacheStore(user + "/" + content_name,getBody)
    return Promise.resolve(getBody)
  }

  getGalleryForUser(user:String,page:string,pageSize:string){
    const url = environment["api-url"] + "/content/" + user
    let params = new HttpParams()
    params.append("page",page)
    params.append("page_size",pageSize)

    // @ts-ignore
    return this.http.get(url ,{params:params}).pipe(map(res => res['content']));
  }

  getLatest(page:string,pageSize:string){
    const url = environment["api-url"] + "/content"
    let params = new HttpParams()
    params.append("page",page)
    params.append("page_size",pageSize)

    // @ts-ignore
    return this.http.get(url ,{params:params}).pipe(map(res => res['content']));
  }

  shipContentData(title:string,description:string,files:FileList){
    const form:FormData = new FormData();
    form.append("name",title)
    form.append("description",description)
    let aFile = files.item(0)
    // @ts-ignore
    form.append("upload",aFile,aFile.name)

    const headers = new HttpHeaders()
        .set('Authorization', "Bearer " + this.auth.getToken());
    return this.http.post(environment["api-url"] + "/content",form,{headers:headers})
  }
}
