import { TestBed } from '@angular/core/testing';

import { ContentGetterService } from './content-getter.service';

describe('ContentGetterService', () => {
  let service: ContentGetterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentGetterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
