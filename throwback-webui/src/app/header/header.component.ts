import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {UserService} from "../services/user.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ CommonModule
  ],
  template: `<nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">throwback.art</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item" *ngIf="authService.isLoggedIn()==false">
            <button class="nav-link"  (click)="authService.login()">Login</button>
          </li>
          <li class="nav-item" *ngIf="authService.isLoggedIn()">
            <button class="nav-link"  (click)="authService.logout()">Log out</button>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" aria-disabled="true">Disabled</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
        </ul>
        <form role="search">
          <input class="form-control" type="search" placeholder="Search" aria-label="Search">
        </form>
      </div>
    </div>
  </nav>`,
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  constructor(public authService : AuthenticationService,public userService : UserService) {
  }

  ngOnInit() {
  }
}
