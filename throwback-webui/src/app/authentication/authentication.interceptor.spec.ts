import { TestBed } from '@angular/core/testing';
import {HttpHeaders, HttpInterceptorFn, HttpRequest} from '@angular/common/http';

import { authenticationInterceptor } from './authentication.interceptor';
import {AuthenticationService} from "./authentication.service";
import {OAuthStorage} from "angular-oauth2-oidc";

describe('authenticationInterceptor', () => {
  let headersSpy:jasmine.SpyObj<HttpHeaders>
  let oAuthSpy:jasmine.SpyObj<OAuthStorage>
  let nextFunction:jasmine.Spy = jasmine.createSpy()
  const interceptor: HttpInterceptorFn = (req, aFunction) =>
    TestBed.runInInjectionContext(() => authenticationInterceptor(req, aFunction));

  beforeEach(() => {
      oAuthSpy = jasmine.createSpyObj(["getItem"]);
    headersSpy = jasmine.createSpyObj(["set"]);
    TestBed.configureTestingModule({providers:[{provide:OAuthStorage,useValue:oAuthSpy}]});
  });

  it('should set req', () => {
    //arrange
    oAuthSpy.getItem.and.returnValue("testToken");
    //act
    // @ts-ignore
    interceptor({url:"/nonsense",headers:headersSpy,clone: () => {return this} },nextFunction)

    //assert
    expect(headersSpy.set).toHaveBeenCalledWith("Authorization","Bearer testToken")
    expect(nextFunction).toHaveBeenCalled();
  });


    it('should skip on login', () => {
        //act
        // @ts-ignore
        interceptor({url:"/login",headers:headersSpy,clone: () => {return this} },nextFunction)

        //assert
        expect(headersSpy.set).not.toHaveBeenCalled()
        expect(oAuthSpy.getItem).not.toHaveBeenCalled()
    });

    it('should skip on logout', () => {
        //act
        // @ts-ignore
        interceptor({url:"/logout",headers:headersSpy,clone: () => {return this} },nextFunction)

        //assert
        expect(headersSpy.set).not.toHaveBeenCalled()
        expect(oAuthSpy.getItem).not.toHaveBeenCalled()
    });
});
