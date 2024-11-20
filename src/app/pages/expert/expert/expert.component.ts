import {EmployeeService} from '../../../core/services/employee.service';
import { Component, OnInit, ViewChild , ElementRef, Input} from '@angular/core';
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
import { ToastService } from '../../toast-service';
import { paymentPreference, months } from '../../../../../../shared-libs';
import { Project } from '../../../core//models/project.model';
import { ClientsService } from '../../../core/services/clients.service';
import { FileUploadService } from '../../../core/services/fupload.service';
import { CompanyTypeService } from '../../../core/services/company-type.service';
import { SalesLeadService } from '../../../core/services/sales-lead.service';
import { ProjectService } from '../../../core/services/project.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { DateToLocalPipe } from '../../../core/pipe';
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







import Swal from 'sweetalert2';
@Component({
  selector: 'app-expert',
  templateUrl: './expert.component.html',
  styleUrls: ['./expert.component.scss'],
  providers: [DateToLocalPipe],
})

/**
 * Starter Component
 */
export class ExpertComponent implements OnInit {

  // bread crumb items
  breadCrumbItems : Array<{}>; 
  leadForm : FormGroup;
  employeeData: any;
  id: string='';
  pageTitle: string='';
  editWd: any;
  isLoading: boolean = false;
  error: any | undefined;
  // bread crum data
  public Editor = ClassicEditor;
  workForm: FormGroup; 
  clientForm : FormGroup;
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
  billingCycleData : Array<{}>;
  countryCurrency: CountryCurrency[]=[];
 

  companies: any = [];
  EmailJsTemplates : object;
  taxname:string='';
  taxpercent:string='';
  projectsData: Project[] = [];
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
  currentFile : File;
  filesToUpload :any[]=[];
  filetype: any="";
  currenciesList: any[]=[];
  rateTypes: any;
  showEnd: boolean;
  currentUser : employeeUser;
  emailToSend: any[]=[];
  subPnlHeadList: employeeUser[]=[];
  startDate: string='';
  endDate: string='';
  MSAupdatedEmail: any[]=[];
  disableowner:boolean=false;
  file!: File ; // Variable to store file
           allroles: any[]=[];
           expertCompanyType: any[];      
           months: any[];
           hideBankDetails: boolean;        
 selectedrules: any[]=[];

//***** */
krExpertsList: any;
rateForClient: any;
//projectsData: Project[] = [];
industry: string;
showComplianceButton: boolean;
complianceModalTitle: string;
complianceComment: string;
expertDataForCompliance: Expert;
currentEmployer: string;
bankDetailsForm: FormGroup;
paymentPreference: any[];


userData: any;

expertDetailsForm: FormGroup;
//public Editor = ClassicEditor;
hiddenBankAccountNum: string;

showTextbox: boolean = false;

GTAMdata: any;
GTCdata: any;
GTCViewdata: any;
projectData: Project[];


@ViewChild('mynotes') myNotes;

 @Input() itemid: string='';
 @Input() readonly: boolean=true;
  constructor(
 
    private ipvservice: IPVService,
    private companyTypeService: CompanyTypeService,
    private readonly projectService: ProjectService, 

    public toasterService: ToastService,
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
    this.roles = this.whoaim?.roles[0];
     this.krroles = this.whoaim?.roles;
    this.empList = JSON.parse(window.localStorage.getItem('emp')!);
    this.getCountry();
  }


  getCountry() {
    this.countryArray = Country?.getAllCountries();
    this.countryArray.forEach((element) => {
      element['label'] = element.name + ' ' + element.phonecode;
    });
  }

  expertData: Expert;

  ngOnInit(): void {
   
    this.pageTitle = 'Create New';
    this.btnName = 'Save';
    //this.id = this.empid;// this.route.snapshot.paramMap.get('id')!;
    this.months = months;
    this.expertCompanyType = options.expertCompanyType;
 
    if ( this.itemid && this.itemid !='')
    {
    this.id =this.itemid//  this.route.snapshot.paramMap.get('id')!;
    }
    else{
     this.id = this.route.snapshot.paramMap.get('id');
    }



    if (this.id && this.id!='') {
      this.pageTitle = 'Update Employee';
      this.btnName = 'Update';
      //GetData
    //  this.getEmployeeById(this.id); 

      this.getExperts(this.id);
      this.createBankDetailForm();
      this.createExpertDetailForm();
     // this.getcomplianceDetails();
      this.getProjects()

    }
    else{
      this.pageTitle = 'Create Employee';
      this.btnName = 'Create';
      this.readonly=false;
    }
   // this.expertData.terms=false;
    

    this.breadCrumbItems = [{ label: 'Home' }, { label: 'Employee' }, { label: this.pageTitle, active: true }];
  //  this.createForm();



  this.workForm = this.formBuilder.group({
    companyName: [''],
    companyType: [''],
    jobTitle: [''],
    startYear: [''],
    startMonth: [''],
    endMonth: [''],
    endYear: [''],
    isCurrentEmployeer: [''],
  });

  }

  complianceCommentBox(addComments: any) {
    this.complianceModalTitle = 'Add Comment';
    this.modalService.open(addComments, { centered: true, windowClass: 'modal-holder' });
  }


  getProjects() {
   
    this.isLoading = true;

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
    "createdAt": true,
    "leadAttached":true,
    "givenToAccMgr":true,
    "givenToClient":true,
  },     
      order: 'createdAt DESC',
      limit:100,
    };

    var filtrval={};


  
      filtrval = { 'leadAttached.id': this.id } || { 'givenToAccMgr.id': this.id } || {
          'givenToClient.id': this.id,
        };
    
        filter.where['and'] =[filtrval]

  //  filter.where['and'] =[filtrval,{"datasrc":{ neq: 'importOld'} }] ;

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




    filters.set('filter', JSON.stringify(filter));
    this.projectService.getAll(filters).subscribe(
      (projects: any) => {
         this.projectsData = projects;
     console.log('this.projectsData ',this.projectsData )
        this.isLoading = false;
      },
      (error: any) => {
        this.isLoading = false;
      }
    );
  }



  openNewTab(url) {
    window.open(url, '_blank');

    //
  }




  getPAdate(url) {
   // this.projectsData.pr

   //attachedDate  attachedBy

  }


  getGTAMdate(url) {
    // this.projectsData.pr

   }


  
  openViewGTAMModal(viewGTAMModal, lead) {

    this.projectData=lead;
    let alreadyGTAM = lead.givenToAccMgr?.find((a) => a.id == this.id);
    this.GTAMdata = {};
    if (alreadyGTAM) {
      this.modalService.open(viewGTAMModal, { size: 'lg',centered: true, windowClass: 'modal-holder' });
      this.GTAMdata = alreadyGTAM;
    } else {
       this.toasterService.error(`expert/lead is not given to KAM.`, 'Error!');
      return;
    }
  }


  
  openViewGTCModal(viewGTCMModal, lead) {
    this.projectData=lead;

    let alreadyGTC = lead?.givenToClient?.find((a) => a.id == this.id);
    this.GTCViewdata = {};
    if (alreadyGTC) {


      this.modalService.open(viewGTCMModal, {size: 'lg', centered: true, windowClass: 'modal-holder' });
      this.GTCViewdata = alreadyGTC;

      this.GTCViewdata["firstName"]=lead.firstName 
      this.GTCViewdata["lastName"]=lead.lastName 
      this.GTCViewdata["designation"]=lead.firstName 
      this.GTCViewdata["Expid"]=lead.id 

    } else {
      this.toasterService.error(`expert/lead is not given to Client.`, 'Error!');
      return;
    }
  }


  AddNotes(notevalue )
  {

    debugger

    let nots =this.myNotes.value

    console.log (notevalue)

if (notevalue!="")
{
 

  //expertData: Expert;
 
    let expert = {"notes":this.expertData.notes +"\n"+ " Added By:"+ this.userData.firstName + " At -"+ (new Date) +":" +"\n"+ notevalue
     
  }   //this.expertData;

//let expert =  this.expertData;

    const wheremp = new Map();

    const filter = {
     
      "id":this.id     //expert.krRelationshipMgrId
     
    };


    
          wheremp.set('where', JSON.stringify(filter));
    


    this.expertService.updatePOC(wheremp, expert).subscribe((data) => {
      this.toasterService.success('Notes updated successfully.', 'Success!');
     // this.getExperts(this.id);
    });
  }
  }


  refreshed: boolean;
  idforCompliance: string;
  RefreshList() {
   this.refreshed = false;
    this.refreshed = true;
  //  this.fetchData();
  }

  submit() {
    let bankDetail = this.bankDetailsForm.value;
    if (bankDetail.paymentPreference == 'Amazon gift card') {
      delete bankDetail.paypalCode;
    }
    this.expertService.updateOnly(this.id, bankDetail).subscribe((data) => {
      this.toasterService.success('Bank details updated successfully.', 'Success!');
      this.getExperts(this.id);
    });
    this.modalService.dismissAll();
  }

  markCompliance(val) {
    this.expertService.show(this.id).subscribe(
      (experts: Expert) => {
        this.expertData=experts;
      //  experts.primaryEmail=this.encDta(experts.primaryEmail)
      //  experts.contactNo=this.encDta(experts.contactNo)
    
        this.expertDataForCompliance = experts;
        if (val == 'verify') {
          this.expertDataForCompliance.isComplianceVerified = true;
        } else {
          this.expertDataForCompliance.isComplianceVerified = this.expertDataForCompliance.isComplianceVerified;
        }

        this.expertDataForCompliance.complianceComment = this.complianceComment;
        // this.expertDataForCompliance['workDetails'] = this.expertDataForCompliance.workDetails;
        this.expertService.update(this.id, this.expertDataForCompliance).subscribe(
          (response) => {
            log.debug('response: ', response);
            this.isLoading = false;
            this.toasterService.success('Expert marked as Compliance verified.', 'Success!');
            this.getExperts(this.id);
          },
          (error) => {
            log.error(error);
            log.debug('Not Updated', this.expertData);
            this.error = error;
            this.isLoading = false;
          }
        );
      },
      (error: any) => {}
    );
    this.modalService.dismissAll();
  }

  createExpertDetailForm() {
    this.expertDetailsForm = this.formBuilder.group({
      contactNo: [''],
      primaryEmail: [''],
      rate: [''],
      biography: [''],
    });
  }

  createBankDetailForm() {
    this.bankDetailsForm = this.formBuilder.group({
      bankName: [''],
      branchName: [''],
      bankAccountNumber: ['', [Validators.maxLength(30)]],
      bankAccountType: [''],
      ifscCode: [''],
      beneficiaryname: [''],
      panCard: [''],    
      notes: [''],
      paymentPreference: [''],

      paypalCode: [''], 
  amazonCode: [''],
  PayCurrency: [''],
  PayCountry: [''],

  achBeneficiaryName: [''],
  achAccountNo: [''],
  achBankName: [''],
  achBankAddress: [''],
  achSwiftCode: [''],
  achBeneficiaryCountry: [''],
  achBeneficiaryAddress: [''],
  achAccountType: [''],
  achPostalCode: [''],
  shiftCode: [''],

    });
  }

  openEditBankModal(bankDetails, expertid) {
    this.modalService.open(bankDetails, { centered: true, windowClass: 'modal-holder' });
    this.getExperts(expertid);
  }

  updatePOC()
  {
    //let expert = {"designation":"Managing Director"}   //this.expertData;

let expert = this.expertData;

    const wheremp = new Map();

    const filter = {
     
      "krRelationshipMgrId":"62866abd37fa1f4456919a7e"       //expert.krRelationshipMgrId
     
    };


    const wheres =     
          {
            compliancetype: 'project',
          };
    
          wheremp.set('where', JSON.stringify(filter));
    


    this.expertService.updatePOC(wheremp, expert).subscribe((data) => {
      this.toasterService.success('Details updated successfully.', 'Success!');
      this.getExperts(this.id);
    });

  }


  paymentVia(event) {
    if (event.text == 'Amazon gift card') {
      this.hideBankDetails = true;
      this.showTextbox = false;
    } else if (event.text == 'Paypal') {
      this.hideBankDetails = true;
      this.showTextbox = true;
    } else if (event.text == 'Bank transfer') {
      this.hideBankDetails = false;
      this.showTextbox = false;
    } else if (event.text == 'Donation') {
      this.hideBankDetails = false;
      this.showTextbox = false;
    }
  }

  openEditModal(editExpertDetails) {
    this.modalService.open(editExpertDetails, { centered: true, windowClass: 'modal-holder' });
  }


  editDetail() {
    let expert = this.expertDetailsForm.value;
    this.expertService.updateOnly(this.id, expert).subscribe((data) => {
      this.toasterService.success('Details updated successfully.', 'Success!');
      this.getExperts(this.id);
    });
    this.modalService.dismissAll();
  }





  openEditWorkingDetails(workingDetails, companyName) {
    this.modalService.open(workingDetails, { centered: true, windowClass: 'modal-holder' });
    if (companyName == 'addData') {
      this.btnName = 'Save';
      this.workForm.patchValue({
        companyName: '',
        companyType: '',
        jobTitle: '',
        startYear: '',
        startMonth: '',
        endMonth: '',
        endYear: '',
        isCurrentEmployeer: '',
      });
    } else {
      this.btnName = 'Edit';
      let wd = this.expertData?.workingDetails?.find((x) => x.companyName == companyName);
      this.editWd = wd;
      this.workForm.patchValue({
        companyName: wd.companyName,
        companyType: wd.companyType,
        jobTitle: wd.jobTitle,
        startYear: wd.startYear,
        startMonth: wd.startMonth,
        endMonth: wd.endMonth,
        endYear: wd.endYear,
        isCurrentEmployeer: wd.isCurrentEmployeer,
      });
    }
  }
  checkEmployer(event) {
    var cc = event.target;
    if (cc.checked == true) {
      this.showEnd = false;
      this.workForm.patchValue({ endMonth: '' });
      this.workForm.patchValue({ endYear: '' });
    } else {
      this.showEnd = true;
    }
  }

  addDetails() {
    debugger
    if (this.editWd) {
      let index = this.expertData.workingDetails.indexOf(this.editWd);
      this.expertData.workingDetails.splice(index, 1);
      if (this.workForm.controls['companyName'].value != '' && this.workForm.controls['companyType'].value != '') {
        if (!this.expertData.workingDetails) {
          this.expertData.workingDetails = [];
        }
        this.expertData.workingDetails.push({
          companyName: this.workForm.controls['companyName'].value,
          companyType: this.workForm.controls['companyType'].value,
          jobTitle: this.workForm.controls['jobTitle'].value,
          startMonth: this.workForm.controls['startMonth'].value,
          startYear: this.workForm.controls['startYear'].value,
          endMonth: this.workForm.controls['endMonth'].value,
          endYear: this.workForm.controls['endYear'].value,
        });
      } else {
        this.expertData.workingDetails = [];
      }
      this.workForm.reset();

    } else {
      if (this.workForm.controls['companyName'].value != '' && this.workForm.controls['companyType'].value != '') {
        if (!this.expertData.workingDetails) {
          this.expertData.workingDetails = [];
        }
        this.expertData.workingDetails.push({
          companyName: this.workForm.controls['companyName'].value,
          companyType: this.workForm.controls['companyType'].value,
          jobTitle: this.workForm.controls['jobTitle'].value,
          startMonth: this.workForm.controls['startMonth'].value,
          startYear: this.workForm.controls['startYear'].value,
          endMonth: this.workForm.controls['endMonth'].value,
          endYear: this.workForm.controls['endYear'].value,
        });
      } else {
        this.expertData.workingDetails = [];
      }
      this.workForm.reset();
    }

  }


  workDetailsSubmit() {

    debugger
    if (this.editWd) {
      let index = this.expertData.workingDetails.indexOf(this.editWd);
      this.expertData.workingDetails.splice(index, 1);
      if (this.workForm.controls['companyName'].value != '' && this.workForm.controls['companyType'].value != '') {
        if (!this.expertData.workingDetails) {
          this.expertData.workingDetails = [];
        }

        this.expertData.workingDetails?.splice(0, 0,{
          companyName: this.workForm.controls['companyName'].value,
          companyType: this.workForm.controls['companyType'].value,
          jobTitle: this.workForm.controls['jobTitle'].value,
          startMonth: this.workForm.controls['startMonth'].value,
          startYear: this.workForm.controls['startYear'].value,
          endMonth: this.workForm.controls['endMonth'].value,
          endYear: this.workForm.controls['endYear'].value,
          isCurrentEmployeer: this.workForm.controls['isCurrentEmployeer'].value,
        });




/*

        this.expertData.workingDetails.push({
          companyName: this.workForm.controls['companyName'].value,
          companyType: this.workForm.controls['companyType'].value,
          jobTitle: this.workForm.controls['jobTitle'].value,
          startMonth: this.workForm.controls['startMonth'].value,
          startYear: this.workForm.controls['startYear'].value,
          endMonth: this.workForm.controls['endMonth'].value,
          endYear: this.workForm.controls['endYear'].value,
          isCurrentEmployeer: this.workForm.controls['isCurrentEmployeer'].value,
        });
*/

      } else {
        this.expertData.workingDetails = [];
      }
    } else {
      if (this.workForm.controls['companyName'].value != '' && this.workForm.controls['companyType'].value != '') {
        if (!this.expertData.workingDetails) {
          this.expertData.workingDetails = [];
        }


        this.expertData.workingDetails?.splice(0, 0,{
          companyName: this.workForm.controls['companyName'].value,
          companyType: this.workForm.controls['companyType'].value,
          jobTitle: this.workForm.controls['jobTitle'].value,
          startMonth: this.workForm.controls['startMonth'].value,
          startYear: this.workForm.controls['startYear'].value,
          endMonth: this.workForm.controls['endMonth'].value,
          endYear: this.workForm.controls['endYear'].value,
          isCurrentEmployeer: this.workForm.controls['isCurrentEmployeer'].value,
        });

        /*
        this.expertData.workingDetails.push({
          companyName: this.workForm.controls['companyName'].value,
          companyType: this.workForm.controls['companyType'].value,
          jobTitle: this.workForm.controls['jobTitle'].value,
          startMonth: this.workForm.controls['startMonth'].value,
          startYear: this.workForm.controls['startYear'].value,
          endMonth: this.workForm.controls['endMonth'].value,
          endYear: this.workForm.controls['endYear'].value,
          isCurrentEmployeer: this.workForm.controls['isCurrentEmployeer'].value,
        });*/
      } else {
        this.expertData.workingDetails = [];
      }
      this.workForm.reset();
    }

    this.expertService.updateOnly(this.id, this.expertData).subscribe((response) => {
      log.debug('response: ', response);
      this.modalService.dismissAll();
    });
  }


///bank edit

FieldData: { [label: string]: string} = {};
  FieldsArray:any;
  CSValues: { [label: string]: string} = {};
  CheckFieldAccess: { [fieldid: string]: string } = {};
  CheckSectionAccess: { [sectionid: string]: string } = {};
  setRole:string='role1'
  transformedFieldData:any={};

  Openpopup(popup){

    this.modalService.open(popup,{size:'lg',centered:true})

    this.FieldData['paymentPreference']=this.expertData['paymentPreference'];

    this.FieldData['paypalCode']=this.expertData['paypalCode'];
    this.FieldData['PayCurrency']=this.expertData['PayCurrency'];
    this.FieldData['PayCountry']=this.expertData['PayCountry'];

    this.FieldData['amazonCode']=this.expertData['amazonCode'];
    this.FieldData['amazonCurrency']=this.expertData['amazonCurrency'];
    this.FieldData['amazonCountry']=this.expertData['amazonCountry'];

    this.FieldData['achBeneficiaryName']=this.expertData['achBeneficiaryName'];
    this.FieldData['achBeneficiaryAddress']=this.expertData['achBeneficiaryAddress'];
    this.FieldData['achBeneficiaryCountry']=this.expertData['achBeneficiaryCountry'];
    this.FieldData['achAccountType']=this.expertData['achAccountType'];
    this.FieldData['achAccountNo']=this.expertData['achAccountNo'];
    this.FieldData['achBankName']=this.expertData['achBankName'];
    this.FieldData['achBankAddress']=this.expertData['achBankAddress'];
    this.FieldData['achSwiftCode']=this.expertData['achSwiftCode'];
    this.FieldData['achPostalCode']=this.expertData['achPostalCode'];
    this.FieldData['ibanno']=this.expertData['ibanno'];
    this.FieldData['routingno']=this.expertData['routingno'];

    this.FieldData['bankAccountNumber']=this.expertData['bankAccountNumber'];
    this.FieldData['bankName']=this.expertData['bankName'];
    this.FieldData['branchName']=this.expertData['branchName'];
    this.FieldData['bankAccountType']=this.expertData['bankAccountType'];
    this.FieldData['ifscCode']=this.expertData['ifscCode'];
     this.FieldData['beneficiaryname']=this.expertData['beneficiaryname'];
    this.FieldData['panCard']=this.expertData['panCard'];

console.log(this.FieldData)


  


    // fetch('https://middle.krsherpa.com/projects/fields/getall')
    //   .then((res) => res.json())
    //   .then((field) => {
    //     this.FieldsArray=field.find((field) =>field.moduleId === 'experts')
    //     //this.moduleAIP = this.FieldsArray.moduleId;
    //     for (let index = 0; index < this.FieldsArray?.sections?.length; index++) {
    //       const section = this.FieldsArray.sections[index];
    //       //console.log(section)
    //       if(section.Type === 'custom'){
    //         const filterdata=this.FieldsArray?.fields.filter((field) =>field.sectionid === section.sectionid)
    //         filterdata.forEach((field) =>{
    //           this.FieldData[field.fieldid] = this.expertData[field.fieldid]
    //           console.log(this.FieldData[field.fieldid])
    //         })
    //       }
          
    //     }
    // });
  }
 
  CountryId(event:any) {
    this.countryISO = event?.isoCode;
    this.stateArray = State.getStatesOfCountry(this.countryISO);
    console.log(this.stateArray)
  }

  StateId(event:any) {
    const stateISO = event?.isoCode;
    this.cityList = City.getCitiesOfState(this.countryISO, stateISO);
  }

  saveBankDetails(){

    this.expertData['paymentPreference']=this.FieldData['paymentPreference'];

    this.expertData['paypalCode']=this.FieldData['paypalCode'];
    this.expertData['PayCurrency']=this.FieldData['PayCurrency'];
    this.expertData['PayCountry']=this.FieldData['PayCountry'];

    this.expertData['amazonCode']=this.FieldData['amazonCode'];
    this.expertData['amazonCurrency']=this.FieldData['amazonCurrency'];
    this.expertData['amazonCountry']=this.FieldData['amazonCountry'];

    this.expertData['achBeneficiaryName']=this.FieldData['achBeneficiaryName'];
    this.expertData['achBeneficiaryAddress']=this.FieldData['achBeneficiaryAddress'];
    this.expertData['achBeneficiaryCountry']=this.FieldData['achBeneficiaryCountry'];
    this.expertData['achAccountType']=this.FieldData['achAccountType'];
    this.expertData['achAccountNo']=this.FieldData['achAccountNo'];
    this.expertData['achBankName']=this.FieldData['achBankName'];
    this.expertData['achBankAddress']=this.FieldData['achBankAddress'];
    this.expertData['achSwiftCode']=this.FieldData['achSwiftCode'];
    this.expertData['achPostalCode']=this.FieldData['achPostalCode'];
    this.expertData['ibanno']=this.FieldData['ibanno'];
    this.expertData['routingno']=this.FieldData['routingno'];

    this.expertData['bankAccountNumber']=this.FieldData['bankAccountNumber'];
    this.expertData['bankName']=this.FieldData['bankName'];
    this.expertData['branchName']=this.FieldData['branchName'];
    this.expertData['bankAccountType']=this.FieldData['bankAccountType'];
    this.expertData['ifscCode']=this.FieldData['ifscCode'];
      this.expertData['beneficiaryname']=this.FieldData['beneficiaryname'];
    this.expertData['panCard']=this.FieldData['panCard'];

console.log(' this.expertData', this.expertData)



 this.expertService.updateOnly(this.expertData.id, this.expertData).subscribe((response) => {
      log.debug('response: ', response);
     // this.modalService.dismissAll();

     alert("Bank details saved")

    });




  }


///bank edit



  delete(companyName) {


    var result = confirm("are sure you Want to delete?");
    if (result) {
      
    let wd = this.expertData?.workingDetails?.find((x) => x.companyName == companyName);
    let index = this.expertData.workingDetails.indexOf(wd);
    this.expertData.workingDetails.splice(index, 1);
    this.expertService.updateOnly(this.id, this.expertData).subscribe((data) => {
      console.log(data);
    });

  }

  }





  private   getExperts(id: string) {
    this.expertService.show(this.id).subscribe(
      (experts: Expert) => {
        
this.expertData=experts;
debugger
//this.expertData.terms = false;

if (this.expertData.terms == false && this.roles =='expert' ) {
  this.router.navigate(['/confirm-expert/'+this.expertData.id]);
}

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
