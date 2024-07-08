import {Injectable, signal, WritableSignal} from '@angular/core';
import {environment} from "../../../environments/environment.testing";

//This service should only be used in testing
@Injectable({
  providedIn: 'root'
})
export class DirectGrantAuthenticationService {

  isLoggedIn: WritableSignal<boolean>

  constructor() {
    // @ts-ignore
    const isTest = environment["isTest"];
    if(!isTest){
      throw new Error("You should only be using Direct Grant Authentication in test")
    }
    this.isLoggedIn = signal(this.isTokenPresentAndValid())
  }

  login(){
    const body:URLSearchParams = new URLSearchParams();
    // @ts-ignore
    body.append("username",environment["keycloak_user"] as string);
    // @ts-ignore
    body.append("password", environment["keycloak_password"]);
    body.append("client_id",environment["oauth-client"]);
    body.append("grant_type","password");
    const loginUrl = `${environment["oauth-url"]}/protocol/openid-connect/token`

    return fetch(loginUrl,{method:"POST",body:body}).then(res1  => {return res1.json()}).then(res => {
      // @ts-ignore
      const access:string = res["access_token"]
      // @ts-ignore
      const refresh:string = res["refresh_token"]
      sessionStorage.setItem("access_token",access)
      sessionStorage.setItem("id_token",access)
      sessionStorage.setItem("refresh_token",refresh)
      this.isLoggedIn.set(true)
    }).catch((hello) =>  console.log(hello))
  }

  logout(){
    const body:URLSearchParams = new URLSearchParams();

    const refreshToken = sessionStorage.getItem("refresh_token");

    if(!refreshToken){
      console.log("refresh token not found logging out on frontend")
      this.shredTokens()
      this.isLoggedIn.set(false)
      return
    }

    body.append("refresh_token",refreshToken);
    body.append("client_id",environment["oauth-client"]);
    const logoutUrl = `${environment["oauth-url"]}/protocol/openid-connect/logout`
    return fetch(logoutUrl,{method:"POST",body:body}).then((res) => {
      this.shredTokens()
      this.isLoggedIn.set(false)
      return res.ok})
    .catch((hello) => console.log("error?---" + hello))
  }

  shredTokens() {
    sessionStorage.removeItem("access_token")
    sessionStorage.removeItem("id_token")
    sessionStorage.removeItem("refresh_token")
  }

  isTokenPresentAndValid(){
    return !(undefined == sessionStorage.getItem("id_token") || null == sessionStorage.getItem("id_token"))
  }

  getToken(){
    return "Bearer " + sessionStorage.getItem("access_token");
  }

}
