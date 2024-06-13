import {Injectable, signal, WritableSignal} from '@angular/core';
import {AuthConfig, OAuthService} from "angular-oauth2-oidc";
import { fromEvent} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isLoggedIn: WritableSignal<boolean> = signal(this.isTokenPresentAndValid())

  AuthCodeFlowConfig: AuthConfig = {
    // Url of the Identity Provider
    issuer: 'https://localhost:8443/realms/throwback-art',

    // URL of the SPA to redirect the user to after login
    redirectUri: window.location.origin + '/',

    // The SPA's id. The SPA is registerd with this id at the auth-server
    // clientId: 'server.code',
    clientId: 'throwback-spa',

    // Just needed if your auth server demands a secret. In general, this
    // is a sign that the auth server is not configured with SPAs in mind
    // and it might not enforce further best practices vital for security
    // such applications.
    // dummyClientSecret: 'secret',

    responseType: 'code',
    requireHttps:false,

    // set the scope for the permissions the client should request
    // The first four are defined by OIDC.
    // Important: Request offline_access to get a refresh token
    // The api scope is a usecase specific one
    scope: 'openid offline_access',

    showDebugInformation: true,
  };

  constructor(private oauthService: OAuthService) {
    fromEvent<StorageEvent>(window, "storage").subscribe((event:StorageEvent) => {
      if((event.storageArea === sessionStorage) && (event.key === "id_token")){
        console.log("updating is logged in")
        this.isLoggedIn.set(!(event.newValue == undefined || event.newValue == null))
      }}
    )
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
