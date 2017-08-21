import {Component, OnInit} from '@angular/core';
import {LoginService} from '../../services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: string;
  public password: string;
  public serverUrl: string;

  constructor(private loginService: LoginService) {
  }

  ngOnInit() {
    this.loginService.getServerUrl()
      .then(url => this.serverUrl = url)
      .catch(any => this.serverUrl = '');
    this.loginService.serverUrlChanged$.subscribe(url => this.serverUrl = url);
  }

  public login(): void {
    this.loginService.login(this.user, this.password, this.serverUrl)
  }
}
