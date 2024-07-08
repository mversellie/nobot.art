import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { ContentPageComponent } from './content-page.component';
import {ActivatedRoute} from "@angular/router";
import {BehaviorSubject, Observable, of, Subject} from "rxjs";
import {CommentSectionComponent} from "../comment-section/comment-section.component";
import {MockCommentSectionComponent} from "../mocks/components/mock-comment-section.component";
import {AvatarComponent} from "../avatar/avatar.component";
import {MockAvatarComponent} from "../mocks/components/mock-avatar.component";
import {ContentService} from "../services/content.service";
import {CommentService} from "../services/comment.service";

describe('ContentPageComponent', () => {
  let component: ContentPageComponent;
  let fixture: ComponentFixture<ContentPageComponent>;
  let contentServiceSpy: jasmine.SpyObj<ContentService>
  let commentServiceSpy: jasmine.SpyObj<CommentService>
  let paramsObs: Subject<any>

  beforeEach(async () => {
    contentServiceSpy = jasmine.createSpyObj(['getContentData'])
    commentServiceSpy = jasmine.createSpyObj(['getContentComments'])
    paramsObs =  new BehaviorSubject<any>({contentUsername : "testing",contentName:"test"})
    commentServiceSpy.getContentComments.and.returnValue(of({comments:[]}))


    await TestBed.configureTestingModule({
      imports: [ContentPageComponent], providers: [
        {provide:ActivatedRoute, useValue: {params : paramsObs}},
        {provide:CommentService, useValue: commentServiceSpy},
        {provide:ContentService, useValue: contentServiceSpy}]})
        .overrideComponent(CommentSectionComponent, {add:{imports:[MockCommentSectionComponent]},
          remove:{imports:[CommentSectionComponent]}})
        .overrideComponent(AvatarComponent, {add:{imports:[MockAvatarComponent]},
          remove:{imports:[AvatarComponent]}})
        .compileComponents();
    fixture = TestBed.createComponent(ContentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loading services', fakeAsync(() => {
    //assert
    expect(contentServiceSpy.getContentData).toHaveBeenCalledWith("testing","test")
    expect(commentServiceSpy.getContentComments).toHaveBeenCalledWith("testing/test")})
  )});
