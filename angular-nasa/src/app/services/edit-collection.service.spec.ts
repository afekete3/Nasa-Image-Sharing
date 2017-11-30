import { TestBed, inject } from '@angular/core/testing';

import { EditCollectionService } from './edit-collection.service';

describe('EditCollectionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EditCollectionService]
    });
  });

  it('should be created', inject([EditCollectionService], (service: EditCollectionService) => {
    expect(service).toBeTruthy();
  }));
});
