import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getInitials',
})
export class GetInitialsPipe implements PipeTransform {
  transform(value: string, args?: number): any {
    const limitChar = args || 0;
    return this.getInitials(value, limitChar);
  }

  getInitials(value: string, limitChar: number) {
    if (value != null) {
      return value
        .split(' ')
        .map((n, i) => {
          if (i > limitChar - 1) {
            return '';
          } else {
            return n[0];
          }
        })
        .join('')
        .toUpperCase();
    }

    return '';
  }
}
