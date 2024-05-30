import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentPageComponent } from './content-page.component';
import {ActivatedRoute} from "@angular/router";
import { of} from "rxjs";
import { provideHttpClient} from "@angular/common/http";

describe('ContentPageComponent', () => {
  let component: ContentPageComponent;
  let fixture: ComponentFixture<ContentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentPageComponent], providers: [ provideHttpClient(),{provide:ActivatedRoute, useValue:
          {params :  of(
            {contentItemId : "12"}
              )
          }}]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
