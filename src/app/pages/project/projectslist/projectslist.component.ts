
import { Router, UrlTree } from '@angular/router';
import {employeeUser} from '../../../core/models/employee.model';
import {QueryList, ViewChildren} from '@angular/core';
import { Project } from '../../../core/models/project.model';
import { UntypedFormBuilder,FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';


import {Expert} from '../../../core/models/expert.model';
import { GridJs } from './data';
import {projects} from './projects.model';
import { NgbdGridJsSortableHeader, SortEvent } from './projects-sortable.directive';
import { ProjectService } from '../../../core/services/project.service';

import { ClientsService } from '../../../core/services/clients.service';
//import { Clients } from '../models/clients.model';
//import { complianceActionsService } from '../../../core/services/complianceActions.service';
//import { ExpertComponent } from '../projects/projects.component';
import { projectStatus } from '../overview/project.data';
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
import { ProjectFormComponent } from '../project-form/project-form.component';

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

prjlst:any[] =[];    //prjlst:projects[] =[];
clientprjlst:any[] =[];   //clientprjlst:projects[] =[];
dbsearch:any;
indus: any[]=[];
prjnames: any[]=[];
sreserr:string='';
expnames: any[]=[];
  // Table data
  gridjsList$ : Observable<projects[]>;
 gridjsListclient$ : Observable<projects[]>;
  
  total$ : Observable<number>;
  @ViewChildren(NgbdGridJsSortableHeader) headers : QueryList<NgbdGridJsSortableHeader>;

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

  isMcKinsey:boolean=false; //false
  krExpertsList: any[];

  //whoiam: any;

  leadFormGrp: FormGroup;
  isExact:boolean=false;
  isAnd:boolean=false;
  Company:string;
  keyword: any;
  searchfor: any;
  status: any;
  sourceType: { id: number; lead: string }[];
 

  concount:number;
  reccount:number;
  ripcount:number;
qrycount:any='';
totcount:number;
client: any;
expert: any;
allroles:any[]=[];

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
        this.status=0;
debugger
       
      //  this.loaderService.show('dsfdsfdfdf','');


        this.whoaim = JSON.parse(localStorage.getItem('user'));
        this.roles = this.whoaim.roles[0];
        this.allroles = this.whoaim.roles;

if (this.allroles.indexOf("MckinseyTeam")>=0)
{

this.isMcKinsey=true;

}



this.isLoading=true;

        this.projectStatus = projectStatus;
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
    this.roles = this.whoaim?.roles[0];
 this.krroles = this.whoaim?.roles;
this.createFilter();
   // this.roles = 'admin';
 //this.krroles = ['admin'];

    //this.searchFor = this.route.snapshot.paramMap.get('searchKey');
   
   // this.getClients();
    this._fetchData();
    this.getComapnyTypes();
    this.refreshed = true;
  }


  search()
  {
   this.getProjects();
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
     // skip:this.skipcnt,
      limit:250
    };
  
  
    this.wherearry=[];
  
  var words= this.keyword.split(',');
  console.log(words)
  var srchlst=[];
  
  
   if (this.roles != 'admin' && this.roles != 'mainPLHead') {
    if (!filter['where']['and']) filter['where']['and'] = [];
    this.wherearry.push({
      krRelationshipMgrId: this.whoaim?.id,
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
      
     // this.isLoading=false;
      console.log( data);
    //  this.toasterService.success('POC Details updated successfully.', 'Success!');
     // this.getExperts(this.id);
    },
    (error: any) => {   this.isLoading = false;}
    
    
    );
  
  
  }


  getbyname(event: any)
  {
 
 
 
  let val = event.target.value.trim();

  this.service.searchTerm=val;


  }


filterstatus:any=0;

  setfilterstatus(event: any)
  {
 
 
 
  let val = event.target.value.trim();
    
 
 this.filterstatus=val ;

 this.getProjects();
 
  }
 


  /**
   * fetches the table value
   */
  async _fetchData() {
    this.getAllContactPerson();


    var usrid = this.route.snapshot.params['id'];
    var status = this.route.snapshot.params['status'];
this.debugger

    if (status)
    {
     
      this.getfltrProjects(usrid,status);
    }
    else{
      this.getProjects();
    }
 



    this.getcomplianceDetails();
  }
  clientList: any[]=[];
//




getfltrProjects(id:any, status:any) {
  this.client = JSON.parse(localStorage.getItem('client') );
  this.expert = JSON.parse(localStorage.getItem('expert') );

  this.isLoading = true;
  var result : any[] = [];
  const filters = new Map();
  const filter = {   
    where: {},   
    order: 'createdAt DESC',
    limit:500,
  };

  var filtrval={};




 
 

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
   // filtrval = { assigneeId: this.whoaim.id };
  }

  if(this.filterstatus==0)
  {
  if (
    this.roles == 'admin' || 
    this.roles == 'compliance' || 
    this.roles == 'mainPLHead' 
  ) {

    filter.where = {"or":[{"researchAnalyst":{"neq":null} },{"researchManagerId":{"neq":null}}] ,"and":[{"status":this.status},]};

  }
  else{
 //   filter.where = {"or":[{"researchAnalystId":id},{"researchMgrId":id},{"keyAccountManager":id}, {"subPnL":id}],"and":[{"eventAt":{"gte" :start}}] };
 filter.where = {"or":[{ assigneeId: id },{"researchAnalyst":id},{"researchManager":id},{"keyAccountManager":id},{"assigneeId":id}, {"subPnL":id}],"and":[{"status":this.status},] };
  }

  }
  else{


    if (
      this.roles == 'admin' || 
      this.roles == 'compliance' || 
      this.roles == 'mainPLHead' 
    ) {  
      filter.where = {"or":[{"researchAnalyst":{"neq":null} },{"researchManagerId":{"neq":null}}] };
    }
    else{
   //   filter.where = {"or":[{"researchAnalystId":id},{"researchMgrId":id},{"keyAccountManager":id}, {"subPnL":id}],"and":[{"eventAt":{"gte" :start}}] };
   filter.where = {"or":[{ assigneeId: id },{"researchAnalyst":id},{"researchManager":id},{"keyAccountManager":id},{"assigneeId":id}, {"subPnL":id}]};
    }


  }

 // filter.where ={'and':[{}]};

 // filter.where['and'] =[filtrval,{"datasrc":{ neq: 'importOld'} }] ;

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





//filter.where['and'] =[filtrval,{"datasrc":{ neq: 'importOld'} }] ;




  filters.set('filter', JSON.stringify(filter));
 // this.projectService.getAllMin(filters).subscribe(

     this.projectService.getAllMin(filters).subscribe(
    (projects: any) => {
    //  this.projectsData = projects;
    this.prjlst=[];
    this.dbsearch=[];
    this.indus=[];
    this.prjnames=[];
    this.expnames=[];
  console.log(projects)
     // prjlst;

     this.clientsService.getclientmin().subscribe (
      (clnt: any) => {
        this.clientList = clnt;
        this.isLoading = false;
if (projects && projects.length>0)
{


for (let index = 0; index < projects.length; index++) {
const element = projects[index];

this.prjlst.push(
{
id: element.id,
country:  element.country,
industry: element.industry,
Client:this.getclientname(element.clientId),
name: element.name,
clientId:element.clientId,
projectType: element.projectType,
status: element.status,
engagementType: element.engagementType,
expectedNumEvent: element.expectedNumEvent,
createdAt: element.createdAt,
updatedAt: element.updatedAt,
completedEventcount: element.completedEventcount,
leadAttachedcount: element.leadAttachedcount,
givenToAccMgrcount: element.givenToAccMgrcount,
givenToClientcount: element.givenToClientcount,
expertlist:element.expertslist?.toString()
}  )


if (!this.indus.includes( element.industry))
{
  this.indus.push(element.industry.toString());
}


if (element.expertslist)
{
this.expnames= this.expnames.concat(element.expertslist);
}


  this.prjnames.push(element.name);




}


     this.totalcnt=projects.length;
     this.krExpertsList = projects;
     this.bindData() ;
     
      this.service.emps= this.prjlst;
      if ( this.totalcnt>300)
      {
        this.service.pageSize= Number((this.totalcnt/10).toFixed(0))
      }
debugger

      this.gridjsList$=this.service.countries$;

    this.gridjsListclient$=this.service.clientSentProjects$;
console.log('test', this.service.clientSentProjects$) 


      if (this.searchFor) {
        this.searchBox = <HTMLInputElement>document.getElementById('globelSearch');
        this.searchBox.value = this.searchFor;

        this.listItm = <HTMLSelectElement>document.getElementById('Searchbucket');
        this.listItm.options['2'].selected = true;
      }
     // this.isLoading = false;
    }

  },
  (error: any) => {
   // this.isLoading = false;
  }
);

    },
    (error: any) => {
     // this.isLoading = false;
    }
  );
}

//indus:string[]=[];

getProjectszz() {    //  getProjects13Mar2023() {

  this.client = JSON.parse(localStorage.getItem('client') );
  this.expert = JSON.parse(localStorage.getItem('expert') );

  this.isLoading = true;
  var result : any[] = [];
  const filters = new Map();
  let filter = {     
    id: 'xxx',     
    filter: {},
   
  };

  var filtrval={};

/*

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
  }  */

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
   // filtrval = { assigneeId: this.whoaim.id };
  }


  debugger

  var Andwherearry:any[]=[]

  var Orwherearry:any[]=[]


  if (this.dbsearch && this.dbsearch!='' &&   this.dbsearch.trim()!='')  // && this.dbsearch=='xxx'
  {
    var words= this.dbsearch.split(',');
  
  if (words!=null &&  words.length>1)
  {
  
 //   words.forEach(element => {  })
  
     // filter['where']['and']['or']=[];
  for (let index = 0; index < words.length; index++) {
    const element = words[index];
    

  
      Orwherearry.push({ name: { like: element, options: 'i' } });
     
      Orwherearry.push({ sector: { like: element, options: 'i' } });
      
  
      Orwherearry.push({ industry: { like: element, options: 'i' } });
     
      Orwherearry.push({ 'notes.content': { like: element, options: 'i' } });
     
    }
  
   
   // filter.where['or']=Orwherearry;
  
  }
  else{

  var  element=this.dbsearch
    Orwherearry.push({ name: { like: element, options: 'i' } });
     
    Orwherearry.push({ sector: { like: element, options: 'i' } });
    

    Orwherearry.push({ industry: { like: element, options: 'i' } });
   
    Orwherearry.push({ 'notes.content': { like: element, options: 'i' } });
   


  }
  
  }
  else{
   // Orwherearry.push()
    Orwherearry.push({ "_id": { "$ne": null} });

  }


console.log(Orwherearry)


if(this.filterstatus==0)
{

  if (
    this.roles == 'admin' || 
    this.roles == 'compliance' || 
    this.roles == 'mainPLHead' 
  ) {
    filter.id='';
    filter.filter = {"$or":[{"researchAnalyst":{"$ne":null} },{"researchManagerId":{"$ne":null}}],"$and":[{"status":this.status},{"datasrc":{ "$ne": 'importOld'} }  , {'$or':Orwherearry} ] };    //{ neq: 'importOld'} }, {'or':Orwherearry}] };

  }
  else{
    filter.id=this.whoaim.id ;
//   filter.where = {"or":[{"researchAnalystId":id},{"researchMgrId":id},{"keyAccountManager":id}, {"subPnL":id}],"and":[{"eventAt":{"gte" :start}}] };
filter.filter = {"$and":[{"status":this.status},{"datasrc":{ "$ne": 'importOld'} } , {'$or':Orwherearry}  ] };  //{ neq: 'importOld'} }, {'or':Orwherearry}] };
  }

}
else{


  if (
    this.roles == 'admin' || 
    this.roles == 'compliance' || 
    this.roles == 'mainPLHead' 
  ) {
    filter.id='';
    filter.filter = {"$or":[{"researchAnalyst":{"$ne":null} },{"researchManagerId":{"$ne":null}}],"$and":[{"status":this.status},{"datasrc":{ "$ne": 'importOld'} }  , {'$or':Orwherearry} ] };    //{ neq: 'importOld'} }, {'or':Orwherearry}] };

  }
  else{
//   filter.where = {"or":[{"researchAnalystId":id},{"researchMgrId":id},{"keyAccountManager":id}, {"subPnL":id}],"and":[{"eventAt":{"gte" :start}}] };
//filter.where = {"or":[{ assigneeId: this.whoaim.id  },{"researchAnalyst":this.whoaim.id },{"researchManager":this.whoaim.id },{"keyAccountManager":this.whoaim.id },{"assigneeId":this.whoaim.id }, {"subPnL":this.whoaim.id }],"and":[{"datasrc":{ neq: 'importOld'} }] };
//filter.where = {"or":[{"researchAnalyst":this.whoaim.id },{"researchManagerId":this.whoaim.id },{"keyAccMgrId":this.whoaim.id },{"assigneeId":this.whoaim.id }, {"subPnL":this.whoaim.id }],"and":[{"datasrc":{ neq: 'importOld'} }, {'or':Orwherearry}] };
//   filter.where = {"or":[{"researchAnalystId":id},{"researchMgrId":id},{"keyAccountManager":id}, {"subPnL":id}],"and":[{"eventAt":{"gte" :start}}] };
filter.id=this.whoaim.id ;
//   filter.where = {"or":[{"researchAnalystId":id},{"researchMgrId":id},{"keyAccountManager":id}, {"subPnL":id}],"and":[{"eventAt":{"gte" :start}}] };
filter.filter = {"$and":[{"status":this.status},{"datasrc":{ "$ne": 'importOld'} } , {'$or':Orwherearry}  ] };  //{ neq: 'importOld'} }, {'or':Orwherearry}] };

} 
}

/*
https://middle.krsherpa.com/rest/expert/getprojmin


*/

 // filter.where ={'and':[{}]};

  //filter.where['and'] =[filtrval,{"datasrc":{ neq: 'importOld'} }] ;

  //filter.where={"datasrc":{ neq: 'importOld'} } ;


/*
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
*/








debugger

console.log('this.id ',this.type)

/*
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
*/

//filter.where = {"or":[{"researchAnalyst":this.whoaim.id },{"researchManagerId":this.whoaim.id }]};
//filter.where = {"or":[{"researchAnalyst":this.whoaim.id },{"researchManagerId":this.whoaim.id },{"keyAccMgrId":this.whoaim.id },{"assigneeId":this.whoaim.id }, {"subPnL":this.whoaim.id }],"and":[{"status":this.status}]};




  filters.set('filter', JSON.stringify(filter));
 



 // this.projectService.getAllMin(filters).subscribe(   getAll

  filters.set('filter', JSON.stringify(filter));
console.log(filter)

  this.projectService.getAllMin1(filter).subscribe(
    (projects: any) => {
    //  this.projectsData = projects;
    this.prjlst=[];
    this.dbsearch=[];
    this.indus=[];
    this.prjnames=[];
    this.expnames=[];

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
Client:this.getclientname(element.clientId),
name: element.name,
clientId:element.clientId,
projectType: element.projectType,
status: element.status,
engagementType: element.engagementType,
expectedNumEvent: element.expectedNumEvent,
createdAt: element.createdAt,
updatedAt: element.updatedAt,
completedEventcount: element.completedEventcount,
leadAttachedcount: element.leadAttachedcount,
givenToAccMgrcount: element.givenToAccMgrcount,
givenToClientcount: element.givenToClientcount,
expertlist:element.expertslist?.toString()
}  )


if (!this.indus.includes( element.industry))
{
this.indus.push(element.industry.toString());
}


if (element.expertslist)
{
this.expnames= this.expnames.concat(element.expertslist);
}


this.prjnames.push(element.name);




}


console.log(this.expnames);

     this.totalcnt=projects.length;
     this.krExpertsList = projects;

     this.bindData() ;
      this.service.emps= this.prjlst;

      this.gridjsList$=this.service.countries$;

      console.log(this.gridjsList$);

      if ( this.totalcnt>300)
      {
        this.service.pageSize= Number((this.totalcnt/10).toFixed(0))
      }
   
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


getProjects() {    // changed 13Apr2023  getProjectsfetch() {


  this.sreserr="";

  this.client = JSON.parse(localStorage.getItem('client') );
  this.expert = JSON.parse(localStorage.getItem('expert') );

  this.isLoading = true;
  var result : any[] = [];
  const filters = new Map();
  let filter = {     
    id: 'xxx',     
    filter: {
    "$and":[{}] ,
    "$or":[] }    
   
  };
  var filtrval={};

/*

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
  }  */

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
   // filtrval = { assigneeId: this.whoaim.id };
  }


  debugger

  var Andwherearry:any[]=[]

  var Orwherearry:any[]=[]


  if (this.dbsearch && this.dbsearch!='' &&   this.dbsearch.trim()!='')  // && this.dbsearch=='xxx'
  {
    var words= this.dbsearch.split(',');
  
  if (words!=null &&  words.length>1)
  {
  
 //   words.forEach(element => {  })
  
     // filter['where']['and']['or']=[];
  for (let index = 0; index < words.length; index++) {
    const element = words[index];
    

  
      
  Orwherearry.push({ name:  {$regex: '.*' + element + '.*',$options:'i'} });
     
  Orwherearry.push({ sector: {$regex: '.*' + element + '.*',$options:'i'}});
  

  Orwherearry.push({ industry: {$regex: '.*' + element + '.*',$options:'i'} });
 
  Orwherearry.push({ 'notes.content': {$regex: '.*' + element + '.*',$options:'i'} });
   
     



    }
  
   
   // filter.where['or']=Orwherearry;
  
  }
  else{

  var  element=this.dbsearch  //{$regex: ".*" + element + ".*",$options:i}
 
  Orwherearry.push({ name:  {$regex: '.*' + element + '.*',$options:'i'} });
     
  Orwherearry.push({ sector: {$regex: '.*' + element + '.*',$options:'i'}});
  

  Orwherearry.push({ industry: {$regex: '.*' + element + '.*',$options:'i'} });
 
  Orwherearry.push({ 'notes.content': {$regex: '.*' + element + '.*',$options:'i'} });
   


  }
  
  }
  else{
   // Orwherearry.push()
    Orwherearry.push({ "_id": { "$ne": null} });

  }


console.log(Orwherearry)


if(this.filterstatus==0)
{

  if (
    this.roles == 'admin' || 
    this.roles == 'compliance' || 
      this.roles == 'StrategicTeamManager' || 
    this.roles == 'mainPLHead' 
  ) {
    filter.id='';
    filter.filter = {"$or":[{"researchAnalyst":{"$ne":null} },{"researchManagerId":{"$ne":null}}],"$and":[ {'$or':Orwherearry} ] };    //{ neq: 'importOld'} }, {'or':Orwherearry}] };

  }
  else{

filter.id=this.whoaim.id ;
//   filter.where = {"or":[{"researchAnalystId":id},{"researchMgrId":id},{"keyAccountManager":id}, {"subPnL":id}],"and":[{"eventAt":{"gte" :start}}] };
//filter.filter = {"$and":[{"datasrc":{ "$ne": 'importOld'} } , {'$or':Orwherearry}  ] };  //{ neq: 'importOld'} }, {'or':Orwherearry}] };
filter.filter["$and"] = [ {'$or':Orwherearry}  ];  //{ neq: 'importOld'} }, {'or':Orwherearry}] };


}

}
else{


  if (
    this.roles == 'admin' || 
    this.roles == 'compliance' || 
    this.roles == 'StrategicTeamManager' || 
    this.roles == 'mainPLHead' 
  ) {
    filter.id='';
    filter.filter = {"$or":[{"researchAnalyst":{"$ne":null} }],"$and":[ {'$or':Orwherearry} ] };    //{ neq: 'importOld'} }, {'or':Orwherearry}] };

  }
  else{
//   filter.where = {"or":[{"researchAnalystId":id},{"researchMgrId":id},{"keyAccountManager":id}, {"subPnL":id}],"and":[{"eventAt":{"gte" :start}}] };
//filter.where = {"or":[{ assigneeId: this.whoaim.id  },{"researchAnalyst":this.whoaim.id },{"researchManager":this.whoaim.id },{"keyAccountManager":this.whoaim.id },{"assigneeId":this.whoaim.id }, {"subPnL":this.whoaim.id }],"and":[{"datasrc":{ neq: 'importOld'} }] };
//filter.where = {"or":[{"researchAnalyst":this.whoaim.id },{"researchManagerId":this.whoaim.id },{"keyAccMgrId":this.whoaim.id },{"assigneeId":this.whoaim.id }, {"subPnL":this.whoaim.id }],"and":[{"datasrc":{ neq: 'importOld'} }, {'or':Orwherearry}] };
//   filter.where = {"or":[{"researchAnalystId":id},{"researchMgrId":id},{"keyAccountManager":id}, {"subPnL":id}],"and":[{"eventAt":{"gte" :start}}] };
filter.id=this.whoaim.id ;
//   filter.where = {"or":[{"researchAnalystId":id},{"researchMgrId":id},{"keyAccountManager":id}, {"subPnL":id}],"and":[{"eventAt":{"gte" :start}}] };
filter.filter["$and"] = [ {'$or':Orwherearry}  ] ;  //{ neq: 'importOld'} }, {'or':Orwherearry}] };

} 
}

if (this.isMcKinsey)
{
if (!filter.filter["$or"]) filter.filter["$or"] = [];

filter.filter["$or"].push({
  "sentByClient": "mckinsey",
});

}


/*
https://middle.krsherpa.com/rest/expert/getprojmin


*/

 // filter.where ={'and':[{}]};

  //filter.where['and'] =[filtrval,{"datasrc":{ neq: 'importOld'} }] ;

  //filter.where={"datasrc":{ neq: 'importOld'} } ;


/*
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
*/








debugger

console.log('this.id ',this.type)

/*
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
*/

//filter.where = {"or":[{"researchAnalyst":this.whoaim.id },{"researchManagerId":this.whoaim.id }]};
//filter.where = {"or":[{"researchAnalyst":this.whoaim.id },{"researchManagerId":this.whoaim.id },{"keyAccMgrId":this.whoaim.id },{"assigneeId":this.whoaim.id }, {"subPnL":this.whoaim.id }],"and":[{"status":this.status}]};




  filters.set('filter', JSON.stringify(filter));
 
console.log('filter',filter)


 // this.projectService.getAllMin(filters).subscribe(   getAll

 fetch('https://middle.krsherpa.com/rest/expert/getprojmin', {method: "POST",
 body: JSON.stringify(filter),
 headers: {
 // "Access-Control-Allow-Headers": "*", // this will allow all CORS requests
 // "Access-Control-Allow-Methods": 'OPTIONS,POST,GET', // this states the allowed methods
  "Content-Type": "application/json",
  "timeout": "2000000" 
  //'Access-Control-Allow-Origin':'*',
  //"Accept":"*/*",
 // "mode": "no-cors",
   // this shows the expected content type
},
 /* headers: {
     "Content-Type": "application/json",
   //  "Access-Control-Allow-Credentials": "true",
  //    "Access-Control-Allow-Methods":"GET,HEAD,OPTIONS,POST,PUT",
    //  'Access-Control-Allow-Origin':'*',
    //  "Access-Control-Allow-Headers": "Origin, Credentials, Content-Type, Access-Control-Request-Headers"
     // 'Content-Type': 'application/x-www-form-urlencoded',
   },  */ 
}
 ).then(r => r.json()).then(projects => {
   // Result now contains the response text, do what you want...
console.log('id is:',result);

//alert(result)

this.isLoading = false;

   console.log(result);



//  this.projectService.getAllMin(filter).subscribe(
   // (projects: any) => {
    //  this.projectsData = projects;
    this.prjlst=[];
    this.dbsearch=[];
    this.indus=[];
    this.prjnames=[];
    this.expnames=[];

  console.log(projects)
     // prjlst;

   

if ( projects.result.length<1)
     {
      this.sreserr="No Results!";
      this.service.emps= [];

      this.gridjsList$=this.service.countries$;
      console.log(this.gridjsList$);
      this.gridjsListclient$=this.service.clientSentProjects$;
      console.log('test', this.service.clientSentProjects$) 
     return ;
     }

projects=projects.result;
     this.clientsService.getclientmin().subscribe (
      (clnt: any) => {
        this.clientList = clnt;

if (projects && projects.length>0)
{


for (let index = 0; index < projects.length; index++) {
const element = projects[index];

this.prjlst.push(
{
id: element._id,
country:  element.country,
industry: element.industry,
Client:this.getclientname(element.clientId),
name: element.name,
clientId:element.clientId,
projectType: element.projectType,
status: element.status,
engagementType: element.engagementType,
expectedNumEvent: element.expectedNumEvent,
createdAt: element.createdAt,
updatedAt: element.updatedAt,
completedEventcount: element.completedEventcount,
leadAttachedcount: element.leadAttachedcount,
givenToAccMgrcount: element.givenToAccMgrcount,
givenToClientcount: element.givenToClientcount,
expertlist:element.expertslist?.toString()
}  )


if (!this.indus.includes( element.industry))
{
this.indus.push(element?.industry?.toString());
}


if (element.expertslist)
{
this.expnames= this.expnames.concat(element.expertslist);
}


this.prjnames.push(element.name);




}


console.log(this.expnames);

     this.totalcnt=projects.length;
     this.krExpertsList = projects;

     this.bindData() ;
     

      this.gridjsList$=this.service?.countries$;
      if (this.isMcKinsey) {
        // Filter out McKinsey projects and store in clientprjlst
        this.clientprjlst = this.prjlst.filter((e) => e.Client != null && e.Client.toLowerCase().indexOf('mckinsey') >= 0);
        
        // Update prjlst to remove McKinsey projects
        this.prjlst = this.prjlst.filter((e) => e.Client == null || e.Client.toLowerCase().indexOf('mckinsey') < 0);
      }
      this.service.emps= this.prjlst;
      
      console.log('test', this.gridjsListclient$) 
      if ( this.totalcnt>300)
      {
        this.service.pageSize= Number((this.totalcnt/10).toFixed(0))
      }
   
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



  getProjectsxxx() {    // old working version getProjects13Mar2023() {

    this.client = JSON.parse(localStorage.getItem('client') );
    this.expert = JSON.parse(localStorage.getItem('expert') );

    this.isLoading = true;
    var result : any[] = [];
    const filters = new Map();
    const filter = {     
      where: {},     
      order: 'createdAt DESC',
      limit:25,
    };

    var filtrval={};

/*

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
    }  */

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
     // filtrval = { assigneeId: this.whoaim.id };
    }


    debugger

    var Andwherearry:any[]=[]

    var Orwherearry:any[]=[]


    if (this.dbsearch && this.dbsearch!='' &&   this.dbsearch.trim()!='')  // && this.dbsearch=='xxx'
    {
      var words= this.dbsearch.split(',');
    
    if (words!=null &&  words.length>1)
    {
    
   //   words.forEach(element => {  })
    
       // filter['where']['and']['or']=[];
    for (let index = 0; index < words.length; index++) {
      const element = words[index];
      
  
    
        Orwherearry.push({ name: { like: element, options: 'i' } });
       
        Orwherearry.push({ sector: { like: element, options: 'i' } });
        
    
        Orwherearry.push({ industry: { like: element, options: 'i' } });
       
        Orwherearry.push({ 'notes.content': { like: element, options: 'i' } });
       
      }
    
     
     // filter.where['or']=Orwherearry;
    
    }
    else{

    var  element=this.dbsearch
      Orwherearry.push({ name: { like: element, options: 'i' } });
       
      Orwherearry.push({ sector: { like: element, options: 'i' } });
      
  
      Orwherearry.push({ industry: { like: element, options: 'i' } });
     
      Orwherearry.push({ 'notes.content': { like: element, options: 'i' } });
     


    }
    
    }
    else{
     // Orwherearry.push()
      Orwherearry.push({ "_id": { neq: null} });

    }


console.log(Orwherearry)


if(this.filterstatus==0)
{

    if (
      this.roles == 'admin' || 
      this.roles == 'compliance' || 
      this.roles == 'mainPLHead' 
    ) {
      filter.where = {"or":[{"researchAnalyst":{"neq":null} },{"researchManagerId":{"neq":null}}],"and":[{"status":this.status},{"datasrc":{ neq: 'importOld'} }  , {'or':Orwherearry} ] };    //{ neq: 'importOld'} }, {'or':Orwherearry}] };

    }
    else{
 //   filter.where = {"or":[{"researchAnalystId":id},{"researchMgrId":id},{"keyAccountManager":id}, {"subPnL":id}],"and":[{"eventAt":{"gte" :start}}] };
 filter.where = {"or":[{"researchAnalyst":this.whoaim.id },{"researchManagerId":this.whoaim.id },{"keyAccMgrId":this.whoaim.id } ],"and":[{"status":this.status},{"datasrc":{ neq: 'importOld'} } , {'or':Orwherearry}  ] };  //{ neq: 'importOld'} }, {'or':Orwherearry}] };
    }

  }
  else{


    if (
      this.roles == 'admin' || 
      this.roles == 'compliance' || 
      this.roles == 'mainPLHead' 
    ) {
      filter.where = {"or":[{"researchAnalyst":this.whoaim.id },{"researchManagerId":{"ne":null}}],"and":[{"datasrc":{ neq: 'importOld'} }, {'or':Orwherearry}] };
    }
    else{
 //   filter.where = {"or":[{"researchAnalystId":id},{"researchMgrId":id},{"keyAccountManager":id}, {"subPnL":id}],"and":[{"eventAt":{"gte" :start}}] };
 //filter.where = {"or":[{ assigneeId: this.whoaim.id  },{"researchAnalyst":this.whoaim.id },{"researchManager":this.whoaim.id },{"keyAccountManager":this.whoaim.id },{"assigneeId":this.whoaim.id }, {"subPnL":this.whoaim.id }],"and":[{"datasrc":{ neq: 'importOld'} }] };
 //filter.where = {"or":[{"researchAnalyst":this.whoaim.id },{"researchManagerId":this.whoaim.id },{"keyAccMgrId":this.whoaim.id },{"assigneeId":this.whoaim.id }, {"subPnL":this.whoaim.id }],"and":[{"datasrc":{ neq: 'importOld'} }, {'or':Orwherearry}] };
 //   filter.where = {"or":[{"researchAnalystId":id},{"researchMgrId":id},{"keyAccountManager":id}, {"subPnL":id}],"and":[{"eventAt":{"gte" :start}}] };
 filter.where = {"or":[{"researchAnalyst":this.whoaim.id },{"researchManagerId":this.whoaim.id },{"keyAccMgrId":this.whoaim.id } ],"and":[{"status":this.status},{"datasrc":{ neq: 'importOld'} }, {'or':Orwherearry}] };
 
} 
}



   // filter.where ={'and':[{}]};

    //filter.where['and'] =[filtrval,{"datasrc":{ neq: 'importOld'} }] ;

    //filter.where={"datasrc":{ neq: 'importOld'} } ;


/*
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
*/








debugger

console.log('this.id ',this.type)

/*
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
*/

//filter.where = {"or":[{"researchAnalyst":this.whoaim.id },{"researchManagerId":this.whoaim.id }]};
//filter.where = {"or":[{"researchAnalyst":this.whoaim.id },{"researchManagerId":this.whoaim.id },{"keyAccMgrId":this.whoaim.id },{"assigneeId":this.whoaim.id }, {"subPnL":this.whoaim.id }],"and":[{"status":this.status}]};




    filters.set('filter', JSON.stringify(filter));
   
   // this.projectService.getAllMin(filters).subscribe(   getAll
    this.projectService.getAllMin(filters).subscribe(
      (projects: any) => {
      //  this.projectsData = projects;
      this.prjlst=[];
      this.dbsearch=[];
      this.indus=[];
      this.prjnames=[];
      this.expnames=[];

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
Client:this.getclientname(element.clientId),
  name: element.name,
  clientId:element.clientId,
  projectType: element.projectType,
  status: element.status,
  engagementType: element.engagementType,
  expectedNumEvent: element.expectedNumEvent,
  createdAt: element.createdAt,
  updatedAt: element.updatedAt,
  completedEventcount: element.completedEventcount,
  leadAttachedcount: element.leadAttachedcount,
  givenToAccMgrcount: element.givenToAccMgrcount,
  givenToClientcount: element.givenToClientcount,
  expertlist:element.expertslist?.toString()
}  )


if (!this.indus.includes( element.industry))
{
  this.indus.push(element.industry.toString());
}


if (element.expertslist)
{
this.expnames= this.expnames.concat(element.expertslist);
}


  this.prjnames.push(element.name);




}


console.log(this.expnames);

       this.totalcnt=projects.length;
       this.krExpertsList = projects;

       this.bindData() ;
        this.service.emps= this.prjlst;

        this.gridjsList$=this.service.countries$;
        if ( this.totalcnt>300)
        {
          this.service.pageSize= Number((this.totalcnt/10).toFixed(0))
        }
     
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


  getProjectsold() {  //getProjectsold() {
    this.client = JSON.parse(localStorage.getItem('client'));
    this.expert = JSON.parse(localStorage.getItem('expert'));
    this.isLoading = true;

    this.searchFor=this.dbsearch;



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
     filter.where ={};
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
   //   filtrval = { assigneeId: this.whoaim.id };
    }


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

//this.dbsearch

    if (this.dbsearch != null) {
      let dbsearch = this.dbsearch;
      if (filter.where) {
        filter.where = {
          and: [
            filter.where,
            {
              name: {
                like: dbsearch,
              },
            },
          ],
        };
      } else {
        filter.where = {
          name: {
            like: this.dbsearch,
          },
        };
      }
    }

    filters.set('filter', JSON.stringify(filter));
    this.projectService.getAll(filters).subscribe(
      (projects: any) => {

        this.prjlst=[];
        this.dbsearch=[];
        this.indus=[];
        this.prjnames=[];
        this.expnames=[];
  
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
  Client:this.getclientname(element.clientId),
    name: element.name,
    clientId:element.clientId,
    projectType: element.projectType,
    status: element.status,
    engagementType: element.engagementType,
    expectedNumEvent: element.expectedNumEvent,
    createdAt: element.createdAt,
    updatedAt: element.updatedAt,
    completedEventcount:  '',//  element.completedEventcount,
    leadAttachedcount:   '',//  element.leadAttachedcount,
    givenToAccMgrcount:   '',//  element.givenToAccMgrcount,
    givenToClientcount:   '',//  element.givenToClientcount,
    expertlist:   '',// element.expertslist?.toString()
  }  )
  
  
  if (!this.indus.includes( element.industry))
  {
    this.indus.push(element.industry?.toString());
  }
  
  
  if (element.expertslist)
  {
  this.expnames= this.expnames.concat(element.expertslist);
  }
    
    this.prjnames.push(element.name);
  
  
  }
  
  
  console.log(this.expnames);
  
         this.totalcnt=projects.length;
         this.krExpertsList = projects;
  
         this.bindData() ;
          this.service.emps= this.prjlst;
  
          this.gridjsList$=this.service.countries$;
          if ( this.totalcnt>300)
          {
            this.service.pageSize= Number((this.totalcnt/10).toFixed(0))
          }
       
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
  

        this.isLoading = false;
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
    
     let res = this.projectStatus?.find((x) => (x.id == project.status || x.name == project.status ));  //this.clientList?.find((x) => x.id == id);
    if (res)
    {
      
     project['status']=res?.text;
       project['statuscls']=res?.colorClass;

    }
    else{
     
    }
    
    });
  }
  
  getClientlist() {
    this.clientList =  this.clientsService.getclmindata();

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

  

  editemp(id: any,_id: any, content:any) {
   // this.submitted = false;

   console.log(id)
   console.log(_id)

if (id=='0' ||id==null ||id==undefined )
{
if (_id!=null ||_id==undefined )
{
  this.selectedid=_id;
}
else{
  this.selectedid='';
}
  
  
}
else{
   this.selectedid=id;
}





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



  newprj(id: any, content:any) {

    // this.submitted = false; 
   //const url = this._router.serializeUrl(
  // this._router.createUrlTree(['/callreports']));
   //window.open('#' + url, '_blank');
 
  // const urlTree: UrlTree = this.router.createUrlTree(['projectsall/create', '']);
  // this.router.navigateByUrl(urlTree,);
  //const url: string = this.router.serializeUrl(urlTree);
  //window.open(url, '_blank');
  this.selectedid='';
  this.modalService.open(content, { size: 'lg', centered: true });




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



