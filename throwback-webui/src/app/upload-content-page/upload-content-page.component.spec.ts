import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadContentPageComponent } from './upload-content-page.component';
import {By} from "@angular/platform-browser";
import {ContentService} from "../services/content.service";
import {Router} from "@angular/router";

describe('UploadContentPageComponent', () => {
  let component: UploadContentPageComponent;
  let fixture: ComponentFixture<UploadContentPageComponent>;
  let mockContentService:jasmine.SpyObj<ContentService>;
  let mockRouter:jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj(['navigate'])
    mockContentService = jasmine.createSpyObj(['shipContentData'])
    await TestBed.configureTestingModule({
      imports: [UploadContentPageComponent],
      providers: [{provide:Router,useValue:mockRouter}, {provide: ContentService,useValue:mockContentService}]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadContentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
