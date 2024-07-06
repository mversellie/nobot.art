import { TestBed } from '@angular/core/testing';

import { CommentService } from './comment.service';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserService} from "./user.service";
import {environment} from "../../environments/environment";

describe('CommentService', () => {
  let service: CommentService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>
  let userServiceSpy: jasmine.SpyObj<UserService>
  let mockToken = "aToken"

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj(['get','post'])
    userServiceSpy = jasmine.createSpyObj(['getToken'])
    userServiceSpy.getToken.and.returnValue(mockToken)
    TestBed.configureTestingModule({
      providers : [{
        provide:HttpClient, useValue:httpClientSpy},
        {provide:UserService, useValue:userServiceSpy}]
      });
    service = TestBed.inject(CommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('get comments', () => {
    const threadName = "tester/aTestArt"
    service.getContentComments(threadName)
    expect(httpClientSpy.get).toHaveBeenCalledWith(`${environment["api-url"]}/content/${threadName}/comments`)
  });

  it('add a new comment', () => {
    //arrange
    const threadName = "tester/aTestArt"
    const comment = "example comment"

    //act
    service.shipContentComment(comment,threadName)

    //assert
    expect(httpClientSpy.post).toHaveBeenCalled()
    const latestCall = httpClientSpy.post.calls.first();
    console.log(latestCall)
    // @ts-ignore
    const form:FormData = latestCall.args[1];
    // @ts-ignore
    const headers:HttpHeaders = latestCall.args[2]["headers"];

    // @ts-ignore
    console.log(form)

    // @ts-ignore
    expect(comment).toEqual(form.get("comment"))
    // @ts-ignore
    expect(latestCall.args[0]).toEqual(`${environment["api-url"]}/content/${threadName}/comments`)
    expect(headers.get("authorization")).toEqual("Bearer " + mockToken)
  });
});
