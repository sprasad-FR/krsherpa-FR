
import { environment } from '../../../../environments/environment';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

//import { ChartType, CompanyType, Stages, Users, CountryCurrency } from '../default.model';
import { HttpClient } from '@angular/common/http';

//*********************** */
import {EmployeeService} from '../../../core/services/employee.service';
import { Component, Input, Output, OnInit } from '@angular/core';
import { Expert } from '../../../core/models/expert.model';
import { ExpertService } from '../../../core/services/expert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// import { Country } from '@app/pages/sales/default.model';
import { IncentivesConfigService } from '../../../core/services/IncentiveConfig.service';
import { Logger } from '../../../core/logger.service';
import { employeeUser } from '../../../core/models/employee.model';
import { Country, State, City } from 'country-state-city';
import { UserService } from '../../../core/services/kruser.service';
import { NgbModal, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { BdpService } from '../../../core/services/bdp.service';
//import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
//import { EmployeeService } from '../../../core/services/employee.service';

import { ClientsService } from '../../../core/services/clients.service';
import { FileUploadService } from '../../../core/services/fupload.service';
import { CompanyTypeService } from '../../../core/services/company-type.service';
import { SalesLeadService } from '../../../core/services/sales-lead.service';

import { DateToLocalPipe } from '../../../core/pipe';
import { IPVService } from '../../../core/services/IPV.service';

import { CompanyType, CountryCurrency, LeadSource, Stages, Users,CStatus } from '../../../core/models/default.model';
import {
 
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
import { leadSourceArray, stageStatus, EmailJsTemplates, EmailTitleDescription } from '../options';

import { SalesLeadContactService } from '../../../core/services/sales-lead-contact.service';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
//import { CompanyType, Users, Stages, LeadSource } from '../default.model';
import { SalesLead } from '../../../core/models/salesLead.model';
import { SalesLeadContact } from '../../../core/models/salesLeadContact.model';
import { SalesLeadCommentService } from '../../../core/services/sales-lead-comment.service';


import { ToastService } from '../../toast-service';

const log = new Logger('Create Lead Component');

import {
  incentiveChartData,
  stageStatusDisplay,
  billingCycleArray,
  countryCurrency,

} from '../../../core/models/options';

import { SalesLeadComment } from '../salesLeadComment.model';



@Component({
  selector: 'app-lead-details',
  templateUrl: './lead-details.component.html',
  styleUrls: ['./lead-details.component.scss'],
  providers: [DateToLocalPipe],
})


export class LeadDetailsComponent implements OnInit {
  error: any | undefined;

  //@ViewChild('fileUploadInput', {static: false})
 // fileUploadVariable: ElementRef;
 url:any;
   fileName;
  currentFile: File;
  filesToUpload = [];
  // bread crumb items
  breadCrumbItems: Array<{}>;
  dummyData: SalesLead;
  salesLeadContact: SalesLeadContact;
 // incentiveChartData: ChartType;
 @Input() itemid: string='';
 @Input() readonly: boolean=false;
  id: string;
  salesLeadData: SalesLead;
  usersArray: Users[];
  companyType: CompanyType[];
  stageStatus: Stages[];
  salesLeadComments: SalesLeadComment[];
  newComment: SalesLeadComment;
  billingCycleArray: Array<{}>;
  countryCurrency: CountryCurrency[];
  CTCForm: FormGroup;
  // public Editor = ClassicEditor;
  whoami: any = [];
  files: File[] = [];
  keyAccountMgrList: any;
  filetype: any="";
  pnlHeadList: any;
  subPnlHeadList: employeeUser[];
  EmailJsTemplates: object;
  isLoading: boolean = false;
  krpiNo: any;
  alreadyExist: string = '';
  convertBtn: boolean = false;
  rateTypes: any[];
  clientUserData: any;
  /*timelineCarousel: OwlOptions = {
    items: 1,
    loop: false,
    margin: 0,
    nav: true,
    navText: ["<i class='mdi mdi-chevron-left'></i>", "<i class='mdi mdi-chevron-right'></i>"],
    dots: false,
    responsive: {
      680: {
        items: 4,
      },
    },
  };*/

//Create empty array if null


  afuConfig = {
    multiple: false,
    formatsAllowed: '.jpg,.png,.pdf',
    maxSize: '1',
    uploadAPI: {
      url: 'http://[::1]:3000/media/upload',
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=UTF-8',
      },
      params: {
        page: '1',
      },
      responseType: 'blob',
      withCredentials: false,
    },
    theme: 'dragNDrop',
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: true,

    fileNameIndex: true,
    autoUpload: false,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Attach Files...',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !',
      sizeLimit: 'Size Limit',
    },
  };
  addnote: boolean = false;
  descriptionField: any;
  note: any;
  today: string;
  endDate: string;
  validNumberString: string;
  daysDiff: number;
  agreementTypecheck: string;
  startDate: string;
  currenciesList: {
    code: string;
    name: string;
    name_plural: string;
    symbol: string;
    symbol_native: string;
    decimal_digits: number;
    rounding: number;
  }[];
  mediaData: any = {
    attachments: [],
  };
  employeeList: any[];
  localstorageEmp: any;
  reportingMgrEmail: any;
  emailToSend: any[];
  currentUser: employeeUser;
  empList: any;
  roles: string;
  allContactPersons: any[];
   // Variable to store shortLink from api response
    shortLink: string = "";
    loading: boolean = false; // Flag variable
    file: File = null; // Variable to store file
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private fileuploadService: FileUploadService,
    private companyTypeService: CompanyTypeService,
    private userService: UserService,
    private salesLeadService: SalesLeadService,
    private salesLeadContactService: SalesLeadContactService,
    private salesLeadCommentService: SalesLeadCommentService,
    private clientsService: ClientsService,
    private emailService: EmailService,
    private http: HttpClient,
    private employeeService: EmployeeService
  ) {
    this.createCTCForm();
    this.whoami = JSON.parse(localStorage.getItem('user'));
    this.roles = this.whoami?.roles[0];
    this.empList = JSON.parse(window.localStorage.getItem('emp'));
    this.url= environment.serverUrl+"/files/";
    this.clientUserData =[];
  }




  ngOnInit() {
    this.breadCrumbItems = [
      { label: 'Dashboard', path: 'dashboard', redirectTo: '/dashboard' },
      { label: 'Sales', active: true },
    ];

    // let reportingMgr = this.empList.find((x) => x.userId == this.whoami?.id);
    //get email id of reporting manager
    // this.reportingMgrEmail = this.empList.find((x) => x.repotingManagerId == reportingMgr?.repotingManagerId);
    this.currentUser = this.empList?.find((x) => x.userId == this.whoami?.id);

    this.salesLeadContact = <SalesLeadContact>{};
    this.salesLeadData = <SalesLead>{};


    if ( this.itemid && this.itemid !='')
    {
    this.id =this.itemid ;//  this.route.snapshot.paramMap.get('id')!;
    }
    else{
     this.id = this.route.snapshot.paramMap.get('id');
    }
    //this.id = this.route.snapshot.paramMap.get('id');


    if (this.id) {
      //GetData
      this._fetchData();
      this.getclientKrpiNo();
    }
    this.getEmployee();
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
        this.employeeList = employees;
        this.keyAccountMgrList = this.employeeList?.filter((x) => x.designation === 7);
        this.pnlHeadList = this.employeeList?.filter((x) => x.designation === 3);
        this.subPnlHeadList = this.employeeList?.filter((x) => x.designation === 4);
       
      },
      (error: any) => {}
    );
  }



  // OnClick of button Upload
    onUpload() {
        this.loading = !this.loading;
        console.log(this.file);
        var reader = new FileReader();
        var datafile ;
        reader.onloadend = function(e) {
    
            // save this data1111 and send to server
             datafile = e.target.result // reader.result // ----------------- data1111
    
        };

      //  this.fileuploadService.uploadFile(this.fileName, this.filesToUpload[0]).subscribe(
    
      
        this.fileuploadService.uploadFile(this.fileName, this.file,true).subscribe(
            (data: any) => {
              console.log('file data', data);
                if ((typeof (data) === 'object')&&(data.status==200) ){
    console.log('file done',data);

if (this.salesLeadData.attachments!=undefined)
{
this.salesLeadData.attachments.push({"filename":this.fileName, "filetype":this.filetype})
}
else{
  this.salesLeadData.attachments=[{"filename":this.fileName, "filetype":this.filetype}]
}

const leadUpdateSubmit$ = this.salesLeadService.updateLeadById(this.id, this.salesLeadData);
leadUpdateSubmit$.subscribe(
  (data1: any) => {
   // swalWithBootstrapButtons.fire('Updated!', 'Lead stage changed.', 'success');
   
    // emailVariableObj['currentUser'] =  this.whoami.firstName;
    // emailVariableObj['SalesLeadLink'] =  this.whoami.firstName;
  
    this.getSalesLeadById(this.id);
  },
  (error: any) => {
  //  swalWithBootstrapButtons.fire('Warning', 'Lead stage not changed', 'error');
  }
);
  
                    this.loading = false; // Flag variable 
                }

            },
      (error: any) => {  console.log(error);}
        );
    }

 // // OnClick of button Upload
 ondnload() {
        this.loading = !this.loading;
        console.log(this.file);
        this.fileuploadService.dnoad(this.fileName).subscribe(
            (event: any) => {
                if (typeof (event) === 'object') {
    console.log('file done');
                    // Short link via api response
                    this.shortLink = event.link;
  
                    this.loading = false; // Flag variable 
                }
            },
      (error: any) => {  console.log(error);}
        );
    }
    
    
    //On file Select
    onChange(event) {

      let file = event.target.files[0]
    console.log(file)
    //console.log(file.data.toString());
    this.filesToUpload = [];
    this.filesToUpload.push(file);
    this.fileName = file['name'];
        this.file = event.target.files[0];
    }

  getclientKrpiNo() {
    const filters = new Map();
    const filter = { fields: { krpiEventAccessNumber: true } };
    filters.set('filter', JSON.stringify(filter));

    this.clientsService.getAll(filters).subscribe(
      (data: any) => {
        this.krpiNo = data;
      },
      (error: any) => {}
    );
  }

  setEndDate(event) {
    this.startDate = event.target.value;
  }
  setInvoiceDate(event) {
    this.endDate = event.target.value;
  }

  onKeypressEvent(event: any) {
    let number = event.target.value;
    const krpiMatch = this.krpiNo?.filter((x) => x.krpiEventAccessNumber == number);
    if (krpiMatch.length > 0) {
      this.alreadyExist = 'KRPI Event Access Number already exist.';
      this.convertBtn = true;
    } else {
      this.alreadyExist = '';
      this.convertBtn = false;
    }
  }

  private _fetchData() {
    this.getUsers();
    this.getComapnyTypes();
    this.getSalesLeadById(this.id);
    this.getSalesLeadComments();
    //this.dummyData = dummyData;
    //this.salesLeadContact = salesLeadContactData;
   // this.incentiveChartData = incentiveChartData;
    this.rateTypes = options.rateTypes;
    let days = 0;

    let currentDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    let day = currentDate.getDate();
    let strDate = day < 10 ? '0' + day : day;
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    let strMonth = month < 10 ? '0' + month : month;
    this.today = year + '-01'  + '-' + strDate;
  }

  createComment(commentDescription) {
    if (!commentDescription.value) {
      return false;
    }
console.log ('createComment');

    this.newComment = <SalesLeadComment>{};
    this.newComment.userId = this.whoami.id;
    this.newComment.salesLeadId = this.id;
    this.newComment.description = commentDescription.value;

    this.isLoading = true;

    this.salesLeadCommentService.create(this.newComment).subscribe(
      (data) => {
        commentDescription.value = '';
        this.getSalesLeadComments();
        this.isLoading = false;
      },
      (error: string) => {
        log.error('comments:', error);
        this.isLoading = false;
      }
    );
    return true;
  }

  deleteComment(commentId) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ml-2',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: 'Delete the comment',
        icon: 'warning',
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        showCancelButton: true,
      })
      .then((result) => {
        if (result.value) {
          this.salesLeadCommentService.delete(commentId).subscribe(
            (data) => {
              this.getSalesLeadComments();
            },
            (error: string) => {
              log.error('comments:', error);
            }
          );
        }
      });
  }

  getUserName(id: string) {
    if (id != null && this.usersArray != undefined) {
      const user = this.usersArray.find((x) => x.id === id);

      if (!user) {
        return 'Unknown User';
      } else {
        if (!user.firstName && !user.lastName) {
          return user?.username;
        } else if (!user.lastName) {
          return user.firstName;
        } else {
          return user?.firstName + ' ' + user?.lastName;
        }
      }
    } else {
      return '--';
    }
  }

  addNotes(addNotesModal) {
    this.modalService.open(addNotesModal, { size: 'md', centered: true, windowClass: 'modal-holder' });
  }

  storeDescrition() {
    if (this.descriptionField == null) {
      this.error = true;
      return;
    }

    this.note = {
      notes: [...this.salesLeadContact.notes],
    };

    this.note.notes.push({
      note: this.descriptionField,
      date:new Date()
    });

    this.salesLeadContactService.updateOnly(this.salesLeadContact.id, this.note).subscribe(
      (response) => {
        this.descriptionField = null;

        this.getSalesLeadContactById(this.salesLeadContact.id);
      },
      (error) => {
        log.error(error);
      }
    );
    this.modalService.dismissAll();
  }

  getIncentiveType(id: number) {
    return id === 1 ? 'percentage' : 'fixed amount';
  }

  changeLeadStatus(changeLeadStatus) {
    if (this.roles != 'researchAnalyst' && this.roles != 'researchManager') {
      if (this.salesLeadData.leadStatus >= changeLeadStatus) {
        Swal.fire('Cannot change');
      } else if (changeLeadStatus > 3) {
        Swal.fire('Not available for now');
      } else {
        this.confirm(changeLeadStatus);
      }
    }
  }

  confirm(changeLeadStatus) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ml-2',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: 'Change lead status to ' + stageStatusDisplay[changeLeadStatus],
        icon: 'warning',
        confirmButtonText: 'Change',
        cancelButtonText: 'No, cancel!',
        showCancelButton: true,
      })
      .then((result) => {
        if (result.value) {
          this.salesLeadData.assigneeId = this.salesLeadData.assigneeId.toString();
          this.salesLeadData.companyType = this.salesLeadData.companyType;
          this.salesLeadData.leadStatus = parseInt(this.salesLeadData.leadStatus.toString());
          this.salesLeadData.leadSource = parseInt(this.salesLeadData.leadSource.toString());
          this.salesLeadData.leadContactId = this.salesLeadData.leadContactId.toString();
          this.salesLeadData.phonecode=this.salesLeadData.phonecode;
          Object.keys(this.salesLeadData).forEach(
            (key) => this.salesLeadData[key] == null && delete this.salesLeadData[key]
          );
          this.salesLeadData.leadStatus = changeLeadStatus;
          const leadUpdateSubmit$ = this.salesLeadService.updateLeadById(this.id, this.salesLeadData);
          leadUpdateSubmit$.subscribe(
            (data: any) => {
              swalWithBootstrapButtons.fire('Updated!', 'Lead stage changed.', 'success');
              let emailVariableObj = {
                notificationType: 'skipEmail',
                emailData: EmailTitleDescription.salesleadUpdated,
              };
              // emailVariableObj['currentUser'] =  this.whoami.firstName;
              // emailVariableObj['SalesLeadLink'] =  this.whoami.firstName;

              emailVariableObj['Module'] = 'Sales' ;
              emailVariableObj['name'] = this.salesLeadData.companyName ;
              emailVariableObj['Action'] = 'Lead stage changed' ;
              emailVariableObj['Actiontype'] = 'Informative' ;
              emailVariableObj['link'] = '/sales/lead-details/' + this.id;
 
              
              this.emailService.sendEmail(
                EmailJsTemplates.salesleadUpdated,
                this.emailToSend,
                'Approval',
                emailVariableObj
              );
              this.getSalesLeadById(this.id);
            },
            (error: any) => {
              swalWithBootstrapButtons.fire('Warning', 'Lead stage not changed', 'error');
            }
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire('Cancelled', 'Lead stage not changed', 'error');
        }
      });
  }

  private createCTCForm() {
    this.billingCycleArray = billingCycleArray;
    this.currenciesList = currencies;
    this.rateTypes = options.rateTypes;

    this.CTCForm = this.formBuilder.group({
      companyName: [null, [Validators.required, Validators.minLength(3)]],
      companyType: [null, [Validators.nullValidator]],
      phoneCode: [null,[Validators.required]],
      contactNo: [null, [Validators.nullValidator]],
      email: [null, [Validators.nullValidator]],
     // fax: [null, [Validators.nullValidator]],
      addressLine1: [null, [Validators.nullValidator]],
      city: [null, [Validators.nullValidator]],
      state: [null, [Validators.nullValidator]],
      country: [null, [Validators.nullValidator]],
      zipCode: [null],

      isAgreementDone: [null, Validators.required],
      baseRate: [null, [Validators.nullValidator]],
      baseRateType: [null, [Validators.nullValidator]],
      agreementType: [null],
      serviceStartDate: [''],
      serviceEndDate: [''],
      billingCycle: [''],
      initialInvoiceDate: [''],
      packageType: [null],
      currency: [''],
     // baseCurrency: [''],
      amount: [0],
      availableCredits: [0],
      costPerCredit: [0],
      msaValue: [null, Validators.required],
      krpiAccess: [null],
      krpiEventAccessNumber: [''],
      usersPerEvent: [''],
      onDemandTopics: [''],
      preEventCounsultation: [''],
      plheadId: [null, [Validators.required]],
      accountManagerId: [null, [Validators.required]],   
      subPnlHeadId: [null, [Validators.required]],

    });
    this.CTCForm.patchValue({
      baseRateType: this.rateTypes,
      currency: this.countryCurrency,
      billingCycle: [''],//   this.billingCycleArray,
    });
  }

  openModal(content: any) {
    if (this.roles != 'researchAnalyst' && this.roles != 'researchManager') {
      this.salesLeadData['addressLine1'] = this.salesLeadData.address;

      if (this.salesLeadData.leadStatus <= 3) {
        this.modalService.dismissAll();
        this.modalService.open(content, { size: 'lg', centered: true, windowClass: 'modal-holder' });
      }
    }
  }

  applybaserate() {

   
    this.CTCForm.patchValue({
      costPerCredit: this.CTCForm.value.baseRate,
      amount: this.CTCForm.value.baseRate    
    });
   // this.CTCForm.costPerCredit = this.CTCForm.baseRate;
    //this.CTCForm.costPerCredit = this.CTCForm.baseRate;

  }
  
  convertToClient() {

  
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ml-2',
      },
      buttonsStyling: false,
    });


    if (!this.CTCForm.value.accountManagerId  ){
      alert("Account Manager is Required");
      return;
  }
  if(!this.CTCForm.value.subPnlHeadId )  {
      alert("SubPnl Head is Required");
      return;
  }
  if(!this.CTCForm.value.plheadId ) 
  {
    alert("PL Head is Required");
    return;
  }

    this.CTCForm.patchValue(this.salesLeadData);
    let CTCFormData = this.CTCForm.value;
    // CTCFormData.agreementType = this.agreementTypecheck;
    CTCFormData.isAgreementDone = CTCFormData.isAgreementDone ? true : false;
    // this.salesLeadData['isAgreementDone'] = CTCFormData.isAgreementDone;
    CTCFormData.agreementType = CTCFormData.agreementType ? 'MSA' : 'Non MSA';

    if (CTCFormData.agreementType == 'Non MSA') {
      // delete CTCFormData.serviceEndDate;
      // delete CTCFormData.currency;
      // delete CTCFormData.noOfCredits;
      // delete CTCFormData.krpiAccess;
      // delete CTCFormData.agreementType;
      delete CTCFormData.packageType;
    } else {
      CTCFormData.packageType = CTCFormData.packageType ? 'Credit' : 'Wallet';
      CTCFormData.krpiAccess = CTCFormData.krpiAccess ? true : false;
      CTCFormData.onDemandTopics = CTCFormData.onDemandTopics ? 1 : 0;
      CTCFormData.preEventCounsultation = CTCFormData.preEventCounsultation ? 1 : 0;
    }
    if (CTCFormData.packageType != 'Credit') {
      delete CTCFormData.noOfCredits;
      delete CTCFormData.costPerCredit;
      delete CTCFormData.msaValue;
    } else {
      CTCFormData.amount = CTCFormData.amount;
      CTCFormData.currency = CTCFormData.currency;
    }

    if (CTCFormData.krpiAccess != true) {
      delete CTCFormData.krpiEventAccessNumber;

      delete CTCFormData.usersPerEvent;

      delete CTCFormData.onDemandTopics;
      delete CTCFormData.preEventCounsultation;
    }
    CTCFormData.url = this.salesLeadData?.url;
    CTCFormData.salesLeadId = this.id;
    CTCFormData.leadSource = this.salesLeadData?.leadSource;
    CTCFormData.assigneeId = this.salesLeadData?.assigneeId;
    CTCFormData.msaValue = CTCFormData.msaValue;
    CTCFormData['leadContactId'] = this.salesLeadData?.leadContactId;
   // CTCFormData['leadContactId'] = this.salesLeadData?.leadContactId;
    CTCFormData['timeZone'] = moment(CTCFormData.serviceEndDate).format('Z');
    CTCFormData['attachments'] = this.salesLeadData?.attachments;
    CTCFormData['salesassociates'] = this.salesLeadData?.salesassociates;
    CTCFormData.phoneCode=this.salesLeadData?.phonecode;
    Object.keys(CTCFormData).forEach(
      (key) => (CTCFormData[key] == null || CTCFormData[key] == '') && delete CTCFormData[key]
    );

    let emp4mail = this.empList.find((x) => x.userId == CTCFormData.assigneeId);
    
    this.emailToSend=[];

    if (emp4mail?.email) {
     this.emailToSend.push(emp4mail.email);
    }


   // plheadId: [null, [Validators.required]],
   // accountManagerId: [''],   
   // subPnlHeadId: [null],
   let emp4mail1 = this.empList.find((x) => x.userId == CTCFormData.plheadId);
   
    if (emp4mail1?.email) {
     this.emailToSend.push(emp4mail1.email);
    }
    let emp4mail2 = this.empList.find((x) => x.userId == CTCFormData.accountManagerId);
   
    if (emp4mail2?.email) {
     this.emailToSend.push(emp4mail2.email);
    }

    let emp4mail3 = this.empList.find((x) => x.userId == CTCFormData.subPnlHeadId);
   
    if (emp4mail3?.email) {
     this.emailToSend.push(emp4mail3.email);
    }

    


    this.clientUserData.push({
        id:this.salesLeadContact.id,
      name: this.salesLeadContact.name,
      designation: this.salesLeadContact .designation,
      mobile: this.salesLeadContact .contactNo,
      linkedinurl: this.salesLeadContact.linkedinurl,
      email: this.salesLeadContact .email, 
      notes: this.salesLeadContact.notes[0]?.["note"],                   
      updatedAt: new Date(),
    })


    this.allContactPersons?.forEach((x) => {
      
      this.clientUserData.push({
        id:x.id,
        name: x.name,
        designation: x.designation,
        mobile: x.contactNo,
        email: x.email, 
        linkedinurl: x.linkedinurl,
        notes: x.notes[0]?.note,                   
        updatedAt: new Date(),
      })


    });

    this.emailToSend.push("compliance@knowledgeridge.com");


    CTCFormData['clientUser'] = this.clientUserData;

//"clientUser": [   {}],
//"salesassociates": [   "string"],
// "attachments": [   {}],

console.log(CTCFormData)

    const CTCFormDataSubmit$ = this.clientsService.create(CTCFormData);

    CTCFormDataSubmit$.subscribe(
      (data: any) => {
        this.salesLeadData.assigneeId = this.salesLeadData?.assigneeId;
        this.salesLeadData.leadSource = this.salesLeadData?.leadSource;
        Object.keys(this.salesLeadData).forEach(
          (key) => this.salesLeadData[key] == null && delete this.salesLeadData[key]
        );

        let clientId = data.id;
        this.salesLeadData.leadStatus = 4;
        // this.salesLeadData.updatedAt = new Date().toString();

        const leadUpdateSubmit$ = this.salesLeadService.updateLeadById(this.id, this.salesLeadData);
        leadUpdateSubmit$.subscribe(
          (data: any) => {
            this.modalService.dismissAll();
            swalWithBootstrapButtons.fire('Updated!', 'Lead Converted.', 'success');
            //Email Notification
            let emailVariableObj = {};
            emailVariableObj = {
              currentUser: this.whoami.firstName,
              ClientLink: window.location.origin + '/clients/show/' + clientId,
              emailData: EmailTitleDescription.statusChangeToClient,
            };

            emailVariableObj['Module'] = 'Sales' ;
            emailVariableObj['name'] = this.salesLeadData.companyName ;
            emailVariableObj['Action'] = 'Lead Converted To Client' ;
            emailVariableObj['Actiontype'] = 'Informative' ;
            emailVariableObj['link'] = '/clients/show/' + clientId;

         

            this.emailService.sendEmail(
              EmailJsTemplates.statusChangeToClient,
              this.emailToSend,
              'Informative',
              emailVariableObj
            ); 
            const anchorElement = document.querySelector('.side-nav-link-ref.nav-link.menu-link') as HTMLAnchorElement;
           if (anchorElement) {
                anchorElement.click();
            }
            //window.location.reload();
            this.router.navigate(['client/clientlist', '']);
           // this.router.navigate(['clients/show/', clientId]);
            // this.getSalesLeadById(this.id);
          },
          (error: any) => {
            swalWithBootstrapButtons.fire('Warning', 'Lead stage not changed', 'error');
          }
        );
      },
      (error: any) => {
        this.error = error;
      }
    );
  }

  toggleVisibility(e) {
    if (e.target.checked == true) {
      this.agreementTypecheck = 'MSA';
    } else {
      this.agreementTypecheck = 'Non MSA';
    }
  }

  deleteLead() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger ml-2',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: 'Delete Lead?',
        icon: 'warning',
        confirmButtonText: 'Change',
        cancelButtonText: 'No, cancel!',
        showCancelButton: true,
      })
      .then((result) => {
        if (result.value) {
          const leadUpdateSubmit$ = this.salesLeadService.deleteLeadById(this.id);
          leadUpdateSubmit$.subscribe(
            (data: any) => {
              const leadContactDelete$ = this.salesLeadContactService.delete(this.salesLeadContact.id);
              leadContactDelete$.subscribe(
                (data: any) => {
                  swalWithBootstrapButtons.fire('Success!', 'Lead deleted successfully.', 'success');
                  this.router.navigate(['/sales/sales-board']);
                },
                (error: any) => {}
              );
            },
            (error: any) => {
              swalWithBootstrapButtons.fire('Warning', 'Lead not deleted', 'error');
            }
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire('Cancelled', 'Lead not deleted', 'error');
        }
      });
  }

  // Attachments Starts
  onSelect(event) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  mediaUploaded($event) {
    this.mediaData.attachments.push($event);
    this.updateOnServer(this.mediaData);
  }

  // Update media data on server
  private updateOnServer(updateData: any) {
    this.salesLeadService.updateOnly(this.id, updateData).subscribe(
      (response) => {
        this.isLoading = false;
      },
      (error) => {
        log.error(error);
        this.error = error;
        this.isLoading = false;
      }
    );
  }
  // Attachments Ends

  getUsers() {

    const filters = new Map();
    const filter = {};
    filters.set('filter', JSON.stringify(filter));

    this.userService.getUsers(filters).subscribe(
      (userArray: any) => {
        this.usersArray = userArray;
      },
      (error: any) => {}
    );
  }

  getCompanyType(companyType) {
    if (companyType != null && this.companyType != undefined) {
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

    let clientatchEdit = this.salesLeadData.attachments?.find((x) => x["filename"] == name);

    console.log('removeattachment  0',this.salesLeadData.attachments);


    if (clientatchEdit)
    {
      console.log('removeattachment  1');
  let index = this.salesLeadData.attachments.indexOf(clientatchEdit);

  console.log(index);

    this.salesLeadData.attachments.splice(index, 1);

    const leadUpdateSubmit$ = this.salesLeadService.updateLeadById(this.id, this.salesLeadData);
    leadUpdateSubmit$.subscribe(
      (data1: any) => {
       
      
        this.getSalesLeadById(this.id);
      },
      (error: any) => {
      //  swalWithBootstrapButtons.fire('Warning', 'Lead stage not changed', 'error');
      }
    );
    }

  }
  getSalesLeadById(id: string) {
    this.isLoading = true;
    this.salesLeadService.getLeadById(id).subscribe(
      (salesLeadData: SalesLead) => {
        //this.getSalesLeadsContacts(salesLeadData);
console.log('salesLeadData',salesLeadData);
        this.salesLeadData = salesLeadData;
        this.getMultipleLeadcontact(this.salesLeadData);
        let salesOwner = this.empList.find((x) => x.userId == salesLeadData?.assigneeId);
        //get email id of reporting manager
        this.reportingMgrEmail = this.empList.find((x) => x.repotingManagerId == salesOwner?.repotingManagerId);
        this.emailToSend = [];
        if (this.reportingMgrEmail?.email) {
          this.emailToSend.push(this.reportingMgrEmail?.email);
        }
        let arrOfEMpIds = [];
        let convertToClientEmail = [];

        let selectedEmailPeople = this.empList?.filter((e) => arrOfEMpIds.indexOf(e.userId) != -1);
        convertToClientEmail = selectedEmailPeople?.map((a) => a?.email);
        convertToClientEmail.push(this.empList?.find((x) => x.designation == 3)?.email);
        convertToClientEmail.push(this.empList?.find((x) => x.designation == 12)?.email);

        this.emailToSend = this.emailToSend.concat(convertToClientEmail);
        let updateDate: Date = new Date(salesLeadData.updatedAt);
        let currentDate: Date = new Date(this.today);
        this.daysDiff = Math.floor(
          (Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) -
            Date.UTC(updateDate.getFullYear(), updateDate.getMonth(), updateDate.getDate())) /
            (1000 * 60 * 60 * 24)
        );
        this.mediaData.attachments = salesLeadData.attachments || [];
        this.getSalesLeadContactById(salesLeadData.leadContactId);
        this.isLoading = false;
      },
      (error: any) => {
        this.isLoading = false;
      }
    );
  }



  UpdateAttachments(id: string) {
    this.isLoading = true;
    this.salesLeadService.getLeadById(id).subscribe(
      (salesLeadData: SalesLead) => {
        //this.getSalesLeadsContacts(salesLeadData);
console.log('salesLeadData',salesLeadData);
        this.salesLeadData = salesLeadData;
        this.getMultipleLeadcontact(this.salesLeadData);
        let salesOwner = this.empList.find((x) => x.userId == salesLeadData?.assigneeId);
        //get email id of reporting manager
        this.reportingMgrEmail = this.empList.find((x) => x.repotingManagerId == salesOwner?.repotingManagerId);
        this.emailToSend = [];
        if (this.reportingMgrEmail?.email) {
          this.emailToSend.push(this.reportingMgrEmail?.email);
        }
        let arrOfEMpIds = [];
        let convertToClientEmail = [];

        let selectedEmailPeople = this.empList?.filter((e) => arrOfEMpIds.indexOf(e.userId) != -1);
        convertToClientEmail = selectedEmailPeople?.map((a) => a?.email);
        convertToClientEmail.push(this.empList?.find((x) => x.designation == 3)?.email);
        convertToClientEmail.push(this.empList?.find((x) => x.designation == 12)?.email);

        this.emailToSend = this.emailToSend.concat(convertToClientEmail);
        let updateDate: Date = new Date(salesLeadData.updatedAt);
        let currentDate: Date = new Date(this.today);
        this.daysDiff = Math.floor(
          (Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) -
            Date.UTC(updateDate.getFullYear(), updateDate.getMonth(), updateDate.getDate())) /
            (1000 * 60 * 60 * 24)
        );
        this.mediaData.attachments = salesLeadData.attachments || [];
        this.getSalesLeadContactById(salesLeadData.leadContactId);
        this.isLoading = false;
      },
      (error: any) => {
        this.isLoading = false;
      }
    );
  }


  getMultipleLeadcontact(salesLeadData) {
    this.allContactPersons = [];
    salesLeadData?.additionalLeadContactIds?.forEach((x) => {
      this.salesLeadContactService.show(x).subscribe((salesLeadContact: SalesLeadContact) => {
        let contactPerson = salesLeadContact;
        this.allContactPersons.push(contactPerson);
      });
    });
  }
  getSalesLeadContactById(id: string) {
    this.salesLeadContactService.show(id).subscribe(
      (salesLeadContact: SalesLeadContact) => {
        this.salesLeadContact = salesLeadContact;
        console.log("this.salesLeadContact",this.salesLeadContact)
      },
      (error: any) => {}
    );
  }

  //Comments sservice section
  getSalesLeadComments() {
    const filters = new Map();
    const filter = { where: { salesLeadId: this.id } };
    filters.set('filter', JSON.stringify(filter));
    this.salesLeadCommentService.getAll(filters).subscribe(
      (data) => {
        this.salesLeadComments = data;
      },
      (error: string) => {
        log.error('comments:', error);
      }
    );
  }

  addNote() {
    this.addnote = true;
  }

  checkNumber(event) {
    let re = new RegExp('^[0-9]*$');
    if (re.test(event.target.value)) {
      this.validNumberString = '';
      this.convertBtn = false;
    } else {
      this.validNumberString = 'Please enter valid KRPL event access number';
      this.convertBtn = true;
    }
  }
}
