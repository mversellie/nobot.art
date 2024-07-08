import {computed, Injectable, Signal} from '@angular/core';
import  {jwtDecode, JwtPayload} from "jwt-decode";
import {AuthenticationService} from "../authentication/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  idToken: Signal<string | null> = computed(() => {
    if(this.authService.isLoggedIn()) {
      return this.authService.getToken()
    }
    else{
      return null
    }
  })
  tokenData:Signal<JwtPayload |null> = computed(() => {
    if(this.idToken() != null){
      return this.unwrapTokenData(this.idToken() )
    }
    else{
      return null
    }
  })
  username: Signal<string> = computed(() => {
    if(this.tokenData() != null) {
      // @ts-ignore
      return this.tokenData()['preferred_username']
    }
    else {
      return ''
    }})

  constructor(private authService:AuthenticationService){}

  unwrapTokenData(token:any):JwtPayload{
    return jwtDecode<JwtPayload>(token)
  }

  getToken(){
    let ret = this.authService.getToken();
    if(ret != null){
      return `${ret}`
    }
    else{
      return ""
    }
  }
}
