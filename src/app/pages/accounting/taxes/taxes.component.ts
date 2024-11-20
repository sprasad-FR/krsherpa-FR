import { ExpertService } from '../../../core/services/expert.service';
import { EmployeeService } from '../../../core/services/employee.service';
import { ClientInvoice } from '../../../core/models/client-invoice.model';
import { InvoiceService } from '../../../core/services/invoice.service';
import { DateToLocalPipe } from '../../../core/pipe';
import { EventService } from '../../../core/services/event.service';
import { ProjectService } from '../../../core/services/project.service';
//import { ClientsServicep} from './../../projects/services/clients.service';
import { EntityDetails } from '../generate-invoice/krEntity.data';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastService } from '../../toast-service';
import { Logger } from '../../../core/logger.service';
//import { Clients } from '../../projects/models/clients.model';
import { Project } from '../../../core/models/project.model';
import { Event } from '../../../core/models/event.model';
import { EmailJsTemplates } from '../../../core/models/options';
import { EmailService } from '../../../core/services/email.service';
import { employeeUser } from '../../../core/models/employee.model';
import { Expert } from '../../../core/models/expert.model';
import { ClientsService } from '../../../core/services/clients.service';

const log = new Logger('Events Component');

@Component({
  selector: 'app-tax',
  templateUrl: './taxes.component.html',
  styleUrls: ['./taxes.component.scss'],
  providers: [DateToLocalPipe],
})
export class TaxComponent implements OnInit {
  //clientList: Clients[];
  clientList: any[];
  projectList: Project[];
  cName: any;
  eventList: any[];
  tempEventIds: string[];
  eventInvoice: any[];
  isLoading: boolean = false;
  Cid: string;
  Pid: string;
  entity: any[];
  ClInvoiceTotal: number;
  selectedEvent: string[];
  invTotal: any;
  totalAmount: number;
  newInvoice: ClientInvoice;
  data: Event;
  EmailJsTemplates: object;
  error: any;
  clientInvoiceNo: number;
  invoiceNo: number;
  ClientName: any;
  ProjectName: any;
  localstorageEmp: any;
  emailToSend: any[];
  whoiam: any;
  empList: any;
  emailVariableObj: {};
  arrOfEMpIds: any[];
  expertList: Expert[];
  unbilledEvents: any[];
  billedEvents: any[];
  showBtn: boolean = false;

  fmonth:string;
  fyear:string;
    tmonth:string;
  tyear:string;
  clientData: any;
    years = [];
    months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

    taxname:string;
    taxpercent:string;
    tax:any;
  constructor(
    private readonly clientsService: ClientsService,
    private readonly projectService: ProjectService,
    private readonly eventService: EventService,
    public readonly invoiceService: InvoiceService, 
    private toasterService: ToastService,  
    private modalService: NgbModal,
    private formbuilder: FormBuilder,
    private emailService: EmailService,
    private expertService: ExpertService,
    public route: ActivatedRoute
  ) {
    this.whoiam = JSON.parse(window.localStorage.getItem('user'));
    this.empList = JSON.parse(window.localStorage.getItem('emp'));
  }

  ClientInvoiceForm = this.formbuilder.group({
    entity: [null, [Validators.required]],
    invoiceNo: [null, [Validators.required]],
    invoiceDate: [null, [Validators.required]],
    invoiceStartDate: [null, [Validators.required]],
    invoiceEndDate: [null, [Validators.required]],
  });

  ngOnInit(): void {
    this.isLoading = true;
    this.getClientlist();
    this.entity = EntityDetails;
  
     let year = new Date().getFullYear();
    for (let i = year; i > year - 3; i--) {
      this.years.push(i);
    }
this.fmonth=this.months[new Date(). getMonth()]; 
this.tmonth=this.months[new Date(). getMonth()]; 
this.fyear=new Date().getFullYear().toString();
this.tyear=new Date().getFullYear().toString();

  }


  resetform() {

    this.fyear="";
    this.tyear="";
    this.fmonth="";
    this.tmonth="";
    this.ClientName="";
       this.ProjectName="";
this.Cid="";
this.Pid="";
  }

  private getClientById(id: string) {
    this.isLoading = true;
    this.clientsService.show(id).subscribe(
      (client: any) => {
        this.clientData = client;

  
        this.clientData.serviceStartDate = client?.serviceStartDate?.toString().split('T')[0];
        this.clientData.initialInvoiceDate = client?.initialInvoiceDate?.toString().split('T')[0];
        this.clientData.serviceEndDate = client?.serviceEndDate?.toString().split('T')[0];
    
console.log('this.clientData ',this.clientData );

       

        this.isLoading = false;
      },
      (error: any) => {}
    );
  }

  addtax(selectClientUserModal: any) {
    this.modalService.open(selectClientUserModal, { centered: true, windowClass: 'modal-holder' });
  }

  
  edittax(selectClientUserModal: any,taxname:string, taxnpercent:string) {
   this.taxname=taxname;
    this.taxpercent=taxnpercent;    

    this.modalService.open(selectClientUserModal, { centered: true, windowClass: 'modal-holder' });
  }
  //Create new client user
  submitClienttax() {


      if (!this.taxname && !this.taxpercent && !this.taxname) 
      {


        this.error = true;
        return;


      }


debugger;

      let clienttaxEdit = this.clientData?.taxes?.find((x) => x.taxname == this.taxname);




        if (clienttaxEdit)
        {

      let index = this.clientData?.taxes.indexOf(clienttaxEdit);

      this.clientData.taxes.splice(index, 1);

      this.clientData.taxes.push({  taxname: this.taxname,
        taxpercent: this.taxpercent,
        updatedAt: new Date(),
      });

        }
        else
        {

if (this.clientData.taxes)
{
  this.clientData.taxes.push({            
    taxname: this.taxname,
    taxpercent: this.taxpercent,           
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}
else
{
            this.clientData.taxes=[{            
                  taxname: this.taxname,
                  taxpercent: this.taxpercent,           
                  createdAt: new Date(),
                  updatedAt: new Date(),
                }];
        }
      
      }

          this.clientsService.updateOnly(this.clientData.id, this.clientData).subscribe( 
            (response) => {

              log.debug('response: ', response);

            
              this.isLoading = false;

              this.toasterService.success('Taxes updated successfully.', 'Success!');              //email notification
             
            },

            (error) => {
              log.error(error);
              log.debug('Not Created', this.clientData);
              this.error = error;
            }
          );
       



          

    }
  

  getClientlist() {

    const filters = new Map();


    const filter = {
      where: {},
      fields:{
        "id":true,
        "companyName":true, 
      }
    };
    filters.set('filter', JSON.stringify(filter));
//filters


    this.clientsService.getAll().subscribe(
      (response) => {
        this.clientList = response;

        this.isLoading = false;
      },
      (error: any) => {



      }
    );
  }

  selectedClient(value1) {
    if (value1) {
      this.Cid = value1;
      let clientdata = this.clientList?.find((x) => x.id == value1);
        this.Cid = clientdata.id;
      this.getClientById( this.Cid );
    } else {
    
    }
  }


  openprint(newInvoice: any) {
    this.modalService.open(newInvoice, { centered: true, windowClass: 'modal-holder' });
  }

  

  getclientname(id) {
    if (id) {
      let clientName = this.clientList?.find((x) => x.id == id);
      return clientName.companyName;
    }
  }

}
