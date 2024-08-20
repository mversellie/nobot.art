import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../authentication/authentication.service";

@Component({
  selector: 'app-logout-page',
  standalone: true,
  imports: [],
  template: '<div>logout successful</div>',
  styleUrl: './logout-page.component.css'
})
export class LogoutPageComponent implements OnInit{
    constructor(public authService:AuthenticationService) {
    }

    ngOnInit() {
        this.authService.logout();
    }
}
