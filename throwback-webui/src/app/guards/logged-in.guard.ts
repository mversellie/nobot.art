import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthenticationService} from "../services/authentication.service";

export const loggedInGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthenticationService);

  let pass = authService.isTokenPresentAndValid();

  console.log(state.url)
  if (state.url == "/login"){
    if(pass) {
      inject(Router).navigate(["/"])
    }
    return !pass;
  }

  if(!pass){
    authService.login()
  }

  return pass;
}
