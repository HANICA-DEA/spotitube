import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {LoggingService} from '../logging/logging.service';
import {Settings} from '../../models/settings/settings.interface.model';
import {AppConstants} from '../../app.constants';
import {SettingsImpl} from '../../models/settings/settings.model';
import {RequestBody} from '../../models/request-body/request-body.model';

@Injectable()
export class RestfulSpotitubeClientService {

  private settingsChanged = new Subject<Settings>();
  private restError = new Subject<number>();

  /**
   * Register to this observable to be notified when the settings change.
   *
   * @type {Observable<Settings>}
   */
  public settingsChanged$ = this.settingsChanged.asObservable();

  protected headers = new HttpHeaders().set('Content-Type', 'application/json');

  /**
   * Register to this observer to be notified if any Errors occur.
   *
   * @type {Observable<string>}
   */
  public restError$ = this.restError.asObservable();

  constructor(private loggingService: LoggingService) {
    this.initLocalStorageListeners();
  }

  /**
   * Get the current SettingsImpl.
   *
   * @return {Promise<Settings>}
   */
  public getSettings(): Promise<Settings> {
    return Promise.resolve(this.retrieve());
  }

  /**
   * Call this method when an error occurs. Consequently, all observers will be notified.
   *
   * @param {HttpErrorResponse} error
   */
  protected handleErrors(error: HttpErrorResponse): void {

    this.loggingService.info('A http error has occured: ', error);
    this.restError.next(error.status);
  }

  protected createEndpointUrl(path: string): string {
    return this.retrieve().server + path;
  }

  /**
   * Call this method to clear LocalStorage. Consequently, all observers will be notified.
   */
  protected clearStorage(): void {
    localStorage.removeItem(AppConstants.LOCAL_STORAGE_KEY_SETTINGS);
    this.settingsChanged.next(undefined);
  }

  /**
   * Create HttpParams that contain the token used for authentication.
   * @return {HttpParams}
   */
  protected createtokenParam(): HttpParams {
    const token = this.retrieve().token
    const params = new HttpParams().set('token', token);
    return params;
  }

  protected setNewSettings(serverUrl: string): void {
    const settings = new SettingsImpl();
    settings.server = serverUrl;
    this.persist(settings);
  }

  protected updateSettings(user: string, token: string): void {
    const settings = this.retrieve();
    settings.user = user;
    settings.token = token;

    this.persist(settings);
  }

  private initLocalStorageListeners(): void {
    window.addEventListener(AppConstants.STORAGE_EVENT_LISTENER_KEY, (event: StorageEvent) => this.handleStorageChange(event));
  }

  private handleStorageChange(event: StorageEvent): void {
    if (event.key === AppConstants.LOCAL_STORAGE_KEY_SETTINGS) {
      this.settingsChanged.next(JSON.parse(event.newValue));
    }
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
}
