import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {UserService} from "../services/user.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ CommonModule
  ],
  template: `<div class="text-bg-dark" style="width: 280px;">
    <a href="/" class="d-flex align-items-center text-white text-decoration-none">
      <svg class="bi pe-none me-2" width="40" height="32"><use xlink:href="#bootstrap"></use></svg>
      <span class="fs-4" *ngIf="!authService.isLoggedIn()">Login</span>
      <span class="fs-4" *ngIf="authService.isLoggedIn()">{{userService.username()}}</span>
    </a>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <a href="#" class="nav-link active" aria-current="page">
          <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#home"></use></svg>
          Home
        </a>
      </li>
      <li>
        <a href="#" class="nav-link text-white">
          <svg class="bi pe-none me-2" width="16" height="16"><use xlink:href="#speedometer2"></use></svg>
          Dashboard
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
