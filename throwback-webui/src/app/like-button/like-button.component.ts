import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {NgIf, NgStyle} from "@angular/common";
import {AuthenticationService} from "../authentication/authentication.service";

@Component({
  selector: 'app-like-button',
  standalone: true,
  imports: [
    ButtonModule,
    NgStyle,
    NgIf
  ],
  templateUrl: './like-button.component.html'
})
export class LikeButtonComponent {
  @Output() onClick:EventEmitter<void> = new EventEmitter()
  @Input() isLiked:boolean = false


  constructor(protected authService:AuthenticationService) {
  }

  getLikeButtonStyle(){
    return this.isLiked?"background:crimson;color:white;":"color:crimson;border-color:white"
  }


}
