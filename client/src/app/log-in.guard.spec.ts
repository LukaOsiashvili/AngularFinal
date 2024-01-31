import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { LogInGuard } from './log-in.guard';

describe('logInGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => LogInGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
