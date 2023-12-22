import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutes'
})
export class MinutesPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const seconds = value % 60;
    const minutes = Math.floor(value / 60) % 60;
    const hours = Math.floor(minutes / 60);

    const secondsString = seconds < 10 ? `0${seconds}` : `${seconds}`;
    const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const hoursString = hours < 10 ? `0${hours}` : `${hours}`;
    return `${hoursString}:${minutesString}:${secondsString}`;

  }

}
