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
import Swal from 'sweetalert2';
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})

/**
 * Starter Component
 */
export class EmployeeComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>; 
  leadForm!: FormGroup;
  employeeData: any;
  id: string='';
  pageTitle: string='';

  isLoading: boolean = false;
  designation: any[]=[];
  repotingManagerList: any[]=[];
  countryArray: any[]=[];
  stateArray: any[]=[];
  regionArray: any[]=[];
  cityList: any[]=[];
  countryISO: string='';
  designationstr: string='';
  btnName: string='';
roles: any[]=[];
selectedroles: any[]=[];
is2enableds: string = '';
  Resolved: boolean = false;
  Approved: boolean = false;
  is1enabled: boolean = false;
   is2enabled: boolean = false;
    is3enabled: boolean = false;
     is4enabled: boolean = false;
      is5enabled: boolean = false;
       is6enabled: boolean= false;
    is7enabled: boolean= false;
     is8enabled: boolean= false;
      is9enabled: boolean= false;
       is10enabled: boolean= false; 
        is11enabled: boolean= false; 
         is12enabled: boolean= false;  
          is13enabled: boolean= false; 
           is14enabled: boolean= false;
           rule3perc: string="2"; 
            rule10perc: string="10";
             rule11perc: string="10"; 
              rule12perc: string="10"; 
           allroles: any[]=[];
           
 selectedrules: any[]=[];

 @Input() empid: string='';
 @Input() readonly: boolean=false;
  constructor(
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
    this.getCountry();
  }

  ngOnInit(): void {
   
    this.pageTitle = 'Create New';
    this.btnName = 'Save';
    this.id = this.empid;// this.route.snapshot.paramMap.get('id')!;
   
   
    this.getReportingManager();
    if (this.id && this.id!='') {
      this.pageTitle = 'Update Employee';
      this.btnName = 'Update';
      //GetData
      this.getEmployeeById(this.id); 




    }
    else{
      this.pageTitle = 'Create Employee';
      this.btnName = 'Create';
    //  this.readonly=false;
    }

    this.breadCrumbItems = [{ label: 'Home' }, { label: 'Employee' }, { label: this.pageTitle, active: true }];
    this.createForm();



this.regionArray=['APAC','EMEA','AMERICAS'];

    this.designation = [
      {
        id: 1,
        role: 'Director',    //1
      },
      {
        id: 2,
        role: 'Admin',  
      },
      {
        id: 3,
        role: 'PnL Head',
      },
      {
        id: 4,
        role: 'Sub PnL Head',
      },
      {
        id: 5,
        role: 'Sales Head',
      },
      {
        id: 6,
        role: 'Sales Manager',
      },
      {
        id: 7,
        role: 'Key Account Manager',
      },
      {
        id: 8,
        role: 'Finance Head',
      },
      {
        id: 9,
        role: 'Finance User',
      },
      {
        id: 10,
        role: 'Research Manager',
      },
      {
        id: 10,
        role: 'Sr. Research Manager',
      },
      {
        id: 11,
        role: 'Research Associate',
      },
      {
        id: 11,
        role: 'Research Analyst',
      },
      {
        id: 11,
        role: 'Sr. Research Analyst',
      },
      {
        id: 11,
        role: 'Research Specialist',
      },
      {
        id: 12,
        role: 'Compliance',
      },      ,
      {
        id: 15,
        role: 'StrategicTeamManager',
      },
      {
        id: 16,
        role: 'StrategicTeamMember',
      },
      {
        id: 17,
        role: 'MckinseyTeam',
      },
    ];


  this.roles = [
      {
        id: 1,
        role: 'director',    //1
      },
      {
        id: 2,
        role: 'admin',  
      },
      {
        id: 3,
        role: 'mainPLHead',
      },
      {
        id: 4,
        role: 'subPLHead',
      },
      {
        id: 5,
        role: 'salesHead',
      },
      {
        id: 6,
        role: 'salesManager',
      },
      {
        id: 7,
        role: 'keyAccountManager',
      },
      {
        id: 8,
        role: 'financeHead',
      },
      {
        id: 9,
        role: 'FinanceUser',
      },
      {
        id: 10,
        role: 'researchManager',
      },      
      {
        id: 11,
        role: 'researchAssociate',
      },
      {
        id: 12,
        role: 'researchAnalyst',
      },     
      {
        id: 13,
        role: 'researchSpecialist',
      },
      {
        id: 14,
        role: 'compliance',
      },
      {
        id: 15,
        role: 'StrategicTeamManager',
      },
      {
        id: 16,
        role: 'StrategicTeamMember',
      },
      {
        id: 17,
        role: 'MckinseyTeam',
      },
    ];

  }
  // generatePwd(event)
  // {
  //   var val = event.target.value
  //   var password:string = val.split('.com');
  //   password = password.charAt(0).toUpperCase() + password.slice(1)+'3172';
  //   this.leadForm.controls['password'].setValue(password);

  // }

reset()
{
//this.IncentiveConfigdata=null;
  this.is1enabled=false;

  this.is2enabled=false;

  this.is3enabled=false;
  this.rule3perc="2";

  this.is4enabled=false;

  this.is5enabled=false;

  this.is6enabled=false;

  this.is7enabled=false;

  this.is8enabled=false;

  this.is9enabled=false;

  this.is10enabled=false;
  this.rule10perc="10";

  this.is11enabled=false;
  this.rule11perc="10";

  this.is12enabled=false;
  this.rule12perc="10";


}

  getruleid(id: string) {
    console.log(id);
    if (id != null && this.roles != undefined) {
      console.log('roles', this.roles);
      const role = this.roles.find((x) => x.role === id);
      if (role && role.id) {
        return  role.id;
      } else {
        return   '' ;
      }
    } else {
      return '';
    }
  }


  checkifruleexists(id: string) {
    console.log(id);
    if (id != null && this.roleincentiveids != undefined) {
      console.log('roles', this.roles);

 for (let i = 0; i < this.roleincentiveids.length; i++) {
            
       if ( this.roleincentiveids[i]==id)
       {
        return true;
       }

      }

 return false;
  }
  return false;
}

  getEmployeeById(id: string) {
    this.isLoading = true;
    this.employeeService.show(id).subscribe(
      (employeeData: any) => {

debugger

        console.log('employeeData', employeeData);
        this.employeeData = employeeData;
     //   this.employeeData.designation = this.designation.find((x) => x.role == this.employeeData.designationStr.trim())?.id;

        this.leadForm.patchValue(this.employeeData);
        // this.createForm1();
        this.isLoading = false;

console.log('this.employeeData');
console.log(this.employeeData);
//let usr= this.getUserroles(this.employeeData["userId"]);
//console.log(usr);
 this.getUserrol();
 this.getUseracess();
      },
      (error: any) => {
        this.isLoading = false;
      }
    );
  }

isenabled: boolean= false;
  usersAcessdata: any;
  getUseracess() {

this.userService.getupd(this.employeeData["userId"]).subscribe(
      async (responseData) => {
       this.usersAcessdata=responseData;

       console.log('this.responseData2');
        console.log(responseData);


      if(responseData["enabled"]==null || responseData["enabled"]=='yes')
      {
        this.isenabled=true;

      }
      else
      {
        this.isenabled=false;
      }


      if(responseData["reset"]==null || responseData["reset"]=='yes')
      {

 console.log('reset null or yes');

 
      }
      else
      {
console.log('reset no');

      }

        },
        (error: any) => {}

        );



}

  usersArray: any;

  getUserroles(id: string) {
    console.log('id is',id);
    if (id != null && this.usersArray != undefined) {  
      console.log('usersArray', this.usersArray);
     // var user = this.usersArray.find(x => x.id == id);  
console.log(id);
      const user = this.usersArray.find((obj:any) => {

  return this.id=obj.id;
});

    }
  }



  getUserrol() {
    this.userService.getById(this.employeeData["userId"]).subscribe(
      (userArray: any) => {
        this.usersArray = userArray;


this.selectedroles=userArray['roles'];

console.log('this.selectedroles');
console.log(this.selectedroles);

      },
      (error: any) => {}
    );
  }


  getUserrles() {

this.userService.getupd(this.employeeData["userId"]).subscribe(
      async (responseData) => {
       
       console.log('this.responseData2');
        console.log(responseData);


      if(responseData["reset"]==null || responseData["reset"]=='yes')
      {

 console.log('reset null or yes');

 await this.router.navigate(['/reset-password']);
      }
      else
      {
console.log('reset no');

      }

        },
        (error: any) => {}

        );



}

  getReportingManager() {
    this.employeeService.getAll().subscribe(
      (res) => {
        this.repotingManagerList = res;
        this.isLoading = false;
      },
      (error: any) => {
        this.isLoading = false;
      }
    );
  }

  private createForm() {
    this.leadForm = this.formBuilder.group({
      name: ['', [Validators.nullValidator]],
      designation: ['', [Validators.required]],
      password: ['', [Validators.required]],
      phonecode: [''],
      contactNo: [''],
      email: ['', Validators.required],
      status: [''],
      type: [''],
      alternateMobile: [''],
      addressLine1: [''],
      addressLine2: [''],
      city: [''],
      region: [''],
      state: [''],
      country: [''],
      zipCode: [''],
     incentives: ['1'],
      panCard: [''],
      aadharCardNo: [''],
      bankAccountType: [''],
      bankAccountNumber: [''],
      bankName: [''],
      branchName: [''],
      ifscCode: [''],
      shiftCode: [''],
      repotingManagerId: [''],
      variablesalary : [0],
    });

    this.isLoading = false;
  }

  private createForm1() {
    this.leadForm = this.formBuilder.group({
      ...this.employeeData,
    });
  }

  saveDesignationStr(event:any) {
    this.designationstr = event.target.options[event.target.options.selectedIndex].text;
  }


submitRoles() {



    if (this.selectedroles) {
    
     this.usersArray["roles"]=this.selectedroles;

      this.isLoading = true;

      if (this.usersArray) {
      
        //Update service call
        
     
      

      this.userService.updateById(this.employeeData["userId"],  this.usersArray).subscribe(
        (data: any) => {
          log.info('Roles saved successfully');
         // this.router.navigate(['/admin/employee']);

           // this.toasterService.success('Data updated successfully.', 'Success!');

           let timerInterval: any;
           Swal.fire({
             title: 'Data updated successfully!',
             icon: 'success',
             timer: 2000,
             timerProgressBar: true,
             willClose: () => {
               clearInterval(timerInterval);
             },
           }).then((result) => {
             /* Read more about handling dismissals below */
             if (result.dismiss === Swal.DismissReason.timer) {
             }
           });  

         console.log('roles saved');
          this.isLoading = false;
        },
        (error: any) => {

           // this.toasterService.error('Data not updated .', 'Error!');

           let timerInterval: any;
           Swal.fire({
             title: 'Data not updated !',
             icon: 'warning',
             timer: 2000,
             timerProgressBar: true,
             willClose: () => {
               clearInterval(timerInterval);
             },
           }).then((result) => {
             /* Read more about handling dismissals below */
             if (result.dismiss === Swal.DismissReason.timer) {
             }
           });  


           console.log('roles not saved');
           console.log(error);
          log.info(`Update Roles error: ${error}`, error);
          this.isLoading = false;
        }
      );

    }

    }
  }

//submitaccessrest()
submitaccess() {


 // this.EditInvoiceevnts.indexOf()
 let isOK = confirm("Are you sure to modify this user access?.Disabled Employee's POC details will be removed.");
if (isOK)
{


    if ( this.usersAcessdata) {
    
    
      this.isLoading = true;

       console.log(this.isenabled);
      
      if( this.isenabled)
      {
        this.usersAcessdata["enabled"]="yes";

      }
      else
      {
        this.usersAcessdata["enabled"]="no";
      }
        //Update service call
            
     

      this.userService.updatepdothers(this.usersAcessdata["id"], this.usersAcessdata).subscribe(
        (data: any) => {

          if( !this.isenabled)
          {

          this.updatePOC()
          }
           // this.toasterService.success('Data updated successfully.', 'Success!');
           let timerInterval: any;
           Swal.fire({
             title: 'Data updated successfully!',
             icon: 'success',
             timer: 2000,
             timerProgressBar: true,
             willClose: () => {
               clearInterval(timerInterval);
             },
           }).then((result) => {
             /* Read more about handling dismissals below */
             if (result.dismiss === Swal.DismissReason.timer) {
             }
           });  

          log.info('Data saved successfully');
         // this.router.navigate(['/admin/employee']);
         console.log('Data saved successfully');
          this.isLoading = false;
        },
        (error: any) => {
            // this.toasterService.error('Data not updated .', 'Error!');

           console.log('Data not saved. Error');
          log.info(`Update Roles error: ${error}`, error);
          this.isLoading = false;
        }
      );

  

    }

  }

  }

  //expertData: Expert;
  updatePOC()
  {
    let expert = {"krRelationshipMgrId":'',
    "krRelationshipMgr":'',
    prevKRId:this.usersAcessdata["userId"]    
  }   //this.expertData;

//let expert =  this.expertData;

    const wheremp = new Map();

    const filter = {
     
      "krRelationshipMgrId":this.usersAcessdata["userId"]      //expert.krRelationshipMgrId
     
    };


    
          wheremp.set('where', JSON.stringify(filter));
    


    this.expertService.updatePOC(wheremp, expert).subscribe((data) => {
     // this.toasterService.success('POC Details updated successfully.', 'Success!');
     
     
     
     // this.getExperts(this.id);
    });

  }





//submitaccessrest()
submitaccessrest() {


 // this.EditInvoiceevnts.indexOf()
 let isOK = confirm("Are you sure to reset this user access?");
if (isOK)
{

    if ( this.usersAcessdata) {
    
    
      this.isLoading = true;

       console.log(this.isenabled);
      
      
        this.usersAcessdata["reset"]="yes";

        //Update service call
            
     

      this.userService.updatepdothers(this.usersAcessdata["id"], this.usersAcessdata).subscribe(
        (data: any) => {


           // this.toasterService.success('Data updated successfully.', 'Success!');


          log.info('Data saved successfully');
         // this.router.navigate(['/admin/employee']);
         console.log('Data saved successfully');
          this.isLoading = false;
        },
        (error: any) => {
            // this.toasterService.error('Data not updated .', 'Error!');

           console.log('Data not saved. Error');
          log.info(`Update Roles error: ${error}`, error);
          this.isLoading = false;
        }
      );

  

    }

  }
  }

  submitData() {
    if (this.leadForm.valid) {
      let leadSubmit$;
      this.leadForm.value.designation = parseInt(this.leadForm.value.designation);
      this.leadForm.value.image = '';
      this.leadForm.value.designationStr = this.employeeData?.designationStr
        ? this.employeeData?.designationStr
        : this.designationstr;
 //incentives
  this.leadForm.value.incentives=5;
      this.isLoading = true;

      if (this.id !='' ) {
        this.leadForm.value.userId = this.employeeData.userId;

        //Update service call
        leadSubmit$ = this.employeeService.update(this.id, this.leadForm.value);
        leadSubmit$.subscribe(
          (data: any) => {
            log.info('Employee saved successfully');
  
            let timerInterval: any;
            Swal.fire({
              title: 'Employee saved successfully!',
              icon: 'success',
              timer: 2000,
              timerProgressBar: true,
              willClose: () => {
                clearInterval(timerInterval);
              },
            }).then((result) => {
              /* Read more about handling dismissals below */
              if (result.dismiss === Swal.DismissReason.timer) {
              }
            });  
  
            
           // this.router.navigate(['/admin/employee']);
            this.isLoading = false;
          },
          (error: any) => {
            let timerInterval: any;
            Swal.fire({
              title: 'Data not updated !',
              icon: 'warning',
              timer: 2000,
              timerProgressBar: true,
              willClose: () => {
                clearInterval(timerInterval);
              },
            }).then((result) => {
              /* Read more about handling dismissals below */
              if (result.dismiss === Swal.DismissReason.timer) {
              }
            });  
            log.info(`Create Employee error: ${error}`, error);
            this.isLoading = false;
          }
        );
     
      } else {
        //Create new lead
        leadSubmit$ = this.employeeService.create(this.leadForm.value);
        leadSubmit$.subscribe(
          (data: any) => {
            log.info('Employee saved successfully');
  
            let timerInterval: any;
            Swal.fire({
              title: 'Employee saved  successfully!',
              icon: 'success',
              timer: 2000,
              timerProgressBar: true,
              willClose: () => {
                clearInterval(timerInterval);
              },
            }).then((result) => {
              /* Read more about handling dismissals below */
              if (result.dismiss === Swal.DismissReason.timer) {
              }
            });  
  this.modalService.dismissAll();
            
           // this.router.navigate(['/admin/employee']);
            this.isLoading = false;
          },
          (error: any) => {


            log.info(`Create Employee error: ${error}`, error);
            this.isLoading = false;
            let timerInterval: any;
            Swal.fire({
              title: 'Data not updated !',
              icon: 'warning',
              timer: 2000,
              timerProgressBar: true,
              willClose: () => {
                clearInterval(timerInterval);
              },
            }).then((result) => {
              /* Read more about handling dismissals below */
              if (result.dismiss === Swal.DismissReason.timer) {
              }
            });  
          }
        );
     
      }

     
    }
  }

  cancelForm() {
    this.router.navigate(['/admin/employee']);
  }

  getCountry() {
    this.countryArray = Country.getAllCountries();
    this.countryArray.forEach((element) => {
      element['label'] = element.name + ' ' + element.phonecode;
    });
  }

  CountryId(event:any) {
    this.countryISO = event.isoCode;
    this.stateArray = State.getStatesOfCountry(this.countryISO);
  }

  StateId(event:any) {
    const stateISO = event.isoCode;
    this.cityList = City.getCitiesOfState(this.countryISO, stateISO);
  }


 expand(event:any){
         if (event.style.display === "block") {
           event.style.display = "none";
       } else {
             event.style.display = "block";
        }  
    }

/*********************gs**************/

submitincentive()
{


this.selectedrules=[];

if (this.is1enabled)  
{
  this.selectedrules.push({"rule":1,"rulename":"No Incentives","perc":0,"val1":0})
}
 if (this.is2enabled)  
{
  this.selectedrules.push({"rule":2,"rulename":"Researcher’s Incentives: (TRR & Hon based)","perc":0,"val1":0})
}
 if (this.is3enabled)  
{
  this.selectedrules.push({"rule":3,"rulename":"Researcher’s Incentives: (GP Based)","perc":this.rule3perc,"val1":0})
}
 if (this.is4enabled)  
{
  this.selectedrules.push({"rule":4,"rulename":" Research Manager Incentives","perc":0,"val1":0})
}
 if (this.is5enabled)  
{
  this.selectedrules.push({"rule":5,"rulename":"Asso. Research Manager Incentives ","perc":0,"val1":0})
}
 if (this.is6enabled)  
{
  this.selectedrules.push({"rule":6,"rulename":"Asso. Account Manager Incentives ","perc":0,"val1":0})
}
 if (this.is7enabled)  
{
  this.selectedrules.push({"rule":7,"rulename":"Account Manager Incentives - Key Account Manage","perc":0,"val1":0})
}
 if (this.is8enabled)  
{
  this.selectedrules.push({"rule":8,"rulename":"Account Manager Incentives - Account Manager ","perc":0,"val1":0})
}
 if (this.is9enabled)  
{
  this.selectedrules.push({"rule":9,"rulename":"Account Manager Incentives - Associate Account Manager ","perc":0,"val1":0})
}
 if (this.is10enabled)  
{
  this.selectedrules.push({"rule":10,"rulename":"AVP Incentives ","perc":this.rule10perc,"val1":0})
}
 if (this.is11enabled)  
{
  this.selectedrules.push({"rule":11,"rulename":"VP Incentives ","perc":this.rule11perc,"val1":0})
}
 if (this.is12enabled)  
{
  this.selectedrules.push({"rule":12,"rulename":"SVP Incentives","perc":this.rule12perc,"val1":0})
}



 console.log(this.selectedrules);


this.employeeData.incentiveids=this.selectedrules


     this.employeeService.update(this.id, this.employeeData).subscribe(
        (data: any) => {


           // this.toasterService.success('Data updated successfully.', 'Success!');


          log.info('Data saved successfully');
         // this.router.navigate(['/admin/employee']);
         console.log('Data saved successfully');
          this.isLoading = false;
            this.modalService.dismissAll();
        },
        (error: any) => {
            // this.toasterService.error('Data not updated .', 'Error!');

           console.log('Data not saved. Error');
          log.info(`Update Roles error: ${error}`, error);
          this.isLoading = false;
        }
      );

  




}

roleincentiveids:any[]=[];

getrules(selectClientUserModal:any)
{
this.reset();
this.roleincentiveids=[] ;

 const filters = new Map();

 var concat=[];

  for (let i = 0; i < this.selectedroles.length; i++) {
        
  //concat.push({ "roleid":+this.getruleid(this.selectedroles[i])+""});
  //concat.push(this.getruleid(this.selectedroles[i])+"");

     
//this.selectedroles
 /* const filter = {
      where: {
       roleid:{ in: 
          concat
        },
      },
    };    */
 /* const filter = {
      where: {
        or: 
          concat
        ,
      },
    };  */
/*
    const filter = {
      where: {
        and: [
          {
            roleid: ""+this.selectedroles,
          },
        ],
      },
    }; */
const filter = {
      where: {
        and: [
          {
            roleid: ""+this.getruleid(this.selectedroles[i]),
          },
        ],
      },
    };
   // filter.where = { "roleid": ""+this.selectedroles };   //"where:{ 'roleid': ''+this.selectedroles }"
 console.log (this.selectedroles)
  console.log (filter)
    filters.set('filter', JSON.stringify(filter));

    this.IncentiveConfigservice.getAll(filters).subscribe(
      (client: any) => {
  //this.IncentiveConfigdata=client;
    console.log(client[0]["incentiveids"])
for (let i = 0; i < client[0]["incentiveids"].length; i++) {
        let contact: any = client[0]["incentiveids"][i];
this.roleincentiveids.push (contact.rule)
}

},
      (error: any) => {}
    );
 }
console.log('this.employeeData.incentiveids', this.employeeData.incentiveids);

if (this.employeeData.incentiveids!=undefined)
{
for (let i = 0; i < this.employeeData.incentiveids.length; i++) {

 let contact: any = this.employeeData.incentiveids[i];

if (contact.rule==1)  
{
  this.is1enabled=true;
}
else if (contact.rule==2)
{
  this.is2enabled=true;
}
else if (contact.rule==3)
{
  this.is3enabled=true;
this.rule3perc=contact.perc;
}
else if (contact.rule==4)
{
  this.is4enabled=true;
}
else if (contact.rule==5)
{
  this.is5enabled=true;
}
else if (contact.rule==6)
{
  this.is6enabled=true;
}
else if (contact.rule==7)
{
  this.is7enabled=true;
}
else if (contact.rule==8)
{
  this.is8enabled=true;
}
else if (contact.rule==9)
{
  this.is9enabled=true;
}
else if (contact.rule==10)
{
  this.is10enabled=true;
  this.rule10perc=contact.perc;
}
else if (contact.rule==11)
{
  this.is11enabled=true;
  this.rule11perc=contact.perc;
}
else if (contact.rule==12)
{
  this.is12enabled=true;
  this.rule12perc=contact.perc;
}

 console.log(contact.rule + " -- " + contact.perc);
}
  }       
        this.isLoading = false;
       // this.IncentiveConfigdata = client;
       //  console.log('IncentiveConfigservice Details', this.IncentiveConfigdata);


    this.modalService.open(selectClientUserModal, { size: 'xl', centered: true, windowClass: 'modal-holder' });
  

        //   var userData = JSON.parse(window.localStorage.getItem('user'));
      

}







}
