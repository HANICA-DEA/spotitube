import {Injectable} from '@angular/core';
import {AppConstants} from '../../app.constants';
import {Subject} from 'rxjs';
import {LoggingService} from '../logging/logging.service';

@Injectable()
export class LoginService {

  private serverUrlChanged = new Subject<string>();
  private userChanged = new Subject<string>();

  public serverUrlChanged$ = this.serverUrlChanged.asObservable();
  public userChanged$ = this.userChanged.asObservable();

  constructor(private loggingService: LoggingService) {
    this.initLocalStorageListeners();
  }

  /**
   * Login to the application
   *
   * @param {string} user
   * @param {string} serverUrl? If none is given, the current value for the serverUrl is used
   */
  public login(user: string, password: string, serverUrl?: string) {
    if (serverUrl) {
      this.persistServerUrl(serverUrl);
    }
    if (user) {
      this.persistUserToken(user);
    }

    this.loggingService.info('Logging in to ' + serverUrl + ' with user ' + user + ' and password ' + password);
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
    const user = this.retrieveUserToken();

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

  private clearStorage(): void {
    localStorage.removeItem(AppConstants.LOCAL_STORAGE_KEY_USER_TOKEN);
    this.serverUrlChanged.next('');
    localStorage.removeItem(AppConstants.LOCAL_STORAGE_KEY_SERVER_URL);
    this.userChanged.next('');
  }

  private handleStorageChange(event: StorageEvent): void {
    console.log('Storage change event: ', event);
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

  private persistServerUrl(serverUrl: string): void {
    localStorage.setItem(AppConstants.LOCAL_STORAGE_KEY_SERVER_URL, serverUrl);
    this.serverUrlChanged.next(serverUrl)
  }

  private retrieveServerUrl(): string {
    return localStorage.getItem(AppConstants.LOCAL_STORAGE_KEY_SERVER_URL);
  }

  private persistUserToken(token: string): void {
    localStorage.setItem(AppConstants.LOCAL_STORAGE_KEY_USER_TOKEN, token);
    this.userChanged.next(token);
  }

  private retrieveUserToken(): string {
    return localStorage.getItem(AppConstants.LOCAL_STORAGE_KEY_USER_TOKEN);
  }
}
