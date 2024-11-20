import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Incentives } from '../../../core/models/incentive.model';
import { employeeUser } from '../../../core/models/employee.model';
import { EmployeeService } from '../../../core/services/employee.service';
import { IncentivesService } from '../../../core/services/incentives.service';
import { ProjectService } from '../../../core/services/project.service';
import { UserService } from '../../../core/services/kruser.service';
import { EventService } from '../../../core/services/event.service';
@Component({
  selector: 'app-incentives',
  templateUrl: './incentives.component.html',
  styleUrls: ['./incentives.component.scss'],
})
export class IncentivesComponent implements OnInit {
  breadCrumbItems: (
    | { label: string; path: string; redirectTo: string; active?: undefined }
    | { label: string; active: boolean; path?: undefined; redirectTo?: undefined }
  )[];
  isLoading: boolean;
  allEmployee: employeeUser[];
  emp: employeeUser;
  leadForm: FormGroup;
  years = [];
  incentiveAmtTRR: number = 0;
  incentiveAmtHon: number = 0;
  selectedroles: any[];
  //months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  incentives: Incentives[] = [];
  constructor(
    private employeeService: EmployeeService,
    private formBuilder: FormBuilder,
     private userService: UserService,
      private readonly eventService: EventService,
      private projectService: ProjectService,
    private readonly incentiveService: IncentivesService
  ) {}
  pageTitle: string;
  ngOnInit(): void {
    let year = new Date().getFullYear();
    for (let i = year; i > year - 3; i--) {
      this.years.push(i);
    }
    this.breadCrumbItems = [
      { label: 'Dashboard', path: 'dashboard', redirectTo: '/dashboard' },
      { label: 'Sales', active: true },
    ];
    this.pageTitle = 'Incentives';
    this.isLoading = false;

    this.employeeService.getAll().subscribe(
      (res) => {
        this.allEmployee = res;
      },
      (error: any) => {}
    );

    this.createForm();
  }
  private createForm() {
    this.leadForm = this.formBuilder.group({
      employeeId: ['', [Validators.required]],
      month: ['', [Validators.required]],
      year: ['', [Validators.required]],
    });

    this.isLoading = false;
  }

  GetIncentives() {

    this.emp = this.allEmployee.find((a) => a.userId == this.leadForm.value.employeeId);
    if (this.leadForm.value.employeeId && this.leadForm.value.month && this.leadForm.value.year) {
      this.incentiveService
        .GetIncentiveForMonth(this.leadForm.value.employeeId, this.leadForm.value.month, this.leadForm.value.year)
        .subscribe((data) => {
          if (data.length) {
            this.incentives = data;
            this.calculateIncentiveForMonth(data);
          }
        });
    }
  }

  calculateIncentiveForMonth(data) {
    if (data.length) {
      if (this.emp) {
        if (!this.emp.designationStr) {
          this.emp.designationStr = 'Research Analyst';
        }
        if (!this.emp.incentives) {
          this.emp.incentives = 3000;
        }
      }
      let SlabByDesignation = this.incentiveService.getSlabByDesignation(this.emp.designationStr);
      console.log(SlabByDesignation);
      let honSum = 0;
      for (let i = 0; i < data.length; i++) {
        honSum += data[i].honorarium;
      }
      let avgHon = honSum / data.length;
      let totalTrrAmt = (this.emp.incentives / 100) * this.incentiveService.IncentivesDistribution.TRR;
      let totalHon = (this.emp.incentives / 100) * this.incentiveService.IncentivesDistribution.Hon;
      let applicableTrrPercent = this.incentiveService.getSlabPercent(data.length, SlabByDesignation["trr"]);
      let applicableHonPercent = this.incentiveService.getSlabPercent(avgHon, SlabByDesignation["hon"]);
      this.incentiveAmtTRR = (totalTrrAmt / 100) * applicableTrrPercent;
      this.incentiveAmtHon = (totalHon / 100) * applicableHonPercent;
    }
  }




/*******gs*******************/


  calculateIncentiveForEMPMonth(designationstr:string,trr:number,hon:number) {
  
        console.log(designationstr);
      let SlabByDesignation = this.incentiveService.getSlabByDesignation(designationstr);
      console.log(SlabByDesignation);
      let honSum = 0;
          console.log('incentiveAmtTRR',this.incentiveAmtTRR);       console.log('incentiveAmtTRR',this.incentiveAmtTRR);
    //  for (let i = 0; i < data.length; i++) {
     //   honSum += data[i].honorarium;
     // }
     //let avgHon = honSum / data.length;
    //  let totalTrrAmt = ((this.emp.variablesalary*.8) / 100) * this.incentiveService.IncentivesDistribution.TRR;
     // let totalHon = (this.emp.variablesalary*.2 / 100) * this.incentiveService.IncentivesDistribution.Hon;
    var totalTrrAmt=0;
    var totalHon =0;
       totalTrrAmt = ((Number(this.emp.variablesalary)*.8) ) ;
       totalHon = ((Number(this.emp.variablesalary)*.2) ) ;
      let applicableTrrPercent = this.incentiveService.getSlabPercent(trr, SlabByDesignation["trr"]);
      let applicableHonPercent = this.incentiveService.getSlabPercent(hon, SlabByDesignation["hon"]);
      this.incentiveAmtTRR = (totalTrrAmt / 100) * applicableTrrPercent;
      this.incentiveAmtHon = (totalHon / 100) * applicableHonPercent;
    
console.log('totalTrrAmt',totalTrrAmt);
console.log('applicableTrrPercent',applicableTrrPercent);
console.log('incentiveAmtTRR',this.incentiveAmtTRR);

console.log('totalHon',totalHon);
console.log('applicableHonPercent',applicableHonPercent);
console.log('incentiveAmtHon',this.incentiveAmtHon);

this.incentivetotal=this.incentiveAmtTRR+this.incentiveAmtHon;

  }

  getUserrol() {

    this.emp = this.allEmployee.find((a) => a.userId == this.leadForm.value.employeeId);
 console.log('emp');
console.log(this.emp);

    if (this.emp==undefined)
    {
      return;
    }


this.selectedroles=this.emp?.incentiveids;

console.log('this.selectedroles');
console.log(this.selectedroles);
  /*  this.userService.getById(this.emp.userId).subscribe(
      (userArray: any) => {
      //  this.usersArray = userArray;
console.log('this.userArray',userArray);

this.selectedroles=userArray['incentiveids'];


console.log('this.selectedroles');
console.log(this.selectedroles);

      },
      (error: any) => {}
    ); */
  }


  get4RMInc() {

    let emps = this.allEmployee.filter((a) => a.repotingManagerId == this.leadForm.value.employeeId);
 console.log('emps');
console.log(emps);

    if (emps==undefined)
    {
      return;
    }
    let Totalamt=0;

 for (let n = 0; n < emps.length; n++) {


Totalamt+=this.getReaserchTRRcnt(emps[n]?.userId,emps[n]?.designationStr);


 }

this.incentivetotal =Totalamt;

}

AvghonSum:any;
tottrrsum:any;
incentivetotal:any;


getIncentiv() {

debugger;

if(this.selectedroles?.length >0){
 for (let n = 0; n < this.selectedroles.length; n++) {

    if (this.selectedroles[n]["rule"]==2)
    {
        this.getReaserchIncentive("researchAnalyst")

     } else if (this.selectedroles[n]["rule"]==3)
     {
        this.get3ResearcherGP(this.leadForm.value.employeeId,this.selectedroles[n]['perc'])
     } else if (this.selectedroles[n]["rule"]==4)
     {
        this.get3ResearcherGP(this.leadForm.value.employeeId,this.selectedroles[n]['perc'])
     }

this.get4RMInc() ;
 }
}

}



 getReaserchTRRcnt(user:any,role:any) {
  let amttot=0;
 let honSum = 0;
    let trrsum = 0;
if (this.leadForm.value.employeeId && this.leadForm.value.month && this.leadForm.value.year) {

    const filters = new Map();
    const filter = {
     

      where: {},
      order: 'createdAt DESC',
    };


var start=this.leadForm.value.year +"-"+this.leadForm.value.month+"-1"; 

var end=this.leadForm.value.year +"-"+this.leadForm.value.month+"-31";

      console.log("start ",start)
       console.log("end ",end)
        filter.where = {
          and: [
                      
              {"givenToAccMgr.attachedBy": 
                user                  //this.leadForm.value.employeeId,
              },
           // {"createdAt":{"gte" :"2202-"}},
           // {"createdAt":{"lt" :end}}
              {"createdAt":{"gte" :start}},
            {"createdAt":{"lt" :end}}
          ],
        };
     
    

    filters.set('filter', JSON.stringify(filter));
    this.projectService.getAll(filters).subscribe(
      (projects: any) => {



     console.log("projects ",projects)
        console.log("projects cnt",projects.length)
        this.isLoading = false;
 console.log("projects givenToAccMgr",projects[1].givenToAccMgr)

 for (let n = 0; n < projects.length; n++) {
const result = projects[n].givenToAccMgr.filter( project=> project.attachedBy === user);
 console.log("result cnt",result.length);
trrsum+=result.length;

var accumulator;
 


//result.reduce((accumulator, current) => accumulator + current.rate, 0);

}
let trgt=0;
let perc=0;

 trgt=this.getTrrTargetByDesignation(role);
 perc=(trrsum*100)/trgt;
 amttot=6000* (perc/100)
return amttot; 
  console.log(amttot);

      },
      (error: any) => {
        this.isLoading = false;
      }
    );
  



}

return amttot;

}


  getTrrTargetByDesignation(designation) {
    switch (designation) {
      case 'Research Associate':
        return 21;
        break;
      case 'Research Analyst':
      console.log('researchAnalyst',designation);
        return 26;
        break;
      case 'Sr. Research Analyst':
        return 31;
        break;
      case 'Research Specialist':
        return 35;
        break;
    }
    return 0
  }





 getReaserchIncentive(role:any) {


     console.log("role-- ",role)

   let honSum = 0;
    let trrsum = 0;
  //  this.client = JSON.parse(localStorage.getItem('client'));
  //  this.expert = JSON.parse(localStorage.getItem('expert'));
  //  this.isLoading = true;
if (this.leadForm.value.employeeId && this.leadForm.value.month && this.leadForm.value.year) {
    const filters = new Map();
    const filter = {
     

      where: {},
      order: 'createdAt DESC',
    };
/*
    if (this.roles === 'researchAnalyst') {
      filter.where = { researchAnalyst: this.whoaim.id };
    }
    if (this.roles === 'researchManager') {
      filter.where = { researchManagerId: this.whoaim.id };
    }
    if (this.roles === 'keyAccountManager') {
      filter.where = { keyAccMgrId: this.whoaim.id };
    }
    if (this.roles === 'client') {
      filter.where = { clientId: this.client.id };
    }
    if (
      this.roles === 'admin' ||
      this.roles === 'compliance' ||
      this.roles === 'mainPLHead' ||
      this.roles === 'subPLHead'
    ) {
      //filter.where = {};
    }
    if (this.roles === 'expert') {
      filter.where = { 'leadAttached.id': this.expert.id } || { 'givenToAccMgr.id': this.expert.id } || {
          'givenToClient.id': this.expert.id,
        };
    }

    if (
      this.roles != 'admin' &&
      this.roles != 'researchManager' &&
      this.roles != 'keyAccountManager' &&
      this.roles != 'researchAnalyst' &&
      this.roles != 'client' &&
      this.roles != 'expert' &&
      this.roles != 'compliance' &&
      this.roles != 'mainPLHead' &&
      this.roles != 'subPLHead'
    ) {
      filter.where = { assigneeId: this.whoaim.id };
    }
*/





var start=this.leadForm.value.year +"-"+this.leadForm.value.month+"-1"; 

var end=this.leadForm.value.year +"-"+this.leadForm.value.month+"-31";

      console.log("start ",start)
       console.log("end ",end)
        filter.where = {
          and: [
                      
              {"givenToAccMgr.attachedBy": 
                "615a81731f846669152121d0"                  //this.leadForm.value.employeeId,
              },
           // {"createdAt":{"gte" :"2202-"}},
           // {"createdAt":{"lt" :end}}
              {"createdAt":{"gte" :start}},
            {"createdAt":{"lt" :end}}
          ],
        };
     
    

    filters.set('filter', JSON.stringify(filter));
    this.projectService.getAll(filters).subscribe(
      (projects: any) => {



     console.log("projects ",projects)
        console.log("projects cnt",projects.length)
        this.isLoading = false;
 console.log("projects givenToAccMgr",projects[1].givenToAccMgr)

 for (let n = 0; n < projects.length; n++) {
const result = projects[n].givenToAccMgr.filter( project=> project.attachedBy === "615a81731f846669152121d0");
 console.log("result cnt",result.length);
trrsum+=result.length;

var accumulator;
 
for (let i = 0; i < result.length; i++) {
        honSum += result[i].rate;
      }


//result.reduce((accumulator, current) => accumulator + current.rate, 0);

}

  console.log("trrsum",trrsum);
console.log("honSum",honSum);
this.AvghonSum=honSum/trrsum;
console.log("AvghonSum",this.AvghonSum);
this.tottrrsum=trrsum;

console.log("tottrrsum",this.tottrrsum);

this.calculateIncentiveForEMPMonth(role,trrsum+15,this.AvghonSum)

      },
      (error: any) => {
        this.isLoading = false;
      }
    );
  }





  }
eventList:any;
ClInvoiceTotal:any;

get3ResearcherGP(analyst:any,perc:number) {

 this.ClInvoiceTotal=0;
var start=this.leadForm.value.year +"-"+this.leadForm.value.month+"-1"; 

var end=this.leadForm.value.year +"-"+this.leadForm.value.month+"-31";

    const filters = new Map();
   const filter = {
     

      where: {},
      order: 'createdAt DESC',
    };
    filter.where = {
          and: [
                      
              {"researchAnalystId": 
                analyst                  //this.leadForm.value.employeeId,
              },
           // {"createdAt":{"gte" :"2202-"}},
           // {"createdAt":{"lt" :end}}
              {"eventAt":{"gte" :start}},
            {"eventAt":{"lt" :end}},
              {"status": "Completed"}
          ],
        };
    filters.set('filter', JSON.stringify(filter));

    this.eventService.getAll(filters).subscribe(
      (response) => {
        this.eventList = response;
      //  this.unbilledEvents = this.eventList?.filter((x) => x.clientInvoiceId == '');
       // this.billedEvents = this.eventList?.filter((x) => x.clientInvoiceId != '');
       for (let index = 0; index < this.eventList.length; index++)  {
      //  this.eventInvoice.push(this.eventList[index]);
        this.ClInvoiceTotal += this.eventList[index]?.clientPayableAmount;
       // this.tempEventIds.push(this.eventList[index]?.id);

      }
      this.incentivetotal= this.ClInvoiceTotal*(perc/100);
      },
      (error: any) => {}
    );
  }

ClMinTotal:number;

get7AMGP(analyst:any,perc:number) {

 this.ClInvoiceTotal=0;
var start=this.leadForm.value.year +"-"+this.leadForm.value.month+"-1"; 

var end=this.leadForm.value.year +"-"+this.leadForm.value.month+"-31";

    const filters = new Map();
   const filter = {
     

      where: {},
      order: 'createdAt DESC',
    };
    filter.where = {
          and: [
                      
              {"researchAnalystId": 
                analyst                  //this.leadForm.value.employeeId,
              },
           // {"createdAt":{"gte" :"2202-"}},
           // {"createdAt":{"lt" :end}}
              {"eventAt":{"gte" :start}},
            {"eventAt":{"lt" :end}},
              {"status": "Completed"}
          ],
        };
    filters.set('filter', JSON.stringify(filter));

    this.eventService.getAll(filters).subscribe(
      (response) => {
        this.eventList = response;
      //  this.unbilledEvents = this.eventList?.filter((x) => x.clientInvoiceId == '');
       // this.billedEvents = this.eventList?.filter((x) => x.clientInvoiceId != '');
       for (let index = 0; index < this.eventList.length; index++)  {
this.ClMinTotal+= this.eventList[index]?.eventDuration;
      //  this.eventInvoice.push(this.eventList[index]);
        this.ClInvoiceTotal += this.eventList[index]?.clientPayableAmount;
       // this.tempEventIds.push(this.eventList[index]?.id);

      }

      if  (this.ClMinTotal>250)
      {
      this.ClMinTotal=(this.ClMinTotal/60)-4;

      this.incentivetotal= this.ClMinTotal*1500;
    }
    else
    {
 this.incentivetotal=0;
    }

    
      },
      (error: any) => {}
    );
  }


  /*
  CalculateInvoice() {
    this.eventInvoice = [];
    this.tempEventIds = [];
    this.ClInvoiceTotal = 0;
    for (let index = 0; index < this.eventList.length; index++) {
      if (this.eventList[index].checked) {
        this.eventInvoice.push(this.eventList[index]);
        this.ClInvoiceTotal += this.eventList[index]?.clientPayableAmount;
        this.tempEventIds.push(this.eventList[index]?.id);
      }
    }
    this.selectedEvent = this.tempEventIds;
  } */

/*******gs*******************/



}
