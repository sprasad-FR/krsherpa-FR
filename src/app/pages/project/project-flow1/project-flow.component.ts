import { User } from '../../../core/auth/credentials.service';
import { Component, Input, Output, OnInit } from '@angular/core';
import { NgbModal,NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { currencies, options } from './../../../../../../shared-libs';
import { industry } from '../../../../../../shared-libs';
import { eventTypes } from './../../../../../../shared-libs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Project } from '../models/project.model';
import { EmailJsTemplates, EmailTitleDescription } from '../../../core/models/options';
import { EventService } from '../../../core/services/event.service';
import { ExpertService } from '../../../core/services/expert.service';
import { ProjectService } from '../../../core/services/project.service';
import { EmployeeService } from '../../../core/services/employee.service';
import { employeeUser } from '../../../core/models/employee.model';
//import { ToastrService } from 'ngx-toastr';
import { Logger } from '../../../core/logger.service';
import { projectStatus } from '../overview/project.data';
import Swal from 'sweetalert2';
import * as _ from 'lodash';
import { EmailService } from '../../../core/services/email.service';
import * as moment from 'moment';
import { IncentivesService } from '../../../core/services/incentives.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ClientsService } from '../../../core/services/clients.service';
import { mckService } from '../../../core/services/mck.service';
import { ToastService } from '../../toast-service';
import { complianceActionsService } from '../../../core/services/complianceActions.service';
import { DateToLocalPipe,getCompanyTypePipe,GetInitialsPipe } from '../pipe';
import { FormModule } from '../../form/form.module';
//  DateToLocalPipe,getCompanyTypePipe,GetInitialsPipe 
import { country } from './data';


const log = new Logger('Project Flow Component');

@Component({
  selector: 'app-project-flow',
  templateUrl: './project-flow.component.html',
  styleUrls: ['./project-flow.component.scss'],
  providers: [DateToLocalPipe,getCompanyTypePipe,GetInitialsPipe ],

})

export class ProjectFlowComponent implements OnInit {
  assignExpertForm : FormGroup;
  transferExpertForm : FormGroup;
  EmailJsTemplates : object;
  isLoading: boolean = false;
  leadAttachedTable: boolean = true;
  gtamTable: boolean = false;
  gtcTable: boolean = false;
  eventTable: boolean = false;
openedmodal:NgbModalRef;

  getLeadFromView: boolean = true;
  selectExpertView: boolean = false;
  id: string;
  leadModalTitle: string = 'New Lead';
  KrExpertModalTitle: string = 'Assign KR Expert';
  selectedExpert: any = null;
  transferLead: any = null;
  transferLevel : number;
  projectDetails : Project;
  krExpertsList : any[];
  showOnlyProfile: boolean = true;
  currenciesList : any[];
  rateTypes : any[];
  expertFormData: any = [];
  industry : string;
  empList: employeeUser[];
  localstorageEmp : any[];
  emailReceiver : any[];
  reportingMgrEmail: any;
  reportingMgr: any;
  SnL: any;
  arrOfEMpIds : any[];
  emailToSend: any[];
  public Editor = ClassicEditor;
  eventFormGrp: FormGroup;
  projectData: Project[];
  projectUsers: any[] = [];
  error: any = [];
  eventModalTitle: string;
  btnName: string;
  researchMgrList: employeeUser[];
  eventTypes: any[];
  projectFlowData: any;
  leadBy: any;
  lead: any;
  krResearchMgr: any;
  expertName: any;
  label: string;
  minDurationType: string[];
  currentSME: string = '';
  projectClient: any;
  whoaim: any;
  //roles: string;
roles: string[];
  emailVariableObj: any;
  today: string;
  proratedValue: string;
  eventSME: any;
  expertNew: any;
  GTAMdata: any;
  GTCdata: any;
  GTCViewdata: any;

  attachedReportingMgr: string;
  usemp:boolean=false;
  custom_recruit:boolean=false;
  frontline_us_government_employee:boolean=false;
  nonus_government_employee:boolean=false;
  nonus_government_employee_geo:string="";
  ratecard:string="";  
  multiplier:string="";

  cardlist:any[]=[];
  uniqueGeographies:any[]=[];
  geography:any;
  multiplierValue:any;


  questions: any[] = []; 
  projectquestions: any[] = []; 
  country: any[] =country;
  
//import { Component, Input, Output, OnInit } from '@angular/core';
@Input() itemid: string='';
@Input() readonly: boolean=true;

answer: string;
userId: string;
firstName: string;
lastName: string;
contactNo: string;
primaryEmail: string;
phoneCode: string;
currency: string;
rate: any=0;
biography: string;
companyName1: string;
companyType1: string;
jobTitle1: string;
startMonth1: string;
startYear1: string;
endMonth1: string;
endYear1: string;
companyName2: string;
companyType2: string;
jobTitle2: string;
startMonth2: string;
startYear2: string;
endMonth2: string;
endYear2: string;
question: string;
private _id: string;
meeting_url: any;
phone_numbers: string;
instructions: any;
status: any;
proposed_duration: string;
actual_duration: string;
invoice_number: any;
supplier_name: string;
invoice_amount: string;
pdf_link: any;
Network_call_id: any;
Network_expert_id: string;
Network_workstream_id: string;
Duration: string;
Scheduled_at: string;
Call_id: any;
File: string;
Role: string;
start: string;
End: any;
mckmeetig_url: any;
mckduration: any;
mckInvoice: any;
mckclientdatetime: any;
mckclientcallid: any;
screening_Questions: any;
answers: any;
qa: any;
  companyName: any;
  end_month: any;
  end_year: any;
  position: any;
  start_month: any;
  endMonth: any;
  endYear: any;
  jobTitle: any;
  startMonth: any;
  company: any;
  projectStatus:any;

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    // gsprivate toasterService: ToastrService,
    private readonly projectService: ProjectService,
    private readonly clientService: ClientsService,
    private readonly expertService: ExpertService,
    private readonly employeeService: EmployeeService,
    private readonly incenticeService: IncentivesService,
    private emailService: EmailService,
    public complianceService: complianceActionsService,
    public toasterService: ToastService,
    private readonly eventService: EventService,
     private readonly mckservice: mckService,
  ) {
    this.isLoading = true;
    this.whoaim = JSON.parse(localStorage.getItem('user'));
    this.empList = JSON.parse(localStorage.getItem('emp'));
    this.roles = this.whoaim?.roles;

  }

  ngOnInit(): void {

    this.selectedslots=[];

    this.projectStatus = projectStatus;


    this.eventModalTitle = 'Add New Event';
    this.btnName = 'Create';
    this.id = this.itemid;// '6258ff6976264b02817eb0a5';//this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.fetch();
      this.getResearchMgrList();
      this.getProjectDetail();
      let days = 0;
      this.getcomplianceDetails();
      let currentDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
      let day = currentDate.getDate();
      let strDate = day < 10 ? '0' + day : day;
      let month = currentDate.getMonth() + 1;
      let year = currentDate.getFullYear();

      let strMonth = month < 10 ? '0' + month : month;

      this.today = year + '-01'  + '-' + strDate + 'T00:00';
    }

    this.DataDisplay();


  }


  MultipliervalueArray:any[]=[];
  multipliertext:any;
  SelectCard(event,type) {
    if(type === 'card'){
      const value = event.toLowerCase();
      this.MultipliervalueArray = this.cardlist.filter((card) => card.geography.toLowerCase() === value);
      //console.log(this.MultipliervalueArray);
    }
    if(type === 'multiplier'){
      debugger
      const value = event.multiplierValue;
      this.rate = this.MultipliervalueArray.find((card) => card.multiplierValue === value)['60minutesrate'];
    console.log(value);
     // this.multipliertext=
    }
  }


  idforCompliance: string;

  // Open client user form modal
  createClientUser(clientUserFormModal: any, saleid: any) {
    this.idforCompliance = saleid;

    this.modalService.open(clientUserFormModal, { size: 'lg', windowClass: 'modal-holder' });
  }
currentcallid:string="";

  test(win,$event)
  {
alert($event.id)
this.currentcallid=$event.call
  
this.modalService.open(win, { size: 'lg', windowClass: 'modal-holder' });

  }

  sendslot(win,$event,isnew)
  {

//this.currentcallid=$event.call
  this.clientdatetime(win,$event.expert,isnew,0)
//this.modalService.open(win, { size: 'lg', windowClass: 'modal-holder' });

  }
//sendrch,cancellcall,getcallinfo,getupdates





/*
  private getstatus() {
    this.prjlst.forEach((project) => {
   //  var res = _.find(projectStatus, { id: project.status });
    
     let res = this.projectStatus?.find((x) => (x.id == project.status || x.name == project.status ));  //this.clientList?.find((x) => x.id == id);
    if (res)
    {
      
     project['status']=res?.text;
       project['statuscls']=res?.colorClass;

    }
    else{
     
    }
    
    });
  }
  */

reason:string="";



cancelpop(win,id:any)
{



     // console.log(exp)

     let GTAM = id;//this.projectDetails?.givenToClient?.find((a) => a.id == id);

     // this.mckclientdatetime=GTAM.mckclientdatetime

      

      //console.log(this.mckInvoice )
     

      this.setexpertdata(GTAM)
  
      


//this.currentcallid=$event.call
//this.clientdatetime(win,$event.expert,isnew)
this.modalService.open(win, { size: 'md', windowClass: 'modal-holder' });

}



sentAt: any;

sentat(Formmodule:any, lead: any)
  {


    let sortedProducts = lead.calls.sort(
      (p1, p2) => (p1.timestamp < p2.timestamp) ? 1 : (p1.timestamp > p2.timestamp) ? -1 : 0);
  


    this.sentAt=sortedProducts


    
   console.log("lead",this.sentAt)

    this.modalService.open(Formmodule,{size:"md", centered:true, windowClass:"modal-holder"})
  }

changedate1(dt){

    //var date = new Date( this.collectionMCK.scheduled_at * 1000);
    var date = new Date(dt).toLocaleString();
    
    //console.log("date",this.sentAt.scheduled_at)

    return date;
  }
  scheduleddate(dt){

    //var date = new Date( this.collectionMCK.scheduled_at * 1000);
    var date = new Date(dt * 1000).toLocaleString('en-GB');
    
    //console.log("date",this.sentAt.scheduled_at)

    return date;
  }
  availabilitydate(dt){

    var date = new Date(dt * 1000).toLocaleString('en-GB');
    //var date = new Date(dt).toLocaleString();
    
    //console.log("date",this.sentAt.scheduled_at)

    return date;
  }



async cancellcall()
{






//this.currentcallid=$event.call

var msbody={
  "cancel_reason": this.reason,
  "callid":this.currentcallid

}


var url='https://middle.krsherpa.com/prod-mck/cancelcall' ;  
//var url='http://localhost:3000/prod-mck/sendslot' ;  
await fetch(url, {method: "POST",
body: JSON.stringify(msbody),
headers: {

 "Content-Type": "application/json",
 "timeout": "2000000" 

},

}
).then(r => r.json()).then(result => {
  // Result now contains the response text, do what you want...
console.log('id is:',result);
 },
 (error: any) => {
   this.isLoading = false;
 }
);



this.toasterService.success(`Event cancel details have been sent to client.`, 'Success!');
this.openedmodal.close();

//this.clientdatetime(win,$event.expert,isnew)
//this.modalService.open(win, { size: 'lg', windowClass: 'modal-holder' });

}

 iswsActive(ws)
{

var isactive=true;


  if ( this.projectDetails["workstreams"] && this.projectDetails["workstreams"]!=null)
  {
    
    for (let index = 0; index < this.projectDetails["workstreams"].length; index++) {
      var element = this.projectDetails["workstreams"][index];
      if (element['id']===ws)
      {

        if (element['paused']==true)
        {
          isactive=false;

        }
        else{

          isactive=true;
        }

break;
      }

     

    }

  }
  return isactive;


}




async InitiateNewcall(id,ws)
{



  let GTAM = id;
    
 

  this.setexpertdata(GTAM)

  

  var mckinsey4=     {
    "network_call_id":  this.currentcallid,
    "network_expert_id":  this.selectedExid ,
    "network_workstream_id": ws ,    
}



//this.currentcallid=$event.call

var msbody={
 
  "callid":this.currentcallid

}
//prod-mck changed to mck 10Apr2024

var url='https://middle.krsherpa.com/prod-mck/Initnewcall' ;  
//var url='http://localhost:3000/prod-mck/sendslot' ;  
await fetch(url, {method: "POST",
body: JSON.stringify(mckinsey4),
headers: {

 "Content-Type": "application/json",
 "timeout": "2000000" 

},

}
).then(r => r.json()).then(result => {
  // Result now contains the response text, do what you want...
console.log('id is:',result);
 },
 (error: any) => {
   this.isLoading = false;
 }
);



this.toasterService.success(`Event cancel details have been sent to client.`, 'Success!');
this.openedmodal.close();

//this.clientdatetime(win,$event.expert,isnew)
//this.modalService.open(win, { size: 'lg', windowClass: 'modal-holder' });

}

genericdata:any;
availableFieldsArray = [];
KeyWordsListArray = [];
columns = ['name','created_at']
expprojectcount:any=0;
sentExpertData:any;
DisplayData(expid:any){

  this.genericdata = {
    "keywords":[
      {
        "givenToClient.id": expid
      },
      {
        "clientId": "5d1f01119c2af96ec5b9447b"
      }
    ]
  }


  console.log("this.genericdata",this.genericdata)


  fetch('https://middle.krsherpa.com/projects/projects/search',{
    method:'POST',
    body:JSON.stringify(this.genericdata),
    headers:{'Content-Type':'application/json'}
  })
  .then((data) =>data.json())
  .then((data) =>{
    console.log(data)
    console.log(data.length)
    this.KeyWordsListArray =data;
    this.expprojectcount=data.length
  })
  this.availableFieldsArray = this.columns;
}

ClientListClick(_id: any)
{
//const urlTree: UrlTree = this.router.createUrlTree(['/projectsall/project',_id]);
//const url: string = this.router.serializeUrl(urlTree);
//window.open(url, '_blank');
}


//new rate 30Jun2024


rateFormValues = {
  min30: '',
  min45: '',
  min60: '',
  min: '',
  rate: null
};
RateArray:any[] = []
GetRate(event,json){
  const value = event.target.value;
  const find_data = this.RateArray.find(item=>item.min === json)
  if(find_data){
    find_data.rate = value
  }else{
    this.RateArray.push({'min':json,'rate':value})
  }
}

onSubmit() {    
  const find_data = this.RateArray.find(item=>item.min === this.rateFormValues.min+'min')
  if(find_data){
    find_data.rate = this.rateFormValues.rate;
    this.rateFormValues['min'+this.rateFormValues.min] = this.rateFormValues.rate;
  }else{
    this.RateArray.push({'min':this.rateFormValues.min+'min','rate':this.rateFormValues.rate})
  }
  this.rateFormValues.min = '';
  this.rateFormValues.rate = '';
}

EditRateValues ={
  edit_min :null,
  edit_rate: ''
}
EditRate(popup,data){
  this.modalService.open(popup,{size:'md',centered:true})
  const numericPart = data.min.slice(0, -3); 
  this.EditRateValues.edit_min = numericPart;
  this.EditRateValues.edit_rate = data.rate;
  const bnt = document.getElementById('update-btn');
  if(bnt){
    bnt.addEventListener('click',()=>this.onUpdate(data,numericPart))
  }
}
onUpdate(data,numericPart){
  data.min = this.EditRateValues.edit_min + 'min';
  data.rate = this.EditRateValues.edit_rate;
  console.log(this.rateFormValues['min'+this.EditRateValues.edit_min])
  let minutes = [30,45,60]
  // minutes.forEach(min=>{
  //   if(min === this.EditRateValues.edit_min){
  //     this.rateFormValues['min'+min] = data.rate;
  //   }else{
  //     this.rateFormValues['min'+numericPart] = '';
  //   }
  // })
  this.modalService.dismissAll()
}
DeleteRate(data) {
  const index = this.RateArray.indexOf(data);
  const confirm = window.confirm('Are You Sure You Want to Delete This Item?');
  if (confirm) {
    if (index !== -1) {
      this.RateArray.splice(index, 1);
    }
    const numericPart = data.min.slice(0, -3); 
    if(this.rateFormValues['min'+numericPart]){
      this.rateFormValues['min'+numericPart] = '';
    }
  }
}

select_minutes:any;
SelectMinute(){
  console.log(this.select_minutes)
}




//new rate 30Jun2024

openprjlist(win)
{
/*const urlTree: UrlTree = this.router.createUrlTree(['/projectsall/project',_id]);
const url: string = this.router.serializeUrl(urlTree);
window.open(url, '_blank'); */

this.modalService.open(win, { size: 'lg', windowClass: 'modal-holder' });


}


sendcallid(id:any)
{

  let GTAM = id;//this.projectDetails?.givenToClient?.find((a) => a.id == id);

      

      this.setexpertdata(GTAM)
}

async sendCallConnect()
{






//this.currentcallid=$event.call

var msbody={

  "callid":this.currentcallid

}


var url='https://middle.krsherpa.com/prod-mck/sendcallid' ;  
//var url='http://localhost:3000/prod-mck/sendslot' ;  
await fetch(url, {method: "POST",
body: JSON.stringify(msbody),
headers: {

 "Content-Type": "application/json",
 "timeout": "2000000" 

},

}
).then(r => r.json()).then(result => {
  // Result now contains the response text, do what you want...
console.log('id is:',result);
 },
 (error: any) => {
   this.isLoading = false;
 }
);



this.toasterService.success(`Expert availability has been sent to client.`, 'Success!');
this.openedmodal.close();

//this.clientdatetime(win,$event.expert,isnew)
//this.modalService.open(win, { size: 'lg', windowClass: 'modal-holder' });

}
getcallinfo(win,$event)
{

this.currentcallid=$event.call
//this.clientdatetime(win,$event.expert,isnew)
this.modalService.open(win, { size: 'lg', windowClass: 'modal-holder' });

}


getupdates(win,$event)
{
alert($event.id)
this.currentcallid=$event.call
//this.clientdatetime(win,$event.expert,isnew)
this.modalService.open(win, { size: 'lg', windowClass: 'modal-holder' });

}


  RefreshList() {
    this.refreshed = false;
    this.refreshed = true;
    this.getProjectDetail();
  }

  submitResponses() {
    const userResponses = this.questions.map(question => {
      return {
        question: question.text,
        answer: question.answer
      };
    });

this.submitQAData(this.questions)

   // this.modalService.dismissAll('no');
console.log(this.questions);

  }

  workstreams:any[]=[];


  compliancealldata: any;

  getcomplianceDetails() {
    const filters = new Map();

    const filter = {
      where: {
        and: [
          {
            compliancetype: 'profile',
          },
        ],
      },
    };

    filters.set('filter', JSON.stringify(filter));
    this.complianceService.getAll(filters).subscribe(
      (client: any) => {
        //  this.isLoading = false;
        this.compliancealldata = client;
        // console.log('compliancealldata Details', this.compliancealldata);
        //  var userData = JSON.parse(window.localStorage.getItem('user'));
      },
      (error: any) => {}
    );
  }

  //**gs

  getcompliancestatusclr(id: string, isok: boolean) {
    if (id != null && this.compliancealldata != undefined) {
      const rec = this.compliancealldata?.find((x:any) => x.salesLeadId === id && x.statuscode > 0);
      if (rec != null && rec != undefined) {
        return 'lightsalmon';
      } else {
        return 'white';
      }
    } else {
      return 'white';
    }
  }

  refreshed: boolean;
isOld=false;
  getcompliancestatus(id: string) {
    if (id != null && this.compliancealldata != undefined) {
      this.whoaim = JSON.parse(localStorage.getItem('user'));
      this.roles = this.whoaim?.roles;

      const rec = this.compliancealldata?.find((x:any) => x.salesLeadId === id && x.statuscode > 0);

      if (rec != null && rec != undefined) {
        return 'font-size: 1.2rem;color:red;';
      } else {
        const rec1 = this.compliancealldata?.find((x:any) => x.salesLeadId === id);
        if (rec1 != null && rec1 != undefined) {
          return 'font-size: 1.2rem;color:green;';
        } else {
          if (this.roles.includes( 'compliance')) {
            return 'font-size: 1.2rem;color:blue;';
          } else {
            return 'display:none;';
          }
        }
      }
    }
    return '';
  }
  //**gs

 public getleadAttachedList() {

return   this.projectDetails?.leadAttached?.filter((e) =>e.attachedBy != undefined);

 }

 private getGTAMList() {

  return   this.projectDetails?.leadAttached?.filter((e) =>e.attachedBy != undefined);
  
   }



  // Get KR Research Managers list
  private getResearchMgrList() {
    const filters = new Map();
    const filter = {
      where: {
        designation: 10,
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

  // Getproject Details
  private getProjectDetail() {
    this.isLoading = true;
    this.projectService.show(this.id).subscribe(

      async (project: any) => {

        console.log('this.projectDetails',project)
debugger
        this.projectDetails = project;
        this.arrOfEMpIds = [];
        this.arrOfEMpIds.push(this.projectDetails?.keyAccMgrId);
        let selectedEmailPeople = this.empList?.filter((e) => this.arrOfEMpIds.indexOf(e.id) != -1);
        this.emailToSend = selectedEmailPeople?.map((a) => a.email);

        this.questions =  [];

        this.projectquestions=[];

        if ( this.projectDetails.screening_questions && this.projectDetails.screening_questions!=null)
        {
        for (let index = 0; index < this.projectDetails.screening_questions.length; index++) {
          const element = this.projectDetails.screening_questions[index];
        
        const qq={
        "question":element,
        "answer":""
        }
        this.questions.push(qq)

        
        
        }
        
        }


        this.workstreams=[];
        
        this.projectquestions=this.questions;
        

        if ( this.projectDetails["workstreams"] && this.projectDetails["workstreams"]!=null)
        {
          
          for (let index = 0; index < this.projectDetails["workstreams"].length; index++) {
            var element = this.projectDetails["workstreams"][index];
        
            
        
            console.log("workstreams",element)
          const qq={
          "name":element["title"],
          "id":element["id"],
          "internalWSId":element["internal_workstream_id"]
          }
          this.workstreams.push(qq)
        
          
          }
          
        }
        



        console.log(this.projectDetails.screening_questions)
        console.log(this.questions)
        
                this.getnotsentlistlist();
               this.getpendinglist()
               this.getapprovedlist()
               this.getrejectedlist()





if (project["datasrc"])
{
  this.isOld=true;

 // 60a2b8466fc81f44dca3c248

console.log('this.isOld',this.isOld)
console.log('this.leadAttached',this.projectDetails?.leadAttached)


}
else{
        if (this.projectDetails?.leadAttached?.length) {
          for (let i = 0; i < this.projectDetails?.leadAttached?.length; i++) {
            this.projectDetails.leadAttached[i]['currentEmployer'] = this.projectDetails?.leadAttached[i]
              ?.workingDetails?.length
              ? this.projectDetails.leadAttached[i]?.workingDetails[
                  this.projectDetails.leadAttached[i]?.workingDetails.length - 1
                ]['companyName']
              : '';
          }
        }  
      }

/*  */

try {
  this.krResearchMgr = this.researchMgrList?.find(
    (x:any) => this.projectDetails?.researchManagerId?.indexOf(x.userId) != -1
  ).userId;
} catch (error) {  
}

     
        

        this.projectDetails.startDate = project.startDate;
        this.projectDetails.dueDate = project.dueDate;
        if (this.projectDetails.leadAttached) {
          await this.syncAttatchedLeads();
        }
        this.getClient(this.projectDetails?.clientId);
        this.isLoading = false;
      },
      (error: any) => {
        console.log(error);
        this.isLoading = false;
      }
    );
  }

  notsentlist:any=[];
  pendinglist:any=[];
  approvedlist:any=[];
  rejectedlist:any=[];

  primary: any=-1;
  selectedws:any="";

  meetinginstructions:any="";

  meetingph:any="";

  meetingurl:any="";

  getprimary(index){

    this.primary=index
    //console.log( this.primary)
  }
  collectionMCK:any;

  opencollectionMCK(formmodal:any, id:any)
  {

    this.expertService.show(id).subscribe(
      (exp: any) => {
      
      let GTC = this.projectDetails?.givenToClient?.find((a) => a.id == id);
  
      
        this.collectionMCK = GTC.calls?GTC.calls[GTC.calls.length-1]:{};
        //var fff = GTC.collection_mck.status;
  
  console.log("this.collectionMCK",this.collectionMCK)
       // this.setexpertdata(GTC)
          },
          (error: any) => {
            this.isLoading = false;
          }
        );
  
    debugger
    
  
    this.modalService.open(formmodal,{size:'md',centered:true, windowClass:"modal-holder"})
  }

  changedate(dt){

    var date = new Date( this.collectionMCK.scheduled_at * 1000);
    
    //console.log(date.toUTCString())

    return date;
  }



   getClientSentExpData(expertId, data) {
    // Iterate through workstreamcalls
    for (const workstream of data.workstreamcalls) {
        // Iterate through experts in each workstream
        for (const expert of workstream.experts) {
            // Check if expert id matches
            if (expert.id === expertId) {
                // Return ClientSentExpData if found
                return expert.ClientSentExpData;
            }
        }
    }
    // Return null if expert not found
    return null;
}




  readonlyexpert(formmodal:any,id:any)
  {

    console.log('GTAM',id)
const result=this.getClientSentExpData(id,this.projectDetails)
   
this.sentExpertData=result


  /*  this.expertService.show(id).subscribe(
      (exp: any) => {
     
  
        debugger
  
        //console.log(exp)
  
    let GTAM = this.projectDetails?.givenToClient?.find((a) => a.id == id);
  
    //console.log(GTAM)
  
 
  
        this.workingDetails = exp?.workingDetails;
  
  
       var works=[];
  
       for (let index = 0; index < this.workingDetails.length; index++) {
         const element = this.workingDetails[index];
         
       
       console.log(element)
       
         works.push({
           "network_employment_id": index.toString(),
           "company": element.company,
           "end_month": element.end_month,
           "end_year": element.end_year,
           "geography":element.geography,
           "position":  element.position,
           "responsibilities":element.responsibilities,
           "start_month": element.start_month,
           "start_year": 0,// Number.isNaN(element.startYear)?0:parseInt(element.startYear),
           })
       
       }
       
       this.workingDetails=works;
      
        this.screenquestions = GTAM.screening_questions;
  
  
    
          },
          (error: any) => {
            this.isLoading = false;
          }
        );  */
    this.modalService.open(formmodal,{size:'lg',centered:true, windowClass:"modal-holder"})
  }

  close() {
    
}

DataDisplay(){
  fetch('https://middle.krsherpa.com/projects/ratecards/list')
  .then(response => response.json())
  .then(data => {
      console.log(data);
      this.cardlist=data;
      this.uniqueGeographies = [...new Set(this.cardlist.map(card => card.geography))];
  })
  .catch(error => {
      console.error('Error fetching data:', error);
  });

}





  getnotsentlistlist()
  {
    console.log( this.notsentlist)
  
    this.notsentlist = this.projectDetails.givenToClient;  //?.filter((x:any) =>( x.clientstatus ==null || x.clientstatus =="notsent" ))
    console.log( this.notsentlist)
  }



  getpendinglist()
  {
    this.pendinglist = this.projectDetails.givenToClient?.filter((x:any) => x.clientstatus =="pending")
    //console.log( this.pendinglist)
  }


  
  getapprovedlist()
  {
    this.approvedlist = this.projectDetails.givenToClient?.filter((x:any) =>( x.clientstatus =="compliance_approved" || (x.calls !=null && x.calls.length>0 )))
    //console.log( this.approvedlist)
  }

  getrejectedlist()
  {
    this.rejectedlist = this.projectDetails.givenToClient?.filter((x:any) =>( x.clientstatus =="compliance_rejected" ||  x.clientstatus =="project_user_rejected"))
    //console.log( this.rejectedlist)
  }


  private fetch() {
    this.currenciesList = currencies;
    this.rateTypes = options.rateTypes;
    this.eventTypes = eventTypes;
    this.minDurationType = options.minDurationType;
    this.getExperts();
    // this.createExpertForm();

    // this.eventForm();
  }
  getClient(id) {
    this.clientService.show(id).subscribe((response) => {
      debugger
      this.projectClient = response;
      this.projectUsers = this.projectClient?.clientUser?.filter(
        (a) => this.projectDetails?.clientUsers.indexOf(a.userId) != -1
      );
    });
  }

  selectedslots:any;
  value:any;
  value2:any;
  sendval(){

      //alert(this.value);
      console.log(this.value);


    //var dateString = '17-09-2013 10:08',
   // dateTimeParts = dateString.split(' '),
   var timeParts = this.value2.split(':');
   var dateParts = this.value.split('-');
   var  date;

date = new Date(dateParts[0], parseInt(dateParts[1], 10) - 1, dateParts[2], timeParts[0], timeParts[1],10);
console.log(date); //1379426880000
console.log(date.getTime()); //1379426880000



     if (this.value) {
      this.selectedslots.push({
        "date":date,
        "date1":this.value + ' '+this.value2,
        "timestamp":date.getTime()/1000

      });
      this.value;
    };



    // if (this.value2) {
    //   this.invalue.push({
        
    //     "message2":this.value2,
    //   });
    //   this.value2;
    // };
  }


  sentclientxxx(formmodal:any){
    this.modalService.open(formmodal,{size:'lg',centered:true, windowClass:"modal-holder"})
  }
  sentclient1(formmodal:any){
    this.modalService.open(formmodal,{size:'sm',centered:true, windowClass:"modal-holder"})
  }
  sentclient2(formmodal:any){
    this.modalService.open(formmodal,{size:'sm',centered:true, windowClass:"modal-holder"})
  }
  sentclient3(formmodal:any){
    this.modalService.open(formmodal,{size:'md',centered:true, windowClass:"modal-holder"})
  }
  sentclient4(formmodal:any){
    this.modalService.open(formmodal,{size:'md',centered:true, windowClass:"modal-holder"})
  }
  sentclient5(formmodal:any){
    this.modalService.open(formmodal,{size:'md',centered:true, windowClass:"modal-holder"})
  }

selectdmcExpertid=0;

  openqa(model, id )
  {

this.selectdmcExpertid=id;
    
let existingLead = _.findIndex(this.projectDetails?.leadAttached, { id: id });


this.questions=[];

if ( this.projectDetails?.leadAttached[existingLead].screening_questions && this.projectDetails?.leadAttached[existingLead].screening_questions!=null)
{
for (let index = 0; index < this.projectDetails?.leadAttached[existingLead].screening_questions.length; index++) {
  const element = this.projectDetails?.leadAttached[existingLead].screening_questions[index];

const qq={
"question":element.question,
"answer":element.answer,
}


this.questions.push(qq)



}

}
else{
  this.questions= this.projectquestions

}


    this.modalService.open(model, { size: 'md',centered: true, windowClass: 'modal-holder' });
  
  
  }





  
  private async getExperts() {

    this.krExpertsList= this.expertService.getexmindata();
    /*
    await this.expertService.getAll().subscribe(
      (experts: any) => {
        this.krExpertsList = experts;

        this.syncAttatchedLeads();
      },
      (error: any) => {}
    );
*/

  }
  /**
   * Open new lead modal
   * @param newLeadDataModal center modal data
   */
  // newLead(newLeadDataModal: any) {
  //   this.modalService.open(newLeadDataModal, { centered: true, windowClass: 'modal-holder' });
  //   this.leadModalTitle = 'New Lead';
  //   this.getLeadFromView = true;
  //   this.selectExpertView = false;
  // }

  // Create New Lead Form (in modal)
  // createNewLeadForm(newLeadFormModal: any) {
  //   this.modalService.open(newLeadFormModal, { size: 'lg', centered: true, windowClass: 'modal-holder' });
  // }

  // Show KR Expert select fields (in modal)
  // assignFromKrPool() {
  //   this.leadModalTitle = 'Assign KR Expert';
  //   this.getLeadFromView = false;
  //   this.selectExpertView = true;
  //email notification
  // this.emailService.sendEmail(
  //   EmailJsTemplates.ProjectExperts,
  //   this.emailToSend,
  //   'Informative',
  //   EmailTitleDescription.ProjectExperts
  // );
  // }

  /**
   * Open assign/show KR Expert modal
   * @param krExpertFormModal center modal data
   */
  krExpertForm(krExpertFormModal: any, expert, isProfile = true) {
    this.showOnlyProfile = isProfile;
    this.createExpertForm();
    this.modalService.open(krExpertFormModal, { centered: true, windowClass: 'modal-holder' });

    if (expert?.id) {
      this.selectedExpert = expert;
      this.industry = industry?.find((x:any) => x.id == this.selectedExpert.industry)?.text;
    }

    if (!isProfile) {
      // Form auto fill
      this.appendExpertData();
    }
  }

  // Pre-fill expert data in form
  appendExpertData() {
    this.selectedExpert = _.find(this.krExpertsList, { id: this.selectedExpert });
    if (this.selectedExpert.krRelationshipMgr) {
      this.getResearchMgr(this.selectedExpert?.krRelationshipMgr);
    }

    this.assignExpertForm.patchValue(this.selectedExpert);

  }

  submitData() {
    const data = this.assignExpertForm.value;

    this.isLoading = true;

    let existingLead = _.findIndex(this.projectDetails?.leadAttached, { id: this.selectedExpert.id });

    if (existingLead > -1) {
      const { id, rateForClient, currency, rateType, sme, createdAt } = this.projectDetails.leadAttached[existingLead];
      const updateLd = {
        id: id,
        rateForClient: +data.rate,
        currency: data.currency,
        rateType: data.rateType,
        sme: sme,
        createdAt: createdAt,
        updatedAt: new Date(),
        leadAttachedBy: this.leadBy,
      };
      this.projectDetails.leadAttached[existingLead] = updateLd;

      this.expertFormData = {
        leadAttached: [...this.projectDetails.leadAttached],
      };
    } else {
      this.expertFormData = {
        leadAttached: [],
      };

      if (this.projectDetails?.leadAttached !== undefined) {
        this.expertFormData = {
          leadAttached: this.projectDetails?.leadAttached,
        };
      } else {
        this.expertFormData.leadAttached = [];
      }

      this.expertFormData.leadAttached.push({
        id: this.selectedExpert.id,
        rateForClient: +data.rate,
        currency: data.currency,
        rateType: data.rateType,
        sme: this.expertFormData.leadAttached.length,
        createdAt: new Date(),
        updatedAt: new Date(),
        leadAttachedBy: this.leadBy,
      });
    }
    this.syncAttatchedLeads();
    this.updateOnServer(this.id, this.expertFormData, 'creat');

   // this.modalService.dismissAll();
  }

  submitQAData(qa) {

debugger
    //this.isLoading = true;

    let existingLead = _.findIndex(this.projectDetails?.leadAttached, { id: this.selectdmcExpertid });

    if (existingLead > -1) {
     
      this.projectDetails.leadAttached[existingLead].screening_questions = qa;

      this.expertFormData = {
        leadAttached: [...this.projectDetails.leadAttached],
      };

      this.updateDataOnServer(this.id, this.expertFormData, 'update');

    } 
   // this.syncAttatchedLeads();
   this.isLoading = false;
 
   // this.modalService.dismissAll();
  }




  // Delete confirmation dialog
  deleteLeadConfirm(id: string, from: string) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success delete-lead',
        cancelButton: 'btn btn-danger ml-2',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Are you sure?',
        text: 'Delete Lead?',
        icon: 'warning',
        cancelButtonText: 'Cancel',
        confirmButtonText: 'Yes',
        showCancelButton: true,
      })
      .then((result) => {
        if (result.value) {
          this.deleteLead(id, from);
        }
      });
  }

  // Show leads Attached
  viewLeadsAttached() {
    this.getProjectDetail();
    this.leadAttachedTable = true;
    this.gtamTable = false;
    this.gtcTable = false;
      this.eventTable = false;
  }

  // Show leads/client given to account manager
  viewGtam() {
    this.getProjectDetail();
    this.leadAttachedTable = false;
    this.gtamTable = true;
    this.gtcTable = false;
    this.eventTable = false;
  }

  // Show experts given to client
  viewGtc() {
    this.getProjectDetail();
    this.leadAttachedTable = false;
    this.gtamTable = false;
    this.gtcTable = true;
    this.eventTable = false;
  }

    // Show experts given to client
    viewEvent() {
      this.getProjectDetail();
      this.leadAttachedTable = false;
      this.gtamTable = false;
      this.gtcTable = false;
      this.eventTable = true;

    }
  
  openViewGTAMModal(viewGTAMModal, lead) {

    debugger
    let alreadyGTAM = this.projectDetails?.givenToAccMgr?.find((a) => a.id == lead.id);

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

    let alreadyGTC = this.projectDetails?.givenToClient?.find((a) => a.id == lead.id);
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
  
 // Transfer Lead Form (in modal)
 openGTCforEdit(EditGTCmodel: any, lead: any, transferLevel: number = 1) {
    if (transferLevel == 1) {
      this.label = 'Expert Pricing';
      this.proratedValue = 'Prorated';

      console.log('lead.id',lead)

      let alreadyGTAM = this.projectDetails?.givenToAccMgr?.find((a) => a.id == lead.id);

      if (alreadyGTAM) {
          this.toasterService.error(`expert/lead is already given to KAM.`, 'Error!');
        return;
      }

      let alreadyGTC = this.projectDetails?.givenToClient?.find((a) => a.id == lead.id);
      if (alreadyGTC) {
            this.toasterService.error(`expert is already given to client.`, 'Error!');
        return;
      }
    }

    this.transferLead = lead;
    if (transferLevel > 1) {
      this.proratedValue = this.transferLead?.prorated;
    }
    console.log('this.transferLead', this.transferLead);
    this.createTransferExpForm();

    this.transferLevel = transferLevel;
    this.modalService.open(EditGTCmodel, {
      size: 'xl',
      backdrop: 'static',
      centered: true,
      windowClass: 'modal-holder',
    });
  }


  // Transfer Lead Form (in modal)
  transferLeadForm(transferLevelModal: any, lead: any, transferLevel: number = 1) {
    if (transferLevel == 1) {
      this.label = 'Expert Pricing';
      this.proratedValue = 'Prorated';

      console.log('lead.id',lead)

      let alreadyGTAM = this.projectDetails?.givenToAccMgr?.find((a) => a.id == lead.id);

      if (alreadyGTAM) {
          this.toasterService.error(`expert/lead is already given to KAM.`, 'Error!');
        return;
      }

      let alreadyGTC = this.projectDetails?.givenToClient?.find((a) => a.id == lead.id);
      if (alreadyGTC) {
            this.toasterService.error(`expert is already given to client.`, 'Error!');
        return;
      }
    }

    this.transferLead = lead;
    if (transferLevel > 1) {
      this.proratedValue = this.transferLead?.prorated;
    }
    console.log('this.transferLead', this.transferLead);
    this.createTransferExpForm();

    this.transferLevel = transferLevel;
    this.modalService.open(transferLevelModal, {
      size: 'xl',
      backdrop: 'static',
      centered: true,
      windowClass: 'modal-holder',
    });
  }


  

  // Update transfer notes and lead
  transferSubmit() {
    switch (this.transferLevel) {
      case 1:
        this.transferToGTAM();
        break;
      case 2:
        this.transferToGTC();
        break;
      default:
        break;
    }
  }
  openDetails(val) {
    window.open('/expert/expert-details/' + val);
  }
  // Given to Account Manager
  private transferToGTAM() {
    if (this.projectDetails?.givenToAccMgr) {
      this.projectFlowData = {
        givenToAccMgr: this.projectDetails.givenToAccMgr,
      };
    } else {
      this.projectFlowData = {
        givenToAccMgr: [],
      };
    }

    if (!this.transferLead) {
      return;
    }
    const fv = this.transferExpertForm.value;
    this.expertNew = this.transferExpertForm.value;
    if (this.transferExpertForm.valid) {
      const gtamData = {
        ...this.transferLead,
        ...this.transferExpertForm.value,
        relevance: fv.relevance,
        directInvolvement: fv.directInvolvement,
        canDiscuss: fv.canDiscuss,
        welcomeLines: fv.welcomeLines,
        additionalComments: fv.additionalComments,
        availability: fv.availability,
        conversationStyle: fv.conversationStyle,
        isnew:this.isnewv,
        createdAt: new Date(),
        updatedAt: new Date(),
        gtamDate: new Date(),
      };

      // Push into GTAM object
      this.projectFlowData.givenToAccMgr.push(gtamData);


console.log('gtamData',gtamData);



      let userData = JSON.parse(localStorage.getItem('user'));
      let honorarium = isNaN(gtamData.rate) ? 0 : parseFloat(gtamData.rate);
      let emp = this.empList?.find((a) => a.userId == userData.id);
      //Add Incentive details
      let _rm = this.getManagerId(userData.id);
      let incentiveObj = {
        Userid: userData.id,
        honorarium: honorarium,
        designation: emp?.designationStr ?? userData.roles[0],
        date: new Date(),
        client_id: this.projectDetails?.clientId,
        project_id: this.projectDetails?.id,
        expert_id: gtamData.id,
        rm_id: _rm,
        kam_id: this.projectDetails?.keyAccMgrId,
        subPnL: this.getManagerId(this.projectDetails?.keyAccMgrId),
      };
      this.incenticeService.create(incentiveObj).subscribe((data) => {});

      // Store
      this.updateOnServer(this.id, this.projectFlowData, 'transfer');
    } else {
      return;
    }

    // Delete from LA object
    // this.deleteLead(this.transferLead.id, 'leadAttached');
  }

  // Given to Client
  private transferToGTC() {
    this.getProjectDetail();
    if (this.projectDetails?.givenToClient) {
      this.projectFlowData = {
        givenToClient: this.projectDetails.givenToClient,
      };
      // this.projectDetails['givenToClient'] = [...this.projectDetails.givenToClient];
    } else {
      this.projectFlowData = {
        givenToClient: [],
      };
      // this.projectDetails['givenToClient'] = [];
    }

    if (!this.transferLead) {
      return;
    }

    const fv = this.transferExpertForm.value;
    if (this.transferExpertForm && this.transferExpertForm.value.CProrated != '') {
      const gtcData = {
        ...this.transferLead,
        ...this.transferExpertForm.value,
        sme: this.projectDetails['givenToClient'] ? this.projectDetails['givenToClient']?.length + 1 : 1,
        relevance: fv.relevance,
        directInvolvement: fv.directInvolvement,
        canDiscuss: fv.canDiscuss,
        welcomeLines: fv.welcomeLines,
        additionalComments: fv.additionalComments,
        availability: fv.availability,
        conversationStyle: fv.conversationStyle,
        clientrates:this.RateArray,
        pricing: fv.pricing,
        isnew:this.isnewv,
        createdAt: new Date(),
        updatedAt: new Date(),
        gtcDate: new Date(),
      };

      this.projectFlowData.givenToClient.push(gtcData);

      this.updateOnServer(this.id, this.projectFlowData, 'transfer');

     // this.deleteLead(this.transferLead.id, 'givenToAccMgr');
    }
  }



// popup start

selectedgtam:any;
selectedgtam1:any[]=[];
screenquestions:any[]=[];
workingDetails :any=[];
workingDetails1 :any=[];
workingDetails2 :any=[];

clientexpert(formmodal:any,id:any)
{

  this.expertService.show(id).subscribe(
    (exp: any) => {
   

      debugger

      console.log(exp)

  let GTAM = this.projectDetails?.givenToClient?.find((a) => a.id == id);

  //console.log(GTAM)

this.setexpertdata(GTAM)

this.selectedgtam = GTAM;

     /* if( exp?.workingDetails&& exp?.workingDetails?.length >0)
      {
        this.workingDetails1 = exp?.workingDetails[0];
        this.workingDetails2 = exp?.workingDetails[1];
      }*/

      this.workingDetails = exp?.workingDetails;


     var works=[];

     for (let index = 0; index < this.workingDetails.length; index++) {
       const element = this.workingDetails[index];
       
     
     //console.log(element)
     
       works.push({
         "network_employment_id": index.toString(),
         "company": element.companyName,
         "end_month": element.endMonth,
         "end_year": element.endYear,
         "geography":  " ",
         "position":  element.jobTitle,
         "responsibilities":  " ",
         "start_month": element.startMonth,
         "start_year": 0,// Number.isNaN(element.startYear)?0:parseInt(element.startYear),
         })
     
     }
     
     this.workingDetails=works;
    
      this.screenquestions = GTAM.screening_questions;


  
        },
        (error: any) => {
          this.isLoading = false;
        }
      );


       //console.log(this.selectedgtam1)
       
       this.DisplayData(id)

  //console.log('exp is' , GTAM)
  //console.log('exp is' , this.screenquestions)

 this.openedmodal= this.modalService.open(formmodal,{size:"lg",centered:true,windowClass:'modal-holder'})



}
// popup end


//edit popup

openEditWorkingDetails(Formmodal:any)
{


  this.modalService.open(Formmodal,{ size:"md", centered: true });
}

workdataupdate()
  {
   
    //  var work={
  
    //     "company":this.company,
    //     "end_month":this.endMonth,
    //     "end_year": this.endYear,
    //     "geography":  " ",
    //     "position":this.jobTitle,
    //     "responsibilities":  " ",
    //     "start_month":this.startMonth,
    //     "start_year": 0,// Number.isNaN(element.startYear)?0:parseInt(element.startYear),
    //     }
        console.log( this.workingDetails)



  }
   
  delete(index)
   {
    
    var result = confirm("are sure you Want to delete?");
    if (result) {
       
        this.workingDetails.splice(index, 1);
    }
    
   
   // let index = this.workingDetails.indexOf(wd)
   
  }


  //screenquestions edit answer 
  Editanswer(Formmodal:any)
  {
    
    this.modalService.open(Formmodal,{ size:"md", centered: true });
  }
  
  answersave()
  {
    console.log( this.screenquestions)
  }

  screenquestiondelete(index)
  {
    var result = confirm("are sure you Want to delete?");
    if (result) {
       
        this.screenquestions.splice(index, 1);
    }
  }
//screenquestions edit answer end



selectedExid:any;

setexpertdata(data:any){

  debugger
  this.selectedExid=data.id,  
  this.firstName=data.firstName,
  this.lastName=data.lastName,
  this.contactNo="",
  this.primaryEmail="",
  this.phoneCode="",
  this.currency=data.CPcurrency,
  this.rate=data.CPrate,
  this.biography=data.biography
  this.currentcallid=data?.callid?data.callid:"";
  
  console.log(data)


/*
  //console.log(this.firstName)
  // this.companyName1=this.workingDetails1?.companyName,
  // this.companyType1=this.workingDetails1?.companyType,
  // this.jobTitle1=this.workingDetails1?.jobTitle,
  // this.startMonth1=this.workingDetails1?.startMonth,
  // this.startYear1=this.workingDetails1?.startYear,
  // this.endMonth1=this.workingDetails1?.endMonth,
  // this.endYear1=this.workingDetails1?.endYear,

  // this.companyName2=this.workingDetails2?.companyName,
  // this.jobTitle2=this.workingDetails2?.jobTitle,
  // this.startMonth2=this.workingDetails2?.startMonth,
  // this.startYear2=this.workingDetails2?.startYear,
  // this.endMonth2=this.workingDetails2?.endMonth,  
  // this.endYear2=this.workingDetails2?.endYear,

  this.answer=this.screening_Questions?.answer,
 

  
  this.meeting_url=this.mckmeetig_url?.meeting_url,
  this.phone_numbers=this.mckmeetig_url?.phone_numbers,
  this.instructions=this.mckmeetig_url?.instructions

  this.status=this.mckduration?.status
  this.proposed_duration=this.mckduration?.proposed_duration
  this.actual_duration=this.mckduration?.actual_duration
  
  this.invoice_number=this.mckInvoice?.invoice_number
  this.supplier_name=this.mckInvoice?.supplier_name
  this.invoice_amount=this.mckInvoice?.invoice_amount
  this.pdf_link=this.mckInvoice?.pdf_link
  this.currency=this.mckInvoice?.currency

  this.Network_call_id=this.mckclientdatetime?.Network_call_id
  this.Network_expert_id=this.mckclientdatetime?.Network_expert_id
  this.Network_workstream_id=this.mckclientdatetime?.Network_workstream_id
  this.status=this.mckclientdatetime?.status
  this.Duration=this.mckclientdatetime?.Duration
  this.Scheduled_at=this.mckclientdatetime?.Scheduled_at

  this.Call_id=this.mckclientcallid?.Call_id
  this.id=this.mckclientcallid?.id
  this.File=this.mckclientcallid?.File
  this.Role=this.mckclientcallid?.Role
  this.start=this.mckclientcallid?.start
  this.End=this.mckclientcallid?.End
  */

}





  sendExtoClient() {

    

  }




  private createTransferExpForm() {
    this.transferExpertForm = this.formBuilder.group({
      welcomeLines: [null, [Validators.nullValidator]],
      relevance: [null, [Validators.nullValidator]],
      directInvolvement: [null, [Validators.nullValidator]],
      canDiscuss: [null, [Validators.nullValidator]],
      availability: [null, [Validators.nullValidator]],
      conversationStyle: [null, [Validators.nullValidator]],
      additionalComments: [null, [Validators.nullValidator]],
      rate: [null, [Validators.nullValidator]],
      CPrate: [null, [Validators.nullValidator]],
      minDuration: [null, [Validators.nullValidator]],
      CPminDuration: [null, [Validators.nullValidator]],
      currency: [null, [Validators.nullValidator]],
      CPcurrency: [null, [Validators.nullValidator]],
      minDurationType: [null, [Validators.nullValidator]],
      CPminDurationType: [null, [Validators.nullValidator]],
      rateType: [null, [Validators.nullValidator]],
      CPrateType: [null, [Validators.nullValidator]],
      CPmulFactor: [null, [Validators.nullValidator]],
      prorated: [null, [Validators.required]],
      CPprorated: [null, [Validators.nullValidator]],
       isnew: ['No', [Validators.nullValidator]],
    });

    this.patchTransferFormValue();
  }
  patchTransferFormValue() {
    this.transferExpertForm.patchValue({
      rate: this.transferLead.rate,
      currency: this.transferLead.currency,
      rateType: this.transferLead.rateType,
      minDuration: 30,
      minDurationType: 'Minutes',
      prorated: this.proratedValue,
      welcomeLines: this.transferLead?.welcomeLines,
      relevance: this.transferLead?.relevance,
      directInvolvement: this.transferLead?.directInvolvement,
      canDiscuss: this.transferLead?.canDiscuss,
      availability: this.transferLead?.availability,
      conversationStyle: this.transferLead?.conversationStyle,
      additionalComments: this.transferLead?.additionalComments,
      CPrate: this.projectClient?.costPerCredit,
      CPminDuration: this.projectClient?.minDuration,
      CPcurrency: this.projectClient?.currency,
      CPminDurationType: this.projectClient?.CPminDurationType,
      CPrateType: this.projectClient?.baseRateType,
      CPmulFactor: this.projectClient?.CPmulFactor,
      // prorated: this.transferLead?.prorated,
      CPprorated: 'Prorated',
      isnew:'CRM',
    });
  }
  private createExpertForm() {
    this.assignExpertForm = this.formBuilder.group({
      rate: [null, [Validators.required]],
      currency: [null, [Validators.required]],
      rateType: ['', [Validators.required]],
    });

    this.isLoading = false;
  }

  private syncAttatchedLeads() {
    return;
    debugger
    if (this.projectDetails?.leadAttached?.length) {
      Object.entries(this.projectDetails?.leadAttached).forEach(([prKey, prValue]) => {
        if (this.krExpertsList) {
          Object.entries(this.krExpertsList).forEach(([empKey, empValue]) => {
            if (empValue.id == prValue.id) {
              prValue.status = empValue.status;
              empValue = { ...empValue, ...prValue };
              this.projectDetails.leadAttached[prKey] = empValue;
             // this.projectDetails.leadAttached[prKey];
            }
          });
        }
      });
    }
  }

isnewv:string="CRM";

  changenew(event: any) {


    let val = event.target.value.trim();
    this.isnewv=val;



}

  private getResearchMgr(id: string) {
    this.isLoading = true;
    if (!id) {
      return;
    }

    this.employeeService.show(id).subscribe(
      (researchMgr: any) => {
        this.selectedExpert['krRelationshipMgr'] = researchMgr;
        this.isLoading = false;
      },
      (error: any) => {
        this.isLoading = false;
      }
    );
  }



  // Update patch data on server (Common function)
  private updateDataOnServer(proId: string, updateData: any, action: string) {
    this.projectService.updateOnly(proId, updateData).subscribe(
      (response) => {
        this.isLoading = false;

            this.toasterService.success(`Expert/Lead has been ${action}ed.`, 'Success!');
       /* let arrOfEMpIds = [];
        let expertToGTAMEmails = [];
        debugger;
        arrOfEMpIds.push(this.projectDetails?.keyAccMgrId);
        arrOfEMpIds = arrOfEMpIds.concat(this.projectDetails?.researchManagerId);
        let selectedEmailPeople = this.empList?.filter((e) => arrOfEMpIds.indexOf(e.userId) != -1);
        expertToGTAMEmails = selectedEmailPeople?.map((a) => a.email);

        this.emailVariableObj = {
          welCome: this.expertNew?.welcomeLines,
          relevanceDetails: this.expertNew?.relevance.replace(/<[^>]+>/g, ''),
          directInvolvementDetails: this.expertNew?.directInvolvement.replace(/<[^>]+>/g, ''),
          canDiscussDetails: this.expertNew?.canDiscuss,
          availibilityDetails: this.expertNew?.availability,
          conversationStyleDetails: this.expertNew?.conversationStyle,
          expertRate: this.expertNew?.rate,
          expertCurrency: this.expertNew?.currency,
          expertRatetype: this.expertNew?.rateType,
          expertminDuration: this.expertNew?.minDuration,
          expertmindurationType: this.expertNew?.minDurationType,
          additionalComments: this.expertNew?.additionalComments,
          projectName: this.projectDetails?.name,
          emailData: EmailTitleDescription.expertToGTAM,
        };


        this.emailVariableObj['Module'] = 'Projects' ;
        this.emailVariableObj['name'] = this.projectDetails?.name;
        this.emailVariableObj['Action'] = 'Project - Expert sent To GTAM ' ;
        this.emailVariableObj['Actiontype'] = 'Informative' ;
        this.emailVariableObj['link'] ='projects/'+this.projectDetails?.id;
       // emailVariableObj['description'] = '/clients/show/' + this.id;



        this.emailService.sendEmail(
          EmailJsTemplates.expertToGTAM,
          expertToGTAMEmails,
          'Informative',
          this.emailVariableObj
        );
        */
        this.getProjectDetail();
       // this.modalService.dismissAll();
      },
      (error) => {
        log.error(error);
        this.isLoading = false;
            this.toasterService.error(`Error in ${action}ing expert/lead.`, 'Error!');
      }
    );
  }





  // Update patch data on server (Common function)
  private updateOnServer(proId: string, updateData: any, action: string) {
    this.projectService.updateOnly(proId, updateData).subscribe(
      (response) => {
        this.isLoading = false;

            this.toasterService.success(`Expert/Lead has been ${action}ed.`, 'Success!');
        let arrOfEMpIds = [];
        let expertToGTAMEmails = [];
        debugger;
        arrOfEMpIds.push(this.projectDetails?.keyAccMgrId);
        arrOfEMpIds = arrOfEMpIds.concat(this.projectDetails?.researchManagerId);
        let selectedEmailPeople = this.empList?.filter((e) => arrOfEMpIds.indexOf(e.userId) != -1);
        expertToGTAMEmails = selectedEmailPeople?.map((a) => a.email);

        this.emailVariableObj = {
          welCome: this.expertNew?.welcomeLines,
          relevanceDetails: this.expertNew?.relevance.replace(/<[^>]+>/g, ''),
          directInvolvementDetails: this.expertNew?.directInvolvement.replace(/<[^>]+>/g, ''),
          canDiscussDetails: this.expertNew?.canDiscuss,
          availibilityDetails: this.expertNew?.availability,
          conversationStyleDetails: this.expertNew?.conversationStyle,
          expertRate: this.expertNew?.rate,
          expertCurrency: this.expertNew?.currency,
          expertRatetype: this.expertNew?.rateType,
          expertminDuration: this.expertNew?.minDuration,
          expertmindurationType: this.expertNew?.minDurationType,
          additionalComments: this.expertNew?.additionalComments,
          projectName: this.projectDetails?.name,
          emailData: EmailTitleDescription.expertToGTAM,
        };


        this.emailVariableObj['Module'] = 'Projects' ;
        this.emailVariableObj['name'] = this.projectDetails?.name;
        this.emailVariableObj['Action'] = 'Project - Expert sent To GTAM ' ;
        this.emailVariableObj['Actiontype'] = 'Informative' ;
        this.emailVariableObj['link'] ='projects/'+this.projectDetails?.id;
       // emailVariableObj['description'] = '/clients/show/' + this.id;



        this.emailService.sendEmail(
          EmailJsTemplates.expertToGTAM,
          expertToGTAMEmails,
          'Informative',
          this.emailVariableObj
        );
        this.getProjectDetail();
       // this.modalService.dismissAll();
      },
      (error) => {
        log.error(error);
        this.isLoading = false;
            this.toasterService.error(`Error in ${action}ing expert/lead.`, 'Error!');
      }
    );
  }

  // Delete/Remove lead from array's
  deleteLead(id: string, from: string) {
    // Check if exist
    let existingLead = _.findIndex(this.projectDetails[from], { id: id });

    // Delete from [from] array
    delete this.projectDetails[from][existingLead];

    // Remove empty/null objects
    this.projectDetails[from] = this.projectDetails[from].filter((item) => item);

    // Create arrays of object
    const updateData = {
      [from]: this.projectDetails[from],
    };

    // Update in db
    this.updateOnServer(this.id, { ...updateData }, 'delet');
  }


  // Open event form modal
  createNewEventForm(newEventFormModal: any, lead: any) {

    this.lead = lead;
   

    debugger
    this.eventSME = this.lead?.sme;
    this.expertName = this.krExpertsList?.find((x:any) => x.userId == this.lead.userId).userId;
    this.modalService.open(newEventFormModal, {
      backdrop: 'static',
      size: 'xl',
      centered: true,
      windowClass: 'modal-holder',
    });
    this.eventForm();
  }

  // Create / update events
  submitEvent() {
    let eventData = this.eventFormGrp.value;
    const momnt = moment();

    eventData.projectId = this.id;
   
    this.projectService.show(eventData.projectId).subscribe(
      (project: any) => {
        this.projectData = project;
        eventData.projectName=project.name;
        eventData.clientId = project.clientId;
        eventData.smeNum = this.eventSME;
        eventData.status = 'Upcoming';
        eventData.eventId =
          momnt.year() + '' + momnt.month() + '' + momnt.day() + '' + momnt.hour() + '' + momnt.second();
        eventData.eventAt = new Date(eventData.eventAt);

        eventData = _.pickBy(eventData, _.identity);
debugger

        this.eventService.create(eventData).subscribe(
          (response) => {
            log.debug('response: ', response);

            this.isLoading = false;

                this.toasterService.success('Event created successfully.', 'Success!');
            this.router.navigateByUrl('/projects/' + this.id + '#events');
            //email notification
            let arrOfEMpIds : any[]=[];
            let newEventEmail:any = [];
            arrOfEMpIds.push(eventData?.researchAnalystId);
            arrOfEMpIds.push(eventData?.researchMgrId);
            arrOfEMpIds.push(eventData?.keyAccountManager);
            let selectedEmailPeople = this.empList?.filter((e) => arrOfEMpIds.indexOf(e.userId) != -1);
            newEventEmail = selectedEmailPeople?.map((a) => a?.email);
            newEventEmail.push(this.empList?.find((x:any) => x.designation == 12)?.email);
            this.emailVariableObj = {
              eventId: eventData?.eventId,
              expertId: eventData?.expertId,
              eventLink: window.location.origin + '/events/event-details/' + response.id,
              smeCode: eventData?.smeNum,
              projectId: eventData?.projectId,
              emailData: EmailTitleDescription.NewEvent,
            };


            this.emailVariableObj['Module'] = 'Events' ;
            this.emailVariableObj['name'] = this.projectDetails?.name;
            this.emailVariableObj['Action'] = 'Project - Event created ' ;
            this.emailVariableObj['Actiontype'] = 'Informative' ;
            this.emailVariableObj['link'] ='/events/event-details/' + response.id,
           // emailVariableObj['description'] = '/clients/show/' + this.id;
    


            console.log('EmailData', emailVariableObj);
            this.emailService.sendEmail(
              EmailJsTemplates.NewEvent,
              newEventEmail,
              'Informative & System Prompt',
              this.emailVariableObj
            );
          },
          (error) => {
            log.error(error);
            log.debug('Not Created', eventData);
            this.error = error;
          }
        );
        let emailVariableObj = {
          notificationType: 'skipEmail',
          emailData: EmailTitleDescription.project,
        };
        this.emailService.sendEmail(EmailJsTemplates.project, this.emailToSend, 'Informative', emailVariableObj);
      },
      (error: any) => {}
    );

   // this.modalService.dismissAll();
  }
  getManagerId(id) {
    let mgr = this.empList?.find((a) => a.userId == id);
    if (mgr) {
      return mgr['repotingManagerId'];
    }

    return null;
  }
  // Event Form Builder
  eventForm() {
    this.eventFormGrp = this.formBuilder.group({
      eventId: [null, [Validators.required]],
      // smeNum: [null, [Validators.required]],
      expertId: [null, [Validators.required]],
      clientManagerId: [null, [Validators.required]],
      eventAt: [null, [Validators.required]],
      type: [null, [Validators.required]],
      status: [null, [Validators.nullValidator]],
      expertRateType: [null, [Validators.required]],
      CPRateType: [null, [Validators.required]],
      prorated: [null, [Validators.required]],
      CPprorated: [null, [Validators.required]],
      expertMinDuration: [null, [Validators.required]],
      expertRate: [null, [Validators.required]],
      expertCurrency: [null, [Validators.required]],
      rateForClient: [null, [Validators.required]],
      clientMinDuration: [null, [Validators.required]],
      clientCurrency: [null, [Validators.required]],
      multiplicationFactor: [null, [Validators.nullValidator]],
      notes: [null, [Validators.nullValidator]],
      rescheduleHistory: [null, [Validators.nullValidator]],
      cancelReason: [null, [Validators.nullValidator]],
      minDurationType: [null, [Validators.required]],
      CPminDurationType: [null, [Validators.required]],
      researchAnalystId: [null, [Validators.required]],
      researchMgrId: [null, [Validators.required]],
      subPnL: [null, [Validators.required]],
      keyAccountManager: [null, [Validators.required]],
   //   projectName: [null, [Validators.required]],
    });
    this.eventFormGrp.patchValue({
      expertId: this.lead?.userId,
      researchAnalystId: this.lead?.krRelationshipMgrId,
      researchMgrId: this.getManagerId(this.lead?.krRelationshipMgrId),
      expertRate: parseFloat(this.lead?.rate),
      rateForClient: parseFloat(this.lead?.CPrate),
      expertRateType: this.lead?.rateType,
      expertMinDuration: parseFloat(this.lead?.minDuration),
      expertCurrency: this.lead?.currency,
      clientMinDuration: parseInt(this.lead?.CPminDuration),
      clientCurrency: this.lead?.CPcurrency,
      multiplicationFactor: this.lead?.CPmulFactor,
      CPRateType: this.lead?.CPrateType,
      minDurationType: this.lead?.minDurationType,
      CPminDurationType: this.lead?.CPminDurationType,
      prorated: this.lead?.prorated?this.lead?.prorated:"Prorated",
      CPprorated: this.lead?.CPprorated?this.lead?.CPprorated:"Hourly",
   //   projectName: ,
     // "CPrateType" : "Hourly",
			//"prorated" : "Prorated",

    });
    this.eventFormGrp.patchValue({
      keyAccountManager: this.getManagerId(this.eventFormGrp.value.researchMgrId),
    });
    this.eventFormGrp.patchValue({
      subPnL: this.getManagerId(this.eventFormGrp.value.keyAccountManager),
    });

    this.currentSME = this.lead?.sme;
    this.isLoading = false;
  }

  openNewTab(url) {
    window.open(url, '_blank');
  }

  
  getEmployeeName(id) {
    if (id!=null && id!=undefined)
    {
    let emp = this.empList?.find((a) => a.userId == id);   
    if (emp) {
      this.attachedReportingMgr = emp.repotingManagerId;
      return emp['name'];
    }
  }
    return '';
  }


  sentclient(formmodal:any){
    this.modalService.open(formmodal,{size:'lg',centered:true, windowClass:"modal-holder"})
  }
  
  clientmeeting(formmodal:any,id:any){

    this.expertService.show(id).subscribe(
      (exp: any) => {
     
       // console.log(exp)

    let GTAM = this.projectDetails?.givenToAccMgr?.find((a) => a.id == id);

        this.mckmeetig_url=GTAM.mckmeetig_url

        console.log(this.mckmeetig_url )
       

        this.setexpertdata(GTAM)
    
          },
          (error: any) => {
            this.isLoading = false;
          }
        );

    this.modalService.open(formmodal,{size:'sm',centered:true, windowClass:"modal-holder"})
  }
  clientduration(formmodal:any,id:any){

    this.expertService.show(id).subscribe(
      (exp: any) => {
     
       // console.log(exp)

    let GTAM = this.projectDetails?.givenToAccMgr?.find((a) => a.id == id);

        this.mckduration=GTAM.mckduration
        //console.log(this.mckduration )
       

        this.setexpertdata(GTAM)
    
          },
          (error: any) => {
            this.isLoading = false;
          }
        );

    this.modalService.open(formmodal,{size:'sm',centered:true, windowClass:"modal-holder"})
  }
  clientInvoice(formmodal:any,id:any){

    this.expertService.show(id).subscribe(
      (exp: any) => {
     
       // console.log(exp)

    let GTAM = this.projectDetails?.givenToAccMgr?.find((a) => a.id == id);

        this.mckInvoice=GTAM.mckInvoice

        //console.log(this.mckInvoice )
       

        this.setexpertdata(GTAM)
    
          },
          (error: any) => {
            this.isLoading = false;
          }
        );

    this.modalService.open(formmodal,{size:'md',centered:true, windowClass:"modal-holder"})
  }

isSchedule=false;

  clientdatetime(formmodal:any,id:any,isschedule:boolean, wsid:any){

this.isSchedule=isschedule;


       // console.log(exp)

    let GTAM = id;

        this.mckclientdatetime=GTAM.mckclientdatetime

        this.selectedws=wsid;  //wsid:any)

        //console.log(this.mckInvoice )
       

        this.setexpertdata(GTAM)
    
        

        this.openedmodal=  this.modalService.open(formmodal,{size:'md',centered:true, windowClass:"modal-holder"})
  }

  isreshedule=false;
  reshedule(formmodal:any,id:any,isschedule:boolean, wsid:any){

    this.isSchedule=false;
    this.isreshedule=true;
    
    
           // console.log(exp)
    
        let GTAM = id;
    
            this.mckclientdatetime=GTAM.mckclientdatetime
    
            this.selectedws=wsid;  //wsid:any)
    
            //console.log(this.mckInvoice )
          
            this.setexpertdata(GTAM)
        
            
    
            this.openedmodal=  this.modalService.open(formmodal,{size:'md',centered:true, windowClass:"modal-holder"})
      }
    

  setexpertdataxx(data:any){
    this.id=data.id,
    this.userId=data.userId,
    this.firstName=data.firstName,
    this.lastName=data.lastName,
    this.contactNo=data.contactNo,
    this.primaryEmail=data.primaryEmail,
    this.phoneCode=data.phoneCode,
    this.currency=data.currency,
    this.rate=data.rate,
    this.biography=data.biography,

    this.companyName=this.workingDetails.companyName,
    this.companyType1=this.workingDetails1?.companyType,
    this.jobTitle1=this.workingDetails1?.jobTitle,
    this.startMonth1=this.workingDetails1?.startMonth,
    this.startYear1=this.workingDetails1?.startYear,
    this.endMonth1=this.workingDetails1?.endMonth,
    this.endYear1=this.workingDetails1?.endYear,

    this.companyName2=this.workingDetails2?.companyName,
    this.jobTitle2=this.workingDetails2?.jobTitle,
    this.startMonth2=this.workingDetails2?.startMonth,
    this.startYear2=this.workingDetails2?.startYear,
    this.endMonth2=this.workingDetails2?.endMonth,  
    this.endYear2=this.workingDetails2?.endYear,

    this.answer=this.screening_Questions?.answer,
   

    
    this.meeting_url=this.mckmeetig_url?.meeting_url,
    this.phone_numbers=this.mckmeetig_url?.phone_numbers,
    this.instructions=this.mckmeetig_url?.instructions

    this.status=this.mckduration?.status
    this.proposed_duration=this.mckduration?.proposed_duration
    this.actual_duration=this.mckduration?.actual_duration
    
    this.invoice_number=this.mckInvoice?.invoice_number
    this.supplier_name=this.mckInvoice?.supplier_name
    this.invoice_amount=this.mckInvoice?.invoice_amount
    this.pdf_link=this.mckInvoice?.pdf_link
    this.currency=this.mckInvoice?.currency

    this.Network_call_id=this.mckclientdatetime?.Network_call_id
    this.Network_expert_id=this.mckclientdatetime?.Network_expert_id
    this.Network_workstream_id=this.mckclientdatetime?.Network_workstream_id
    this.status=this.mckclientdatetime?.status
    this.Duration=this.mckclientdatetime?.Duration
    this.Scheduled_at=this.mckclientdatetime?.Scheduled_at

    this.Call_id=this.mckclientcallid?.Call_id
    this.id=this.mckclientcallid?.id
    this.File=this.mckclientcallid?.File
    this.Role=this.mckclientcallid?.Role
    this.start=this.mckclientcallid?.start
    this.End=this.mckclientcallid?.End

}


  clientcallid(formmodal:any,id:any,wsid:any){

   
       // console.log(exp)

    let GTAM = id;//this.projectDetails?.givenToClient?.find((a) => a.id == id);

        this.mckclientcallid=GTAM.mckclientcallid
        //console.log(this.mckInvoice )
        this.selectedws=wsid;  //wsid:any)

        this.setexpertdata(GTAM)
    
        

    this.modalService.open(formmodal,{size:'md',centered:true, windowClass:"modal-holder"})
  }
  
  mckinsey1sendbtn(){

    var mckinsey1={
      "meeting_url":this.meeting_url,
      "phone_numbers":this.phone_numbers,
      "instructions":this.instructions
    }
    console.log(mckinsey1)
  }

  mckinsey2sendbtn(){

    var mckinsey2={
      "status":this.status,
    "proposed_duration":this.proposed_duration,
    "actual_duration":this.actual_duration
    }
    console.log(mckinsey2)
  }

  mckinsey3sendbtn(){

      var mckinsey3={
        "invoice_number":this.invoice_number,
        "supplier_name":this.supplier_name,
        "invoice_amount":this.invoice_amount,
        "pdf_link":this.pdf_link,
        "currency":this.currency
    }
    console.log(mckinsey3)
  }


  delslot(timestampToDelete:any)
{

  
//alert(timestampToDelete)
  this.selectedslots= this.selectedslots.filter(slot => slot.timestamp !== timestampToDelete);



}


  async mckinseytimeslotsend(){
var scheduledat=0;


    
if (this.selectedws=="")
{
alert("Please select a workstream");
return
}


var netcallid= "";

 let GTC = this.projectDetails?.givenToClient?.find((a) => a.id == this.selectedExid);
 var convertedArray ={};

var stats="propose_availability";

if (this.isSchedule || this.isreshedule)
{
  //var dateString = '17-09-2013 10:08',
   // dateTimeParts = dateString.split(' '),
  

   if (this.Scheduled_at=="")
   {
   alert("Please select a schedule time");
   return
   }



 
 var  dateTimeParts = this.Scheduled_at.split('T');

 var timeParts = dateTimeParts[1].split(':');
   var dateParts = dateTimeParts[0].split('-');
   var  date;
date = new Date(parseInt(dateParts[0]), parseInt(dateParts[1], 10) - 1, parseInt(dateParts[2]), parseInt(timeParts[0]), parseInt(timeParts[1]),10);
console.log(date); //1379426880000
console.log(date.getTime()); //1379426880000

this.selectedslots=[date.getTime()]
scheduledat=date.getTime()/1000
stats="scheduled"



convertedArray = this.selectedslots.map(slot => {
  return {
    start: scheduledat,
    window: this.Duration
  };
});


}
else
{

  convertedArray = this.selectedslots.map(slot => {
    return {
      start: slot.timestamp,
      window: this.Duration
    };
  });

}





/*
{
  "network_call_id": "yaO9GdDUJq",
  "network_expert_id": "YPmfpNXWlN",
  "network_workstream_id": "6l8CLPxuRU",
  "status": "propose_availability",
  "availability": [
    {
      "start": 1650286787,
      "window": 60
    }
  ],
  "duration": 30,
  "scheduled_at": 1650286787,
  "rescheduled_for": "string"
}



*/



const meetingpharray = this.meetingph.split(',');

      var mckinsey4=     {
        "network_call_id":  this.currentcallid,
        "network_expert_id":  this.selectedExid ,
        "network_workstream_id": this.selectedws ,
        "status":stats,
        "availability": convertedArray,
        "duration": this.Duration,
        "scheduled_at": scheduledat,
        "rescheduled_for": this.isreshedule?this.currentcallid:"",
        "meeting_url": this.meetingurl,
        "phone_numbers": meetingpharray,
        "instructions": this.meetinginstructions
    }


      console.log(mckinsey4); 

      //console.log(this.selectedslots); 

      if ( this.isreshedule)
      {
      
        var url='https://middle.krsherpa.com/prod-mck/sendresheduleslot' ;     //sendresheduleslot
        //var url='http://localhost:3000/prod-mck/sendslot' ;  
        await fetch(url, {method: "POST",
        body: JSON.stringify(mckinsey4),
        headers: {
        
         "Content-Type": "application/json",
         "timeout": "2000000" 
        
        },
        
        }
        ).then(r => r.json()).then(result => {
          // Result now contains the response text, do what you want...
        console.log('id is:',result);
         },
         (error: any) => {
           this.isLoading = false;
         }
        );
  

      }
      else{

      var url='https://middle.krsherpa.com/prod-mck/sendslot' ;     //sendresheduleslot
      //var url='http://localhost:3000/prod-mck/sendslot' ;  
      await fetch(url, {method: "POST",
      body: JSON.stringify(mckinsey4),
      headers: {
      
       "Content-Type": "application/json",
       "timeout": "2000000" 
      
      },
      
      }
      ).then(r => r.json()).then(result => {
        // Result now contains the response text, do what you want...
      console.log('id is:',result);
       },
       (error: any) => {
         this.isLoading = false;
       }
      );


      }

      if (this.isSchedule || this.isreshedule)
      {
        this.toasterService.success(`Event schedule has been sent to client.`, 'Success!');
 
      }
      else{

      this.toasterService.success(`Expert availability has been sent to client.`, 'Success!');
     
    }
    
    this.isreshedule=false;
      this.openedmodal.close();
      

    
  }

  mckinsey5sendbtn(){

    var mckinsey5={

      "Call_id":this.currentcallid,
      "id":this.id,
      "File":this.File,
      "Role":this.Role,
      "start":this.start,
      "End":this.End
    }
    console.log(mckinsey5)
  }

//GTAM data st
async sendgtcEXdata(){
    
if (this.selectedws=="" || this.selectedws==null)
{
alert("Please select a workstream");
return
}

if (this.firstName=="")
{
alert("Please enter firstName");
return
}
else if (this.lastName=="")
{
alert("Please enter lastName");
return
}

if (this.currency=="")
{
alert("Please enter currency");
return
}

if (this.rate=="")
{
alert("Please enter a Hourly Rate");
return
}

if (this.biography=="")
{
alert("Please enter Biography");
return
}

if(this.primary <0)
{
  alert('please select a primary Experience')
}

const element = this.workingDetails[this.primary];
 console.log(element)
if (element.company=="" || element.position=="" || element.responsibilities=="" || element.geography=="" || element.start_month=="" || element.start_year=="" )
{
  alert("Please fill all details for primary employments");
  return
}

//  "nonus_government_employee": this.nonus_government_employee,
//"nonus_government_employee_geography": this.nonus_government_employee_geo,

if(this.nonus_government_employee && this.nonus_government_employee_geo=="")
  {
    alert('please select a geography for nonUS government employee ')
    return
  }

/*
    var GTAMDATA={

    "id":this.selectedExid,
    "userId":this.userId,
    "firstName":this.firstName,
    "lastName":this.lastName,
    "contactNo":this.contactNo,
    "primaryEmail":this.primaryEmail,
    "phoneCode":this.phoneCode,
    "currency":this.currency,
    "rate":this.rate,
    "biography":this.biography    

    }

*/
var works=[];

debugger

for (let index = 0; index < this.workingDetails.length; index++) {
  const element = this.workingDetails[index];
  



  works.push({
    "network_employment_id": (index+1).toString(),
    "company": element.company,
    "end_month": Number.isNaN(element.end_month)?0:parseInt(element.end_month),
    "end_year": Number.isNaN(element.end_year)?0:parseInt(element.end_year),
    "geography":  element.geography,
    "position":  element.position,
    "responsibilities":  element.responsibilities,
    "start_month":  Number.isNaN(element.start_month)?0:parseInt(element.start_month),
    "start_year":Number.isNaN(element.start_year)?0:parseInt(element.start_year),
    "primary": this.primary==index
    })

/*
    works.push({
      "network_employment_id": index.toString(),
      "company": element.companyName,
      "end_month": element.endMonth,
      "end_year": element.endYear,
      "geography":  " ",
      "position":  element.jobTitle,
      "responsibilities":  " ",
      "start_month": element.startMonth,
      "start_year": 0,// Number.isNaN(element.startYear)?0:parseInt(element.startYear),
      })
  */



    /*

  works.push({
    "network_employment_id": index.toString(),
    "company": element.companyName,
    "end_month": element.end_month ,   //Number.isNaN(element.endMonth)?0:parseInt(element.endMonth),
    "end_year":  element.end_year,// Number.isNaN(element.endYear)?0:parseInt(element.endYear),
    "geography":  element.geography,
    "position":  element.position,
    "responsibilities":  element.responsibilities,
    "start_month": element.start_month,// Number.isNaN(element.startMonth)?0:parseInt(element.startMonth),
    "start_year":element.start_year,// 0,// Number.isNaN(element.startYear)?0:parseInt(element.startYear),
    "primary": this.primary==index
    })

    */

}
debugger

//this.projectDetails["network_project_id"]
   var iwsid=this.workstreams.find(item=>(item.id==this.selectedws))

var reply ={
  "action": "create",
  "biography": this.biography ,
  "email": this.primaryEmail,
  "employments": works,  
  "first_name":this.firstName,
  "last_name": this.lastName,
  "phone": this.contactNo,
  "network_expert_id": this.selectedExid,
  "network_project_id": this.projectDetails?.id,
  "network_workstream_id": this.selectedws,
  "internal_workstream_id" : iwsid?.internalWSId,
  "hourly_rate":  Number.isNaN(this.rate)?0:parseInt(this.rate),// this.rate,    
  "currency": this.currency,
  "current_us_government_employee": this.usemp, //=="yes"?true:false,
  "geographical_rate_card": this.geography,
  "rate_multiplier": this.multipliertext?.multiplierValue ,  
  "frontline_us_government_employee": this.frontline_us_government_employee,
  "nonus_government_employee": this.nonus_government_employee,
  "nonus_government_employee_geography": this.nonus_government_employee_geo,
  "custom_recruit": this.custom_recruit,
  "screening_questions" : this.screenquestions
  }


console.log(reply)

 
//this.mckservice.sendExpertToMCK(reply)  //sendExpertToMCK

var url='https://middle.krsherpa.com/prod-mck/sendexpert' ;  
//var url='https://middle.krsherpa.com/prod-prod-mck/sendexpert' ;  
//var url='http://localhost:3000/prod-mck/sendexpert' ;  
await fetch(url, {method: "POST",
body: JSON.stringify(reply),
headers: {

 "Content-Type": "application/json",
 "timeout": "2000000" 

},

}
).then(r => r.json()).then(result => {
  // Result now contains the response text, do what you want...
console.log('id is:',result);
 },
 (error: any) => {
   this.isLoading = false;
 }
);



/*
    "companyName1":this.companyName1,
    "companyType1":this.companyType1,
    "jobTitle1":this.jobTitle1,
    "startMonth1":this.startMonth,
    "startYear1":this.startYear,
    "endMonth1":this.endMonth,
    "endYear1":this.endYear,

    "companyName2":this.companyName2,
this.toasterService.success(`Expert has been sent to client.`, 'Success!');
this.openedmodal.close();
    "jobTitle2":this.jobTitle2,
    "startMonth2":this.startMonth2,
    "startYear2":this.startYear2,
    "endMonth2":this.endMonth2,
    "endYear2":this.endYear2,
*/
    //alert(this.selectedws)
    //alert(this.primary)
    console.log( this.primary)


/*
{
"action": "create",
"biography": "tes bio",
"email": "",
"employments": [
{
"network_employment_id": "1",
"company": "test",
"end_month": 5,
"end_year": 2023,
"geography": "US",
"position": "CFO",
"responsibilities": "test res",
"start_month": 2,
"start_year": 2015,
"primary": true
}
],

"first_name": "SME1",
"last_name": "",
"phone": "",
"network_expert_id": "54v67a38b209590806c49169",
"network_project_id": "6488016357a1f36427bb31f5",
"network_workstream_id": "c9c7b2d0-3e10-4000-8000",
"internal_workstream_id" : "5ee8bf33-29b2-4289-850e-ac591037a252",
"hourly_rate": 1000,
"currency": "USD",
"current_us_government_employee": false,
"screening_questions" : [
{
"question" : "test q1",
"answer" : "test anser1"
},
{
"question" : "2nd q",
"answer" : "test anser2"
}
]   
}


*/

this.toasterService.success(`Expert has been sent to client.`, 'Success!');
this.openedmodal.close();
  
}



updatescreenquestions(index: number){
  
    const updatedAnswer = this.screening_Questions[index];
    this.screening_Questions[index].answers=updatedAnswer;
  console.log('screening_Questions',this.screening_Questions)


}

//GTAM data end 







}


function ngAfterViewChecked() {
  throw new Error('Function not implemented.');
}

