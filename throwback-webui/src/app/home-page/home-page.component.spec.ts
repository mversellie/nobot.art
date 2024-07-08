import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import {GalleryComponent} from "../gallery/gallery.component";
import {MockGalleryComponent} from "../mocks/components/mock-gallery/mock-gallery.component";
import {ActivatedRoute} from "@angular/router";
import {ContentService} from "../services/content.service";

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;
  let activatedRouteSpy : jasmine.SpyObj<ActivatedRoute>
  let contentServiceMock:jasmine.SpyObj<ContentService>

  beforeEach(async () => {
    activatedRouteSpy = jasmine.createSpyObj(["useless"])
    contentServiceMock = jasmine.createSpyObj(["getLatest"])
    await TestBed.configureTestingModule({
      providers: [{provide:ActivatedRoute,useValue:activatedRouteSpy},
        {provide:ContentService, useValue:contentServiceMock}],
      imports: [HomePageComponent]
    })
        .overrideComponent(GalleryComponent,
            {remove:{imports:[GalleryComponent]},
            add:{imports:[MockGalleryComponent]}})
    .compileComponents();
    
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should call contentservice and set gallery data', () => {
    expect(component).toBeFalsy();
  });

});
