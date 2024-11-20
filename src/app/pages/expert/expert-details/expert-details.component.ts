import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild , ElementRef, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Logger } from '../../../core/logger.service';
import { Country, State, City } from 'country-state-city';
import { DateToLocalPipe,getCompanyTypePipe,GetInitialsPipe } from '../pipe';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Expert } from '../../../core/models/expert.model';
import { ExpertService } from '../../../core/services/expert.service';
import { paymentPreference, months, options } from '../../../../../../shared-libs';
import { EmployeeService } from '../../../core/services/employee.service';
import { Router } from '@angular/router';
//import { ToastrService } from 'ngx-toastr';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { complianceActionsService } from '../../../core/services/complianceActions.service';
import { ProjectService } from '../../../core/services/project.service';
import { CommonService } from '../../../core/services/common.service';

import { Project } from '../../../core//models/project.model';
import { TelemetryHandlerOptions } from '@microsoft/microsoft-graph-client';
//import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
//import { TextAst } from '@angular/compiler';
import { ToastService } from '../../toast-service';
import { Buffer } from 'buffer';

const log = new Logger('Expert Details Component');
@Component({
  selector: 'app-expert-details',
  templateUrl: './expert-details.component.html',
  styleUrls: ['./expert-details.component.scss'],
})
export class ExpertDetailsComponent implements OnInit {
  isLoading: boolean = false;
  error: any | undefined;
  krExpertsList: any;
  rateForClient: any;
  projectsData: Project[] = [];
  industry: string;
  showComplianceButton: boolean;
  complianceModalTitle: string;
  complianceComment: string;
  expertDataForCompliance: Expert;
  currentEmployer: string;
  bankDetailsForm: FormGroup;
  paymentPreference: any[];
  countryArray: any[];
  months: any[];
  hideBankDetails: boolean;
  roles: any;
  allroles: any;
  userData: any;
  pageTitle: string;
  expertDetailsForm: FormGroup;
  public Editor = ClassicEditor;
  hiddenBankAccountNum: string;
  workForm: FormGroup; 
  showTextbox: boolean = false;
  showEnd: boolean;
  editWd: any;
  expertCompanyType: any[];
  btnName: string;
  GTAMdata: any;
  GTCdata: any;
  GTCViewdata: any;
  projectData: Project[];
  //mynotes:string;
  @ViewChild('mynotes') myNotes;
  @Input() itemid: string='';
@Input() readonly: boolean=true;

  constructor(
    private readonly projectService: ProjectService, 
    private readonly expertService: ExpertService,
    private route: ActivatedRoute,
    private readonly employeeService: EmployeeService,
      private readonly commonService: CommonService,
    private modalService: NgbModal,
    private router: Router,
    public toasterService: ToastService,
  //  private toasterService: ToastrService,
    public complianceService: complianceActionsService,
    private formBuilder: FormBuilder
  ) {
    this.userData = JSON.parse(window.localStorage.getItem('user'));
   console.log ( this.userData )
    this.roles = this.userData.roles[0];
      this.allroles = this.userData.roles;
    if (this.roles == 'expert') {
      this.pageTitle = 'Profile';
    } else {
      this.pageTitle = 'Expert Details';
    }
  }

  id: string;
  expertData: Expert;
  ex: Expert;
  ispoc:string='false';
  whoiam:any;

  ngOnInit(): void {

  
    if ( this.itemid && this.itemid !='')
    {
    this.id =this.itemid//  this.route.snapshot.paramMap.get('id')!;
    }
    else{
     this.id = this.route.snapshot.paramMap.get('id');
    }

    this.whoiam = JSON.parse(window.localStorage.getItem('user'));


    this.ispoc = this.route.snapshot.queryParamMap.get('poc');


if (this.ispoc ==null)
{
  this.ispoc="false";

}


console.log ( ' this.ispoc ', this.ispoc  )
  console.log ( ' this.id ', this.id  )

   this.getUsers();
   
    if (this.id) {
      this.getCountry();
      this.fetchData();
    }



    if ((this.route.snapshot.queryParamMap.get('lst')!=null)&& ((this.route.snapshot.queryParamMap.get('lst')=='al')))
    { 
      this.listname="allocationlist";
    }       
    else{
     
      this.listname="expertlist";
    }



    
  }

listname:string;

  usersArray: any[];
  getUsers() {
   //this.userService.getUsers().subscribe(
    this.usersArray = this.employeeService.getempmindata()

   // this.usersArray=this.employeeService.getAllmin()
   
 }
 
getUserName(id: string) {

  // console.log( id);
   if (id != null && id != "" && this.usersArray != undefined) {
     let user = this.usersArray?.find((x) => x.userId == id);
    //
 
    // const user = this.usersArray.filter((x) => x.userId === id);
     if (user) {
       
       return user.name;
     } else {
      
       return '';
     }
   } else {
     return '';
   }
 }
 



  private fetchData() {
    this.getExperts(this.id);
    this.paymentPreference = paymentPreference;
    this.months = months;
    this.expertCompanyType = options.expertCompanyType;
    this.createBankDetailForm();
    this.createExpertDetailForm();
    this.getcomplianceDetails();
    this.getProjects()
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
     
        this.isLoading = false;
      },
      (error: any) => {
        this.isLoading = false;
      }
    );
  }


  openedit(formmadal: any) {
    this.modalService.open(formmadal, { size: 'lg', centered: true, windowClass: 'modal-holder' });
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



  openNewTab(url) {
    window.open(url, '_blank');
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


  RefreshList() {
    this.refreshed = false;
    this.refreshed = true;
    this.fetchData();
  }
  compliancealldata: any;

  getcomplianceDetails() {
    const filters = new Map();

    const filter = {
      where: {
        and: [
          {
            compliancetype: 'project',
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
        var userData = JSON.parse(window.localStorage.getItem('user'));
      },
      (error: any) => {}
    );
  }

  refreshed: boolean;
  idforCompliance: string;

  // Open client user form modal
  createClientUser(clientUserFormModal: any, saleid: any) {
    this.idforCompliance = saleid;

    this.modalService.open(clientUserFormModal, { size: 'lg', windowClass: 'modal-holder' });
  }


  getCountry() {
    this.countryArray = Country?.getAllCountries();
    this.countryArray.forEach((element) => {
      element['label'] = element.name + ' ' + element.phonecode;
    });
  }

/*

  CountryId(event) {
    this.countryISO = event?.isoCode;
    this.stateArray = State.getStatesOfCountry(this.countryISO);
  }

  StateId(event) {
    const stateISO = event?.isoCode;
    this.cityList = City.getCitiesOfState(this.countryISO, stateISO);
  }

*/

  encDta(data:any) {


if (data==undefined || data==null || data=='')
{
return " ";
}

    return Buffer.from(data.substring(5), 'base64').toString('ascii');  //gs
     //return window.atob((data).substring(5));
    
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

//save bank details 24April2024 

FieldData: { [label: string]: string} = {};
FieldsArray:any;
CSValues: { [label: string]: string} = {};
CheckFieldAccess: { [fieldid: string]: string } = {};
CheckSectionAccess: { [sectionid: string]: string } = {};
setRole:string='role1'
transformedFieldData:any={};

Openpopup(popup){
  this.modalService.open(popup,{size:'lg',centered:true})

  fetch('https://middle.krsherpa.com/projects/fields/getall')
    .then((res) => res.json())
    .then((field) => {
      this.FieldsArray=field.find((field) =>field.moduleId === 'experts')
      //this.moduleAIP = this.FieldsArray.moduleId;
      for (let index = 0; index < this.FieldsArray?.sections?.length; index++) {
        const section = this.FieldsArray.sections[index];
        //console.log(section)
        if(section.Type === 'custom'){
          const filterdata=this.FieldsArray?.fields.filter((field) =>field.sectionid === section.sectionid)
          filterdata.forEach((field) =>{
            this.FieldData[field.fieldid] = this.expertData[field.fieldid]
            console.log(this.FieldData[field.fieldid])
          })
        }
        
      }
  });
}


countryISO:any;
stateArray: any;
cityList: any;
//countryArray= Country?.getAllCountries();
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
  fetch('https://middle.krsherpa.com/projects/fields/getall')
    .then((res) => res.json())
    .then((field) => {
      this.FieldsArray=field.find((field) =>field.moduleId === 'experts')
      //this.moduleAIP = this.FieldsArray.moduleId;
      for (let index = 0; index < this.FieldsArray?.sections?.length; index++) {
        const section = this.FieldsArray.sections[index];
        //console.log(section)
        if(section.Type === 'custom'){
          const filterdata=this.FieldsArray?.fields.filter((field) =>field.sectionid === section.sectionid)
          filterdata.forEach((field) =>{
            this.expertData[field.fieldid] =this.FieldData[field.fieldid]
            //console.log(this.FieldData[field.fieldid])
          })
        }
        
      }
      console.log(this.expertData)
      fetch(`https://middle.krsherpa.com/projects/experts/update`,{
          method:'POST',
          body: JSON.stringify(this.expertData),
          headers: {
          "Content-Type": "application/json",
          //"timeout": "2000000" 
          },
  
        })
        .then(r => r.json()).then(result => {
          console.log('id is:',result);
          alert('Update successful');
        },(error: any) => {
          alert('Update not successful');
        });
      this.modalService.dismissAll()
  });
}

//save bank details 24April2024 

  ExpertEditData:any;


  private getExperts(id) {
    this.expertService.show(id).subscribe(
      (experts: Expert) => {
        console.log(experts)
        console.log(this.userData)
        this.expertData = experts;

        this.ExpertEditData=experts;


/* if ((this.allroles.includes('admin')||this.allroles.includes('mainPLHead') ||this.allroles.includes('Expert') )   ||this.allroles.includes('subPLHead') ||(experts['krRelationshipMgrId']==undefined)||(experts['krRelationshipMgrId']==null)||(experts['krRelationshipMgrId']?.trim().length === 0)||(experts['krRelationshipMgrId']==this.userData.id))
{*/

  console.log('prevKRId 1',experts['krRelationshipMgrId'])


  this.expertData.primaryEmail=this.encDta(experts.primaryEmail)
  this.expertData.contactNo=this.encDta(experts.contactNo)
  this.expertData.alternateEmail=this.encDta(experts.alternateEmail)
  this.expertData.alternatePhone=this.encDta(experts.alternatePhone)
/*}
else{
  console.log('in 2')
  this.expertData.primaryEmail="************"
  this.expertData.contactNo="************"
  this.expertData.alternateEmail="************"
  this.expertData.alternatePhone="************"
}      */   

       

      //  this.expertData.primaryEmail=this.encDta(this.expertData.primaryEmail)
      //  this.expertData.contactNo=this.encDta(this.expertData.contactNo)
        

        if (this.expertData?.workingDetails) {
          let workingDetailsLen = this.expertData?.workingDetails?.length;
          this.currentEmployer = this.expertData?.workingDetails[workingDetailsLen - 1]?.companyName;
        }

        this.expertDetailsForm.patchValue(this.expertData);
        this.bankDetailsForm.patchValue(this.expertData);
        if (this.userData.roles.indexOf('compliance') != -1 && this.expertData?.isComplianceVerified == false) {
          this.showComplianceButton = true;
        } else {
          this.showComplianceButton = false;
        }
        this.rateForClient = this.expertData?.rate;

        
    try
    {
  
  var dta={
  "type":"Expert View",
  "viewername":this.whoiam.firstName,
  "vieweruserid":this.whoiam.id,
  "searchjson":"",
  "searchwords":"" ,
  "expertid":this.expertData.id,
  "expertname":this.expertData.firstName+','+this.expertData.lastName,
  }
  
  this.commonService.postusagedata(dta)
      
    }
    catch(err)
    {
  
    }




      },
      (error: any) => {}
    );

  }

  //compliance section
  ComplienceConfirmation(complianceModal: any) {
    this.complianceModalTitle = 'Confirmation';
    this.modalService.open(complianceModal, { centered: true, windowClass: 'modal-holder' });
  }

  openModal(bankDetails: any) {
    this.modalService.open(bankDetails, { centered: true, windowClass: 'modal-holder' });
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

  complianceCommentBox(addComments: any) {
    this.complianceModalTitle = 'Add Comment';
    this.modalService.open(addComments, { centered: true, windowClass: 'modal-holder' });
  }

  markCompliance(val) {
    this.expertService.show(this.id).subscribe(
      (experts: Expert) => {
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
      } else {
        this.expertData.workingDetails = [];
      }
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
          isCurrentEmployeer: this.workForm.controls['isCurrentEmployeer'].value,
        });
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

  delete(companyName) {
    let wd = this.expertData?.workingDetails?.find((x) => x.companyName == companyName);
    let index = this.expertData.workingDetails.indexOf(wd);
    this.expertData.workingDetails.splice(index, 1);
    this.expertService.updateOnly(this.id, this.expertData).subscribe((data) => {
      console.log(data);
    });
  }
}
