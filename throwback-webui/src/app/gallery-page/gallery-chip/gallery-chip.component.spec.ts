import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryChipComponent } from './gallery-chip.component';

describe('GalleryChipComponent', () => {
  let component: GalleryChipComponent;
  let fixture: ComponentFixture<GalleryChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalleryChipComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GalleryChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
