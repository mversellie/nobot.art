import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppsRoutingModule } from './apps-routing.module';
import {CreatePostComponent} from "../../../create-post/create-post.component";

@NgModule({
  imports: [
    CommonModule,
    AppsRoutingModule,
      CreatePostComponent
  ],
  declarations: []
})
export class AppsModule { }
