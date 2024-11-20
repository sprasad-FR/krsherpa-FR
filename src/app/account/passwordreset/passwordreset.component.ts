import { Component, OnInit, AfterViewInit,ViewChild  } from '@angular/core';
import { FormBuilder, FormGroup, Validators , ValidationErrors} from '@angular/forms';
import { EmailService } from '../../core/services/email.service';
//import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { Logger } from '../../core/logger.service';
import {  untilDestroyed } from '../../core/until-destroyed';

import { AuthenticationService, CredentialsService } from '../../core/auth';
import { ClientsService } from '../../core/services/clients.service';
import { UserService } from '../../core/services/kruser.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.scss'],
})

/**
 * Reset-password component
 */
export class PasswordresetComponent implements OnInit, AfterViewInit {
   
  resetForm: FormGroup;
    emlForm: FormGroup;
  stage='';
    resetpdForm: FormGroup;
  submitted = false;
  error = '';
  success = '';
  loading = false;
 whoaim: any;
 eml:string;
 uid:string;
 otp:string;
 pd:string;
 upddata:any;
 pwdPattern:string;
usremail='';
emailerr=0;
   emailToSend: string[]=["noreply@knowledgeridge.com"];
  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder,
 private userService: UserService,
 private router: Router,
    private route: ActivatedRoute,
    private emailService: EmailService,
  public modalService: NgbModal,
    ) {
   // this.createForm();
 this.whoaim = JSON.parse(localStorage.getItem('user'));
    this.eml = this.whoaim?.username;
     this.uid = this.whoaim?.id;
   console.log('in pd reset');
       console.log( this.uid);
  }


  ngOnInit() {

this.stage='init';
this.upddata={};

    this.getpd() ;
    this.resetForm = this.formBuilder.group({
      otp: ['', [Validators.required, Validators.required]],
    });
 this.emlForm = this.formBuilder.group({
      usremail: ['', [Validators.required, Validators.email]],
    });
  // working -9Aa@1-  this.pwdPattern = "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}";
  //this.pwdPattern = "^(?=.*[a-zA-Z])|(?=.*\d).{5,}$"

this.pwdPattern = "(?=.*[a-z])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{5,}"

  //  
  /*  

    this.resetpdForm = this.formBuilder.group({
     
      password: ['', Validators.compose([
         // 1. Password Field is Required
         Validators.required,
         // 2. check whether the entered password has a number
         CustomValidators.patternValidator(/\d/, { hasNumber: true }),
         // 3. check whether the entered password has upper case letter
         CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
         // 4. check whether the entered password has a lower-case letter
         CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
         // 5. check whether the entered password has a special character
         CustomValidators.patternValidator(/[ [!@#$%^&*()_+-=[]{};':'|,.<>/?]/](<mailto:!@#$%^&*()_+-=[]{};':'|,.<>/?]/>), { hasSpecialCharacters: true }),
         // 6. Has a minimum length of 8 characters
         Validators.minLength(8)  ])],

      repeatPassword: ['', [Validators.required]]

    }, { 

      validator: ConfirmedValidator('password', 'repeatPassword')

    }) 


  this.resetpdForm = this.formBuilder.group({
     
      password:['', [Validators.required, Validators.pattern(this.pwdPattern)]],
        repeatPassword: ['', [Validators.required]]

    }, { 

      validator: this.ConfirmedValidator('password', 'repeatPassword')

    }) ;

     */


  this.resetpdForm = this.formBuilder.group({
     
      pdpassword:['', [Validators.required, Validators.pattern(this.pwdPattern)]],
        repeatPassword: ['', [Validators.required]]

      }, { 

      validator: this.ConfirmedValidator('pdpassword', 'repeatPassword')

    }) ;

   //  this.getUsers();
  }

/*
 patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (!control.value) {
      // if control is empty return no error
      return null;
    }

    // test the value of the control against the regexp supplied
    const valid = regex.test(control.value);

    // if true, return no error (no error), else return error passed in the second parameter
    return valid ? null : error;
  };
}

*/
  ngAfterViewInit() {}

  // convenience getter for easy access to form fields
  get f() {
    return this.resetForm.controls;
  }

get fpd() {
    return this.resetpdForm.controls;
  }


  usersArray: any;

  /**
   * fetches the table value
   */
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
/*
  getUsers() {
    this.employeeService.getAll().subscribe(
      (userArray: any) => {
        this.usersArray = userArray;
      },
      (error: any) => {}
    );
  }
*/

 generateOTP() {
          
    // Declare a digits variable 
    // which stores all digits
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    this.otp=OTP;
    return OTP;
}

  setOTP() {

this.generateOTP() ;
//this.getpd() ;

this.userService.getupd(this.uid).subscribe(
       (responseData) => {

this.upddata=responseData;   /* */


  console.log('opt ='+ this.otp);
 this.upddata['reset'] = 'no';
 this.upddata['resetcode'] = this.otp;
       // this.upddata['status'] = this.statusupdt;
if (this.otp!='')
{


       console.log('this.upddata');
        console.log(this.upddata);


this.userService.updatepd(this.upddata['id'],this.upddata).subscribe(
       (responseData) => {    


       console.log('this.responseData2');
        console.log(responseData);


        //compliance@knowledgeridge.com
  this.emailToSend.push(this.usremail);


        let emailVariableObj = {
          notificationType: 'Informative',
          OTP: this.otp        
        };

        console.log('this.emailToSend'+this.emailToSend);

        this.emailService.sendComplianceEmail('template_b8m5gbf', this.emailToSend, 'Informative', emailVariableObj);

this.stage='otp';


        },
        (error: any) => {}

        );


   }
   },
   (error: any) => {}

        );


  }

    

 ConfirmedValidator(controlName: string, matchingControlName: string){

    return (formGroup: FormGroup) => {

        const control = formGroup.controls[controlName];

        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
            return;
        }

        if (control.value !== matchingControl.value) {

            matchingControl.setErrors({ confirmedValidator: true });

        } else {

            matchingControl.setErrors(null);

        }

    }

}


generatepd() 
{

 // stop here if form is invalid
    if (this.resetpdForm.invalid) {

      return;

    } else {

 this.upddata['reset'] = 'no';
 this.upddata['password'] = this.resetpdForm["password"];
       // this.upddata['status'] = this.statusupdt;
if (this.pd!='')
{

this.userService.updatepd(this.upddata['id'],this.upddata).subscribe(
      async (responseData) => {    


       console.log('this.responseData2');
        console.log(responseData);


        //compliance@knowledgeridge.com
  this.emailToSend.push(this.eml);


        let emailVariableObj = {
          notificationType: 'Informative',
          OTP: this.otp        
        };

        console.log('this.emailToSend'+this.emailToSend);

       // this.emailService.sendComplianceEmail('template_b8m5gbf', this.emailToSend, 'Informative', emailVariableObj);




        },
        (error: any) => {}

        );


   }

 }

  
}



  /**
   * On submit form
   */
  onSubmit(no) {

    this.success = '';
    this.submitted = true;
console.log('no');
console.log(no);
    // stop here if form is invalid
     if (no==1) {

 if (this.resetForm.controls['otp'].value==null || this.resetForm.controls['otp'].value=='')
        {
 this.emailerr=4;
        return;


    }
    else
    {
     console.log('otp');
console.log(this.otp);
console.log(this.resetForm.controls['otp'].value);


     if( this.otp==this.resetForm.controls['otp'].value)
     {
this.stage='pd';

     }
     else
     {
this.emailerr=5;
        return;
     }
    }

     } else if (no==3) {

      if (this.emlForm.invalid) {
       console.log(this.emlForm);
        if (this.emlForm.controls['usremail'].value==null || this.emlForm.controls['usremail'].value=='')
        {
        this.emailerr=1;
        return;

        }
        else  
        {
        this.emailerr=1;
        return;
        }
       
      return;
    }
    else
    {

  console.log(this.emlForm.controls['usremail'].value);

  this.usremail=this.emlForm.controls['usremail'].value;
//https://devapi.krsherpa.com/finduserbyusr/saravanan%40knowledgeridge.com


this.userService.getByeml( this.usremail).subscribe(
       (responseData) => {
       
       console.log('this.responseData2');
        console.log(responseData);

this.uid=responseData['id'];

this.setOTP();
        },
        (error: any) => {
          this.emailerr=3;
          return;

        }

        );

  }

  }
 else if (no==2) {

this.upddata['reset'] = 'no';
 this.upddata.password = this.resetpdForm.controls['pdpassword'].value;
       // this.upddata['status'] = this.statusupdt;


this.userService.updatepd(this.upddata['id'],this.upddata).subscribe(
      async (responseData1) => {    


       console.log('this.responseData2');
        console.log(responseData1);


        //compliance@knowledgeridge.com
  this.emailToSend.push(this.eml);


 await this.router.navigate(['/auth/login']);
//console.log('this.emailToSend'+this.emailToSend);

       // this.emailService.sendComplianceEmail('template_b8m5gbf', this.emailToSend, 'Informative', emailVariableObj);




        },
        (error: any) => {}

        );




      }

  }



getpd() 
{

 console.log('this.uid');
 console.log(this.uid);

this.userService.getupd(this.uid).subscribe(
       (responseData) => {

this.upddata=responseData;   /* */

},

        (error: any) => {}

        );
}



   /**
   * On submit form
   */
  onpdSubmit() {
    this.success = '';
    this.submitted = true;


    // stop here if form is invalid
    if (this.resetpdForm.invalid) {
       console.log(this.resetpdForm);
      return;
    }
    else
    {

  console.log('this.resetpdForm[pdpassword]');
  console.log(this.resetpdForm.controls['pdpassword'].value);
//this.resetpdForm.controls['pdpassword'].value
this.upddata['reset'] = 'no1';
 this.upddata.password = this.resetpdForm.controls['pdpassword'].value;
       // this.upddata['status'] = this.statusupdt;


this.userService.updatepd(this.upddata['id'],this.upddata).subscribe(
      async (responseData1) => {    


       console.log('this.responseData2');
        console.log(responseData1);


        //compliance@knowledgeridge.com
  this.emailToSend.push(this.eml);


        let emailVariableObj = {
          notificationType: 'Informative',
          OTP: this.otp        
        };
 await this.router.navigate(['/auth/login']);
        console.log('this.emailToSend'+this.emailToSend);

       // this.emailService.sendComplianceEmail('template_b8m5gbf', this.emailToSend, 'Informative', emailVariableObj);




        },
        (error: any) => {}

        );


        

   }



       console.log(' form is valid');
    }
  


/********gs***********/


  viewchangepd(win) {

   
   // this.modalService.open(this.changepdwin, { size: 'xl',windowClass: 'modal-holder' });
  }

 /**
   * Logout the user
   */
  onemlSubmit() {
    localStorage.removeItem('user');
    localStorage.clear();

     if (this.resetpdForm.invalid) {
       console.log(this.resetpdForm);
      return;
    }
    else
    {

  console.log(this.emlForm.controls['usremail'].value);

  this.usremail=this.emlForm.controls['usremail'].value;

        if (this.usremail=='')
        {
        this.emailerr=1;
        return;

        }
        else  if (this.usremail =='sss')
        {

        }
        else
        {



        }
  }

  }


  /*******gs*****/



}
