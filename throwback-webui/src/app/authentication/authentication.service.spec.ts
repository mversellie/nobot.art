import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import {OAuthService} from "angular-oauth2-oidc";

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let oauthSpy:jasmine.SpyObj<OAuthService>


  beforeEach(() => {
    oauthSpy = jasmine.createSpyObj('OAuthService', ['configure','setupAutomaticSilentRefresh',
      'loadDiscoveryDocumentAndTryLogin','revokeTokenAndLogout','initCodeFlow','refreshToken']);
    TestBed.configureTestingModule(
        {providers:[{provide:OAuthService,useValue:oauthSpy}]});
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(oauthSpy.configure).toHaveBeenCalled()
    expect(oauthSpy.setupAutomaticSilentRefresh).toHaveBeenCalled()
    expect(oauthSpy.loadDiscoveryDocumentAndTryLogin).toHaveBeenCalled()
  });


});

describe('Integration AuthenticationService', () => {
  let service: AuthenticationService;
  let oauthSpy:jasmine.SpyObj<OAuthService>


  beforeEach(() => {
    oauthSpy = jasmine.createSpyObj('OAuthService', ['configure','setupAutomaticSilentRefresh',
      'loadDiscoveryDocumentAndTryLogin','revokeTokenAndLogout','initCodeFlow','refreshToken']);
    TestBed.configureTestingModule({ providers:[{provide: OAuthService}]});
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {

  });
});
