import {Injectable, signal, WritableSignal} from '@angular/core';
import {AuthConfig, OAuthEvent, OAuthService} from "angular-oauth2-oidc";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isLoggedIn: WritableSignal<boolean> = signal(this.oauthService.hasValidAccessToken())

  AuthCodeFlowConfig: AuthConfig;

  constructor(private oauthService: OAuthService) {
    this.AuthCodeFlowConfig= {
      issuer: environment["oauth-url"],
      redirectUri: window.location.origin + '/',
      clientId: environment["oauth-client"],responseType: 'code',
      requireHttps:false,
      scope: 'openid offline_access',
      showDebugInformation: true,
    };
    this.oauthService.configure(this.AuthCodeFlowConfig)
    this.oauthService.setupAutomaticSilentRefresh()
    this.oauthService.events.subscribe((event) => this.tokenEventHandler(event))
    this.oauthService.loadDiscoveryDocumentAndTryLogin()
  }

  login(){
    this.oauthService.initCodeFlow();
  }

  logout(){
    return this.oauthService.logOut();
  }

  getToken(){
    const id_token = this.oauthService.getAccessToken()
    return `Bearer ${id_token}`;
  }

  refreshToken() {
    return this.oauthService.refreshToken()
  }

  tokenEventHandler(event:OAuthEvent){
      this.isLoggedIn.set(this.oauthService.hasValidAccessToken())
  }

}
