import { Injectable } from '@angular/core';
import {ContentResponse} from "../objects/ContentResponse";
import { HttpClient } from  '@angular/common/http';
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ContentGetterService {
  constructor(private http:HttpClient) { }

  getContentData(id:String):Observable<ContentResponse> {
    const url = "http://127.0.0.1:5000/content/" + id ;
    return this.http.get<ContentResponse>(url).pipe()
  }
}
