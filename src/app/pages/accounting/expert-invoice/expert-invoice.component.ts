import { EmployeeService } from '../../../core/services/employee.service';
import { InvoiceService } from '../../../core/services/invoice.service';
import { ExpertService } from '../../../core/services/expert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastService } from '../../toast-service';
import { Logger } from '../../../core/logger.service';
//import { Logger } from '@app/@core';
import { EntityDetails } from '../generate-invoice/krEntity.data';
import { Expert } from '../../../core/models/expert.model';
import { ExpertInvoice } from '../../../core/models/expert-invoice.model';
import { Event } from '../../../core/models/event.model';
import { EmailJsTemplates } from '../../../core/models/options';
import { EmailService } from '../../../core/services/email.service';
import { EventService } from '../../../core/services/event.service';
import { CSVService } from '../../../core/services/data2CSV.service';
import { Generic } from '../../../core/models/client-invoice.model';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from '../../../core/services/clients.service';
import { ProjectService } from '../../../core/services/project.service';


const log = new Logger('Events Component');

@Component({
  selector: 'app-expert-invoice',
  templateUrl: './expert-invoice.component.html',
  styleUrls: ['./expert-invoice.component.scss'],
})
export class ExpertInvoiceComponent implements OnInit {
  isLoading: boolean = false;
  expertList: Expert[];
  expId: string;
  eventList: any[];
  eventInvoice: any[];
  ExInvoiceTotal: number = 0;
  invTotal: any;
  newInvoice: ExpertInvoice;
  error: any[];
  selectedEvent: string[];
  tempEventIds: string[];
  data: Event;
  totalAmount: number;
  entity: any[];
  EmailJsTemplates: object;
  emailToSend: any[];
  ExpertName: any;
  whoiam: any;
  empList: any;
  emailVariableObj: {};
  showBtn: boolean;

  fmonth:string;
  fyear:string;
    tmonth:string;
  tyear:string;

  generic:Generic;

    years = [];
    months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    projectList: any[];
   
    invoiceData: ExpertInvoice;
    paidInvoiceList: ExpertInvoice[];
    Id: string;
    InvoiceDetails: ExpertInvoice;
 
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
   
    whoaim: any;
    roles: any;
    expert: any;
    expertNinvoiceId: object;

    fdate:string;

    tdate:string;

    allEmployee: any[];


  constructor(
    public readonly expertService: ExpertService,
    private readonly clientsService: ClientsService,
    private readonly projectService: ProjectService,
    public eventService: EventService,
    private modalService: NgbModal,
    private formbuilder: FormBuilder,
    private employeeService: EmployeeService,
    private readonly invoiceService: InvoiceService, 
    private toasterService: ToastService,  
    private emailService: EmailService,
      private csvservice: CSVService,
    public route: ActivatedRoute,
  ) {
    this.whoiam = JSON.parse(window.localStorage.getItem('user'));
    this.empList = JSON.parse(window.localStorage.getItem('emp'));
  }

  jsonData:any[];

  jsonData1 =  [
    {
      invoiceNo:"",
      project:"",
      eventDate:"",
      expertPayment:"",
      expertCurrency:"",
      expertMinDuration:"",
      name: "",
      Amount: "",
      paymentPreference:"",
      bankName:"",
      branchName:"",
      bankAccountNumber:"",
      bankAccountType:"",
      ifscCode:"",
      panCard:"",
      paypalCode:"",
      amazonCode:"",
      PayCurrency:"",
      PayCountry:"",
      achBeneficiaryName:"",
      achBeneficiaryAddress:"",
      achAccountNo:"",
      achBankName:"",
      achBankAddress:"",
      achSwiftCode:"",
      achBeneficiaryCountry:"",
      achAccountType:"",
      achPostalCode:"",
    },
    {
      invoiceNo:"",
      project:"",
      eventDate:"",
      expertPayment:"",
      expertCurrency:"",
      expertMinDuration:"",
      name: "",
      Amount: "",
      paymentPreference:"",
      bankName:"",
      branchName:"",
      bankAccountNumber:"",
      bankAccountType:"",
      ifscCode:"",
      panCard:"",
      paypalCode:"",
      amazonCode:"",
      PayCurrency:"",
      PayCountry:"",
      achBeneficiaryName:"",
      achBeneficiaryAddress:"",
      achAccountNo:"",
      achBankName:"",
      achBankAddress:"",
      achSwiftCode:"",
      achBeneficiaryCountry:"",
      achAccountType:"",
      achPostalCode:"",
    }
   
  ];


  getProjectlist() {

    
      const filters = new Map();


      const filter = {
        where: {
         
        },
        fields:{
          "id":true,
          "projectId":true,
          "name":true,
          "clientId": true
        
        }
      };
      filters.set('filter', JSON.stringify(filter));
  
      this.projectService.getAll(filters).subscribe(
        (response) => {
          this.projectList = response;
        },
        (error: any) => {}
      );

    
  }



 getProjectname(value1) {
 //let prj= this.projectList.find
// console.log('value1',value1);
// console.log(this.projectList);
if (value1!='')
  {
  return (this.projectList?.find((x) => x.id == value1)?.name);
  }

}

 
  download1(invtype:string){


    this.jsonData=  [
      {
       
        "Client Name":"",
"Project":"", 	

"KR Employee":"",	
"Account Manager":"", 	
"Research Manager":"",	
"Event Date":"",		
"Event Duration":"", 
"Name of the Expert":"",	
"Currency":"",	 
"Hourley Rate" :"",
"expertid":""
      },
      {
        "Client Name":"",
"Project":"", 	
"KR Employee":"",	
"Account Manager":"", 	
"Research Manager":"",	
"Event Date":"",		
"Event Duration":"", 
"Name of the Expert":"",	
"Currency":"",	 
"Hourley Rate" :"",
"expertid":""
      }
     
    ];




  
    var headerlist=[
      
      "Client Name",
      "Project", 	
     // "Project manager (Client)",	
      "KR Employee",
      "Account Manager",	
      "Research Manager",	
      "Event Date",		
      "Event Duration",
      "Name of the Expert",
      "Currency", 
      "Hourley Rate" ,
      "expertid"     
   //   "RESEARCH MANAGEMENT"
    ]
    
    this.jsonData=[];
    
    console.log(this.eventList);
    
    for (let index = 0; index < this.eventList.length; index++) {
      const element = this.eventList[index];
      
    
      this.jsonData.push(
        {
          

          "Client Name":this.getclientname(element.clientId),
          "Project":element.project.name,
        //  "Project manager (Client)":element.project.cli
          "KR Employee":this.getUserName(element.researchAnalystId),
          "Account Manager":this.getUserName(element.keyAccountManager),
          "Research Manager":this.getUserName(element.researchMgrId),
          "Event Date":element.eventAt,	
          "Event Duration":element.eventDuration,	
          "Name of the Expert":this.getExpert(element.expertId),
          "Currency" :element.clientCurrency,
          "Hourley Rate":element.rateForClient ,     
          "expertid" :element.expertId,


        }
    
    
      )
    
      }
      
    
    
      this.csvservice.downloadFile(this.jsonData,headerlist, 'jsontocsvnew');
    
    }
    




  
download(invtype:string){

if (invtype=='u')
{
var headerlist=[
  'invoiceNo',
      'project',
      'eventDate',
      'expertPayment',
      'expertCurrency',
      'expertMinDuration',
      'name',
      'Amount',
      'paymentPreference',
      'bankName',
      'branchName',
      'bankAccountNumber',
      'bankAccountType',
      'ifscCode',
      'panCard',
      'paypalCode',
      'amazonCode',
      'PayCurrency',
      'PayCountry',
      'achBeneficiaryName',
      'achBeneficiaryAddress',
      'achAccountNo',
      'achBankName',
      'achBankAddress',
      'achSwiftCode',
      'achBeneficiaryCountry',
      'achAccountType',
      'achPostalCode',
]

this.jsonData=[];

console.log(this.unpaidInvoiceList);

for (let index = 0; index < this.unpaidInvoiceList.length; index++) {
  const element = this.unpaidInvoiceList[index];


  if (element && element.expert)
{
  this.jsonData.push(
    {
      invoiceNo: element["invoiceNo"],
      name: element.expert["firstName"] + ' '+ element.expert["lastName"],
      Amount: element.total.toString(),
      bankName:  element.expert["bankName"]? element.expert["bankName"]:"",
      bankAccountNumber: element.expert["bankAccountNumber"]? element.expert["bankAccountNumber"]:"",
      bankAccountType:  element.expert["bankAccountType"]!=null? element.expert["bankAccountType"]:"",
      branchName:  element.expert["branchName"],
      ifscCode: element.expert["ifscCode"],
      panCard: element.expert["panCard"],
      paymentPreference: element.expert["paymentPreference"],
    expertPayment: element.event["expertPayment"],
    expertCurrency: element.event["expertCurrency"],
    expertMinDuration: element.event["expertMinDuration"],
    paypalCode: element.expert["paypalCode"],
    amazonCode: element.expert["amazonCode"],
    PayCurrency: element.expert["PayCurrency"],
    PayCountry: element.expert["PayCountry"],
    achBeneficiaryName: element.expert["achBeneficiaryName"],
    achBeneficiaryAddress: element.expert["achBeneficiaryAddress"],
    achAccountNo: element.expert["achAccountNo"],
    achBankName: element.expert["achBankName"],
    achBankAddress: element.expert["achBankAddress"],
    achSwiftCode: element.expert["achSwiftCode"],
    achBeneficiaryCountry: element.expert["achBeneficiaryCountry"],
    achAccountType: element.expert["achAccountType"],
    achPostalCode: element.expert["achPostalCode"]
    }


  )

  }


  }
  



}
else{
 
var headerlist=[
  'invoiceNo',
      'project',
      'eventDate',
      'expertPayment',
      'expertCurrency',
      'expertMinDuration',
      'name',
      'Amount',
      'paymentPreference',
      'bankName',
      'branchName',
      'bankAccountNumber',
      'bankAccountType',
      'ifscCode',
      'panCard',
      'paypalCode',
      'amazonCode',
      'PayCurrency',
      'PayCountry',
      'achBeneficiaryName',
      'achBeneficiaryAddress',
      'achAccountNo',
      'achBankName',
      'achBankAddress',
      'achSwiftCode',
      'achBeneficiaryCountry',
      'achAccountType',
      'achPostalCode',
]
this.jsonData=[];
  
  console.log(this.paidInvoiceList);
  
  for (let index = 0; index < this.paidInvoiceList.length; index++) {
    const element = this.paidInvoiceList[index];
    
debugger


  if (element.expert!=undefined)
  {
   //eventAt
  
    this.jsonData.push(
      {
        invoiceNo: element["invoiceNo"],
        name: element.expert["firstName"] + ' '+ element.expert["lastName"],
        Amount: element.total.toString(),
        bankName:  element.expert["bankName"],
        bankAccountNumber: element.expert["bankAccountNumber"],
        bankAccountType:  element.expert["bankAccountType"],
        branchName:  element.expert["branchName"],
        ifscCode: element.expert["ifscCode"],
        panCard: element.expert["panCard"],
        paymentPreference: element.expert["paymentPreference"],
      expertPayment: element.event["expertPayment"],
      expertCurrency: element.event["expertCurrency"],
      expertMinDuration: element.event["expertMinDuration"],
      paypalCode: element.expert["paypalCode"],
      amazonCode: element.expert["amazonCode"],
      PayCurrency: element.expert["PayCurrency"],
      PayCountry: element.expert["PayCountry"],
      achBeneficiaryName: element.expert["achBeneficiaryName"],
      achBeneficiaryAddress: element.expert["achBeneficiaryAddress"],
      achAccountNo: element.expert["achAccountNo"],
      achBankName: element.expert["achBankName"],
      achBankAddress: element.expert["achBankAddress"],
      achSwiftCode: element.expert["achSwiftCode"],
      achBeneficiaryCountry: element.expert["achBeneficiaryCountry"],
      achAccountType: element.expert["achAccountType"],
      achPostalCode: element.expert["achPostalCode"]
      }

  
    )
  }
  
    }

}

  this.csvservice.downloadFile(this.jsonData,headerlist, 'jsontocsvnew');

}


  ExpertInvoiceForm = this.formbuilder.group({
    entity: [null, [Validators.required]],
    invoiceNo: [null, [Validators.required]],
    invoiceDate: [null, [Validators.required]],
    invoiceStartDate: [null, [Validators.required]],
    invoiceEndDate: [null, [Validators.required]],
  });
  clientList :any[];

  getClientlist() {
    this.clientsService.getAll().subscribe(
      (response) => {
        this.clientList = response;
      },
      (error: any) => {}
    );
  }


  getclientname(id) {
    if (id) {
      let clientName = this.clientList?.find((x) => x.id == id);
      return clientName?.companyName;
    }
  }



  ngOnInit(): void {



 this.fdate=new Date().getFullYear().toString()+"-"+(new Date().getMonth()+1).toString()+"-"+"01"; 
 this.tdate=new Date().getFullYear().toString()+"-"+(new Date().getMonth()+1).toString()+"-"+new Date().getDate().toString()

this.isLoading=true;
this.getProjectlist();

this.getClientlist();
this.generic= {id:'dff',name:'df',type:''};
    this.getExpertList();
    this.entity = EntityDetails; let year = new Date().getFullYear();
    for (let i = year; i > year - 3; i--) {
      this.years.push(i);
    }
this.fmonth=this.months[new Date(). getMonth()]; 
this.tmonth=this.months[new Date(). getMonth()]; 
this.fyear=new Date().getFullYear().toString();
this.tyear=new Date().getFullYear().toString();
this.getEvents();



this.employeeService.getAllmin().subscribe(
  (res) => {
    this.allEmployee = res;
    console.log(' this.allEmployee ',  this.allEmployee );
  },
  (error: any) => {}
);

this.entity = EntityDetails;
this.whoaim = JSON.parse(localStorage.getItem('user'));
this.roles = this.whoaim.roles[0];

  }



  getUserName(id: string) {
   // console.log(id);
    if (id != null && this.allEmployee != undefined) {
  //    console.log('usersArray', this.allEmployee);
      const user = this.allEmployee.find((x) => x.userId === id);
      if (user && user.name) {
        return user.name +' ';
      } else {
        return   ' ' ;
      }
    } else {
      return '--';
    }
  }

  resetform() {

    this.fyear="";
    this.tyear="";
    this.fmonth="";
    this.tmonth="";   
  }

  getExpertListold() {
    
    this.expertService.getAll().subscribe(

      (response) => {
        this.expertList = response;
        this.expertList?.map((i) => {
          i.fullName = i?.firstName + ' ' + i?.lastName;
          return i;
        });
      },
      (error: any) => {}
    );
  }

  getExpertList() {
    
   // this.expertService.getAll().subscribe(
    this.expertList= this.expertService.getexmindata();

    console.log(this.expertList);

        this.expertList?.map((i) => {
          i.fullName = i?.firstName + ' ' + i?.lastName;
          return i;
        });
     
  }

  notifyExpert(id) {
  
    this.toasterService.success('Expert and KR POC Notified.', 'Notified!');
 

  }
  getExpert(id) {

   // console.log(id);
  

    if (id) {

      let expertName = this.expertList?.find((x) => x.userId == id);

    //  console.log(expertName);
      return expertName?.firstName + ' ' + expertName?.lastName;
    }
    return''
  }

  CheckBank(id) {

    if (id) {
      let expertName = this.expertList?.find((x) => x.userId == id);
      if (expertName!=undefined &&   expertName.bankAccountNumber && expertName.bankAccountNumber!="")
      {
      return "Available";
    }
    else
    {
       return " Not Available";
    }
    }
    return''
  }

  CheckifBank(id) {
    if (id) {
      let expertName = this.expertList?.find((x) => x.userId == id);
      if (expertName.bankAccountNumber && expertName.bankAccountNumber!="")
      {
      return "Available";
    }
    else
    {
       return "<a href='' > Not Available-Notify </a>";
    }
    }
    return''
  }

  selectedExpert(value) {

    this.expId = value;
    let searchInExpert = this.expertList?.find((x) => x.userId == this.expId);
    this.emailVariableObj = {};
    this.emailToSend = [];
    this.emailVariableObj['firstName'] = searchInExpert?.firstName;
    this.emailVariableObj['lastName'] = searchInExpert?.lastName;
    let reporingId = this.empList?.find((x) => x.userId == searchInExpert?.krRelationshipMgrId).repotingManagerId;
    this.emailToSend.push(this.empList?.find((x) => x.userId == reporingId).email);
    this.getEvents();
    this.getUnpaidInvoice();
this.getPaidInvoice();
  }

  getEvents() {
    this.isLoading=true;
//var start=this.fyear +"-"+this.fmonth+"-1"; 

//var end=this.tyear +"-"+this.tmonth+"-31";

var start=this.fdate; 

var end=this.tdate;

if ((this.fdate==undefined) || (this.fdate==''))
{
 // start="1000-1-1"; 
 // end="2500-1-1"



 start=new Date().getFullYear().toString()+"-"+(new Date().getMonth()+1).toString()+"-"+"01"; 
 end=new Date().getFullYear().toString()+"-"+(new Date().getMonth()+1).toString()+"-"+new Date().getDate().toString()


}


    const filters = new Map();
    if (this.expId) {
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
        where: {
          and: [{ expertId: this.expId }, { status: 'Completed' }, { expertInvoiceId: '' },
 {"eventAt":{"gte" :start}},
            {"eventAt":{"lt" :end}},
            {"expertPayable":{"gt" :0}}
          ],
        },
      };



      filters.set('filter', JSON.stringify(filter));
      this.eventService.getAll(filters).subscribe(
        (response) => {
          this.eventList = response;
        },
        (error: any) => {}
      );
    }
    else
    {
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
  where: {
    and: [ { status: 'Completed' }, { expertInvoiceId: '' },
{"eventAt":{"gte" :start}},
      {"eventAt":{"lt" :end}},
      {"expertPayable":{"gt" :0}}
    ], 
  },
};




/*
 where: {
          and: [ { status: 'Completed' }, { expertInvoiceId: '' },
 {"eventAt":{"gte" :start}},
            {"eventAt":{"lt" :end}},
            {"expertPayable":{"gt" :0}}
          ], 
        },
      };


*/




      filter['where']['and']=[];

      filter['where']['and'].push({"eventAt":{"gte" :start}});   //createdAt  eventAt
      filter['where']['and'].push({"eventAt":{"lt" :end}});
/* */
   /*    
filter['where']['and']=[];
        start="2022-10-01";   // start="2022-09-1";   start="1970-01-1"; 
        end="2022-11-01";
        filter['where']['and'].push({"eventAt":{"gte" :start}});   //createdAt  eventAt
        filter['where']['and'].push({"eventAt":{"lt" :end}});
  
*/



      filters.set('filter', JSON.stringify(filter));
      this.eventService.getAll(filters).subscribe(
        (response) => {
          this.eventList = response;
        },
        (error: any) => {}
      );

    }

    this.getUnpaidInvoice();
    this.getPaidInvoice();


  }

  checkAllCheckBox(ev) {
    this.eventList.forEach((x) => (x.checked = ev.target.checked));
    this.createInvoiceBtn();
  }

  isAllCheckBoxChecked() {
    return this.eventList.every((p) => p.checked);
  }

  createInvoice(newInvoice: any) {
    this.modalService.open(newInvoice, { centered: true, windowClass: 'modal-holder' });
  }

  CalculateInvoice() {
    this.eventInvoice = [];
    this.tempEventIds = [];
    this.ExInvoiceTotal = 0;
    for (let index = 0; index < this.eventList?.length; index++) {
      if (this.eventList[index].checked) {
        this.eventInvoice.push(this.eventList[index]);
        this.ExInvoiceTotal += this.eventList[index]?.expertPayment;
        this.tempEventIds.push(this.eventList[index]?.id);
      }
    }
    this.selectedEvent = this.tempEventIds;
  }

  invoiceData1:ExpertInvoice;
  invoiceDatasubmit:any;
  submitInvoice() {
    this.invTotal = document.getElementById('total').textContent;
    this.totalAmount = parseInt(this.invTotal);

  


    this.invoiceDatasubmit = this.ExpertInvoiceForm.value;
    this.invoiceDatasubmit.total = this.totalAmount;
    this.invoiceDatasubmit.events = this.selectedEvent;
    this.invoiceDatasubmit.status = 'Unpaid';
    this.invoiceDatasubmit.expertId = this.expId;
    this.invoiceDatasubmit.eventId = this.selectedEvent[0];

   // this.emailVariableObj['total'] = invoiceData.total;

    if (this.ExpertInvoiceForm.valid) {
      // create client invoice
      this.invoiceService.createExpertInvoice( this.invoiceDatasubmit).subscribe(
        (response) => {
          this.newInvoice = response;
          this.toasterService.success('Invoice created successfully.', 'Success!');
         /*gs this.emailService.sendEmail(
            EmailJsTemplates.Invoicegenerated,
            this.emailToSend,
            'Approval',
            this.emailVariableObj
          );
          */
          for (let i = 0; i <  this.invoiceDatasubmit?.events.length; i++) {
            //get Event Data by id
            this.eventService.show( this.invoiceDatasubmit?.events[i]).subscribe(
              (event: any) => {
                this.data = event;
                this.data.expertInvoiceId = this.newInvoice?.id;
                //update Event Data by id
                this.eventService.update( this.invoiceDatasubmit.events[i], this.data).subscribe(
                  (response) => {
                    log.debug('response: ', response);

                    this.isLoading = false;
                    this.toasterService.success('Event updated successfully.', 'Success!');
                    this.getEvents();
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
        },
        (error) => {
          log.error(error);
          log.debug('Not Created',  this.invoiceDatasubmit);
          this.error = error;
        }
      );
      this.modalService.dismissAll();
    }
  }

  createInvoiceBtn() {
    this.showBtn = this.eventList?.filter((a) => a.checked)?.length ? true : false;
  }

// gs

getUnpaidInvoice() {



  var start=this.fdate; 

  var end=this.tdate;
  
  if ((this.fdate==undefined) || (this.fdate==''))
  {
   // start="1000-1-1"; 
 // end="2500-1-1"



 start=new Date().getFullYear().toString()+"-"+(new Date().getMonth()+1).toString()+"-"+"01"; 
 end=new Date().getFullYear().toString()+"-"+(new Date().getMonth()+1).toString()+"-"+new Date().getDate().toString()


  }


  const filters = new Map();
  const filter = {
   include: [
     
      {
        relation: 'expert',
      },
      {
        relation: 'event',
      },
    ],  /**/
    where: {
      and: [],
    },
  };
  if (this.roles == 'expert') {
    filter.where.and.push( {"invoiceDate":{"gte" :start}},
    {"invoiceDate":{"lt" :end}},{ expertId: this.expert.id }, { status: 'Unpaid' });
  } else {

if (this.expId !=undefined && this.expId !='')
{
    filter.where.and.push({"invoiceDate":{"gte" :start}},
    {"invoiceDate":{"lt" :end}},{ expertId: this.expId }, { status: 'Unpaid' });
}
else
{
  filter.where.and.push({"invoiceDate":{"gte" :start}},
  {"invoiceDate":{"lt" :end}},{ status: 'Unpaid' });
}

  }

  filters.set('filter', JSON.stringify(filter));
  return this.invoiceService.getAllExpertInvoice(filters).subscribe(
    (response) => {
      this.unpaidInvoiceList = response;

console.log('this.unpaidInvoiceList ',this.unpaidInvoiceList )

    },
    (error) => {
      log.error(error);
      log.debug('Not Created');
      this.error = error;
    }
  );
}

getPaidInvoice() {



  var start=this.fdate; 

  var end=this.tdate;
  
  if ((this.fdate==undefined) || (this.fdate==''))
  {
   // this.tyear=new Date().getFullYear().toString(); 




   start=new Date().getFullYear().toString()+"-"+(new Date().getMonth()+1).toString()+"-"+"01"; 
   end=new Date().getFullYear().toString()+"-"+(new Date().getMonth()+1).toString()+"-"+new Date().getDate().toString()
  
 
  }

  const filters = new Map();
  const filter = {
    include: [
     
      {
        relation: 'expert',
      },
      {
        relation: 'event',
      },
    ],/* */
    where: {
      and: [],
    },

  };


  if (this.roles == 'expert') {
    filter.where.and.push( {"invoiceDate":{"gte" :start}},
    {"invoiceDate":{"lt" :end}}, { expertId: this.expert.id }, { status: 'Paid' });
  } else {

if (this.expId !=undefined && this.expId !='')
{
    filter.where.and.push( {"invoiceDate":{"gte" :start}},
    {"invoiceDate":{"lt" :end}}, { expertId: this.expId }, { status: 'Paid' });
}
else
{
  filter.where.and.push( {"invoiceDate":{"gte" :start}},
  {"invoiceDate":{"lt" :end}}, { status: 'Paid' });
}

  }


  filters.set('filter', JSON.stringify(filter));
  return this.invoiceService.getAllExpertInvoice(filters).subscribe(
    (res: any) => {
      this.isLoading=false;
      this.paidInvoiceList = res;
      console.log('this.paidInvoiceList ',this.paidInvoiceList )
   
    },
    (error: any) => {    this.isLoading=false;}
  );
}

markPaid(id) {
  let isOK = confirm("Are you sure to mark this invoice as  paid?");
  if (isOK)
  {
  this.invoiceService.showExpertInvoice(id).subscribe((response) => {
    debugger
    this.invoiceData = response;
    this.invoiceData.invoiceDate = this.invoiceData?.invoiceDate.split('T')[0];
    this.invoiceData.invoiceStartDate = this.invoiceData?.invoiceStartDate.split('T')[0];
    this.invoiceData.invoiceEndDate = this.invoiceData?.invoiceEndDate.split('T')[0];
    this.invoiceData.status = 'Paid';
    this.invoiceService.updateExpertInvoice(id, this.invoiceData).subscribe(
      (response) => {
        this.invoiceData = response;
        log.debug('response: ', response);
      //  this.isLoading = false;
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
}

markunPaid(id) {

  let isOK = confirm("Are you sure to mark this invoice as  unpaid?");
  if (isOK)
  {
  this.invoiceService.showExpertInvoice(id).subscribe((response) => {
    this.invoiceData = response;
    this.invoiceData.invoiceDate = this.invoiceData?.invoiceDate.split('T')[0];
    this.invoiceData.invoiceStartDate = this.invoiceData?.invoiceStartDate.split('T')[0];
    this.invoiceData.invoiceEndDate = this.invoiceData?.invoiceEndDate.split('T')[0];
    this.invoiceData.status = 'Unpaid';
    this.invoiceService.updateExpertInvoice(id, this.invoiceData).subscribe(
      (response) => {
        this.invoiceData = response;
        log.debug('response: ', response);
        this.isLoading = false;
        this.toasterService.success('Invoice Marked as unpaid.', 'Success!');
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
}




// send invoices from unpaid to paid   markunPaid
markAllPaid() {

  var arr= new Array()


  let isOK = confirm("Are you sure to mark these Vouchers as  paid?");
  if (isOK)
  {


    for  (const iterator of this.unpaidInvoiceList) {
   
      //(   let index = 0; index < this.paidInvoiceList.length; index++) {
   
       if (iterator.checked) {
         debugger
   console.log (iterator)
   
   var curid=iterator.id;
   
   arr.push(curid)
   
       }
   
   
     }
       
   
   this.generic.dataArray=arr;
   this.generic.type='Paid';
   
   this.invoiceService.updateallExpertIInvoice(null, this.generic).subscribe(
    (response) => {
      log.debug('response: ', response);
      this.isLoading = false;
      
      this.toasterService.success('Marked as Paid.', 'Success!');
   
   
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
    /* */
    },
    (error) => {
      log.error(error);
      log.debug('Not Created', this.invoiceData);
      this.error = error;
    });
    
   
   
   
    }
   
   this.getUnpaidInvoice();
   this.getPaidInvoice();
    }




// send invoices from unpaid to paid   markunPaid
markAllUnPaid() {

  var arr= new Array()


  let isOK = confirm("Are you sure to mark these Vouchers as  Unpaid?");
  if (isOK)
  {


    for  (const iterator of this.paidInvoiceList) {
   
      //(   let index = 0; index < this.paidInvoiceList.length; index++) {
   
       if (iterator.checked) {
         debugger
   console.log (iterator)
   
   var curid=iterator.id;
   
   arr.push(curid)
   
       }
   
   
     }
       
   
   this.generic.dataArray=arr;
   this.generic.type='Unpaid';
   
   this.invoiceService.updateallExpertIInvoice(null, this.generic).subscribe(
    (response) => {
      log.debug('response: ', response);
      this.isLoading = false;
      
      this.toasterService.success('Marked as Unpaid.', 'Success!');
   
   
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
    /* */
    },
    (error) => {
      log.error(error);
      log.debug('Not Created', this.invoiceData);
      this.error = error;
    });
    
   
   
   
    }
   
   this.getUnpaidInvoice();
   this.getPaidInvoice();
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
       //     this.isLoading = false;
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
         //       this.isLoading = false;
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




//gs

}
