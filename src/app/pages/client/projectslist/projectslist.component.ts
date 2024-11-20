
import { Router, UrlTree } from '@angular/router';
import {employeeUser} from '../../../core/models/employee.model';
import {QueryList, ViewChildren} from '@angular/core';
import { Project } from '../../../core/models/project.model';
import { UntypedFormBuilder,FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import {Expert} from '../../../core/models/expert.model';
import { GridJs } from './data';
import {projects} from './projects.model';
import { NgbdGridJsPrjSortableHeader, PrjSortEvent } from './projects-sortable.directive';
import { ProjectService } from '../../../core/services/project.service';

import { ClientsService } from '../../../core/services/clients.service';
//import { Clients } from '../models/clients.model';
//import { complianceActionsService } from '../../../core/services/complianceActions.service';
//import { ExpertComponent } from '../projects/projects.component';
//import { projectStatus } from '../overview/project.data';
import { CompanyTypeService } from '../../../core/services/company-type.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/kruser.service';
import { CompanyType, Users } from '../../../core/models/default.model';
import { DecimalPipe } from '@angular/common';
// import { ExpertsService } from '../../../core/services/experts.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Logger } from '../../../core/logger.service';

import { Observable } from 'rxjs';
//import { ExpertTableService } from '../expert.table.service';
import { ProjectsTableService } from './projects.service';
import { DateToLocalPipe } from '../../../core/pipe';
import { ActivatedRoute } from '@angular/router';
import { SalesLeadContactService } from '../../../core/services/sales-lead-contact.service';
import { complianceActionsService } from '../../../core/services/complianceActions.service';

import { EmailService } from '../../../core/services/email.service';

import { EmailJsTemplates, EmailTitleDescription } from '../../../core/models/options';
//import { ProjectFormComponent } from '../project-form/project-form.component';

const log = new Logger('Experts Assignment Component');


import {EmployeeService} from '../../../core/services/employee.service';

import {ExpertService} from '../../../core/services/expert.service';
import {  Input, Output, } from '@angular/core';

@Component({
  selector: 'app-projectslist',
  templateUrl: './projectslist.component.html',
  styleUrls: ['./projectslist.component.scss'],
  providers: [ProjectsTableService, DecimalPipe]
})

/**
 * Starter Component
 */
export class ProjectslistComponent implements OnInit {


  debugger;

  // bread crumb items
  breadCrumbItems : Array<{}>;
  btnName: any;
emps:any[]=[] ;

prjlst:projects[] =[];

  // Table data
  gridjsList$ : Observable<projects[]>;
  total$ : Observable<number>;
  @ViewChildren(NgbdGridJsPrjSortableHeader) headers : QueryList<NgbdGridJsPrjSortableHeader>;

isnewTab:boolean=false;
  // Table data
  tables$: Observable<any[]>;
 
  expertsData: Expert[]=[];
  usersArray: Users[]=[];
  companyType: CompanyType[]=[];
krroles: string[]=[];
  roles: string='';
  whoaim: any;
  isLoading: boolean = false;
  searchFor: string='';
  searchBox : HTMLInputElement;
  listItm : HTMLSelectElement;
  contactPerson: any[] = [];
  expertData: Expert[]=[];
  idforCompliance: string='';


  krExpertsList: any[];

  whoiam: any;

  leadFormGrp: FormGroup;
  isExact:boolean=false;
  isAnd:boolean=false;
  Company:string;
  keyword: any;
  searchfor: any;
  status: any[];
  sourceType: { id: number; lead: string }[];


  concount:number;
  reccount:number;
  ripcount:number;
qrycount:any='';
totcount:number;
client: any;
expert: any;


//import { Component, Input, Output, OnInit } from '@angular/core';

@Input() itemid: string='';
@Input() readonly: boolean=true;

@Input() type: string='';
@Input() typeid: string='';

  constructor(
    private router: Router,
    private readonly userService: UserService,
    private readonly expertService: ExpertService,
    private readonly projectService: ProjectService,
    private readonly clientsService: ClientsService,
        private readonly employeeService: EmployeeService,
    public service: ProjectsTableService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private salesLeadContactService: SalesLeadContactService,
    public companyTypeService: CompanyTypeService,
    public complianceService: complianceActionsService,
    private formBuilder: FormBuilder
  ) {
    this.tables$ = service.countries$;
    this.total$ = service.total$;
    this.whoaim = JSON.parse(localStorage.getItem('user') );
 //   this.service.tableDataInput = []; //Set data for table
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
        ];

      //  this.projectStatus = projectStatus;
    this.clientsService.getclmindata()

    this.employeeService.getempmindata()
    
    
    
    
    const filters = new Map();
    const filter = {
      include: [
       /* {
          relation: 'keyAccMgr',
        },
        {
          relation: 'researchManager',
        },
        {
          relation: 'client',
        },*/
      ],
      where: {},
    "fields": {
    "id": true,
    "projectId": true,
    "name": true,
    "researchAnalyst": true,
    "status": true, 
    "createdAt": true
    },     
      order: 'createdAt DESC',
      
    };
    
    filters.set('filter', JSON.stringify(filter));
    
    this.projectService.getpjmindata(filters)
console.log("project test")



   // this.isLoading = true;
   // this.roles = this.whoaim?.roles[0];
// this.krroles = this.whoaim?.roles;
this.createFilter();
    this.roles = 'admin';
 this.krroles = ['admin'];

    //this.searchFor = this.route.snapshot.paramMap.get('searchKey');
   
   // this.getClients();
    this._fetchData();
    this.getComapnyTypes();
    this.refreshed = true;
  }

  search()
  {
   // this.getExperts();
  }

  wherearry:any[];
  isWebSign:boolean;
  private getExpertCount() {
    this.totalcnt=0;
  
    //qrycount:number;
  
    this.isLoading = true;
    const filters = new Map();
    let filter = {
      where: {},
      skip:this.skipcnt,
      limit:250
    };
  
  
    this.wherearry=[];
  
  var words= this.keyword.split(',');
  console.log(words)
  var srchlst=[];
  
  
   if (this.roles != 'admin' && this.roles != 'mainPLHead') {
    if (!filter['where']['and']) filter['where']['and'] = [];
    this.wherearry.push({
      krRelationshipMgrId: this.whoiam?.id,
    });
  }
  
  
  
  if (this.isExact)
  {
  
   if (this.leadFormGrp.value.fname) {
  
    
     this.wherearry.push({ firstName:  this.leadFormGrp.value.fname });
    // filter['where']['or'].push({ lastName:  this.leadFormGrp.value.name});
    
     
   }
  
   if (this.leadFormGrp.value.lname) {
  
  
   // filter['where']['or'].push({ firstName:  this.leadFormGrp.value.name });
   this.wherearry.push({ lastName:  this.leadFormGrp.value.lname});
   
    
  }
  
  }
  else{
  
  
     if (this.leadFormGrp.value.fname) {
   
      this.wherearry.push({ firstName: { like: this.leadFormGrp.value.fname, options: 'i' } });
   //    filter['where']['or'].push({ lastName: { like: this.leadFormGrp.value.name, options: 'i' } });
      
     }
  
  
     if (this.leadFormGrp.value.lname) {
  
    //  filter['where']['or'].push({ firstName: { like: this.leadFormGrp.value.name, options: 'i' } });
    this.wherearry.push({ lastName: { like: this.leadFormGrp.value.lname, options: 'i' } });
    
    }
  
  
  
   }
  
  
   
   if ((this.Company)&&(this.Company!='')  ){
    
    this.wherearry.push({ "workingDetails.companyName": { like: this.Company, options: 'i' } });
     }
  
  
  
     if (this.leadFormGrp.value.designation) {
  
      this.wherearry.push({ designation: { like: this.leadFormGrp.value.designation, options: 'i' } });
     }
  
     
     // if (this.leadFormGrp.value.companyName) {
     //   if (!filter['where']['and']) {
     //     filter['where']['and'] = [];
     //   }
     //   filter['where']['and'].push({ workingDetails["companyName"]: { like: this.leadFormGrp.value.companyName} });
     // }
  
     if (this.leadFormGrp.value.country) {
      
      this.wherearry.push({ country: { like: this.leadFormGrp.value.country, options: 'i' } });
     }
     if (this.leadFormGrp.value.industry) {
   
      this.wherearry.push({ industry: { like: this.leadFormGrp.value.industry, options: 'i' } });
     }
     if (this.leadFormGrp.value.sourceType) {
     
      this.wherearry.push({ sourceType: { like: this.leadFormGrp.value.sourceType, options: 'i' } });
     }
     if (this.leadFormGrp.value.status) {
      
      this.wherearry.push({ status: { like: this.leadFormGrp.value.status, options: 'i' } });
     }
  
  
   // this.wherearry.push({ status: { neq: 'Deleted'} });
  
    const wheremp = new Map();
      
    wheremp.set('where', JSON.stringify(this.wherearry));
      
  
  
    this.expertService.getCount(wheremp).subscribe((data) => {
      
    
      this.qrycount= data;
      
      this.isLoading=false;
      console.log( data);
    //  this.toasterService.success('POC Details updated successfully.', 'Success!');
     // this.getExperts(this.id);
    },
    (error: any) => {   this.isLoading = false;}
    
    
    );
  
  
  }

  /**
   * fetches the table value
   */
  async _fetchData() {
    this.getAllContactPerson();
    this.getProjects();
    this.getcomplianceDetails();
  }
  clientList: any[]=[];
//
  getProjects() {
    this.client = JSON.parse(localStorage.getItem('client') );
    this.expert = JSON.parse(localStorage.getItem('expert') );

    this.isLoading = true;
    var result : any[] = [];
    const filters = new Map();
    const filter = {
      include: [
       /* {
          relation: 'keyAccMgr',
        },
        {
          relation: 'researchManager',
        },
        {
          relation: 'client',
        },*/
      ],
      where: {'and':result},
  "fields": {
    "id": true,
    "projectId": true,
    "name": true,
    "researchAnalyst": true,
    "projectType": true,
    "status": true,  
    "startDate": true,
    "dueDate": true,
    "expectedNumEvent": true,
    "notes": true,
    "clientId": true,
    "billingclientId": true,
    "keyAccMgrId": true,
    "researchManagerId": true,
    "isComplianceVerified": true,
    "complianceComment": true,
    "createdAt": true
  },     
      order: 'createdAt DESC',
      limit:100,
    };

    var filtrval={};

    if (this.roles === 'researchAnalyst') {
      filtrval = { researchAnalyst: this.whoaim.id };
    }
    if (this.roles === 'researchManager') {
      filtrval = { researchManagerId: this.whoaim.id };
    }
    if (this.roles === 'keyAccountManager') {
      filtrval = { keyAccMgrId: this.whoaim.id };
    }
    if (this.roles === 'client') {
      filtrval = { clientId: this.client.id };
    }
    if (
      this.roles === 'admin' ||
      this.roles === 'compliance' ||
      this.roles === 'mainPLHead' ||
      this.roles === 'subPLHead'
    ) {
     // filter.where = {and :[{ 'leadAttached': { ne: []}},{ 'leadAttached.designation': { ne: null}},] };
     // filter.where = { 'leadAttached': { $ne: null}};
     filter.where ={'and':[{}]};
      //"leadAttached.designation": { $ne: null}
    }
    if (this.roles === 'expert') {
      filtrval = { 'leadAttached.id': this.expert.id } || { 'givenToAccMgr.id': this.expert.id } || {
          'givenToClient.id': this.expert.id,
        };
    }

    if (
      this.roles != 'admin' &&
      this.roles != 'researchManager' &&
      this.roles != 'keyAccountManager' &&
      this.roles != 'researchAnalyst' &&
      this.roles != 'client' &&
      this.roles != 'expert' &&
      this.roles != 'compliance' &&
      this.roles != 'mainPLHead' &&
      this.roles != 'subPLHead'
    ) {
      filtrval = { assigneeId: this.whoaim.id };
    }
   // filter.where ={'and':[{}]};

    filter.where['and'] =[filtrval,{"datasrc":{ neq: 'importOld'} }] ;

    //filter.where={"datasrc":{ neq: 'importOld'} } ;



    /*
    else
    {

      
      filter.where = {  and: [{
        "leadAttached.designation": {
            ne: null
        }
    }, {
        "leadAttached.designation": {
            ne: ""
        }
    }, {
        leadAttached: {
            ne: null
        }
        
    }
    , {
      leadAttached: {
          ne: []
      }
     
  }
  , {
    givenToClient: {
        ne: []
    }
   
}, {
  givenToClient: {
      ne: null
  }
 
}

  ]


  }
  

    }
*/



    if (this.searchFor != null) {
      let SearchFor = this.searchFor;
      if (filter.where) {
        filter.where = {
          and: [
            filter.where,
            {
              name: {
                like: SearchFor,
              },
            },
          ],
        };
      } else {
        filter.where = {'and':[{
          name: {
            like: this.searchFor,
          }}],
        };
      }
    }

debugger

console.log('this.id ',this.type)
if (this.type=='client')
{
  filter.where={'and':[{}]};
  filter.where={'and':[{clientId: this.typeid },{"datasrc":{ neq: 'importOld'}}]};

}
else if (this.type=='expert')
{
  filter.where={'and':[{}]};
 // filter.where={'and':[{clientId: this.typeid }]};
  filtrval = { 'leadAttached.id': this.typeid } || { 'givenToAccMgr.id': this.typeid } || {
    'givenToClient.id': this.typeid,
  };
  
  filter.where['and'] =[filtrval,{"datasrc":{ neq: 'importOld'} }] ;

}


    filters.set('filter', JSON.stringify(filter));
    this.projectService.getAll(filters).subscribe(
      (projects: any) => {
      //  this.projectsData = projects;

    console.log(projects)
       // prjlst;

       this.clientsService.getclientmin().subscribe (
        (clnt: any) => {
          this.clientList = clnt;

if (projects && projects.length>0)
{


for (let index = 0; index < projects.length; index++) {
  const element = projects[index];

  this.prjlst.push(
{
  id: element.id,
  country:  element.country,
  industry: element.industry,
  Clientname:this.getclientname(element.clientId),
  name: element.name,
  clientId:element.clientId,
  projectType: element.projectType,
  status: element.status,
  engagementType: element.engagementType,
  expectedNumEvent: element.expectedNumEvent,
  createdAt: element.createdAt,
  updatedAt: element.updatedAt,
  startdate:element.startDate

}


  )

  
}


       this.totalcnt=projects.length;
       this.krExpertsList = projects;
       this.bindData() ;
        this.service.emps= this.prjlst;

        this.gridjsList$=this.service.countries$;

     
//console.log( this.service.countries$)


        if (this.searchFor) {
          this.searchBox = <HTMLInputElement>document.getElementById('globelSearch');
          this.searchBox.value = this.searchFor;

          this.listItm = <HTMLSelectElement>document.getElementById('Searchbucket');
          this.listItm.options['2'].selected = true;
        }
        this.isLoading = false;
      }

    },
    (error: any) => {
      this.isLoading = false;
    }
  );

      },
      (error: any) => {
        this.isLoading = false;
      }
    );
  }
  projectStatus: any;

  private bindData() {
    this.prjlst.forEach((project) => {
   //  var res = _.find(projectStatus, { id: project.status });
    
     let res = this.projectStatus?.find((x) => x.id == project.status);  //this.clientList?.find((x) => x.id == id);
    
     project['status']=res?.text;
       project['statuscls']=res?.colorClass;
    
    });
  }
  
 async getClientlist() {
    this.clientList = await this.clientsService.getclmindata();

    console.log(this.clientList)
  }

  getclientname(id:any) {
    if (id) {
      let clientName = this.clientList?.find((x) => x.id == id);  //this.clientList?.find((x) => x.id == id);
      return clientName?.companyName;
    }
  }



   
   createFilter() {
    this.leadFormGrp = this.formBuilder.group({
      searchKeyword: [null],
      fname: [null],
      lname: [null],
      designation: [null],
      companyName: [null],
      country: [null],
      industry: [null],
      status: [null],
      sourceType: [null],
    });
  }
  
  
  TrimProjectName(name ) {
    var trimmedString ="";
    var yourString = name; //replace with your string.
    var maxLength = 13 // maximum number of characters to extract &&  yourString.length>maxLength
    if (yourString!=undefined && yourString !="" )
    {
    //trim the string to the maximum length
     trimmedString = yourString.substr(0, maxLength);
     return  trimmedString+"...";
    //re-trim if we are in the middle of a word
   // trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
    }
    else
    {
      return  yourString;
    }
  
  
   }
  
   clear() {
    this.leadFormGrp.reset();
    this.krExpertsList = [];
  }
   skipcnt:number =0;
   totalcnt:number =0;
   isCompleted:boolean=false;
  
   getNextSet(isleft:boolean) {
     if (isleft)
     {
       this.skipcnt=this.skipcnt-250;
       if (this.skipcnt<0)
       {
         {
           this.skipcnt=0;    
         }
       }
     }
     else{  
     this.skipcnt=this.skipcnt+250;
   }
     
   }
   



  compliancealldata: any;






  getcomplianceDetails() {
    const filters = new Map();

    const filter = {
      where: {
        and: [
          {
            compliancetype: 'expert',
          },
        ],
      },
    };

    filters.set('filter', JSON.stringify(filter));
    this.complianceService.getAll(filters).subscribe(
      (expert: any) => {
        //  this.isLoading = false;
        this.compliancealldata = expert;
        console.log('compliancealldata Details', this.compliancealldata);
        var userData = JSON.parse(window.localStorage.getItem('user') );
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

this.isnewTab=true;


if (this.isnewTab)
{
  //const url = this._router.serializeUrl(
 // this._router.createUrlTree(['/callreports']));
  //window.open('#' + url, '_blank');

  const urlTree: UrlTree = this.router.createUrlTree(['projectsall/project', id]);
 // this.router.navigateByUrl(urlTree,);
 const url: string = this.router.serializeUrl(urlTree);
 window.open(url, '_blank');

  }
  else{
  
this.itemid=id;

    this.modalService.open(content, { size: 'lg', centered: true });
  }
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
      this.whoaim = JSON.parse(localStorage.getItem('user') );
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


  onSort({column, direction}: PrjSortEvent) {
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



