import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getShort',
})
export class GetShortPipe implements PipeTransform {
  transform(value: string, args?: number): any {
    const limitChar = args || 0;
    return this.getShort(value, limitChar);
  }

  getShort(value: string, limitChar: number) {
    if (value != null) {
      var trimmedString ="";
  var yourString = value; //replace with your string.
  var maxLength = 45 // maximum number of characters to extract
  if (yourString!=undefined && yourString!="" && yourString.length >10)
  {
  //trim the string to the maximum length
   trimmedString = yourString.substr(0, maxLength);
  
  //re-trim if we are in the middle of a word
  trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
  }
  else
  {
    return  value;
  }
return  trimmedString+"...";
    }

    return '';
  }
}
