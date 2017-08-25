import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutes'
})
export class MinutesPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const date = new Date(null);
    date.setSeconds(value);
    const minutes = date.toISOString().substr(11, 8);

    return minutes;
  }

}
