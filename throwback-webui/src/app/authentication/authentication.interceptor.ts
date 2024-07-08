import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from "@angular/core";
import {OAuthStorage} from "angular-oauth2-oidc";

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  let oAuthStorage = inject(OAuthStorage);

  const authToken = oAuthStorage.getItem("access_token");
  console.log(authToken)

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
