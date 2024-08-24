import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'blog', data: { breadcrumb: 'Blog' }, loadChildren: () => import('./blog/blog.app.module').then(m => m.BlogAppModule) },
        { path: 'create', loadChildren: () => import('./blog/blog.app.module').then(m => m.BlogAppModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class AppsRoutingModule { }
