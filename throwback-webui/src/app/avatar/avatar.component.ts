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
  template: '<a routerLink="{{getLink()}}">' +
      '<img [ngClass]="getShapeClass()" [src]="imgLink" (error)="setImageNotFound()" alt="none">' +
      '</a>',
  styleUrl: './avatar.component.css'
})
export class AvatarComponent implements OnInit,OnChanges{

    @Input() toSettings = false;
    @Input() username:string;
    @Input() circle = false;
    @Input() small = false;
    imgLink:string;


    ngOnInit(): void {
        this.imgLink = environment["S3-URL"] + "pfp-" + this.username + ".png"
    }

    ngOnChanges(){
        this.imgLink = environment["S3-URL"] + "pfp-" + this.username + ".png"
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
      this.imgLink = "/img/default-avatar";
    }

    getLink(){
        if(this.toSettings){
            return '/settings'
        }

        return '/' + this.username
    }
}
