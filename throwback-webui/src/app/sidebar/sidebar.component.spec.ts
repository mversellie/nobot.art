import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import {AuthenticationService} from "../services/authentication.service";
import {MockAuthenticationService} from "../services/mock-authentication.service";
import {UserService} from "../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {MockUserService} from "../services/mock-user.service";
import {By} from "@angular/platform-browser";

describe('SidebarComponent logged out mode', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let authService:AuthenticationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent],
      providers:[{provide:AuthenticationService,useClass:MockAuthenticationService},
        {provide:UserService,useValue:MockUserService}, {provide:ActivatedRoute,useValue: {}}]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarComponent);
    authService = TestBed.inject(AuthenticationService)
    component = fixture.componentInstance;
    authService.isLoggedIn.set(false)
    fixture.detectChanges();
  });
  it('login link shown', () => {
    const link = fixture.debugElement.query(By.css("#sidebar-login-link"))
    expect(link.properties["href"]).toContain("/login")
  });


  it('user loggedin section hidden', () => {
    const userLink = fixture.debugElement.query(By.css("#sidebar-user-section"))
    expect(userLink).toBeNull()
  });


});

describe('SidebarComponent logged in mode', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let userService:UserService;
  let authService:AuthenticationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent],
      providers:[{provide:AuthenticationService,useClass:MockAuthenticationService},
        {provide:UserService,useValue:MockUserService}, {provide:ActivatedRoute,useValue: {}}]
    })
        .compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    component.username="testing"
    fixture.detectChanges();
  });

  it('login link hidden', () => {
    const link = fixture.debugElement.query(By.css("#sidebar-logout-link"))
    expect(link).toBeNull()
  });


  it('user loggedin section shows', () => {
    const userLink = fixture.debugElement.query(By.css("#sidebar-user-link"))
    expect(userLink.properties["href"]).toContain("/testing")
  });
});
