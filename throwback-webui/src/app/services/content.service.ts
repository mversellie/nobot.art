import { Injectable } from '@angular/core';
import {ContentResponse} from "../objects/ContentResponse";
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {ContentCacheService} from "./content-cache.service";
import {firstValueFrom, lastValueFrom, map} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ContentService {
  constructor(private http:HttpClient,private cache:ContentCacheService) {

  }

  async getContentData(user:String,content_name:String):Promise<ContentResponse> {
    const endSection = user + "/" + content_name
    const cachedContent = this.cache.cacheGet(endSection)
    if(cachedContent != undefined){
      return Promise.resolve(cachedContent);
    }
    const url = environment["api-url"] +"/content/" + user + "/" + content_name ;
    const getResponse = await lastValueFrom(this.http.get(url));
    // @ts-ignore
    this.cache.cacheStore(user + "/" + content_name,getResponse)
    // @ts-ignore
    return Promise.resolve(getResponse)
  }

  getGalleryForUser(user:String,page:number,pageSize:number){
    const url = environment["api-url"] + "/content/" + user
    let params = new HttpParams()
    params.append("page",page.toString())
    params.append("page_size",pageSize.toString())

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

  async shipContentData(title:string,description:string,files:FileList){
    const form:FormData = new FormData();
    form.append("name",title)
    form.append("description",description)
    let aFile = files.item(0)
    // @ts-ignore
    form.append("upload",aFile,aFile.name)

    const contentResponse =  await firstValueFrom(this.http.post(environment["api-url"] + "/content",form));
    // @ts-ignore
    const creator = contentResponse["creator"] as string;
    // @ts-ignore
    const name = contentResponse["url_safe_name"] as string;
    const key = `${creator}/${name}`;
    // @ts-ignore
    this.cache.cacheStore(key,contentResponse);
    // @ts-ignore
    return {creator:creator,name:name}
  }

  likeOrUnlike(like:boolean,user:string,contentName:string){
    let action = like?"like":"unlike"
    return this.http.post(environment["api-url"] + "/content/" + user + "/" + contentName + "/act",{"action":action})
  }
}
