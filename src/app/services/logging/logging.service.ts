import {Injectable} from '@angular/core';

@Injectable()
export class LoggingService {

  private static ERROR = 'ERROR - ';
  private static INFO = 'INFO - ';
  private static WARNING = 'WARNING - ';

  /**
   * Print a warning message to the console
   *
   * @param {string} message
   * @param {any} object? An extra object to give additional information.
   */
  public warn(message: string, object?: any) {
    this.consoleLog(LoggingService.WARNING, message, object);
  }

  /**
   * Print a error message to the console
   *
   * @param {string} message
   * @param {any} object? An extra object to give additional information.
   */
  public error(message: string, object?: any) {
    this.consoleLog(LoggingService.ERROR, message, object);
  }

  /**
   * Print a info message to the console
   *
   * @param {string} message
   * @param {any} object? An extra object to give additional information.
   */
  public info(message: string, object?: any) {
    this.consoleLog(LoggingService.INFO, message, object);
  }

  private consoleLog(level: string, message: string, object?: any): void {
    if (object) {
      console.log(level + message, object);
    } else {
      console.log(level + message);
    }
  }
}
