import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";

export const logoutGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthenticationService);

  let pass = authService.isTokenPresentAndValid();

  if(pass){
    authService.logout()
  }

  return pass;
};
