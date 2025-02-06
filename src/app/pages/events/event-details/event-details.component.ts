import { CalenderService } from '../../../core/services/calender.service';
import { FormGroup, FormBuilder, Validators, } from '@angular/forms';
//import { Component, OnInit } from '@angular/core';
import { eventTypes } from './../../../../../../shared-libs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../toast-service';
import { SalesPerson } from './event-details.model';
import { contactPerson, salesPerson, TimeFormats } from './data';
import { ActivatedRoute, Router } from '@angular/router';
import { Logger } from '../../../core/logger.service';
// import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { EventService } from '../../../core/services//event.service';
import { Event } from '../../../core/models/event.model';
import { EmailJsTemplates, EmailTitleDescription } from '../../../core/models/options';
import { ClientsService } from '../../../core/services/clients.service';
import { Clients } from '../../../core//models/clients.model';

import { CompanyType } from '../../../core/models/default.model';
import { CompanyTypeService } from '../../../core/services/company-type.service';
import { EmailService } from '../../../core/services/email.service';
import { EmployeeService } from '../../../core/services/employee.service';
import { employeeUser } from '../../../core/models/employee.model';
import { ProjectService } from '../../../core/services/project.service';
import { currencies, options } from '../../../../../../shared-libs';
import { DatePipe } from '@angular/common';
// import { google, outlook, office365, yahoo, ics } from "calendar-link";
import * as stringify  from 'query-string';
import { ExpertService } from '../../../core/services/expert.service';

import { InvoiceService } from '../../../core/services/invoice.service';
import { ExpertInvoice } from '../../../core/models/expert-invoice.model';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Buffer } from 'buffer';

//import { Router } from '@angular/router';
import { Component,Input, OnInit, Inject, OnDestroy } from '@angular/core';
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { AuthenticationResult, InteractionStatus, InteractionType, PopupRequest, RedirectRequest } from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { GraphService, ProviderOptions } from '../../../core/services/graph.service';
import { protectedResources } from '../../../core/services/msal-config';
//import { Msal} from "@azure/msal-browser"; // if using CDN, 'Msal' will be available in global scope





import { UserService } from '../../../core/services/kruser.service';
import { SalesLeadContactService } from '../../../core/services/sales-lead-contact.service';
import { complianceActionsService } from '../../../core/services/complianceActions.service';
import { event } from 'jquery';

/*
import { CompanyTypeService } from '../../../core/services/company-type.service';

import { EmployeeService } from '../../../core/services/employee.service';

import { EventService } from '../../../core/services/event.service';

import { ProjectService } from '../../../core/services/project.service';


import {ClientsService} from '../../../core/services/clients.service';

import { EmailService } from '../../../core/services/email.service';

import { EmailJsTemplates, EmailTitleDescription } from '../../../core/models/options';

*/
type ProfileType = {
  givenName?: string,
  surname?: string,
  userPrincipalName?: string,
  id?: string
}

const log = new Logger('Events Component');
@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
  providers: [DatePipe],
})
// create PublicClientApplication instance
//const publicClientApplication = new Msal.PublicClientApplication( protectedResources.msalConfig);



export class EventDetailsComponent implements OnInit, OnDestroy {

  isIframe = false;
   loginDisplay = false;
   private readonly _destroying$ = new Subject<void>();
   @Input() itemid: string='';
  @Input() readonly: boolean=true;
 
   isLoading: boolean = false;
   error: any = [];
   Tzone: string;
   salesPerson: SalesPerson[];
   contactPerson: any;
   eventDuration: number;
   expertRate: number;
   eventData: any;
   modalStatus: string;
   scheduleData1: any;
   id: string;
   clientData: Clients;
   companyType: CompanyType[];
   times: any[];
   EmailJsTemplates: object;
   complianceModalTitle: string;
   complianceComment: string;
   eventDetailsForCompliance: Event;
   showComplianceButton: boolean;
   resch: boolean;
   empList: employeeUser[];
   emailReceiver: any[];
   compliance: any;
   arrOfEMpIds: any[];
   emailToSend: any[];
   receiverCC: any;
   receiverTo: any;
    eventat: any;
    clientmailmsid: string='0';
    expertmailmsid: string='0';
    currentmaildata:any;
    currentmailfor:string;
   currenciesList: {
     code: string;
     name: string;
     name_plural: string;
     symbol: string;
     symbol_native: string;
     decimal_digits: number;
     rounding: number;
   }[];
   rateTypes: string[];
   eventTypes: { id: number; text: string }[];
   minDurationType: string[];
   whoaim: any;
   roles: string;
   statusBtn: boolean;
   completedBtn: boolean = false;
   cancelledBtn: boolean = false;
   rescheduleBtn: boolean;
   today: string;
   comments: string = '';
   subject: string = '';
   dom: any;
   emailError: string;
   sendInvitation: boolean = true;
   failedBtn: boolean = false;
   eventDataForCompliance: Event;
   timePassed: boolean;
   clientEmail: any;
   clientMgr: any;
   newUniqueId: string;
  expertPayable:string;
  clientBillable:string;
      expertPayComments: string;
      clientBillComments: string;
  //clientMailid: string;
   //expertMailid: string;
   clientMail: any[];
   expertMail: any[];
   clientMailhistory:any;//any[]=['']; //Array<object>;
   expertMailhistory:any; //any[]=['']; //Array<object>;
   whoiam:any;
 
 
 
   constructor(
 
  @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
     private authService: MsalService,
     private graphService: GraphService,
     private msalBroadcastService: MsalBroadcastService,
 
 
     private modalService: NgbModal,
     private formBuilder: FormBuilder,
     private eventService: EventService,
     private clientsService: ClientsService,
     private toasterService: ToastService,
     private companyTypeService: CompanyTypeService,
     private route: ActivatedRoute,
     private emailService: EmailService,
     private projectService: ProjectService,
     private expertSevice: ExpertService,
     private calenderService: CalenderService,
     public userService: UserService,
         public invoiceService: InvoiceService,
 private router: Router
 
   //this.app = new Msal.PublicClientApplication(msalConfig.)
 
 
   ) {
     this.whoaim = JSON.parse(localStorage.getItem('user'));
     this.empList = JSON.parse(window.localStorage.getItem('emp'));
     this.roles = this.whoaim?.roles[0];
   }
 
   EventForm = this.formBuilder.group({
     expertRate: [null, [Validators.required]],
     clientRate: [null, [Validators.required]],
     eventDuration: [null, [Validators.required]],
     expertPayment: [null, [Validators.required]],
     salesPerson: [null, [Validators.required]],
     salesIncentives: [null, [Validators.required]],
     contactPerson: [null, [Validators.required]],
     expertIncentives: [null, [Validators.required]],
     clientPayableAmount: [null, [Validators.required]],
   //  clientPayableAmountCustom: [null, [Validators.nullValidator]],
     expertRateType: [null, [Validators.required]],
     expertCurrency: [null, [Validators.required]],
     clientRateType: [null, [Validators.required]],
     clientCurrency: [null, [Validators.required]],
     expertMinDuration: [null, [Validators.required]],
     expertMulFactor: [null, [Validators.required]],
     clientMinDuration: [null, [Validators.required]],
     clientMulFactor: [null, [Validators.required]],
     rate: [null, [Validators.nullValidator]],
     rateForClient: [null, [Validators.nullValidator]],
     minDuration: [null, [Validators.nullValidator]],
     CPminDuration: [null, [Validators.nullValidator]],
     currency: [null, [Validators.nullValidator]],
     CPcurrency: [null, [Validators.nullValidator]],
     minDurationType: [null, [Validators.nullValidator]],
     CPminDurationType: [null, [Validators.nullValidator]],
     rateType: [null, [Validators.nullValidator]],
     CPrateType: [null, [Validators.nullValidator]],
     CPmulFactor: [null, [Validators.nullValidator]],
     prorated: [null, [Validators.nullValidator]],
     CPprorated: [null, [Validators.nullValidator]],
     clientBillableAmount: [null, [Validators.required]],
     actualDuration: [null, [Validators.required]],
     expertPayable: ['Expert Payable', [Validators.required]],
      expertPayComments: [null, [Validators.required]],
  clientBillable: ['Client Billable', [Validators.required]],
      clientBillComments: [null, [Validators.required]],
 
     CPactualDuration: [null, [Validators.required]],
     expertPayableAmount: [null, [Validators.required]],
   });
 
   RescheduleForm = this.formBuilder.group({
     eventAt: [new Date, [Validators.required]],
     description: [null],
   });
 
 
 /****update status***/
  updatestatusForm = this.formBuilder.group({
    
      evstatus: ['Completed'],
    
   });
 
 
 /****update status***/
 
 
 
 
 /****update status client***/
 
   ClientStatusForm = this.formBuilder.group({
    
     clientRate: [0, [Validators.required]],   
     salesPerson: [null, [Validators.required]],
     salesIncentives: [null, [Validators.required]],
     contactPerson: [null, [Validators.required]],
    
     clientPayableAmount: [null, [Validators.required]],
     
   //  clientPayableAmountCustom: [null, [Validators.nullValidator]],
     clientRateType: [null, [Validators.required]],
     clientCurrency: [null, [Validators.required]],
    
     clientMinDuration: [null, [Validators.required]],
     clientMulFactor: [null, [Validators.required]],
    
     rateForClient: [null, [Validators.nullValidator]],
    
     CPminDuration: [null, [Validators.nullValidator]],
   
     CPcurrency: [null, [Validators.nullValidator]],
   
     CPminDurationType: [null, [Validators.nullValidator]],
   
     CPrateType: [null, [Validators.nullValidator]],
     CPmulFactor: [null, [Validators.nullValidator]],
   
     CPprorated: [null, [Validators.nullValidator]],
     clientBillableAmount: [0, [Validators.required]],
    // actualDuration: [null, [Validators.required]],
   
  clientBillable: ['Client Billable', [Validators.required]],
      clientBillComments: [null, [Validators.required]],
 
     CPactualDuration: [null, [Validators.required]],
  
   });
 
 
 /****update status  client***/
 
 
 
 
 /****update status expert***/
 
 
   ExpertStatusForm = this.formBuilder.group({
     expertRate: [null, [Validators.required]],
   
     eventDuration: [null, [Validators.required]],
     expertPayment: [null, [Validators.required]],
 //salesPerson: [null, [Validators.required]],
    // salesIncentives: [null, [Validators.required]],
    // contactPerson: [null, [Validators.required]],
     expertIncentives: [null, [Validators.required]],
    
     expertRateType: [null, [Validators.required]],
     expertCurrency: [null, [Validators.required]],
    // clientRateType: [null, [Validators.required]],
     //clientCurrency: [null, [Validators.required]],
     expertMinDuration: [null, [Validators.required]],
     expertMulFactor: [null, [Validators.required]],
   //  clientMinDuration: [null, [Validators.required]],
    // clientMulFactor: [null, [Validators.required]],
     rate: [null, [Validators.nullValidator]],
   //  CPrate: [null, [Validators.nullValidator]],
     minDuration: [null, [Validators.nullValidator]],
   //  CPminDuration: [null, [Validators.nullValidator]],
     currency: [null, [Validators.nullValidator]],
   //  CPcurrency: [null, [Validators.nullValidator]],
     minDurationType: [null, [Validators.nullValidator]],
    // CPminDurationType: [null, [Validators.nullValidator]],
     rateType: [null, [Validators.nullValidator]],
   //  CPrateType: [null, [Validators.nullValidator]],
   //  CPmulFactor: [null, [Validators.nullValidator]],
     prorated: [null, [Validators.nullValidator]],
   //  CPprorated: [null, [Validators.nullValidator]],
   //  clientBillableAmount: [null, [Validators.required]],
     actualDuration: [0, [Validators.required]],
     expertPayable: ['Expert Payable', [Validators.required]],
      expertPayComments: [null, [Validators.required]],
  //clientBillable: ['Client Billable', [Validators.required]],
   //   clientBillComments: [null, [Validators.required]],
 
   //  CPactualDuration: [null, [Validators.required]],
     expertPayableAmount: [0, [Validators.required]],
   });
 
 /****update status  expert***/
 
 
 
 
 
 /****update status***/
 
 
 
 /****update status***/
 
 
 
 
   ngOnInit(): void {
 

    if ( this.itemid && this.itemid !='')
    {
    this.id =this.itemid//  this.route.snapshot.paramMap.get('id')!;
    }
    else{
     this.id = this.route.snapshot.paramMap.get('id');
 
     this.itemid= this.id;
    }




    // this.id = this.route.snapshot.paramMap.get('id');
     this.whoiam = JSON.parse(localStorage.getItem('user'));
     this.empList = JSON.parse(window.localStorage.getItem('emp'));
     this.roles = this.whoiam?.roles[0];

  this.id=this.itemid;
 
 this.msalGuardConfig.interactionType=InteractionType.Popup;
 
 console.log('eid');
 console.log(window.localStorage.getItem('eid'));
 console.log('this.id');
 console.log(this.id);
 
     if (this.id) {
 
       window.localStorage.setItem('eid',this.id);
       //GetData
       this._fetchData();
       this.getEvent(this.id);
       this.resch=true;
        this.clientmailmsid='0';
      this.expertmailmsid='0';
     }
     else
     {
       this.id=window.localStorage.getItem('eid');
     this._fetchData();
       this.getEvent(this.id);
       this.resch=true;
        this.clientmailmsid='0';
      this.expertmailmsid='0';
 
     }
 
 
  this.isIframe = window !== window.parent && !window.opener;
 
     /**
      * You can subscribe to MSAL events as shown below. For more info,
      * visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-angular/docs/v2-docs/events.md
      */
     this.msalBroadcastService.inProgress$
       .pipe(
         filter((status: InteractionStatus) => status === InteractionStatus.None),
         takeUntil(this._destroying$)
       )
       .subscribe(() => {
         this.setLoginDisplay();
       });
 
 
   }
 
   idforCompliance: string;
 
   // Open client user form modal
   createClientcom(clientUserFormModal: any, saleid: any) {
     this.idforCompliance = saleid;
 
     this.modalService.open(clientUserFormModal, { size: 'xl', windowClass: 'mdmail' });
   }
 
   calculateExpertPayable() {


     console.log ('calculateExpertPayable');
     if (this.ExpertStatusForm.value.expertRateType?.toString().toLowerCase() == 'fixed') {
       this.ExpertStatusForm.patchValue({
         expertPayableAmount: Number(this.ExpertStatusForm.value.expertRate.toString()),
       });
       return;
     }
     let actualDuration = Number(this.ExpertStatusForm.value.actualDuration);
 
     if (actualDuration < Number(this.ExpertStatusForm.value.expertMinDuration)) {
       ///actual=20 min=30
       actualDuration = Number(this.ExpertStatusForm.value.expertMinDuration);
     } else {
       if (this.eventData?.expert?.prorated?.toLowerCase() != 'prorated') {
         //get pro rated i.e. uppper 5 min
         actualDuration = this.getUpper5Min(actualDuration);
       }
     }
     let clientRate = this.ExpertStatusForm.value.expertRate;
     if (!clientRate || Number(clientRate) <= 0) {
       return;
     }
     this.ExpertStatusForm.patchValue({
       expertPayableAmount: Number(Number((actualDuration) * (parseFloat(clientRate.toString()) / 60)).toFixed(2)),
     });
   }
 
 
 calculateClientBillable() {

console.log(this.ClientStatusForm.value.CPprorated)



if (this.select_minutes==null || this.select_minutes==undefined)
  {
alert ("Please select applicable rate");

this.ClientStatusForm.patchValue({
  CPactualDuration: null,
});
return

  }

  console.log ('select_minutes',this.select_minutes.$ngOptionLabel);

  if (this.ClientStatusForm.value.CPprorated ==null)
  {
alert ("Please select if prorated or non-prorated");
this.ClientStatusForm.patchValue({
  CPactualDuration: null,
});
return

  }
let str=this.select_minutes.$ngOptionLabel;

// Split the string by ":"
let parts = str.split(":");

// Trim whitespace from the parts and assign to variables
let firstPart = parts[0].trim();  // "45"
let secondPart = parts[1].trim(); // "85"

// Convert to numbers if needed
let ratemin = parseInt(firstPart, 10);   // 45 (as a number)
let secondNumber = parseInt(secondPart, 10); // 85 (as a number)

let rateDecimal = secondNumber / 100;

let eventduration = this.ClientStatusForm.value.CPactualDuration;


let clientcost = this.ClientStatusForm.value.rateForClient;
       
if (!clientcost || Number(clientcost) <= 0) {
  alert ("Please provide client rate");
  return;
}

if (!eventduration || Number(eventduration) <= 0) {
  alert ("Please provide duration");
  return;
}

var reslt;

if (this.ClientStatusForm.value.CPprorated.toString()=='prorated') {
  // Prorated calculation
  reslt= this.roundOff(((Number(clientcost) * Number(rateDecimal)) / ratemin) * Number(eventduration));
} else {
  // Non-prorated calculation
  reslt= this.roundOff(Number(clientcost) * rateDecimal);
}


this.ClientStatusForm.patchValue({
  clientBillableAmount: Number((reslt ).toFixed(2)),
});

/*
  

  if (this.ClientStatusForm.value.CPprorated.toString()=='prorated') {
      // Prorated calculation
      return ((clientcost * rateDecimal) / ratemin) * eventduration;
  } else {
      // Non-prorated calculation
      return clientcost * rateDecimal;
  }
*/





return

  
debugger

     if (this.ClientStatusForm.value.CPrateType?.toString().toLowerCase() == 'fixed') {
       this.ClientStatusForm.patchValue({
         clientBillableAmount: Number(this.ClientStatusForm.value.rateForClient),
       });
       return;
     }

     //select_minutes
     let actualDuration = this.ClientStatusForm.value.CPactualDuration;
     if (Number(actualDuration) > 0) {
       if (actualDuration < this.ClientStatusForm.value.clientMinDuration) {
         ///actual=20 min=30
         actualDuration = this.ClientStatusForm.value.clientMinDuration;
       } else {
         if (this.eventData?.expert?.CPprorated?.toLowerCase() != 'prorated') {
           //get pro rated i.e. uppper 5 min
           actualDuration = this.getUpper5Min(actualDuration);
         }
       }
       let clientRate = this.ClientStatusForm.value.rateForClient;
       
       if (!clientRate || Number(clientRate) <= 0) {
         return;
       }
       let multiplicationFactor = Number(this.ClientStatusForm.value.CPmulFactor);
       if (!multiplicationFactor || Number(multiplicationFactor) <= 0) {
         multiplicationFactor = 1;
       }
       this.ClientStatusForm.patchValue({
         clientBillableAmount: Number(((Number(actualDuration) * Number(multiplicationFactor) * Number(clientRate)) / 60).toFixed(2)),
       });
     }
   }

   roundOff(value) {
    // Check if the decimal part is >= 0.5
    if (value - Math.floor(value) >= 0.5) {
        return Math.ceil(value); // Round up using Math.ceil
    } else {
        return Math.floor(value); // Round down using Math.floor
    }
}



   private getUpper5Min(num) {
     if (num % 5 == 0) {
       return num;
     } else {
       let modVal = num % 5;
       return num + (5 - modVal);
     }
   }
   getExpertContactPerson(projectId) {
     const filters = new Map();
     const filter = {
       fields: {
         researchAnalyst: true,
       },
     };
     filters.set('filter', JSON.stringify(filter));
     this.projectService.show(projectId, filters).subscribe((data) => {
       this.contactPerson = data?.researchAnalyst;
     });
   }
 
 
   getEmployeeName(id) {
     if (this.empList?.length) {
       let emp = this.empList?.find((x) => x.userId === id);
       return emp?.name;
     }
     return '';
   }
 
 
   getEmail(id) {
     if (this.empList?.length) {
       let emp = this.empList?.find((x) => x.userId === id);
       return emp?.email;
     }
     return '';
   }
 
 
 
   getClientDetails(id: string) {
let cluser:any=[];

     this.clientsService.show(id).subscribe((client) => {

      console.log('client',client);
debugger
       this.clientData = client;
       cluser=this.clientData['clientUser'];
       let clientMgr = cluser.filter((a) => a['userId'] === this.eventData.clientManagerId);
       //this.eventData.project.clientUser = clientMgr[0] ? clientMgr[0]['name'] : '';
      this.clientMgr=clientMgr[0] ? clientMgr[0]['name'] : '';
      
       this.clientEmail = clientMgr[0] ? clientMgr[0]['email'] : '';
     });
   }

   getCompanyType(companyType) {
     if (companyType != null) {
       return this.companyType.find((x) => x.id === companyType)?.type;
     }
     return false;
   }
   getComapnyTypes() {
     this.companyTypeService.getAll().subscribe(
       (companyTypes: any) => {
         this.companyType = companyTypes;
       },
       (error: any) => {}
     );
   }
   getEvent(id: string) {
     const filters = new Map();
     const filter = {
       include: [
         {
           relation: 'krResearchMgr',
         },
         {
           relation: 'expert',
         },
         {
           relation: 'project',
         },
         {
           relation: 'client',
         },
       ],
     };
 
     filters.set('filter', JSON.stringify(filter));
 this.emailToSend =[];
     return this.eventService.show(this.id).subscribe(
       (event: any) => {
 
         console.log(event);
         
         this.eventData = event;
         if (this.eventData?.eventId?.length == 10) {
           this.newUniqueId = '08e87498-ed95-4405-b794-00' + this.eventData?.eventId;
         }
         if (this.eventData?.eventId?.length == 9) {
           this.newUniqueId = '08e87498-ed95-4405-b794-000' + this.eventData?.eventId;
         }
 
         this.complianceComment = this.eventData.complianceComment;
         this.arrOfEMpIds = [];
         this.arrOfEMpIds.push(this.eventData?.researchMgrId);
         this.arrOfEMpIds.push(this.eventData?.keyAccountManager);
         this.arrOfEMpIds.push(this.eventData?.subPnL);
         let selectedEmailPeople = this.empList?.filter((e) => this.arrOfEMpIds.indexOf(e.userId) != -1);
         this.emailToSend = selectedEmailPeople?.map((a) => a.email);
 
         this.eventData.contactPerson = this.getEmployeeName(event?.researchAnalystId);
         if (
           this.eventData?.status == 'Completed' ||
           this.eventData?.status == 'Failed' ||
           this.eventData?.status == 'Cancelled'
         ) {
           this.cancelledBtn = true;
           this.completedBtn = true;
           this.rescheduleBtn = true;
           this.failedBtn = true;
         }
         if (this.eventData?.projectId) {
           this.getExpertContactPerson(this.eventData?.projectId);
         }
         let userData = JSON.parse(window.localStorage.getItem('user'));
      
      
         const filterx = {where:{}};
        
        
         filterx.where = {"and":   [{"userId":this.eventData?.expertId}]};

     filters.set('filter', JSON.stringify(filterx));
       // filters.set('filter', JSON.stringify(filter));

         this.expertSevice.getAll(filters).subscribe(
          (expertres: any) => {
      
            this.eventData.expert = expertres[0];


          })
      
         /*  this.eventData.expert = this.eventData?.project?.givenToClient?.find(
           (a) => a.userId == this.eventData?.expertId
         );*/
         // this.id = this.eventData.eventId;

         this.getClientDetails(this.eventData?.clientId);
         this.Tzone = moment(this.eventData?.eventAt).format('Z');
         this.times = this.eventData?.rescheduleHistory;
        this.timePassed = this.getUTCdate(new Date()) - this.getUTCdate(new Date(this.eventData.eventAt)) <= 900;
 
 if (this.eventData?.clientMailid !=undefined)
 {
 this.clientmailmsid= this.eventData?.clientMailid;
 }
 else
 {
 this.clientmailmsid='0';
 }
 
  if (this.eventData?.expertMailid !=undefined)
 {
   this.expertmailmsid= this.eventData?.expertMailid;
 }
 else
 {
  this.expertmailmsid='0';
 }
 
   this.clientMail= this.eventData?.clientMail;
   this.expertMail= this.eventData?.expertMail;
   this.clientMailhistory=  this.eventData?.clientMailhistory;
   this.expertMailhistory=  this.eventData?.expertMailhistory;
 
 
 this.expertPayable=this.eventData?.expertPayable;
  this.clientBillable=this.eventData?.clientBillable;
 console.log('this.clientMail');
 console.log(this.clientMail);
 console.log(this.clientmailmsid);
 console.log(this.expertmailmsid);    
 
   },
       (error: any) => {}
     );
   }
 
 /**********gs ***************/
 
 submitInvoice() {
 
   /* this.eventService.show(id).subscribe(
     (event: any) => { */
       //this.eventData = event;
 
 debugger
 
  // this.invTotal = document.getElementById('total').textContent;
  // this.totalAmount = parseInt(this.invTotal);
   let invoiceData : any;
   invoiceData={};
   //invoiceData
   invoiceData.total = this.eventData.expertPayment;
  // invoiceData.events=[]
   invoiceData.invoiceDate = new Date().toString();
   invoiceData.status = 'Unpaid';
   invoiceData.expertId =this.eventData.expertId;
   invoiceData.eventId = this.eventData.id;
 
   invoiceData.invoiceNo = this.eventData.id;
   invoiceData.invoiceDate = (new Date().toISOString()).split('T')[0];
   invoiceData.invoiceStartDate = (new Date().toISOString()).split('T')[0];
   invoiceData.invoiceEndDate =  (new Date().toISOString()).split('T')[0];
  
  // this.emailVariableObj['total'] = invoiceData.total;
 
   if (invoiceData.expertId!=null) {
     // create client invoice
     this.invoiceService.createExpertInvoice(invoiceData).subscribe(
       (response) => {
    
         this.toasterService.success('Expert Payment generated successfully.', 'Success!');
        /*gs this.emailService.sendEmail(
           EmailJsTemplates.Invoicegenerated,
           this.emailToSend,
           'Approval',
           this.emailVariableObj
         );
         */
        
           //get Event Data by id
           this.eventService.show(this.eventData.id ).subscribe(
             (event: any) => {
              // this.data = event;
               event["expertInvoiceId"] = response["id"];
               //update Event Data by id
               this.eventService.update(this.eventData.id , event).subscribe(
                 (response) => {
                   log.debug('response: ', response);
 
                   this.isLoading = false;
                   this.toasterService.success('Event updated successfully.', 'Success!');
                   
                 },
                 (error) => {
                   log.error(error);
                  // log.debug('Not Created', this.data);
                   this.error = error;
                 }
               );
             },
             (error: any) => {}
           );
         
       },
       (error) => {
         log.error(error);
         log.debug('Not Created', invoiceData);
         this.error = error;
       }
     );
    
   }
 /*},
 (error) => {
   log.error(error);
   //log.debug('Not Created', invoiceData);
   this.error = error;
 }
 ); */
 
 }
 
 
 
 
   updateEventMails(emaildata:any,isclient:boolean) {
     let eventUpdateData: any = {};
 console.log('this.emaildata 22');
 console.log(emaildata);
 
     const momnt = moment();
    
      
 if (isclient)
 {
  // maildt:any[];
 //maildt.push(emaildata);
        eventUpdateData.clientMailid = this.clientmailmsid;   
 
   if (eventUpdateData.clientMail == null ) {
         eventUpdateData.clientMail = [];
       }
 eventUpdateData.clientMail = [];
 //eventUpdateData.clientMailhistory
 
 
   eventUpdateData.clientMail.push(emaildata);   //JSON.stringify(
 
  //eventUpdateData.clientMailhistory=this.clientMailhistory.push(emaildata);//.push(emaildata);//this.clientMailhistory.push(emaildata);
       //clientMailhistory
 }
 else
 {
 
 eventUpdateData.expertMailid = this.expertmailmsid;   
 
 eventUpdateData.expertMail = []; 
 
 eventUpdateData.expertMail.push(emaildata);
 
 //  eventUpdateData.expertMailhistory = this.expertMailhistory.push(emaildata);
 
 }
 
  console.log('this.eventUpdateData');
 console.log(eventUpdateData);
      
       this.eventService.updateOnly(this.id, eventUpdateData).subscribe((response) => {
         log.debug('response: ', response);
         this.isLoading = false;
         this.toasterService.success(' expert Event mail data updated successfully.', 'Success!');
 
        
         
 
         this.getEvent(this.id);
         (error) => {
           log.error(error);
           log.debug('Not Created', eventUpdateData);
           this.error = error;
         };
         this.getEvent(this.id);
         this.modalService.dismissAll();
       });
     
   }
 
 
 /**********gs ***************/
  
 
   submitEvent() {
     let eventUpdateData: any = {};
     const momnt = moment();
     if (true) {
       // eventUpdateData.eventId = this.eventData.eventId;
       // eventUpdateData.eventAt = new Date();
       // eventUpdateData.expertRateType = this.eventData.expertRateType;
       // eventUpdateData.expertMinDuration = this.eventData.expertMinDuration;
       // eventUpdateData.expertRate = this.eventData.expertRate;
       // eventUpdateData.clientRate = this.eventData.clientRate;
       // eventUpdateData.expertCurrency = this.eventData.expertCurrency;
       // eventUpdateData.rateForClient = this.eventData.rateForClient;
       // eventUpdateData.status = this.modalStatus;
       // eventUpdateData.clientCurrency = this.eventData.clientCurrency;
       // eventUpdateData.multiplicationFactor = this.eventData.multiplicationFactor;
       // eventUpdateData.krResearchMgrId = this.eventData.krResearchMgrId;
       // eventUpdateData.clientId = this.eventData.clientId;
       // eventUpdateData.projectId = this.eventData.projectId;
       // eventUpdateData.expertId = this.eventData.expertId; 
 
 
        eventUpdateData.clientBillComments = this.EventForm.value.clientBillComments;
       eventUpdateData.expertPayComments = this.EventForm.value.expertPayComments;
 
       eventUpdateData.clientBillable= this.EventForm.value.clientBillable;
       eventUpdateData.expertPayable= this.EventForm.value.expertPayable;
       
       eventUpdateData.clientInvoiceId = '';
       eventUpdateData.expertInvoiceId = '';
       // eventUpdateData.status = this.modalStatus;
       if (!isNaN(Number(this.EventForm.value.clientBillableAmount)) && this.EventForm.value.clientBillableAmount) {
         eventUpdateData.clientPayableAmount = Number(this.EventForm.value.clientBillableAmount);
       } else {
         delete eventUpdateData.clientPayableAmount;
       }
 
       if (!isNaN(Number(this.EventForm.value.expertPayableAmount)) && this.EventForm.value.expertPayableAmount) {
         eventUpdateData.expertPayment = Number(this.EventForm.value.expertPayableAmount);
       } else {
         delete eventUpdateData.expertPayment;
       }
 
       if (!isNaN(Number(this.EventForm.value.actualDuration)) && this.EventForm.value.actualDuration) {
         eventUpdateData.expertDuration = this.EventForm.value.actualDuration;
       } else {
         delete eventUpdateData.expertDuration;
       }
 
       if (!isNaN(Number(this.EventForm.value.CPactualDuration)) && this.EventForm.value.CPactualDuration) {
         eventUpdateData.eventDuration = this.EventForm.value.CPactualDuration;
       } else {
         delete eventUpdateData.eventDuration;
       }
 
       if (this.modalStatus == 'Completed' || this.modalStatus == 'Failed') {
         if (
           eventUpdateData?.clientPayableAmount != undefined ||
           eventUpdateData?.clientPayableAmount != '' ||
           eventUpdateData?.expertPayment != undefined ||
           eventUpdateData?.expertPayment != ''
         ) {
           eventUpdateData.status = this.modalStatus;
         } else {
           eventUpdateData.status = 'Awaiting Completion';
         }
       } else {
         eventUpdateData.status = this.modalStatus;
       }
 
       this.eventService.updateOnly(this.id, eventUpdateData).subscribe((response) => {
         log.debug('response: ', response);
         this.isLoading = false;
         this.toasterService.success('Event updated successfully.', 'Success!');
 
         if (this.modalStatus == 'Completed') {
           this.completedBtn = true;
         }
         if (this.modalStatus == 'Cancelled') {
           this.cancelledBtn = true;
         }
         if (this.modalStatus == 'Failed') {
           this.failedBtn = true;
         }
       this.emailToSend=[];
 
         let ra = this.empList?.find((a) => a.userId == this.eventData?.researchMgrId);
         if (ra) {
           this.emailToSend.push(ra?.email);
         }
 
         if (eventUpdateData.status == 'canceledEvent') {
           //   //email notification
           //email
           let eventObj;
           debugger;
           if (this.emailToSend?.length) {
             for (let i = 0; i < this.emailToSend?.length; i++) {
               eventObj = {
                 Organizer: this.whoaim?.username,
                 MailTo: this.emailToSend[i],
                 MailSubject: 'Cancel/Failed Event -' + this.eventData?.eventId,
                 MailBody: '',
                 NewUniqueId: this.newUniqueId,
                 CreatedDate: new Date(),
                 StartDate: new Date(this.eventData?.eventAt),
                 EndDate: this.addMinsToDate(new Date(this.eventData?.eventAt), this.eventData?.clientMinDuration),
                 Location: '',
                 MailTypeCancel: false,
               };
               this.emailService.sentInvitation(eventObj);
             }
 
             this.modalService.dismissAll();
             this.toasterService.success('Invitation Sent..', 'Success!');
           //  this.receiverTo = '';
           } else {
             this.toasterService.error('Please enter proper email(s) !.', 'Error!');
           }
           let emailVariableObj = {
             notificationType: 'skipEmail',
             emailData: EmailTitleDescription.eventCancelled,
           };
 
           emailVariableObj['Module'] = 'Events' ;
           emailVariableObj['name'] = this.eventData?.projectName ;
           emailVariableObj['Action'] = 'Cancel/Failed Event' ;
           emailVariableObj['Actiontype'] = 'Informative' ;
           emailVariableObj['link'] ='events/event-details/'+this.eventData?.eventId;
          // emailVariableObj['description'] = '/clients/show/' + this.id;
   
   
           this.emailService.sendEmail(
             EmailJsTemplates.eventCancelled,
             this.emailToSend,
             'Informative & System Prompt',
             emailVariableObj
           );
         } else {
           let emailVariableObj = {
            // firstName: this.eventData?.expert?.firstName, 
            // lastName: this.eventData?.expert?.lastName,
            project: this.eventData?.projectName, 
            projectName: this.eventData?.projectName,     
             companyName: this.clientData?.companyName,
             eventDuration: eventUpdateData?.eventDuration,
             expertRate: eventUpdateData?.expertRate,
             expertCurrency: eventUpdateData?.expertCurrency,
             rateForClient: eventUpdateData?.rateForClient,
             clientCurrency: eventUpdateData?.clientCurrency,
             expertPayment: eventUpdateData?.expertPayment,
             clientPayableAmount: eventUpdateData?.clientPayableAmount,
             emailData: EmailTitleDescription.eventCompleted,
           };
 
           emailVariableObj['Module'] = 'Events' ;
           emailVariableObj['name'] = this.eventData?.projectName ;
           emailVariableObj['Action'] = 'Event Completed' ;
           emailVariableObj['Actiontype'] = 'Informative' ;
           emailVariableObj['link'] ='events/event-details/'+this.eventData?.eventId;
          // emailVariableObj['description'] = '/clients/show/' + this.id;
   
 
           this.emailService.sendEmail(
             EmailJsTemplates.eventCompleted,
             this.emailToSend,
             'Informative & System Prompt',
             emailVariableObj
           );
         }
 
         this.getEvent(this.id);
         (error) => {
           log.error(error);
           log.debug('Not Created', eventUpdateData);
           this.error = error;
         };
         this.getEvent(this.id);
         this.modalService.dismissAll();
       });
     }
   }
 
 
   updatetEventStatus() {
     let eventUpdateData: any = {};
     const momnt = moment();
     if (true) {
       // eventUpdateData.eventId = this.eventData.eventId;
       // eventUpdateData.eventAt = new Date();
       // eventUpdateData.expertRateType = this.eventData.expertRateType;
       // eventUpdateData.expertMinDuration = this.eventData.expertMinDuration;
       // eventUpdateData.expertRate = this.eventData.expertRate;
       // eventUpdateData.clientRate = this.eventData.clientRate;
       // eventUpdateData.expertCurrency = this.eventData.expertCurrency;
       // eventUpdateData.rateForClient = this.eventData.rateForClient;
       // eventUpdateData.status = this.modalStatus;
       // eventUpdateData.clientCurrency = this.eventData.clientCurrency;
       // eventUpdateData.multiplicationFactor = this.eventData.multiplicationFactor;
       // eventUpdateData.krResearchMgrId = this.eventData.krResearchMgrId;
       // eventUpdateData.clientId = this.eventData.clientId;
       // eventUpdateData.projectId = this.eventData.projectId;
       // eventUpdateData.expertId = this.eventData.expertId; 
 
 
 /*
       if (this.modalStatus == 'Completed' || this.modalStatus == 'Failed') {
         if (
           eventUpdateData?.clientPayableAmount != undefined ||
           eventUpdateData?.clientPayableAmount != '' ||
           eventUpdateData?.expertPayment != undefined ||
           eventUpdateData?.expertPayment != ''
         ) {
           eventUpdateData.status = this.modalStatus;
         } else {
           eventUpdateData.status = 'Completed';
         }
       } else {
         eventUpdateData.status = this.modalStatus;
       }
     */
 
      this.modalStatus= this.updatestatusForm.value.evstatus;
    eventUpdateData.status = this.modalStatus;
 
       this.eventService.updateOnly(this.id, eventUpdateData).subscribe((response) => {
         log.debug('response: ', response);
         this.isLoading = false;
         this.toasterService.success('Event status updated successfully.', 'Success!');
 
         if (this.modalStatus == 'Completed') {
           this.completedBtn = true;
         }
         if (this.modalStatus == 'Cancelled') {
           this.cancelledBtn = true;
         }
         if (this.modalStatus == 'Failed') {
           this.failedBtn = true;
         }
         let ra = this.empList?.find((a) => a.userId == this.eventData?.researchMgrId);
         if (ra) {
      //     this.emailToSend.push(ra?.email);
         }
 
         if (eventUpdateData.status == 'canceledEvent1') {
           //   //email notification
           //email
           let eventObj;
           debugger;
           if (this.emailToSend?.length) {
             for (let i = 0; i < this.emailToSend?.length; i++) {
               eventObj = {
                 Organizer: this.whoaim?.username,
                 MailTo: this.emailToSend[i],
                 MailSubject: 'Cancel Event -' + this.eventData?.eventId,
                 MailBody: '',
                 NewUniqueId: this.newUniqueId,
                 CreatedDate: new Date(),
                 StartDate: new Date(this.eventData?.eventAt),
                 EndDate: this.addMinsToDate(new Date(this.eventData?.eventAt), this.eventData?.clientMinDuration),
                 Location: '',
                 MailTypeCancel: false,
               };
             //  this.emailService.sentInvitation(eventObj);
             }
 
             this.modalService.dismissAll();
             this.toasterService.success('Invitation Sent..', 'Success!');
           //  this.receiverTo = '';
           } else {
             this.toasterService.error('Please enter proper email(s) !.', 'Error!');
           }
 
 
           let emailVariableObj = {
             notificationType: 'skipEmail',
             emailData: EmailTitleDescription.eventCancelled,
           };
 
 
 
           emailVariableObj['Module'] = 'Events' ;
           emailVariableObj['name'] = this.eventData?.projectName ;
           emailVariableObj['Action'] = 'Cancel/Failed Event' ;
           emailVariableObj['Actiontype'] = 'Informative' ;
           emailVariableObj['link'] ='events/event-details/'+this.eventData?.eventId;
          // emailVariableObj['description'] = '/clients/show/' + this.id;
   
   
 
 
         /*  this.emailService.sendEmail(
             EmailJsTemplates.eventCancelled,
             this.emailToSend,
             'Informative & System Prompt',
             emailVariableObj
           ); */
         } else {
 /*
           let emailVariableObj = {
             firstName: this.eventData?.expert?.firstName,
             lastName: this.eventData?.expert?.lastName,
             companyName: this.clientData?.companyName,
             eventDuration: this.eventData?.eventDuration,
             expertRate: this.eventData?.expertRate,
             expertCurrency: this.eventData?.expertCurrency,
             rateForClient: this.eventData?.rateForClient,
             clientCurrency: this.eventData?.clientCurrency,
             expertPayment: this.eventData?.expertPayment,
             clientPayableAmount: this.eventData?.clientPayableAmount,
             emailData: EmailTitleDescription.eventCompleted,
           };*/
 
 //this.emailToSend =[];
 //this.emailToSend.push('xxxxx@gmail.com');
 
 
         //  this.emailToSend.push(this.eventData?.researchMgrId);
     
     this.emailToSend =[];
 
       this.emailToSend.push(this.eventData?.researchAnalystId);
    //arrid any[]=[];
      this.arrOfEMpIds.push(this.eventData?.researchMgrId);
         this.arrOfEMpIds.push(this.eventData?.keyAccountManager);
         this.arrOfEMpIds.push(this.eventData?.subPnL);
         let selectedEmailPeople = this.empList?.filter((e) => this.arrOfEMpIds.indexOf(e.userId) != -1);
         this.emailToSend = selectedEmailPeople?.map((a) => a.email);
 
 
 let emailVariableObj = {
             project:  eventUpdateData?.projectName,
             edate: eventUpdateData?.eventAt,
             eventLink:window.location.href,
           }
 
           emailVariableObj['Module'] = 'Events' ;
           emailVariableObj['name'] = this.eventData?.projectName ;
           emailVariableObj['Action'] = 'Event Completed' ;
           emailVariableObj['Actiontype'] = 'Informative' ;
           emailVariableObj['link'] ='events/event-details/'+eventUpdateData?.eventId;
          // emailVariableObj['description'] = '/clients/show/' + this.id;
   
 
           this.emailService.sendEmail(
             "template_lusqtnb",
             this.emailToSend,
             'Informative & System Prompt',
             emailVariableObj
           ); 
         }
 
         this.getEvent(this.id);
         (error) => {
           log.error(error);
           log.debug('Not Created', eventUpdateData);
           this.error = error;
         };
         this.getEvent(this.id);
         this.modalService.dismissAll();
       });
     }
   }
 
   select_minutes:any;
  SelectMinute(){
    console.log(this.select_minutes)
  }

 
   submitClientExpense() {
     let eventUpdateData: any = {};
     const momnt = moment();
     if (true) {
       // eventUpdateData.eventId = this.eventData.eventId;
       // eventUpdateData.eventAt = new Date();
       // eventUpdateData.expertRateType = this.eventData.expertRateType;
       // eventUpdateData.expertMinDuration = this.eventData.expertMinDuration;
       // eventUpdateData.expertRate = this.eventData.expertRate;
       // eventUpdateData.clientRate = this.eventData.clientRate;
       // eventUpdateData.expertCurrency = this.eventData.expertCurrency;
       // eventUpdateData.rateForClient = this.eventData.rateForClient;
       // eventUpdateData.status = this.modalStatus;
       // eventUpdateData.clientCurrency = this.eventData.clientCurrency;
       // eventUpdateData.multiplicationFactor = this.eventData.multiplicationFactor;
       // eventUpdateData.krResearchMgrId = this.eventData.krResearchMgrId;
       // eventUpdateData.clientId = this.eventData.clientId;
       // eventUpdateData.projectId = this.eventData.projectId;
       // eventUpdateData.expertId = this.eventData.expertId; 
 
if (this.ClientStatusForm.value.clientBillComments==null || this.ClientStatusForm.value.clientBillComments==undefined)
  {
alert("Please provide comments")
return
  }
//console.log(this.ClientStatusForm.value.clientPayableAmount)

/*
  if (this.ClientStatusForm.value.clientPayableAmount==null || this.ClientStatusForm.value.clientPayableAmount.toString()=='0')
    {
  alert("Please provide client Billable Amount")
  return
  
    }
 */
        eventUpdateData.clientBillComments = this.ClientStatusForm.value.clientBillComments;
     //  eventUpdateData.expertPayComments = this.ClientStatusForm.value.expertPayComments;
 
       eventUpdateData.clientBillable= this.ClientStatusForm.value.clientBillable;
   //    eventUpdateData.expertPayable= this.ClientStatusForm.value.expertPayable;
       
       eventUpdateData.clientInvoiceId = '';
   //    eventUpdateData.expertInvoiceId = '';  clientRateType
 
      eventUpdateData.clientPayableAmount = Number(this.ClientStatusForm.value.clientBillableAmount);

      eventUpdateData.clientRateType=this.ClientStatusForm.value.clientRateType

//eventUpdateData.clientPayableAmountCustom = Number(this.ClientStatusForm.value.clientPayableAmountCustom);
      //     clientPayableAmountCustom: [null, [Validators.nullValidator]],
  eventUpdateData.eventDuration = this.ClientStatusForm.value.CPactualDuration;
       // eventUpdateData.status = this.modalStatus;
    /*   if (!isNaN(this.EventForm.value.clientBillableAmount) && this.ClientStatusForm.value.clientBillableAmount) {
         eventUpdateData.clientPayableAmount = parseFloat(this.ClientStatusForm.value.clientBillableAmount);
       } else {
         delete eventUpdateData.clientPayableAmount;
       }
 
       if (!isNaN(this.EventForm.value.expertPayableAmount) && this.ClientStatusForm.value.expertPayableAmount) {
         eventUpdateData.expertPayment = parseFloat(this.ClientStatusForm.value.expertPayableAmount);
       } else {
         delete eventUpdateData.expertPayment;
       }
 
       if (!isNaN(this.EventForm.value.actualDuration) && this.ClientStatusForm.value.actualDuration) {
         eventUpdateData.expertDuration = this.ClientStatusForm.value.actualDuration;
       } else {
         delete eventUpdateData.expertDuration;
       }
 
       if (!isNaN(this.EventForm.value.CPactualDuration) && this.ClientStatusForm.value.CPactualDuration) {
         eventUpdateData.eventDuration = this.ClientStatusForm.value.CPactualDuration;
       } else {
         delete eventUpdateData.eventDuration;
       }
 */
      
 
       this.eventService.updateOnly(this.id, eventUpdateData).subscribe((response) => {
         log.debug('response: ', response);
         this.isLoading = false;
 
 
         this.toasterService.success('Event updated successfully.', 'Success!');
 
 
 
  let emailVariableObj = {
           //  firstName: this.eventData?.expert?.firstName,
           //  lastName: this.eventData?.expert?.lastName, 
           project: this.eventData?.projectName, 
           projectName: this.eventData?.projectName,           
             eventDuration: eventUpdateData?.eventDuration,
             expertRate: eventUpdateData?.expertRate,
             expertCurrency: eventUpdateData?.expertCurrency,
             rateForClient: eventUpdateData?.rateForClient,
             clientCurrency: eventUpdateData?.clientCurrency,
             expertPayment: eventUpdateData.expertPayment,
             clientPayableAmount: eventUpdateData.clientPayableAmount,
 
             emailData: EmailTitleDescription.eventCompleted,
              eventLink:window.location.href,
           };
 this.emailToSend =[];
 
 // this.arrOfEMpIds.push(this.eventData?.researchAnalystId);
         this.arrOfEMpIds.push(this.eventData?.keyAccountManager);
         this.arrOfEMpIds.push(this.eventData?.subPnL);
         // this.arrOfEMpIds.push(this.eventData?.);
         let selectedEmailPeople = this.empList?.filter((e) => this.arrOfEMpIds.indexOf(e.userId) != -1);
         this.emailToSend = selectedEmailPeople?.map((a) => a.email);
 //this.emailToSend.push(this.clientEmail);
 //this.emailToSend =[];
 //this.emailToSend.push('xxxxx@gmail.com');
 
 
 emailVariableObj['Module'] = 'Events' ;
 emailVariableObj['name'] = this.eventData?.projectName ;
 emailVariableObj['Action'] = 'Event Updated' ;
 emailVariableObj['Actiontype'] = 'Informative' ;
 emailVariableObj['link'] ='events/event-details/'+this.eventData?.eventId;
 // emailVariableObj['description'] = '/clients/show/' + this.id;
 
 
 
 
           this.emailService.sendEmail(
             "template_mnkv538",
             this.emailToSend,
             'Informative & System Prompt',
             emailVariableObj
           ); 
 
 
 
 
 
         this.getEvent(this.id);
         (error) => {
           log.error(error);
           log.debug('Not Created', eventUpdateData);
           this.error = error;
         };
         this.getEvent(this.id);
         this.modalService.dismissAll();
       });
 
     }
   }
 
 
 
   submitExpertExpense() {
     let eventUpdateData: any = {};
     const momnt = moment();
     if (true) {
       // eventUpdateData.eventId = this.eventData.eventId;
       // eventUpdateData.eventAt = new Date();
       // eventUpdateData.expertRateType = this.eventData.expertRateType;
       // eventUpdateData.expertMinDuration = this.eventData.expertMinDuration;
       // eventUpdateData.expertRate = this.eventData.expertRate;
       // eventUpdateData.clientRate = this.eventData.clientRate;
       // eventUpdateData.expertCurrency = this.eventData.expertCurrency;
       // eventUpdateData.rateForClient = this.eventData.rateForClient;
       // eventUpdateData.status = this.modalStatus;
       // eventUpdateData.clientCurrency = this.eventData.clientCurrency;
       // eventUpdateData.multiplicationFactor = this.eventData.multiplicationFactor;
       // eventUpdateData.krResearchMgrId = this.eventData.krResearchMgrId;
       // eventUpdateData.clientId = this.eventData.clientId;
       // eventUpdateData.projectId = this.eventData.projectId;
       // eventUpdateData.expertId = this.eventData.expertId; 
 
 
 //eventUpdateData.clientBillComments = this.EventForm.value.clientBillComments;
       eventUpdateData.expertPayComments = this.ExpertStatusForm.value.expertPayComments;
 
 //eventUpdateData.clientBillable= this.EventForm.value.clientBillable;
       eventUpdateData.expertPayable= this.ExpertStatusForm.value.expertPayable;
       
      // eventUpdateData.clientInvoiceId = '';
       eventUpdateData.expertInvoiceId = '';
 
        eventUpdateData.expertPayment = Number(this.ExpertStatusForm.value.expertPayableAmount);
         eventUpdateData.expertMinDuration = this.ExpertStatusForm.value.actualDuration;
      
         this.eventData.expertPayment=eventUpdateData.expertPayment ;
      
         // eventUpdateData.status = this.modalStatus;
 /*if (!isNaN(this.EventForm.value.clientBillableAmount) && this.EventForm.value.clientBillableAmount) {
         eventUpdateData.clientPayableAmount = parseFloat(this.EventForm.value.clientBillableAmount);
       } else {
         delete eventUpdateData.clientPayableAmount;
       }*/
 /*
       if (!isNaN(this.ExpertStatusForm.value.expertPayableAmount) && this.ExpertStatusForm.value.expertPayableAmount) {
         eventUpdateData.expertPayment = parseFloat(this.ExpertStatusForm.value.expertPayableAmount);
       } else {
         delete eventUpdateData.expertPayment;
       }
 
       if (!isNaN(this.ExpertStatusForm.value.actualDuration) && this.ExpertStatusForm.value.actualDuration) {
         eventUpdateData.expertDuration = this.ExpertStatusForm.value.actualDuration;
       } else {
         delete eventUpdateData.expertDuration;
       }*/
 /*
       if (!isNaN(this.ExpertStatusForm.value.CPactualDuration) && this.ExpertStatusForm.value.CPactualDuration) {
         eventUpdateData.eventDuration = this.ExpertStatusForm.value.CPactualDuration;
       } else {
         delete eventUpdateData.eventDuration;
       }*/
 
 this.emailToSend =[];
 
 
       this.eventService.updateOnly(this.id, eventUpdateData).subscribe((response) => {
         log.debug('response: ', response);
         this.isLoading = false;
 
 
         this.toasterService.success('Event updated successfully.', 'Success!');
 
 //this.emailToSend =[];
 //this.emailToSend.push('xxxxx@gmail.com');
 
 this.arrOfEMpIds.push(this.eventData?.researchMgrId);
         this.arrOfEMpIds.push(this.eventData?.researchAnalystId);
     //    this.arrOfEMpIds.push(this.eventData?.subPnL);
         let selectedEmailPeople = this.empList?.filter((e) => this.arrOfEMpIds.indexOf(e.userId) != -1);
         this.emailToSend = selectedEmailPeople?.map((a) => a.email);
 //this.emailToSend.push(this.eventData?.expert?.primaryEmail);
 
 
  let emailVariableObj = {
             firstName: this.eventData?.expert?.firstName,
             lastName: this.eventData?.expert?.lastName,
             projectName: this.eventData?.projectName,
             project: this.eventData?.projectName,     
             eventDuration: this.eventData?.expertMinDuration,
             expertRate: this.eventData?.expertRate,
             expertCurrency: this.eventData?.expertCurrency,
            // rateForClient: this.eventData?.rateForClient,
            // clientCurrency: this.eventData?.clientCurrency,
             expertPayment: eventUpdateData.expertPayment,
            // clientPayableAmount: eventUpdateData.clientPayableAmount,
             emailData: EmailTitleDescription.eventCompleted,
             eventLink:window.location.href,
           };
 
 
           emailVariableObj['Module'] = 'Events' ;
           emailVariableObj['name'] = this.eventData?.projectName ;
           emailVariableObj['Action'] = 'Event Updated' ;
           emailVariableObj['Actiontype'] = 'Informative' ;
           emailVariableObj['link'] ='events/event-details/'+this.eventData?.eventId;
          // emailVariableObj['description'] = '/clients/show/' + this.id;
   
   
 
           this.emailService.sendEmail(
             "template_gbi0t3s",
             this.emailToSend,
             'Informative & System Prompt',
             emailVariableObj
           ); 
 
 
 
           this.emailToSend=[];
           console.log('in email', this.encDta(this.eventData?.expert?.primaryEmail));
          // let RAemail = this.empList.find((x) => x.userId == this.expert?.krRelationshipMgrId);
           this.emailToSend.push(this.encDta(this.eventData?.expert?.primaryEmail));
           //  this.emailToSend.push(RAemail?.email);   this.eventData?.expert?.primaryEmail;
           let emailVariableObj1 = {
             notificationType: 'sendEmail',     
           };
           this.emailService.sendEmail(
             EmailJsTemplates.experEventComplete,  //experEventComplete
             this.emailToSend,
             'Informative',
             emailVariableObj1
           );
 
 
 
         //  this.submitInvoice();
 
         this.getEvent(this.id);
 
    this.submitInvoice();
         
         (error) => {
           log.error(error);
           log.debug('Not Created', eventUpdateData);
           this.error = error;
         };
         this.getEvent(this.id);
         this.modalService.dismissAll();
       });
     }
   }
 
 
 
   Reschedule() {
   // scheduleData:event;
    
     let scheduleData = this.RescheduleForm.value;
 
     scheduleData['eventAt'] = new Date(this.RescheduleForm.get('eventAt').value.toString());
     let historyItem = {
       oldTime: this.eventData.eventAt,
       newTime: scheduleData.eventAt,
 
       description: this.RescheduleForm.get('description').value,
     };
 
     this.scheduleData1 = scheduleData.eventAt;
     if (!scheduleData.eventAt) {
       this.scheduleData1 = '--';
     } else {
       this.scheduleData1 = scheduleData.eventAt;
     }
 
     const momnt = moment();
     delete scheduleData.description;
     if (this.RescheduleForm.valid) {
      scheduleData['eventId'] = this.eventData?.eventId;
      scheduleData['expertRateType'] = this.eventData?.expertRateType;
      scheduleData['expertMinDuration'] = this.eventData?.expertMinDuration;
      scheduleData['expertRate'] = this.eventData?.expertRate;
      scheduleData['clientRate'] = this.eventData?.clientRate;
      scheduleData['expertCurrency'] = this.eventData?.expertCurrency;
      scheduleData['rateForClient'] = this.eventData?.rateForClient;
      scheduleData['clientCurrency'] = this.eventData?.clientCurrency;
      scheduleData['multiplicationFactor'] = this.eventData?.multiplicationFactor;
      scheduleData['krResearchMgrId'] = this.eventData?.krResearchMgrId;
      scheduleData['clientId'] = this.eventData?.clientId;
      scheduleData['projectId'] = this.eventData?.projectId;
      scheduleData['expertId'] = this.eventData?.expertId;
      scheduleData['CPRateType'] = this.eventData?.CPRateType;
      scheduleData['clientManagerId'] = this.eventData?.clientManagerId;
      scheduleData['researchAnalystId'] = this.eventData?.researchAnalystId;
      scheduleData['researchMgrId'] = this.eventData?.researchMgrId;
      scheduleData['subPnL'] = this.eventData?.subPnL;
      scheduleData['prorated'] = this.eventData?.prorated;
      scheduleData['CPprorated'] = this.eventData?.CPprorated;
      scheduleData['keyAccountManager'] = this.eventData?.keyAccountManager;
      if (scheduleData['rescheduleHistory ']== null || scheduleData['rescheduleHistory']?.length <= 0) {
        scheduleData['rescheduleHistory'] = [];
      }
      scheduleData['rescheduleHistory'].push(historyItem);
 
       this.eventService.updateOnly(this.id, scheduleData).subscribe(
         (response) => {
           log.debug('response: ', response);
           this.isLoading = false;
           this.toasterService.success('Event Rescheduled successfully.', 'Success!');
           //email
 
           let eventObj;
           debugger;
           if (this.emailToSend?.length > 0) {
             for (let i = 0; i < this.emailToSend?.length; i++) {
               eventObj = {
                 Organizer: this.whoaim?.username,
                 MailTo: this.emailToSend[i],
                 MailSubject: 'Reschedule Event -' + this.eventData?.eventId,
                 MailBody: historyItem.description,
                 NewUniqueId: this.newUniqueId,
                 CreatedDate: new Date(),
                 StartDate: new Date(historyItem.newTime),
                 EndDate: this.addMinsToDate(new Date(historyItem.newTime), this.eventData?.clientMinDuration),
                 Location: '',
                 MailTypeCancel: true,
               };
             //  this.emailService.sentInvitation(eventObj);  gs
             }
 
             this.modalService.dismissAll();
             this.toasterService.success('Updated','success');
            // this.receiverTo = '';
           } else {
             this.toasterService.error('Please enter proper email(s) !.', 'Error!');
           }
 
           let emailVariableObj = {
              Organizer: this.whoaim?.username,
               //  MailTo: this.emailToSend[i],
                 MailSubject: 'Reschedule Event -' + this.eventData?.eventId,
                 MailBody: historyItem.description,
                 NewUniqueId: this.newUniqueId,
                 CreatedDate: new Date(),
                 StartDate: new Date(historyItem.newTime),
                 EndDate: this.addMinsToDate(new Date(historyItem.newTime), this.eventData?.clientMinDuration),
                 Location: '',
                 MailTypeCancel: true,
            // notificationType: 'skipEmail',
           };
 
 this.emailToSend =[];
  this.arrOfEMpIds.push(this.eventData?.researchMgrId);
  this.arrOfEMpIds.push(this.eventData?.researchAnalystId);
         this.arrOfEMpIds.push(this.eventData?.keyAccountManager);
         this.arrOfEMpIds.push(this.eventData?.subPnL);
         // this.arrOfEMpIds.push(this.eventData?.);
         let selectedEmailPeople = this.empList?.filter((e) => this.arrOfEMpIds.indexOf(e.userId) != -1);
         this.emailToSend = selectedEmailPeople?.map((a) => a.email);
 
         emailVariableObj['Module'] = 'Events' ;
         emailVariableObj['name'] = this.eventData?.projectName ;
         emailVariableObj['Action'] = 'Event Rescheduled ' ;
         emailVariableObj['Actiontype'] = 'Informative' ;
         emailVariableObj['link'] ='events/event-details/'+this.eventData?.eventId;
        // emailVariableObj['description'] = '/clients/show/' + this.id;
 
 
 
           this.emailService.sendEmail(   
             EmailJsTemplates.eventReschedule,
             this.emailToSend,
             'Informative & System Prompt',
             emailVariableObj
           );  
           this.getEvent(this.id);
         },
         (error) => {
           log.error(error);
           log.debug('Not Created', scheduleData);
           this.error = error;
         }
       );
       this.modalService.dismissAll();
     } else {
     }
   }
 
   encDta(data:any) {
 
 
     if (data==undefined || data==null || data=='')
     {
     return "";
     }
   
   return Buffer.from(data.substring(5), 'base64').toString('ascii');
    //return window.atob((data).substring(5));
   
   }
   public Editor = ClassicEditor;
   private _fetchData() {
     this.currenciesList = currencies;
     this.salesPerson = salesPerson;
     this.rateTypes = options.rateTypes;
     this.currenciesList = currencies;
     this.rateTypes = options.rateTypes;
     this.eventTypes = eventTypes;
     this.minDurationType = options.minDurationType;
     let days = 0;
     let currentDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
     let day = currentDate.getDate();
     let strDate = day < 10 ? '0' + day : day;
     let month = currentDate.getMonth() + 1;
     let year = currentDate.getFullYear();
     let strMonth = month < 10 ? '0' + month : month;
     this.today = year + '-' + strMonth + '-' + strDate + 'T00:00';
     this.getComapnyTypes();
   }
   currntclimailbtn:string;
 
   //currntclimailbtn='send';
 
   openClientModal(content: any,btn:string) {
 
 this.currntclimailbtn=btn;
 
     if (this.clientmailmsid!='0')
     {
 
   this.eventat=this.eventData?.eventAt;  //subject
      this.subject = this.clientMail[0]["subject"];
     this.receiverTo = this.clientMail[0]["sentto"];
     this.receiverCC = this.clientMail[0]["sentcc"];
 this.comments=this.clientMail[0]["body"]["content"];
 
     }
     else
     {
     let calenderInviteReceiver = [];
     let selectedEmailPeople;
     this.getClientDetails(this.eventData?.clientManagerId);
 
     let calenderInviteReceiverCC = [];
     calenderInviteReceiverCC.push(this.eventData?.researchAnalystId);
     calenderInviteReceiverCC.push(this.eventData?.researchMgrId);
     calenderInviteReceiverCC.push(this.eventData?.keyAccountManager);
     calenderInviteReceiverCC.push(this.eventData?.subPnL);
     selectedEmailPeople = this.empList?.filter((e) => calenderInviteReceiverCC.indexOf(e.userId) != -1);
     let receiverCCArr = selectedEmailPeople?.map((a) => a.email);
       this.eventat=this.eventData?.eventAt;
     this.receiverTo = this.clientEmail;
     this.receiverCC = receiverCCArr;
 
     }
 
     this.modalService.open(content, { size: 'xl', windowClass: 'modal-holder' });
   }
 
  currntexpmailbtn:string;
   //currntexpmailbtn='send';
 
   openExpertModal(contents: any,btn:string) {
 
    this.currntexpmailbtn=btn;
 
   
 
  if (this.expertmailmsid!='0')
     {
 
   this.eventat=this.eventData?.eventAt;  //subject
      this.subject = this.expertMail[0]["subject"];
     this.receiverTo = this.expertMail[0]["sentto"];
     this.receiverCC = this.expertMail[0]["sentcc"];
 this.comments=this.expertMail[0]["body"]["content"];
 
     }
     else
     {
     let calenderInviteReceiver = [];
      let calenderInviteReceiverCC = [];
     calenderInviteReceiverCC.push(this.eventData?.researchAnalystId);
     calenderInviteReceiverCC.push(this.eventData?.researchMgrId);
     calenderInviteReceiverCC.push(this.eventData?.keyAccountManager);
     calenderInviteReceiverCC.push(this.eventData?.subPnL);
     let selectedEmailPeople = this.empList?.filter((e) => calenderInviteReceiverCC.indexOf(e.userId) != -1);
     let receiverCCArr = selectedEmailPeople?.map((a) => a.email);
 
     this.receiverTo = this.eventData?.expert?.primaryEmail;
     this.receiverCC = receiverCCArr;
 
     }
 
     this.modalService.open(contents,  { size: 'xl', windowClass: 'modal-holder' });
   }
 
   eventCompletedClient(completedEvent: any, status: string) {
     this.modalStatus = status;
     this.modalService.open(completedEvent, {
       size: 'xl',
       backdrop: 'static',
       centered: true,
       windowClass: 'modal-holder',
     });
 
     this.patchclientFormValues();
   }
 
 
   eventCompleted(completedEvent: any, status: string) {
     this.modalStatus = status;
     this.modalService.open(completedEvent, {
       size: 'xl',
       backdrop: 'static',
       centered: true,
       windowClass: 'modal-holder',
     });
 
   //  this.patchclientFormValues();
   }
 
   eventCompletedExpert(completedEvent: any, status: string) {
     this.modalStatus = status;
     this.modalService.open(completedEvent, {
       size: 'xl',
       backdrop: 'static',
       centered: true,
       windowClass: 'modal-holder',
     });
 
     this.patchexpertFormValues();
   }
 
   patchFormValues() {
     let gtcData = this.eventData.expert;
     this.EventForm.patchValue(gtcData);
     this.EventForm.patchValue({
       expertRate: this.eventData?.expertRate,
       clientRate: this.eventData?.rateForClient,
       // expertPayment: [null, [Validators.required]],
       // salesPerson: [null, [Validators.required]],
       // salesIncentives: [null, [Validators.required]],
       // contactPerson: [null, [Validators.required]],
       // expertIncentives: [null, [Validators.required]],
       // clientPayableAmount: [null, [Validators.required]],
 
       expertRateType: this.eventData?.expertRateType,
       expertCurrency: this.eventData?.expertCurrency,
       clientRateType: this.eventData?.CPRateType,
       clientCurrency: this.eventData?.clientCurrency,
       expertMinDuration: this.eventData?.expertMinDuration,
       clientMinDuration: this.eventData?.clientMinDuration,
      // clientBillbleAmount: [null, [Validators.required]],
      // actualDuration:0,// [0, [Validators.required]],
      // CPactualDuration: [null, [Validators.required]],
      // expertPayableAmount: [null, [Validators.required]],
     });
   }
 
 
   patchclientFormValues() {
    // let gtcData = this.eventData.client;
     //this.ClientStatusForm.patchValue(gtcData);
     this.ClientStatusForm.patchValue({
      // expertRate: this.eventData?.expertRate,
      
       // expertPayment: [null, [Validators.required]],
       // salesPerson: [null, [Validators.required]],
       // salesIncentives: [null, [Validators.required]],
       // contactPerson: [null, [Validators.required]],
       // expertIncentives: [null, [Validators.required]],
       // clientPayableAmount: [null, [Validators.required]],
     //  clientPayableAmountCustom:  this.eventData?.clientPayableAmountCustom,
       CPrateType: this.eventData?.clientRateType,
    //   expertCurrency: this.eventData?.expertCurrency,
    rateForClient: this.eventData?.rateForClient,
       clientRateType: this.eventData?.clientRateType,
       clientCurrency: this.eventData?.clientCurrency,
     //  expertMinDuration: this.eventData?.expertMinDuration,
       clientMinDuration: this.eventData?.clientMinDuration,
     //  CPminDurationType: this.eventData?.//[null, [Validators.required]],
   //    actualDuration:0, // [null, [Validators.required]],
     //  CPactualDuration:0. // [null, [Validators.required]],
    //   expertPayableAmount: [null, [Validators.required]],
     });
   }
 
 
   patchexpertFormValues() {

    debugger
    // let gtcData = this.eventData.expert;
   //  this.ExpertStatusForm.patchValue(gtcData);
     this.ExpertStatusForm.patchValue({
    
       //clientRate: this.eventData?.rateForClient,
       // expertPayment: [null, [Validators.required]],
       // salesPerson: [null, [Validators.required]],
       // salesIncentives: [null, [Validators.required]],
       // contactPerson: [null, [Validators.required]],
       // expertIncentives: [null, [Validators.required]],
       // clientPayableAmount: [null, [Validators.required]],
       expertRate: this.eventData?.expertRate,
       expertRateType: this.eventData?.expertRateType,
       expertCurrency: this.eventData?.expertCurrency,
      // clientRateType: this.eventData?.CPRateType,
      // clientCurrency: this.eventData?.clientCurrency,
       expertMinDuration: this.eventData?.expertMinDuration,
       minDurationType: this.eventData?.expertmindurationType,
       //clientMinDuration: this.eventData?.clientMinDuration,
      // clientBillbleAmount: [null, [Validators.required]],
       actualDuration:0,
      // CPactualDuration: [null, [Validators.required]],
       expertPayableAmount: 0,
     });
   }
 
 
   eventReschedule(rescheduleEvent: any) {
     this.modalService.open(rescheduleEvent, { centered: true, windowClass: 'modal-holder' });
   }
 
   ComplienceConfirmation(complianceModal: any) {
     this.complianceModalTitle = 'Add Comment';
     this.modalService.open(complianceModal, { centered: true, windowClass: 'modal-holder' });
   }
 
   markCompliance(val) {
     this.eventService.show(this.id).subscribe(
       (res) => {
         if (!this.eventDataForCompliance) {
           this.eventDataForCompliance = {};
         }
 
         this.eventDataForCompliance.isComplianceVerified = val == 'verify';
         this.eventData.isComplianceVerified = val == 'verify';
         this.eventDataForCompliance.complianceComment = this.complianceComment;
 
         this.eventService.updateOnly(this.id, this.eventDataForCompliance).subscribe(
           (res) => {
             log.debug('response: ', res);
             this.isLoading = false;
           },
           (error) => {
             log.error(error);
             log.debug('Not Updated', this.eventDataForCompliance);
             this.error = error;
             this.isLoading = false;
           }
         );
       },
       (error: any) => {
         this.isLoading = false;
       }
     );
     this.modalService.dismissAll();
   }
 
   checkEmail(event) {
     let val = event.target.value;
     const regExp = new RegExp(/^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/);
     const result = regExp.test(val);
     if (result == false) {
       this.emailError = 'Please enter ( , ) seperated valid email';
     } else {
       this.emailError = '';
     }
   }
 
 
  //var newmail
 
  sendClientMSInvitation(mailtype:string) {
 
 
 if (mailtype=='c')
 {
 
 this.cancelmail(this.clientmailmsid)
  return;
 
 }
 
 
 
  let emailVariableObj:object[]= [];
        
  this.currentmailfor='c';
 
 let arr = this.receiverTo?.split(',');
     if (arr.length) {
 for (let i = 0; i < arr?.length; i++) {
 
 emailVariableObj.push( { "emailAddress": {
         "address":arr[i],
         "name": ""
       },
       "type": "required"}
 )
 
         }
     }
 
  if (this.receiverCC) {
         let arrCC = this.receiverCC?.split(',');
         for (let i = 0; i < arrCC?.length; i++) {
 
 
 emailVariableObj.push({"emailAddress": {
         "address":arrCC[i],
         "name": ""
       },
       "type": "optional"}
 )
 
         }
       }
 //this.currentmaildata="";
  const newEvent = 
 {
   "subject": this.subject,
   "body": {
     "contentType": "HTML",
     "content":  this.comments //.replace(/<[^>]+>/g, '')
   },
   "start": {
       "dateTime": new Date(this.eventData?.eventAt),
       "timeZone": "Indian Standard Time"
   },
   "end": {
       "dateTime": this.addMinsToDate(new Date(this.eventData?.eventAt), this.eventData?.clientMinDuration),
       "timeZone": "Indian Standard Time"
   },
   "location":{
       "displayName":"Online"
   },
   "attendees": emailVariableObj,
   "allowNewTimeProposals": true,
  // "transactionId":"7E163156-7762-4BEB-A1C6-729EA81755A7"
 }
 
 if (this.currentmailfor=='c'){
 
  let newmail = 
 {
   "subject": this.subject,
   "body": {
     "contentType": "HTML",
     "content":  this.comments//.replace(/<[^>]+>/g, '')
   },
   "start": {
       "dateTime": new Date(this.eventData?.eventAt),
       "timeZone": "Indian Standard Time"
   },
   "end": {
       "dateTime": this.addMinsToDate(new Date(this.eventData?.eventAt), this.eventData?.clientMinDuration),
       "timeZone": "Indian Standard Time"
   },
   "location":{
       "displayName":"Online"
   },
   "attendees": emailVariableObj,
   "allowNewTimeProposals": true,
   "clientMailid":"",
   "sentto":this.receiverTo,
   "sentcc":this.receiverCC
 }
 
 
 console.log(this.comments);
 
 this.currentmaildata=newmail;
 
 this.send(newEvent,newmail,mailtype);
 }
 else
 {
   
  let newmail = 
 {
   "subject": this.subject,
   "body": {
     "contentType": "HTML",
     "content":  this.comments //.replace(/<[^>]+>/g, '')
   },
   "start": {
       "dateTime": new Date(this.eventData?.eventAt),
       "timeZone": "Indian Standard Time"
   },
   "end": {
       "dateTime": this.addMinsToDate(new Date(this.eventData?.eventAt), this.eventData?.clientMinDuration),
       "timeZone": "Indian Standard Time"
   },
   "location":{
       "displayName":"Online"
   },
   "attendees": emailVariableObj,
   "allowNewTimeProposals": true,
   "expertMailid":"",
   "sentto":this.receiverTo,
   "sentcc":this.receiverCC
 }
 
 
 
 
 this.currentmaildata=newmail;
 
 this.send(newEvent,newmail,mailtype);
 
 
 }
 console.log(newEvent);
 
 
 
 
 
 
 // this.modalService.dismissAll();
 this.toasterService.success('Invitation Sent..','success');
 // this.receiverTo = '';
 
 const newEventdt = 
 {
   "subject": this.subject,
   "body": {
     "contentType": "HTML",
     "content":  this.comments //.replace(/<[^>]+>/g, '')
   },
   "start": {
       "dateTime": new Date(this.eventData?.eventAt),
       "timeZone": "Indian Standard Time"
   },
   "end": {
       "dateTime": this.addMinsToDate(new Date(this.eventData?.eventAt), this.eventData?.clientMinDuration),
       "timeZone": "Indian Standard Time"
   },
   "location":{
       "displayName":"Online"
   },
   "attendees": emailVariableObj,
   "allowNewTimeProposals": true,
   "clientMailid": this.clientmailmsid,
   "sentto":this.receiverTo,
   "sentcc":this.receiverCC
  // "transactionId":"7E163156-7762-4BEB-A1C6-729EA81755A7"
 }
 //"clientmsMailid": this.clientmailmsid,
 //this.updateEventMails(newEventdt,true)
 
 
     if (arr.length) {
     //  this.toasterService.error('Please enter proper email(s) !.', 'Error!');
     }
 
  }
 
 
  sendExpertMSInvitation(mailtype:string) {
 
 if (mailtype=='c')
 {
 
 this.cancelmail(this.expertmailmsid)
  return;
 
 }
 
 
 
  let emailVariableObj:object[]= [];
        
  this.currentmailfor='e';
 
 let arr = this.receiverTo?.split(',');
     if (arr.length) {
 for (let i = 0; i < arr?.length; i++) {
 
 emailVariableObj.push( { "emailAddress": {
         "address":arr[i],
         "name": ""
       },
       "type": "required"}
      )
      }
     }
 
 
  if (this.receiverCC) {
         let arrCC = this.receiverCC?.split(',');
         for (let i = 0; i < arrCC?.length; i++) {
 
 
 emailVariableObj.push({"emailAddress": {
         "address":arrCC[i],
         "name": ""
       },
       "type": "optional"}
 )
 
         }
       }
 //this.currentmaildata="";
  const newEvent = 
 {
   "subject": this.subject,
   "body": {
     "contentType": "HTML",
     "content":  this.comments //.replace(/<[^>]+>/g, '')
   },
   "start": {
       "dateTime": new Date(this.eventData?.eventAt),
       "timeZone": "Indian Standard Time"
   },
   "end": {
       "dateTime": this.addMinsToDate(new Date(this.eventData?.eventAt), this.eventData?.clientMinDuration),
       "timeZone": "Indian Standard Time"
   },
   "location":{
       "displayName":"Online"
   },
   "attendees": emailVariableObj,
   "allowNewTimeProposals": true,
  // "transactionId":"7E163156-7762-4BEB-A1C6-729EA81755A7"
 }
 
 
   
  let newmail = 
 {
   "subject": this.subject,
   "body": {
     "contentType": "HTML",
     "content":  this.comments //.replace(/<[^>]+>/g, '')
   },
   "start": {
       "dateTime": new Date(this.eventData?.eventAt),
       "timeZone": "Indian Standard Time"
   },
   "end": {
       "dateTime": this.addMinsToDate(new Date(this.eventData?.eventAt), this.eventData?.clientMinDuration),
       "timeZone": "Indian Standard Time"
   },
   "location":{
       "displayName":"Online"
   },
   "attendees": emailVariableObj,
   "allowNewTimeProposals": true,
   "expertMailid":"",
   "sentto":this.receiverTo,
   "sentcc":this.receiverCC
 }
 
 this.currentmailfor='e';
 
 
 this.currentmaildata=newmail;
 
 this.send(newEvent,newmail,mailtype);
 
 
 
 console.log(newEvent);
 
 
 
 
 
 
      // this.modalService.dismissAll();
    //   this.toasterService.success('Invitation Sent..');
 
  }
 
 
   sendClientInvitation() {
     let eventObj;
     debugger;
     let arr = this.receiverTo?.split(',');
     if (arr.length) {
       for (let i = 0; i < arr?.length; i++) {
         eventObj = {
           Organizer: this.whoaim?.username,
           MailTo: arr[i],
           MailSubject: this.subject,
           MailBody: this.comments.replace(/<[^>]+>/g, ''),
           NewUniqueId: this.newUniqueId,
           CreatedDate: new Date(),
           StartDate: new Date(this.eventData?.eventAt),
           EndDate: this.addMinsToDate(new Date(this.eventData?.eventAt), this.eventData?.clientMinDuration),
           Location: '',
           MailTypeCancel: false,
         };
         this.emailService.sentInvitation(eventObj);
       }
       if (this.receiverCC) {
         let arrCC = this.receiverCC?.split(',');
         for (let i = 0; i < arrCC?.length; i++) {
           eventObj = {
             Organizer: this.whoaim?.username,
             MailTo: arrCC[i],
             MailSubject: this.subject,
             MailBody: this.comments.replace(/<[^>]+>/g, ''),
             NewUniqueId: this.newUniqueId,
             CreatedDate: new Date(),
             StartDate: new Date(this.eventData?.eventAt),
             EndDate: this.addMinsToDate(new Date(this.eventData?.eventAt), this.eventData?.clientMinDuration),
             Location: '',
             MailTypeCancel: false,
           };
           this.emailService.sentInvitation(eventObj);
         }
       }
 
       this.modalService.dismissAll();
       this.toasterService.success('Invitation Sent..','success');
       //this.receiverTo = '';
     } else {
       this.toasterService.error('Please enter proper email(s) !.', 'Error!');
     }
   }
 
   sendExpertInvitation() {
     debugger;
     let eventObj;
 
     let arr = this.receiverTo?.split(',');
     if (arr.length) {
       for (let i = 0; i < arr?.length; i++) {
         eventObj = {
           Organizer: this.whoaim?.username,
           MailTo: arr[i],
           MailSubject: this.subject,
           MailBody: this.comments.replace(/<[^>]+>/g, ''),
           NewUniqueId: this.newUniqueId,
           CreatedDate: new Date(),
           StartDate: new Date(this.eventData?.eventAt),
           EndDate: this.addMinsToDate(new Date(this.eventData?.eventAt), this.eventData?.expertMinDuration),
           Location: '',
           MailTypeCancel: false,
         };
         this.emailService.sentInvitation(eventObj);
       }
       if (this.receiverCC) {
         let arrCC = this.receiverCC?.split(',');
         // let arrCC = this.receiverCC;
 
         for (let i = 0; i < arrCC?.length; i++) {
           eventObj = {
             Organizer: this.whoaim?.username,
             MailTo: arrCC[i],
             MailSubject: this.subject,
             MailBody: this.comments.replace(/<[^>]+>/g, ''),
             NewUniqueId: this.newUniqueId,
             CreatedDate: new Date(),
             StartDate: new Date(this.eventData?.eventAt),
             EndDate: this.addMinsToDate(new Date(this.eventData?.eventAt), this.eventData?.expertMinDuration),
             Location: '',
             MailTypeCancel: false,
           };
           this.emailService.sentInvitation(eventObj);
         }
       }
 
       this.modalService.dismissAll();
       this.toasterService.success('Invitation Sent..','success');
      // this.receiverTo = '';
     } else {
       this.toasterService.error('Please enter proper email(s) !.', 'Error!');
     }
   }
 
   getUTCdate(d: Date) {
     let complete = Date.UTC(
       d.getUTCFullYear(),
       d.getUTCMonth(),
       d.getUTCDate(),
       d.getUTCHours(),
       d.getUTCMinutes(),
       d.getUTCSeconds()
     );
     return parseInt(complete.toString().substring(0, 10));
   }
 
   addMinsToDate(d: Date, mins: number) {
     return new Date(d.getTime() + mins * 60000);
   }
 
 // unsubscribe to events when component is destroyed   
 
 /***************gs *MSAL*********************/
   ngOnDestroy(): void {
     this._destroying$.next(undefined);
     this._destroying$.complete();
   }
 
   setLoginDisplay() {
     this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
   }
 
 msuserid:any;
 
  isready:any ='';
 dataSource:any;
   getProfile(providerOptions: ProviderOptions) {
 
      console.log('getProfile called');
     this.graphService.getGraphClient(providerOptions)
     .api('/me').get()
     .then((profileResponse: ProfileType) => {
 
        console.log('getProfile got response');
        console.log(profileResponse);
 
 this.msuserid =profileResponse['id'];
 /*
 
       this.isready=1;
       this.dataSource = [
         {id: 1, claim: "Name", value: profileResponse ? profileResponse['givenName'] : null},
         {id: 2, claim: "Surname", value: profileResponse ? profileResponse['surname'] : null},
         {id: 3, claim: "User Principal Name (UPN)", value: profileResponse ? profileResponse['userPrincipalName'] : null},
         {id: 4, claim: "ID", value: profileResponse ? profileResponse['id']: null}
       ];
       console.log(this.dataSource);
 */
        
     })
     .catch((error) => {
       console.log(error);
     });
   }
 
 
  Sendclientmail( evnt:any, evnt1:any) {
 
 
  this.checkAndSetActiveAccount();
 
 
     const providerOptions1: ProviderOptions = {
       account: this.authService.instance.getActiveAccount(),    // interactionType: InteractionType.Redirect
       scopes: protectedResources.graphMe.scopes ,
        interactionType: InteractionType.Silent
     };
    
  console.log(evnt);
   
 /*
 if (this.msuserid=='')
 {
 this.getProfile(providerOptions1);
 }
 */
 
      console.log('email being sent ');
      this.graphService.getGraphClient(providerOptions1)
     .api('/me/events')
       .post(evnt)
     .then((profileResponse: any) => {
 
        console.log('email got response');
 
        console.log(profileResponse);
      
  console.log("id="+ profileResponse["id"]);
 
 this.clientmailmsid=profileResponse["id"];
  // clientmailmsid: string;
   // expertmailmsid: string;
 
 this.currentmaildata["clientMailid"]= this.clientmailmsid;
 
 
 this.updateEventMails(evnt1,true)
  this.modalService.dismissAll();
 
     })
     .catch((error) => {
       console.log(error);
        console.log(evnt);
         this.modalService.dismissAll();
     });
   
 }
 
 
  Sendexpertmail( evnt:any, evnt1:any) {
 
 
 
  this.checkAndSetActiveAccount();
 
 
     const providerOptions1: ProviderOptions = {
       account: this.authService.instance.getActiveAccount(),    // interactionType: InteractionType.Redirect
       scopes: protectedResources.graphMe.scopes ,
        interactionType: InteractionType.Popup
     };
    
  console.log('expert evnt');
 
  console.log(evnt);
 
      console.log('expert email being sent ');
      this.graphService.getGraphClient(providerOptions1)
     .api('/me/events')
       .post(evnt)
     .then((profileResponse: any) => {
 
        console.log('email got response');
 
        console.log(profileResponse);
      
  console.log("id="+ profileResponse["id"]);
 
  
 this.expertmailmsid=profileResponse["id"];
   this.currentmaildata["expertMailid"]= this.expertmailmsid;
 
 
 this.updateEventMails(evnt1,false)
  this.modalService.dismissAll();
 
     })
     .catch((error) => {
       console.log(error);
        this.modalService.dismissAll();
       
 
     });
   
 }
 
  cancelmail( id:string) {
 
  
 
  this.checkAndSetActiveAccount();
 
 
     const providerOptions: ProviderOptions = {
       account: this.authService.instance.getActiveAccount(),    // interactionType: InteractionType.Redirect
       scopes: protectedResources.graphMe.scopes ,
        interactionType:InteractionType.Popup
     };
 
     // Build a Graph event
     const msg = 
 {
    
   "Comment":  this.comments //.replace(/<[^>]+>/g, '') //"Cancelling  this event"
 }
 
 //const id='AAMkAGQ5YTY3N2UzLTQ4ZWItNGZjZC05NzRhLTU5MzhjYzUzYWUzMQBGAAAAAABbAPkWiqlUQ7gKO5yYMpFNBwA7I-ySCvD8TaPXYWXe1bLhAAAAAAENAAA7I-ySCvD8TaPXYWXe1bLhAAABrOMjAAA='
 
 
      console.log('cancel called');
      this.graphService.getGraphClient(providerOptions)
     .api('/me/events/'+id+'/cancel')
       .post(msg)
 
     .then((profileResponse: any) => {
 
        console.log('cancel got response');
       // console.log(profileResponse);
       this.modalService.dismissAll();
       this.toasterService.success('Invitation Cancelled..','success');
 
        console.log(profileResponse);
      
  //console.log("id="+ profileResponse["id"]);
 //this.clientmailmsid=profileResponse["id"];
  // clientmailmsid: string;
   // expertmailmsid: string;
 
 //this.currentmaildata["clientMailid"]= this.clientmailmsid;
 //this.updateEventMails(evnt1,true)
  this.modalService.dismissAll();
 
     })
     .catch((error) => {
       console.log(error);
        this.modalService.dismissAll();
     });
   
 }
 
 
  updatemail( evnt:any, evnt1:any ) {
 
 
   this.checkAndSetActiveAccount();
 
 
     const providerOptions1: ProviderOptions = {
       account: this.authService.instance.getActiveAccount(),    // interactionType: InteractionType.Redirect
       scopes: protectedResources.graphMe.scopes ,
        interactionType: InteractionType.Popup
     };
 
   
 if(this.currentmailfor='c')
 {
 
      console.log('getProfile called');
      this.graphService.getGraphClient(providerOptions1)
     .api('/me/events/'+this.clientmailmsid)
       .patch(evnt)
 
     .then((profileResponse: any) => {
 
        console.log('getProfile got response');
       // console.log(profileResponse);
      
        console.log(profileResponse);
      
  //console.log("id="+ profileResponse["id"]);
 this.clientmailmsid=profileResponse["id"];
  // clientmailmsid: string;
   // expertmailmsid: string;
 
 this.currentmaildata["clientMailid"]= this.clientmailmsid;
 this.updateEventMails(evnt1,true)
  this.modalService.dismissAll();
 
     })
     .catch((error) => {
       console.log(error);
        this.modalService.dismissAll();
     });
   }
   else
   {
 
     console.log('getProfile called');
      this.graphService.getGraphClient(providerOptions1)
     .api('/me/events/'+this.expertmailmsid)
       .patch(evnt)
 
     .then((profileResponse: any) => {
 
        console.log('getProfile got response');
       // console.log(profileResponse);
      
        console.log(profileResponse);
      
  //console.log("id="+ profileResponse["id"]);
 this.expertmailmsid=profileResponse["id"];
  // clientmailmsid: string;
   // expertmailmsid: string;
 
 this.currentmaildata["cexpertMailid"]= this.expertmailmsid;
 this.updateEventMails(evnt1,false)
  this.modalService.dismissAll();
 
     })
     .catch((error) => {
       console.log(error);
        this.modalService.dismissAll();
     });
 
 
 
 
 
   }
 }
 
 
 
 
   login() {
     if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
       if (this.msalGuardConfig.authRequest){
         this.authService.loginPopup({...this.msalGuardConfig.authRequest} as PopupRequest)
           .subscribe((response: AuthenticationResult) => {
             this.authService.instance.setActiveAccount(response.account);
             console.log('response.account');
             console.log(response.account);
            
           });
         } else {
           this.authService.loginPopup()
             .subscribe((response: AuthenticationResult) => {
               this.authService.instance.setActiveAccount(response.account);
                console.log('response.account1');
             console.log(response.account);
             });
       }
     } else {
       if (this.msalGuardConfig.authRequest){
         this.authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest);
          console.log('response.account2');
          //   console.log(response.account);
       } else {
         this.authService.loginRedirect();
          console.log('response.account3');
        //    console.log(response.account);
       }
     }
   }
 
 
   checkAndSetActiveAccount(){
    
     let activeAccount = this.authService.instance.getActiveAccount();
 
      if (activeAccount)
      {
         this.authService.instance.setActiveAccount(activeAccount);
          console.log(' in set activeAccount2');
      }
 console.log('activeAccount');
 console.log(activeAccount);
 
     if (!activeAccount && this.authService.instance.getAllAccounts().length > 0) {
       let accounts = this.authService.instance.getAllAccounts();
       this.authService.instance.setActiveAccount(accounts[0]);
       console.log(' in set activeAccount');
     }
     else
     {
 
 console.log('in acquireTokenSilent');
 const account = this.authService.instance.getAllAccounts()[0];
 
 const accessTokenRequest = {
     scopes: ["user.read"],
     account: account
 }
 
 
 
 console.log(account);
  this.authService.acquireTokenSilent(accessTokenRequest)
             .subscribe((response: AuthenticationResult) => {
               this.authService.instance.setActiveAccount(response.account);
                console.log('response.account1');
             console.log(response.account);
             });
 
 
 /*
  this.authService.loginPopup()
             .subscribe((response: AuthenticationResult) => {
               this.authService.instance.setActiveAccount(response.account);
                console.log('response.account1');
             console.log(response.account);
             });
 */
 
 /*
  this.authService
             .acquireTokenSilent(...this.msalGuardConfig.authRequest)
             .subscribe((res) => {
                 console.log("acquireTokenPopup");
                // this.token = res.accessToken;
                // this.getUser();
             })
             .catch((e) => {
                 console.log("acquireTokenPopup catch");
                 console.log(e);
             });
 */
 
 
 //this.authService.acquireTokenSilent(...this.msalGuardConfig.authRequest);
 /*
 const renewIdTokenRequest = {
       scopes: ['5793930f-c2a4-4d7d-87aa-74697faf522a']
     };
 this.authService.acquireTokenSilent(renewIdTokenRequest).then(re=>{
       console.log('response',re)
     })
 */
     }
 }
 
   send(evnt:any, evnt1:any,mailtype:string) {
    
 
 
    // this.getProfile(providerOptions);
 if (mailtype='s')
 {
 
     if (this.currentmailfor=='c')
     {
     this.Sendclientmail(evnt, evnt1);
     }
     else
     {
     this.Sendexpertmail(evnt, evnt1);
 
     }
 
 }
 else  if (mailtype='u')
 {
 this.updatemail(evnt, evnt1);
 }
 
 //this.cancelmail(providerOptions);  //cancelmail updatemail
 
 
 }
 
 
 
 
   logout() {
     this.authService.logout();
   }
 
 
 
 
 
 /*
   login() {
     if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
       if (this.msalGuardConfig.authRequest){
         this.authService.loginPopup({...this.msalGuardConfig.authRequest} as PopupRequest)
           .subscribe((response: AuthenticationResult) => {
             this.authService.instance.setActiveAccount(response.account);
           });
         } else {
           this.authService.loginPopup()
             .subscribe((response: AuthenticationResult) => {
               this.authService.instance.setActiveAccount(response.account);
             });
       }
     } else {
       if (this.msalGuardConfig.authRequest){
         this.authService.loginRedirect({...this.msalGuardConfig.authRequest} as RedirectRequest);
       } else {
         this.authService.loginRedirect();
       }
     }
   }*/
 
 
 /***************gs *MSAL*********************/
 }


