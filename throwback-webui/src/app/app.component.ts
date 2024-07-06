import {Component, ViewChild} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FooterComponent} from "./footer/footer.component";
import {HeaderComponent} from "./header/header.component";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {UserService} from "./services/user.service";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent, SidebarComponent,HttpClientModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @ViewChild("sideComp") sideComponent:SidebarComponent
  @ViewChild("headerComp") headerComponent:HeaderComponent
  @ViewChild("routerComp") routerComp:RouterOutlet
  userService:UserService

  constructor(userServiceIn:UserService) {
    this.userService = userServiceIn
  }


}
