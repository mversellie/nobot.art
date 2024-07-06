import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarComponent } from './avatar.component';
import {ActivatedRoute} from "@angular/router";
import {By} from "@angular/platform-browser";
import {environment} from "../../environments/environment";

describe('AvatarComponent', () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvatarComponent],
      providers: [{provide:ActivatedRoute,useValue:{}}]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('generates correct link with username', () => {
    component.username="testing"
    fixture.detectChanges();
    const link = fixture.debugElement.query(By.css("#imageLink"))
    expect(link.properties["href"]).toContain("/testing");
  });

  it('generates correct image with default', () => {
    const pic = fixture.debugElement.query(By.css("#profile-pic"))
    expect(pic.properties["src"]).toBe("/img/default-avatar.png");
  });

  it('generates correct image with username', async () => {
    component.username="testing"
    fixture.detectChanges();
    const pic = fixture.debugElement.query(By.css("#profile-pic"))
    expect(pic.properties["src"]).toBe(`${environment["S3-URL"]}pfp-testing.png`);
  });

});