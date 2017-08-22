import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {LoggingService} from '../logging/logging.service';

@Injectable()
export class RestfulSpotitubeClientService {

  private restError = new Subject<number>();

  protected headers = new HttpHeaders().set('Content-Type', 'application/json');

  /**
   * Register to this observer to be notified if any Errors occur.
   *
   * @type {Observable<string>}
   */
  public restError$ = this.restError.asObservable();

  constructor(private loggingService: LoggingService) {
  }

  protected handleErrors(error: HttpErrorResponse): void {

    this.loggingService.info('A http error has occured: ', error);

    this.restError.next(error.status);
  }
}
