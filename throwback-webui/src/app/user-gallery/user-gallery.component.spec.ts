import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGalleryComponent } from './user-gallery.component';
import {ContentService} from "../services/content.service";
import {ActivatedRoute} from "@angular/router";
import {from, of} from "rxjs";
import {ContentResponse} from "../objects/ContentResponse";
import {makeBasicContentMock} from "../mocks/ContentMocks";

describe('UserGalleryComponent', () => {
  let component: UserGalleryComponent;
  let fixture: ComponentFixture<UserGalleryComponent>;
  let contentSpy: jasmine.SpyObj<ContentService>
  const titleExpected = "test";
  const usernameExpected = "testing";
  let galleryExpected:ContentResponse;

  beforeEach(async () => {
    contentSpy = jasmine.createSpyObj(['getGalleryForUser']);
    galleryExpected = makeBasicContentMock()
    contentSpy.getGalleryForUser.and.returnValue(of([galleryExpected]))
    await TestBed.configureTestingModule({
      imports: [UserGalleryComponent],
      providers: [{provide:ActivatedRoute,useValue:{
          params:from([{contentUsername:usernameExpected,contentName:titleExpected}])
        }},{provide:ContentService,useValue: contentSpy}]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.page).toBe(1)
    expect(component.pageSize).toBe(20)
  });

  it('correctly pass to gallery child', () => {
    const gallery = component.galleryChild
    expect(gallery).toBeTruthy();
    const galleryDataActual:ContentResponse = gallery.galleryData[0]
    expect(galleryDataActual).toBe(galleryExpected)
  });
});

describe('UserGalleryComponent Page Check', () => {
  let component: UserGalleryComponent;
  let fixture: ComponentFixture<UserGalleryComponent>;
  let contentSpy: jasmine.SpyObj<ContentService>
  const titleExpected = "test";
  const usernameExpected = "testing";
  let galleryExpected:ContentResponse;

  beforeEach(async () => {
    contentSpy = jasmine.createSpyObj(['getGalleryForUser']);
    galleryExpected = makeBasicContentMock()
    contentSpy.getGalleryForUser.and.returnValue(of([galleryExpected]))
    await TestBed.configureTestingModule({
      imports: [UserGalleryComponent],
      providers: [{provide:ActivatedRoute,useValue:{
          params:from([{contentUsername:usernameExpected,contentName:titleExpected,page:"2",page_size:"5"}])
        }},{provide:ContentService,useValue: contentSpy}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('page parameters work', () => {
    expect(component.page).toBe(2)
    expect(component.pageSize).toBe(5)
  });
});
