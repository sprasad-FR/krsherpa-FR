import { first } from 'rxjs/operators';
import { Component, Input, Output, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Logger } from '../../../core/logger.service';
import { IPVService } from '../../../core/services/IPV.service';
import { EmployeeService } from '../../../core/services/employee.service';
import { ExpertService } from '../../../core/services/expert.service';
import { ToastService } from '../../toast-service';


//import { ToastrService } from 'ngx-toastr';

import {
  currencies,
  industry,
  industryGroup,
  months,
  options,
  paymentPreference,
  sectors,
  subindustry,
  descriptionObj,
} from '../../../../../../shared-libs';
import { Expert, WorkingDetailsItem } from '../../../core/models/expert.model';
import { LeadSource } from '../../../core/models/default.model';
import { EmailJsTemplates, expertLeadSourceArray } from '../../../core/models/options';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailService } from '../../../core/services/email.service';
import { Country, State, City } from 'country-state-city';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Buffer } from 'buffer';

import { UserService } from '../../../core/services/kruser.service';

const log = new Logger('Expert Form Component');
@Component({
  selector: 'app-create-expert',
  templateUrl: './create-expert.component.html',
  styleUrls: ['./create-expert.component.scss'],
})
export class CreateExpertComponent implements OnInit {
  currenciesList: any;
  researchMgrList: any;
  rateTypes: any[];
  error: any | undefined;
  leadFormGrp: FormGroup;
  isLoading: boolean = false;
  breadCrumbItems: Array<{}>;
  pageTitle: string;
  btnName: string;
  status: Array<{}>;
  expertData: Expert;
  leadSourceArray: LeadSource[];
  id: string;
  emailToSend: any[];
  currentUser: any;
  workingDetailsArray: WorkingDetailsItem[];
  workForm: FormGroup;
  showEnd: boolean = true;
  months: any[];
  countryArray: any[];
  countryISO: any;
  stateArray: any[];
  cityList: any[];
  industryGroupList: any[];
  sectors: { id: number; text: string }[];
  industryGroup: any[];
  industry: any[];
  industryList: any[];
  subindustry: any[];
  expertemail: any;
  emailMatch: string;
  paymentPreference: any[];
  btnStatus: boolean = false;
  public Editor = ClassicEditor;
  salutation: string[];
  expertCompanyType: string[];
  editWd: any;
  subIndustry: any[];
  whoiam: any;
  empList: any;
  descriptionObj: any;
  summary: string;
  rndpwd:string;
isRecruited:boolean;
ispoc:string='false';
@Input() itemid: string='';
@Input() readonly: boolean=true;
   

  constructor(
    private formBuilder: FormBuilder,
  //  private toasterService: ToastrService,
    private readonly expertService: ExpertService,
    private readonly employeeService: EmployeeService,
    private route: ActivatedRoute,
    private userService: UserService,
    public toasterService: ToastService,
    private router: Router,
    private emailService: EmailService,
    private ipvservice: IPVService,
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
    this.whoiam = JSON.parse(window.localStorage.getItem('user'));
    this.empList = JSON.parse(window.localStorage.getItem('emp'));
    this.getCountry();
    this.paymentPreference = paymentPreference;
    this.rndpwd=this.generatePassword();
  }

  ngOnInit(): void {


    this.ispoc = this.route.snapshot.queryParamMap.get('poc');
if (this.ispoc ==null)
{
  this.ispoc="false";

}


    this.pageTitle = 'Create Expert';
    this.btnName = 'Create';
    this.fetchData();
    this.isRecruited=false;

    console.log( this.whoiam);

  }

  private fetchData() {
  
    if ( this.itemid && this.itemid !='')
    {
    this.id =this.itemid//  this.route.snapshot.paramMap.get('id')!;
    }
    else{
     this.id = this.route.snapshot.paramMap.get('id');
    }


  // this.id = this.empid;

    if (this.id) {
      //GetData
      this.pageTitle = 'UPDATE EXPERT';
      this.btnName = 'Update';
      //GetData
      this.getExperts(this.id);
    }

    this.sectors = sectors;
    this.industryGroup = industryGroup;
    this.industry = industry;
    this.subindustry = subindustry;
    this.descriptionObj = descriptionObj;
    this.currenciesList = currencies;
    this.rateTypes = options.rateTypes;
    this.salutation = options.salutation;
    this.expertCompanyType = options.expertCompanyType;
    this.months = months;
    this.status = options.status;
    this.leadSourceArray = expertLeadSourceArray;
    this.getResearchMgr();
    this.createForm();
  }

  addState(value)
  {    

    this.stateArray.push(value);

  }


  addCity(value)
  {
    this.cityList.push(value);
  }
  isweb:boolean=false;

  private getExperts(id: string) {



    this.expertService.show(this.id).subscribe(
      (experts: Expert) => {
        debugger

        experts.primaryEmail=this.encDta(experts.primaryEmail)
        experts.contactNo=this.encDta(experts.contactNo)
        experts.alternateEmail=this.encDta(experts.alternateEmail)
        experts.alternatePhone=this.encDta(experts.alternatePhone)      


        
//************** */

if (experts.sourceType=="Web Signup"   )
{
this.isweb=true;
}



if (!experts.keyword) experts.keyword='';
if (!experts.paymentPreference) experts.paymentPreference='';
 if (!experts.paymentPreference) experts.paymentPreference='';
if (!experts.notes) experts.notes='';
          if (!experts.paymentPreference) experts.paymentPreference='';
     if (!experts['referrerEmail']) experts['referrerEmail']=''
     if (!experts['referrerName']) experts['referrerName']=''
     if (!experts['referrerPhone']) experts['referrerPhone']=''

          
                             if (!experts.password) experts.password='';
    if (!experts.biography) experts.biography='';
if (!experts.currency) experts.currency='';
  if (!experts.rateType) experts.rateType='';
    if (!experts.keyword) experts.keyword='';
      if (!experts.sourceType) experts.sourceType='';  
      if (!experts.sector) experts.sector='';   
if (!experts.state) experts.state='';
 if (!experts.city) experts.city=''; 
if (!experts.industryGroup) experts.industryGroup='';
if (!experts.industry) experts.industry='';
 if (!experts.subindustry) experts.subindustry=''; 
if (!experts.userId) experts.userId=''; 
if (!experts.password) experts.password=this.rndpwd;
 if (!experts.salutation) experts.salutation=''; 
if (!experts.designation) experts.designation='';
 if (!experts.country) experts.country=''; 

 if (!experts.skills) experts.skills=''; 
 if (!experts.education) experts.education=''; 
 if (!experts.about) experts.about=''; 




//************** */

/* gs 


        experts.primaryEmail=this.encDta(experts.primaryEmail)
        experts.contactNo=this.encDta(experts.contactNo)
        experts.alternateEmail=this.encDta(experts.alternateEmail)
        experts.alternatePhone=this.encDta(experts.alternatePhone)    

        /* */

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


//console.log(this.expertData);

//console.log('this.isRecruited');
//console.log(this.isRecruited);

        this.workingDetailsArray = this.expertData?.workingDetails;
        if (experts.terms) {
          this.status = this.status.splice(2, 4); 
        }

        console.log(this.expertData);

        this.workingDetailsArray = this.expertData?.workingDetails;
        if (experts.terms) {
          this.status = this.status.splice(2, 4);
        }
        this.isLoading=false;
        this.workingDetailsArray = this.expertData?.workingDetails;
        if (experts.terms) {

          this.status = this.status.splice(2, 4);

        }
      },
      (error: any) => {
        this.isLoading=false;

      }
    );
  }


  
hrefMatch:string="";

isContactnoValid:boolean=true;
isAlterNatenoValid:boolean=true;

isMail1Valid:boolean=true;
isMail2Valid:boolean=true;
isContactnoCodeValid:boolean=true;

checkPhone( is2: boolean) {

 // let email = event.target.value.trim();
  let email = "";
  if (is2 && this.leadFormGrp.controls['alternatePhone'].value!=null)
  {
     email = this.leadFormGrp.controls['alternatePhone'].value.trim();
  }
  else{
    if  (this.leadFormGrp.controls['contactNo'].value!=null)
    {
     email = this.leadFormGrp.controls['contactNo'].value.trim();
    }
  }


if ((email==null || email==""))
{
  if (is2)
  {
  this.isAlterNatenoValid=true;
  }
  else{
  //  this.isContactnoValid=true;
  }
//  this.isContactnoValid=true;
return '';
}

//alternatePhoneCountryCode
 

  console.log(this.leadFormGrp.controls['phoneCode'].value);

  var res;

if (is2)
{
  res=this.ipvservice.CheckIP( this.leadFormGrp.controls['alternatePhoneCountryCode'].value ,  email)

}
else
{
 res=this.ipvservice.CheckIP( this.leadFormGrp.controls['phoneCode'].value ,  email)
}

console.log(res);
if (!res.isValid && !is2)
{
  //this.leadFormGrp.controls['alternatePhone'].setErrors({'incorrect': true});
 // this.leadFormGrp.controls['alternatePhone'].setErrors
this.isContactnoValid=false;
//  this.isContactnoValid=true;
console.log(is2,this.isContactnoValid);

 return false;
}


if (!res.isValid && is2)
{
  console.log(is2,this.isAlterNatenoValid);
  //alternatePhone
 //this.leadFormGrp.controls['contactNo'].setErrors({'incorrect': true});
 this.isAlterNatenoValid=false;
 return false;

}



if (res.isValid && !is2)
{
  this.isContactnoValid=true;
}


if (res.isValid && is2)
{
  this.isAlterNatenoValid=true;
}


console.log(res);
  
return true;
}




//emailMatch: string;
  checkEmail(event: any) {


    this.isMail1Valid=true;
    this.isMail2Valid=true;

    let email = event.target.value.trim();
    
if ((email==null || email==""))
{
return ;
}



    email= email.replace(/^\.+/, "");

    email= email.replace(/\.+$/, "");

    if (email!='' && this.btnName == 'Create')
    {
email= Buffer.from(email.toString()).toString('base64')
   
console.log('email',email);
    const filters = new Map();
    const filter = {
      where: {
        primaryEmail: {
          like: email,
          options: 'i',
        },
      },
    };
/*
 sector: {
             like: element,
             options: 'i',
           },
    */
    filters.set('filter', JSON.stringify(filter));

    this.expertService.getAll(filters).subscribe(
      (data: any) => {
        this.expertemail = data;
        this.isLoading=false;
        if (this.expertemail.length > 0) {
          this.emailMatch = "Email Already Exist ";
      this.hrefMatch="/expert/expert-details/"+data[0].id 
    console.log('email exists', this.hrefMatch);
        } else {
          this.emailMatch = '';
          
        }
      },
      (error: any) => {
        this.emailMatch = '';
      }
    );
    }


  }

 generatePassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    retVal=retVal+'@A1'
    return retVal;
}

encDta(data:any) {


  if (data==undefined || data==null || data=='')
  {
  return "";
  }

return Buffer.from(data.substring(5), 'base64').toString('ascii');
 //return window.atob((data).substring(5));

}



  submitData() {
    this.isLoading=true;
    this.leadFormGrp.patchValue({ workingDetails: this.workingDetailsArray });
    this.leadFormGrp['assigneeId'] = this.currentUser.id;

debugger

if (this.leadFormGrp.controls['alternatePhoneCountryCode'].value==null)
{
    this.leadFormGrp.patchValue({ alternatePhoneCountryCode: ''});     
}
    //alternatePhoneCountryCode
    let expertData = this.leadFormGrp.value;
   
    expertData.skills= this.expertData?.skills && this.expertData?.skills!=undefined? this.expertData.skills:'';
    expertData.education= this.expertData?.education&& this.expertData?.education!=undefined?  this.expertData.education:[];
    expertData.about= this.expertData?.about&& this.expertData?.about!=undefined?  this.expertData.about:'';

/*
    let email = expertData.primaryEmail.trim();
    
    email= email.replace(/^\.+/, "");

    email= email.replace(/\.+$/, "");

    expertData.primaryEmail=email; */
    this.isMail1Valid=true;
    debugger

var isAtleast1:boolean=false;

    if (expertData.primaryEmail !=null && expertData.primaryEmail.trim()!="")
    {

      if (!this.ipvservice.CheckMail(expertData.primaryEmail.trim()))
      {
        this.isLoading = false;
        this.isMail1Valid=false;
     //this.toasterService.error('Please Enter Valid Email', 'Error!');
    //  return;
      }
      else{
        this.isMail1Valid=true;
        isAtleast1=true;
      }

    }
    else{
      this.isLoading = false;
      this.isMail1Valid=false;
    // this.toasterService.error('Please Enter Valid Email', 'Error!');
     //return;
    }
    
   // this.isMail2Valid=true;

debugger
if (expertData.alternateEmail !=null && expertData.alternateEmail.trim()!="")
{
  if (!this.ipvservice.CheckMail(expertData.alternateEmail.trim()))
  {
    this.isLoading = false;
    this.isMail2Valid=false;


 //this.toasterService.error('Please Enter Valid Email', 'Error!');
 // return;


  }

}



if (!this.checkPhone( false))
{
  this.isContactnoValid=false;
 // this.toasterService.error('Please Enter Valid Email', 'Error!');
 //expertData.phoneCode?.trim(), expertData.contactNo 
 //return;



}
else{

  isAtleast1=true;
}


  if (!isAtleast1)
  {
  this.toasterService.error('Please Enter Valid Email or contact number', 'Error!');
 //expertData.phoneCode?.trim(), expertData.contactNo 
 this.isLoading=false;
 return ;

  }


this.isContactnoCodeValid=true;



debugger

  if (expertData.alternatePhone !=null && expertData.alternatePhone.trim()!="")
  {
  
    if (expertData.alternatePhoneCountryCode ==null || expertData.alternatePhoneCountryCode=="")
  {
    this.isLoading = false;
    this.isContactnoCodeValid=false;
    return;
  }
  else{
    expertData.alternatePhoneCountryCode="1";
    this.isContactnoCodeValid=true;
  }

  if (expertData.alternatePhoneCountryCode ==null || expertData.alternatePhoneCountryCode.trim()=="")
  {
    expertData.alternatePhoneCountryCode="1";
    this.isContactnoCodeValid=true;
  }


  if (!this.checkPhone(true)){


  this.isAlterNatenoValid=false;
 // this.toasterService.error('Please Enter Valid Email', 'Error!');
  //return;
  }

}

   // if (this.leadFormGrp.valid) {
     // expertData['terms'] = false;
      if (!expertData?.workingDetails?.length) {
     //   this.toasterService.error('Please Add Working Details.', 'Error!');
      }

      // expertData['workDetails'] = expertData.workDetails;
      if (this.id) {


if (this.isweb)
{
  expertData.terms=true;

  expertData.isLead=false;
}

        
        expertData.userId = this.expertData.userId;
       // expertData['terms'] = expertData.terms;
        this.expertService.update(this.id, expertData).subscribe(
          (response) => {
            log.debug('response: ', response);

            this.isLoading = false;

          this.toasterService.success('Expert updated successfully.', 'Success!');


            if ((this.leadFormGrp.controls['status'].value == 'Recruited') ) {   //&&(!this.isRecruited)
              if (!this.emailToSend?.length) {
                this.emailToSend = [];
              }

              console.log('in email');
           let RAemail = this.empList.find((x) => x.userId == expertData?.krRelationshipMgrId);
              this.emailToSend.push(RAemail?.email);
              let emailVariableObj = {
                notificationType: 'skipEmail',
              };
              this.emailService.sendEmail(
                EmailJsTemplates.experUpdated,
                this.emailToSend,
                'Informative',
                emailVariableObj
              );

              if ( expertData.userId==null || expertData.userId==undefined||  expertData.userId=="")
              {

                if ((this.leadFormGrp.controls['status'].value == 'Recruited') ) { 

              let emailVariableObjforExpert = {
                notificationType: 'Email',
                sherpaLogin: window.location.origin+'/login',
                primaryEmail: expertData.primaryEmail,
                password: expertData.password,
              };
              this.emailService.sendEmail(
                EmailJsTemplates.experUpdated,
                [expertData.primaryEmail],
                'Informative',
                emailVariableObjforExpert
              );/**/

                }
              }


            }

           // this.router.navigate(['/expert/expertlist']);
        //   this.router.navigate(['/expert/expert-details', this.expertData?.id]);
          },
          (error) => {
            log.error(error);
            log.debug('Not Updated', expertData);
            this.error = error;
            this.isLoading = false;
            this.isLoading=false;
          //  this.toasterService.error('Expert Data is incomplete.', 'Error!');
            this.isLoading = false;
          }
        );
      } else {

        if (!expertData.terms)
        {
          expertData.terms=false;
        }
            


        this.expertService.create(expertData).subscribe(
          (response) => {
            this.isLoading=false;
            log.debug('response: ', response);
            console.log('response: ', response);
           // this.router.navigate(['/expert/expertlist']);
            this.toasterService.success('Expert lead created successfully.', 'Success!');
        //    this.router.navigate(['/expert/expert-details', response?.id]);
        this.isLoading=false;
          },
          (error) => {
            log.error(error);
            log.debug('Not Created', expertData);
            this.error = error;
            this.isLoading=false;
            this.toasterService.error('Expert Data is incomplete.', 'Error!');
            this.isLoading=false;
        
          }
        );
      }
 /*   }
    else{

      this.isLoading=false;
      this.toasterService.error('Expert Data is incomplete.', 'Error!');
      this.isLoading=false;
       
    }  */
  }


    


      upddata:any;
  sendPWDMail()
  {

    if ( this.expertData?.userId)
    {


      this.userService.getupd(this.expertData.userId).subscribe(
        async (responseData) => {
  
  this.upddata=responseData;   /* */

      if (this.upddata?.id)
      {
        this.upddata.password=this.generatePassword();

        //this.generatePassword
      
      this.userService.updatepd(this.upddata?.id,this.upddata).subscribe(
            async (responseData) => {    
      
      debugger
           //  console.log('this.responseData2');
            //  console.log(responseData);
      
           //whoiam
           let RAemail = this.empList.find((x) => x.userId == this.expertData?.krRelationshipMgrId);
        
           console.log( this.whoiam);

    let emailVariableObjforExpert = {
      notificationType: 'Email',
      sherpaLogin: 'https://experts.krsherpa.com/',
      primaryEmail: this.expertData.primaryEmail,
      password: this.upddata.password,
    };
    this.emailService.sendEmail(
      EmailJsTemplates.experUpdated,
      [this.expertData.primaryEmail,RAemail.email,this.whoiam.username],
      'Informative',
      emailVariableObjforExpert
    );/**/
  this.toasterService.success('Expert Password Mail Sent.', 'Success!');
    

  },
  (error: any) => {}

  );





}

},

(error: any) => {}

);


    }

  }

  sendSUPMail()
  {

    if ( this.expertData?.userId)
    {


    
  
  //this.upddata=responseData;   /* */

     
          
      
      
           //  console.log('this.responseData2');
            //  console.log(responseData);
      
      debugger     
      

    let emailVariableObjforExpert = {
      notificationType: 'Email',    
      name: this.expertData.firstName+' '+this.expertData.lastName,
      link: "https://experts.krsherpa.com/krn/signup/"+ this.expertData.id
    };
    this.emailService.sendEmail(
    'template_th6047s' ,   // EmailJsTemplates.experUpdated
      [this.expertData.primaryEmail],     //this.expertData.primaryEmail
      'Informative',
      emailVariableObjforExpert
    );/**/
  this.toasterService.success('Expert sign up mail sent.', 'Success!');
    







}




    

  }


  cancelForm() {
   // this.router.navigate(['/expert/expert-details', this.expertData?.id]);
   // this.router.navigate(['/expert/expertlist']);
  }

  getResearchMgr() {
    const filters = new Map();
    const filter = {
      where: {
        designation: 2,
      },
      fields: {
        id: true,
        name: true,
        designation: true,
        email: true,
        userId: true,
      },
    };
    filters.set('filter', JSON.stringify(filter));

    return this.employeeService.getAll(filters).subscribe(
      (employees: any) => {
        this.researchMgrList = employees;
      },
      (error: any) => {}
    );
  }


  createForm() {
    this.leadFormGrp = this.formBuilder.group({
      salutation: ['' ],
      firstName: ['' ],
      lastName: ['' ],
      phoneCode: ['' ],
      contactNo: ['' ],
      primaryEmail: ['' ],
      alternatePhoneCountryCode: [  ],
      alternatePhone: [''],
      alternateEmail: [''],
      

      password: [''],
      status: ['' ],
      designation: ['' ],
      sourceType: ['' ],
      sourceUrl: ['' ],
      country: ['' ],
      state: ['' ],
      city: ['' ],
      sector: ['' ],
      industryGroup: ['' ],
      industry: ['' ],
      subindustry: ['' ],
      rate: [0],
      rateType: [''],
      paymentPreference: ['' ],
       isLead: [true],
       terms: [false],
      keyword: ['' ],
      currency: ['USD' ],

      krRelationshipMgr: [null ],
      krRelationshipMgrId: [null ],
      workingDetails: [''],
      referrerPhone: [''],
      referrerEmail: [''],
      referrerName: [''],
      biography: [''],
      notes: [''],
    });
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
    this.workForm.patchValue({
      companyType: this.expertCompanyType,
      startMonth: this.months,
      endMonth: this.months,
    });
    this.leadFormGrp.patchValue({
      krRelationshipMgr: this.currentUser?.firstName,
      krRelationshipMgrId: this.currentUser?.id,
        password: this.rndpwd,// 'password@123',
    });
  }

  createForm11() {
    this.leadFormGrp = this.formBuilder.group({
      salutation: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      phoneCode: [null, [Validators.required]],
      contactNo: [null, [Validators.required]],
      primaryEmail: [null, [Validators.required]],
      alternatePhoneCountryCode: [  ],
      alternatePhone: [''],
      alternateEmail: [''],
      

      password: [''],
      status: [null, [Validators.required]],
      designation: [null, [Validators.required]],
      sourceType: [null, [Validators.required]],
      sourceUrl: [null, [Validators.required]],
      country: [null, [Validators.required]],
      state: [null, [Validators.required]],
      city: [null, [Validators.required]],
      sector: [null, [Validators.required]],
      industryGroup: [null, [Validators.required]],
      industry: [null, [Validators.required]],
      subindustry: [null, [Validators.required]],
      rate: [0],
      rateType: [null],
      paymentPreference: [null, [Validators.required]],
      isLead: [true],
      terms: [false],
//isLead: [null, [Validators.nullValidator]],
      // terms: [null, [Validators.nullValidator]],
      keyword: [null, [Validators.required]],
      currency: [null, [Validators.required]],


      krRelationshipMgr: [null, [Validators.required]],
      krRelationshipMgrId: [null, [Validators.required]],
      workingDetails: [''],
      referrerPhone: [''],
      referrerEmail: [''],
      referrerName: [''],
      biography: [''],
      notes: [''],
    });
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
    this.workForm.patchValue({
      companyType: this.expertCompanyType,
      startMonth: this.months,
      endMonth: this.months,
    });
    this.leadFormGrp.patchValue({
      krRelationshipMgr: this.currentUser?.firstName,
      krRelationshipMgrId: this.currentUser?.id,
        password: this.rndpwd,// 'password@123',
    });
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


  addDetails() {
    if (this.editWd) {
      let index = this.workingDetailsArray?.indexOf(this.editWd);
      this.workingDetailsArray?.splice(index, 1);
      if ( this.workForm.controls['jobTitle'].value != '' && this.workForm.controls['companyName'].value != '' && this.workForm.controls['companyType'].value != '') {
        if (!this.workingDetailsArray) {
          this.workingDetailsArray = [];
        //  this.workingDetailsArray?.push();
        }

        this.workingDetailsArray?.splice(0, 0, {
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
       // this.workingDetailsArray = [];
      }
      this.workForm.reset();
    } else {
      if (this.workForm.controls['companyName'].value != '' && this.workForm.controls['companyType'].value != '') {
        if (!this.workingDetailsArray) {
          this.workingDetailsArray = [];
        }
        this.workingDetailsArray?.splice(0, 0,{
          companyName: this.workForm.controls['companyName'].value,
          companyType: this.workForm.controls['companyType'].value,
          jobTitle: this.workForm.controls['jobTitle'].value,
          startMonth: this.workForm.controls['startMonth'].value,
          startYear: this.workForm.controls['startYear'].value,
          endMonth: this.workForm.controls['endMonth'].value,
          endYear: this.workForm.controls['endYear'].value,
          isCurrentEmployeer: this.workForm.controls['isCurrentEmployeer'].value,
        });
        
       /* this.workingDetailsArray?.push({
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
       // this.workingDetailsArray = [];
      }
      this.workForm.reset();
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

  getCountry() {
    this.countryArray = Country?.getAllCountries();
    console.log(this.countryArray );
    this.countryArray.forEach((element) => {
      element['label'] = element.name + ' ' + element.phonecode;
    });
  }

  CountryId(event) {
    this.countryISO = event?.isoCode;
    this.stateArray = State.getStatesOfCountry(this.countryISO);
  }

  StateId(event) {
    const stateISO = event?.isoCode;
    this.cityList = City.getCitiesOfState(this.countryISO, stateISO);
  }

  onSelectSector(sector_id) {
    this.leadFormGrp.patchValue({ sector: sector_id.text });  //alternatePhoneCountryCode
    this.industryGroupList = this.industryGroup?.filter((a) => a.sectorId == sector_id?.id);
  }

  onIndustryGroup(groupId) {
    this.leadFormGrp.patchValue({ industryGroup: groupId.text });
    this.industryList = this.industry?.filter((a) => a.industryGroupId == groupId?.id);
  }

  onSelectIndustry(industry_id) {
    this.leadFormGrp.patchValue({ insustry: industry_id.id });
    this.subIndustry = this.subindustry?.filter((a) => a.industryId == industry_id?.id);
  }

  onSelectSubindustry(subindustry) {
    let summaryFor = subindustry?.text;
    let temp = this.descriptionObj[summaryFor];
    this.summary = temp;
  }

  delete(companyName) {
    let index = this.workingDetailsArray?.indexOf(companyName);
    this.workingDetailsArray?.splice(index, 1);
  }
  edit(companyName) {
    let wd = this.workingDetailsArray?.find((x) => x.companyName == companyName);
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

  changeStatus(value) {
    if (value == 'Recruited') {
      this.leadFormGrp.patchValue({
        krRelationshipMgr: this.currentUser?.firstName,
        krRelationshipMgrId: this.currentUser?.id,
      });
    }
  }

  verifyPaymentPrefferenceCountry(value) {}
}
