import { TestBed } from '@angular/core/testing';

import { ContentGetterService } from './content-getter.service';
import {ContentResponse} from "../objects/ContentResponse";

describe('ContentGetterService', () => {
  let service: ContentGetterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentGetterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should get Data", async () => {
    service.getContentData("22").then((data) =>
        expect(data).toEqual(new ContentResponse("aTitle","aCreator",
        window.location.protocol + "//" + window.location.host + "/assets/img/22.png",
        window.location.protocol + "//" + window.location.host + "/assets/img/thumb-22.png",
        data.createdDate,"desc","22")))
  });


});
