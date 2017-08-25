import {MinutesPipe} from './minutes.pipe';
import {inject, TestBed} from '@angular/core/testing';

describe('MinutesPipe', () => {

  let pipe;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      MinutesPipe
    ]
  }));

  beforeEach(inject([MinutesPipe], p => {
    pipe = p;
  }));

  it('should be created', () => {
    expect(pipe).toBeTruthy();
  });

  it('should convert 0 to 00:00:00', () => {
    expect(pipe.transform(0)).toEqual('00:00:00');
  });

  it('should convert 60 to 00:01:00', () => {
    expect(pipe.transform(60)).toEqual('00:01:00');
  });
});
