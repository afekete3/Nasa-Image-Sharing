import { TestBed, inject } from '@angular/core/testing';

import { CreateCollectionService } from './create-collection.service';

describe('CreateCollectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateCollectionService]
    });
  });

  it('should be created', inject([CreateCollectionService], (service: CreateCollectionService) => {
    expect(service).toBeTruthy();
  }));
});
