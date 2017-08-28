import {Component, OnInit} from '@angular/core';
import {LoginService} from './services/login/login.service';
import {MdSnackBar} from '@angular/material';
import {Settings} from './models/settings/settings.interface.model';
import {PlaylistService} from './services/playlist/playlist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public serverUrl: string;
  public user: string;

  constructor(private loginService: LoginService, private playlistService: PlaylistService, public snackBar: MdSnackBar) {
  }

  ngOnInit(): void {
    this.initSettings();
    this.initErrorSnackbar();
  }

  /**
   * Logout of the application.
   */
  public logout(): void {
    this.loginService.logout();
  }

  private initErrorSnackbar(): void {
    this.loginService.restError$.subscribe(error => this.showError(error));
    this.playlistService.restError$.subscribe(error => this.showError(error));
  }

  private initSettings(): void {
    this.loginService.getSettings()
      .then(settings => this.setSettings(settings))
      .catch(any => this.setSettings(undefined));
    this.loginService.settingsChanged$.subscribe(settings => this.setSettings(settings));
  }

  private setSettings(settings: Settings): void {
    if (settings) {
      this.serverUrl = settings.server;
      this.user = settings.user;
    } else {
      this.serverUrl = undefined;
      this.user = undefined;
    }
  }

  private showError(error: number): void {
    this.snackBar.open('Http status code ' + error, 'close')
  }
}
