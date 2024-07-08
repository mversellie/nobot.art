import { ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideAnimations} from "@angular/platform-browser/animations";
import {HttpClientModule, provideHttpClient, withInterceptors} from "@angular/common/http";
import {provideOAuthClient} from "angular-oauth2-oidc";
import {authenticationInterceptor} from "./authentication/authentication.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideAnimations()
    ,shortProvideHttp()
    ,provideOAuthClient(),
    importProvidersFrom(HttpClientModule)]
};

export function shortProvideHttp(){
  return provideHttpClient(withInterceptors([authenticationInterceptor]))
}
