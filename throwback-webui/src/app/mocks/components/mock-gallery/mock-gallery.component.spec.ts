import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockGalleryComponent } from './mock-gallery.component';

describe('MockGalleryComponent', () => {
  let component: MockGalleryComponent;
  let fixture: ComponentFixture<MockGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockGalleryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MockGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
