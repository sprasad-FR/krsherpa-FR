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






@Component({
  selector: 'app-saleslead',
  templateUrl: './saleslead.component.html',
  styleUrls: ['./saleslead.component.scss'],
  providers: [DateToLocalPipe],
})

/**
 * Starter Component
 */
export class SalesleadComponent implements OnInit {

  validationMsgDiv:boolean=false;
  error: any | undefined;
  breadCrumbItems: Array<{}>;
  leadForm: FormGroup;
  leadContactGroup: FormGroup;
  companyType: CompanyType[];
  LeadReference: any[];
  stageStatus: Stages[];
  EmailJsTemplates: object;
  leadSourceArray: LeadSource[];
  salesLeadData: any;
  salesLeadContact: SalesLeadContact;
  id: string;
  pageTitle: string;
  companies: any = [];
  companyExist = '';
  isLoading: boolean = false;
  btnName: string;
  usersArray: Users[];
  empList: any[];
  empActiveList: any[];
  emailToSend: any[];
  reportingMgrEmail: any;
  employeeList: any[];
  bdp: any;
  countryArray: any[];
  stateArray: any[];
  cityList: any[];
  countryISO: any;
  notes: any[];
  leadContactNo: SalesLeadContact[];
  numberExist: string = '';
  emailReceiver: any;
  leadStatus: number;
  salesOwner: string;
  whoaim: any;
  selectedSalesOwner: employeeUser;
  public Editor = ClassicEditor;
  submitBtn: boolean = false;
  allContactPersons: any;
  secondaryLeadContact: FormGroup;
  secondaryData: SalesLeadContact;
  secondaryId: string;
  convertBtn: boolean = false;
  CTCForm: FormGroup;
  @Input() itemid: string='';
  @Input() readonly: boolean=false;
  whoami: any = [];
  billingCycleArray: Array<{}>;
  countryCurrency: CountryCurrency[];
  rateTypes: any[];
  clientUserData: any;
  alreadyExist: string = '';


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

  localstorageEmp: any;

  currentUser: employeeUser;

  roles: string;

   // Variable to store shortLink from api response
    shortLink: string = "";
    loading: boolean = false; // Flag variable
    file: File = null; // Variable to store file




  constructor(
     private modalService: NgbModal,
    private readonly companyTypeService: CompanyTypeService,
    private readonly userService: UserService,
    private readonly salesLeadService: SalesLeadService,
    private readonly salesLeadContactService: SalesLeadContactService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toasterService: ToastService,
    private bdpservice: BdpService,
    private ipvservice: IPVService,
    private fileuploadService: FileUploadService,

    private salesLeadCommentService: SalesLeadCommentService,
    private clientsService: ClientsService,
  
  //  private http: HttpClient,
    private employeeService: EmployeeService,
    private emailService: EmailService
  ) {

    this.createCTCForm();
    this.isLoading = true;
    this.getCountry();
    this.whoaim = JSON.parse(localStorage.getItem('user'));
    this.empList = JSON.parse(window.localStorage.getItem('emp'));
    this.clientUserData =[];
    console.log("employelist", this.empList)
    this.empActiveList = JSON.parse(window.localStorage.getItem('empActive'));
    console.log("employelist", this.empActiveList)
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Dashboard', path: 'dashboard', redirectTo: '/dashboard' },
      { label: 'Sales', active: true },
    ];
    this.pageTitle = 'CREATE A NEW LEAD';
    this.btnName = 'Save';
    this.leadStatus = stageStatus[0].id;


    if ( this.itemid && this.itemid !='')
    {
    this.id =this.itemid ;//  this.route.snapshot.paramMap.get('id')!;
    }
    else{
     this.id = this.route.snapshot.paramMap.get('id');
    }



    if (this.empList) {
      let reportingMgr = this.empList?.find((x) => x.userId == this.whoaim?.id);
      //get email id of reporting manager
      this.reportingMgrEmail = this.empList?.find((x) => x.repotingManagerId == reportingMgr?.repotingManagerId);
    }

    this.emailToSend = [];
    if (this.reportingMgrEmail?.email) {
      this.emailToSend.push(this.reportingMgrEmail?.email);
    }
    //get higher designation employees
    let employees = this.empList?.filter((x) => x.designation > this.selectedSalesOwner?.designation);
    for (let i = 0; i < employees.length; i++) {
      this.emailToSend.push(employees[i].email);
    }
    // (error: any) => {}

    this.getBDP();
    this.fetchData();
  }

  numericOnly(event): boolean {
    let patt = /^([0-9])$/;
    let result = patt.test(event.key);
    return result;
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
  keyAccountMgrList: any;
  filetype: any="";
  pnlHeadList: any;
  subPnlHeadList: employeeUser[];

  applybaserate() {

   
    this.CTCForm.patchValue({
      costPerCredit: this.CTCForm.value.baseRate,
      amount: this.CTCForm.value.baseRate    
    });
   // this.CTCForm.costPerCredit = this.CTCForm.baseRate;
    //this.CTCForm.costPerCredit = this.CTCForm.baseRate;

  }


  files: File[] = [];
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
  setEndDate(event) {
    this.startDate = event.target.value;
  }
  setInvoiceDate(event) {
    this.endDate = event.target.value;
  }
  aphSearchFn(term: string, item) {
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


hrefMatch:string="";

isContactnoValid:boolean=true;
isAlterNatenoValid:boolean=true;

isMail1Valid:boolean=true;
isMail2Valid:boolean=true;
isContactnoCodeValid:boolean=true;

checkPhone(Code,event,id) {

  let email = event.target.value.trim();

 

//alternatePhoneCountryCode
 


  var res;

  res=this.ipvservice.CheckIP( Code,email )


console.log(res);
if (!res.isValid)
{
  //this.leadFormGrp.controls['alternatePhone'].setErrors({'incorrect': true});
 // this.leadFormGrp.controls['alternatePhone'].setErrors

//  this.isContactnoValid=true;
console.log(this.isContactnoValid);
document.getElementById(id).style.display = 'block';
document.getElementById(id).innerText = 'Please enter valid mobile number';
this.submitBtn = true;
 return false;
}



  
return true;
}





getCountry() {
  this.countryArray = Country?.getAllCountries();
  console.log(this.countryArray );
  this.countryArray.forEach((element) => {
    element['label'] = element.name + ' ' + element.phonecode;
  });
}

// Open client user form modal
  createClientPOC(clientUserFormModal: any) {
   // this.idforCompliance = saleid;

    this.modalService.open(clientUserFormModal, { size: 'lg', windowClass: 'modal-holder' });
  }
  CountryId(event) {
    this.countryISO = event.isoCode;
    this.stateArray = State.getStatesOfCountry(this.countryISO);
  }

  StateId(event) {
    const stateISO = event.isoCode;
    this.cityList = City.getCitiesOfState(this.countryISO, stateISO);
  }

  getBDP() {
    this.bdpservice.getAll().subscribe(
      (bdpArray: any) => {
        this.bdp = bdpArray;
      },
      (error: any) => {}
    );
  }
  /**
   * Cart data fetch
   */
  private fetchData() {
   // this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.pageTitle = 'UPDATE LEAD';
      this.btnName = 'Update';
      //GetData
      this.getSalesLeadById(this.id);
    }
    this.getUsers();
    this.getComapnyTypes();
    this.getCompanyNames();
    this.getLeadContact();
    this.stageStatus = stageStatus;
    this.leadSourceArray = leadSourceArray;
    this.createForm();
    this.selectedSalesOwner = this.empList?.find((x) => x.userId == this.whoaim?.id);
    this.leadForm.patchValue({
      assigneeId: this.selectedSalesOwner.userId,
    });
  }

  getUsers() {

    const filters = new Map();
    const filter = {};
    filters.set('filter', JSON.stringify(filter));

    this.userService.getUsers(filters).subscribe(
      (usersArray: any) => {
        this.usersArray = usersArray;
      },
      (error: any) => {}
    );
  }

  showLeadReference(event) {
    if (event == 3) {
      this.LeadReference = this.empList;
    }
    if (event == 4) {
      this.LeadReference = this.bdp;
    }
    this.leadForm.patchValue({
      leadReference: this.LeadReference,
    });
  }

  getComapnyTypes() {
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

  private getLeadContact() {
    const filters = new Map();
    const filter = { fields: { contactNo: true, alternateMobile: true } };
    filters.set('filter', JSON.stringify(filter));
    this.salesLeadContactService.getAll(filters).subscribe(
      (data) => {
        this.leadContactNo = data;
      },
      (error: any) => {}
    );
  }

  getSalesLeadById(id: string) {

    this.salesLeadService.getLeadById(id).subscribe(
      (salesLeadData: SalesLead) => {
        this.salesLeadData = salesLeadData;
        this.showLeadReference(this.salesLeadData?.leadSource);
console.log(this.salesLeadData);
        this.leadForm.patchValue(this.salesLeadData);
        this.getSalesLeadContactById(salesLeadData?.leadContactId);

this.readonly= false;// !((this.whoaim.id===this.salesLeadData.assigneeId)|| this.salesLeadData ;


      },
      (error: any) => {}
    );

  }

  getSalesLeadContactById(id: string) {
    this.salesLeadContactService.show(id).subscribe(
      (salesLeadContact: SalesLeadContact) => {
        this.salesLeadContact = salesLeadContact;
        console.log(this.salesLeadContact);
        this.salesLeadContact.notes=salesLeadContact?.notes[0]["note"];
        // let noteArray =  this.salesLeadContact?.notes[0];
        this.leadForm.patchValue({ leadContactGroup: salesLeadContact });
       // this.leadForm.patchValue({ leadContactGroup.notes: this.secondaryData.notes?.[0]["note"] });
        // this.notes = noteArray?.note;
        this.getMultipleLeadcontact();
      },
      (error: any) => {}
    );
  }
  getMultipleLeadcontact() {
    this.allContactPersons = [];
    this.salesLeadData?.additionalLeadContactIds?.forEach((x) => {
      this.salesLeadContactService.show(x).subscribe((salesLeadContact: SalesLeadContact) => {
        let contactPerson = salesLeadContact;
        this.allContactPersons.push(contactPerson);
      });
    });
  }

  private createForm() {
    this.leadForm = this.formBuilder.group({
      companyName: ['', [Validators.required, Validators.minLength(3)]],
      companyType: ['', [Validators.required]],
      phonecode: ['', [Validators.required]],
      contactNo: ['', [Validators.required]],
      email: ['', [Validators.required]],
     // fax: [null],
      address: [''],
      city: [''],
      state: [''],
      country: [''],
      zipCode: [''],
      leadStatus: [1],
      labels: [''],
      assigneeId: ['', [Validators.required]],
      salesassociates: [[]],   
      secondary_assigneeId1: [''],
      secondary_assigneeId2: [''],
      salesOwner: [''],
      salesOwnerName: [''],
      leadSource: [''],
      leadReference: [''],
      leadContactId: [''],
      description: [''],
      attachments: [[]],   
      url: [''],
      leadContactGroup: this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(5)]],
        email: ['', [Validators.required]],
        primary_phonecode: ['', [Validators.required]],
        contactNo: ['', [Validators.required]],
        linkedinurl: [''],
        alternateMobile: [''],
        designation: ['', [Validators.required, Validators.minLength(2)]],
        notes: [''],
      }),
    });
   // CTCFormData['attachments'] = this.salesLeadData?.attachments;
   // CTCFormData['salesassociates'] = this.salesLeadData?.salesassociates;
    this.secondaryLeadContact = this.formBuilder.group({
      name: [''],
      email: [''],
      primary_phonecode: [''],
      designation: [''],
      contactNo: [''],
      linkedinurl: [''],
      alternateMobile: [''],
      notes: [''],
    });
    
   /* this.leadForm.patchValue({
      companyType: this.companyType,
      country: this.countryArray[0],
      state: this.stateArray,
      leadStatus: this.leadSourceArray[0].id,
      leadSource: this.stageStatus[0],
    });  */
    this.isLoading = false;
  }
  secphcode:any;
  secphcode1:any;
  secphcode2:any;
  onKeypressEvent(event: any) {
    let companyName = event.target.value;
    const companyMatch = this.companies.filter((x) => x.companyName == companyName);
    if (companyMatch.length > 0) {
      this.companyExist = 'Comapany Already Exist';
      this.submitBtn = true;
    } else {
      this.companyExist = '';
      this.submitBtn = false;
    }
  }

  checkNumber(event) {
    let number = event.target.value;
    const numberMatch = this.leadContactNo.filter((x) => x.contactNo == number || x.alternateMobile == number);
    if (numberMatch.length) {
      this.numberExist = 'Number Alredy Exist';
      this.submitBtn = true;
    } else {
      this.numberExist = '';
      this.submitBtn = false;
    }






  }


  
  private createCTCForm() {
    this.billingCycleArray = billingCycleArray;
    this.currenciesList = currencies;
    this.rateTypes = options.rateTypes;

    this.CTCForm = this.formBuilder.group({
      companyName: [null, [Validators.required, Validators.minLength(3)]],
      companyType: [null, [Validators.nullValidator]],
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




  checkEmail(event, id) {
    let value = event.target.value;
    if (value != undefined || value != null || value != '') {
      let re = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');
      if (re.test(event.target.value)) {
        this.submitBtn = false;
        document.getElementById(id).style.display = 'none';
      } else {
        document.getElementById(id).style.display = 'block';
        document.getElementById(id).innerText = 'Please enter valid email id';
        this.submitBtn = true;
      }
    } else {
      document.getElementById(id).innerText = 'Please enter valid email id';
    }
  }

  checkMobileNumber(event, id) {
    let value = event.target.value;
    if (value != undefined || value != null || value != '') {
      var re = new RegExp('^[0-9]*$');
      if (re.test(event.target.value)) {
        document.getElementById(id).style.display = 'none';
        this.submitBtn = false;
      } else {
        document.getElementById(id).style.display = 'block';
        document.getElementById(id).innerText = 'Please enter valid mobile number';
        this.submitBtn = true;
      }
    } else {
      document.getElementById(id).innerText = 'Please enter mobile number';
    }





  }
  private createForm1() {
    this.leadForm = this.formBuilder.group({
      ...this.salesLeadData,
      leadContactGroup: this.formBuilder.group({}),
    });
  }

  getReferenceName(event) {
    this.emailReceiver = event.email;
  }

  submitData() {


    const leadContactGroup = this.leadForm.value.leadContactGroup;
    let notesArray = [];
    notesArray.push({ note: leadContactGroup.notes });
    leadContactGroup['notes'] = [{ note: leadContactGroup.notes }];
    //  [ {
    //     note: leadContactGroup.notes,
    //   }]

    //Validation on previous leadstatus
    if (
      (this.salesLeadData &&
        this.salesLeadData.leadStatus &&
        this.salesLeadData.leadStatus > parseInt(this.leadForm.value.leadStatus)) ||
      !this.leadForm.value.leadStatus
    ) {
      Swal.fire('Lead status should be higher');
      return;
    }
    log.info(leadContactGroup);

   // if (this.leadForm.valid) {
      this.isLoading = true;

      //ParseInt
      this.leadForm.value.assigneeId = this.leadForm.value.assigneeId;
      this.leadForm.value.secondary_assigneeId1 = this.leadForm.value.secondary_assigneeId1;
      this.leadForm.value.secondary_assigneeId2 = this.leadForm.value.secondary_assigneeId2;
      this.leadForm.value.companyType = this.leadForm.value.companyType;
      this.leadForm.value.leadStatus = parseInt(this.leadForm.value.leadStatus);
      if(this.leadForm.value.leadSource!='')
        this.leadForm.value.leadSource = parseInt(this.leadForm.value.leadSource);

      this.leadForm.value.salesOwnerName = this.empList?.find((x) => x.userId == this.leadForm.value.assigneeId).name;

      //validation logic
      if(this.leadForm.value.companyName=='' || this.leadForm.value.companyType=='' ||
        this.leadForm.value.contactNo=='' || this.leadForm.value.country=='' ||
        this.leadForm.value.address=='' || this.leadForm.value.email=='' || this.leadForm.value.leadSource=='' ||
        this.leadForm.value.leadContactGroup.name=='' || this.leadForm.value.leadContactGroup.email=='' ||
        this.leadForm.value.leadContactGroup.designation=='' || this.leadForm.value.leadContactGroup.contactNo=='' ||
        this.leadForm.value.salesassociates.length==0 || this.leadForm.value.leadContactGroup.notes[0].note==''
      ){
        this.validationMsgDiv =true;
        if(this.validationMsgDiv)
          return;
      }
     
      Object.keys(this.leadForm.value).forEach(
        (key) => this.leadForm.value[key] == null && delete this.leadForm.value[key]
      );
  //    delete this.leadForm.value.leadContactGroup;

      let leadContactSubmit$;
 //     Object.keys(leadContactGroup).forEach((key) => leadContactGroup[key] == null && delete leadContactGroup[key]);

      if (leadContactGroup?.id) {
        //Update service call
        leadContactSubmit$ = this.salesLeadContactService.update(leadContactGroup.id, leadContactGroup).subscribe((data: any) => {
          //Submit Lead details
          this.updateOrSaveSLData(data);
        });
      } else {
        //Create new lead

        leadContactSubmit$ = this.salesLeadContactService.create(leadContactGroup).subscribe((data: any) => {
          //Submit Lead details
          this.updateOrSaveSLData(data);
        });
      }

      // leadContactSubmit$.subscribe((data: any) => {
      //   //Submit Lead details
      //   let leadSubmit$;
      //   if (this.id) {
      //     //Update service call
      //     this.leadForm.value.leadContactId = data.id;
      //     this.leadForm.value.additionalLeadContactIds = this.salesLeadData.additionalLeadContactIds;
      //     leadSubmit$ = this.salesLeadService.updateLeadById(this.id, this.leadForm.value);
      //   } else {
      //     //Create new lead
      //     this.leadForm.value.leadContactId = data.id;
      //     leadSubmit$ = this.salesLeadService.createNewLead(this.leadForm.value);
      //   }
      //   leadSubmit$.subscribe(
      //     (response) => {
      //       log.debug('response: ', response);

      //       this.isLoading = false;
      //       this.router.navigate(['/sales/sales-board']);
      //       this.toasterService.success('Lead updated successfully.', 'Success!');
      //       //email notification
      //       let emailVariableObj = {
      //         currentUser: this.whoaim.firstName,
      //         SalesLeadLink: window.location.origin + '/lead-details/' + this.id,

      //         emailData: EmailTitleDescription.salesleadSaved,
      //       };


      //         emailVariableObj['Module'] = 'Sales' ;
      //         emailVariableObj['name'] = this.salesLeadData?.companyName ;
      //         emailVariableObj['Action'] = 'Lead created' ;
      //         emailVariableObj['Actiontype'] = 'Informative' ;
      //         emailVariableObj['link'] = 'sales/lead-details/' + this.id;


      //       this.emailService.sendEmail(
      //         EmailJsTemplates.salesleadSaved,
      //         this.emailToSend,
      //         'Informative & approval',
      //         emailVariableObj
      //       );
      //       if (this.leadForm.value.leadSource == '4') {
      //         let emailVariableObj = {};
      //         emailVariableObj['name'] = this.leadForm.value['leadSource'].text;
      //         emailVariableObj['BDPLink'] = this.whoaim.firstName;
      //         emailVariableObj['notificationType'] = 'skipEmail';
          

      //         emailVariableObj['Module'] = 'Sales' ;
      //         emailVariableObj['name'] = this.leadForm.value['leadSource'].text;
      //         emailVariableObj['Action'] = 'BDP Attached' ;
      //         emailVariableObj['Actiontype'] = 'Informative' ;
      //         emailVariableObj['link'] = 'sales/lead-details/' + this.id;



      //         this.emailToSend.push(this.emailReceiver);
      //         this.emailService.sendEmail(
      //           EmailJsTemplates.BDPattached,
      //           this.emailToSend,
      //           'Informative',
      //           emailVariableObj
      //         );
      //       }
      //       window.location.reload();

      //       this.router.navigate(['salesleads/mysales', '']);  //salesleads/mysales
      //       this.modalService.dismissAll();

      //     },
      //     (error) => {
      //       log.info(`Create Lead error: ${error}`, error);
      //       this.error = error;
      //       this.isLoading = false;
      //       log.debug('Not Created');
      //     }
      //   );
      // });
   /* }
    else{

      console.log(this.leadForm.valid)
    }  */
  }

  cancelForm() {
    this.router.navigate(['/sales/sales-board']);
  }

  updateOrSaveSLData(data){
    let leadSubmit$;
    if (this.id) {
      //Update service call
      this.leadForm.value.leadContactId = data.id;
      this.leadForm.value.additionalLeadContactIds = this.salesLeadData.additionalLeadContactIds;
      leadSubmit$ = this.salesLeadService.updateLeadById(this.id, this.leadForm.value);
    } else {
      //Create new lead
      this.leadForm.value.leadContactId = data.id;
      leadSubmit$ = this.salesLeadService.createNewLead(this.leadForm.value);
    }
    leadSubmit$.subscribe(
      (response) => {
        log.debug('response: ', response);

        this.isLoading = false;
        this.router.navigate(['/sales/sales-board']);
        this.toasterService.success('Lead updated successfully.', 'Success!');
        //email notification
        let emailVariableObj = {
          currentUser: this.whoaim.firstName,
          SalesLeadLink: window.location.origin + '/lead-details/' + this.id,

          emailData: EmailTitleDescription.salesleadSaved,
        };


          emailVariableObj['Module'] = 'Sales' ;
          emailVariableObj['name'] = this.salesLeadData?.companyName ;
          emailVariableObj['Action'] = 'Lead created' ;
          emailVariableObj['Actiontype'] = 'Informative' ;
          emailVariableObj['link'] = 'sales/lead-details/' + this.id;


        this.emailService.sendEmail(
          EmailJsTemplates.salesleadSaved,
          this.emailToSend,
          'Informative & approval',
          emailVariableObj
        );
        if (this.leadForm.value.leadSource == '4') {
          let emailVariableObj = {};
          emailVariableObj['name'] = this.leadForm.value['leadSource'].text;
          emailVariableObj['BDPLink'] = this.whoaim.firstName;
          emailVariableObj['notificationType'] = 'skipEmail';
      

          emailVariableObj['Module'] = 'Sales' ;
          emailVariableObj['name'] = this.leadForm.value['leadSource'].text;
          emailVariableObj['Action'] = 'BDP Attached' ;
          emailVariableObj['Actiontype'] = 'Informative' ;
          emailVariableObj['link'] = 'sales/lead-details/' + this.id;



          this.emailToSend.push(this.emailReceiver);
          this.emailService.sendEmail(
            EmailJsTemplates.BDPattached,
            this.emailToSend,
            'Informative',
            emailVariableObj
          );
        }
        window.location.reload();

        this.router.navigate(['salesleads/mysales', '']);  //salesleads/mysales
        this.modalService.dismissAll();

      },
      (error) => {
        log.info(`Create Lead error: ${error}`, error);
        this.error = error;
        this.isLoading = false;
        log.debug('Not Created');
      }
    );
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
            swalWithBootstrapButtons.fire('Updated!', 'Converted To Client.', 'success');
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
            this.router.navigate(['client/clientlist', '']);  //salesleads/mysales
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


  openCTC(content:any) {
    // this.submitted = false;
   // this.modalService.dismissAll;
     this.modalService.open(content, { size: 'lg', centered: true });
    // var modelTitle = document.querySelector('.modal-title') as HTMLAreaElement;
    // modelTitle.innerHTML = 'Edit Order';
    // var updateBtn = document.getElementById('add-btn') as HTMLAreaElement;
    // updateBtn.innerHTML = "Update";
 
   
     
   }

  saveSecondaryData() {

    console.log('saveSecondaryData')
    let secondaryLeadContactData = this.secondaryLeadContact.value;
    let contactPersonNotes = [];
    contactPersonNotes.push({ note: secondaryLeadContactData.notes });
    secondaryLeadContactData['notes'] = [{ note: secondaryLeadContactData.notes }];   // gs contactPersonNotes;
    //secondaryLeadContactData[''];
    if (this.secondaryId) {
      this.salesLeadContactService.update(this.secondaryId, secondaryLeadContactData).subscribe((response) => {
        log.debug('response: ', response);
        this.isLoading = false;
        this.getMultipleLeadcontact();
        this.secondaryLeadContact.reset();
        this.modalService.dismissAll();
        this.getSalesLeadById(this.id);
      });
    } else {
      this.salesLeadContactService.create(secondaryLeadContactData).subscribe(
        (data) => {
          let additionalLeadContactIds = this.salesLeadData.additionalLeadContactIds;
          if (!additionalLeadContactIds) {
            additionalLeadContactIds = [];
          }
          additionalLeadContactIds.push(data?.id);
          let newContactPerson: any = {
            additionalLeadContactIds: additionalLeadContactIds,
          };
          this.salesLeadService.updateOnly(this.id, newContactPerson).subscribe(
            (res) => {
              this.getMultipleLeadcontact();
              this.secondaryLeadContact.reset();
               this.modalService.dismissAll();
               this.getSalesLeadById(this.id);
            },
            (error: any) => {}
          );
        },
        (error: any) => {}
      );
     // this.modalService.dismissAll();
    }
  }
 


  edit(salesContactId,clientUserFormModal: any) {
    this.secondaryId = salesContactId;
    this.salesLeadContactService.show(this.secondaryId).subscribe(
      (salesLeadContact: SalesLeadContact) => {
        this.secondaryData = salesLeadContact;


        //this.secondaryLeadContact['notes']=this.secondaryData.notes?.[0]["note"];
       this.secondaryLeadContact.patchValue(this.secondaryData);
        this.secondaryLeadContact.patchValue({ notes: this.secondaryData.notes?.[0]["note"] });
      //  this.secondaryLeadContact['notes']=this.secondaryData.notes?.[0]["note"];
        console.log('this.secondaryData.notes?.[0]["note"]',this.secondaryData.notes?.[0]["note"])
    this.modalService.open(clientUserFormModal, { size: 'lg', windowClass: 'modal-holder' });
      },
      (error: any) => {}
    );
  }
}
