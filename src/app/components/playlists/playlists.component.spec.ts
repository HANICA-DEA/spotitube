import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PlaylistsComponent} from './playlists.component';
import {SpotitubeMaterialModule} from '../../modules/material.module';
import {PlaylistService} from '../../services/playlist/playlist.service';
import {SpotitubeAngularModule} from '../../modules/angular.module';
import {LoginService} from '../../services/login/login.service';
import {LoggingService} from '../../services/logging/logging.service';
import {MinutesPipe} from '../../pipes/minutes.pipe';

describe('PlaylistsComponent', () => {
  let component: PlaylistsComponent;
  let fixture: ComponentFixture<PlaylistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SpotitubeAngularModule,
        SpotitubeMaterialModule
      ],
      declarations: [
        MinutesPipe,
        PlaylistsComponent
      ],
      providers: [
        LoginService,
        LoggingService,
        PlaylistService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
