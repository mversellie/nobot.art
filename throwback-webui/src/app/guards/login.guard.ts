import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";

export const loginGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthenticationService);
  let pass = authService.isTokenPresentAndValid();

  console.log(state.url)
  if (state.url == "/login"){
    if(pass) {
      inject(Router).navigate(["/"])
    }
    else{
      authService.login()
    }
  }

  return !pass;
};
