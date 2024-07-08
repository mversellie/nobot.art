import { Routes } from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {ContentPageComponent} from "./content-page/content-page.component";
import {UploadContentPageComponent} from "./upload-content-page/upload-content-page.component";
import {loggedInGuard} from "./guards/logged-in.guard";
import {EmptyComponent} from "./reroute-to-login/empty.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {UserGalleryComponent} from "./user-gallery/user-gallery.component";
import {UserSettingsPageComponent} from "./user-settings-page/user-settings-page.component";
import {loginGuard} from "./guards/login.guard";
import {logoutGuard} from "./guards/logout.guard";
import {LogoutPageComponent} from "./logout-page/logout-page.component";

export const routes: Routes = [
    {path:'login',component:EmptyComponent,canActivate:[loginGuard]},
    {path:'logout',component:LogoutPageComponent,canActivate:[logoutGuard]},
    {path:'create',component:UploadContentPageComponent,canActivate:[loggedInGuard]},
    {path:'settings',component:UserSettingsPageComponent,canActivate:[loggedInGuard]},
    {path:':contentUsername/:contentName',component:ContentPageComponent},
    {path:':contentUsername',component:UserGalleryComponent},
    {path:'404',component:NotFoundComponent},
    {path:'',component:HomePageComponent}
    ];
