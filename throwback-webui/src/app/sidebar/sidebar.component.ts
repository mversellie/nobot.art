import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {UserService} from "../services/user.service";
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
        <li class="nav-item" *ngIf="!authService.isLoggedIn()">
          <a routerLink="/login" class="nav-link text-white">Login</a></li>
        <li class="nav-item" *ngIf="authService.isLoggedIn()">
          <app-avatar [circle]="true" username="{{userService.username()}}" />
          <a routerLink="/{{userService.username()}}" class="nav-link text-white">
            {{userService.username()}}</a></li>
      <hr>
      <li class="nav-item">
        <a routerLink="/" class="nav-link active">
          Home
        </a>
      </li>
      <li *ngIf="authService.isLoggedIn()">
        <a routerLink="/settings" class="nav-link text-white">
          Settings
        </a>
      </li>
    </ul>
  </div>`
})
export class SidebarComponent implements OnInit {

  constructor(public authService:AuthenticationService,public userService:UserService) {
  }


  ngOnInit() {
  }


}
