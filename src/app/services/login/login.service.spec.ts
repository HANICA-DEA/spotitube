import {inject, TestBed} from '@angular/core/testing';

import {LoginService} from './login.service';
import {LoggingService} from '../logging/logging.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('LoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
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
