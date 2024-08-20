import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthenticationService} from "../authentication/authentication.service";

export const loggedInGuard: CanActivateFn = (route, state) => {
  const loggedIn =  inject(AuthenticationService).isLoggedIn();

  if(!loggedIn){
    inject(Router).navigate(["/login"])
  }

  return loggedIn
}
