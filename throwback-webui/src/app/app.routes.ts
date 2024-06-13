import { Routes } from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {ContentPageComponent} from "./content-page/content-page.component";
import {UploadContentPageComponent} from "./upload-content-page/upload-content-page.component";
import {loggedInGuard} from "./guards/logged-in.guard";
import {EmptyComponent} from "./reroute-to-login/empty.component";
import {NotFoundComponent} from "./not-found/not-found.component";

export const routes: Routes = [
    {path:'login',component:EmptyComponent,canActivate:[loggedInGuard]},
    {path:'create',component:UploadContentPageComponent,canActivate:[loggedInGuard]},
    {path:':contentUsername/:contentName',component:ContentPageComponent},
    {path:'404',component:NotFoundComponent},
    {path:'',component:HomePageComponent}
    ];
