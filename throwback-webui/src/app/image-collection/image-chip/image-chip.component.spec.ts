import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageChipComponent } from './image-chip.component';
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../environments/environment";
import {By} from "@angular/platform-browser";

describe('ImageChipComponent', () => {
  let component: ImageChipComponent;
  let fixture: ComponentFixture<ImageChipComponent>;
  let activatedRouteSpy:jasmine.SpyObj<ActivatedRoute>


    beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageChipComponent],
        providers: [{provide:ActivatedRoute,useValue:activatedRouteSpy}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageChipComponent);
    component = fixture.componentInstance;
        component.title="test"
        component.creator="testing"
        component.url_safe_title="testing"
        component.file="testing_test.png"
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 it('thumbnail should work', () => {
        const img = fixture.debugElement.query(By.css("#thumbnail a img"))
        expect(img.attributes["src"]).toBe(environment["S3-URL"] + "testing_test.png")
        const link = fixture.debugElement.query(By.css("#thumbnail a"))
        expect(link.attributes["href"]).toContain(`/testing/test`)
    });

    it('title should work', () => {
        const link = fixture.debugElement.query(By.css("#contentTitle a"));
        expect(link.attributes["href"]).toContain(`/testing/test`);
        const linkText = fixture.debugElement.query(By.css("#contentTitle a span"));
        expect(linkText.nativeElement.innerHTML.trim()).toBe("test")
    });

    it('creator should work', () => {
        const link = fixture.debugElement.query(By.css("#creatorLink"));
        expect(link.attributes["href"]).toContain(`/testing`);
        const linkText = fixture.debugElement.query(By.css("#creatorLink p"));
        expect(linkText.nativeElement.innerHTML.trim()).toBe("testing")
    });

    it('creator should hide if showCreator is false', () => {
        component.showCreator=false
        fixture.detectChanges();
        const link = fixture.debugElement.query(By.css("#creatorLink"));
        expect(link).toBeNull();
    });

});
