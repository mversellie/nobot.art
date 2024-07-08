import { TestBed } from '@angular/core/testing';
import {HttpHeaders, HttpInterceptorFn, HttpRequest} from '@angular/common/http';

import { authenticationInterceptor } from './authentication.interceptor';
import {AuthenticationService} from "./authentication.service";

describe('authenticationInterceptor', () => {
  let authServiceSpy:jasmine.SpyObj<AuthenticationService>
  let headersSpy:jasmine.SpyObj<HttpHeaders>
  let nextFunction:jasmine.Spy = jasmine.createSpy()
  const interceptor: HttpInterceptorFn = (req, aFunction) =>
    TestBed.runInInjectionContext(() => authenticationInterceptor(req, aFunction));

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj(["getToken"])
    headersSpy = jasmine.createSpyObj(["set"])
    TestBed.configureTestingModule({providers:[{provide:AuthenticationService,useValue:authServiceSpy}]});
  });

  it('should set req', () => {
    //arrange
    authServiceSpy.getToken.and.returnValue("Bearer testToken")
    //act
    // @ts-ignore
    interceptor({headers:headersSpy},nextFunction)

    //assert
    expect(headersSpy.set).toHaveBeenCalledWith("Authorization","Bearer testToken")
    expect(nextFunction).toHaveBeenCalled();
  });
});
