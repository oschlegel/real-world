import { TestBed } from '@angular/core/testing';

import { TagDataResolver } from './tag-data.resolver';

describe('TagDataResolver', () => {
  let resolver: TagDataResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TagDataResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
