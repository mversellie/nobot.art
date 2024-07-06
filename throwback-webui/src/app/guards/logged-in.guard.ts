import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";

export const loggedInGuard: CanActivateFn = (route, state) => {
  const loggedIn =  inject(AuthenticationService).isTokenPresentAndValid();

  if(!loggedIn){
    inject(Router).navigate(["/"])
  }

  return loggedIn
}
