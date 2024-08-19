import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthenticationService} from "../authentication/authentication.service";

export const logoutGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthenticationService);

  return authService.isLoggedIn();
};
