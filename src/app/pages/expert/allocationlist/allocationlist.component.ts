import { DecimalPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpertService } from '../../../core/services/expert.service';
import { Observable } from 'rxjs';
import {QueryList, ViewChildren} from '@angular/core';
//import { ExpertTableService } from '../expert.table.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { industry, industryGroup, sectors, subindustry, options } from '../../../../../../shared-libs';
import { EmailJsTemplates, expertLeadSourceArray } from '../../../core/models/options';
import { EmployeeService } from '../../../core/services/employee.service';
//import { ThrowStmt } from '@angular/compiler';
import { Generic } from '../../../core/models/client-invoice.model';
//import { ToastrService } from 'ngx-toastr';
import { Logger } from '../../../core/logger.service';
import { DateToLocalPipe,getCompanyTypePipe,GetInitialsPipe } from '../pipe';

import { EmailService } from '../../../core/services/email.service';

import {expert} from '../expertlist/expert.model';
import { NgbdGridJsSortableHeader, SortEvent } from '../expertlist/expert-sortable.directive';
import { ExpertsTableService } from '../expertlist/expert.service';



@Component({
  selector: 'app-allocationlist',
  templateUrl: './allocationlist.component.html',
  styleUrls: ['./allocationlist.component.scss'],
  providers: [ExpertsTableService, DecimalPipe],
})
export class AllocationlistComponent implements OnInit {
  isLoading: boolean = false;
  tables$: Observable<any[]>;
  total$: Observable<number>;
  krExpertsList: any[];
  searchFor: string;
  searchBox: HTMLInputElement;
  listItm: HTMLSelectElement;
  whoiam: any;
  roles: string;
  leadFormGrp: FormGroup;
  isExact:boolean=false;
  isAnd:boolean=false;
  Company:string;
  keyword: any;
  searchfor: any;
  status: any[];
  generic:Generic;
  showBtn: boolean;
  sourceType: { id: number; lead: string }[];

  // Table data
  gridjsList$!: Observable<expert[]>;
  //total$!: Observable<number>;
  @ViewChildren(NgbdGridJsSortableHeader) headers!: QueryList<NgbdGridJsSortableHeader>;


  // Table data
  //tables$: Observable<any[]>;
 
  expertsData: expert[]=[];



  constructor(
    private readonly expertService: ExpertService,
    public route: ActivatedRoute,
    public service: ExpertsTableService,
   // private toasterService: ToastrService,
    private emailService: EmailService,
    private readonly employeeService: EmployeeService,
    private formBuilder: FormBuilder
  ) {
    

    this.tables$ = service.countries$;
    this.total$ = service.total$;
this.service.pageSize=50;

   // this.service.tableDataInput = [];
    this.whoiam = JSON.parse(window.localStorage.getItem('user'));
    this.roles = this.whoiam?.roles[0];
  }

  allroles: any;
  userData: any;
  concount:number;
  reccount:number;
  ripcount:number;
  qrycount:any='';
totcount:number;
filterstatus:string;
sraId:string;
srafltId:string;

  ngOnInit(): void {

   // console.log ( this.service.tableDataInput )
    this.getResearcher();

    this.generic={id:'dff',name:'df',type:''};
   this.filterstatus='All';
    this.keyword="";
    this.createFilter();
    this.getUsers();
    this.searchFor = this.route.snapshot.paramMap.get('searchKey');
    //this.getExperts();
    this.status = options.status;
    this.sourceType = expertLeadSourceArray;


    this.userData = JSON.parse(window.localStorage.getItem('user'));
    console.log ( this.userData )



     this.roles = this.userData.roles[0];
       this.allroles = this.userData.roles;

   //  this.roles="StrategicTeamManager";
     // this.allroles.push("StrategicTeamManager")

    //   this.roles ="StrategicTeamManager"  //StrategicTeamMember
  //this.getCount('Contacted')
  //   this.getCount('Recruited')
  // this.getCount('Recruiting In Progress')

  debugger
 
  if (this.allroles.includes('admin') || this.allroles.includes('StrategicTeamManager') )
  {

    this.filterstatus='No'
  }
  else{
    this.filterstatus='Yes'
  }




 // this.filterstatus='No';
  this.getExperts();


  }

  search() {
    this.skipcnt=0;
    this.totalcnt=240;
    this.searchfor = document.getElementById('searchTerm');
    let searchKey: string = this.searchfor.value;
    if (searchKey == searchKey.toLowerCase()) {
      this.keyword = searchKey.charAt(0).toUpperCase() + searchKey.substr(1).toLowerCase();
    } else {
      this.keyword = searchKey;
    }
    // this.keyword = this.searchfor.value;
    this.getExperts();

  }

 setfilterstatus(event: any)
 {


this.srafltId='';
this.showBtn=false;
this.showLst=false;

 let val = event.target.value.trim();
    this.filterstatus=val;

this.getExperts() ;

 }

 filterbyEx()
 {


 this.getExperts() ;

 }


 DelEx(id){

  if (confirm("Are you sure to delete this expert")) {



    this.expertService.delete(id).subscribe((data) => {
      
      alert("Deleted")

    })

   
   

  } else {

    alert("Cancelled")
  // this.toasterService.success('POC Details updated successfully.', 'Success!');
  }



 
 }




 public showExperts() {

  this.searchFor = this.service.searchTerm;
  console.log( this.searchFor )
  this.getExperts();
 }

 createFilter() {
  this.leadFormGrp = this.formBuilder.group({
    searchKeyword: [null],
    fname: [null],
    lname: [null],
    designation: [null],
    companyName: [null],
    country: [null],
    industry: [null],
    status: [null],
    sourceType: [null],
  });
}

showLst:boolean=false;

showbtn( ) {

if (this.filterstatus=='Yes')
{

  this.showBtn = this.krExpertsList?.filter((a) => a.checked)?.length ? true : false;
this.showLst=false;
}
else if (this.filterstatus=='No') {
  this.showBtn = this.krExpertsList?.filter((a) => a.checked)?.length ? true : false;
  this.showLst=  this.showBtn ;
}
else{
  this.showBtn = false;
  this.showLst=false;
}

}



TrimProjectName(name ) {
  var trimmedString ="";
  var yourString = name; //replace with your string.
  var maxLength = 13 // maximum number of characters to extract &&  yourString.length>maxLength
  if (yourString!=undefined && yourString !="" )
  {
  //trim the string to the maximum length
   trimmedString = yourString.substr(0, maxLength);
   return  trimmedString+"...";
  //re-trim if we are in the middle of a word
 // trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
  }
  else
  {
    return  yourString;
  }


 }

 clear() {
  this.leadFormGrp.reset();
  this.krExpertsList = [];
}
 skipcnt:number =0;
 totalcnt:number =0;
 isCompleted:boolean=false;

 getNextSet(isleft:boolean) {
   if (isleft)
   {
     this.skipcnt=this.skipcnt-250;
     if (this.skipcnt<0)
     {
       {
         this.skipcnt=0;    
       }
     }
   }
   else{  
   this.skipcnt=this.skipcnt+250;
 }

   this.getExperts() ;

 }
 

 usersArray: any[];
 getUsers() {
  //this.userService.getUsers().subscribe(
    this.usersArray = this.employeeService.getempmindata()
console.log( this.usersArray);
}


  //expertData: Expert;
  getCount(stats)
  {
   

//let expert =  this.expertData;

    const wheremp = new Map();

    const filter = {
     
      "status":stats     //expert.krRelationshipMgrId
     
    };


    
          wheremp.set('where', JSON.stringify(filter));
    


    this.expertService.getCount(wheremp).subscribe((data) => {
      
      if (stats=='Contacted')
      {
      this.concount= data["count"];
      }
      else if (stats=='Recruited'){
      this.reccount= data["count"];
      }
      else{
      this.ripcount= data["count"];
      }
   
      console.log( data);
    // gs this.toasterService.success('POC Details updated successfully.', 'Success!');
     // this.getExperts(this.id);
    });

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
      console.log(user)
      return '';
    }
  } else {
    return '';
  }
}

wherearry:any[];
isWebSign:boolean;
private getExpertCount() {
  this.totalcnt=0;

  //qrycount:number;

  this.isLoading = true;
  const filters = new Map();
  let filter = {
    where: {},
    skip:this.skipcnt,
    limit:250
  };


  this.wherearry=[];

var words= this.keyword.split(',');
console.log(words)
var srchlst=[];


 if (!this.allroles.includes('admin') && !this.allroles.includes('mainPLHead') ){
  if (!filter['where']['and']) filter['where']['and'] = [];
  this.wherearry.push({
    krRelationshipMgrId: this.whoiam?.id,
  });
}



if (this.isExact)
{

 if (this.leadFormGrp.value.fname) {

  
   this.wherearry.push({ firstName:  this.leadFormGrp.value.fname });
  // filter['where']['or'].push({ lastName:  this.leadFormGrp.value.name});
  
   
 }

 if (this.leadFormGrp.value.lname) {


 // filter['where']['or'].push({ firstName:  this.leadFormGrp.value.name });
 this.wherearry.push({ lastName:  this.leadFormGrp.value.lname});
 
  
}

}
else{


   if (this.leadFormGrp.value.fname) {
 
    this.wherearry.push({ firstName: { like: this.leadFormGrp.value.fname, options: 'i' } });
 //    filter['where']['or'].push({ lastName: { like: this.leadFormGrp.value.name, options: 'i' } });
    
   }


   if (this.leadFormGrp.value.lname) {

  //  filter['where']['or'].push({ firstName: { like: this.leadFormGrp.value.name, options: 'i' } });
  this.wherearry.push({ lastName: { like: this.leadFormGrp.value.lname, options: 'i' } });
  
  }



 }


 
 if ((this.Company)&&(this.Company!='')  ){
  
  this.wherearry.push({ "workingDetails.companyName": { like: this.Company, options: 'i' } });
   }



   if (this.leadFormGrp.value.designation) {

    this.wherearry.push({ designation: { like: this.leadFormGrp.value.designation, options: 'i' } });
   }

   
   // if (this.leadFormGrp.value.companyName) {
   //   if (!filter['where']['and']) {
   //     filter['where']['and'] = [];
   //   }
   //   filter['where']['and'].push({ workingDetails["companyName"]: { like: this.leadFormGrp.value.companyName} });
   // }

   if (this.leadFormGrp.value.country) {
    
    this.wherearry.push({ country: { like: this.leadFormGrp.value.country, options: 'i' } });
   }
   if (this.leadFormGrp.value.industry) {
 
    this.wherearry.push({ industry: { like: this.leadFormGrp.value.industry, options: 'i' } });
   }
   if (this.leadFormGrp.value.sourceType) {
   
    this.wherearry.push({ sourceType: { like: this.leadFormGrp.value.sourceType, options: 'i' } });
   }
   if (this.leadFormGrp.value.status) {
    
    this.wherearry.push({ status: { like: this.leadFormGrp.value.status, options: 'i' } });
   }


 // this.wherearry.push({ status: { neq: 'Deleted'} });

  const wheremp = new Map();
    
  wheremp.set('where', JSON.stringify(this.wherearry));
    


  this.expertService.getCount(wheremp).subscribe((data) => {
    
  
    this.qrycount= data;
    
    this.isLoading=false;
    console.log( data);
  //  this.toasterService.success('POC Details updated successfully.', 'Success!');
   // this.getExperts(this.id);
  },
  (error: any) => {   this.isLoading = false;}
  
  
  );


}

private getExpertsBack() {

  this.totalcnt=0;
  this.qrycount='';
  this.isLoading = true;
  const filters = new Map();
  let filter = {
    where: {},
    skip:this.skipcnt,
    limit:250
  };

//this.isWebSign=false;
var fltr= sessionStorage["ExalloclstFilter"];  //getExpertsBack()

filters.set('filter', fltr);

console.log( filters);

this.expertService.getAll(filters).subscribe(
  (experts: any) => {

    this.totalcnt=experts.length;
    this.krExpertsList = experts;
    // this.service.tableDataInput = experts;
   //  this.service.tableDataInput = this.krExpertsList;
    this.isLoading = false;
  // this.getExpertCount() ;

  },
  (error: any) => {   this.isLoading = false;}
);


let cntfilter = {
  where: {}
 
};

filter=  JSON.parse(fltr);

cntfilter.where=filter.where;

const cntfilters = new Map();

cntfilters.set('filter', JSON.stringify(cntfilter));


 this.expertService.getCount(cntfilters).subscribe(
  (data: any) => {
    this.qrycount= data;

  console.log ( this.qrycount)
  },
  (error: any) => {}
);



}


private getExperts() {

debugger

  sessionStorage["ExalloclstFilter"]="";
   this.totalcnt=0;
   this.qrycount='';
   this.isLoading = true;
   const filters = new Map();
   let filter = {
     where: {},
     skip:this.skipcnt,
     limit:5000
   };

  sessionStorage["ExalloclstFilter"]="";
   this.totalcnt=0;
   this.qrycount='';
   this.isLoading = true;
  
debugger

this.isWebSign=false;

this.krExpertsList=[];

//this.service.tableDataInput = [];

this.isWebSign=false;

this.krExpertsList=[];

//this.service.tableDataInput = [];


var words= this.keyword.split(',');
console.log(words)
var srchlst=[];



 filter = {
   where: {
     or: srchlst ,
   },
   skip:this.skipcnt,
 limit:5000
 };
/*
if (this.isAnd)
{
 filter = {
   where: {
     and: 
       srchlst
     ,
   },
   skip:this.skipcnt,
 limit:250
 };

}
else{

}  */



 if (this.roles != 'admin' && this.roles != 'mainPLHead') {
  if (!filter['where']['and']) filter['where']['and'] = [];
  filter['where']['and'].push({
  //  krRelationshipMgrId: this.whoiam?.id,
  });
}



filter['where']={};

  filter['where']['and'] = [];

  filter['where']['and'].push({ sourceType: 'Web Signup' });


 debugger


    if (this.allroles.includes('admin') || this.allroles.includes('StrategicTeamManager') )
    {
   
      //  krRelationshipMgrId: this.whoiam?.id,
     

//************************** */



if (this.filterstatus=='Yes' )
{  


filter['where']['and'].push({ krRelationshipMgrId: {eq:''} });
//nlike: 'M.-XY'}

if (this.srafltId!='')
{
 filter['where']['and'].push({ allocatedTo:  this.srafltId });

}
else{
  filter['where']['and'].push({ allocatedTo: {neq:''} });
}
filter['where']['and'].push({ allocatedTo: {neq:'x'} });
filter['where']['and'].push({ allocatedTo: {neq:null} });
}
else if (this.filterstatus=='No' )
{  

  filter['where']['or'] = [];
  filter['where']['or'].push({ allocatedTo: {eq:'x'} });

  filter['where']['or'].push({ allocatedTo: {eq:''} });
  filter['where']['or'].push({ allocatedTo: {eq:null} });

//  filter['where']['and'].push({ krRelationshipMgrId: {nlike:'^(?!\s*$).+'} });
filter['where']['and'].push({ krRelationshipMgrId: {eq:''} });

  /*
  filter['where']['or'] = []; */
//filter['where']['and'].push({ allocatedTo: {eq:null} });
//filter['where']['and'].push({ allocatedTo: {eq:''} });
/* filter['where']['or'].push({ allocatedTo: {exists:false} });
*/

}
else{  // ^(?!\s*$).+


//filter['where']['and'].push({ krRelationshipMgrId: {neq:null} });

if (this.srafltId!='')
{
 filter['where']['and'].push({ krRelationshipMgrId:  this.srafltId });
}
else{
  filter['where']['and'].push({ krRelationshipMgrId: {neq:''} });
}


// filter['where']['and'].push({ krRelationshipMgrId: /^(?!\s*$).+/ });
//filter['where']['and'].push({ krRelationshipMgrId: {neq:null} });
}


//*********************************** */


  }
  else{


    if (this.filterstatus=='Yes' )
    {  
      filter['where']['and'].push({ allocatedTo:  this.whoiam?.id });

   // filter['where']['and'].push({ allocatedTo: {neq:''} });
    filter['where']['and'].push({ krRelationshipMgrId: {eq:''} });
   //nlike: 'M.-XY'}



  
    }
    else if (this.filterstatus=='All' )
    {
     
      filter['where']['or']=[];

     // filter['where']['or'].push({ allocatedTo:  this.whoiam?.id });

      // filter['where']['and'].push({ allocatedTo: {neq:''} });
       filter['where']['or'].push({ krRelationshipMgrId: this.whoiam?.id });
    }
    else{

    }





  }

  //filter['where']['and'].push({ status: { neq: 'Deleted'} });

   if (
     this.keyword ||
     (filter && filter['where'] && (filter['where']['and']?.length || filter['where']['or']?.length))
   ) {

    this.krExpertsList=[];
   // this.service.tableDataInput = [];

     filter['order'] = 'updatedAt desc';
     filters.set('filter', JSON.stringify(filter));
console.log (filters)
sessionStorage["ExalloclstFilter"]=JSON.stringify(filter);
     this.expertService.getAll(filters).subscribe(
       (experts: any) => {
       
        console.log (experts)
        
//******************* */

this.totalcnt=experts.length;
this.krExpertsList = experts;


this.service.emps=experts;

this.gridjsList$=this.service.countries$;



//********************** */


        
                  this.totalcnt=experts.length;

                  this.qrycount=experts.length
               //   this.krExpertsList = experts;
                  // this.service.tableDataInput = experts;

        if (experts !=null &&  experts.length >0)
        {

      //    this.service.tableDataInput = [];

          if (this.filterstatus=='No1' )
          {  

            console.log ('in no')
        //  var  filteredArray =[];
           // const filteredArray = this.krExpertsList.filter(hasProp('allocatedTo'))
           
           for (const item in this.krExpertsList) {
            if (item['allocatedTo']==null || item['allocatedTo']==undefined || item['allocatedTo']=='' ) {
            //  console.log(`this is fog (${name}) for sure. Value: ${buz[name]}`);
           
             //  filteredArray.push(item);
          
          } else {
             
            //  console.log(name); // toString or something else
            }
          }
     
//******************* */

this.totalcnt=experts.length;
this.krExpertsList = experts;


this.service.emps=experts;

this.gridjsList$=this.service.countries$;



//********************** */
          
          // this.krExpertsList = experts;
          // this.service.tableDataInput = this.krExpertsList;

          }
          else{

            console.log ('in yes')
          //  this.krExpertsList = experts;
          //this.service.tableDataInput = this.krExpertsList;

               
//******************* */

this.totalcnt=experts.length;
this.krExpertsList = experts;


this.service.emps=experts;

this.gridjsList$=this.service.countries$;



//********************** */
          }
        
        }
        else{
        
        //  this.krExpertsList=[];
         // this.service.tableDataInput = [];

         
        }
        
        this.isLoading = false; 

/*
         this.totalcnt=experts.length;
         this.krExpertsList = experts;
         // this.service.tableDataInput = experts;
          this.service.tableDataInput = this.krExpertsList;
         this.isLoading = false;  */
       // this.getExpertCount() ;

       },
       (error: any) => {   this.isLoading = false;}
     );
   }

   let cntfilter = {
    where: {}
   
  };

  cntfilter.where=filter.where;

  const cntfilters = new Map();

  cntfilters.set('filter', JSON.stringify(cntfilter));

/*
   this.expertService.getCount(cntfilters).subscribe(
    (data: any) => {
      this.qrycount= data;
  
    console.log ( this.qrycount)
    },
    (error: any) => {}
  );

  const hasProp = prop => item => {
    // if the prop is in the item, returns true
    return prop in item;
 }
 
*/

/*
   const wheremp = new Map();
   wheremp.set('where', JSON.stringify(filter));

    


   this.expertService.getCount(wheremp).subscribe((data) => {
     this.qrycount= data["count"];
     console.log('this.qrycount', data);
   //  this.toasterService.success('POC Details updated successfully.', 'Success!');
    // this.getExperts(this.id);
   });
*/

 }
 

 onSort({column, direction}: SortEvent) {
  // resetting other headers
  this.headers.forEach(header => {
    if (header.sortable !== column) {
      header.direction = '';
    }
  });

  this.service.sortColumn = column;
  this.service.sortDirection = direction;
}


 markchecked(event: any, strt:any)
 {
  let val = event.target.value.trim();
 
console.log(val)

debugger

if (isNaN(val))
{


}
else
{


  for (let index = 0; index < this.krExpertsList.length; index++) {
    const element = this.krExpertsList[index];
    element.checked=false;
  }



  var cnt=Number(val)

if (cnt<this.totalcnt)
{

 //i+(service.pageSize*(service.page-1))+1
   var start= strt;

for (let index = start; index < start+cnt; index++) {
  const element = this.krExpertsList[index];
  element.checked=true;
}
this.showbtn();
  //  (   let index = 0; index < this.paidInvoiceList.length; index++) {
    
    //  for  (const iterator of this.krExpertsList) { }


}
}
 }

 researcherList:any;

 getResearcher() {
  const filters = new Map();
  const filter = {
    where:  {
      designation: 11,
    },
    fields: {
      id: true,
      name: true,
      designation: true,
      email: true,
      userId: true,
    },
  };
  filter['where']['or']=[];
  filter['where']['or'].push({ designation: 11 });
  filter['where']['or'].push({ designation: 16 });
  filters.set('filter', JSON.stringify(filter));

  return this.employeeService.getAll(filters).subscribe(
    (employees: any) => {
      this.researcherList = employees;

    },
    (error: any) => {}
  );
}




// send invoices from unpaid to paid   markunPaid
allocate() {


  console.log(this.sraId )

  if (this.filterstatus=='No' && (this.sraId =='' || this.sraId ==undefined))
  {   
 
   // this.toasterService.error('Please Select A Strategic Analyst', 'Select!');

    return;
  }


  var arr= new Array()
  // this.EditInvoiceevnts.indexOf()
  let isOK = confirm("Are you sure to update allocation?");
 if (isOK)
 {
 


   for  (const iterator of this.krExpertsList) {
   
   //(   let index = 0; index < this.paidInvoiceList.length; index++) {

    if (iterator.checked) {
      debugger
console.log (iterator)

var curid=iterator.id;

arr.push(curid)

    }


  }
    

this.generic.dataArray=arr;

if (this.filterstatus=='No')
{
  this.generic.id=this.sraId;
}
else
{
this.generic.id='';
}

this.expertService.updateallExpertsAlloc(null, this.generic).subscribe(
 (response) => {
  // log.debug('response: ', response);
   this.isLoading = false;
   
   //gs this.toasterService.success('Expert allocation updated.', 'Success!');
this.getExperts();
/*
   //email
   let emailVariableObj = {
     notificationType: 'skipEmail',
   };
   this.emailService.sendEmail(
     EmailJsTemplates.clientInvoicePaid,
     this.emailToSend,
     'Informative',
     emailVariableObj
   ); */
 /* */
 },
 (error) => {
  // log.error(error);
  // log.debug('Not Created', this.invoiceData);
  // this.error = error;
 });
 



 }
 this.isLoading=true;


 }




 checkAllCheckBox(ev) {
  this.krExpertsList.forEach((x) => (x.checked = ev.target.checked));
  this.showbtn();
}


attachExpert() {
  let newFound = false;

/*
  for (let index = 0; index < this.krExpertsList?.length; index++) {
    if ( this.selectedprofiles.includes(this.krExpertsList[index].userId)) {
      let alreadyExist = this.projectDetails?.leadAttached?.find((x) => x.id == this.krExpertsList[index].id);
      if (!alreadyExist) {
        
//

       this.krExpertsList[index]['attachedBy'] = this.krExpertsList[index]['krRelationshipMgrId'] ;
      // this.krExpertsList[index]['attachedBy'] = this.whoiam?.id;

        if (!this.projectDetails?.leadAttached) this.projectDetails.leadAttached = [];
        this.projectDetails?.leadAttached.push(this.krExpertsList[index]);
        newFound = true;
        if (this.projectDetails?.researchAnalyst?.indexOf(this.krExpertsList[index]?.krRelationshipMgrId) == -1) {
          this.projectDetails?.researchAnalyst?.push(this.krExpertsList[index]?.krRelationshipMgrId);
        }
        let ra = this.empList?.find((a) => a.userId == this.krExpertsList[index]?.krRelationshipMgrId);
        if (this.projectDetails?.researchManagerId?.indexOf(ra['repotingManagerId']) == -1) {
          this.projectDetails?.researchManagerId?.push(ra['repotingManagerId']);
        }
      } else {
        this.expert = this.krExpertsList[index];
        this.disableChecked = index;
      }
    }
  }
  if (!newFound) {
    this.toasterService.warning('Please Select Profile', 'Error!');
    return;
  }


  this.projectDetailsForUpdate.leadAttached = this.projectDetails?.leadAttached;
  this.projectDetailsForUpdate.researchAnalyst = this.projectDetails?.researchAnalyst;
  this.projectDetailsForUpdate.researchManagerId = this.projectDetails?.researchManagerId;
 
  console.log(' lead attach',  this.projectDetailsForUpdate)
 
  this.projectService.updateOnly(this.id, this.projectDetailsForUpdate).subscribe((res) => {
    this.isLoading = false;
    this.toasterService.success('Expert attached successfully', 'Success!');
    let emailVariableObj = {
      notificationType: 'skipEmail',
    };
    this.emailService.sendEmail(EmailJsTemplates.project, this.emailToSend, 'Informative', emailVariableObj);
  });

*/


}

  private getExpertsOld() {
    this.isLoading = true;
    const filters = new Map();
    let filter = {
      where: {},
      skip:0,
      limit:250
    };

    if (this.roles != 'admin' && this.roles != 'mainPLHead') {
      if (!filter['where']['and']) filter['where']['and'] = [];
      filter['where']['and'].push({
        krRelationshipMgrId: this.whoiam?.id,
      });
    }
    if (this.searchFor != null) {
      filter['where']['or'] = [];
      filter['where']['or'].push({ firstName: { like: this.searchFor, options: 'i' } });
      filter['where']['or'].push({ lastName: { like: this.searchFor, options: 'i' } });
      filter['where']['or'].push({ designation: { like: this.searchFor, options: 'i' } });
      if (this.searchFor.toString().indexOf(' ') != -1) {
        filter['where']['or'].push({ firstName: { like: this.searchFor.split(' ')[0], options: 'i' } });
      }
    }

    filters.set('filter', JSON.stringify(filter));

    this.expertService.getAll(filters).subscribe(
      (experts: any) => {
        this.krExpertsList = experts;

     
//******************* */

this.totalcnt=experts.length;
this.krExpertsList = experts;


this.service.emps=experts;

this.gridjsList$=this.service.countries$;



//********************** */



      //  this.service.tableDataInput = experts;
        if (this.searchFor) {
        /*  this.searchBox = <HTMLInputElement>document.getElementById('globelSearch');
          this.searchBox.value = this.searchFor;

          this.listItm = <HTMLSelectElement>document.getElementById('Searchbucket');
          this.listItm.options['4'].selected = true; gs */
        }
        this.isLoading = false;
      },
      (error: any) => {}
    );
  }


  getCurrentEmployer(workingDetails: any[]) {
    let len: number = workingDetails?.length;
    if (workingDetails != undefined) {
      return workingDetails[len - 1]?.companyName;
    } else {
      return '--';
    }
  }
}
