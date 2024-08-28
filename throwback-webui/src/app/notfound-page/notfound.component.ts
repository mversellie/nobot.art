import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {RouterLink} from "@angular/router";

@Component({
	templateUrl: './notfound.component.html',
	imports: [
		RouterLink
	],
	standalone: true
})
export class NotfoundComponent { 
	constructor(public layoutService: LayoutService){
    }
}