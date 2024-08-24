import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscourseHtmlScrubberComponent } from './discourse-html-scrubber.component';

describe('HtmlScrubberComponent', () => {
  let component: DiscourseHtmlScrubberComponent;
  let fixture: ComponentFixture<DiscourseHtmlScrubberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscourseHtmlScrubberComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DiscourseHtmlScrubberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
