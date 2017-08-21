import {Component, OnInit} from '@angular/core';
import {LoginService} from './services/login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public serverUrl: string;
  public user: string;

  constructor(private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.loginService.getServerUrl()
      .then(url => this.serverUrl = url)
      .catch(any => this.serverUrl = undefined);
    this.loginService.serverUrlChanged$.subscribe(url => this.serverUrl = url);

    this.loginService.getUser()
      .then(user => this.user = user)
      .catch(any => this.user = undefined);
    this.loginService.userChanged$.subscribe(user => this.user = user);
  }

  public logout(): void {
    this.loginService.logout();
  }
}
