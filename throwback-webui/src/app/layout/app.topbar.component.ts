import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AppSidebarComponent } from './app.sidebar.component';
import {environment} from "../../environments/environment";
import {UserService} from "../services/user.service";
import {AuthenticationService} from "../authentication/authentication.service";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopbarComponent {

    @ViewChild('menubutton') menuButton!: ElementRef;
    @ViewChild('searchinput') searchInput!: ElementRef;
    @ViewChild(AppSidebarComponent) appSidebar!: AppSidebarComponent;
    searchActive: boolean = false;
    constructor(public layoutService: LayoutService,public el: ElementRef,public userService:UserService,public authService:AuthenticationService) { }
    activateSearch() {
        this.searchActive = true;
        setTimeout(() => {
            this.searchInput.nativeElement.focus();
        }, 100);
    }

    avatarImgLink = "/assets/img/default-avatar.png" ;

    getAvatarImgLink(username:String){
        if(username != null && username != '') {
            this.avatarImgLink = environment["S3-URL"] + "/pfp-" + username + ".png"
        }
        return this.avatarImgLink
    }

    deactivateSearch() {
        this.searchActive = false;
    }
    onMenuButtonClick() {
        this.layoutService.onMenuToggle();
    }

}
