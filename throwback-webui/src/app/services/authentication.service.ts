import {Injectable, signal, WritableSignal} from '@angular/core';
import {AuthConfig, OAuthService} from "angular-oauth2-oidc";
import { fromEvent} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isLoggedIn: WritableSignal<boolean> = signal(this.isTokenPresentAndValid())

  AuthCodeFlowConfig: AuthConfig;

  constructor(private oauthService: OAuthService) {
    fromEvent<StorageEvent>(window, "storage").subscribe((event:StorageEvent) => {
      if((event.storageArea === sessionStorage) && (event.key === "id_token")){
        console.log("updating is logged in")
        this.isLoggedIn.set(!(event.newValue == undefined || false))
      }}
    )
    this.AuthCodeFlowConfig= {
      issuer: environment["oauth-url"],
      redirectUri: window.location.origin + '/',
      clientId: environment["oauth-client"],responseType: 'code',
      requireHttps:false,
      scope: 'openid offline_access',

      showDebugInformation: true,
    };
    this.oauthService.configure(this.AuthCodeFlowConfig)
    this.oauthService.loadDiscoveryDocumentAndTryLogin()
  }

  login(){
    this.oauthService.initCodeFlow();
    if(this.isTokenPresentAndValid()){
      this.isLoggedIn.set(true)
    }
  }

  logout(){
    this.oauthService.revokeTokenAndLogout().then((result) => console.log(result));
  }


  isTokenPresentAndValid(){
    return !(undefined == sessionStorage.getItem("id_token") || null == sessionStorage.getItem("id_token"))
  }

  getToken(){
    return "Bearer " + sessionStorage.getItem("id_token");
  }

}
