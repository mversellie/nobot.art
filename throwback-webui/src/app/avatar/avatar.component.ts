import {Component, Input} from '@angular/core';
import {environment} from "../../environments/environment";
import {NgClass} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [
      NgClass,RouterLink],
    template: '<a routerLink="getLink()">' +
        '<img [attr.id]="imgId" [ngClass]="imgClass" [src]="getImgLink()" (error)="setImageNotFound()" alt="none">' +
        '</a>'
})
export class AvatarComponent {

    @Input() username:string = "";
    @Input() imgClass:string = ""
    @Input() imgId:string = ""
    @Input() toSettings:boolean = false
    imgLink = "/img/default-avatar.png" ;

    getImgLink(){
        if(this.username != null && this.username != "") {
            this.imgLink = environment["S3-URL"] + "pfp-" + this.username + ".png"
        }
        return this.imgLink
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
