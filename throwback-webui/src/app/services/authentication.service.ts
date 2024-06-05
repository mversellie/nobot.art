import {Injectable, signal, Signal} from '@angular/core';
import {AuthConfig, OAuthService} from "angular-oauth2-oidc";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isLoggedIn:Signal<boolean>

  AuthCodeFlowConfig: AuthConfig = {
    // Url of the Identity Provider
    issuer: 'https://keycloak.burgerspace.net:8443/realms/throwback-art',

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
    this.oauthService.configure(this.AuthCodeFlowConfig)
    this.oauthService.loadDiscoveryDocumentAndTryLogin()
    this.isLoggedIn = signal(this.isTokenPresentAndValid())
    console.log("is loggedIn:" + this.isLoggedIn())
  }

  login(){
    this.oauthService.initCodeFlow();
  }


  isTokenPresentAndValid(){
    console.log("token:" + sessionStorage.getItem("id_token"))
    return undefined != sessionStorage.getItem("id_token") || null != sessionStorage.getItem("id_token")
  }

}
