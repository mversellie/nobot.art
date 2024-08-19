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

const routerOptions: ExtraOptions = {
    anchorScrolling: 'enabled'
};

const routes: Routes = [
    {
        path: '', component: AppLayoutComponent,
        children: [
            { path: 'pages', data: { breadcrumb: 'Pages' }, loadChildren: () => import('./main/components/pages/pages.module').then(m => m.PagesModule) },
            { path: 'profile', data: { breadcrumb: 'User Management' }, loadChildren: () => import('./main/components/profile/profile.module').then(m => m.ProfileModule) },
            { path: 'documentation', data: { breadcrumb: 'Documentation' }, loadChildren: () => import('./main/components/documentation/documentation.module').then(m => m.DocumentationModule) },
            { path: 'ecommerce', data: { breadcrumb: 'E-Commerce' }, loadChildren: () => import('./main/components/ecommerce/ecommerce.module').then(m => m.EcommerceModule) },
            { path: 'apps', data: { breadcrumb: 'Apps' }, loadChildren: () => import('./main/components/apps/apps.module').then(m => m.AppsModule) },
            { path: 'create', component:CreatePostComponent },
            { path:'logout',component:LogoutPageComponent},
            { path:'settings',component:UserSettingsPageComponent},
            { path:':contentUsername/:contentName',component:ContentPageComponent},
            { path:'gal',component:UserGalleryComponent},
            { path: '', component: AppLayoutComponent}
        ]
    },
    { path:'login',component:EmptyComponent,canActivate:[loginGuard]},
    { path: 'landing', loadChildren: () => import('./main/components/landing/landing.module').then(m => m.LandingModule) },
    { path: 'notfound', loadChildren: () => import('./main/components/notfound/notfound.module').then(m => m.NotfoundModule) },
    { path: '**', redirectTo: '/notfound' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, routerOptions)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
