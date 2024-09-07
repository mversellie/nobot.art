import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import {AppConfig, LayoutService} from "./layout/service/app.layout.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig, private layoutService: LayoutService) { }

    ngOnInit(): void {
        this.primengConfig.ripple = true;

        const config: AppConfig = {
            ripple: true,
            menuMode: 'static',
            colorScheme: 'light',
            theme: 'indigo',
            scale: 14
        };

        this.layoutService.config.set(config)
    }

}
