import { Injectable } from '@angular/core';
import {ContentResponse} from "../objects/ContentResponse";
import { HttpClient } from  '@angular/common/http';
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ContentGetterService {
  constructor(private http:HttpClient) { }

  getContentData(user:String,content_name:String):Observable<ContentResponse> {
    const url = "http://localhost:5000/content/" + user + "/" + content_name ;
    return this.http.get<ContentResponse>(url).pipe()
  }
}
