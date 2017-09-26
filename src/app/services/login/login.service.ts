import {Injectable} from '@angular/core';
import {AppConstants} from '../../app.constants';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {LoginRequest} from '../../models/login-request/login-request.model';
import {LoginResponse} from '../../models/login-response/login-response.model';
import {RestfulSpotitubeClientService} from '../restful-spotitube-client/restful-spotitube-client.service';
import {LoggingService} from '../logging/logging.service';
import {PlaylistService} from '../playlist/playlist.service';
import {TrackService} from '../track/track.service';

@Injectable()
export class LoginService extends RestfulSpotitubeClientService {

  /**
   * Create a new LoginService
   *
   * @param {HttpClient} httpClient
   * @param {LoggingService} loggingService
   */
  constructor(private httpClient: HttpClient,
              private playlistService: PlaylistService,
              private trackService: TrackService,
              loggingService: LoggingService) {
    super(loggingService);

    this.initAuthorizationErrorHandling();
  }

  /**
   * Login to the application
   *
   * @param {string} user
   * @param {string} password
   * @param {string} serverUrl
   */
  public login(user: string, password: string, serverUrl: string) {

    this.setNewSettings(serverUrl);
    this.handleLoginRequest(user, password);
  }

  /**
   * Logout of the application
   */
  public logout(): void {
    this.clearStorage();
  }

  private handleLoginRequest(user: string, password: string): void {
    const loginRequestBody = JSON.stringify(new LoginRequest(user, password));
    const endpointUrl = this.createEndpointUrl(AppConstants.API_LOGIN);

    this.httpClient.post<LoginResponse>(endpointUrl,
      loginRequestBody,
      {headers: this.headers})
      .subscribe(data => this.handleLoginResponse(data), err => this.handleLoginErrors(err));
  }

  private handleLoginResponse(response: LoginResponse): void {
    if (response) {
      this.updateSettings(response.user, response.token);
    } else {
      this.loggingService.error('Something wrong happened with the server response. ' +
        'Did your server respond with valid json?');
      this.clearStorage();
    }
  }

  private handleLoginErrors(error: HttpErrorResponse): void {
    this.handleErrors(error);

    this.clearStorage();
  }

  private initAuthorizationErrorHandling() {
    this.trackService.restError$.subscribe(error => this.handleAuthorizationError(error));
    this.playlistService.restError$.subscribe(error => this.handleAuthorizationError(error));
    this.restError$.subscribe(error => this.handleAuthorizationError(error));
  }

  private handleAuthorizationError(error: number) {
    if (error === 403 || error === 401) {
      this.loggingService.info('An authorization or Authentication error has occured. User is logged out.');
      this.logout();
    }
  }
}
