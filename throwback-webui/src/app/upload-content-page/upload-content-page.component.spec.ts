import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadContentPageComponent } from './upload-content-page.component';

describe('UploadContentPageComponent', () => {
  let component: UploadContentPageComponent;
  let fixture: ComponentFixture<UploadContentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadContentPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadContentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
