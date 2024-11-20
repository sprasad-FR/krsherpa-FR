

import {employeeUser} from '../../../core/models/employee.model';
import {QueryList, ViewChildren} from '@angular/core';

import { UntypedFormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import {Clients} from '../../../core/models/clients.model';
import {SalesLead,SalesBoardSearchResult } from '../../../core/models/salesLead.model';
import { GridJs } from './data';

import { NgbdGridJsSortableHeader, SortEvent } from './saleslead-sortable.directive';

import { CompanyTypeService } from '../../../core/services/company-type.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/kruser.service';
import { CompanyType, Users } from '../../../core/models/default.model';
import { DecimalPipe } from '@angular/common';
//import { ClientsService } from '../../../core/services/clients.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Logger } from '../../../core/logger.service';

import { Observable } from 'rxjs';
//import { ClientTableService } from '../client.table.service';
import { SalesLeadtbl } from './saleslead.model';

import { SalesLeadTableService } from './saleslead.service';


import { DateToLocalPipe, GetInitialsPipe} from '../pipe';
//   DateToLocalPipe, GetInitialsPipe
import { ActivatedRoute } from '@angular/router';
import { SalesLeadContactService } from '../../../core/services/sales-lead-contact.service';
import { complianceActionsService } from '../../../core/services/complianceActions.service';

import { EmailService } from '../../../core/services/email.service';

import { EmailJsTemplates, EmailTitleDescription } from '../../../core/models/options';
const log = new Logger('Clients Assignment Component');


import { SalesLeadService } from '../../../core/services/sales-lead.service';


import {ClientsService} from '../../../core/services/clients.service';
import { stageStatusDisplay } from '../../../core/models/options';


import { SalesLeadContact } from '../../../core/models/salesLeadContact.model';


@Component({
  selector: 'app-mysalesleadlist',
  templateUrl: './mysalesleadlist.component.html',
  styleUrls: ['./mysalesleadlist.component.scss'],
  providers: [SalesLeadTableService, DecimalPipe,DateToLocalPipe, GetInitialsPipe]
})

/**
 * Starter Component
 */
export class MySalesleadlistComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  btnName: any;
emps:any[]=[];

  // Table data
  gridjsList$!: Observable<SalesLeadtbl[]>;
  total$!: Observable<number>;
  @ViewChildren(NgbdGridJsSortableHeader) headers!: QueryList<NgbdGridJsSortableHeader>;
  today: string;

  // Table data
  tables$: Observable<any[]>;
 
  clientsData: SalesLead[]=[];
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
  clientData: SalesLead[]=[];
  idforCompliance: string='';

  stage: number;
  salesLeadData: SalesLead[];
  salesLeadContactData: SalesLeadContact[];
  stageStatusDisplay: string[];
  salesOwner:any;


  constructor(
    private  userService: UserService,
    private  clientService: ClientsService,
        private  SalesLeadService: SalesLeadService,
    public service: SalesLeadTableService,
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
    this.breadCrumbItems = [
     
    ];
    this.isLoading = true;

    this.roles = this.whoaim?.roles[0];
  this.salesOwner = this.whoaim?.id;
    this.getUsers();
    //this.searchFor = this.route.snapshot.paramMap.get('searchKey');
    this.getComapnyTypes();
   // this.roles = this.whoaim?.roles[0];
// this.krroles = this.whoaim?.roles;
this.stageStatusDisplay = stageStatusDisplay;
    this.roles =  this.whoaim?.roles[0];
 this.krroles =  this.whoaim?.roles;

  
  

   // this.getClients();
    this._fetchData();
  
    this.refreshed = true;

    var days = 0;

    var currentDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    var day = currentDate.getDate();
    var strDate = day < 10 ? '0' + day : day;
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    var strMonth = month < 10 ? '0' + month : month;
    this.today = year + '-' + strMonth + '-' + strDate;


  }

  /**
   * fetches the table value
   */
  async _fetchData() {
    this.getAllContactPerson();
    this.getSalesLead();
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
    const filters = new Map();

    const filter = {
      where: {
        
      },
    };

    filters.set('filter', JSON.stringify(filter));
    this.userService.getUsers(filters).subscribe(
      (userArray: any) => {
        this.usersArray = userArray;
        return true;
      },
      (error: any) => {    return true;}
    );
  }



  getUserName(id: string) {
    debugger
    if (id != null && this.usersArray != undefined) {
      const user = this.usersArray?.find((x) => x.id == id);
      if (!user?.lastName) {
        return user?.firstName;
      } else {
        return user.firstName + ' ' + user.lastName;
      }
    } else {
      return '--';
    }
  }

  getUserName11(id: string) {
    if (id != null && this.usersArray != undefined) {
      const user = this.usersArray?.find((x) => x.id == id);
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

  private getSalesLead() {
    
    const filters = new Map();
    let SearchFor = this.searchFor;
    let filter = {
      where: {},
    };

    filter = {
      where: {
        leadStatus: {
          nin: [4],
        },
        companyName: {
          like: SearchFor || '',
        },
      },
    };

    filters.set('filter', JSON.stringify(filter));

    console.log('filter',filters);

    this.SalesLeadService.getAllLeads(filters).subscribe(
      ( data) => {



        if (this.salesOwner) {
          if (this.roles == 'researchAnalyst' || this.roles == 'researchManager') {
          //  this.pageTitle = 'My Refered Sales';
          data= data.filter((x) => x.leadReference == this.salesOwner);
          } else {
            data= data.filter((x) => x.assigneeId == this.salesOwner);
          }
        }

        console.log('dsts', data);

        this.clientData = data;





var lst: any[]=[];

const filters = new Map();

const filter = {
  where: {
    
  },
};

filters.set('filter', JSON.stringify(filter));
this.userService.getUsers(filters).subscribe(
  (userArray: any) => {
    this.usersArray = userArray;
   



    this.companyTypeService.getAll().subscribe(
      (companyTypes: any) => {
        this.companyType = companyTypes;
        console.log(this.companyType )
        
    

        for (let index = 0; index < data.length; index++) {
          const element = data[index];
        
          lst.push(
        {
          id: element.id,
          companyName:  element.companyName,
          contactNo: element.contactNo,
          companyType:  this.getCompanyType(element.companyType),
          leadstatus: this.stageStatusDisplay[element.leadStatus].toString(),
          leadSource:element.leadSource.toString(),
          salesLeadContactname:this.getUserName(element.leadContactId), 
           salesLeadContactid:element.leadContactId, 
           assigneename:this.getUserName(element.assigneeId),                
          updatedAt: element.updatedAt,
          assigneeId:element.assigneeId

          /*
          id: string;
          companyName: string;
          companyType: string;
          contactNo: string;
          leadstatus: string;
          labels: string;
          assigneeId: string;
          secondary_assigneeId1: string;
          secondary_assigneeId2: string;
          salesOwner: string;
          leadSource: string;
          leadContactId: string;
          updatedAt: string;
          salesLeadContactname: string;  */
        
        }
        
        
          )
        
          
        }
      },
      (error: any) => {   }
    );


      },
      (error: any) => {    }
    );
        console.log('lst',lst);

        this.service.emps=lst;

        this.gridjsList$=this.service.countries$;

/*
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

        */
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


  getDaysCounter(updatedDate: string) {
    let today = new Date(this.today);
    let date = new Date(updatedDate);
    return Math.floor(
      (Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) -
        Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())) /
        (1000 * 60 * 60 * 24)
    );
  }
  getCompanyTypeName(id: string) {
    if (this.companyType?.length) {
      let company = this.companyType.find((x) => x.id == id);
      return company.type;
    }
    return '';
  }



  getCompanyType(companyType:any) {
    
    if (companyType != null) {
      return this.companyType.find((x) => x.id == companyType)?.type;
    }
    return '';
  }
  getComapnyTypes() {
    this.companyTypeService.getAll().subscribe(
      (companyTypes: any) => {
        this.companyType = companyTypes;
        console.log(this.companyType )
        return true;
      },
      (error: any) => {    return true;}
    );
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



