import { Routes } from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {ContentPageComponent} from "./content-page/content-page.component";

export const routes: Routes = [{path:'content/:contentItemId',component:ContentPageComponent},{path:'',component:HomePageComponent}
    ];
