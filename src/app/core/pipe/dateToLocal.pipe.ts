import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'localDateTime',
})
export class DateToLocalPipe implements PipeTransform {
  defaultFormat = 'DD MMM yyy';

  transform(date: string, args?: any): any {
    // console.log('Pipe Arguments: ', args);
    return this.renderDate(date, args);
  }

  renderDate(date: string, args?: any) {
    const dateFormat = args ? args : this.defaultFormat;
    return date ? moment.utc(date).local().format(dateFormat) : date;
  }
}
