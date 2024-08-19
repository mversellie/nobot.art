import { Injectable } from '@angular/core';
import {ContentResponse} from "../objects/ContentResponse";

@Injectable({
  providedIn: 'root'
})
export class ContentCacheService {
  cache:Map<string,ContentResponse>

  constructor() {
    this.cache = new Map<string, ContentResponse>();
  }

  cacheStore(key:string,value:ContentResponse){
    this.cache.set(key,value)
  }

  cacheGet(key:string):ContentResponse | undefined {
    return this.cache.get(key)
  }
}
