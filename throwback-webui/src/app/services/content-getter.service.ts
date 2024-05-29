import { Injectable } from '@angular/core';
import {ContentResponse} from "../objects/ContentResponse";

@Injectable({
  providedIn: 'root'
})
export class ContentGetterService {
  constructor() { }

  getContentData(id:String):Promise<ContentResponse> {
    return new Promise( (resolve, reject) => resolve(new ContentResponse("aTitle","aCreator",
        window.location.protocol + "//" + window.location.host + "/assets/img/" + id + ".png",
        window.location.protocol + "//" + window.location.host + "/assets/img/thumb-" + id + ".png",
        new Date(),"desc",id)))
  }
}
