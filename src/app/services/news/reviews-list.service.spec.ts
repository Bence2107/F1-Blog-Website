import { TestBed } from '@angular/core/testing';

import { ReviewsListService } from './reviews-list.service';

describe('ReviewsListService', () => {
  let service: ReviewsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
