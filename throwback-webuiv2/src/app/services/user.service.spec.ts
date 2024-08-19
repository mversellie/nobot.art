import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AuthenticationService} from "../authentication/authentication.service";
import {DirectGrantAuthenticationService} from "../mocks/services/direct-grant-authentication.service";

describe('UserService', () => {
  let service: UserService;
  let auth:AuthenticationService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],providers:[
        {provide: AuthenticationService, useClass:DirectGrantAuthenticationService}
      ]});
    service = TestBed.inject(UserService);
    auth = TestBed.inject(AuthenticationService);
    //DirectGrantAuthenticationService is specifically modified to return a promise instead of void
    await auth.login()
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('signal works', () => {
    expect(service.idToken()).toBeDefined();
    expect(service.username()).toBeDefined();
    expect(service.tokenData()).toBeDefined();
  });


  it('signal works on logout', async () => {
    //DirectGrantAuthenticationService is specifically modified to return a promise instead of void
    const worked = await auth.logout()
    expect(service.idToken()).toBeNull();
    expect(service.username()).toBe("");
    expect(service.tokenData()).toBeNull();
  });
});
