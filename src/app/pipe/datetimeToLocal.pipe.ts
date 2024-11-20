import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'localDateTime1',
})
export class DateToLocalPipe1 implements PipeTransform {
  defaultFormat = 'DD MMM yyy HH:mm';

  transform(date: string, args?: any): any {
    // console.log('Pipe Arguments: ', args);
    return this.renderDate(date, args);
  }

  renderDate(date: string, args?: any) {
    const dateFormat = args ? args : this.defaultFormat;
    return date ? moment.utc(date).local().format(dateFormat) : date;
  }
}

@Pipe({
  name: 'matchesCom',
})
export class MathcesComPipe implements PipeTransform {
  transform(items: Array<any>, statusCode: string): Array<any> {
    return items.filter((item) => item.statuscode === statusCode);
  }
}
