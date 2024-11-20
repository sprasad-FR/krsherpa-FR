import { EmployeeService } from '../../../core/services/employee.service';
import { EmailService } from '../../../core/services/email.service';
import { Project } from '../../../core/models/project.model';
import { Event } from '../../../core/models/event.model';
import { ClientInvoice } from '../../../core/models/client-invoice.model';
import { EventService } from '../../../core/services/event.service';
import { InvoiceService } from '../../../core/services/invoice.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Logger } from '../../../core/logger.service';
import { ToastService } from '../../toast-service';  
import { EntityDetails } from '../generate-invoice/krEntity.data';
import { FormBuilder, Validators } from '@angular/forms';
import { ClientsService } from '../../../core/services/clients.service';
import { Clients } from '../../../core/models/clients.model';
import { ProjectService } from '../../../core/services/project.service';
import { EmailJsTemplates } from '../../../core/models/options';
import { employeeUser } from '../../../core/models/employee.model';
import { DateToLocalPipe,GetShortPipe,getCompanyTypePipe,GetInitialsPipe } from '../pipe';

const log = new Logger('Events Component');

@Component({
  selector: 'app-msaClients',
  templateUrl: './msaClients.component.html',
  styleUrls: ['./msaClients.component.scss'],
  providers: [DateToLocalPipe,getCompanyTypePipe,GetInitialsPipe ],
})
export class msaClientsComponent implements OnInit {
  isLoading: boolean = false;
  error: any;
  invoiceData: ClientInvoice;
  paidInvoiceList: ClientInvoice[];
  Id: string;
  InvoiceDetails: ClientInvoice;
  entity: any[];
  match: ClientInvoice[];
  entityDetails: any;
  data: Event;
  invoiceDate: any;
  leadModalTitle: string;
  clientId: string;
  total: number;
  clientList: Clients[];
  UnpaidinvoiceList: ClientInvoice[];
  InvoiceToRemove: ClientInvoice;
  removableEvents: string[];
  delEventDetails: any[];
  amount: number;
  updateEventAfterRemove: any;
  Cid: string;
  Pid: string;
  clienNinvoiceId: object;
  EmailJsTemplates: object;
  whoaim: any;
  roles: any;
  anotherRoles: any;
  client: any;
  emailToSend: any[];
  empList: any;
  arrOfEMpIds: any[];
  ClientName: any;

  fmonth:string;
  fyear:string;
    tmonth:string;
  tyear:string;

    years = [];
    months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

  constructor(
    private readonly clientsService: ClientsService,
    public route: ActivatedRoute,
    private modalService: NgbModal,
    public readonly invoiceService: InvoiceService, 
    private toasterService: ToastService,  
    private formbuilder: FormBuilder,
    private readonly eventService: EventService,
    private emailService: EmailService
  ) {
    this.whoaim = JSON.parse(localStorage.getItem('user'));
    this.roles = this.whoaim.roles[0];
    this.anotherRoles = this.whoaim.roles[1];
    this.client = JSON.parse(localStorage.getItem('client'));
    this.empList = JSON.parse(window.localStorage.getItem('emp'));
  }

  invoiceForm = this.formbuilder.group({
    invoiceNo: [null, [Validators.required]],
    name: [null, [Validators.required]],
    address: [null, [Validators.required]],
    bankName: [null, [Validators.required]],
    branch: [null, [Validators.required]],
    accountNo: [null, [Validators.required]],
    ifscCode: [null, [Validators.required]],
  });

  ngOnInit(): void {
    this.getClientlist();
    this.getUnpaidInvoice();
    this.getPaidInvoice();
    this.entity = EntityDetails;
         let year = new Date().getFullYear();
    for (let i = year; i > year - 3; i--) {
      this.years.push(i);
    }
this.fmonth=this.months[new Date().getMonth()]; 
this.tmonth=this.months[new Date().getMonth()]; 
this.fyear=new Date().getFullYear().toString();
this.tyear=new Date().getFullYear().toString();
 //this.getUnpaidInvoice();
   //       this.getPaidInvoice();
  }

  getInv() {
 this.getUnpaidInvoice();
          this.getPaidInvoice();
  }

  //client list
  getClientlist() {
    const filters = new Map();
    const filter = {
      where: {
        and: [],
      },
    };

    filter.where.and.push({ agreementType: 'MSA' }, { msaValue:{gte: ' ' }},
   
         );

         filters.set('filter', JSON.stringify(filter));
    this.clientsService.getAll(filters).subscribe(
      (response) => {
        this.clientList = response;
      },
      (error: any) => {}
    );
  }

  resetform() {

    this.fyear="";
    this.tyear="";
    this.fmonth="";
    this.tmonth="";
    this.ClientName="";
       

  }

/*
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
  }  */


  selectedClient(value) {
    this.Cid = value;
    let searchInClient = this.clientList?.find((x) => x.id == this.Cid);
    this.arrOfEMpIds?.push(searchInClient?.subPnlHeadId);
    this.arrOfEMpIds?.push(searchInClient?.accountManagerId);
    this.arrOfEMpIds?.push(this.empList?.find((x) => x.designation == 3));
    let selectedEmailPeople = this.empList?.filter((e) => this.arrOfEMpIds?.indexOf(e.id) != -1);
    this.emailToSend = selectedEmailPeople?.map((a) => a.email);
    this.getUnpaidInvoice();
    this.getPaidInvoice();
  }

  // get Unpaid invoces list
  getUnpaidInvoice() {
    const filters = new Map();
    const filter = {
      where: {
        and: [],
      },
    };


var start=this.fyear +"-"+this.fmonth+"-1"; 

var end=this.tyear +"-"+this.tmonth+"-31";


    if (this.roles == 'client' || this.anotherRoles == 'compliance') {
      filter.where.and.push({ clientId: this.client.id }, { status: 'Unpaid' },
   {"invoiceDate":{"gte" :start}},
            {"invoiceDate":{"lt" :end}}
        );
    } else {
      filter.where.and.push({ clientId: this.Cid }, { status: 'Unpaid' }, {"invoiceDate":{"gte" :start}},
            {"invoiceDate":{"lt" :end}});
    }
//filter.where.and.push({});
    filters.set('filter', JSON.stringify(filter));
    return this.invoiceService.getAllClientInvoice(filters).subscribe(
      (response) => {
        this.UnpaidinvoiceList = response;
      },
      (error) => {
        log.error(error);
        log.debug('Not Created');
        this.error = error;
      }
    );
  }
  // get Paid invoces list
  getPaidInvoice() {
    const filters = new Map();
    const filter = {
      where: {
        and: [],
      },
    };

var start=this.fyear +"-"+this.fmonth+"-1"; 

var end=this.tyear +"-"+this.tmonth+"-31";


    if (this.roles == 'client' || this.anotherRoles == 'compliance') {
      filter.where.and.push({ clientId: this.client.id }, { status: 'Paid' },  {"invoiceDate":{"gte" :start}},
            {"invoiceDate":{"lt" :end}});
    } else {
      filter.where.and.push({ clientId: this.Cid }, { status: 'Paid' }, {"invoiceDate":{"gte" :start}},
            {"invoiceDate":{"lt" :end}});
    }
    filters.set('filter', JSON.stringify(filter));
    return this.invoiceService.getAllClientInvoice(filters).subscribe(
      (event: any) => {
        this.paidInvoiceList = event;
      },
      (error: any) => {}
    );
  }
  // send invoices from unpaid to paid
  markPaid(id) {
    this.invoiceService.showClientInvoice(id).subscribe((response) => {
      this.invoiceData = response;
      this.invoiceData.invoiceDate = this.invoiceData?.invoiceDate.split('T')[0];
      this.invoiceData.invoiceStartDate = this.invoiceData?.invoiceStartDate.split('T')[0];
      this.invoiceData.invoiceEndDate = this.invoiceData?.invoiceEndDate.split('T')[0];
      this.invoiceData.status = 'Paid';

      this.invoiceService.updateClientInvoice(id, this.invoiceData).subscribe(
        (response) => {
          log.debug('response: ', response);
          this.isLoading = false;
          this.toasterService.success('Marked as paid.', 'Success!');
          //email
          let emailVariableObj = {
            notificationType: 'skipEmail',
          };
          this.emailService.sendEmail(
            EmailJsTemplates.clientInvoicePaid,
            this.emailToSend,
            'Informative',
            emailVariableObj
          );
          this.getUnpaidInvoice();
          this.getPaidInvoice();
        },
        (error) => {
          log.error(error);
          log.debug('Not Created', this.invoiceData);
          this.error = error;
        }
      );
    });
  }
  // View invoice details
  viewInvoice(invoiceDetails: any, id) {
    this.Id = id;
    this.invoiceService.showClientInvoice(this.Id).subscribe(
      (response) => {
        this.InvoiceDetails = response;
        this.modalService.open(invoiceDetails, { centered: true, windowClass: 'modal-holder' });
        this.match = this.entity?.filter((x) => x.id == this.InvoiceDetails.entity);
        this.entityDetails = this.match[0];
      },
      (error) => {
        log.error(error);
        log.debug('Not Created', this.InvoiceDetails);
        this.error = error;
      }
    );
  }
  // Edit Invoice model
  Edit(editInvoice: any, id, cid) {
    this.Id = id;
    this.clientId = cid;
    this.leadModalTitle = 'Edit Client Invoice';
    this.modalService.open(editInvoice, { centered: true, windowClass: 'modal-holder' });
  }

  // Add new event in invoice model
  addNewEvent(newEventModal: any) {
    this.clienNinvoiceId = { id: this.Id, cid: this.clientId };
    this.modalService.open(newEventModal, { centered: true, windowClass: 'modal-holder' });
  }

  //remove event from invoice model
  removeFromInvoice(removeEventModal: any) {
    this.invoiceService.showClientInvoice(this.Id).subscribe(
      (response) => {
        this.InvoiceToRemove = response;
        this.removableEvents = this.InvoiceToRemove?.events;
        let arrFilterId = [];
        for (let i = 0; i < this.removableEvents.length; i++) {
          arrFilterId.push({ id: this.removableEvents[i] });
        }
        const filters = new Map();
        const filter = {
          where: { or: arrFilterId },
        };
        filters.set('filter', JSON.stringify(filter));
        this.eventService.getAll(filters).subscribe(
          (response) => {
            this.delEventDetails = response;
            this.leadModalTitle = 'Remove Event';
            this.modalService.open(removeEventModal, { size: 'lg', centered: true, windowClass: 'modal-holder' });
          },
          (error: any) => {}
        );
      },
      (error: any) => {}
    );
  }
  checkAllRemoveCheckBox(rem) {
    this.delEventDetails.forEach((x) => (x.checked = rem.target.checked));
  }

  remove() {
    for (let i = 0; i < this.delEventDetails.length; i++) {
      if (this.delEventDetails[i].checked) {
        //show & update events
        this.updateEventAfterRemove = this.delEventDetails[i];
        this.eventService.show(this.delEventDetails[i].id).subscribe((ev) => {
          this.updateEventAfterRemove = ev;
          this.updateEventAfterRemove.clientInvoiceId = '';
          this.amount = this.updateEventAfterRemove?.clientPayableAmount;
          this.eventService.update(this.updateEventAfterRemove.id, this.updateEventAfterRemove).subscribe(
            (res) => {
              log.debug('response: ', res);
              this.isLoading = false;
              this.toasterService.success('Event updated successfully.', 'Success!');
              //update client invoice
              let x = this.removableEvents.splice(this.removableEvents.indexOf(this.updateEventAfterRemove.id), 1);
              this.InvoiceToRemove.events = this.removableEvents;
              this.InvoiceToRemove.invoiceDate = this.InvoiceToRemove?.invoiceDate.toString().split('T')[0];
              this.InvoiceToRemove.invoiceStartDate = this.InvoiceToRemove?.invoiceStartDate.toString().split('T')[0];
              this.InvoiceToRemove.invoiceEndDate = this.InvoiceToRemove?.invoiceEndDate.toString().split('T')[0];
              this.InvoiceToRemove.total = this.InvoiceToRemove?.total - this.amount;
              this.invoiceService.updateOnlyClientInvoice(this.Id, this.InvoiceToRemove).subscribe(
                (response) => {
                  log.debug('response: ', response);
                  this.isLoading = false;
                  this.toasterService.success('Client invoice updated successfully.', 'Success!');
                },
                (error) => {
                  log.error(error);
                  log.debug('Not Created', this.InvoiceToRemove);
                  this.error = error;
                }
              );
            },
            (error) => {
              log.error(error);
              log.debug('Not Created', this.updateEventAfterRemove);
              this.error = error;
            }
          );
        });
      }
    }
    this.modalService.dismissAll();
  }
}
