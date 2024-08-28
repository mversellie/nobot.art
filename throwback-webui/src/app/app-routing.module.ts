import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import {CreatePostComponent} from "./create-post/create-post.component";
import {EmptyComponent} from "./reroute-to-login/empty.component";
import {loginGuard} from "./guards/login.guard";
import {logoutGuard} from "./guards/logout.guard";
import {LogoutPageComponent} from "./logout-page/logout-page.component";
import {ContentPageComponent} from "./content-page/content-page.component";
import {UserSettingsPageComponent} from "./user-settings-page/user-settings-page.component";
import {UserGalleryComponent} from "./user-gallery/user-gallery.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {contentResolver} from "./resolvers/content.resolver";
import {PrivateMessagePageComponent} from "./private-message/private-message-page.component";
import {loggedInGuard} from "./guards/logged-in.guard";
import {NotfoundComponent} from "./notfound-page/notfound.component";

const routerOptions: ExtraOptions = {
    anchorScrolling: 'enabled'
};

const routes: Routes = [
    { path: 'login',component:EmptyComponent,canActivate:[loginGuard]},
    { path: 'notfound', component:NotfoundComponent },
    {
        path: '', component: AppLayoutComponent,
        children: [
            { path: 'create', component:CreatePostComponent,canActivate:[loggedInGuard] },
            { path:'logout',component:LogoutPageComponent,canActivate:[logoutGuard]},
            { path:'settings',component:UserSettingsPageComponent,canActivate:[loggedInGuard]},
            { path:'private-messages',component:PrivateMessagePageComponent,canActivate:[loggedInGuard]},
            { path:':contentUsername/:contentName',component:ContentPageComponent,resolve:{content:contentResolver}},
            { path:':contentUsername',component:UserGalleryComponent},
            { path: '', component: HomePageComponent}
        ]
    },
    { path: '**', redirectTo: '/notfound' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
