

import {employeeUser} from '../../../core/models/employee.model';
import {QueryList, ViewChildren} from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { UntypedFormBuilder,FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import {Expert} from '../../../core/models/expert.model';
import { GridJs } from './data';
import {expert} from './expert.model';
import { NgbdGridJsSortableHeader, SortEvent } from './expert-sortable.directive';
import { ExpertsTableService } from './expert.service';

import { ExpertComponent } from '../expert/expert.component';

import { CompanyTypeService } from '../../../core/services/company-type.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/kruser.service';
import { CompanyType, Users } from '../../../core/models/default.model';
import { DecimalPipe } from '@angular/common';
//import { ExpertsService } from '../../../core/services/experts.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Logger } from '../../../core/logger.service';

import { Observable } from 'rxjs';
//import { ExpertTableService } from '../expert.table.service';

import { DateToLocalPipe } from '../../../core/pipe';
import { ActivatedRoute } from '@angular/router';
import { SalesLeadContactService } from '../../../core/services/sales-lead-contact.service';
import { complianceActionsService } from '../../../core/services/complianceActions.service';

import { EmailService } from '../../../core/services/email.service';

import { EmailJsTemplates, EmailTitleDescription } from '../../../core/models/options';
const log = new Logger('Experts Assignment Component');




import {ExpertService} from '../../../core/services/expert.service';


@Component({
  selector: 'app-expertlist',
  templateUrl: './expertlist.component.html',
  styleUrls: ['./expertlist.component.scss'],
  providers: [ExpertsTableService, DecimalPipe]
})

/**
 * Starter Component
 */
export class ExpertlistComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  btnName: any;
emps:any[]=[];
dbsearch:any;
  // Table data
  gridjsList$: Observable<expert[]>;
  total$: Observable<number>;
  @ViewChildren(NgbdGridJsSortableHeader) headers: QueryList<NgbdGridJsSortableHeader>;
  isnewTab:boolean=false;

  // Table data
  tables$: Observable<any[]>;
 
  expertsData: Expert[]=[];
  usersArray: Users[]=[];
  companyType: CompanyType[]=[];
krroles: string[]=[];
  roles: string='';

  isLoading: boolean = false;
  searchFor: string='';
  searchBox: HTMLInputElement;
  listItm: HTMLSelectElement;
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

  allroles:any[];
  concount:number;
  reccount:number;
  ripcount:number;
qrycount:any='';
totcount:number;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private readonly userService: UserService,
    private readonly expertService: ExpertService,
    public service: ExpertsTableService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private salesLeadContactService: SalesLeadContactService,
    public companyTypeService: CompanyTypeService,
    public complianceService: complianceActionsService,
    private formBuilder: FormBuilder
  ) {
    this.tables$ = service.countries$;
    this.total$ = service.total$;
    this.whoiam = JSON.parse(localStorage.getItem('user'));
 //   this.service.tableDataInput = []; //Set data for table
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
     
    ];
    this.isLoading = true;
//console.log ( this.activatedRoute.snapshot.url[0].path);
this.whoiam = JSON.parse(localStorage.getItem('user'));
    this.roles = this.whoiam.roles[0];
    this.allroles = this.whoiam.roles;
   // this.roles = this.whoiam?.roles[0];
// this.krroles = this.whoiam?.roles;
this.createFilter();
//    this.roles = 'admin';
 //this.krroles = ['admin'];

    //this.searchFor = this.route.snapshot.paramMap.get('searchKey');
   
   // this.getClients();
    this._fetchData();
    this.getComapnyTypes();
    this.refreshed = true;
  }

  search()
  {
    this.getExperts();
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
      
  
    this.qrycount= '';
      
    this.isLoading=false;
  /*
    this.expertService.getCount(wheremp).subscribe((data) => {
      
    
      this.qrycount= data;
      
      this.isLoading=false;
      console.log( data);
    //  this.toasterService.success('POC Details updated successfully.', 'Success!');
     // this.getExperts(this.id);
    },
    (error: any) => {   this.isLoading = false;}
    
    
    );  */
  
  
  }

  /**
   * fetches the table value
   */
  async _fetchData() {



    var usrid = this.route.snapshot.params['id'];
    var status = this.route.snapshot.params['status'];



if (status)
{
 
  this.getfltrExperts(usrid,status);
}
else{
    this.getExperts();
}

    this.getAllContactPerson();   
    this.getcomplianceDetails();
  }




  private getfltrExperts(id:any, status:any) {

  
     this.totalcnt=0;
     this.qrycount='';
     this.isLoading = true;
     const filters = new Map();
     let filter = {
       where: {},
       skip:this.skipcnt,
       limit:2500
     };
  
  this.isWebSign=false;
  
  this.keyword="";
  
  debugger
  
   filter = {
     where: {      
     },
     skip:this.skipcnt,
   limit:2500
   };
 
  
   filter['where']['and'] = [];

  
    if (
      this.roles == 'admin' || 
      this.roles == 'compliance' || 
      this.roles == 'mainPLHead' || 
      this.roles == 'subPLHead'
    ) {
      filter.where  ={ };
    }
    else{
      filter['where']['and'].push({   krRelationshipMgrId: this.whoiam.id});
    }
  
  


     if (status) {
       if (!filter['where']['and']) {
    //     filter['where']['and'] = [];
       }
   
if (status=='Signed up')
{
       filter['where']['and'].push({ 'status': { like: 'Recruited', options: 'i' } },{'terms':true});
}
else if (status=='T&C pending')
{
       filter['where']['and'].push({ 'status': { like: 'Recruited', options: 'i' } },{'terms':false});
}
else{

  filter['where']['and'].push({ 'status': { like: status, options: 'i' } });

}
    
     
 }
  
 
  
  
  /*
     if (
       this.keyword ||
       (filter && filter['where'] && (filter['where']['and']?.length || filter['where']['or']?.length))
     ) {
       filter['order'] = 'updatedAt desc';
      

       if (this.allroles.includes('StrategicTeamManager') && this.activatedRoute.snapshot.url[0].path=='signups'   ){
   

        filter['where']['and'].push({ terms: true});
        
       }
*/
       filters.set('filter', JSON.stringify(filter));



       this.expertService.getAll(filters).subscribe(
         (experts: any) => {
          debugger
           this.totalcnt=experts.length;
           this.krExpertsList = experts;


           this.service.emps=experts;

           this.gridjsList$=this.service.countries$;
   
if ( this.totalcnt>300)
{
  this.service.pageSize=this.totalcnt/10;

}


           // this.service.tableDataInput = experts;
          //  this.service.tableDataInput = this.krExpertsList;
           this.isLoading = false;
         // this.getExpertCount() ;
  
         },
         (error: any) => {   this.isLoading = false;}
       );
     
  
     let cntfilter = {
      where: {}
     
    };
  
    cntfilter.where=filter.where;
  
    const cntfilters = new Map();
  
    cntfilters.set('filter', JSON.stringify(cntfilter));
  
  /*
     this.expertService.getCount(cntfilters).subscribe(
      (data: any) => {
        this.qrycount= data;
    
      console.log ( this.qrycount)
      },
      (error: any) => {}
    );
  */
  
  /*
     const wheremp = new Map();
     wheremp.set('where', JSON.stringify(filter));
      
  
  
     this.expertService.getCount(wheremp).subscribe((data) => {
       this.qrycount= data["count"];
       console.log('this.qrycount', data);
     //  this.toasterService.success('POC Details updated successfully.', 'Success!');
      // this.getExperts(this.id);
     });
  */
  
   }
   




  private getExperts() {

  
     this.totalcnt=0;
     this.qrycount='';
     this.isLoading = true;
     const filters = new Map();
     let filter = {
       where: {},
       skip:this.skipcnt,
       limit:2500
     };
  
  this.isWebSign=false;
  
  this.keyword="";
  
  var words= this.keyword.split(',');

  console.log(words)
  var srchlst=[];

  
  filter['where']['and'] = [];
  
  
  
  if (
    this.roles == 'admin' || 
    this.roles == 'compliance' || 
    this.roles == 'mainPLHead' || 
    this.roles == 'subPLHead'
  ) {
    filter.where  ={ };
  }
  else{

   filter['where']['and'].push({   krRelationshipMgrId: this.whoiam.id});
  }

 

   /*
   if (this.leadFormGrp.value.lname) {
  
    if (!filter['where']['and']) {
      filter['where']['and'] = [];
    }
   // filter['where']['or'].push({ firstName:  this.leadFormGrp.value.name });
    filter['where']['and'].push({ lastName:  this.leadFormGrp.value.lname});
   
    
  }
  
  }
  else{
  
  
     if (this.leadFormGrp.value.fname) {
       if (!filter['where']['and']) {
         filter['where']['and'] = [];
       }
       filter['where']['and'].push({ firstName: { like: this.leadFormGrp.value.fname, options: 'i' } });
   //    filter['where']['or'].push({ lastName: { like: this.leadFormGrp.value.name, options: 'i' } });
      
     }
  
  
     if (this.leadFormGrp.value.lname) {
      if (!filter['where']['and']) {
        filter['where']['and'] = [];
      }
    //  filter['where']['or'].push({ firstName: { like: this.leadFormGrp.value.name, options: 'i' } });
      filter['where']['and'].push({ lastName: { like: this.leadFormGrp.value.lname, options: 'i' } });
    
    }
  
  
  
   }
  
  
   
   if ((this.Company)&&(this.Company!='')  ){
       if (!filter['where']['and']) {
         filter['where']['and'] = [];
       }
       filter['where']['and'].push({ "workingDetails.companyName": { like: this.Company, options: 'i' } });
     }
  
  
  
     if (this.leadFormGrp.value.designation) {
       if (!filter['where']['and']) {
         filter['where']['and'] = [];
       }
       filter['where']['and'].push({ designation: { like: this.leadFormGrp.value.designation, options: 'i' } });
     }
  
     
     // if (this.leadFormGrp.value.companyName) {
     //   if (!filter['where']['and']) {
     //     filter['where']['and'] = [];
     //   }
     //   filter['where']['and'].push({ workingDetails["companyName"]: { like: this.leadFormGrp.value.companyName} });
     // }
  
     if (this.leadFormGrp.value.country) {
       if (!filter['where']['and']) {
         filter['where']['and'] = [];
       }
       filter['where']['and'].push({ country: { like: this.leadFormGrp.value.country, options: 'i' } });
     }
     if (this.leadFormGrp.value.industry) {
       if (!filter['where']['and']) {
         filter['where']['and'] = [];
       }
       filter['where']['and'].push({ industry: { like: this.leadFormGrp.value.industry, options: 'i' } });
     }
     if (this.leadFormGrp.value.sourceType) {
       if (!filter['where']['and']) {
         filter['where']['and'] = [];
       }
  
  
       console.log(this.leadFormGrp.value.sourceType);
  
       if (this.leadFormGrp.value.sourceType=="Web Signup")
       {
       
         this.isWebSign=true;
       }
  
       filter['where']['and'].push({ sourceType: { like: this.leadFormGrp.value.sourceType, options: 'i' } });
     }
     if (this.leadFormGrp.value.status) {
       if (!filter['where']['and']) {
         filter['where']['and'] = [];
       }
  
  
       filter['where']['and'].push({ status: { like: this.leadFormGrp.value.status, options: 'i' } });
     }
  
     if (filter['where']['and']==undefined) {
      filter['where']['and'] = [];
      filter['where']['and'].push({ "_id": { ne: null} });
     // filter['where']['and'].push( {datasrc:{ ne:'importPurExpertnew'}});
    }
    else{
     // filter['where']['and'].push( {datasrc:{ ne:'importPurExpertnew'}});
  
    }
  */
    // filter['where']['and'].push({ status: { neq: 'Deleted'} });
  
    //filter['where']['and'].push({ status: 'Tocheck'});
  
     if (filter) {

       filter['order'] = 'updatedAt desc';
      
   //this.allroles.includes('StrategicTeamManager') && 
       if (this.activatedRoute.snapshot.url[0].path=='signups'   ){
   

        filter['where']['and']=[{ terms: true}];
        
       }





       filters.set('filter', JSON.stringify(filter));



       this.expertService.getAll(filters).subscribe(
         (experts: any) => {
  
           this.totalcnt=experts.length;
           this.krExpertsList = experts;


           this.service.emps=experts;

           this.gridjsList$=this.service.countries$;
   
           if ( this.totalcnt>300)
           {
             this.service.pageSize= Number((this.totalcnt/10).toFixed(0))
           }


           // this.service.tableDataInput = experts;
          //  this.service.tableDataInput = this.krExpertsList;
           this.isLoading = false;
         // this.getExpertCount() ;
  
         },
         (error: any) => {   this.isLoading = false;}
       );
     }
  
     let cntfilter = {
      where: {}
     
    };
  
    cntfilter.where=filter.where;
  
    const cntfilters = new Map();
  
    cntfilters.set('filter', JSON.stringify(cntfilter));
  
  /*
     this.expertService.getCount(cntfilters).subscribe(
      (data: any) => {
        this.qrycount= data;
    
      console.log ( this.qrycount)
      },
      (error: any) => {}
    );
  */
  
  /*
     const wheremp = new Map();
     wheremp.set('where', JSON.stringify(filter));
      
  
  
     this.expertService.getCount(wheremp).subscribe((data) => {
       this.qrycount= data["count"];
       console.log('this.qrycount', data);
     //  this.toasterService.success('POC Details updated successfully.', 'Success!');
      // this.getExperts(this.id);
     });
  */
  
   }
  



   public showExperts() {

    this.searchFor = this.service.searchTerm;
    console.log( this.searchFor )
    this.getExperts();
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
     this.getExperts() ;
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
        var userData = JSON.parse(window.localStorage.getItem('user'));
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



if (this.isnewTab)
{
  //const url = this._router.serializeUrl(
 // this._router.createUrlTree(['/callreports']));
  //window.open('#' + url, '_blank');

  const urlTree: UrlTree = this.router.createUrlTree(['expert/expert-view', id]);
 // this.router.navigateByUrl(urlTree,);
 const url: string = this.router.serializeUrl(urlTree);
 window.open(url, '_blank');

  }
  else{
  


    this.modalService.open(content, { size: 'lg', centered: true });
  }


   // this.modalService.open(content, { size: 'lg', centered: true });
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
      this.whoiam = JSON.parse(localStorage.getItem('user'));
      this.roles = this.whoiam?.roles[0];

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

  private getExperts1() {
    const filters = new Map();
    const filter = {
      // where: { or : []},
      where: {},
      order: 'updatedAt DESC',
    };
//krroles  this.krroles.includes('compliance')
    if (this.krroles.includes('mainPLHead')) {
      filter.where = { plheadId: this.whoiam.id };
    }

    if (this.krroles.includes('subPLHead')) {
      filter.where = {or :[{ subPnlHeadId: this.whoiam.id },{ additionalSubPnls: this.whoiam.id } ]};
    }


    if (this.krroles.includes('admin') ||this.krroles.includes('compliance')) {
      // filter.where = {};
    }

   /* */ if (
      !this.krroles.includes('admin') &&
!this.krroles.includes('client') &&
!this.krroles.includes('mainPLHead') &&
!this.krroles.includes('subPLHead') &&
!this.krroles.includes('keyAccountManager') &&
!this.krroles.includes('compliance') 


    ) {
      filter.where = { assigneeId: this.whoiam.id };
    }

    if (this.roles === 'client') {
      filter.where = { 'clientUser.userId': this.whoiam.id };
    }
/*
 if (this.roles === 'mainPLHead') {
      filter.where = { plheadId: this.whoiam.id };
    }

    if (this.roles === 'subPLHead') {
      filter.where = { subPnlHeadId: this.whoiam.id };
    }
    if (this.roles === 'keyAccountManager') {
      filter.where = { accountManagerId: this.whoaim.id };
    }
    if (this.roles === 'admin' || this.roles === 'compliance') {
      // filter.where = {};
    }
    if (
      this.roles != 'admin' &&
      this.roles != 'client' &&
      this.roles != 'mainPLHead' &&
      this.roles != 'subPLHead' &&
      this.roles != 'keyAccountManager' &&
      this.roles != 'compliance'
    ) {
      filter.where = { assigneeId: this.whoaim.id };
    }
    if (this.roles === 'client') {
      filter.where = { 'clientUser.userId': this.whoaim.id };
    }


*/

if (this.krroles.includes('keyAccountManager')) {
  filter.where = { or : [{ accountManagerId: this.whoiam.id },{keyaccmanagers:this.whoiam.id},{ assigneeId: this.whoiam.id }]}

}
else
{
  filter.where = { or : [filter.where,{ assigneeId: this.whoiam.id }]}

}




if (this.krroles.includes('admin') ||this.krroles.includes('compliance')) {
   filter.where = {};
}
filter.where = {}; //gs
    filters.set('filter', JSON.stringify(filter));

    console.log('filter',filters);

    this.expertService.getAll(filters).subscribe(
      (data) => {

        console.log('dsts',data);

        this.expertData = data;


        this.service.emps=data;

        this.gridjsList$=this.service.countries$;

/*
        if (this.krroles.includes('mainPLHead')) {
          let data = this.expertData.filter(
            (x) =>
              x.accountManagerId != '' &&
              x.accountManagerId != undefined &&
              x.subPnlHeadId != null &&
              x.subPnlHeadId != undefined
          );


          this.expertData = data;
        }
*/

        /* gs condition removed on request from Amit
        if (this.krroles.includes('subPLHead')) {
          let data = this.clientData.filter(
            (x) => x.accountManagerId != '' && x.accountManagerId != undefined && x.accountManagerId != null
          );
          this.clientData = data;
        }  */
       // this.service.tableDataInput = this.clientData; //Set data for table
        this.isLoading = false;
        // if (this.searchFor) {
        //   this.searchBox = <HTMLInputElement>document.getElementById('globelSearch');
        //   this.searchBox.value = this.searchFor;

        //   this.listItm = <HTMLSelectElement>document.getElementById('Searchbucket');
        //   this.listItm.options['3'].selected = true;
        // }
      },
      (error: string) => {
        log.error('experts:', error);
        this.isLoading = false;
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



