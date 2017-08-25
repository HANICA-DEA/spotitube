import 'hammerjs';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SpotitubeAngularModule} from './modules/angular.module';
import {SpotitubeMaterialModule} from './modules/material.module';
import {LoginComponent} from './components/login/login.component';
import {LoginService} from './services/login/login.service';
import {LoggingService} from './services/logging/logging.service';
import {PlaylistOverviewComponent} from './components/playlists-overview/playlists-overview.component';
import {PlaylistComponent} from './components/playlist/playlist.component';
import {PlaylistsComponent} from './components/playlists/playlists.component';
import {PlaylistService} from './services/playlist/playlist.service';
import {MinutesPipe} from './pipes/minutes.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PlaylistOverviewComponent,
    PlaylistComponent,
    PlaylistsComponent,
    MinutesPipe
  ],
  imports: [
    SpotitubeAngularModule,
    SpotitubeMaterialModule
  ],
  providers: [
    LoggingService,
    LoginService,
    PlaylistService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
