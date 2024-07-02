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
      <a class="navbar-brand" href="#">nobot.art</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
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
          <div class="hstack">
          <input class="form-control" type="search" placeholder="Search" aria-label="Search">
            <button type="button" class="btn btn-primary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16" style="--darkreader-inline-fill: currentColor;" data-darkreader-inline-fill="">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"></path>
            </svg></button></div>
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
