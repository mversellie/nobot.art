import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutPageComponent } from './logout-page.component';
import {OAuthService} from "angular-oauth2-oidc";
import Jasmine = jasmine.Jasmine;
import Spy = jasmine.Spy;
import {AuthenticationService} from "../authentication/authentication.service";

describe('LogoutPageComponent', () => {
  let component: LogoutPageComponent;
  let fixture: ComponentFixture<LogoutPageComponent>;
  let mockOauth:jasmine.SpyObj<AuthenticationService>;

  beforeEach(async () => {
      mockOauth = jasmine.createSpyObj("AuthenticationService",["logout"])
    await TestBed.configureTestingModule({
      imports: [LogoutPageComponent],
        providers: [{provide:AuthenticationService,useValue:mockOauth}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoutPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
