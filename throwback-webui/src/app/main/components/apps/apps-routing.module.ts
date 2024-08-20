import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'chat', data: { breadcrumb: 'Chat' }, loadChildren: () => import('./chat/chat.app.module').then(m => m.ChatAppModule) },
        { path: 'blog', data: { breadcrumb: 'Blog' }, loadChildren: () => import('./blog/blog.app.module').then(m => m.BlogAppModule) },
        { path: 'create', loadChildren: () => import('./blog/blog.app.module').then(m => m.BlogAppModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class AppsRoutingModule { }
