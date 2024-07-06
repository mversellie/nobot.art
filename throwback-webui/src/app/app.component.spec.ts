import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {UserService} from "./services/user.service";
import {ActivatedRoute} from "@angular/router";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent], providers: [{provide:UserService,useValue:{username:() => {return "testing"}}},
        {provide:ActivatedRoute,useValue:{}}]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should pass the correct username to sub components`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.headerComponent.username).toEqual("testing")
    expect(app.sideComponent.username).toEqual("testing")
  });
});
