import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSettingsPageComponent } from './user-settings-page.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {AuthenticationService} from "../authentication/authentication.service";
import {MockAuthenticationService} from "../mocks/services/mock-authentication.service";

describe('UserSettingsPageComponent', () => {
  let component: UserSettingsPageComponent;
  let fixture: ComponentFixture<UserSettingsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule(
    {
      imports:[HttpClientTestingModule,UserSettingsPageComponent],providers:[
      {provide: AuthenticationService, useClass:MockAuthenticationService}
    ]})
    .compileComponents();
    
    fixture = TestBed.createComponent(UserSettingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
