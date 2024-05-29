import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContentGetterService {
  constructor() { }

  getContentUrlById(id:String):string{
    return window.location.protocol + "//" + window.location.host + "/assets/img/" + id + ".png"
  }
}
