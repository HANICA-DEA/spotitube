import {inject, TestBed} from '@angular/core/testing';

import {RestfulSpotitubeClientService} from './restful-spotitube-client.service';
import {LoggingService} from '../logging/logging.service';

describe('RestfulSpotitubeClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RestfulSpotitubeClientService,
        LoggingService
      ]
    });
  });

  it('should be created', inject([RestfulSpotitubeClientService], (service: RestfulSpotitubeClientService) => {
    expect(service).toBeTruthy();
  }));
});
