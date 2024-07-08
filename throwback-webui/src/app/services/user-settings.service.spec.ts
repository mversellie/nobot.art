import { TestBed } from '@angular/core/testing';
import {UserSettingsService} from "./user-settings.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {UserService} from "./user.service";

describe('UserSettingsService', () => {
  let service: UserSettingsService;
  let userSpy: jasmine.SpyObj<UserService>;
  let httpSpy: jasmine.SpyObj<HttpClient>;
  let authToken:string = "aToken";

  beforeEach(() => {
    userSpy = jasmine.createSpyObj(["getToken"]);
    userSpy.getToken.and.returnValue(authToken)
    httpSpy = jasmine.createSpyObj(['put'])
    TestBed.configureTestingModule({providers:[
        {provide:UserService, useValue:userSpy},
        {provide: HttpClient, useValue:httpSpy}]});
    service = TestBed.inject(UserSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should ship', () => {
    const inFile:File = new File([],"hello")
    const item = (indexboi:number) => {return inFile}


    // @ts-ignore
    service.shipSettingsUpdate({"item":item})
    expect(httpSpy.put).toHaveBeenCalled()
    const call = httpSpy.put.calls.mostRecent()


    expect(call.args[0]).toBe(environment["api-url"] + "/users")
  });
});
