import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {LayoutService} from "../layout/service/app.layout.service";
import {Subscription} from "rxjs";
import {StyleClassModule} from "primeng/styleclass";
import {ImageCollectionComponent} from "../image-collection/image-collection.component";

@Component({
  selector: 'app-user-gallery',
  standalone: true,
    imports: [
        StyleClassModule,
        ImageCollectionComponent
    ],
  templateUrl: './user-gallery.component.html',
  styleUrl: './user-gallery.component.scss'
})
export class UserGalleryComponent {
    subscription: Subscription;

    darkMode: boolean = false;

    constructor(public router: Router, private layoutService: LayoutService) {
        this.subscription = this.layoutService.configUpdate$.subscribe(config => {
            this.darkMode = config.colorScheme === 'dark'  ? true : false;
        });
    }

    scrollToElement($element: any): void {
        setTimeout(() => {
            $element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        }, 200);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
