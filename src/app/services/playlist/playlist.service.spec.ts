import {inject, TestBed} from '@angular/core/testing';

import {PlaylistService} from './playlist.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {LoginService} from '../login/login.service';
import {LoggingService} from '../logging/logging.service';

describe('PlaylistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        LoginService,
        LoggingService,
        PlaylistService
      ]
    });
  });

  it('should be created', inject([PlaylistService], (service: PlaylistService) => {
    expect(service).toBeTruthy();
  }));
});
