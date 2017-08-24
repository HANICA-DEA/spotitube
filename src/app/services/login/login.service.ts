import {Injectable} from '@angular/core';
import {AppConstants} from '../../app.constants';
import {Subject} from 'rxjs/Subject';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {LoginRequest} from '../../models/login-request/login-request.model';
import {LoginResponse} from '../../models/login-response/login-response.model';
import {RestfulSpotitubeClientService} from '../restful-spotitube-client/restful-spotitube-client.service';
import {LoggingService} from '../logging/logging.service';
import {Settings} from '../../models/settings/settings.interface.model';
import {SettingsImpl} from '../../models/settings/settings.model';

@Injectable()
export class LoginService extends RestfulSpotitubeClientService {

  private settingsChanged = new Subject<Settings>();

  /**
   * Register to this observable to be notified when the settings change.
   *
   * @type {Observable<Settings>}
   */
  public settingsChanged$ = this.settingsChanged.asObservable();

  /**
   * Create a new LoginService
   *
   * @param {HttpClient} httpClient
   * @param {LoggingService} loggingService
   */
  constructor(private httpClient: HttpClient, loggingService: LoggingService) {

    super(loggingService);

    this.initLocalStorageListeners();
  }

  /**
   * Login to the application
   *
   * @param {string} user
   * @param {string} password
   * @param {string} serverUrl
   */
  public login(user: string, password: string, serverUrl: string) {

    this.createNewSettings(serverUrl);
    this.handleLoginRequest(user, password);
  }

  /**
   * Logout of the application
   */
  public logout(): void {
    this.clearStorage();
  }

  /**
   * Get the current SettingsImpl.
   *
   * @return {Promise<Settings>}
   */
  public getSettings(): Promise<Settings> {
    return Promise.resolve(this.retrieve());
  }

  private handleLoginRequest(user: string, password: string): void {
    const loginRequest = new LoginRequest(user, password);

    this.httpClient.post<LoginResponse>(
      this.retrieveServerUrl() + AppConstants.API_LOGIN,
      JSON.stringify(loginRequest),
      {headers: this.headers})
      .subscribe(data => this.handleLoginResponse(data), err => this.handleLoginErrors(err));
  }

  private handleLoginResponse(response: LoginResponse): void {
    const settings = this.retrieve();
    settings.user = response.user;
    settings.token = response.token;

    this.persist(settings);
  }

  private handleLoginErrors(error: HttpErrorResponse): void {
    this.handleErrors(error);

    this.clearStorage();
  }

  private clearStorage(): void {
    localStorage.removeItem(AppConstants.LOCAL_STORAGE_KEY_SETTINGS);
    this.settingsChanged.next(undefined);
  }

  private handleStorageChange(event: StorageEvent): void {
    if (event.key === AppConstants.LOCAL_STORAGE_KEY_SETTINGS) {
      this.settingsChanged.next(JSON.parse(event.newValue));
    }
  }

  private initLocalStorageListeners(): void {
    window.addEventListener(AppConstants.STORAGE_EVENT_LISTENER_KEY, (event: StorageEvent) => this.handleStorageChange(event));
  }

  private createNewSettings(serverUrl: string): void {
    const settings = new SettingsImpl();
    settings.server = serverUrl;
    this.persist(settings);
  }

  private persist(settings: Settings): void {
    localStorage.setItem(AppConstants.LOCAL_STORAGE_KEY_SETTINGS, JSON.stringify(settings));
    this.settingsChanged.next(settings)
  }

  private retrieve(): Settings {
    const json = localStorage.getItem(AppConstants.LOCAL_STORAGE_KEY_SETTINGS);

    if (json) {
      return JSON.parse(json);
    } else {
      return new SettingsImpl();
    }
  }

  private retrieveServerUrl(): string {
    return this.retrieve().server;
  }
}
