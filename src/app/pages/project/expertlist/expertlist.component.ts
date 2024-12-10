
import { ToastService } from '../../toast-service';   
import {employeeUser} from '../../../core/models/employee.model';
import {QueryList, ViewChildren} from '@angular/core';

import { Router, UrlTree } from '@angular/router';

import { UntypedFormBuilder,FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import {Expert} from '../../../core/models/expert.model';
import { GridJs } from './data';
import {expert} from './expert.model';
import { NgbdGridJsexSortableHeader, exSortEvent } from './expert-sortable.directive';
import { ExpertsTableService } from './expert.service';
import { ProjectService } from '../../../core/services/project.service';

//import { ExpertComponent } from '../expert/expert.component';

import { CompanyTypeService } from '../../../core/services/company-type.service';
import { Component, Input,OnInit } from '@angular/core';
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
import { Buffer } from 'buffer';

import { Project } from '../../../core/models/project.model';

import {ExpertService} from '../../../core/services/expert.service';
import {CommonService} from '../../../core/services/common.service';
import { getValidRangeSize } from '@microsoft/microsoft-graph-client';

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

  // Table data
  gridjsList$: Observable<expert[]>;
  total$: Observable<number>;
  @ViewChildren(NgbdGridJsexSortableHeader) headers: QueryList<NgbdGridJsexSortableHeader>;

  @Input() itemid: string='';
  @Input() readonly: boolean=true;
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
  searchBox: HTMLInputElement;
  listItm: HTMLSelectElement;
  contactPerson: any[] = [];
  expertData: Expert[]=[];
  idforCompliance: string='';

  dbsearch:any;
  krExpertsList: any[];

  resindustry: any[];
  rescompanies: any[];
  resnames: any[];
  rescountry: any[];

  resindustry1: string='';
  rescompanies1: string='';
  resnames1: string='';
rescountry1:string='';


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


id: string;
projectDetails: Project;
projectDetailsForUpdate: Project = {};
tempArray: any[];
expertslist:any[];
isWebSign:boolean;
allEmployee: employeeUser[];

empList: employeeUser[];
disableChecked: number;
expert: Expert;
localstorageEmp: any;
reportingMgrEmail: employeeUser;
currentUser: employeeUser;
emailToSend: any[];
arrOfEMpIds: any[];

sectors: { id: number; text: string }[];
industryGroup: any[];
industry: any[];
industryList: any[];
subindustry: any[];
subIndustry: any[];


showBtn: boolean;
check:boolean;

selectedprofiles:string[];




  constructor(
    private readonly userService: UserService,
    private readonly expertService: ExpertService,
      private readonly commonService: CommonService,
    public service: ExpertsTableService,
    private toasterService: ToastService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    private salesLeadContactService: SalesLeadContactService,
    public companyTypeService: CompanyTypeService,
    public complianceService: complianceActionsService,
  public projectService: ProjectService,
  public emailService: EmailService,
    private formBuilder: FormBuilder
  ) {
    this.tables$ = service.countries$;
    this.total$ = service.total$;

 //   this.service.tableDataInput = []; //Set data for table
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Experts', path: 'experts', redirectTo: '/experts' },
      { label: 'Assignments', active: true },
    ];
    debugger

    this.whoaim = JSON.parse(localStorage.getItem('user'));
    this.empList = JSON.parse(window.localStorage.getItem('emp'));
 
   // this.roles = this.whoaim?.roles[0];
// this.krroles = this.whoaim?.roles;
this.createFilter();
    this.roles = 'admin';
 this.krroles = ['admin'];

console.log( this.whoaim );

  //  this.fetchData();
    //this.getExperts();

    this.id = this.itemid;
    if (this.id) {
      this.getProject();
    }
    let reportingMgr = this.empList?.find((x) => x.userId == this.whoaim?.id);
    //get email id of reporting manager
    this.reportingMgrEmail = this.empList?.find((x) => x.repotingManagerId == reportingMgr?.repotingManagerId);
    this.currentUser = this.empList?.find((x) => x.userId == this.whoaim?.id);
    this.emailToSend = [];
    if (this.reportingMgrEmail?.email) {
      this.emailToSend.push(this.reportingMgrEmail?.email);
    }


    //this.searchFor = this.route.snapshot.paramMap.get('searchKey');
   
   // this.getClients();
    this._fetchData();
    this.getComapnyTypes();
   // this.refreshed = true;
  }


  getProject() {
    this.projectService.show(this.id).subscribe(
      (project) => {
        this.projectDetails = project;
        if (this.krExpertsList) {
          if (!this.projectDetails?.leadAttached) {
            this.projectDetails.leadAttached = [];
          } else {
            this.krExpertsList.forEach((x) => (x.alreadyAttached = this.isExpertAlreadyAttached(x.userId)));
          }
        }
        this.arrOfEMpIds = [];
        this.arrOfEMpIds.concat(this.projectDetails?.researchManagerId);
        this.arrOfEMpIds.push(this.projectDetails?.keyAccMgrId);
        let selectedEmailPeople = this.empList?.filter((e) => this.arrOfEMpIds.indexOf(e.id) != -1);
        this.emailToSend = selectedEmailPeople?.map((a) => a.email);
      },
      (error: any) => {
        this.isLoading = false;
      }
    );
  }





  isExpertAlreadyAttached(id) {
    if (this.projectDetails?.leadAttached?.length) {
      return this.projectDetails.leadAttached.filter((a) => a.id == id).length > 0 ? true : false;
    }
    return false;
  }
  getKrRelationshipId(name) {
    return this.empList.find((x) => x.name == name).userId;
  }

  /*
  fetchData() {
    this.sectors = sectors;
    this.industryGroup = industryGroup;
    this.industry = industry;
    this.subindustry = subindustry;
    this.status = options.status;
    this.sourceType = expertLeadSourceArray;
  }
*/

showAS:boolean=false;

toggleAS()
{


  this.showAS = !this.showAS;
}

  search()
  {
    this.getExperts(false);
  }

  fnlsearch()
  {
    this.getExperts(true);
  }


  wherearry:any[];
//  isWebSign:boolean;
  
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
  
  /*
   if (this.roles != 'admin' && this.roles != 'mainPLHead') {
    if (!filter['where']['and']) filter['where']['and'] = [];
    this.wherearry.push({
      krRelationshipMgrId: this.whoaim?.id,
    });
  }
  */
  
  /*
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
   */
  
   // this.wherearry.push({ status: { neq: 'Deleted'} });
  
   var Andwherearry:any[]=[]

   var Orwherearry:any[]=[]


    var wrd=this.dbsearch;

 if (wrd!='')
{


var andres=wrd.split(',')

if (andres!=null &&  andres.length>1)
{
  andres.forEach(element => {


var encword= Buffer.from(wrd.toString()).toString('base64')

      Andwherearry.push({ contactNo: { like: encword, options: 'i' } });

   Andwherearry.push({ primaryEmail: { like: encword, options: 'i' } });

   Andwherearry.push({ alternatePhone: { like: encword, options: 'i' } });

   Andwherearry.push({ alternateEmail: { like: encword, options: 'i' } });

   Andwherearry.push({ firstName: { like: wrd, options: 'i' } });

    Andwherearry.push({ lastName: { like: wrd, options: 'i' } });
   
    Andwherearry.push({ "workingDetails.companyName": { like: wrd, options: 'i' } });
  
      Andwherearry.push({ designation: { like: wrd, options: 'i' } });
       
      Andwherearry.push({ country: { like: wrd, options: 'i' } });
    
      Andwherearry.push({ industry: { like: wrd, options: 'i' } });
     
      Andwherearry.push({ sourceType: { like: wrd, options: 'i' } });
     
      Andwherearry.push({ status: { like: wrd, options: 'i' } });
      Andwherearry.push({ biography: { like: wrd, options: 'i' } });

  })

}


}



/*
var where={'or':[Andwherearry]}



    const wheremp = new Map();
      
    wheremp.set('where', JSON.stringify(where));

    */
      
    filter = {
      where: {
        or: srchlst ,
      },
      skip:this.skipcnt,
    limit:250
    };
    const wheremp = new Map();
    wheremp.set('where', JSON.stringify(filter));


   // wheremp.set('where', JSON.stringify(this.wherearry));
   
  
    this.expertService.getFilters(wheremp).subscribe((data) => {
      
    
this.qrycount= data['name'];      
this.resnames=data['nameArray'];
this.rescompanies=data['companyArray'];
this.resindustry=data['industryArray'];
this.rescountry1=data['countryArray'];




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
   _fetchData() {
   // this.getAllContactPerson();
   // this.getExperts();
   // this.getcomplianceDetails();
  }

  attachExpert(id:any) {
    let newFound = false;
    this.isLoading =true;

    this.expertService.show(id).subscribe(
      (experts: Expert) => {
        console.log(experts)  

debugger
   
console.log(this.projectDetails)

        let alreadyExist = this.projectDetails?.leadAttached?.find((x) => x.id == id);
        if (!alreadyExist) {
          debugger


 // this.whoaim = JSON.parse(localStorage.getItem('user'));



          experts['attachedBy'] = this.whoaim.id;



        // experts['attachedBy'] = experts['krRelationshipMgrId'] ;

      
         experts['attachedDate'] = new Date();// dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");;
        

          if (!this.projectDetails?.leadAttached) this.projectDetails.leadAttached = [];
          this.projectDetails?.leadAttached.push(experts);
          newFound = true;
          if (this.projectDetails?.researchAnalyst?.indexOf(experts?.krRelationshipMgrId) == -1) {
            this.projectDetails?.researchAnalyst?.push(experts?.krRelationshipMgrId);
          }
          let ra = this.empList?.find((a) => a.userId == experts?.krRelationshipMgrId);
if (ra)
{
          if (this.projectDetails?.researchManagerId?.indexOf(ra['repotingManagerId']) == -1) {
            this.projectDetails?.researchManagerId?.push(ra['repotingManagerId']);
          }
        }

        } else {
          this.expert = experts;
        //  this.disableChecked = index;
        }
     
    if (!newFound) {
      this.toasterService.warning('Please Select Profile', 'Error!');
      this.isLoading =false;
      return;
    }

    this.projectDetailsForUpdate.leadAttached = this.projectDetails?.leadAttached;
    this.projectDetailsForUpdate.researchAnalyst = this.projectDetails?.researchAnalyst;
    this.projectDetailsForUpdate.researchManagerId = this.projectDetails?.researchManagerId;
    this.projectService.updateOnly(this.id, this.projectDetailsForUpdate).subscribe((res) => {
    





try
{

  var jsn={"Expid":experts.id,
  "ExpUserId":experts.id,
  "pocUserId":this.whoaim.id,
  "projId":this.id,
  "addedDate":new Date()
  }
  
  

this.commonService.postpocdata(jsn)
  
}
catch(err)
{

}




this.isLoading =false;

      this.toasterService.success('Expert attached successfully', 'Success!');
      let emailVariableObj = {
        notificationType: 'skipEmail',
      };
      this.emailService.sendEmail(EmailJsTemplates.project, this.emailToSend, 'Informative', emailVariableObj);
    });


  },
  (error: any) => {
    this.isLoading =false;
console.log(error)

  }
);



  }


  attachExpert2(id:any) {
    let newFound = false;


    this.expertService.show(id).subscribe(
      (experts: Expert) => {
        console.log(experts)  

debugger
   let newexpert={};
console.log(this.projectDetails)

        let alreadyExist = this.projectDetails?.leadAttached?.find((x) => x.id == id);
        if (!alreadyExist) {
          debugger


 // this.whoaim = JSON.parse(localStorage.getItem('user'));



          experts['attachedBy'] = this.whoaim.id;



        // experts['attachedBy'] = experts['krRelationshipMgrId'] ;

      
         experts['attachedDate'] = new Date().toDateString();// dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");;
        
         newexpert['id']=  experts['_id'];
         newexpert['userId']=   experts['userId'] ;
         newexpert['attachedDate']=   experts['attachedDate'] ;

         newexpert['firstName']=   experts["firstName"]  ;
         newexpert['lastName']=   experts["lastName"] ;
         newexpert['phoneCode']=   experts["phoneCode"] ;
         newexpert['contactNo']=  experts["contactNo"]  ;
         newexpert['primaryEmail']=  experts["primaryEmail"]  ;
         newexpert['status']=  experts["status"] ;
         newexpert['currentEmployer']=  experts["currentEmployer"]  ;
         newexpert['designation']=  experts["designation"]  ;
         newexpert['country']=  experts["country"] ;
         newexpert['attachedBy'] = this.whoaim.id;

         newexpert['attachedDate'] = new Date().toDateString();// dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");;
        


          if (!this.projectDetails?.leadAttached) this.projectDetails.leadAttached = [];
          this.projectDetails?.leadAttached.push(newexpert);
          newFound = true;
          if (this.projectDetails?.researchAnalyst?.indexOf(experts?.krRelationshipMgrId) == -1) {
            this.projectDetails?.researchAnalyst?.push(experts?.krRelationshipMgrId);
          }
          let ra = this.empList?.find((a) => a.userId == experts?.krRelationshipMgrId);
          if (this.projectDetails?.researchManagerId?.indexOf(ra['repotingManagerId']) == -1) {
            this.projectDetails?.researchManagerId?.push(ra['repotingManagerId']);
          }
        } else {
          this.expert = experts;
        //  this.disableChecked = index;
        }
     
    if (!newFound) {
      this.toasterService.warning('Please Select Profile', 'Error!');
      return;
    }

    this.projectDetailsForUpdate.leadAttached = this.projectDetails?.leadAttached;
    this.projectDetailsForUpdate.researchAnalyst = this.projectDetails?.researchAnalyst;
    this.projectDetailsForUpdate.researchManagerId = this.projectDetails?.researchManagerId;
    this.projectService.updateOnly(this.id, this.projectDetailsForUpdate).subscribe((res) => {
      this.isLoading = false;
      this.toasterService.success('Expert attached successfully', 'Success!');
      let emailVariableObj = {
        notificationType: 'skipEmail',
      };
      this.emailService.sendEmail(EmailJsTemplates.project, this.emailToSend, 'Informative', emailVariableObj);
    });


  },
  (error: any) => {

console.log(error)

  }
);



  }





  attachExpertxx(id:any) {
    let newFound = false;


    for (let index = 0; index < this.krExpertsList?.length; index++) {
      if ( this.selectedprofiles.includes(this.krExpertsList[index].userId)) {
        let alreadyExist = this.projectDetails?.leadAttached?.find((x) => x.id == this.krExpertsList[index].id);
        if (!alreadyExist) {
          
//

         this.krExpertsList[index]['attachedBy'] = this.krExpertsList[index]['krRelationshipMgrId'] ;
        // this.krExpertsList[index]['attachedBy'] = this.whoaim?.id;
 
          if (!this.projectDetails?.leadAttached) this.projectDetails.leadAttached = [];
          this.projectDetails?.leadAttached.push(this.krExpertsList[index]);
          newFound = true;
          if (this.projectDetails?.researchAnalyst?.indexOf(this.krExpertsList[index]?.krRelationshipMgrId) == -1) {
            this.projectDetails?.researchAnalyst?.push(this.krExpertsList[index]?.krRelationshipMgrId);
          }
          let ra = this.empList?.find((a) => a.userId == this.krExpertsList[index]?.krRelationshipMgrId);
          if (this.projectDetails?.researchManagerId?.indexOf(ra['repotingManagerId']) == -1) {
            this.projectDetails?.researchManagerId?.push(ra['repotingManagerId']);
          }
        } else {
          this.expert = this.krExpertsList[index];
          this.disableChecked = index;
        }
      }
    }
    if (!newFound) {
      this.toasterService.warning('Please Select Profile', 'Error!');
      return;
    }


    this.projectDetailsForUpdate.leadAttached = this.projectDetails?.leadAttached;
    this.projectDetailsForUpdate.researchAnalyst = this.projectDetails?.researchAnalyst;
    this.projectDetailsForUpdate.researchManagerId = this.projectDetails?.researchManagerId;
   
    console.log(' lead attach',  this.projectDetailsForUpdate)
   
    this.projectService.updateOnly(this.id, this.projectDetailsForUpdate).subscribe((res) => {
      this.isLoading = false;
      this.toasterService.success('Expert attached successfully', 'Success!');
      let emailVariableObj = {
        notificationType: 'skipEmail',
      };
      this.emailService.sendEmail(EmailJsTemplates.project, this.emailToSend, 'Informative', emailVariableObj);
    });
  }





  attachExpert2022Oct3() {
    let newFound = false;


    for (let index = 0; index < this.krExpertsList?.length; index++) {
      if ( this.selectedprofiles.includes(this.krExpertsList[index].userId)) {
        let alreadyExist = this.projectDetails?.leadAttached?.find((x) => x.id == this.krExpertsList[index].id);
        if (!alreadyExist) {
          debugger
          this.krExpertsList[index]['attachedBy'] = this.whoaim?.id;
          if (!this.projectDetails?.leadAttached) this.projectDetails.leadAttached = [];
          this.projectDetails?.leadAttached.push(this.krExpertsList[index]);
          newFound = true;
          if (this.projectDetails?.researchAnalyst?.indexOf(this.krExpertsList[index]?.krRelationshipMgrId) == -1) {
            this.projectDetails?.researchAnalyst?.push(this.krExpertsList[index]?.krRelationshipMgrId);
          }
          let ra = this.empList?.find((a) => a.userId == this.krExpertsList[index]?.krRelationshipMgrId);
          if (this.projectDetails?.researchManagerId?.indexOf(ra['repotingManagerId']) == -1) {
            this.projectDetails?.researchManagerId?.push(ra['repotingManagerId']);
          }
        } else {
          this.expert = this.krExpertsList[index];
          this.disableChecked = index;
        }
      }
    }
    if (!newFound) {
      this.toasterService.warning('Please Select Profile', 'Error!');
      return;
    }

    this.projectDetailsForUpdate.leadAttached = this.projectDetails?.leadAttached;
    this.projectDetailsForUpdate.researchAnalyst = this.projectDetails?.researchAnalyst;
    this.projectDetailsForUpdate.researchManagerId = this.projectDetails?.researchManagerId;
    this.projectService.updateOnly(this.id, this.projectDetailsForUpdate).subscribe((res) => {
      this.isLoading = false;
      this.toasterService.success('Expert attached successfully', 'Success!');
      let emailVariableObj = {
        notificationType: 'skipEmail',
      };
      this.emailService.sendEmail(EmailJsTemplates.project, this.emailToSend, 'Informative', emailVariableObj);
    });
  }


  attachExpert1() {
    let newFound = false;


    for (let index = 0; index < this.krExpertsList?.length; index++) {
      if (this.krExpertsList[index].checked) {
        let alreadyExist = this.projectDetails?.leadAttached?.find((x) => x.id == this.krExpertsList[index].id);
        if (!alreadyExist) {
          debugger
          this.krExpertsList[index]['attachedBy'] = this.whoaim?.id;
          if (!this.projectDetails?.leadAttached) this.projectDetails.leadAttached = [];
          this.projectDetails?.leadAttached.push(this.krExpertsList[index]);
          newFound = true;
          if (this.projectDetails?.researchAnalyst?.indexOf(this.krExpertsList[index]?.krRelationshipMgrId) == -1) {
            this.projectDetails?.researchAnalyst?.push(this.krExpertsList[index]?.krRelationshipMgrId);
          }
          let ra = this.empList?.find((a) => a.userId == this.krExpertsList[index]?.krRelationshipMgrId);
          if (this.projectDetails?.researchManagerId?.indexOf(ra['repotingManagerId']) == -1) {
            this.projectDetails?.researchManagerId?.push(ra['repotingManagerId']);
          }
        } else {
          this.expert = this.krExpertsList[index];
          this.disableChecked = index;
        }
      }
    }
    if (!newFound) {
      this.toasterService.warning('Please Select Profile', 'Error!');
      return;
    }

    this.projectDetailsForUpdate.leadAttached = this.projectDetails?.leadAttached;
    this.projectDetailsForUpdate.researchAnalyst = this.projectDetails?.researchAnalyst;
    this.projectDetailsForUpdate.researchManagerId = this.projectDetails?.researchManagerId;
    this.projectService.updateOnly(this.id, this.projectDetailsForUpdate).subscribe((res) => {
      this.isLoading = false;
      this.toasterService.success('Expert attached successfully', 'Success!');
      let emailVariableObj = {
        notificationType: 'skipEmail',
      };
      this.emailService.sendEmail(EmailJsTemplates.project, this.emailToSend, 'Informative', emailVariableObj);
    });
  }




  
  trackById(index, expert) {
    return expert.id;
  }




  private getExperts(isFinal:boolean) {

    this.isLoading = true;
    this.totalcnt=0
    this.krExpertsList = [];


    this.service.emps=[];

    this.gridjsList$=this.service.countries$;

/* */


if (!this.dbsearch)
{
//return ;

}
this.isLoading=true;
 
     this.totalcnt=0;
     this.qrycount='';


     this.isLoading = true;
     const filters = new Map();
     let filter = {
       where: {},
       skip:this.skipcnt,
       limit:1000
     };
  
  this.isWebSign=false;
  
  this.keyword="";
  
  // var words= this.dbsearch.split(',');
  var words = this.dbsearch.split(',').flatMap(entry => entry.split(' ').filter(Boolean));
  console.log(words)
  var srchlst=[];
  if (words.length>1)
  {
  
  
   words.forEach(element => {
  
     srchlst.push(
     {
       industry: {
         like: element,
         options: 'i',
       },
     })
     srchlst.push(
       {
         subindustry: {
           like: element,
           options: 'i',
         },
       }
       
       )
       srchlst.push(
         
     {
       sourceType: {
         like: element,
         options: 'i',
       },
     }
         
         )
         srchlst.push(
           {
             sector: {
               like: element,
               options: 'i',
             },
           } 
           )
    
           srchlst.push(
             {
               keyword: {
                 like: element,
                 options: 'i',
               },
             }
             )
      
             srchlst.push(
               {
                 biography: {
                   like: element,
                   options: 'i',
                 },
               }
               )
               srchlst.push(
                 {
                   notes: {
                     like: element,
                     options: 'i',
                   },
                 }
                 )
   
               
   
   var encword= Buffer.from(element.toString()).toString('base64')
   
   srchlst.push({ contactNo: { like: encword, options: 'i' } });
   
   srchlst.push({ primaryEmail: { like: encword, options: 'i' } });
   
   srchlst.push({ alternatePhone: { like: encword, options: 'i' } });
   
   srchlst.push({ alternateEmail: { like: encword, options: 'i' } });
   
   srchlst.push({ firstName: { like: element, options: 'i' } });
   
   srchlst.push({ lastName: { like: element, options: 'i' } });
      
   srchlst.push({ "workingDetails.companyName": { like: element, options: 'i' } });
     
   srchlst.push({ designation: { like: element, options: 'i' } });
          
   srchlst.push({ country: { like: element, options: 'i' } });
       
   srchlst.push({ industry: { like: element, options: 'i' } });
        
   srchlst.push({ sourceType: { like: element, options: 'i' } });
        
   srchlst.push({ status: { like: element, options: 'i' } });
   srchlst.push({ biography: { like: element, options: 'i' } });
   
        




/*

   if (this.resnames1!='')
   {
   
     var wrd=this.resnames1?.trim();
   
     if (wrd!='')
    {
    
    
    var andres=wrd.split(' ')
    
    
   if (!filter['where']['and']) {
    filter['where']['and'] = [];
  }
   
    filter['where']['and'].push({ firstName: { like: andres[0], options: 'i' } });
    
   
      filter['where']['and'].push({ lastName: { like: andres[1], options: 'i' } });
   
   
   }
   }
      
   
   if (this.resindustry1?.trim() !='')
   {

   if (!filter['where']['and']) {
    filter['where']['and'] = [];
  }
    filter['where']['and'].push({ industry: { like: this.resindustry1, options: 'i' } });
   }
   
   if (this.rescompanies1?.trim()!='')
   {

   if (!filter['where']['and']) {
    filter['where']['and'] = [];
  }
    filter['where']['and'].push({ "workingDetails.companyName": { like: this.rescompanies1, options: 'i' } });
   }  
      if (this.rescountry1?.trim()!='')
   {

   if (!filter['where']['and']) {
    filter['where']['and'] = [];
  }
    filter['where']['and'].push({ country: { like: this.rescountry1, options: 'i' } });
          
   }
   */
   



   }
   ) 
  
  

  /*

    var wrd=this.dbsearch;
 
      this.wherearry.push({ firstName: { like: wrd, options: 'i' } });

    this.wherearry.push({ lastName: { like: wrd, options: 'i' } });
   
    this.wherearry.push({ "workingDetails.companyName": { like: wrd, options: 'i' } });
  
      this.wherearry.push({ designation: { like: wrd, options: 'i' } });
       
      this.wherearry.push({ country: { like: wrd, options: 'i' } });
    
      this.wherearry.push({ industry: { like: wrd, options: 'i' } });
     
      this.wherearry.push({ sourceType: { like: wrd, options: 'i' } });
     
      this.wherearry.push({ status: { like: wrd, options: 'i' } });
      this.wherearry.push({ biography: { like: wrd, options: 'i' } });

var where={'or':[this.wherearry]}

    const wheremp = new Map();
      
    wheremp.set('where', JSON.stringify(where));
      



  if (this.isAnd)
  {
   filter = {
     where: {
       and: 
         srchlst
       ,
     },
     skip:this.skipcnt,
   limit:250
   };
  
  }
  else{
  
  }  */
  
  }  
  else
  {

var element=this.dbsearch;

    srchlst.push(
      {
        industry: {
          like: element,
          options: 'i',
        },
      })

      srchlst.push(
        {
          subindustry: {
            like: element,
            options: 'i',
          },
        }
        
        )
        srchlst.push(
          
      {
        sourceType: {
          like: element,
          options: 'i',
        },
      }
          
          )
          srchlst.push(
            {
              sector: {
                like: element,
                options: 'i',
              },
            } 
            )
     
            srchlst.push(
              {
                keyword: {
                  like: element,
                  options: 'i',
                },
              }
              )
       
              srchlst.push(
                {
                  biography: {
                    like: element,
                    options: 'i',
                  },
                }
                )
                srchlst.push(
                  {
                    notes: {
                      like: element,
                      options: 'i',
                    },
                  }
                  )
    
                 

   
   
                  var encword= Buffer.from(element.toString()).toString('base64')
   
                  srchlst.push({ contactNo: { like: encword, options: 'i' } });
                  
                  srchlst.push({ primaryEmail: { like: encword, options: 'i' } });
                  
                  srchlst.push({ alternatePhone: { like: encword, options: 'i' } });
                  
                  srchlst.push({ alternateEmail: { like: encword, options: 'i' } });
                  
                  srchlst.push({ firstName: { like: element, options: 'i' } });
                  
                  srchlst.push({ lastName: { like: element, options: 'i' } });
                     
                  srchlst.push({ "workingDetails.companyName": { like: element, options: 'i' } });
                    
                  srchlst.push({ designation: { like: element, options: 'i' } });
                         
                  srchlst.push({ country: { like: element, options: 'i' } });
                      
                  srchlst.push({ industry: { like: element, options: 'i' } });
                       
                  srchlst.push({ sourceType: { like: element, options: 'i' } });
                       
                  srchlst.push({ status: { like: element, options: 'i' } });
                  srchlst.push({ biography: { like: element, options: 'i' } });
                  
                       
       
 
 
               


  }

/*
  else{
     if (this.keyword) {
       filter = {
         where: {
           or: [
  
             {
               industry: {
                 like: this.keyword,
                 options: 'i',
               },
             },
             {
               subindustry: {
                 like: this.keyword,
                 options: 'i',
               },
             },
             {
               sourceType: {
                 like: this.keyword,
                 options: 'i',
               },
             },
             {
               sector: {
                 like: this.keyword,
                 options: 'i',
               },
             },
             {
               keyword: {
                 like: this.keyword,
                 options: 'i',
               },
             },
             {
               biography: {
                 like: this.keyword,
                 options: 'i',
               },
             },
             {
               notes: {
                 like: this.keyword,
                 options: 'i',
               },
             },
  
             // {"where":{"colors":{"elemMatch":{"colorId":"1"}}}}
  
             // {
             //   workingDetails: {
             //     companyName: this.keyword,
             //     options: 'i',
             //   },
             // },
           ],
         },
         skip:this.skipcnt,
       limit:250
       };
     }
  
   }  */
  
var listwords="";


   var Andsrchlst=[];

   if (this.isExact)
   {
   
    if (this.leadFormGrp.value.fname) {
   
    
      Andsrchlst.push({ firstName:  this.leadFormGrp.value.fname });
     // filter['where']['or'].push({ lastName:  this.leadFormGrp.value.name});
     listwords=listwords+ this.leadFormGrp.value.fname;
      
    }
   
    if (this.leadFormGrp.value.lname) {
      Andsrchlst.push({ lastName:  this.leadFormGrp.value.lname});
      listwords=listwords+ '  '+ this.leadFormGrp.value.lname;
     
   }
   
   }
   else{
   
   
      if (this.leadFormGrp.value.fname) {
        Andsrchlst.push({ firstName: { like: this.leadFormGrp.value.fname, options: 'i' } });
    //    filter['where']['or'].push({ lastName: { like: this.leadFormGrp.value.name, options: 'i' } });
       
    listwords=listwords+ '  fname='+ this.leadFormGrp.value.fname;

      }
   
   
      if (this.leadFormGrp.value.lname) {
        Andsrchlst.push({ lastName: { like: this.leadFormGrp.value.lname, options: 'i' } });
     
        listwords=listwords+ '  lname='+ this.leadFormGrp.value.fname;


     }
   
   
   
    }
   
   
    
    if ((this.Company)&&(this.Company!='')  ){
      Andsrchlst.push({ "workingDetails.companyName": { like: this.Company, options: 'i' } });
    
      listwords=listwords+ '  Company='+ this.leadFormGrp.value.Company;
    
    }
   
   
   
      if (this.leadFormGrp.value.designation) {
        Andsrchlst.push({ designation: { like: this.leadFormGrp.value.designation, options: 'i' } });
    
        listwords=listwords+ '  designation='+ this.leadFormGrp.value.designation;
    
      }
   
      
      // if (this.leadFormGrp.value.companyName) {
      //   if (!filter['where']['and']) {
      //     filter['where']['and'] = [];
      //   }
      //   filter['where']['and'].push({ workingDetails["companyName"]: { like: this.leadFormGrp.value.companyName} });
      // }
   
      if (this.leadFormGrp.value.country) {
        Andsrchlst.push({ country: { like: this.leadFormGrp.value.country, options: 'i' } });
    
        listwords=listwords+ '  country='+ this.leadFormGrp.value.country;
    
      }
      if (this.leadFormGrp.value.industry) {
        Andsrchlst.push({ industry: { like: this.leadFormGrp.value.industry, options: 'i' } });
     
        listwords=listwords+ '  industry='+ this.leadFormGrp.value.industry;
     
     
      }
      if (this.leadFormGrp.value.sourceType) {
      
   
   
        console.log(this.leadFormGrp.value.sourceType);
   
        if (this.leadFormGrp.value.sourceType=="Web Signup")
        {
        
          this.isWebSign=true;
        }
   
        Andsrchlst.push({ sourceType: { like: this.leadFormGrp.value.sourceType, options: 'i' } });
      }




     

   if (this.resnames1!=null && this.resnames1 !=undefined && this.resnames1.trim()  !='')
   {
   
     var wrd=this.resnames1?.trim();
   
     if (wrd!='')
    {
    
    
    var andres=wrd.split(' ')
    
  
   
    Andsrchlst.push({ firstName: { like: andres[0], options: 'i' } });
    
   
    Andsrchlst.push({ lastName: { like: andres[1], options: 'i' } });
   
   
   }
   }
      
   
   if ( this.resindustry1!=null && this.resindustry1 !=undefined &&  this.resindustry1?.trim() !='')
   {

    var rcom=this.resindustry1.split('&')
    Andsrchlst.push({ industry: { like: rcom[0], options: 'i' } });
   }
   
   if ( this.rescompanies1!=null && this.rescompanies1 !=undefined &&  this.rescompanies1?.trim()!='')
   {

    var rcom=this.rescompanies1.split('&')

    Andsrchlst.push({ "workingDetails.companyName": { like: rcom[0], options: 'i' } });
   }  


      if (this.rescountry1!=null && this.rescountry1 !=undefined &&    this.rescountry1?.trim()!='')
   {

    Andsrchlst.push({ country: { like: this.rescountry1, options: 'i' } });
          
   }
      
         


      if (this.leadFormGrp.value.status) {
        Andsrchlst.push({ status: { like: this.leadFormGrp.value.status, options: 'i' } });
      }


      Andsrchlst.push({ "_id": { ne: null} });



if (srchlst.length>1)
{

      filter = {
        where: {
          or: srchlst ,
          and: Andsrchlst
        },
        skip:this.skipcnt,
      limit:1000
      };

    }
  
  
    // filter['where']['and'].push({ status: { neq: 'Deleted'} });
  
    //filter['where']['and'].push({ status: 'Tocheck'});
  

       filter['order'] = 'updatedAt desc';
       filters.set('filter', JSON.stringify(filter));
 


       this.expertService.getAll(filters).subscribe(
         (experts: any) => {
  
           this.totalcnt=experts.length;
           this.krExpertsList = experts;
           console.log (experts)

           this.service.emps=experts;

           this.gridjsList$=this.service.countries$;
   
this.isLoading=false;

if (experts.length>200)
{
  this.service.pageSize=75;

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
  

    if (!isFinal)
    {
    cntfilter.where=filter.where;
  
    const cntfilters = new Map();
  
    cntfilters.set('filter', JSON.stringify(cntfilter));
  
  




     this.expertService.getFilters(cntfilters).subscribe(
      (data: any) => {
        
console.log(data)

        this.qrycount= data['name'];
      
        this.resnames=this.removeDuplicates(data['nameArray']);
        
        this.rescompanies=this.removeDuplicates(data['companyArray']);
        this.resindustry=this.removeDuplicates(data['industryArray']);
        this.rescountry= this.removeDuplicates(data['countryArray']); 


    
      console.log ( this.qrycount)
      },
      (error: any) => {}
    );
  
    }

    try
  {

var dta={
"type":"Expert search",
"viewername":this.whoaim.firstName,
"vieweruserid":this.whoaim.id,
"searchjson":listwords,
"searchwords":this.dbsearch ,
"expertid":"",
"expertname":"",
}

this.commonService.postusagedata(dta)

console.log('usg ok')
    
  }
  catch(err)
  {

  }



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
   

 
    removeDuplicates(arr) {


      var filtered = arr.filter(function (el) {
        return el != null;
      });
      


    return filtered.filter((item, 
        index) => filtered.indexOf(item) === index);
}

   public showExperts() {

    this.searchFor = this.service.searchTerm;
    console.log( this.searchFor )
    this.getExperts(false);
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
     this.getExperts(false) ;
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
   
  const urlTree: UrlTree = this.router.createUrlTree(['expert/expert-view', id]);
  // this.router.navigateByUrl(urlTree,);
  const url: string = this.router.serializeUrl(urlTree);
  window.open(url, '_blank');
 
  
    
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
      this.whoaim = JSON.parse(localStorage.getItem('user'));
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

  private getExperts1() {
    const filters = new Map();
    const filter = {
      // where: { or : []},
      where: {},
      order: 'updatedAt DESC',
    };
//krroles  this.krroles.includes('compliance')
    if (this.krroles.includes('mainPLHead')) {
      filter.where = { plheadId: this.whoaim.id };
    }

    if (this.krroles.includes('subPLHead')) {
      filter.where = {or :[{ subPnlHeadId: this.whoaim.id },{ additionalSubPnls: this.whoaim.id } ]};
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
      filter.where = { assigneeId: this.whoaim.id };
    }

    if (this.roles === 'client') {
      filter.where = { 'clientUser.userId': this.whoaim.id };
    }
/*
 if (this.roles === 'mainPLHead') {
      filter.where = { plheadId: this.whoaim.id };
    }

    if (this.roles === 'subPLHead') {
      filter.where = { subPnlHeadId: this.whoaim.id };
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
  filter.where = { or : [{ accountManagerId: this.whoaim.id },{keyaccmanagers:this.whoaim.id},{ assigneeId: this.whoaim.id }]}

}
else
{
  filter.where = { or : [filter.where,{ assigneeId: this.whoaim.id }]}

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


  onSort({column, direction}: exSortEvent) {
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



