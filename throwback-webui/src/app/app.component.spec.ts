import {ComponentFixture, TestBed} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {UserService} from "./services/user.service";
import {ActivatedRoute} from "@angular/router";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {MockSidebarComponent} from "./mocks/components/mock-sidebar.component";
import {HeaderComponent} from "./header/header.component";
import {MockHeaderComponent} from "./mocks/components/mock-header.component";

describe('AppComponent', () => {
  let fixture:ComponentFixture<AppComponent>
  let app:AppComponent
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent], providers: [{provide:UserService,useValue:{username:() => {return "testing"}}},
        {provide:ActivatedRoute,useValue:{}}]})
        .overrideComponent(SidebarComponent,{remove:{imports:[SidebarComponent]},
          add:{imports:[MockSidebarComponent]}})
        .overrideComponent(HeaderComponent,{remove:{imports:[HeaderComponent]},
          add:{imports:[MockHeaderComponent]}})
        .compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.autoDetectChanges()
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should pass the correct username to sub components`, () => {
    expect(app.headerComponent.username).toEqual("testing")
    expect(app.sideComponent.username).toEqual("testing")
  });
});
