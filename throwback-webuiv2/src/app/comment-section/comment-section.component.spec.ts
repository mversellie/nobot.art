import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentSectionComponent } from './comment-section.component';
import {NobotComment} from "../objects/CommentPojo";
import { ActivatedRoute } from '@angular/router';
import {from} from "rxjs";
import {By} from "@angular/platform-browser";

describe('CommentSectionComponent Single', () => {
      let component: CommentSectionComponent;
      let fixture: ComponentFixture<CommentSectionComponent>;
    const contentExpected = "a comment";
    const usernameExpected = "testing";
    let expectedDate:string;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentSectionComponent],
        providers: [{provide:ActivatedRoute,useValue:{
                params:from([{contentUsername:usernameExpected,contentName:"test"}])}}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

      let comment:NobotComment = new NobotComment()
      comment.content = contentExpected
      comment.username = usernameExpected
      component.threadName = `${usernameExpected}/test`
      expectedDate = "fuckit"
      comment.created= expectedDate
      component.comments = [comment]
      fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    it('should create avatar img', () => {
        const avatarImage = fixture.debugElement.query(By.css(".user-pfp-img"))
        expect(avatarImage.properties["src"]).toContain(`pfp-${usernameExpected}.png`);
    });

    it('should render links', () => {
        const expectedUrl = `/${usernameExpected}`
        const link = fixture.debugElement.query(By.css(".username-link"))
        expect(link.properties["href"]).toContain(expectedUrl)
        const linkImg = fixture.debugElement.query(By.css(".username-pfp-link"))
        expect(linkImg.properties["href"]).toContain(expectedUrl)
    });

    it('should render content', () => {
        const link = fixture.debugElement.query(By.css(".content-section"))
        expect(link.nativeElement.innerHTML).toContain(`${contentExpected}`)
    });

    it('write a comment', async() => {
        //arrange
        const expectedValue = "aTest Comment";
        const commentBox = fixture.debugElement.query(By.css("#new-comment-area")).nativeElement
        const submitButton = fixture.debugElement.query(By.css("#post-comment-button")).nativeElement
        component.draftedComment=expectedValue
        spyOn(component.writeNewComment,"emit");

        //act
        commentBox.value = expectedValue
        submitButton.dispatchEvent(new Event('click'))

        //assert
        expect(component.writeNewComment.emit).toHaveBeenCalledWith(expectedValue)
    });
});
