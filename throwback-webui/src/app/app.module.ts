import {importProvidersFrom, NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import {HttpClientModule, provideHttpClient, withInterceptors} from "@angular/common/http";
import {authenticationInterceptor} from "./authentication/authentication.interceptor";
import {provideOAuthClient} from "angular-oauth2-oidc";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
    ],
    providers: [
        shortProvideHttp()
        ,provideOAuthClient(),
        importProvidersFrom(HttpClientModule)
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }


function shortProvideHttp(){
    return provideHttpClient(withInterceptors([authenticationInterceptor]))
}
