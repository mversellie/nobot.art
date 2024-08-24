import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthenticationService} from "../authentication/authentication.service";
import {UserService} from "../services/user.service";

export const currentUserGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = inject(AuthenticationService).isLoggedIn()
  const username = inject(UserService).username()
  const router = inject(Router)
  if(isLoggedIn && username == route.paramMap.get("contentUsername")){
    return true
  }

  router.navigateByUrl("/")
  return false
};
