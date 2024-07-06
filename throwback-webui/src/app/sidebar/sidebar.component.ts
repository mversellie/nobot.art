import {Component,Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";
import {AvatarComponent} from "../avatar/avatar.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, AvatarComponent
  ],
  template: `<div class="text-bg-dark" style="width: 280px;">
    <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item" *ngIf="!isLoggedIn()">
          <a id="sidebar-login-link" routerLink="/login" class="nav-link text-white">Login</a></li>
        <li id="sidebar-user-section" class="nav-item" *ngIf="isLoggedIn()">
          <div class="hstack">
            <div><app-avatar  [toSettings]="true" [small]="true" [circle]="true" [username]="username" /></div>
            <div><a id="sidebar-user-link" routerLink="/{{username}}" class="nav-link text-white">
              {{username}}</a></div></div>
        </li>
      <hr>
      <li class="nav-item">
        <a routerLink="/" class="nav-link text-white">
          Home
        </a>
      </li>
      <li *ngIf="isLoggedIn()">
        <a id="sidebar-settings-link" routerLink="/settings" class="nav-link text-white">
          Settings
        </a>
      </li>
    </ul>
  </div>`
})
export class SidebarComponent {

  @Input() username:string

  isLoggedIn(){
    return this.username != ""
  }


}
