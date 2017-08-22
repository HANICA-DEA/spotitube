import {Injectable} from '@angular/core';
import {AppConstants} from '../../app.constants';
import {Subject} from 'rxjs/Subject';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {LoginRequest} from '../../models/login-request/login-request.model';
import {LoginResponse} from '../../models/login-response/login-response.model';
import {RestfulSpotitubeClientService} from '../restful-spotitube-client/restful-spotitube-client.service';
import {LoggingService} from '../logging/logging.service';

@Injectable()
export class LoginService extends RestfulSpotitubeClientService {

  private serverUrlChanged = new Subject<string>();
  private userChanged = new Subject<string>();

  public serverUrlChanged$ = this.serverUrlChanged.asObservable();
  public userChanged$ = this.userChanged.asObservable();

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

    this.persistServerUrl(serverUrl);
    this.persistUser(user);

    this.handleLoginRequest(user, password);
  }

  /**
   * Logout of the application
   */
  public logout(): void {
    this.clearStorage();
  }

  /**
   * Return the name of the current user.
   *
   * @return {Promise<string>}
   */
  public getUser(): Promise<string> {

    const user = this.retrieveUser();
    if (user) {
      return Promise.resolve(user);
    } else {
      return Promise.reject('No user available');
    }
  }

  /**
   * Return the serverUrl.
   *
   * @return {Promise<string>}
   */
  public getServerUrl(): Promise<string> {
    const serverUrl = this.retrieveServerUrl();

    if (serverUrl) {
      return Promise.resolve(serverUrl);
    } else {
      return Promise.reject('No serverUrl available');
    }
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
    this.persistToken(response.token);
    this.persistUser(response.user);
  }

  private handleLoginErrors(error: HttpErrorResponse): void {
    this.handleErrors(error);

    this.clearStorage();
  }

  private clearStorage(): void {
    this.clearToken();
    this.clearServerUrl();
    this.clearUser();
  }

  private handleStorageChange(event: StorageEvent): void {
    if (event.key === AppConstants.LOCAL_STORAGE_KEY_SERVER_URL) {
      const serverUrl = event.newValue;
      this.serverUrlChanged.next(serverUrl)
    } else if (event.key === AppConstants.LOCAL_STORAGE_KEY_USER_TOKEN) {
      this.userChanged.next()
    }
  }

  private initLocalStorageListeners(): void {
    window.addEventListener(AppConstants.STORAGE_EVENT_LISTENER_KEY, (event: StorageEvent) => this.handleStorageChange(event));
  }

  private clearUser(): void {
    localStorage.removeItem(AppConstants.LOCAL_STORAGE_KEY_USER);
    this.userChanged.next('');
  }

  private clearToken(): void {
    localStorage.removeItem(AppConstants.LOCAL_STORAGE_KEY_USER_TOKEN);
  }

  private clearServerUrl(): void {
    localStorage.removeItem(AppConstants.LOCAL_STORAGE_KEY_SERVER_URL);
    this.serverUrlChanged.next('');
  }

  private persistUser(user: string): void {
    localStorage.setItem(AppConstants.LOCAL_STORAGE_KEY_USER, user);
    this.userChanged.next(user)
  }

  private persistServerUrl(serverUrl: string): void {
    localStorage.setItem(AppConstants.LOCAL_STORAGE_KEY_SERVER_URL, serverUrl);
    this.serverUrlChanged.next(serverUrl)
  }

  private persistToken(token: string): void {
    localStorage.setItem(AppConstants.LOCAL_STORAGE_KEY_USER_TOKEN, token);
  }

  private retrieveServerUrl(): string {
    return localStorage.getItem(AppConstants.LOCAL_STORAGE_KEY_SERVER_URL);
  }

  private retrieveUser(): string {
    return localStorage.getItem(AppConstants.LOCAL_STORAGE_KEY_USER);
  }

  private retrieveUserToken(): string {
    return localStorage.getItem(AppConstants.LOCAL_STORAGE_KEY_USER_TOKEN);
  }
}
