import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {OAuthStorage} from "angular-oauth2-oidc";

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {

    if(req.url.toLowerCase().includes("logout")){
        return next(req);
    }
    if(req.url.toLowerCase().includes("login")){
        return next(req);
    }

    let oAuthStorage = inject(OAuthStorage);

  const authToken = oAuthStorage.getItem("access_token");

  if(authToken != null) {
    const nextRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });
    return next(nextRequest);
  }

  else {
    return next(req);
  }
};
