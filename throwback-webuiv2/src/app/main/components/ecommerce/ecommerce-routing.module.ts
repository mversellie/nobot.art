import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'product-list', data: { breadcrumb: 'Product List' }, loadChildren: () => import('./productlist/productlist.module').then(m => m.ProductListModule) },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class EcommerceRoutingModule { }
