import {inject, TestBed} from '@angular/core/testing';

import {LoginService} from './login.service';
import {LoggingService} from '../logging/logging.service';

describe('LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoginService,
        LoggingService
      ]
    });
  });

  it('should be created', inject([LoginService], (service: LoginService) => {
    expect(service).toBeTruthy();
  }));
});
