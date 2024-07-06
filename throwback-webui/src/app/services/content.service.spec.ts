import {TestBed} from '@angular/core/testing';

import { ContentService } from './content.service';
import {ContentResponse} from "../objects/ContentResponse";
import {HttpClient} from "@angular/common/http";
import {UserService} from "./user.service";
import {makeBasicContentMock} from "../mocks/ContentMocks";

describe('ContentService', () => {
  let service: ContentService;
  let httpCtrl:jasmine.SpyObj<HttpClient>;
  let userSpy:jasmine.SpyObj<UserService>;


  const expectedData:ContentResponse =
      new ContentResponse("aTitle", "jack", "aTitle-jack.jpg", new Date(), "a description","aTitle")
  expectedData.createdDate = undefined;

  beforeEach(  async() => {
    TestBed.configureTestingModule({
      providers:[
        {provide: UserService, useValue:userSpy},
        {provide: HttpClient, useValue: httpCtrl}
      ]});
    service = TestBed.inject(ContentService);
    userSpy = jasmine.createSpyObj(['getToken'])
    httpCtrl = jasmine.createSpyObj(['get'])
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should get data", async () => {
    //arrange
    const username = "jack";
    const title= "aTitle"
    const contentResponse =  new Response(JSON.stringify(makeBasicContentMock()),{status:200,statusText:'OK'});
    const spy = spyOn(window,'fetch').and.returnValue(Promise.resolve(contentResponse))

    //act
    await service.getContentData(username,title)


    //assert
    const args = spy.calls.mostRecent().args
    expect(args[0]).toContain(`content/${username}/${title}`)
  });


});
