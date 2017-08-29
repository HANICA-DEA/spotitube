import {inject, TestBed} from '@angular/core/testing';

import {TrackService} from './track.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {LoggingService} from '../logging/logging.service';

describe('PlaylistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        LoggingService,
        TrackService
      ]
    });
  });

  it('should be created', inject([TrackService], (service: TrackService) => {
    expect(service).toBeTruthy();
  }));
});
