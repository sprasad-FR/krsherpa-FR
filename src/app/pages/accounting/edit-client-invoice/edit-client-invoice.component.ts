import { Component, Input, OnInit } from '@angular/core';
import { ClientsService } from '../../../core/services/clients.service';
import { EventService } from '../../../core/services/event.service';
import { InvoiceService } from '../../../core/services/invoice.service';
import { ClientInvoice } from '../../../core/models/client-invoice.model';
import { Event } from '../../../core/models/event.model';
import { Logger } from '../../../core/logger.service';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExpertService } from '../../../core/services/expert.service';
import { Expert } from '../../../core/models/expert.model';

const log = new Logger('Events Component');

@Component({
  selector: 'app-edit-client-invoice',
  templateUrl: './edit-client-invoice.component.html',
  styleUrls: ['./edit-client-invoice.component.scss'],
})
export class EditClientInvoiceComponent implements OnInit {
  @Input() dataToEdit: any;

  clientId: string;
  clientInvoiceId: string;
  leadModalTitle: string;
  eventlistForClient: any[];
  isLoading: boolean = false;
  error: any;
  eventInvoice: any[];
  tempEventIds: string[];
  ClInvoiceTotal: number;
  selectedEvent: string[];
  oldClientInvoiceData: ClientInvoice;
  oldEventId: string[];
  oldTotal: number;
  newTotal: number;
  data: Event;
  expertList: Expert[];
  showBtn: boolean;

  constructor(
    private toasterService: ToastrService,
    private readonly clientsService: ClientsService,
    private readonly eventService: EventService,
    public readonly invoiceService: InvoiceService,
    private modalService: NgbModal,
    private expertService: ExpertService
  ) {}

  ngOnInit(): void {
    this.dataToEdit = this.dataToEdit;
    this.clientId = this.dataToEdit.cid;
    this.clientInvoiceId = this.dataToEdit.id;

    this.leadModalTitle = 'Add New Event';
    const filters = new Map();
    const filter = {
      where: {
        clientId: this.clientId,
        status: 'Completed',
        clientInvoiceId: '',
      },
      include: [
        {
          relation: 'expert',
        },
      ],
    };
    filters.set('filter', JSON.stringify(filter));
    this.eventService.getAll(filters).subscribe(
      (response) => {
        this.eventlistForClient = response;
      },
      (error: any) => {}
    );
    this.getExpertList();
  }
  checkAllCheckBox(ev) {
    this.eventlistForClient.forEach((x) => (x.checked = ev.target.checked));
    this.createInvoiceBtn();
  }

  addEventintoInvoice() {
    this.eventInvoice = [];
    this.tempEventIds = [];
    this.ClInvoiceTotal = 0;
    for (let i = 0; i < this.eventlistForClient.length; i++) {
      if (this.eventlistForClient[i].checked) {
        this.eventInvoice.push(this.eventlistForClient[i]);
        this.ClInvoiceTotal += this.eventlistForClient[i].clientPayableAmount;
        this.tempEventIds.push(this.eventlistForClient[i].id);
      }
    }
    this.selectedEvent = this.tempEventIds;
    this.invoiceService.showClientInvoice(this.clientInvoiceId).subscribe(
      (res) => {
        this.oldClientInvoiceData = res;
        this.oldEventId = this.oldClientInvoiceData.events;
        this.oldEventId = this.oldEventId.concat(this.selectedEvent);
        this.oldTotal = this.oldClientInvoiceData.total;
        this.newTotal = this.oldTotal + this.ClInvoiceTotal;

        var updateInvoice = {
          events: this.oldEventId,
          total: this.newTotal,
          convertionrate:0,
        };
        // update client invoice with events
        this.invoiceService.updateOnlyClientInvoice(this.clientInvoiceId, updateInvoice).subscribe(
          (response) => {
            log.debug('response: ', response);
            this.isLoading = false;
            for (let i = 0; i < this.selectedEvent.length; i++) {
              //get Event Data by id
              this.eventService.show(this.selectedEvent[i]).subscribe(
                (event: any) => {
                  this.data = event;
                  this.data.clientInvoiceId = this.oldClientInvoiceData.id;
                  //update Event Data by id
                  this.eventService.update(this.selectedEvent[i], this.data).subscribe(
                    (response) => {
                      log.debug('response: ', response);
                      this.isLoading = false;
                      this.toasterService.success('Event updated successfully.', 'Success!');
                    },
                    (error) => {
                      log.error(error);
                      log.debug('Not Created', this.data);
                      this.error = error;
                    }
                  );
                },
                (error: any) => {}
              );
            }
            this.toasterService.success('Client Invoice updated successfully.', 'Success!');
          },
          (error: any) => {}
        );
      },
      (error: any) => {}
    );
    this.modalService.dismissAll();
  }

  createInvoiceBtn() {
    this.showBtn = this.eventlistForClient?.filter((a) => a.checked)?.length ? true : false;
  }

  getExpertList() {
    this.expertService.getAll().subscribe(
      (response) => {
        this.expertList = response;
      },
      (error: any) => {}
    );
  }
  getExpert(id) {
    if (id) {
      let expertName = this.expertList?.find((x) => x.userId == id);
      return expertName?.firstName + ' ' + expertName?.lastName;
    }
    return''
  }
}
