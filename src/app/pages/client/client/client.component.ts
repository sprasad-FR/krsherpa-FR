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
import { ToastService } from '../../toast-service';  


import { ClientsService } from '../../../core/services/clients.service';
import { FileUploadService } from '../../../core/services/fupload.service';
import { CompanyTypeService } from '../../../core/services/company-type.service';
import { SalesLeadService } from '../../../core/services/sales-lead.service';
import { GetInitialsPipe } from '../../../core/pipe';
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
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  providers: [DateToLocalPipe,GetInitialsPipe],

})

/**
 * Starter Component
 */
export class ClientComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>; 
  leadForm!: FormGroup;
  employeeData: any;
  id: string='';
  pageTitle: string='';

  isLoading: boolean = false;
  error: any | undefined;
  // bread crum data
  employeeArray: employeeUser[]=[];
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
  disableSalesOwner: boolean = false;
  disableKAM: boolean = false;
  disablePnL: boolean = false;
  disableSPnL: boolean = false;
/*
  disableSalesOwner: boolean = true;
  disableKAM: boolean = true;
  disablePnL: boolean = true;
  disableSPnL: boolean = false;
*/

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

  currentUser!: employeeUser;
  emailToSend: any[]=[];
  subPnlHeadList: employeeUser[]=[];
  startDate: string='';
  endDate: string='';
  MSAupdatedEmail: any[]=[];
  disableowner:boolean=false;
  file!: File ; // Variable to store file
           allroles: any[]=[];
           
 selectedrules: any[]=[];
 clientUsers:any=[];
 isEmailCheck: boolean = false;
 isVisible: boolean = false;
 existingUserId: string | null = null;
 @Input() empid: string='';
 @Input() readonly: boolean=true;
  constructor(
 
    private ipvservice: IPVService,
    private companyTypeService: CompanyTypeService,
  
 
    private salesLeadService: SalesLeadService,
    private toasterService: ToastService,  
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
    this.getCountry();
  }

  getUserName(userId?: any) {
    if (userId != null && this.employeeArray != undefined) {
      const user = this.employeeArray.find((x) => x.userId === userId);

      return user?.name;
    }
    return '';
  }

  getCountry() {
    this.countryArray = Country?.getAllCountries();
    console.log(this.countryArray );
    this.countryArray.forEach((element) => {
      element['label'] = element.name + ' ' + element.phonecode;
    });
  }

  CountryId(event:any) {
    this.countryISO = event?.isoCode;
    this.stateArray = State.getStatesOfCountry(this.countryISO);
  }

  StateId(event:any) {
    const stateISO = event?.isoCode;
    this.cityList = City.getCitiesOfState(this.countryISO, stateISO);
  }



  ngOnInit(): void {
   
    this.pageTitle = 'Create New';
    this.btnName = 'Save';
    this.id = this.empid;// this.route.snapshot.paramMap.get('id')!;
   console.log('this.id ',this.id )
   

    if (this.id && this.id!='') {
      this.pageTitle = 'Update Employee';
      this.btnName = 'Update';
      //GetData
    this.getClientById(this.id); 

    }
    else{
      this.pageTitle = 'Create Employee';
      this.btnName = 'Create';
      this.readonly=false;
    }

    this.breadCrumbItems = [{ label: 'Home' }, { label: 'Employee' }, { label: this.pageTitle, active: true }];
    this.createForm();
   this._fetchData();


/*
  let currentDate = new Date(Date.now());
  let day = currentDate.getDate();
  let strDate = day < 10 ? '0' + day : day;
  let month = currentDate.getMonth() + 1;
  let year = currentDate.getFullYear();
  let strMonth = month < 10 ? '0' + month : month;
  this.today = year + '-01'  + '-' + strDate;

  let reportingMgr = this.empList?.find((x:any) => x.userId == this.whoaim?.id);

  //get email id of reporting manager
  this.reportingMgrEmail = this.empList?.find((x:any) => x.repotingManagerId == reportingMgr?.repotingManagerId);
  this.emailToSend = [];
  if (this.reportingMgrEmail?.email) {
    this.emailToSend.push(this.reportingMgrEmail?.email);
  }
  this.currentUser = this.empList?.find((x:any) => x.userId == this.whoaim?.id);
  //get higher designation employees
  let employees = this.empList?.filter((x:any) => x.designation > this.currentUser?.designation!);
  for (let i = 0; i < employees.length; i++) {
   // gs- spaming with ids this.emailToSend.push(employees[i]?.email);
  }
  // (error: any) => {}

  this.createForm();
  this._fetchData();
  let userData = JSON.parse(localStorage.getItem('user')!);
  // this.krroles = this.whoaim?.roles;
   if (userData?.roles?.includes(KRRolesSet.keyAccountManager)) {
this.disableKAM = false;
      this.disableSalesOwner = false;
   }
   else  if((userData?.roles?.includes(KRRolesSet.mainPLHead)) ||(userData?.roles?.includes(KRRolesSet.subPLHead))|| (userData?.roles?.includes(KRRolesSet.admin))) {
      this.disableKAM = false;
      this.disablePnL = false;
     
   }

if ((userData?.roles?.includes(KRRolesSet.admin)) ||(userData?.roles?.includes(KRRolesSet.mainPLHead)) )
{
this.disableSalesOwner = false;
}
else{
this.disableSalesOwner = true;
}




*/



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
  
  checkPhone(Code:any,event:any,id:any) {
  
    let email = event.target.value.trim();
  
   
  
  //alternatePhoneCountryCode
   
  
  
    var res;
  
    res=this.ipvservice.CheckIP(Code,email )
  
  
  console.log(res);
  if (!res.isValid)
  {
    //this.leadFormGrp.controls['alternatePhone'].setErrors({'incorrect': true});
   // this.leadFormGrp.controls['alternatePhone'].setErrors
  
  //  this.isContactnoValid=true;
  console.log(this.isContactnoValid);
  document.getElementById(id)!.style.display = 'block';
  document.getElementById(id)!.innerText = 'Please enter valid mobile number';
  this.clientBtn = true;
   return false;
  }
  else{
    document.getElementById(id)!.style.display = 'none';
    this.clientBtn = false;
  }
  
  return true;
  }
  






  

  getInitials(value: string) {
let limitChar=2;

    if (value != null) {
      return value
        .split(' ')
        .map((n, i) => {
          if (i > limitChar - 1) {
            return '';
          } else {
            return n[0];
          }
        })
        .join('')
        .toUpperCase();
    }

    return '';
  }


  
  aphSearchFn(term: string, item:any) {
    item.name = item.name.replace('()','');
    item.name = item.name.replace('))','');
    term = term.toLocaleLowerCase();
  
    var res;
  
     res =item.phonecode.toLocaleLowerCase().indexOf(term) > -1
  
  if (!res)
  {
  res =item.isoCode.toLocaleLowerCase().indexOf(term) > -1
  }
  
  if (!res)
  {
  res =item.name.toLocaleLowerCase().indexOf(term) > -1
  }
  
  console.log(res)
  
    return res;
  }
  
    private _fetchData() {
      this.stageStatus = stageStatus;
      this.leadSourceArray = leadSourceArray;
       this.cstatusArray = cstatusArray;
     /* this.getclientKrpiNo();
      this.getUsers();
      
      this.getComapnyTypes();
      this.getCompanyNames(); gs*/
      this.getClients();
      this.getComapnyTypes();
      this.getEmployee();
      this.getClientUsers();
      // this.getPlheadList();
  
    // this.pageTitle = 'CREATE A NEW CLIENT';
     // this.id = this.route.snapshot.paramMap.get('id')!;
  
      if (this.id) {
        this.pageTitle = 'UPDATE CLIENT';
        this.btnName = 'Update';
        //GetData
      //  this.getClientById(this.id);
      }
    }
  

  // OnClick of button Upload
  onUpload() {
   
    this.fileName=this.fileuploadService.getguid();
    
    console.log(this.file);
  
    debugger
 //this.fileuploadService.uploadFile(this.fileName, this.filesToUpload[0],'client').subscribe(
   
 var nm=this.filesToUpload[0].name;

 var filetype=this.filesToUpload[0].type;

    
    this.fileuploadService.uploadFile(this.fileName, this.filesToUpload[0],'client').subscribe(
        (data: any) => {
          console.log('file data', data);
            if ((typeof (data) === 'object')&&(data.status==200) ){

console.log('file done');

this.clientData.agreementType = this.clientData?.agreementType == true ? "MSA" : "Non MSA";
this.clientData.packageType = this.clientData?.packageType == true ? 'Wallet' : 'Credit';
this.clientData.fax = (this.clientData?.fax )? this.clientData?.fax: ' ';

if (this.clientData.attachments!=undefined)
{
this.clientData.attachments.push({"filename":nm, "s3name":this.fileName,"mediatype":filetype ,"filetype":this.filetype})
}
else{
this.clientData.attachments=[{"filename":nm, "s3name":this.fileName,"mediatype":filetype ,"filetype":this.filetype}]
}

const leadUpdateSubmit$ = this.clientService.updateOnly(this.id, this.clientData);
leadUpdateSubmit$.subscribe(
(data1: any) => {
// swalWithBootstrapButtons.fire('Updated!', 'Lead stage changed.', 'success');

// emailVariableObj['currentUser'] =  this.whoami.firstName;
// emailVariableObj['SalesLeadLink'] =  this.whoami.firstName;

this.getClientById(this.id);
},
(error: any) => {
//  swalWithBootstrapButtons.fire('Warning', 'Lead stage not changed', 'error');
}
);

              // Flag variable 
            }

        },
  (error: any) => {  console.log(error);}
    );
}



openNewTab(url) {
  window.open(url, '_blank');
}



// // OnClick of button Upload
ondnload() {
  
    console.log(this.file);
    this.fileuploadService.dnoad(this.fileName).subscribe(
        (event: any) => {
            if (typeof (event) === 'object') {
console.log('file done');
                // Short link via api response
               
            }
        },
  (error: any) => {  console.log(error);}
    );
}


//On file Select
onChange(event:any) {

  let file = event.target.files[0]
console.log(file)
//console.log(file.data.toString());
this.filesToUpload = [];
this.filesToUpload.push(file);
this.fileName = file['name'];
    this.file = event.target.files[0];
}


  submitData() {
    const clientData = this.clientForm.value;
    // this.clientData.leadSource = +clientData.leadSource;
   // if (this.clientForm.valid) {  gs
      this.isLoading = true;
      if (!clientData.packageTypecheck) {
        clientData['amount'] = clientData.amount;
      }


      if (!clientData.isAgreementDone) {
        // delete clientData.serviceStartDate;
        // delete clientData.serviceEndDate;
        // delete clientData.billingCycle;
        // delete clientData.initialInvoiceDate;
      //  delete clientData.currency;
        delete clientData.noOfCredits;
        delete clientData.costPerCredit;
        delete clientData.msaValue;
        delete clientData.krpiAccess;
        delete clientData.krpiEventAccessNumber;
        delete clientData.usersPerEvent;
        // delete clientData.leadIntroduction;
        // delete clientData.introductionIncentive;
        delete clientData.agreementType;
        delete clientData.packageType;
        delete clientData.onDemandTopics;
        delete clientData.preEventCounsultation;
      } else {
        clientData.agreementType = clientData.agreementType ? 'MSA' : 'Non MSA';
        clientData.packageType = clientData.packageType ? 'Credit' : 'Wallet';
        clientData.onDemandTopics = clientData.onDemandTopics ? 1 : 0;
        clientData.preEventCounsultation = clientData.preEventCounsultation ? 1 : 0;
      }
      if (clientData.agreementType != 'MSA') {
        // delete clientData.serviceEndDate;

     //   delete clientData.currency;
        delete clientData.noOfCredits;
        delete clientData.costPerCredit;
        delete clientData.msaValue;
        delete clientData.krpiAccess;
        delete clientData.krpiEventAccessNumber;
        delete clientData.usersPerEvent;
        // delete clientData.leadIntroduction;
        // delete clientData.introductionIncentive;
        delete clientData.agreementType;
        delete clientData.packageType;
        delete clientData.onDemandTopics;
        delete clientData.preEventCounsultation;
      }
debugger
      if (clientData.packageType != 'Credit') {
        delete clientData.noOfCredits;
        delete clientData.costPerCredit;
        delete clientData.msaValue;
      }
      if (clientData.krpiAccess != true) {
        delete clientData.krpiEventAccessNumber;

        delete clientData.usersPerEvent;

        delete clientData.onDemandTopics;
        delete clientData.preEventCounsultation;
      }

      clientData.clientUser = this.clientData.clientUser;
      clientData.fax = (clientData?.fax )? clientData?.fax: ' ';
      if (this.id) {
        if (!clientData['compliace']) {
          clientData['compliace'] = {};
        }
        if (!clientData['compliace']['rules']) {
          clientData['compliace']['rules'] = [];
        }
        if (clientData['compliace']['rules'].length <= 0) {
       //gs   clientData['compliace']['rules'] = defaultCompliace;
        }
        
        clientData.timeZone = this.clientData.timeZone;
        clientData.leadContactId = this.clientData?.leadContactId;
        if (!clientData.availableCredits) {
          clientData.availableCredits = 0;
        }

        let arrOfEMpIds:any[] = [];
        this.MSAupdatedEmail = [];
        arrOfEMpIds.push(clientData?.assigneeId);
        arrOfEMpIds.push(clientData?.plheadId);
        arrOfEMpIds.push(clientData?.subPnlHeadId);
        arrOfEMpIds.push(clientData?.accountManagerId);

        let selectedEmailPeople = this.empList?.filter((e:any) => arrOfEMpIds.indexOf(e.userId) != -1);
        this.MSAupdatedEmail = selectedEmailPeople?.map((a:any) => a?.email);
        this.clientService.updateOnly(this.id, clientData).subscribe(
          (response) => {
            log.debug('response: ', response);

            this.isLoading = false;
            this.router.navigate(['/clients/assignments']);
           this.toasterService.success('Client updated successfully.', 'Success!');
            //email notification
            let emailVariableObj:any = {
              currentUser: this.whoaim.firstName,
              SalesLeadLink: window.location.origin + '/clients/show/' + this.id,
              emailData: EmailTitleDescription.MSAupdated,
            };


            emailVariableObj['Module'] = 'Client' ;
            emailVariableObj['name'] = this.clientData?.companyName;
            emailVariableObj['Action'] = 'Client updated' ;
            emailVariableObj['Actiontype'] = 'Informative' ;
            emailVariableObj['link'] = '/clients/show/' + this.id;
    
    
    

            this.emailService.sendEmail(
              EmailJsTemplates.MSAupdated,
              this.MSAupdatedEmail,
              'Informative',
              emailVariableObj
            );
          },
          (error) => {
            log.error(error);
            log.debug('Not Updated', clientData);
            this.error = error;
            this.isLoading = false;
            this.toasterService.error('Client not updated successfully.', 'Error!');
          }
        );
      } else {
        clientData['compliace'] = {};
      //gs  clientData['compliace']['rules'] = defaultCompliace;
        this.clientService.create(clientData).subscribe(
          (response) => {
            log.debug('response: ', response);

            this.isLoading = false;
            this.router.navigate(['/clients/assignments']);
           this.toasterService.success('Client created successfully.', 'Success!');
            //email notification
            let emailVariableObj:any = {
              currentUser: this.whoaim.firstName,
              SalesLeadLink: window.location.origin + '/clients/show/' + response?.id,
              emailData: EmailTitleDescription.clientProfile,
            };

            emailVariableObj['Module'] = 'Client' ;
            emailVariableObj['name'] = clientData?.companyName;
            emailVariableObj['Action'] = 'Client created' ;
            emailVariableObj['Actiontype'] = 'Informative' ;
            emailVariableObj['link'] = '/clients/show/' + response?.id;
    


            console.log('object data', emailVariableObj);
            this.emailService.sendEmail(
              EmailJsTemplates.clientProfile,
              this.MSAupdatedEmail,
              'Approval',
              emailVariableObj
            );
          },
          (error) => {
            log.error(error);
            log.debug('Not Created', clientData);
            this.error = error;
            this.isLoading = false;
          }
        );
      }
   // }
  }

  cancelForm() {
    this.router.navigate(['/clients/assignments']);
  }

  private getClientById(id: string) {
    this.isLoading = true;
    this.clientService.show(id).subscribe(
      (client: any) => {
        this.clientData = client;
console.log (client);

        this.clientData.isAgreementDone = client?.isAgreementDone ? true : false;
        this.clientData.agreementType = client?.agreementType == 'MSA' ? true : false;
        this.clientData.packageType = client?.packageType == 'Wallet' ? false : true;
        this.clientData.msaValue = client?.msaValue;
        this.clientData.serviceStartDate = client?.serviceStartDate?.toString().split('T')[0];
        this.clientData.initialInvoiceDate = client?.initialInvoiceDate?.toString().split('T')[0];
        this.clientData.serviceEndDate = client?.serviceEndDate?.toString().split('T')[0];

        const match = this.countryArray.find(c => c.name === this.clientData.country);
        if(match!=null){
          const countryIso=match.isoCode;
          this.stateArray = State.getStatesOfCountry(countryIso);
          const match1 = this.stateArray.find(c => c.name === this.clientData.state);
          if(match1!=null)
            this.cityList = City.getCitiesOfState(countryIso, match1.isoCode);
        }
        // this.serviceStartDate = client.serviceStartDate.toString().split('T')[0];
        // this.initialInvoiceDate = client.initialInvoiceDate.toString().split('T')[0];
        // this.serviceEndDate = client.serviceEndDate.toString().split('T')[0];
        this.clientData.assigneeId = client?.assigneeId;
this.clientData.parentid = (client?.parentid)? client?.parentid : client?.id;
this.clientData.status = (client?.status)? client?.status : "Active";

        this.clientUser = this.clientData?.clientUser;
        this.clientData.amount = client?.amount;
        this.clientData.phoneCode=client?.phoneCode;
        // this.bindData();
        this.clientForm.patchValue(this.clientData);

       // this.emailToSend=[];

       // this.emailToSend.push(this.reportingMgrEmail?.email);



        this.isLoading = false;
      },
      (error: any) => {}
    );
  }

  private createForm() {
    this.billingCycleData = billingCycleArray;
    this.currenciesList = currencies;
    this.leadSourceArray = leadSourceArray;
      this.cstatusArray = cstatusArray;
    this.rateTypes = options.rateTypes;
    this.clientForm = this.formBuilder.group({
      companyName: [null, [Validators.required]],
      companyType: ['', [Validators.required]],
      email: [null, [Validators.required]],
      phoneCode: [null, [Validators.required]],
      contactNo: [null, [Validators.required]],
      fax: [' '],
      url: [null, Validators.required],
      addressLine1: [null, [Validators.required]],

      city: [null, [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      zipCode: [null],
      isparent: [false,null],
      parentid: [null],
      isAgreementDone: [null],
      agreementType: [null],
      serviceStartDate: [''],
      serviceEndDate: [''],
      billingCycle: [''],
      initialInvoiceDate: [''],
      packageType: [null],
      currency: [''],
      amount: [null],
      availableCredits: [null],
      costPerCredit: [null],
      msaValue: [null],
      krpiAccess: [false],
      krpiEventAccessNumber: [null],
      usersPerEvent: [null],
      onDemandTopics: [''],
      preEventCounsultation: [''],
      leadSource: [''],
       status: [''],
      assigneeId: [''],
      salesassociates: [[]],
      keyaccmanagers: [[]],
      additionalSubPnls: [[]],
      attachments: [[]],
      plheadId: [null, [Validators.required]],
      accountManagerId: [''],
      baseRate: [null],
      baseRateType: [''],
      subPnlHeadId: [null],
    });
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

    return this.employeeService.getAllEnabled(filters).subscribe(
      (employees: any) => {
        this.employeeArray = employees;
        console.log('employees',employees)

        this.employeeList = employees;
        this.keyAccountMgrList = this.employeeList?.filter((x) => x.designation === 7);
        this.pnlHeadList = this.employeeList?.filter((x) => x.designation === 3);
        this.subPnlHeadList = this.employeeList?.filter((x) => x.designation === 4);
        if (this.krroles.includes('keyAccountManager')) {
          this.disableSPnL = true;
        }
        this.clientForm.patchValue({
          plheadId: this.pnlHeadList[0]?.userId,
        });
      },
      (error: any) => {}
    );
  }

  getempUsers() {
    this.employeeService.getAll().subscribe(
      (userArray: any) => {
        this.employeeArray = userArray;
      },
      (error: any) => {}
    );
  }



  private getUsers() {
    this.userService.getUsers().subscribe(
      (userArray: any) => {
        this.usersArray = userArray;
      },
      (error: any) => {}
    );
  }

  private getComapnyTypes() {
    this.companyTypeService.getAll().subscribe(
      (companyTypes: any) => {
        this.companyType = companyTypes;
      },
      (error: any) => {}
    );
  }

  private getCompanyNames() {
    const filters = new Map();
    const filter = { fields: { companyName: true } };
    filters.set('filter', JSON.stringify(filter));

    this.salesLeadService.getAllLeads(filters).subscribe(
      (data: any) => {
        this.companies = data;
      },
      (error: any) => {}
    );
  }

  // Open client user form modal
  createClientUser(clientUserFormModal: any) {
    this.selectedClientUserId=null;
    this.modalService.open(clientUserFormModal, { size: 'lg', windowClass: 'modal-holder' });
    this.modalBtn = 'Save';
    this.clientUserName = '';
    this.clientUserDesignation = '';
     this.phoneCodeCU = '';
    this.clientUserMobile = '';
    this.clientUserEmail = '';
     this.linkedinurl = '';
    this.Notes = '';
  }

  private getClients() {
    this.clientService.getAll().subscribe(
      (clients: any) => {
        this.clientsList = clients;
       // this.clientsList?.forEach((element) => {
        //  element['clientId'] = element.id;
       // });
       
      },
      (error: any) => {}
    );
  }


  //Create new client user
  submitClienttax() {


    if (!this.taxname && !this.taxpercent && !this.taxname) {


      this.error = true;
      return;


      }



      let clientUserEdit = this.clientData?.taxes.find((x:any) => x.taxname == this.taxname);



        if (clientUserEdit)
        {
            this.editClientAsUser = {
              taxname: this.taxname,
              taxpercent: this.taxpercent,

            };
        }
        else
        {
            this.clientUserData.taxes.push({            
                  taxname: this.taxname,
                  taxpercent: this.taxpercent,           
                  createdAt: clientUserEdit.createdAt,
                  updatedAt: new Date(),
                });
        }



          this.clientService.updateOnly(this.id, this.clientUserData).subscribe( 
            (response) => {

              log.debug('response: ', response);

              this.clientData.clientUser = this.clientUserData?.clientUser;
              this.isLoading = false;

          //    this.toasterService.success('Client user updated successfully.', 'Success!');              //email notification
             
            },

            (error) => {
              log.error(error);
              log.debug('Not Created', this.clientUserData);
              this.error = error;
            }
          );
       





    }


    checkEmail(event: any) {

      let email = event.target.value.trim();
      if (!email || !this.isValidEmail(this.clientUserEmail))  { 
        this.clientUserEmail="";
      }
      
      let salesLeadContactUserId =null;
      if(!this.isEmailCheck){
        salesLeadContactUserId = this.clientUsers.find((u) => u.username === email)?.id;
        if(typeof salesLeadContactUserId=='undefined')
          salesLeadContactUserId=null;
        if(salesLeadContactUserId!=null){
            this.isEmailCheck=true;
            this.existingUserId=salesLeadContactUserId;
        }
      }
      if(this.isEmailCheck){
        this.isVisible = !this.isVisible;
        return false;
      }
      return true;
    }
    continueSave(){
      this.isEmailCheck=false;
      this.isVisible = !this.isVisible;
    }
    hidePopUp(){
      this.isVisible = !this.isVisible;
      this.isEmailCheck=false;
      this.clientUserEmail="";
      this.existingUserId=null;
    }
   
    isValidEmail(email: string): boolean {
      // Simple email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    getClientUsers() {
      //const filter = { roles: ['client'] };
      const filters = new Map();
      // const filters = new Map<string, string>();
      // filters.set('filter', JSON.stringify(filter));
      
      this.userService.usersByRole(filters).subscribe(
        (userArray: any) => {
          var users: Users[];
          this.clientUsers = userArray;
          console.log("this.clientUsers "+this.clientUsers);
         // this.clientUsers = users.map(user => user.username);
          
        },
        (error: any) => {}
      );
    }

  //Create new client user -  gs to be ported to sales lead
  submitClientUser() {
    if (!this.clientUserName || !this.phoneCodeCU || !this.clientUserEmail ) {
      this.error = true;
      return;
    }
    //Create empty array if null
    if (!this.clientData?.clientUser) {
      this.clientUserData = {
        clientUser: [],
      };
    } else {
      this.clientUserData = {
        clientUser: this.clientData.clientUser,
      };
    }

    this.cid = Math.random().toString(36).substr(2, 9);

    if (this.selectedClientUserId && this.selectedClientUserId.length >0) {
      let clientUserEdit = this.clientData?.clientUser.find((x:any) => x.id == this.selectedClientUserId);

      this.editClientAsUser = {
        firstName: this.clientUserName,
        username: clientUserEdit?.email,      
      };

      this.userService.updateById(clientUserEdit?.userId, this.editClientAsUser).subscribe(
        async (user) => {
        //  this.toasterService.success('User edited successfully .', 'Success!');
          //email notification
          let emailVariableObj:any = {
            notificationType: 'skipEmail',
            emailData: EmailTitleDescription.clientusers,
          };

          emailVariableObj['Module'] = 'Client User' ;
          emailVariableObj['name'] = this.clientData?.companyName +'-'+ this.clientUserName;
          emailVariableObj['Action'] = 'Client user updated' ;
          emailVariableObj['Actiontype'] = 'Informative' ;
          emailVariableObj['link'] = '/clients/show/' + this.id;
        //  emailVariableObj['description'] = 'Client user updated';

          this.emailService.sendEmail(EmailJsTemplates.clientusers, this.emailToSend, 'Informative', emailVariableObj);

          let index = this.clientData?.clientUser.indexOf(clientUserEdit);

          this.clientData.clientUser.splice(index, 1);

          this.clientUserData.clientUser.push({
            id: clientUserEdit.id,
            clientId: clientUserEdit.clientId,
            userId: clientUserEdit.userId,
            isCompliance: this.isCompliance,
            name: this.clientUserName,
            designation: this.clientUserDesignation,
            phoneCode: this.phoneCodeCU,
            mobile: this.clientUserMobile,
            linkedinurl:this.linkedinurl, //gs
            email: clientUserEdit.email,
            notes: clientUserEdit.Notes,
            createdAt: clientUserEdit.createdAt,
            updatedAt: new Date(),
          });

          this.clientService.updateOnly(this.id, this.clientUserData).subscribe(
            (response) => {
              log.debug('response: ', response);

              this.clientData.clientUser = this.clientUserData?.clientUser;
              this.isLoading = false;

             this.toasterService.success('Client user updated successfully.', 'Success!');
              //email notification
              let emailVariableObj = {
                notificationType: 'skipEmail',
                emailData: EmailTitleDescription.clientusers,
              };
              this.emailService.sendEmail(
                EmailJsTemplates.clientusers,
                this.emailToSend,
                'Informative',
                emailVariableObj
              );
            },
            (error) => {
              log.error(error);
              log.debug('Not Created', this.clientUserData);
              this.error = error;
            }
          );
        },
        (error) => {}
      );
      this.modalService.dismissAll();
    } else {
      let rolesArr = [];
      if (this.isCompliance == true) {
        rolesArr = ['client', 'compliance'];
      } else {
        rolesArr = ['client'];
      }
      this.clientAsUser = {
        firstName: this.clientUserName,
        username: this.clientUserEmail,
        password: 'Password@123',
        roles: rolesArr,
      };

      this.userService.register(this.clientAsUser).subscribe(
        async (user) => {
         this.toasterService.success('User created successfully .', 'Success!');

          this.clientUserData.clientUser.push({
            id: this.cid,
            clientId: this.id,
            userId: (await user).id,
            isCompliance: this.isCompliance,
            name: this.clientUserName,
            designation: this.clientUserDesignation,
            phoneCode: this.phoneCodeCU,
            mobile: this.clientUserMobile,
            email: this.clientUserEmail,
            linkedinurl:this.linkedinurl,
            notes: this.Notes,
            createdAt: new Date(),
            updatedAt: new Date(),
          });

          this.clientService.updateOnly(this.id, this.clientUserData).subscribe(
            (response) => {
              log.debug('response: ', response);

              this.clientData.clientUser = this.clientUserData?.clientUser;
              this.isLoading = false;

             this.toasterService.success('Client user created successfully.', 'Success!');
            },
            (error) => {
              log.error(error);
              log.debug('Not Created', this.clientUserData);
              this.error = error;
            }
          );
        },
        (error) => {}
      );
      this.modalService.dismissAll();
    }

    
  }


  removeattachment(name:string) {



    //this.files.splice(this.files.indexOf(event), 1);

/*
    if (this.salesLeadData.attachments!=undefined)
    {
    this.salesLeadData.attachments.push({"filename":this.fileName, "filetype":this.filetype})
    }
    else{
      this.salesLeadData.attachments=[{"filename":this.fileName, "filetype":this.filetype}]
    } */

    let clientatchEdit = this.clientData.attachments?.find((x:any) => x["filename"] == name);

    console.log('removeattachment  0',this.clientData.attachments);


    if (clientatchEdit)
    {
      console.log('removeattachment  1');
  let index = this.clientData.attachments.indexOf(clientatchEdit);

  console.log(index);

    this.clientData.attachments.splice(index, 1);

    const leadUpdateSubmit$ = this.clientService.updateOnly(this.id, this.clientData);

    leadUpdateSubmit$.subscribe(
      (data1: any) => {
       
      
        this.getClientById(this.id);
      },
      (error: any) => {
      //  swalWithBootstrapButtons.fire('Warning', 'Lead stage not changed', 'error');
      }
    );
    }

  }
  selectClientUser(selectClientUserModal: any) {
    this.modalService.open(selectClientUserModal, { centered: true, windowClass: 'modal-holder' });
  }

  addtax(selectClientUserModal: any) {
    this.modalService.open(selectClientUserModal, { centered: true, windowClass: 'modal-holder' });
  }

  //Open modal for update client user
  updateClientUser(clientUserFormModal: any, id:string) {

debugger
    console.log('clientUser', id)
    this.selectedClientUserId = id;
   var locid=this.clientUser;
   if(id==="")
    id=this.selectedClientUserId;
    let clientUserEdit = this.clientData?.clientUser?.find((x:any) => x.id == id)//this.selectedClientUserId);
    console.log('lientUser1', clientUserEdit)
    this.clientUserName = clientUserEdit?.name;
    this.clientUserDesignation = clientUserEdit?.designation;  
     this.phoneCodeCU = clientUserEdit?.phoneCode;
    this.clientUserMobile = clientUserEdit?.mobile;
    this.clientUserEmail = clientUserEdit?.email;
     this.linkedinurl = clientUserEdit?.linkedinurl;
    this.Notes = clientUserEdit?.notes;

    this.modalService.open(clientUserFormModal, { size: 'md', windowClass: 'modal-holder' });

    this.modalBtn = 'Update';
  }

  setEndDate(event:any) {
    this.startDate = event.target.value;
  }
  
  setInvoiceDate(event:any) {
    this.endDate = event.target.value;
  }

  checkNumber(event:any) {
    let re = new RegExp('^[0-9]*$');
    if (re.test(event.target.value)) {
      this.validNumberString = '';
      this.clientBtn = false;
    } else {
      this.validNumberString = 'Please enter valid KRPI event access number';
      this.clientBtn = true;
    }
  }
  getclientKrpiNo() {
    const filters = new Map();
    const filter = { fields: { krpiEventAccessNumber: true } };
    filters.set('filter', JSON.stringify(filter));

    this.clientService.getAll(filters).subscribe(
      (data: any) => {
        this.krpiNo = data;
      },
      (error: any) => {}
    );
  }
  onKeypressEvent(event: any) {
    let number = event.target.value;
    const krpiMatch = this.krpiNo.filter((x:any) => x.krpiEventAccessNumber == number);
    if (krpiMatch.length > 0) {
      this.alreadyExist = 'KRPI Event Access Number already exist.';
      this.convertBtn = true;
    } else {
      this.alreadyExist = '';
      this.convertBtn = false;
    }
  }


}
