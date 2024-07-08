import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryChipComponent } from './gallery-chip.component';
import {ActivatedRoute} from "@angular/router";
import {environment} from "../../../environments/environment";
import {By} from "@angular/platform-browser";

describe('GalleryChipComponent', () => {
  let component: GalleryChipComponent;
  let fixture: ComponentFixture<GalleryChipComponent>;
  let activatedRouteSpy:jasmine.SpyObj<ActivatedRoute>

  beforeEach(async () => {
    activatedRouteSpy = jasmine.createSpyObj(["route"])
    await TestBed.configureTestingModule({
      imports: [GalleryChipComponent],
      providers: [{provide:ActivatedRoute,useValue:activatedRouteSpy}]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GalleryChipComponent);
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
    expect(link.nativeElement.innerHTML).toBe("test")
  });

  it('creator should work', () => {
    const link = fixture.debugElement.query(By.css("#creatorLink a"));
    expect(link.attributes["href"]).toContain(`/testing`);
    expect(link.nativeElement.innerHTML).toBe("testing")
  });



});
