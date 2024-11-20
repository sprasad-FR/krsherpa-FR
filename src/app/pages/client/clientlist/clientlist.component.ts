

import {employeeUser} from '../../../core/models/employee.model';
import {QueryList, ViewChildren} from '@angular/core';

import { UntypedFormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import {Clients} from '../../../core/models/clients.model';
import { GridJs } from './data';

import { NgbdGridJsSortableHeader, SortEvent } from './client-sortable.directive';

import { CompanyTypeService } from '../../../core/services/company-type.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/kruser.service';
import { CompanyType, Users } from '../../../core/models/default.model';
import { DecimalPipe } from '@angular/common';
//import { ClientsService } from '../../../core/services/clients.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Logger } from '../../../core/logger.service';

import { Observable } from 'rxjs';
//import { ClientTableService } from '../client.table.service'; GetShortPipe
import { ClientTableService } from './client.service';
import {   DateToLocalPipe,GetInitialsPipe } from '../../../pipe';
import { ActivatedRoute } from '@angular/router';
import { SalesLeadContactService } from '../../../core/services/sales-lead-contact.service';
import { complianceActionsService } from '../../../core/services/complianceActions.service';

import { EmailService } from '../../../core/services/email.service';

import { EmailJsTemplates, EmailTitleDescription } from '../../../core/models/options';
const log = new Logger('Clients Assignment Component');




import {ClientsService} from '../../../core/services/clients.service';


@Component({
  selector: 'app-clientlist',
  templateUrl: './clientlist.component.html',
  styleUrls: ['./clientlist.component.scss'],
  providers: [ClientTableService, DecimalPipe,DateToLocalPipe,GetInitialsPipe]
})

/**
 * Starter Component
 */
export class ClientlistComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  btnName: any;
emps:any[]=[];

  // Table data
  gridjsList$!: Observable<Clients[]>;
  total$!: Observable<number>;
  @ViewChildren(NgbdGridJsSortableHeader) headers!: QueryList<NgbdGridJsSortableHeader>;


  // Table data
  tables$: Observable<any[]>;
 
  clientsData: Clients[]=[];
  usersArray: Users[]=[];
  companyType: CompanyType[]=[];
krroles: string[]=[];
  roles: string='';
  whoaim: any;
  isLoading: boolean = false;
  searchFor: string='';
  searchBox!: HTMLInputElement;
  listItm!: HTMLSelectElement;
  contactPerson: any[] = [];
  clientData: Clients[]=[];
  idforCompliance: string='';
  constructor(
    private readonly userService: UserService,
    private readonly clientService: ClientsService,
    public service: ClientTableService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private salesLeadContactService: SalesLeadContactService,
    public companyTypeService: CompanyTypeService,
    public complianceService: complianceActionsService
  ) {
    this.tables$ = service.countries$;
    this.total$ = service.total$;
    this.whoaim = JSON.parse(localStorage.getItem('user')!);
 //   this.service.tableDataInput = []; //Set data for table
  }

  ngOnInit(): void {
   /* this.breadCrumbItems = [
      { label: 'Clients', path: 'clients', redirectTo: '/clients' },
      { label: 'Assignments', active: true },
    ];  */
    this.isLoading = true;
    this.whoaim = JSON.parse(localStorage.getItem('user'));

    this.roles = this.whoaim?.roles[0];
 this.krroles = this.whoaim?.roles;

   // this.roles = 'admin';
 //this.krroles = ['admin'];

    //this.searchFor = this.route.snapshot.paramMap.get('searchKey');
   
   // this.getClients();
    this._fetchData();
    this.getComapnyTypes();
    this.refreshed = true;
  }

  /**
   * fetches the table value
   */
  async _fetchData() {
    this.getAllContactPerson();
    this.getClients();
    this.getcomplianceDetails();
  }

  compliancealldata: any;

  getcomplianceDetails() {
    const filters = new Map();

    const filter = {
      where: {
        and: [
          {
            compliancetype: 'client',
          },
        ],
      },
    };

    filters.set('filter', JSON.stringify(filter));
    this.complianceService.getAll(filters).subscribe(
      (client: any) => {
        //  this.isLoading = false;
        this.compliancealldata = client;
        console.log('compliancealldata Details', this.compliancealldata);
        var userData = JSON.parse(window.localStorage.getItem('user')!);
      },
      (error: any) => {}
    );
  }


  selectedid:any;

  editemp(id: any, content:any) {

    
   // this.submitted = false;
if (id=='0')
{
  this.selectedid='';
}
else{
   this.selectedid=id;
}
    this.modalService.open(content, { size: 'lg', centered: true });
   // var modelTitle = document.querySelector('.modal-title') as HTMLAreaElement;
   // modelTitle.innerHTML = 'Edit Order';
   // var updateBtn = document.getElementById('add-btn') as HTMLAreaElement;
   // updateBtn.innerHTML = "Update";

  
    
  }

  //**gs
  getcompliancestatusclr(id: string, isok: boolean) {
    if (id != null && this.compliancealldata != undefined) {
      const rec = this.compliancealldata?.find((x:any) => x.salesLeadId === id && x.statuscode > 0);
      if (rec != null && rec != undefined) {
        return 'lightsalmon';
      } else {
        return 'white';
      }
    } else {
      return 'white';
    }
  }


  getCompanyTypeName(id: string) {
    if (this.companyType?.length) {
      let company = this.companyType.find((x) => x.id == id);
      return company.type;
    }
    return '';
  }







  RefreshList() {
    this.refreshed = false;
    this.refreshed = true;
    this._fetchData();
  }

  refreshed: boolean=false;

  getcompliancestatus(id: string) {
    if (id != null && this.compliancealldata != undefined) {
      this.whoaim = JSON.parse(localStorage.getItem('user')!);
      this.roles = this.whoaim?.roles[0];

      const rec = this.compliancealldata?.find((x:any) => x.salesLeadId === id && x.statuscode > 0);

      if (rec != null && rec != undefined) {
        return 'font-size: 1.2rem;color:red;';
      } else {
        const rec1 = this.compliancealldata?.find((x:any) => x.salesLeadId === id);
        if (rec1 != null && rec1 != undefined) {
          return 'font-size: 1.2rem;color:green;';
        } else {
          if (this.roles == 'compliance') {
            return 'font-size: 1.2rem;color:blue;';
          } else {
            return 'display:none;';
          }
        }
      }
    }
    return 'font-size: 1.2rem;color:red;';
  }
  //**gs

  getUsers() {
    this.userService.getUsers().subscribe(
      (userArray: any) => {
        this.usersArray = userArray;
      },
      (error: any) => {}
    );
  }

  getUserName(id: string) {
    if (id != null && this.usersArray != undefined) {
      const user = this.usersArray?.find((x) => x.id === id);
      if (!user?.lastName) {
        return user?.firstName;
      } else {
        return user.firstName + ' ' + user.lastName;
      }
    } else {
      return '--';
    }
  }

  assignHead() {
    console.log('Method not implemented yet!');
  }

  open(content:any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        log.info('result', result);
      },
      (reason) => {
        log.info('reason', reason);
      }
    );
  }

  private getClients() {
    const filters = new Map();
    const filter = {
      // where: { or : []},
      where: {},
      order: 'updatedAt DESC',
    };
//krroles  this.krroles.includes('compliance')

debugger

    if (this.krroles.includes('mainPLHead')) {
      filter.where = { plheadId: this.whoaim.id };
    }

    if (this.krroles.includes('subPLHead')) {
      filter.where = {or :[{ subPnlHeadId: this.whoaim.id },{ additionalSubPnls: this.whoaim.id } ]};
    }


    if (this.krroles.includes('admin') ||this.krroles.includes('compliance')) {
      // filter.where = {};
    }

   /* */ if (
      !this.krroles.includes('admin') &&
!this.krroles.includes('client') &&
!this.krroles.includes('mainPLHead') &&
!this.krroles.includes('subPLHead') &&
!this.krroles.includes('keyAccountManager') &&
!this.krroles.includes('compliance') 


    ) {
      filter.where = { assigneeId: this.whoaim.id };
    }

    if (this.roles === 'client') {
      filter.where = { 'clientUser.userId': this.whoaim.id };
    }
/*
 if (this.roles === 'mainPLHead') {
      filter.where = { plheadId: this.whoaim.id };
    }

    if (this.roles === 'subPLHead') {
      filter.where = { subPnlHeadId: this.whoaim.id };
    }
    if (this.roles === 'keyAccountManager') {
      filter.where = { accountManagerId: this.whoaim.id };
    }
    if (this.roles === 'admin' || this.roles === 'compliance') {
      // filter.where = {};
    }
    if (
      this.roles != 'admin' &&
      this.roles != 'client' &&
      this.roles != 'mainPLHead' &&
      this.roles != 'subPLHead' &&
      this.roles != 'keyAccountManager' &&
      this.roles != 'compliance'
    ) {
      filter.where = { assigneeId: this.whoaim.id };
    }
    if (this.roles === 'client') {
      filter.where = { 'clientUser.userId': this.whoaim.id };
    }


*/

if (this.krroles.includes('keyAccountManager')) {
//  filter.where = { or : [{ subPnlHeadId: this.whoaim.id },{ plheadId: this.whoaim.id },{ accountManagerId: this.whoaim.id },{keyaccmanagers:this.whoaim.id},{ assigneeId: this.whoaim.id }]}

}



if (this.krroles.includes('admin') ||this.krroles.includes('compliance')) {
   filter.where = {};
}
else{
  filter.where = { or : [{ subPnlHeadId: this.whoaim.id },{ plheadId: this.whoaim.id },{ accountManagerId: this.whoaim.id },{keyaccmanagers:this.whoaim.id},{ assigneeId: this.whoaim.id }]}

}
 // filter.where = { or : [filter.where,{ assigneeId: this.whoaim.id }]}






if (this.krroles.includes('admin') ||this.krroles.includes('compliance')) {
   filter.where = {};
}

    filters.set('filter', JSON.stringify(filter));

    console.log('filter',filters);

    this.clientService.getAll(filters).subscribe(
      (data) => {

        console.log('dsts',data);

        this.clientData = data;


        this.service.emps=data;

        this.gridjsList$=this.service.countries$;


        if (this.krroles.includes('mainPLHead')) {
          let data = this.clientData.filter(
            (x) =>
              x.accountManagerId != '' &&
              x.accountManagerId != undefined &&
              x.subPnlHeadId != null &&
              x.subPnlHeadId != undefined
          );


          this.clientData = data;
        }
        /* gs condition removed on request from Amit
        if (this.krroles.includes('subPLHead')) {
          let data = this.clientData.filter(
            (x) => x.accountManagerId != '' && x.accountManagerId != undefined && x.accountManagerId != null
          );
          this.clientData = data;
        }  */
       // this.service.tableDataInput = this.clientData; //Set data for table
        this.isLoading = false;
        // if (this.searchFor) {
        //   this.searchBox = <HTMLInputElement>document.getElementById('globelSearch');
        //   this.searchBox.value = this.searchFor;

        //   this.listItm = <HTMLSelectElement>document.getElementById('Searchbucket');
        //   this.listItm.options['3'].selected = true;
        // }
      },
      (error: string) => {
        log.error('clients:', error);
        this.isLoading = false;
      }
    );
  }

  getCompanyType(companyType:any) {
    if (companyType != null) {
      return this.companyType.find((x) => x.id === companyType)?.type;
    }
    return '';
  }
  getComapnyTypes() {
    this.companyTypeService.getAll().subscribe(
      (companyTypes: any) => {
        this.companyType = companyTypes;
      },
      (error: any) => {}
    );
  }

  getShortName(name:string,lengthVal:number){
    
    if (name != null) {
      var trimmedString ="";
    var yourString = name; //replace with your string.
    var maxLength = lengthVal // maximum number of characters to extract
    if (yourString!=undefined && yourString!="" && yourString.length >10)
    {
      //trim the string to the maximum length
      trimmedString = yourString.substr(0, maxLength);
      
      //re-trim if we are in the middle of a word
      trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
    }
    else
    {
      return  name;
    }
    return  trimmedString+"...";
    }

    return '';
  }

  getClientContactPerson(clientUser: any[]) {
    if (clientUser != undefined || clientUser != null) {
      return clientUser[0]?.name;
    } else {
      return '--';
    }
  }
  getContactPerson(id:any) {
    if (id != null || id != undefined) {
      return this.contactPerson?.find((x) => x.id === id)?.name;
    }
  }
  getAllContactPerson() {
    this.salesLeadContactService.getAll().subscribe((data) => {
      this.contactPerson = data;
    });
  }

  // Open client user form modal
  createClientUser(clientUserFormModal: any, saleid: any) {
    this.idforCompliance = saleid;

    this.modalService.open(clientUserFormModal, { size: 'lg', windowClass: 'modal-holder' });
  }


  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }


}



