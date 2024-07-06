import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {NgClass} from "@angular/common";
import {RouterLink} from "@angular/router";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [
    NgClass,
    RouterLink
  ],
  template: '<a id="imageLink" routerLink="{{getLink()}}">' +
      '<img id="profile-pic" [ngClass]="getShapeClass()" [src]="getImgLink()" (error)="setImageNotFound()" alt="none">' +
      '</a>',
  styleUrl: './avatar.component.css'
})
export class AvatarComponent{

    @Input() toSettings = false;
    @Input() username:string;
    @Input() circle = false;
    @Input() small = false;
    imgLink = "/img/default-avatar.png" ;

    getImgLink(){
        if(this.username != null) {
            this.imgLink = environment["S3-URL"] + "pfp-" + this.username + ".png"
        }
        return this.imgLink
    }

    getShapeClass(){
        let classes:string = ""

      if (this.circle){
        classes= classes + "circle-avatar "
      }

      else {
        classes= classes + "square-avatar "
      }

      if (this.small){
          classes= classes + "small-avatar"
      }

      else{
          classes = classes + "regular-avatar my-3"
      }

      return classes


    }

    setImageNotFound(){
      this.imgLink = "/img/default-avatar.png";
    }

    getLink(){
        if(this.toSettings){
            return '/settings'
        }

        return '/' + this.username
    }
}
