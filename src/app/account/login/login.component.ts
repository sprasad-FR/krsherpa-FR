import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
// Login Auth
import { environment } from '../../../environments/environment';
//import { AuthenticationService } from '../../core/services/auth.service';
//import { AuthfakeauthenticationService } from '../../corelocalStorage/services/authfake.service';
import { first } from 'rxjs/operators';
import { ToastService } from './toast-service';

// gs
import { Logger } from '../../core/logger.service';
import {  untilDestroyed } from '../../core/until-destroyed'
import { AuthenticationService } from '../../core/services/auth.service';
import {  CredentialsService } from '../../core/services/credentials.service';
import { ClientsService } from '../../core/services/clients.service';
import { UserService } from '../../core/services/kruser.service';

import { EmployeeService } from '../../core/services/employee.service';
import { ExpertService } from '../../core/services/expert.service';


import { HttpDispatcherService } from '../../core/http/http-dispatcher.service' 
  //'/../../../../  core/ /http/http-dispatcher.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login Component
 */
export class LoginComponent implements OnInit {

  // Login Form
  loginForm!: UntypedFormGroup;
  submitted = false;
  fieldTextType!: boolean;
  error = '';
  returnUrl: string;

  toast: false;
  pderror:boolean=false;
  clientList: any[];
  clientData: any;

  // set the currenr year
  year: number = new Date().getFullYear();
  userData: any;
  expertData: any;
  expertList: any[];

  

  // set the current year


  constructor(private formBuilder: UntypedFormBuilder,private authenticationService: AuthenticationService,private router: Router,
    private route: ActivatedRoute,public toastService: ToastService,
   
    private readonly credentialService: CredentialsService,
    public clientsService: ClientsService,
    public expertService: ExpertService,
    private employeeService: EmployeeService,
    private userService: UserService
    
    
    ) {
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) {
        this.router.navigate(['/']);
      }
     }

     ngOnDestroy() {}


  ngOnInit(): void {
    if(localStorage.getItem('currentUser')) {
      this.router.navigate(['/']);
    }
    this.pderror=false;
    /**
     * Form Validatyion
     */
     this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    // get return url from route parameters or default to '/'
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
   onSubmit1() {
    this.submitted = true;

    // Login Api  username
  //  this.authenticationService.login(this.f['email'].value, this.f['password'].value).subscribe((data:any) => {   
    /* var jsn={
      username:this.f['username'].value,
      password:this.f['password'].value,
     } */
     
     debugger
     if (this.loginForm.invalid) {
      return;
    } else {
   //  this.authenticationService.login(this.loginForm.value)



   console.log(this.loginForm.value )

      this.authenticationService.login(
        this.loginForm.value
       ).subscribe((data:any) => {   
   
debugger
   
      console.log(data )
      
      if(data.token != ''){

        /*
        var usr= {id: 545455,
        username: 'gs',
        password: 'dfdffff',
        firstName: 'gs',
        lastName: 'g',
        token: data.token,
        email: 'dgdfgsfd@dfdsf.com'
        } */
   localStorage.setItem('credentialsKey', data.token);

        localStorage.setItem('toast', 'true');
      //  localStorage.setItem('currentUser', JSON.stringify(usr));
      //  localStorage.setItem('user', JSON.stringify(usr));
        localStorage.setItem('token', data.token);
       // this.router.navigate(['/regular']);
        this.router.navigate(['/salesleads/list']);
       // this.router.navigate(['/expert/expert-view/'],  { queryParams: { id: '6255cca176264b02817eaed9' } } );
      } else {
       // this.toastService.show(data.data, { classname: 'bg-danger text-white', delay: 15000 });
      }

    }
    ,
          (error: any) => {
            console.log(error )
            //log.debug(`Login error: ${error}`, error);
            this.error = error?.message;
          }
    
    
    );
  }




    // stop here if form is invalid
    // if (this.loginForm.invalid) {
    //   return;
    // } else {
    //   if (environment.defaultauth === 'firebase') {
    //     this.authenticationService.login(this.f['email'].value, this.f['password'].value).then((res: any) => {
    //       this.router.navigate(['/']);
    //     })
    //       .catch(error => {
    //         this.error = error ? error : '';
    //       });
    //   } else {
    //     this.authFackservice.login(this.f['email'].value, this.f['password'].value).pipe(first()).subscribe(data => {
    //           this.router.navigate(['/']);
    //         },
    //         error => {
    //           this.error = error ? error : '';
    //         });
    //   }
    // }
  }

  onSubmit() {
    this.submitted = true;

    this.login();
  }



  login() {
    this.submitted = true;
    debugger
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      console.log('Login Component: (invalid) -  ');
      return;
    } else {
      const login$ = this.authenticationService.login(this.loginForm.value);
      login$
        .pipe(
          finalize(() => {
            this.loginForm.markAsPristine();
          }),
          untilDestroyed(this)
        )
        .subscribe(
          async (responseData: any) => {
            debugger
          //  localStorage.setItem('token', responseData.token);
          //  console.log('Login Component: (Success) -  ', responseData);
           // this.credentialService.setCredentials(responseData['token'], true);  //this.loginForm.value['rememberMe']
            //this.router.navigate([this.route.snapshot.queryParams.redirect || '/dashboard'], { replaceUrl: true });
            if (responseData.token !='')
            {
            localStorage.setItem('token', responseData.token);
            console.log('Login Component: (Success) -  ', responseData);
            this.credentialService.setCredentials(responseData['token'], true);  //this.loginForm.value['rememberMe']
            //this.router.navigate([this.route.snapshot.queryParams.redirect || '/dashboard'], { replaceUrl: true });
          //  this.toastService.show(data.data, { classname: 'bg-danger text-white', delay: 15000 });
            // Get user details
             this.whoMe();
            }
            else{
              debugger
              this.pderror=true;
              return ;
            //  this.toastService.show('Invalid Credentials', { classname: 'bg-danger text-white', delay: 15000 });
            }
            await this.whoMe();
          },
          (error: any) => {
           // log.debug(`Login error: ${error}`, error);
           // this.error = error?.message;
           debugger
            this.pderror=true;
            return ;
         //   this.toastService.show('Invalid Credentials', { classname: 'bg-danger text-white', delay: 15000 });
      
          }
        );
    }
  }
 isreset:number;

  private async whoMe() {
    this.authenticationService.whoAmI().subscribe(
      async (responseData) => {

        this.userData = responseData;

        if (this.userData.roles[0] == 'client' || this.userData.roles[0] == 'expert') {

          this.pderror=true;
        //  this.toastService.show('Invalid Credentials', { classname: 'bg-danger text-white', delay: 15000 });
          localStorage.removeItem('token');
  
          return; 

        }

        localStorage.setItem('user', JSON.stringify(responseData));
        this.employeeService.getAll().subscribe((res) => {

           console.log('this.employeeService');
        console.log(res);
          let allEmployee = res;
          //set Employee list on localstorage
          localStorage.setItem('emp', JSON.stringify(allEmployee));
        });

        this.employeeService.getAllEnabled().subscribe((res) => {
         
        console.log(res);
         let allActiveEmployee = res;
         //set Employee list on localstorage
         localStorage.setItem('empActive', JSON.stringify(allActiveEmployee));
       });


const filters = new Map();

    const filter = {
      where: {
        and: [
          {
            username: this.userData["username"],
          },
        ],
      },
    };

    filters.set('filter', JSON.stringify(filter));

/*

this.userService.getUsers(filters).subscribe(
      async (responseData) => {
       
       console.log('this.responseData');
        console.log(responseData);
        },
        (error: any) => {}

        );

*/
//Let isreset=0;

 this.isreset=0;

this.userService.getupd(this.userData["id"]).subscribe(
      async (responseData) => {
       
       console.log('this.responseData2');
        console.log(responseData);


      if(responseData["reset"]==null || responseData["reset"]=='yes')
      {

         console.log('reset null or yes');
        this.isreset=1;

         await this.router.navigate(['/change-password']);
      }
      else
      {
         console.log('reset no');
          if (this.userData.roles[0] == 'client' || this.userData.roles[0] == 'expert') {
         // await this.setData();
        } else {


        //  this.userData.roles=[];
        //  this.userData.roles.push('StrategicTeamManager');

         // console.log( this.userData.roles[0]);
/*
          if (this.userData.roles[0] == 'StrategicTeamManager' ||this.userData.roles[0] == 'StrategicTeamMember' )
          {

  await this.router.navigate(['expert/allocationlist']);
          }
          else{

          await this.router.navigate(['/dashboard']);
          }  */
// await this.router.navigate(['/dashboard']);
          await this.router.navigate(['/regular']);
      //   this.router.navigate(['/expert/confirm-expert/6255cca176264b02817eaed9'] );
   
        }

      }

        },
        (error: any) => {}

        );

 //console.log(this.isreset);
      //  console.log('this.userData');
      //  console.log(this.userData);

        if (this.isreset==0)
      {

       
      }
      },
      (error: string) => {
      //  log.error('contacts:', error);
      }
    );
  }


  private setData() {
    if (this.userData.roles[0] == 'client') {
      const filters1 = new Map();
      const filter1 = {
        where: { 'clientUser.userId': this.userData.id },
      };
      filters1.set('filter', JSON.stringify(filter1));
      this.clientsService.getAll(filters1).subscribe(
        (clients) => {
          this.clientList = clients;
          this.clientData = this.clientList[0];
          localStorage.setItem('client', JSON.stringify(this.clientData));
          this.router.navigate(['/client-dashboard']);
        },
        (error: any) => {}
      );
    } else {
      const filters = new Map();
      const filter = {
        where: { userId: this.userData.id },
      };
      filters.set('filter', JSON.stringify(filter));

  var exlst=this.expertService.getexmindata();


      this.expertService.getAll(filters).subscribe(
        (expert) => {
          this.expertList = expert;
          this.expertData = this.expertList[0];
          localStorage.setItem('expert', JSON.stringify(this.expertData));
          if (this.expertData.terms == true) {
            this.router.navigate(['/expert-dashboard']);
          } else {
            this.router.navigate(['/confirm-expert/', this.expertData.id]);
          }
        },
        (error: any) => {}
      );
    }
  }


  /**
   * Password Hide/Show
   */
   toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}
