import { Pipe, PipeTransform } from '@angular/core';
import { CompanyType } from '../models/default.model';
//import {ClientsService} from '../../../core/services/clients.service';

@Pipe({
  name: 'getCompanyType',
})
export class getCompanyTypePipe implements PipeTransform {
  companyType: CompanyType[]=[];

  transform(value: string, args?: any): any {
    return this.getCompanyType(value);
  }

  getCompanyType(companyType: string) {
    console.info('---getCompanyType---');

    if (companyType != null) {
      return this.companyType.find((x) => x.id === companyType)?.type;
    }

    return false;
  }
}
