import { TestBed, inject } from '@angular/core/testing';

import { MyCollectionService } from './my-collection.service';

describe('MyCollectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyCollectionService]
    });
  });

  it('should be created', inject([MyCollectionService], (service: MyCollectionService) => {
    expect(service).toBeTruthy();
  }));
});
