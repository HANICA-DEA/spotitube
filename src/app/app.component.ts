import {Component, OnInit} from '@angular/core';
import {LoginService} from './services/login/login.service';
import {MdSnackBar} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public serverUrl: string;
  public user: string;

  constructor(private loginService: LoginService, public snackBar: MdSnackBar) {
  }

  ngOnInit(): void {
    this.initUserName();
    this.initServerUrl();
    this.initErrorSnackbar();
  }

  /**
   * Logout of the application.
   */
  public logout(): void {
    this.loginService.logout();
  }

  private initErrorSnackbar(): void {
    this.loginService.restError$.subscribe(error => this.snackBar.open('Http status code ' + error, 'close'));
  }

  private initServerUrl(): void {
    this.loginService.getServerUrl()
      .then(url => this.serverUrl = url)
      .catch(any => this.serverUrl = undefined);
    this.loginService.serverUrlChanged$.subscribe(url => this.serverUrl = url);
  }

  private initUserName(): void {
    this.loginService.getUser()
      .then(user => this.user = user)
      .catch(any => this.user = undefined);
    this.loginService.userChanged$.subscribe(user => this.user = user);
  }
}
