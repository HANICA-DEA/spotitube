import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PlaylistOverviewComponent} from './playlists-overview.component';
import {SpotitubeAngularModule} from '../../modules/angular.module';
import {SpotitubeMaterialModule} from '../../modules/material.module';
import {PlaylistComponent} from '../playlist/playlist.component';
import {PlaylistsComponent} from '../playlists/playlists.component';
import {PlaylistService} from '../../services/playlist/playlist.service';
import {LoginService} from '../../services/login/login.service';
import {LoggingService} from '../../services/logging/logging.service';
import {MinutesPipe} from '../../pipes/minutes.pipe';
import {TrackService} from '../../services/track/track.service';

describe('PlaylistOverviewComponent', () => {
  let component: PlaylistOverviewComponent;
  let fixture: ComponentFixture<PlaylistOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({

      declarations: [
        MinutesPipe,
        PlaylistOverviewComponent,
        PlaylistComponent,
        PlaylistsComponent
      ],
      imports: [
        SpotitubeAngularModule,
        SpotitubeMaterialModule
      ],
      providers: [
        LoginService,
        LoggingService,
        PlaylistService,
        TrackService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should be created', () => {
  //   expect(component).toBeTruthy();
  // });
});
