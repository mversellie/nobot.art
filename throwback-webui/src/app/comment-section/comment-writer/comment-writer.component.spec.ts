import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentWriterComponent } from './comment-writer.component';
import {By} from "@angular/platform-browser";

describe('CommentWriterComponent', () => {
  let component: CommentWriterComponent;
  let fixture: ComponentFixture<CommentWriterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentWriterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommentWriterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('write a comment', async() => {
    //arrange
    const expectedValue = "aTest Comment";
    const commentBox = fixture.debugElement.query(By.css("#commentDraft")).nativeElement
    const submitButton = fixture.debugElement.query(By.css("#submit-button")).nativeElement
    component.aNewCommentFromEditor.subscribe((message) => {
      expect(message).toBe(expectedValue)
    })

    //act
    commentBox.value = expectedValue
    commentBox.dispatchEvent(new Event('input'))
    submitButton.dispatchEvent(new Event('click'))
  });
});
