import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http:HttpClient, private userService:UserService) {
  }

  shipContentComment(comment:string, threadName:string) {
    const form:FormData = new FormData();
    form.append("comment",comment)

    let url = environment["api-url"] + "/content/" + threadName + "/comments"
    return this.http.post(url,form,)
  }

  getContentComments(threadName:string){
    let url = environment["api-url"] + "/content/" + threadName + "/comments"
    return this.http.get(url)
  }
}
