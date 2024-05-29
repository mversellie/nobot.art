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

  it('should generate url',  () => {
    let actualContentIdUrl = service.getContentUrlById("101");
    expect(actualContentIdUrl).toBe(window.location.protocol + "//" + window.location.host + '/assets/img/101.png');
  });


});
