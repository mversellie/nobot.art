import {Component, Input, OnInit} from '@angular/core';
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
  template: '<a routerLink="getLink()">' +
      '<img [ngClass]="getShapeClass()" [src]="imgLink" (error)="setImageNotFound()" alt="none">' +
      '</a>',
  styleUrl: './avatar.component.css'
})
export class AvatarComponent implements OnInit{

    @Input() toSettings = false;
    @Input() username:string;
    @Input() circle = false;
    imgLink:string;


    ngOnInit(): void {
        this.imgLink = environment["S3-URL"] + "pfp-" + this.username + ".png"
        console.log(this.imgLink)
    }

    getShapeClass(){
      if (this.circle){
        return "circle-avatar"
      }

      return "square-avatar"
    }

    setImageNotFound(){
      this.imgLink = "/img/default-avatar";
    }
}
