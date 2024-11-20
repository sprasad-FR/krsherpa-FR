import { EmployeeService } from '../../../core/services/employee.service';
import { from } from 'rxjs';
import { EventService } from '../../../core/services/event.service';
import { ExpertInvoice } from '../../../core/models/expert-invoice.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoiceService } from '../../../core/services/invoice.service';
import { EntityDetails } from '../generate-invoice/krEntity.data';
import { Logger } from '../../../core/logger.service';
import { ToastService } from '../../toast-service';
import { Event } from '../../../core/models/event.model';
import { ExpertService } from '../../../core/services/expert.service';
import { Expert } from '../../../core/models/expert.model';
import { EmailJsTemplates } from '../../../core/models/options';
import { EmailService } from '../../../core/services/email.service';
import { employeeUser } from '../../../core/models/employee.model';
const log = new Logger('Events Component');

@Component({
  selector: 'app-expert-invoice-list',
  templateUrl: './expert-invoice-list.component.html',
  styleUrls: ['./expert-invoice-list.component.scss'],
})
export class ExpertInvoiceListComponent implements OnInit {
  isLoading: boolean = false;
  error: any;
  invoiceData: ExpertInvoice;
  paidInvoiceList: ExpertInvoice[];
  Id: string;
  InvoiceDetails: ExpertInvoice;
  entity: any[];
  match: ExpertInvoice[];
  entityDetails: any;
  expertId: string;
  leadModalTitle: string;
  unpaidInvoiceList: ExpertInvoice[];
  InvoiceToRemove: ExpertInvoice;
  removableEvents: any[];
  delEventDetails: any[];
  amount: number;
  updateEventAfterRemove: any;
  expertList: Expert[];
  expId: string;
  EmailJsTemplates: object;
  whoaim: any;
  roles: any;
  expert: any;
  expertNinvoiceId: object;
  ExpertName: any;
  emailToSend: any[];
  empList: any;
  emailVariableObj: {};

  constructor(
    public readonly expertService: ExpertService,
    public route: ActivatedRoute,
    private modalService: NgbModal,
    public readonly invoiceService: InvoiceService, 
    private toasterService: ToastService,  
    private readonly eventService: EventService,
    private emailService: EmailService
  ) {
    this.whoaim = JSON.parse(localStorage.getItem('user'));
    this.roles = this.whoaim.roles[0];
    this.empList = JSON.parse(window.localStorage.getItem('emp'));
    this.expert = JSON.parse(localStorage.getItem('expert'));
  }

  ngOnInit(): void {
    this.getExpertList();
    this.getUnpaidInvoice();
    this.getPaidInvoice();
    this.entity = EntityDetails;
  }

  getExpertList() {
    this.expertService.getAll().subscribe(
      (response) => {
        this.expertList = response;
        this.expertList?.map((i) => {
          i.fullName = i.firstName + ' ' + i.lastName;
          return i;
        });
      },
      (error: any) => {}
    );
  }

  selectedExpert(value) {
    this.expId = value;
    let searchInExp = this.expertList?.find((x) => x.id == this.expId);
    //  let emailVariableObj = {};
    this.emailToSend = [];
    this.emailVariableObj['firstName'] = searchInExp?.firstName;
    this.emailVariableObj['lastName'] = searchInExp?.lastName;
    let reporingId = this.empList?.find((x) => x.userId == searchInExp?.krRelationshipMgrId)?.repotingManagerId;
    this.emailToSend.push(this.empList?.find((x) => x.userId == reporingId)?.email);
    this.getUnpaidInvoice();
    this.getPaidInvoice();
  }

  getUnpaidInvoice() {
    const filters = new Map();
    const filter = {
      where: {
        and: [],
      },
    };
    if (this.roles == 'expert') {
      filter.where.and.push({ expertId: this.expert.id }, { status: 'Unpaid' });
    } else {
      filter.where.and.push({ expertId: this.expId }, { status: 'Unpaid' });
    }

    filter.where.and.push({"datasrc" : { "ne": "importOld"}} );

    filters.set('filter', JSON.stringify(filter));
    return this.invoiceService.getAllExpertInvoice(filters).subscribe(
      (response) => {
        this.unpaidInvoiceList = response;
      },
      (error) => {
        log.error(error);
        log.debug('Not Created');
        this.error = error;
      }
    );
  }

  getPaidInvoice() {
    const filters = new Map();
    const filter = {
      where: {
        and: [],
      },
    };
    if (this.roles == 'expert') {
      filter.where.and.push({ expertId: this.expert.id }, { status: 'Paid' });
    } else {
      filter.where.and.push({ expertId: this.expId }, { status: 'Paid' });
    }
    filters.set('filter', JSON.stringify(filter));
    return this.invoiceService.getAllExpertInvoice(filters).subscribe(
      (res: any) => {
        this.paidInvoiceList = res;
      },
      (error: any) => {}
    );
  }

  markPaid(id) {
    this.invoiceService.showExpertInvoice(id).subscribe((response) => {
      this.invoiceData = response;
      this.invoiceData.invoiceDate = this.invoiceData?.invoiceDate.split('T')[0];
      this.invoiceData.invoiceStartDate = this.invoiceData?.invoiceStartDate.split('T')[0];
      this.invoiceData.invoiceEndDate = this.invoiceData?.invoiceEndDate.split('T')[0];
      this.invoiceData.status = 'Paid';
      this.invoiceService.updateExpertInvoice(id, this.invoiceData).subscribe(
        (response) => {
          this.invoiceData = response;
          log.debug('response: ', response);
          this.isLoading = false;
          this.toasterService.success('Invoice Marked as paid.', 'Success!');
          //email notification
          this.emailVariableObj = {
            notificationType: 'skipEmail',
          };
          this.emailService.sendEmail(
            EmailJsTemplates.expertInvoicePaid,
            this.emailToSend,
            'Approval',
            this.emailVariableObj
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

  viewInvoice(invoiceDetails: any, id) {
    this.Id = id;
    this.invoiceService.showExpertInvoice(id).subscribe(
      (response) => {
        this.InvoiceDetails = response;
        this.modalService.open(invoiceDetails, { centered: true, windowClass: 'modal-holder' });

        this.match = this.entity.filter((x) => x.id == this.InvoiceDetails.entity);
        this.entityDetails = this.match[0];
      },
      (error) => {
        log.error(error);
        log.debug('Not Created', this.InvoiceDetails);
        this.error = error;
      }
    );
  }

  // Edit Invoice
  Edit(editInvoice: any, id, eid) {
    this.Id = id;
    this.expertId = eid;
    this.leadModalTitle = 'Edit Client Invoice';
    this.modalService.open(editInvoice, { centered: true, windowClass: 'modal-holder' });
  }

  // Add new event in invoice
  addNewEvent(newEventModal) {
    this.expertNinvoiceId = { id: this.Id, exId: this.expertId };
    this.modalService.open(newEventModal, { size: 'lg', centered: true, windowClass: 'modal-holder' });
  }

  //remove event from invoioce
  removeFromInvoice(removeEventModal: any) {
    this.invoiceService.showExpertInvoice(this.Id).subscribe(
      (response) => {
        this.InvoiceToRemove = response;
        this.removableEvents = this.InvoiceToRemove?.events;
        let arrFilterId = [];
        for (let i = 0; i < this.removableEvents?.length; i++) {
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
        this.eventService.show(this.delEventDetails[i]?.id).subscribe((ev) => {
          this.updateEventAfterRemove = ev;
          this.updateEventAfterRemove.expertInvoiceId = '';
          this.amount = this.updateEventAfterRemove?.clientPayableAmount;
          this.eventService.update(this.updateEventAfterRemove?.id, this.updateEventAfterRemove).subscribe(
            (res) => {
              log.debug('response: ', res);
              this.isLoading = false;
              this.toasterService.success('Event updated successfully.', 'Success!');
              //update expert invoice
              let x = this.removableEvents.splice(this.removableEvents?.indexOf(this.updateEventAfterRemove.id), 1);
              this.InvoiceToRemove.events = this.removableEvents;
              this.InvoiceToRemove.invoiceDate = this.InvoiceToRemove?.invoiceDate.toString().split('T')[0];
              this.InvoiceToRemove.invoiceStartDate = this.InvoiceToRemove?.invoiceStartDate.toString().split('T')[0];
              this.InvoiceToRemove.invoiceEndDate = this.InvoiceToRemove?.invoiceEndDate.toString().split('T')[0];
              this.InvoiceToRemove.total = this.InvoiceToRemove?.total - this.amount;
              this.invoiceService.updateOnlyExpertInvoice(this.Id, this.InvoiceToRemove).subscribe(
                (response) => {
                  log.debug('response: ', response);
                  this.isLoading = false;
                  this.toasterService.success('Expert invoice updated successfully.', 'Success!');
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
