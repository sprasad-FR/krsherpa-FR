

import {employeeUser} from '../../../core/models/employee.model';
import {QueryList, ViewChildren} from '@angular/core';

import { UntypedFormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import { Events} from '../../../core/models/event-details.model';
import { GridJs } from './data';
import { Component, OnInit } from '@angular/core';

import { NgbdGridJsSortableHeader, SortEvent } from './events-sortable.directive';

import { CompanyTypeService } from '../../../core/services/company-type.service';

import { UserService } from '../../../core/services/kruser.service';

import { EmployeeService } from '../../../core/services/employee.service';

import { EventService } from '../../../core/services/event.service';

import { ProjectService } from '../../../core/services/project.service';


import {ClientsService} from '../../../core/services/clients.service';
import { SalesLeadContactService } from '../../../core/services/sales-lead-contact.service';
import { complianceActionsService } from '../../../core/services/complianceActions.service';

import { EmailService } from '../../../core/services/email.service';

import { EmailJsTemplates, EmailTitleDescription } from '../../../core/models/options';


import { CompanyType, Users } from '../../../core/models/default.model';
import { DecimalPipe } from '@angular/common';
//import { ClientsService } from '../../../core/services/clients.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Logger } from '../../../core/logger.service';

import { Observable } from 'rxjs';
//import { ClientTableService } from '../client.table.service';
import { events } from './events.model';

import { EventsTableService} from './events.service';
import { DateToLocalPipe } from '../../../core/pipe';
import { ActivatedRoute } from '@angular/router';

const log = new Logger('Clients Assignment Component');



@Component({
  selector: 'app-eventslist',
  templateUrl: './eventslist.component.html',
  styleUrls: ['./eventslist.component.scss'],
  providers: [EventsTableService, DecimalPipe]
})

/**
 * Starter Component
 */
export class EventslistComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  btnName: any;
emps:any[]=[];

  // Table data
  gridjsList$!: Observable<events[]>;
  total$!: Observable<number>;
  @ViewChildren(NgbdGridJsSortableHeader) headers!: QueryList<NgbdGridJsSortableHeader>;


  // Table data
  tables$: Observable<any[]>;
 
  clientsData: events[]=[];
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
  clientData: events[]=[];
  idforCompliance: string='';
  projectlist:any[];
  client: any;

  expert: any;
  skipcnt:number =0;
  totalcnt:number =0;
  isCompleted:boolean=false;


  eventStatus = [{ text: 'Completed' }, { text: 'Cancelled' }, { text: 'Upcoming' }, { text: 'Failed' }];
  emplist: any;

  status:string="Upcoming";
  eventsData: any = [];

  prjlst: events[]=[];


  constructor(
    private readonly eventService: EventService,
    private readonly projectService: ProjectService,  
    private employeeService: EmployeeService,
    private readonly userService: UserService,
    private readonly clientService: ClientsService,
    public service: EventsTableService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private salesLeadContactService: SalesLeadContactService,
    public companyTypeService: CompanyTypeService,
    public complianceService: complianceActionsService
  ) {
    this.tables$ = service.countries$;
    this.total$ = service.total$;

    this.whoaim = JSON.parse(localStorage.getItem('user'));

 //   this.service.tableDataInput = []; //Set data for table
  }

  ngOnInit(): void {

    this.breadCrumbItems = [
     
    ];

    this.whoaim = JSON.parse(localStorage.getItem('user')!);

    this.isLoading = true;
    this.roles = this.whoaim?.roles[0];
 this.krroles = this.whoaim?.roles;

 debugger
 //   this.roles = 'admin';
 //this.krroles = ['admin'];

    //this.searchFor = this.route.snapshot.paramMap.get('searchKey');
   
//this.projectlist=this.projectService.getpjmindata();



this.employeeService.getAllmin().subscribe(
  (res) => {
    this.emplist = res;
    console.log(' this.allEmployee ',  this.emplist );
  },
  (error: any) => {}
);


    this._fetchData();




  }

  /**
   * fetches the table value
   */


  async _fetchData() {
debugger
    var usrid = this.route.snapshot.params['id'];
    var status = this.route.snapshot.params['status'];

if (status)
{

  status= status.toLowerCase().replace(/(?:^|\s)[a-z]/g, function (m) {
    return m.toUpperCase();
 });

  this.status=status;
  


    if (usrid)
    {
      this.getfltrEvent(usrid);
}

}
else{
  this.getEvents();
}

  



    this.getcomplianceDetails();
  }



  getfltrEvent(id:any)
  {

//"5a27db8fd7d1377e69ed21e9" sanya

    const filters = new Map();
    const filter = {
      where: {},
    };
    
//id="5a27db8fd7d1377e69ed21e9";

var mon=new Date().getMonth()+1 ;

var smon='';

if (mon<10)
{
  smon='0'+mon.toString();
}
else{
  smon=mon.toString();;
}


   let start=new Date().getFullYear().toString()+"-"+smon+"-"+"01"; 
  let  end=new Date().getFullYear().toString()+"-"+smon+"-"+new Date().getDate().toString()
 //let start="2010-01-01";

  //let end="2023-01-31"
   // {"eventAt":{"gte" :start}},  {"eventAt":{"lt" :end}}

  //  {"where":{"and":[{"_id":{"ne":null}}],"or":[{}]},"skip":0}

  if(this.filterstatus==0)
  {
 //   filter.where = {"or":[{"researchAnalystId":id},{"researchMgrId":id},{"keyAccountManager":id}, {"subPnL":id}],"and":[{"eventAt":{"gte" :start}}] };
  filter.where = {"or":[{"researchAnalystId":id},{"researchMgrId":id},{"keyAccountManager":id}, {"subPnL":id}],"and":[{"status":this.status}, {"eventAt":{"gte" :start}}] };
  }
  else{
    filter.where = {"or":[{"researchAnalystId":id},{"researchMgrId":id},{"keyAccountManager":id}, {"subPnL":id}] };

  }
 // filter.where = {"and":   [{"sourceType":type4},{"createdAt":{"gte" :start}}]};

    filters.set('filter', JSON.stringify(filter));

 this.eventService.getAll(filters).subscribe(
 // this.eventService.getCount(filters).subscribe(
  (data: any) => {




    this.projectService.getmin().subscribe(
      (res) => {
        this.projectlist=res;

     

       

    if (data!=undefined && data!=null)
    {
      this.totalcnt=data.length
    }
    this.prjlst=[];

    if (data && data.length>0)
    {

   // this.projectlist=this.projectService.getpjmindata();




        for (let index = 0; index < data.length; index++) {
          const element = data[index];
        
          console.log ( element['researchMgrId'])


          this.prjlst.push(
        {
          id: element.id,
          projects:this.getProjectname(element.projectId),
          krcontact:this.getEmpName(element['researchMgrId']),       
          duration: element.eventDuration?.toString(),
           status: element.status,
        
          eventAt: element.updatedAt,
       
        }     
        
          )      
          
        }




  }



    this.service.emps=this.prjlst;

    this.gridjsList$=this.service.countries$;


    if (this.totalcnt>200)
    {
      this.service.pageSize=75;
    
    }


 },
      (error: any) => {}
    );


// this.boxvalue2=events;
   // this.boxtext2="Completed Events";


    //  console.log('compliancealldata Details', this.compliancealldata);
    //   var userData = JSON.parse(window.localStorage.getItem('user'));
  },
  (error: any) => {  console.log('error',error);}
);


  
  }


  getEmpName(userId?: any) {

   

    if (userId != null && this.emplist != undefined) {
     // const user = this.emplist?.find((x) => x.userId === userId);
      const user = this.emplist.find((x:any) => x.userId == userId);
      if (user?.name) {
        return user?.name;
      } else {
        return '**';
      }
    } else {
      return '--';
    }


  }

  getEvents11(id:any) {

    if (id==0)
    {
    //  this.getEvents(this.whoaim.id);
    }
    else{
    /// this.getEvents1(id);
    }

  }

  getEvents() {



    debugger
     this.isLoading = true;
    this.client = JSON.parse(localStorage.getItem('client'));
    this.expert = JSON.parse(localStorage.getItem('expert'));
   // this.emplist = JSON.parse(localStorage.getItem('emp'));

    const filters = new Map();
    const filter = {
     /* include: [
       {
          relation: 'krResearchMgr',
        },
        {
          relation: 'project',
        },     
      ], */
      where: {},
      skip:this.skipcnt,
      limit:250
    };

    if (this.roles === 'researchManager') {

      if (!filter['where']['or']) {
        filter['where']['or'] = [];
      }
      filter['where']['or'].push({researchMgrId: this.whoaim.id });
      filter['where']['or'].push({researchAnalystId: this.whoaim.id });
     // filter.where = { researchMgrId: this.whoaim.id };

    //  filter.where = { researchMgrId: this.whoaim.id };
    }
    if (this.roles === 'researchAnalyst') {
      filter.where = { researchAnalystId: this.whoaim.id };
    }
    if (this.roles === 'keyAccountManager') {
      filter.where = { keyAccountManager: this.whoaim.id };
    }
    
    /*
    if (this.roles === 'expert') {
      filter.where = { expertId: this.whoaim.id };
    }
    if (this.roles === 'client') {
      filter.where = { clientId: this.client.id };
    }  */

    if (
      this.roles === 'admin' ||
      this.roles === 'compliance' ||
      this.roles === 'mainPLHead' ||
      this.roles === 'subPLHead'
    ) {
      filter.where = {};
    }
    else{

    //  filter['where']['or'].push({researchMgrId: this.whoaim.id });
    //  filter['where']['or'].push({researchAnalystId: this.whoaim.id });
     // filter['where']['or'].push({assigneeId: this.whoaim.id  });

    }


    if (
      this.roles === 'admin' ||
      this.roles === 'compliance' ||
      this.roles === 'mainPLHead' ||
      this.roles === 'subPLHead'
    ) {    filter.where = {};
   }
   else{
     filter.where = { or : [{ researchMgrId: this.whoaim.id },{ researchAnalystId: this.whoaim.id },{ keyAccountManager: this.whoaim.id },{ assigneeId: this.whoaim.id }]}
   
   }

   if(this.filterstatus==0)
   {
    if (this.status) {

      if (!filter['where']['and']) {
        filter['where']['and'] = [];
      }

      filter['where']['and'].push({ status: { like: this.status, options: 'i' } });


    }
  }

    filter['order'] = 'eventAt desc';


    



    filters.set('filter', JSON.stringify(filter));
    this.eventService.getAll(filters).subscribe(
      (data) => {



        this.projectService.getmin().subscribe(
          (res) => {
            this.projectlist=res;
    
this.prjlst=[];
        console.log (data)


        if (data!=undefined && data!=null)
        {
          this.totalcnt=data.length
        }
        

        if (data && data.length>0)
        {
  
       // this.projectlist=this.projectService.getpjmindata();




            for (let index = 0; index < data.length; index++) {
              const element = data[index];
            
              console.log ( element['researchMgrId'])


              this.prjlst.push(
            {
              id: element.id,
              projects:this.getProjectname(element.projectId),
              krcontact:this.getEmpName(element['researchMgrId']),       
              duration: element.eventDuration?.toString(),
               status: element.status,
            
              eventAt: element.updatedAt,
           
            }     
            
              )      
              
            }




      }

        this.service.emps=this.prjlst;


        if (this.totalcnt>200)
        {
          this.service.pageSize=75;
        
        }
        this.gridjsList$=this.service.countries$;

      },
      (error: any) => {}
    );

      console.log (this.eventsData)


         this.isLoading = false;
      },
      (error: any) => {

 this.isLoading = false;

      }
    );
  }

  filterstatus:any=0;

  setfilterstatus(event: any)
  {
 
 
 
  let val = event.target.value.trim();
    
 
 this.filterstatus=val ;

 this.getEvents();
 
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




  getProjectname(value1) {
    //let prj= this.projectList.find
   // console.log('value1',value1);
   
   if (value1!='')
     {
     return this.projectlist?.find((x) => x.id == value1)?.name;
     }
   
   }



  TrimProjectName(name ) {
    var trimmedString ="";
    var yourString = name; //replace with your string.
    var maxLength = 45 // maximum number of characters to extract
    if (yourString!=undefined && yourString!="")
    {
    //trim the string to the maximum length
     trimmedString = yourString.substr(0, maxLength);
    
    //re-trim if we are in the middle of a word
    trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
    }
    else
    {}
  return  trimmedString+"...";
  
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


  getCompanyType(companyType:any) {
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



