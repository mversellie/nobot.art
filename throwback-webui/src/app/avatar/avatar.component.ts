import {Component, Input, OnInit, signal, WritableSignal} from '@angular/core';
import {environment} from "../../environments/environment";
import {NgClass} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [
      NgClass,RouterLink],
    template: '<a [routerLink]="userPageLink" [class]="" [class.disabled]="disableLink">' +
        '<img [attr.id]="imgId" [ngClass]="imgClass" [src]="imgLink()" (error)="setImageNotFound()" [alt]="username">' +
        '</a>',
    styleUrl: 'avatar.component.css'
})
export class AvatarComponent implements OnInit {
    ngOnInit(): void {
        this.getImgLink();
        this.userPageLink = this.disableLink ? "" : '/' + this.username
    }

    @Input() username:string = "";
    @Input() imgClass:string = ""
    @Input() imgId:string = ""
    @Input() disableLink:boolean = false
    imgLink:WritableSignal<string> = signal("/img/default-avatar.png") ;
    userPageLink = ""

    getImgLink(){
        if(this.username != null && this.username != "") {
            this.imgLink.set( environment["S3-URL"] + "pfp-" + this.username + ".png")
        }
    }

    setImageNotFound(){
        this.imgLink.set("assets/img/default-avatar.png");
    }

    updateImg(newImage:string){
        this.imgLink.set(newImage)
    }
}
