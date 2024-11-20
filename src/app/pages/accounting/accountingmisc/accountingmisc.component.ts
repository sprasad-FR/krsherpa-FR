import { ExpertService } from '../../../core/services/expert.service';
import { EmployeeService } from '../../../core/services/employee.service';
import { ClientInvoice } from '../../../core/models/client-invoice.model';
import { InvoiceService } from '../../../core/services/invoice.service';
import { DateToLocalPipe } from '../../../core/pipe';
import { EventService } from '../../../core/services/event.service';
import { ProjectService } from '../../../core/services/project.service';
import { AccountingmiscService} from '../../../core/services/accountingmisc.service';
import { EntityDetails } from '../generate-invoice/krEntity.data';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastService } from '../../toast-service'; 
import { Logger } from '../../../core/logger.service';
//import { Clients } from '../../projects/models/clients.model';
import { Project } from '../../../core/models/project.model';
import { accountingmisc } from '../../../core/models/accountingmisc.model';
import { EmailJsTemplates } from '../../../core/models/options';
import { EmailService } from '../../../core/services/email.service';
import { employeeUser } from '../../../core/models/employee.model';
import { Expert } from '../../../core/models/expert.model';
import { ClientsService } from '../../../core/services/clients.service';



const log = new Logger('Events Component');

@Component({
  selector: 'app-accountingmisc',
  templateUrl: './accountingmisc.component.html',
  styleUrls: ['./accountingmisc.component.scss'],
  providers: [DateToLocalPipe],
})
export class AccountingmiscComponent implements OnInit {
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
  pnlname:string;
  fmonth:string;
  fyear:string;
    tmonth:string;
  tyear:string;
  accountingmiscdata: accountingmisc;
    years = [];
    months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

    pnlHeadList: any;
  
    expense:string;
 
  constructor(
    private readonly clientsService: ClientsService,
    private readonly projectService: ProjectService,
    private readonly eventService: EventService,
    public readonly invoiceService: InvoiceService,
    private readonly employeeService: EmployeeService,
    private toasterService: ToastService,  
    private modalService: NgbModal,
    private formbuilder: FormBuilder,
    private emailService: EmailService,
    private expertService: ExpertService,
     private accountingmiscservice: AccountingmiscService,
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
    this.getEmployee();
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

  getEexpenses() {

    const filters = new Map();
  const filter = {
    where: {
      and: [],
    },
  };

  var start=this.fyear +"-"+this.fmonth+"-1"; 

  var end=this.fyear +"-"+this.fmonth+"-2";
  
    filter.where.and.push( {"targetmonth":{"gte" :start}},
    {"targetmonth":{"lt" :end}});

    filters.set('filter', JSON.stringify(filter));

    return this.accountingmiscservice.getAll(filters).subscribe(
      (employees: any) => {
        this.accountingmiscdata = employees[0];
     //   this.keyAccountMgrList = this.employeeList?.filter((x) => x.designation === 7);
      //  this.accountingmiscdata = this.empList?.filter((x) => x.designation === 4);
      //  this.subPnlHeadList = this.employeeList?.filter((x) => x.designation === 4);
      console.log(this.accountingmiscdata);


      },
      (error: any) => {}
    );

}


getUserName(id: string) {

  //console.log(this.pnlHeadList );

  if (id != null && this.pnlHeadList != undefined) {

    const user = this.pnlHeadList.find((x) => x.id == id);

    if (!user) {
      return '-x';  
    } else {
      if (user.name) {
        return user?.name;
      } 
    }
  } else {
    return '-c';
  }
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



  private getEmployee() {
    const filters = new Map();
    const filter = {
      fields: {
        id: true,
        name: true,
        designation: true,
        email: true,
        userId: true,
      },
    };
    filters.set('filter', JSON.stringify(filter));

    return this.employeeService.getAll(filters).subscribe(
      (employees: any) => {
        this.empList = employees;
     //   this.keyAccountMgrList = this.employeeList?.filter((x) => x.designation === 7);
        this.pnlHeadList = this.empList?.filter((x) => x.designation === 4);
      //  this.subPnlHeadList = this.employeeList?.filter((x) => x.designation === 4);
      
      },
      (error: any) => {}
    );
  }


  addtax(selectClientUserModal: any) {
    this.modalService.open(selectClientUserModal, { centered: true, windowClass: 'modal-holder' });
  }

  
  edittax(selectClientUserModal: any,taxname:string, taxnpercent:string) {

   this.pnlname=taxname;
    this.expense=taxnpercent;    

    this.modalService.open(selectClientUserModal, { centered: true, windowClass: 'modal-holder' });
  }
  submitype:number=1;
  //Create new client user
  submitExpense() {


    if (!this.pnlname && !this.expense && !this.fmonth) 
    {
      this.error = true;
      return;
    }



    const filters = new Map();
  const filter = {
    where: {
      and: [],
    },
  };

  var start=this.fyear +"-"+this.fmonth+"-01"; 

  var end=this.fyear +"-"+this.fmonth+"-02";
  


  var targetstart=this.fyear +"-"+this.fmonth+"-1"; 

  const tdte = new Date(targetstart)

    filter.where.and.push( {"targetmonth":{"gte" :start}},
    {"targetmonth":{"lt" :end}});

    filters.set('filter', JSON.stringify(filter));

    var accountingdata:any;

     accountingdata ={};  

     this.accountingmiscservice.getAll(filters).subscribe(
      (data: any) => {
        accountingdata = data[0];
     //   this.keyAccountMgrList = this.employeeList?.filter((x) => x.designation === 7);
      //  this.accountingmiscdata = this.empList?.filter((x) => x.designation === 4);
      //  this.subPnlHeadList = this.employeeList?.filter((x) => x.designation === 4);
      
console.log('data',accountingdata);

if (accountingdata!=undefined && accountingdata?.subpnlexp)
{

  console.log('step 1');
  debugger;

  let clienttaxEdit = accountingdata.subpnlexp.find((x) =>(x.pnlname == this.pnlname));


  

    if (clienttaxEdit)
    {
      console.log('step 2');
  let index = accountingdata?.subpnlexp.indexOf(clienttaxEdit);

  accountingdata.subpnlexp.splice(index, 1);

  accountingdata.subpnlexp.push({  pnlname: this.pnlname,
    expense: this.expense,
    updatedAt: new Date(),
  });

    }
    else
    {
      console.log('step3');
if (accountingdata.subpnlexp)
{
  accountingdata.subpnlexp.push({            
pnlname: this.pnlname,
expense: this.expense,           
createdAt: new Date(),
updatedAt: new Date(),
});
}
else
{
  console.log('step 4');
  accountingdata.subpnlexp=[{            
          pnlname: this.pnlname,
          expense: this.expense,           
              createdAt: new Date(),
              updatedAt: new Date(),
            }];
    }
  
  }
  console.log('step 5');
      this.accountingmiscservice.updateOnly(accountingdata.id, accountingdata).subscribe( 
        (response) => {

          log.debug('response: ', response);

        
          this.isLoading = false;

          this.toasterService.success('Expense updated successfully.', 'Success!');              //email notification
          this.getEexpenses() ;
        },

        (error) => {
          return;
          log.error(error);
          log.debug('Not Created', accountingdata);
          this.error = error;
        }
      );


}
else{

  accountingdata={};
  
  console.log('step 6');
  accountingdata.month=this.fmonth;
  accountingdata.year=this.fyear;
  accountingdata.targetmonth=tdte;
  accountingdata.subpnlexp=[{            
    pnlname: this.pnlname,
    expense: this.expense,           
        createdAt: new Date(),
        updatedAt: new Date(),
      }];
      accountingdata.createdAt= new Date(),
      accountingdata.updatedAt= new Date()

      this.accountingmiscservice.create(accountingdata).subscribe( 
        (response) => {

          log.debug('response: ', response);

        
          this.isLoading = false;

          this.toasterService.success('Expense updated successfully.', 'Success!');              //email notification
          this.getEexpenses() ;
        },

        (error) => {
          log.error(error);
          log.debug('Not Created', accountingdata);
          this.error = error;
        }
      );

}



      },
      (error: any) => {   return;}
    );






       


          
          
       
    }
  

  getClientlist() {
    this.clientsService.getAll().subscribe(
      (response) => {
        this.clientList = response;
      },
      (error: any) => {}
    );
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
