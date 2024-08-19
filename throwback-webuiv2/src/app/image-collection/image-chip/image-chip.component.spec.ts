import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageChipComponent } from './image-chip.component';

describe('ImageChipComponent', () => {
  let component: ImageChipComponent;
  let fixture: ComponentFixture<ImageChipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageChipComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImageChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
