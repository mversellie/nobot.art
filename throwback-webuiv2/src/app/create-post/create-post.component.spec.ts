import { ComponentFixture, TestBed } from '@angular/core/testing';

import {ContentService} from "../services/content.service";
import {Router} from "@angular/router";
import {CreatePostComponent} from "./create-post.component";

describe('UploadContentPageComponent', () => {
  let component: CreatePostComponent;
  let fixture: ComponentFixture<CreatePostComponent>;
  let mockContentService:jasmine.SpyObj<ContentService>;
  let mockRouter:jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj(['navigate'])
    mockContentService = jasmine.createSpyObj(['shipContentData'])
    await TestBed.configureTestingModule({
      imports: [CreatePostComponent],
      providers: [{provide:Router,useValue:mockRouter}, {provide: ContentService,useValue:mockContentService}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
