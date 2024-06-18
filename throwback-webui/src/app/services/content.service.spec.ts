import {TestBed} from '@angular/core/testing';

import { ContentService } from './content.service';
import {ContentResponse} from "../objects/ContentResponse";
import {provideHttpClient} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

import {MockAuthenticationService} from "./mock-authentication.service";
import {ApplicationInitStatus} from "@angular/core";
import {AuthenticationService} from "./authentication.service";
import {environment} from "../../environments/environment";

describe('ContentService', () => {
  let service: ContentService;
  let httpCtrl:HttpTestingController;
  let expectedBaseApiUrl = environment["api-url"]


  const expectedData:ContentResponse =
      new ContentResponse("aTitle", "jack", "aTitle-jack.jpg", new Date(), "a description")
  expectedData.createdDate = undefined;

  beforeEach(  async() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],providers:[
        {provide: AuthenticationService, useClass:MockAuthenticationService},
        provideHttpClient(),
      ]});

    await TestBed.inject(ApplicationInitStatus).donePromise;
    service = TestBed.inject(ContentService);
    httpCtrl = TestBed.inject(HttpTestingController);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should get data", () => {
    const username = "jack";
    const title= "aTitle"
    service.getContentData(username, title).subscribe(
        (data) => {
          expect(data).toEqual(expectedData)}
    )
    const testUrl = expectedBaseApiUrl + "/content/" + username + "/" + title
    const mockApi = httpCtrl.expectOne(testUrl);
    mockApi.flush({body:expectedData});
  });


});
