import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { currentUserGuard } from './current-user.guard';

describe('currentUserGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => currentUserGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
