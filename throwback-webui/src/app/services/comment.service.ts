import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http:HttpClient, private auth:AuthenticationService) {
  }

  shipContentComment(comment:string, threadName:string) {
    const form:FormData = new FormData();
    form.append("comment",comment)

    const headers = new HttpHeaders()
        .set('Authorization', this.auth.getToken());

    let url = environment["api-url"] + "/content/" + threadName + "/comments"
    return this.http.post(url,form,{headers:headers})
  }

  getContentComments(threadName:string){
    let url = environment["api-url"] + "/content/" + threadName + "/comments"
    return this.http.get(url)
  }
}
