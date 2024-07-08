import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleCommentComponent } from './single-comment.component';
import {ActivatedRoute} from "@angular/router";
import {from} from "rxjs";
import {NobotComment} from "../CommentPojo";
import {By} from "@angular/platform-browser";
import {DateComponent} from "../../date/date.component";
import {AvatarComponent} from "../../avatar/avatar.component";
import {MockAvatarComponent} from "../../mocks/components/mock-avatar.component";
import { MockDateComponent } from '../../mocks/components/mock-date.component';

describe('SingleCommentComponent', () => {
  let component: SingleCommentComponent;
  let fixture: ComponentFixture<SingleCommentComponent>;
  const contentExpected = "a comment";
  const usernameExpected = "testing";
  let expectedDate:string;


  beforeEach( async () => {
    // @ts-ignore
    await TestBed.configureTestingModule({
      imports:[SingleCommentComponent],
      providers: [{provide:ActivatedRoute,useValue:{
        params:from([{contentUsername:usernameExpected,contentName:"test"}])}}]
    })
        .overrideComponent(SingleCommentComponent, {remove: { imports : [AvatarComponent]},add : {imports: [MockAvatarComponent]}
    })
        .overrideComponent(SingleCommentComponent, {
          remove: {imports: [DateComponent]}, add: {imports: [MockDateComponent]}
        })
    .compileComponents();
    
    fixture = TestBed.createComponent(SingleCommentComponent);
    component = fixture.componentInstance;
    let comment:NobotComment = new NobotComment()
    comment.content = contentExpected
    comment.username = usernameExpected
    comment.thread = `${usernameExpected}/test`
    expectedDate = "fuckit"
    comment.posted= expectedDate
    component.comment = comment
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should create avatar', () => {
    const avatar = component.avatar
    expect(avatar.username).toBe(usernameExpected);
    expect(avatar.username).toBe(usernameExpected);
    expect(avatar.username).toBe(usernameExpected);
  });

  it('should render link', () => {
    const link = fixture.debugElement.query(By.css("#username-link"))
    expect(link.properties["href"]).toContain(`${usernameExpected}`)
    expect(link.nativeElement.innerHTML).toContain(`${usernameExpected}`)
  });

  it('should render content', () => {
    const link = fixture.debugElement.query(By.css("#content-box"))
    expect(link.nativeElement.innerHTML).toContain(`${contentExpected}`)
  });


});
