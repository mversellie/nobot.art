import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import {ActivatedRoute} from "@angular/router";
import {By} from "@angular/platform-browser";

describe('SidebarComponent logged out mode', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent],
      providers:[{provide:ActivatedRoute,useValue: {}}]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    component.username=""
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent],
      providers:[{provide:ActivatedRoute,useValue: {}}]
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
