import {async, TestBed} from '@angular/core/testing';

import {AppComponent} from './app.component';
import {LoginService} from './services/login/login.service';
import {SpotitubeAngularModule} from './modules/angular.module';
import {SpotitubeMaterialModule} from './modules/material.module';
import {LoginComponent} from './components/login/login.component';
import {LoggingService} from './services/logging/logging.service';
import {PlaylistOverviewComponent} from './components/playlists-overview/playlists-overview.component';
import {PlaylistsComponent} from './components/playlists/playlists.component';
import {PlaylistComponent} from './components/playlist/playlist.component';
import {MinutesPipe} from './pipes/minutes.pipe';
import {PlaylistService} from './services/playlist/playlist.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        LoginComponent,
        MinutesPipe,
        PlaylistOverviewComponent,
        PlaylistsComponent,
        PlaylistComponent
      ],
      imports: [
        SpotitubeAngularModule,
        SpotitubeMaterialModule
      ],
      providers: [
        LoginService,
        LoggingService,
        PlaylistService
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
