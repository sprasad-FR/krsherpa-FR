import {EmployeeService} from '../../../core/services/employee.service';
import { Component, Input, Output, OnInit } from '@angular/core';
import { Expert } from '../../../core/models/expert.model';
import { ExpertService } from '../../../core//services/expert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { Country } from '@app/pages/sales/default.model';
import { IncentivesConfigService } from '../../../core/services/IncentiveConfig.service';
import { Logger } from '../../../core/logger.service';
import { employeeUser } from '../../../core/models/employee.model';
import { Country, State, City } from 'country-state-city';
import { UserService } from '../../../core/services/kruser.service';
import { NgbModal, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
const log = new Logger('Employee Component');
//import { ToastrService } from 'ngx-toastr';
//import { ProjectFormComponent } from '../project-form/project-form.component';

import { EventDetailsComponent } from '../event-details/event-details.component';

import { ClientsService } from '../../../core/services/clients.service';
import { FileUploadService } from '../../../core/services/fupload.service';
import { CompanyTypeService } from '../../../core/services/company-type.service';
import { SalesLeadService } from '../../../core/services/sales-lead.service';

import { DateToLocalPipe } from '../pipe/dateToLocal.pipe';
import { GetInitialsPipe } from '../pipe/getInitials.pipe';

import { IPVService } from '../../../core/services/IPV.service';

import { CompanyType, CountryCurrency, LeadSource, Stages, Users,CStatus } from '../../../core/models/default.model';

import {
  billingCycleArray,
  leadSourceArray,
  EmailJsTemplates,
  stageStatus,
  EmailTitleDescription,
  cstatusArray
} from '../../../core/models/options';

//import { defaultCompliace } from '../client-compliance';
//import _ from 'lodash';
import { EmailService } from '../../../core/services/email.service';

// import  nanoid  from 'nanoid';
// import * as nanoid from 'nanoid';
import { currencies, KRRolesSet, options } from '../../../../../../shared-libs';

import { nanoid } from 'nanoid';

import { ProjectService } from '../../../core/services/project.service';
import { Event } from '../../../core/models/event.model';


//import { OverviewComponent } from '../overview/overview.component';




import Swal from 'sweetalert2';
@Component({
  selector: 'app-eventtab',
  templateUrl: './eventtab.component.html',
  styleUrls: ['./eventtab.component.scss'],
  providers: [DateToLocalPipe,GetInitialsPipe],
})

/**
 * Starter Component
 */
export class EventtabComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>; 
  leadForm!: FormGroup;
  employeeData: any;
  id: string='';
  pageTitle: string='';
  researchMgr: any;
  researchAnalysts: any = [];
  researchManagers: any = [];
  keyAccMgrList: any;
  isLoading: boolean = false;
  error: any | undefined;
  // bread crum data

  clientForm!: FormGroup;
  clientData: any;
  companyType: CompanyType[]=[];
  countryArray: any[]=[];
  stateArray: any[]=[];
  cityList: any[]=[];
    clientsList: any[]=[];
  countryISO: any;
  usersArray: Users[]=[];
  stageStatus: Stages[]=[];
  leadSourceArray: LeadSource[]=[];
  cstatusArray: CStatus[]=[];
  billingCycleData!: Array<{}>;
  countryCurrency: CountryCurrency[]=[];
 

  companies: any = [];
  EmailJsTemplates!: object;
  taxname:string='';
  taxpercent:string='';
 
  serviceStartDate: string='';
  serviceEndDate: string='';
  initialInvoiceDate: string='';
  btnName: string='';
  emailReceiver: any[]=[];
  reportingMgrEmail: any;
  modalBtn: string='';
  clientUserData: any;
  clientUser: any[]=[];
  clientUserName: string='';
  clientUserDesignation: string='';
  phoneCodeCU: string='';
  clientUserMobile: string='';
  clientUserEmail: string='';
  Notes: string='';
  linkedinurl:string='';
  cid: string='';
  change: string='';
  selectedClientUserId: any;
  clientAsUser: any;
  keyAccountMgrList: any;
  empList: any;
  pnlHeadList: any;
  employeeList: any[]=[];
  editClientAsUser: any;
  isCompliance: boolean=false;
  disableSalesOwner: boolean = true;
  disableKAM: boolean = true;
  disablePnL: boolean = true;
  disableSPnL: boolean = false;
  today = '';
  validNumberString: string='';
  convertBtn: boolean=false;
  clientBtn: boolean=false;
  krpiNo: any;
  alreadyExist: string='';
  whoaim: any;
  roles: string='';
   krroles:string[]=[];
   url:any;
   fileName :any;
  currentFile!: File;
  filesToUpload :any[]=[];
  filetype: any="";
  currenciesList: any[]=[];
  rateTypes: any;
  notesAdded: boolean = false;
  currentUser!: employeeUser;
  emailToSend: any[]=[];
  subPnlHeadList: employeeUser[]=[];
  startDate: string='';
  endDate: string='';
  MSAupdatedEmail: any[]=[];
  disableowner:boolean=false;
  file!: File ; // Variable to store file
           allroles: any[]=[];
           projectClient: any;         
 selectedrules: any[]=[];
 projectData!: Event;
 statData: any;
//import { Component, Input, Output, OnInit } from '@angular/core';
 @Input() itemid: string='';
 @Input() readonly: boolean=true;
  constructor(
 
    private ipvservice: IPVService,
    private companyTypeService: CompanyTypeService,
    private readonly projectService: ProjectService,
 
    private salesLeadService: SalesLeadService,
 //   private readonly toasterService: ToastrService,
    private readonly clientService: ClientsService,
    private emailService: EmailService,
 
    private fileuploadService: FileUploadService,
    private readonly expertService: ExpertService,
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private userService: UserService,
      private modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
   // private toasterService: ToastrService,
      private IncentiveConfigservice: IncentivesConfigService,
  ) {
    this.whoaim = JSON.parse(localStorage.getItem('user')!);
   // this.roles = this.whoaim?.roles[0];
   //  this.krroles = this.whoaim?.roles;
    this.empList = JSON.parse(window.localStorage.getItem('emp')!);
   // this.getCountry();
  }


  expertData: Expert;


  private async getResearchMgr(id: string) {
    if (!id) {
      return;
    }
    this.researchMgr = await this.empList.find((a) => a.userId == id);
  }
  private getResearchAnalysts(ids: string[]) {
    if (!ids || this.notesAdded == true) {
      return;
    }
    if (this.empList?.length) {
      ids.forEach((id) => {
        this.researchAnalysts.push(this.empList.find((a) => a.userId == id));
      });
    }
  }


  private getClient(id: string) {
    this.clientService.show(id).subscribe(
      (client: any) => {
        this.projectClient = client;
        this.projectClient.clientUser = this.projectClient?.clientUser?.filter(
        //  (a) => this.projectData.clientUsers.indexOf(a.userId) != -1
        );
      },
      (error: any) => {}
    );
  }


  private getResearchManagers(ids: string[]) {
    if (!ids || this.notesAdded == true) {
      return;
    } else {
      if (this.empList?.length) {
        ids.forEach((id) => {
          this.researchManagers.push(this.empList.find((a) => a.userId == id));
        });
      }
    }
  }


  
  getNamesFromIds() {
   // this.getResearchAnalysts(this.projectData?.researchAnalyst);
   // this.getResearchManagers(this.projectData?.researchManagerId);

   // this.getKeyAccMgr(this.projectData?.keyAccMgrId);
  }


  private getKeyAccMgr(id: string) {
    if (!id) {
      return;
    }
    if (this.empList?.length) {
      this.keyAccMgrList = this.empList.find((a) => a.userId == id);
    }
  }
  ngOnInit(): void {
   
    this.pageTitle = 'Create New';
    this.btnName = 'Save';
    //this.id = this.empid;// this.route.snapshot.paramMap.get('id')!;
  // this.itemid='6258ff6976264b02817eb0a5';
    this.id =this.itemid ;//  this.route.snapshot.paramMap.get('id')!;
   

    if (this.id && this.id!='') {
      this.pageTitle = 'Update Employee';
      this.btnName = 'Update';
      //GetData
    //  this.getEmployeeById(this.id); 

     // this.getExperts(this.id);
  //this.getProjectById(this.id) 

    }
    else{
      this.pageTitle = 'Create Employee';
      this.btnName = 'Create';
      this.readonly=false;
    }

    this.breadCrumbItems = [{ label: 'Home' }, { label: 'Employee' }, { label: this.pageTitle, active: true }];
  //  this.createForm();


  }


  getProjectById(id: string) {

    const filters = new Map();
    const filter = {};
    filters.set('filter', JSON.stringify(filter));


    this.projectService.show(id, filters).subscribe(
      (project: any) => {
        debugger
        this.projectData = project;
        this.getClient(this.projectData.clientId);


        this.statData = [
          {
            icon: 'bx bx-copy-alt',
            title: 'Profile Attached',
          //  value: this.projectData?.leadAttached ? this.projectData.leadAttached?.length : 0,
            description: 'My Contribution is 2',
          },
          {
            icon: 'bx bx-purchase-tag-alt',
            title: 'GTAM',
           // value: this.projectData?.givenToAccMgr ? this.projectData.givenToAccMgr?.length : 0,
            description: 'My Contribution is 2',
          },
          {
            icon: 'bx bx-purchase-tag-alt',
            title: 'GTC',
          //  value: this.projectData?.givenToClient ? this.projectData.givenToClient?.length : 0,
            description: 'My Contribution is 0',
          },
          {
            icon: 'bx bx-purchase-tag-alt',
            title: 'Expected Events',
           // value: this.projectData?.expectedNumEvent ? this.projectData.expectedNumEvent : 0,
            description: 'Scheduled by me is 1',
          },
          {
            icon: 'bx bx-purchase-tag-alt',
            title: 'Events Completed',
          //  value: this.eventList?.length ? this.eventList?.length : 0,
            description: 'Scheduled by me is 1',
          },
        ];
      
console.log( this.statData)

        this. getNamesFromIds() ;
        // this.getResearchAnalystsFromMgr();
        //// this.projectFormGrp.get('notes').patchValue(this.projectData['notes']);







      },
      (error: any) => {

debugger

        console.log(error)
        alert();
      }
    );
  }



  private   getExperts(id: string) {
    this.expertService.show(this.id).subscribe(
      (experts: Expert) => {
        
this.expertData=experts;


       /*  
       
       experts.primaryEmail=this.encDta(experts.primaryEmail)
        experts.contactNo=this.encDta(experts.contactNo)
        experts.alternateEmail=this.encDta(experts.alternateEmail)
        experts.alternatePhone=this.encDta(experts.alternatePhone)      




        this.expertData = experts;
        console.log('xx',this.expertData.primaryEmail);
        
 //this.expertData.primaryEmail=this.encDta(this.expertData.primaryEmail)
// this.expertData.contactNo=this.encDta(this.expertData.contactNo)
        

console.log('this.expertData?.sourceType='+this.expertData?.sourceType);

        this.leadFormGrp.patchValue(this.expertData);    // && ( !this.expertData?.userId )
        if( (this.expertData?.sourceType == 'Web Signup' || this.expertData?.sourceType == 'Campaign Signup')) { 
          this.leadFormGrp.patchValue({
           krRelationshipMgr: this.currentUser?.firstName,
             krRelationshipMgrId: this.currentUser?.id,
            password: this.rndpwd,//'password@123',
          });
         
           this.isRecruited=true;
        }
       


        console.log(   this.expertData?.krRelationshipMgrId);
        console.log(   this.currentUser?.id);

if (this.expertData?.krRelationshipMgrId ==""||this.expertData?.krRelationshipMgrId ==undefined)
{
        this.leadFormGrp.patchValue({
       krRelationshipMgr: this.currentUser?.firstName,
          krRelationshipMgrId: this.currentUser?.id,
       
        });
      }


console.log(this.expertData);

console.log('this.isRecruited');
console.log(this.isRecruited);

        this.workingDetailsArray = this.expertData?.workingDetails;
        if (experts.terms) {
          this.status = this.status.splice(2, 4);
        }

        console.log(this.expertData);

        this.workingDetailsArray = this.expertData?.workingDetails;
        if (experts.terms) {
          this.status = this.status.splice(2, 4);
        }

        this.workingDetailsArray = this.expertData?.workingDetails;
        if (experts.terms) {
          this.status = this.status.splice(2, 4);
        }

*/


      },
      (error: any) => {}
    );
  }




  // generatePwd(event)
  // {
  //   var val = event.target.value
  //   var password:string = val.split('.com');
  //   password = password.charAt(0).toUpperCase() + password.slice(1)+'3172';
  //   this.leadForm.controls['password'].setValue(password);

  // }



  isContactnoValid:boolean=true;
  isAlterNatenoValid:boolean=true;
  
  isMail1Valid:boolean=true;
  isMail2Valid:boolean=true;
  isContactnoCodeValid:boolean=true;
  
  phoneCodeCU1:any;
  



}
