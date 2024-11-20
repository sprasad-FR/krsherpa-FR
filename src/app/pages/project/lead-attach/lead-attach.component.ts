import { Expert } from './../models/expert.model';
import { Project } from './../models/project.model';
import { ProjectService } from './../../../core/services/project.service';
import { DecimalPipe } from '@angular/common';
import { Component, Input, Output, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExpertTableService } from '../../expert/expert.table.service';
import { Observable } from 'rxjs';
import { ExpertService } from '../../../core/services/expert.service';
//import { ToastrService } from 'ngx-toastr';
import { employeeUser } from '../models/employee.model';
import { EmailService } from '../../../core/services/email.service';
import { EmailJsTemplates, expertLeadSourceArray } from '../../../core/models/options';
import { industry, industryGroup, sectors, subindustry, options } from '../../../../../../shared-libs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { Console } from 'console';
import { ToastService } from '../../toast-service';

@Component({
  selector: 'app-lead-attach',
  templateUrl: './lead-attach.component.html',
  styleUrls: ['./lead-attach.component.scss'],
  providers: [ExpertTableService, DecimalPipe],
})
export class LeadAttachComponent implements OnInit {
  isLoading: boolean = false;
  tables$: Observable<any[]>;
  total$: Observable<number>;
  krExpertsList: any[];
  listItm: HTMLSelectElement;
  id: string;
  projectDetails: Project;
  projectDetailsForUpdate: Project = {};
  tempArray: any[];
  searchfor: any;
  isWebSign:boolean;
  allEmployee: employeeUser[];
  whoiam: any;
  empList: employeeUser[];
  disableChecked: number;
  expert: Expert;
  localstorageEmp: any;
  reportingMgrEmail: employeeUser;
  currentUser: employeeUser;
  emailToSend: any[];
  arrOfEMpIds: any[];
  roles: any;
  sectors: { id: number; text: string }[];
  industryGroup: any[];
  industry: any[];
  industryList: any[];
  subindustry: any[];
  subIndustry: any[];
  leadFormGrp: FormGroup;

  showBtn: boolean;
  check:boolean;
  isExact:boolean=false;
  isAnd:boolean=false;
  Company:string;
  keyword: any;
  selectedprofiles:string[];
  status: any[];
  sourceType: { id: number; lead: string }[];




@Input() itemid: string='';
@Input() readonly: boolean=true;
  constructor(
    private readonly expertService: ExpertService,
    public route: ActivatedRoute,
    public service: ExpertTableService,
    private readonly projectService: ProjectService,
    //private toasterService: ToastrService,
    public toasterService: ToastService,
    private emailService: EmailService,
    private formBuilder: FormBuilder
  ) {
    this.tables$ = service.tables$;
    this.total$ = service.total$;
    this.service.tableDataInput = [];
    this.whoiam = JSON.parse(window.localStorage.getItem('user'));
    this.roles = this.whoiam.roles[0];
    this.empList = JSON.parse(window.localStorage.getItem('emp'));
  }

 
  concount:number;
  reccount:number;
  ripcount:number;
  qrycount:any='';

  ngOnInit(): void {
    this.selectedprofiles=[];
    this.id = this.itemid;//this.route.snapshot.paramMap.get('id');
    this.createFilter();
    this.fetchData();
    //this.getExperts();
    if (this.id) {
      this.getProject();
    }
    let reportingMgr = this.empList?.find((x:any) => x.userId == this.whoiam?.id);
    //get email id of reporting manager
    this.reportingMgrEmail = this.empList?.find((x:any) => x.repotingManagerId == reportingMgr?.repotingManagerId);
    this.currentUser = this.empList?.find((x:any) => x.userId == this.whoiam?.id);
    this.emailToSend = [];
    if (this.reportingMgrEmail?.email) {
      this.emailToSend.push(this.reportingMgrEmail?.email);
    }
  //  this.getCount('Contacted')
  //  this.getCount('Recruited')
  //this.getCount('Recruiting In Progress')

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
     this.toasterService.success('POC Details updated successfully.', 'Success!');
     // this.getExperts(this.id);
    });

  }
  fetchData() {
    this.sectors = sectors;
    this.industryGroup = industryGroup;
    this.industry = industry;
    this.subindustry = subindustry;
    this.status = options.status;
    this.sourceType = expertLeadSourceArray;
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
  


  
  private getExperts() {
    this.totalcnt=0;
    this.isWebSign=false;
    this.isLoading = true;
    const filters = new Map();
    let filter = {
      where: {},
      skip:this.skipcnt,
      limit:250
    };

var words= this.keyword.split(',');
console.log(words)
var srchlst=[];
if (words.length>1)
{

 
  words.forEach(element => {

    srchlst.push(
    {
      industry: {
        like: element,
        options: 'i',
      },
    })
    srchlst.push(
      {
        subindustry: {
          like: element,
          options: 'i',
        },
      }
      
      )
      srchlst.push(
        
    {
      sourceType: {
        like: element,
        options: 'i',
      },
    }
        
        )
        srchlst.push(
          {
            sector: {
              like: element,
              options: 'i',
            },
          } 
          )
   
          srchlst.push(
            {
              keyword: {
                like: element,
                options: 'i',
              },
            }
            )
     
            srchlst.push(
              {
                biography: {
                  like: element,
                  options: 'i',
                },
              }
              )
              srchlst.push(
                {
                  notes: {
                    like: element,
                    options: 'i',
                  },
                }
                )
  
              }
  ) 


  filter = {
    where: {
      or: srchlst ,
    },
    skip:this.skipcnt,
  limit:250
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

}
else{
    if (this.keyword) {
      filter = {
        where: {
          or: [

            {
              industry: {
                like: this.keyword,
                options: 'i',
              },
            },
            {
              subindustry: {
                like: this.keyword,
                options: 'i',
              },
            },
            {
              sourceType: {
                like: this.keyword,
                options: 'i',
              },
            },
            {
              sector: {
                like: this.keyword,
                options: 'i',
              },
            },
            {
              keyword: {
                like: this.keyword,
                options: 'i',
              },
            },
            {
              biography: {
                like: this.keyword,
                options: 'i',
              },
            },
            {
              notes: {
                like: this.keyword,
                options: 'i',
              },
            },

            // {"where":{"colors":{"elemMatch":{"colorId":"1"}}}}

            // {
            //   workingDetails: {
            //     companyName: this.keyword,
            //     options: 'i',
            //   },
            // },
          ],
        },
        skip:this.skipcnt,
      limit:250
      };
    }

  }


  if (this.isExact)
  {
  
   if (this.leadFormGrp.value.fname) {
  
     if (!filter['where']['and']) {
       filter['where']['and'] = [];
     }
     filter['where']['and'].push({ firstName:  this.leadFormGrp.value.fname });
    // filter['where']['or'].push({ lastName:  this.leadFormGrp.value.name});
    
     
   }
  
   if (this.leadFormGrp.value.lname) {
  
    if (!filter['where']['and']) {
      filter['where']['and'] = [];
    }
   // filter['where']['or'].push({ firstName:  this.leadFormGrp.value.name });
    filter['where']['and'].push({ lastName:  this.leadFormGrp.value.lname});
   
    
  }
  
  }
  else{
  
  
     if (this.leadFormGrp.value.fname) {
       if (!filter['where']['and']) {
         filter['where']['and'] = [];
       }
       filter['where']['and'].push({ firstName: { like: this.leadFormGrp.value.fname, options: 'i' } });
   //    filter['where']['or'].push({ lastName: { like: this.leadFormGrp.value.name, options: 'i' } });
      
     }
  
  
     if (this.leadFormGrp.value.lname) {
      if (!filter['where']['and']) {
        filter['where']['and'] = [];
      }
    //  filter['where']['or'].push({ firstName: { like: this.leadFormGrp.value.name, options: 'i' } });
      filter['where']['and'].push({ lastName: { like: this.leadFormGrp.value.lname, options: 'i' } });
    
    }
  
  
  
   }

  if ((this.Company)&&(this.Company!='')  ){
      if (!filter['where']['and']) {
        filter['where']['and'] = [];
      }
      filter['where']['and'].push({ "workingDetails.companyName": { like: this.Company, options: 'i' } });
    }



    if (this.leadFormGrp.value.designation) {
      if (!filter['where']['and']) {
        filter['where']['and'] = [];
      }
      filter['where']['and'].push({ designation: { like: this.leadFormGrp.value.designation, options: 'i' } });
    }

    
    // if (this.leadFormGrp.value.companyName) {
    //   if (!filter['where']['and']) {
    //     filter['where']['and'] = [];
    //   }
    //   filter['where']['and'].push({ workingDetails["companyName"]: { like: this.leadFormGrp.value.companyName} });
    // }

    if (this.leadFormGrp.value.country) {
      if (!filter['where']['and']) {
        filter['where']['and'] = [];
      }
      filter['where']['and'].push({ country: { like: this.leadFormGrp.value.country, options: 'i' } });
    }
    if (this.leadFormGrp.value.industry) {
      if (!filter['where']['and']) {
        filter['where']['and'] = [];
      }
      filter['where']['and'].push({ industry: { like: this.leadFormGrp.value.industry, options: 'i' } });
    }
    if (this.leadFormGrp.value.sourceType) {
      if (!filter['where']['and']) {
        filter['where']['and'] = [];
      }
      if (this.leadFormGrp.value.sourceType=="Web Signup")
      {
      
        this.isWebSign=true;
      }


      filter['where']['and'].push({ sourceType: { like: this.leadFormGrp.value.sourceType, options: 'i' } });
    }


    if (this.leadFormGrp.value.status) {

      if (!filter['where']['and']) {
        filter['where']['and'] = [];
      }

      filter['where']['and'].push({ status: this.leadFormGrp.value.status });
    }

/*
   if (filter['where']['and']==undefined) {
    filter['where']['and'] = [];
    filter['where']['and'].push({ "_id": { ne: null} });
  }  */

 // filter['where']['and'].push({ status: { neq: 'Deleted'} });

 if (!filter['where']['and']) {
  filter['where']['and'] = [];
  filter['where']['and'].push({ "_id": { ne: null} })
}


    if (
      this.keyword ||
      (filter && filter['where'] && (filter['where']['and']?.length || filter['where']['or']?.length))
    ) {


      filter['order'] = 'updatedAt desc';
      filters.set('filter', JSON.stringify(filter));

      this.expertService.getAll(filters).subscribe(
        (experts: any) => {
          this.service.tableDataInput = [];
console.log (experts)

          this.totalcnt=experts.length;
          this.krExpertsList = experts;
          // this.service.tableDataInput = experts;
if (experts !=null &&  experts.length >0)
{
  this.service.tableDataInput = [];
          this.krExpertsList.forEach((x:any) => (x.checked = false));
          this.krExpertsList?.forEach((x:any) => (x.alreadyAttached = this.isExpertAlreadyAttached(x.id)));
          this.service.tableDataInput = this.krExpertsList;

}
else{

  this.service.tableDataInput = [];
}

        
          this.isLoading = false;







        },
        (error: any) => {}
      );





    }



   let cntfilter = {
    where: {}
   
  };

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
  
  isExpertAlreadyAttached(id) {
    if (this.projectDetails?.leadAttached?.length) {
      return this.projectDetails.leadAttached.filter((a) => a.id == id).length > 0 ? true : false;
    }
    return false;
  }
  getKrRelationshipId(name) {
    return this.empList.find((x) => x.name == name).userId;
  }
  getProject() {
    this.projectService.show(this.id).subscribe(
      (project) => {
        this.projectDetails = project;
        if (this.krExpertsList) {
          if (!this.projectDetails?.leadAttached) {
            this.projectDetails.leadAttached = [];
          } else {
            this.krExpertsList.forEach((x:any) => (x.alreadyAttached = this.isExpertAlreadyAttached(x.userId)));
          }
        }
        this.arrOfEMpIds = [];
        this.arrOfEMpIds.concat(this.projectDetails?.researchManagerId);
        this.arrOfEMpIds.push(this.projectDetails?.keyAccMgrId);
        let selectedEmailPeople = this.empList?.filter((e) => this.arrOfEMpIds.indexOf(e.id) != -1);
        this.emailToSend = selectedEmailPeople?.map((a) => a.email);
      },
      (error: any) => {
        this.isLoading = false;
      }
    );
  }

  checkAllCheckBox(ev) {
    this.krExpertsList.forEach((x) => (x.checked = ev.target.checked));
    this.attachLead(1,"1");
  }



  attachExpert() {
    let newFound = false;

debugger

    for (let index = 0; index < this.krExpertsList?.length; index++) {
      if ( this.selectedprofiles.includes(this.krExpertsList[index].userId)) {
        let alreadyExist = this.projectDetails?.leadAttached?.find((x) => x.id == this.krExpertsList[index].id);
        if (!alreadyExist) {
          



         this.krExpertsList[index]['attachedBy'] = this.krExpertsList[index]['krRelationshipMgrId'] ;

      
         this.krExpertsList[index]['attachedDate'] = new Date();// dateFormat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");;
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
  }





  attachExpert2022Oct3() {
    let newFound = false;


    for (let index = 0; index < this.krExpertsList?.length; index++) {
      if ( this.selectedprofiles.includes(this.krExpertsList[index].userId)) {
        let alreadyExist = this.projectDetails?.leadAttached?.find((x) => x.id == this.krExpertsList[index].id);
        if (!alreadyExist) {
          debugger
          this.krExpertsList[index]['attachedBy'] = this.whoiam?.id;
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
    this.projectService.updateOnly(this.id, this.projectDetailsForUpdate).subscribe((res) => {
      this.isLoading = false;
     this.toasterService.success('Expert attached successfully', 'Success!');
      let emailVariableObj = {
        notificationType: 'skipEmail',
      };
      this.emailService.sendEmail(EmailJsTemplates.project, this.emailToSend, 'Informative', emailVariableObj);
    });
  }


  attachExpert1() {
    let newFound = false;


    for (let index = 0; index < this.krExpertsList?.length; index++) {
      if (this.krExpertsList[index].checked) {
        let alreadyExist = this.projectDetails?.leadAttached?.find((x) => x.id == this.krExpertsList[index].id);
        if (!alreadyExist) {
          debugger
          this.krExpertsList[index]['attachedBy'] = this.whoiam?.id;
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
    this.projectService.updateOnly(this.id, this.projectDetailsForUpdate).subscribe((res) => {
      this.isLoading = false;
     this.toasterService.success('Expert attached successfully', 'Success!');
      let emailVariableObj = {
        notificationType: 'skipEmail',
      };
      this.emailService.sendEmail(EmailJsTemplates.project, this.emailToSend, 'Informative', emailVariableObj);
    });
  }




  
  trackById(index, expert) {
    return expert.id;
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
  clear() {

    this.leadFormGrp.reset();
  //  this.krExpertsList = [];
  }
  openDetails(val) {
    window.open('/expert/expert-details/' + val);
  }
  openEdit(val) {
    window.open('/expert/expert-edit/' + val);
  }

  getCurrentEmployer(workingDetails: any[]) {
    let len: number = workingDetails?.length;
    if (workingDetails != undefined) {
      return workingDetails[len - 1]?.companyName;
    } else {
      return '--';
    }
  }

  // onSelectSector(sector_id) {
  //   this.leadFormGrp.patchValue({ sector: sector_id?.text });
  //   this.industryGroupList = this.industryGroup?.filter((a) => a.sectorId == sector_id.id);
  // }

  openNewTab(url) {
    window.open(url, '_blank');
  }
  // onIndustryGroup(groupId) {
  //   this.leadFormGrp.patchValue({ industryGroup: groupId?.text });
  //   this.industryList = this.industry?.filter((a) => a.industryGroupId == groupId.id);
  // }

  // onSelectIndustry(industry_id) {
  //   this.leadFormGrp.patchValue({ insustry: industry_id?.id });
  //   this.subIndustry = this.subindustry?.filter((a) => a.industryId == industry_id.id);
  // }

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


 

  attachLead(ck:any,userId:string) {
console.log (ck)
console.log(userId)
console.log(this.krExpertsList?.filter((a) => (a.userId==userId)));


if (ck)
{
this.selectedprofiles.push(userId);
}
else{
 
 const index = this.selectedprofiles.indexOf(userId);
 if (index > -1) { // only splice array when item is found
  this.selectedprofiles.splice(index, 1); // 2nd parameter means remove one item only
}
}


(this.krExpertsList?.filter((a) => (a.userId==userId))[0]).checked=true;

    this.showBtn = this.krExpertsList?.filter((a) => a.checked)?.length ? true : false;
  }
}
