import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from "@angular/core";
import {AuthenticationService} from "./authentication.service";

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  let authService = inject(AuthenticationService);
  const authToken = authService.getToken();
  if(authToken != "") {
    req.headers.set("Authorization", authToken)
  }
  return next(req);
};
