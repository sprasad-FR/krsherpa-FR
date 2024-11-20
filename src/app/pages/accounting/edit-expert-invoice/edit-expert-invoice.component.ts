import { EventService } from '../../../core/services/event.service';
import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InvoiceService } from '../../../core/services/invoice.service';
import { ExpertInvoice } from '../../../core/models/expert-invoice.model';
import { Expert } from '../../../core/models/expert.model';
import { Logger } from '../../../core/logger.service';
import { Event } from '../../../core/models/event.model';
import { ToastService } from '../../toast-service'; 
import { ExpertService } from '../../../core/services/expert.service';
const log = new Logger('Events Component');
import { DateToLocalPipe,getCompanyTypePipe,GetInitialsPipe } from '../pipe';
@Component({
  selector: 'app-edit-expert-invoice',
  templateUrl: './edit-expert-invoice.component.html',
  styleUrls: ['./edit-expert-invoice.component.scss'],
  providers: [DateToLocalPipe,getCompanyTypePipe,GetInitialsPipe ],
})
export class EditExpertInvoiceComponent implements OnInit {
  @Input() dataToEdit: any;

  isLoading: boolean = false;
  error: any;
  paidInvoiceList: ExpertInvoice[];
  expertId: string;
  leadModalTitle: string;
  eventlistForExpert: any[];
  eventInvoice: any[];
  tempEventIds: string[];
  ExInvoiceTotal: number;
  selectedEvent: string[];
  oldExpertInvoiceData: ExpertInvoice;
  oldTotal: number;
  newTotal: number;
  oldEventId: string[];
  data: Event;
  expertInvoiceId: any;
  constructor(
    public readonly expertService: ExpertService,
    private modalService: NgbModal,
    public readonly invoiceService: InvoiceService, 
    private toasterService: ToastService,  
    private readonly eventService: EventService
  ) {}

  ngOnInit(): void {
    this.expertId = this.dataToEdit.exId;
    this.expertInvoiceId = this.dataToEdit.id;

    this.leadModalTitle = 'Add New Event';
    const filters = new Map();
    const filter = {
      where: {
        expertId: this.expertId,
        status: 'Completed',
        expertInvoiceId: '',
      },
    };
    filters.set('filter', JSON.stringify(filter));
    this.eventService.getAll(filters).subscribe(
      (response) => {
        this.eventlistForExpert = response;
      },
      (error: any) => {}
    );
  }

  checkAllCheckBox(ev) {
    this.eventlistForExpert.forEach((x) => (x.checked = ev.target.checked));
  }

  addEventintoInvoice() {
    this.eventInvoice = [];
    this.tempEventIds = [];
    this.ExInvoiceTotal = 0;
    for (let i = 0; i < this.eventlistForExpert.length; i++) {
      if (this.eventlistForExpert[i].checked) {
        this.eventInvoice.push(this.eventlistForExpert[i]);
        this.ExInvoiceTotal += this.eventlistForExpert[i].clientPayableAmount;
        this.tempEventIds.push(this.eventlistForExpert[i].id);
      }
    }
    this.selectedEvent = this.tempEventIds;
    this.invoiceService.showExpertInvoice(this.expertInvoiceId).subscribe(
      (res) => {
        this.oldExpertInvoiceData = res;
        this.oldEventId = this.oldExpertInvoiceData.events;
        this.oldEventId = this.oldEventId.concat(this.selectedEvent);
        this.oldTotal = this.oldExpertInvoiceData.total;
        this.newTotal = this.oldTotal + this.ExInvoiceTotal;

        var updateInvoice = {
          events: this.oldEventId,
          total: this.newTotal,
        };
        // update client invoice with events
        this.invoiceService.updateOnlyExpertInvoice(this.expertInvoiceId, updateInvoice).subscribe(
          (response) => {
            log.debug('response: ', response);
            this.isLoading = false;
            for (let i = 0; i < this.selectedEvent.length; i++) {
              //get Event Data by id
              this.eventService.show(this.selectedEvent[i]).subscribe(
                (event: any) => {
                  this.data = event;
                  this.data.expertInvoiceId = this.oldExpertInvoiceData.id;
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
            this.toasterService.success('Expert Invoice updated successfully.', 'Success!');
          },
          (error: any) => {}
        );
      },
      (error: any) => {}
    );
    this.modalService.dismissAll();
  }
}
