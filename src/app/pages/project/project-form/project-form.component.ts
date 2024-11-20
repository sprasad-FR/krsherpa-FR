import { filter } from 'rxjs/operators';
import { UserService } from '../../../core/services/kruser.service';
import { Component, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Logger } from '../../../core/logger.service';
// import { ToastrService } from 'ngx-toastr';
import {
  industry,
  industryGroup,
  projectTypes,
  sectors,
  subindustry,
  descriptionObj,
} from '../../../../../../shared-libs';
import { EmailJsTemplates, EmailTitleDescription } from '../../../core/models/options';
import { ClientsService } from '../../../core/services/clients.service';
import { projectStatus, engagementTypes } from '../overview/project.data';
import { ProjectService } from '../../../core/services/project.service';
import { Project } from '../models/project.model';
//import {  } from '../../../core/pipe';
import { EmailService } from '../../../core/services/email.service';
import { EmployeeService } from '../../../core/services/employee.service';
import { employeeUser } from '../models/employee.model';
import { Users } from '../../../core/models/default.model';
import { HttpClient } from '@angular/common/http'; 
import * as moment from 'moment';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2';
import { DateToLocalPipe, getCompanyTypePipe, GetInitialsPipe } from '../pipe';
//  DateToLocalPipe,getCompanyTypePipe,GetInitialsPipe 
import { ToastService } from '../../toast-service';

const log = new Logger('Project Form Component');

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
  providers: [DateToLocalPipe],
})
export class ProjectFormComponent implements OnInit {
  isLoading: boolean = false;
  projectFormGrp: FormGroup;
  error: any | undefined;
  ProjectNotesData: Project;
  notes: any[];
  descriptionField: string;
  keyAccMgrList: any;
  researchMgrList: any;
  researchAnalystList: any;
  projectStatus: any;
  engagementTypes: any;
  projectTypes: any;
  clientsList: any;
   clientsBillingList: any;
  employeesList: any;
  selectedResearchAnalyst: any[];
  pageTitle: string;
  btnName: string;
  id: string;
  projectData: Project;
  dueDate: string;
  startDate: string;
  EmailJsTemplates: object;
  index: number = 0;
  empList: employeeUser[];
  arrOfEMpIds: any[];
  emailToSend: string[];
  SnL: employeeUser;
  usersArray: Users[];
  sectors: any[];
  subindustry: any[];
  descriptionObj: any;
  industryGroup: any[];
  Industry: any[];
  industryGroupList: any[];
  industryList: any[];
  subIndustry: any[];
  today: string;
  public Editor = ClassicEditor;
  subIndustryList: any[];
  clientUsers: any[];
  screening_questions: any[];
  projectComments: any[];
  files: any = [];
  RMList: string;
  RAList: string;
  tempRA: any;
  rAList: any;
    rMGList: any;
  reportingMgrEmail: any;
  whoaim: any;
  currentUser: any;
  newComment: {};
  @Input() itemid: string='';
  @Input() readonly: boolean=true;
  isMcKinsey:boolean=false;

  subIndustrySummary: any;
  summary: string;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private toasterService: ToastService,
    private readonly projectService: ProjectService,
    private readonly clientService: ClientsService,
    private readonly employeeService: EmployeeService,
    private emailService: EmailService,
    private readonly userService: UserService,
    private http: HttpClient
  ) {
    this.whoaim = JSON.parse(localStorage.getItem('user'));
    this.empList = JSON.parse(window.localStorage.getItem('emp'));
  }

  ngOnInit(): void {
    this.pageTitle = 'CREATE PROJECT';
    this.btnName = 'Create';

  

    if ( this.itemid && this.itemid !='')
    {
    this.id =this.itemid//  this.route.snapshot.paramMap.get('id')!;
    }
    else{
     this.id = this.route.snapshot.paramMap.get('id');
    }
    this.createForm();
   
    this.fetchData();
    let reportingMgr = this.empList?.find((x) => x.userId == this.whoaim?.id);
    //get email id of reporting manager
    this.reportingMgrEmail = this.empList?.find((x) => x.repotingManagerId == reportingMgr?.repotingManagerId);
    this.currentUser = this.empList?.find((x) => x.userId == this.whoaim?.id);
    this.emailToSend = [];
    if (this.reportingMgrEmail?.email) {
      this.emailToSend.push(this.reportingMgrEmail?.email);
    }
    //get higher designation employees
    let employees = this.empList?.filter((x) => x.designation == 4 || x.designation == 7);
    for (let i = 0; i < employees.length; i++) {
      this.emailToSend.push(employees[i]?.email);
    }
  }
  private fetchData() {
    this.getUsers();
    //this.id = this.route.snapshot.paramMap.get('id');
    this.getClients();
    this.getResearchMgr();
    this.getResearchAnalyst();
    this.getKeyAccMgrs();

    this.projectTypes = projectTypes;
    this.projectStatus = projectStatus;
    this.engagementTypes = engagementTypes;
    this.sectors = sectors;
    this.industryGroup = industryGroup;
    this.Industry = industry;
    this.subindustry = subindustry;
    this.descriptionObj = descriptionObj;
    // this.selectedResearchAnalyst = this.researchAnalystList;
    let days = 0;

    let currentDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    let day = currentDate.getDate();
    let strDate = day < 10 ? '0' + day : day;
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    let strMonth = month < 10 ? '0' + month : month;
    this.today = year + '-' + strMonth + '-' + strDate;

   

  }

  submitData() {

    this.isLoading = true;
    const momnt = moment();
    const projectData = this.projectFormGrp.value;
    projectData.isComplianceVerified = false;
    this.index = this.index + 1;
    projectData['createdAt'] = new Date();
    projectData['projectId'] =
      momnt.year() + '' + momnt.month() + '' + momnt.day() + '' + momnt.hour() + '' + momnt.second();
    projectData['researchAnalyst'] = projectData.researchAnalyst;

if ( !projectData.additionalkeyAccMgrIds)
{
  projectData.additionalkeyAccMgrIds=[];
}
if ( !projectData.billingclientId)
{
projectData.billingclientId=projectData.clientId;
}

debugger

    if (projectData.firstTempNote) {
      projectData['notes'] = [
        {
          content: projectData.firstTempNote,
          createdAt: new Date(),
        },
      ];
    }

    projectData['krResearch'];
    projectData['status'] = +projectData.status;
    projectData['projectType'] = +projectData.projectType;
    projectData['engagementType'] = +projectData.engagementType;
    projectData['expectedNumEvent'] = +projectData.expectedNumEvent;

      projectData['screening_questions'] = this.screening_questions;
    // projectData['sector'] = +projectData.sector;
    // projectData['industry'] = +projectData.industry;
    // projectData['subIndustry'] = +projectData.subIndustry;
    projectData['startDate'] = projectData.startDate;
    delete projectData.firstTempNote;
    if (projectData.dueDate) {
      projectData['dueDate'] = projectData.dueDate;
    } else {
      delete projectData.dueDate;
    }

console.log('projectData',projectData)

    delete projectData.endDate;
    delete projectData.leadAttached;
    delete projectData.givenToAccMgr;
    delete projectData.givenToClient;
    delete projectData.image;

    log.warn(projectData);
    if (this.id) {
      this.projectService.updateOnly(this.id, projectData).subscribe(
        (response) => {
          log.debug('response: ', response);
          this.isLoading = false;
         // this.router.navigate(['/projectsall//']);
          this.toasterService.success('Project updated successfully.', 'Success!');
          let emailVariableObj = {
            notificationType: 'skipEmail',
            emailData: EmailTitleDescription.Projectupdate,
          };


          emailVariableObj['Module'] = 'Projects' ;
          emailVariableObj['name'] = this.projectData?.name ;
          emailVariableObj['Action'] = 'Project updated ' ;
          emailVariableObj['Actiontype'] = 'Informative' ;
          emailVariableObj['link'] ='projectsall/project/'+this.projectData?.id;
         // emailVariableObj['description'] = '/clients/show/' + this.id;
  
  

          this.emailService.sendEmail(
            EmailJsTemplates.ProjectUpdate,
            this.emailToSend,
            'Informative & approval',
            emailVariableObj
          );

          this.isLoading = false;
        },
        (error) => {
          log.error(error);
          log.debug('Not Updated', projectData);
          this.error = error;
          this.isLoading = false;
        }
      );
    } else {

if (  !projectData['notes'])
{
  projectData['notes']=[]
}

      this.projectService.create(projectData).subscribe(
        (response) => {
          log.debug('response: ', response);
          this.isLoading = false;
         // this.router.navigate(['/projects']);
          this.toasterService.success('Project created successfully.', 'Success!');
          let emailVariableObj = {
            notificationType: 'skipEmail',
            emailData: EmailTitleDescription.project,
          };


          emailVariableObj['Module'] = 'Projects' ;
          emailVariableObj['name'] = projectData?.name ;
          emailVariableObj['Action'] = 'Project created ' ;
          emailVariableObj['Actiontype'] = 'Informative' ;
          emailVariableObj['link'] ='projectsall/project/'+projectData?.id;
         // emailVariableObj['description'] = '/clients/show/' + this.id;
  


          this.emailService.sendEmail(
            EmailJsTemplates.project,
            this.emailToSend,
            'Informative & approval',
            emailVariableObj
          );
        },
        (error) => {
          log.error(error);
          log.debug('Not Created', projectData);
          this.error = error;
          this.isLoading = false;
        }
      );
    }
  }

  removeq(q: string) {
  
var itemToRemove = q;
var index = this.screening_questions.indexOf(itemToRemove);
if (index > -1) {
  this.screening_questions.splice(index, 1);
}

 }
newq:string="";

 addq() {
  //alert(this.newq)

if (this.screening_questions==null) this.screening_questions=[]


  var newItem = this.newq;
  this.screening_questions.push(newItem);
console.log(this.screening_questions)



  
   }
  

  getProjectById(id: string) {

    this.isLoading = true;
    const filters = new Map();
    const filter = {};
    filters.set('filter', JSON.stringify(filter));

    this.projectService.show(id,filters).subscribe(
      (project: any) => {
        this.projectData = project;
        this.arrOfEMpIds = [];
        // this.arrOfEMpIds.concat(this.projectData?.researchManagerId);
        this.arrOfEMpIds.push(this.projectData?.researchManagerId);
        this.arrOfEMpIds.push(this.projectData?.keyAccMgrId);
        let selectedEmailPeople = this.empList?.filter((e) => this.arrOfEMpIds.indexOf(e.userId) != -1);
        let receivers = selectedEmailPeople?.map((a) => a.email);
        // this.emailToSend = selectedEmailPeople?.map((a) => a.email);
        this.emailToSend.concat(receivers);
        this.notes = this.projectData?.notes;
        this.projectData.startDate = this.projectData?.startDate?.toLocaleString().split('T')[0];
        this.projectData.dueDate = this.projectData?.dueDate?.toLocaleString().split('T')[0];

      this.screening_questions=this.projectData?.screening_questions
   
            if (this.notes?.length) {
          this.notes = this.notes.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
        }

        this.projectFormGrp.patchValue(this.projectData);
        this.fetchClientUsers();
        // comment on 23Aug2023 this.getResearchAnalystsFromMgr();
        this.projectFormGrp.patchValue({
          researchManagerId: this.projectData?.researchManagerId,
        });
        this.isLoading=false;
        // this.getResearchAnalystsFromMgr();
        //// this.projectFormGrp.get('notes').patchValue(this.projectData['notes']);
      },
      (error: any) => { this.isLoading = true;}
    );
  }

  setDueDate(event) {
    this.startDate = event.target.value;
  }

  getResearchAnalystsFromMgr() {
    let rms = this.projectFormGrp.value.researchManagerId;
    if (rms) {
      let raList = this.rAList?.filter((x) => rms.indexOf(x.repotingManagerId) != -1);
      this.researchAnalystList = raList;
    }
  }

 getResearchAnalystMgrForthis() {
    let rms = this.projectFormGrp.value.researchAnalyst;
    if (rms) {
      let rmList = this.researchAnalystList?.filter((x) => rms.indexOf(x.id) != -1);
      this.rMGList = rmList;
    }
  }


  removeResearchAnalysts() {
    let rms = this.projectFormGrp.value.researchManagerId;
    if (rms) {
      let raList = this.rAList?.filter((x) => rms.indexOf(x.repotingManagerId) != -1);
      this.researchAnalystList = raList;
      this.projectFormGrp.get('researchAnalyst').patchValue(raList);
    }
  }



  fetchClientUsers() {
 this.clientUsers=[];
 this.clientsBillingList=[];
    let currentClientId = this.projectFormGrp.value.clientId;

    let currentClient = this.clientsList?.find((a) => a.id == currentClientId);
console.log('currentClient',currentClient);

    if (currentClient.parentid)
    {

    console.log('in loop'); 
    

 let currentClient1 = this.clientsList?.filter((a) =>( a.parentid == currentClient.parentid)||( a.id == currentClient.parentid));

console.log('in loop1',currentClient1); 

console.log('currentClient1.length',currentClient1.length);

if (currentClient1.length==undefined)
{
 this.clientUsers = currentClient.clientUser;
 this.clientsBillingList.push(currentClient);
}
else
{
     for (let index = 0; index < currentClient1.length; index++)  {
console.log('currentClient1',currentClient1[index]?.clientUser);
      //  this.eventInvoice.push(this.eventList[index]);
      this.clientUsers.push.apply(this.clientUsers,currentClient1[index]?.clientUser);
       
       // this.tempEventIds.push(this.eventList[index]?.id);

      }
}
this.clientsBillingList=currentClient1;

    }
    else
    {

    if (currentClient) {

console.log('in loop2',currentClient); 
          this.clientUsers = currentClient.clientUser;
         // this.clientsBillingList=currentClient;
          this.clientsBillingList.push(currentClient);
    }

    }


  }


  // Save description or notes
  storeDescrition() {
    if (this.descriptionField == null) {
      this.error = true;
      return;
    }
    if (!this.ProjectNotesData?.notes.length) {
      this.ProjectNotesData.notes = [];
    }
    this.isLoading = true;
    this.ProjectNotesData.notes.push({
      id: this.projectData.notes.length + 1,
      content: this.descriptionField,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.projectService.updateOnly(this.projectData.id, this.ProjectNotesData).subscribe(
      (response) => {
        this.descriptionField = null;
        this.projectData['notes'] = this.ProjectNotesData.notes;
        this.isLoading = false;
        this.toasterService.success('New note has been added.', 'Success!');
        this.getProjectById(this.id);
      },
      (error) => {
        log.error(error);
        this.isLoading = false;
        this.toasterService.error('Error in adding note.', 'Error!');
      }
    );
  }

  createForm() {
    this.projectFormGrp = this.formBuilder.group({
      projectId: [null, [Validators.required]],
      name: [null, [Validators.required]],
      researchAnalyst: [null, [Validators.required]],
      clientUsers: [null, [Validators.nullValidator]],
      projectType: [null, [Validators.nullValidator]],
      status: [null, [Validators.required]],
      engagementType: [null, [Validators.nullValidator]],
      additionalkeyAccMgrIds: [null],
      screeningQuestions : ['', [Validators.nullValidator]],
      screening_questions :[null, [Validators.nullValidator]],
      geographyFocus : ['', [Validators.nullValidator]],
      doNotContactCompanies : ['', [Validators.nullValidator]],

      startDate: [null, [Validators.nullValidator]],
      dueDate: [null, [Validators.nullValidator]],
      endDate: [null, [Validators.nullValidator]],
      expectedNumEvent: [null, [Validators.nullValidator]],
      sector: [null, [Validators.required]],
      industryGroup: [null, [Validators.required]],
      industry: [null, [Validators.required]],
      subIndustry: [null, [Validators.required]],
      notes: [null],
      clientId: [null, [Validators.required]],
      billingclientId: [null],
      keyAccMgrId: [null, Validators.required],
      researchManagerId: [null, [Validators.required]],
      leadAttached: [null, [Validators.nullValidator]],
      givenToAccMgr: [null, [Validators.nullValidator]],
      givenToClient: [null, [Validators.nullValidator]],
      image: [null, Validators.nullValidator],
      firstTempNote: [''],
    });

   // this.isLoading = false;
  }

  getUsers() {
    const filters = new Map();
    const filter = {
      where: {
        designation: 11,
      },
      
    };
    filters.set('filter', JSON.stringify(filter));

    this.userService.getUsers(filters).subscribe(
      (userArray: any) => {
        this.usersArray = userArray;
      },
      (error: any) => {}
    );
  }
  getUserName(id: string) {
    if (id != null && this.usersArray != undefined) {
      const user = this.usersArray?.find((x) => x.id === id);

      if (!user) {
        return 'Unknown User';
      } else {
        if (!user.firstName && !user.lastName) {
          return user?.username;
        } else if (!user.lastName) {
          return user.firstName;
        } else {
          return user?.firstName + ' ' + user?.lastName;
        }
      }
    } else {
      return '--';
    }
  }

  onSelect(event) {
    this.files.push(...event.addedFiles);

    const formData = new FormData();

    for (let i = 0; i < this.files.length; i++) {
      formData.append('file[]', this.files[i]);
    }

    this.http
      .post('http://localhost:3000/media/upload', formData)

      .subscribe((res) => {
        alert('Uploaded Successfully.');
      });
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  private getClients() {
    this.clientService.getAll().subscribe(
      (clients: any) => {
        this.clientsList = clients;
        this.clientsList?.forEach((element) => {
          element['clientId'] = element.id;
        });
        if (this.id) {
          this.pageTitle = 'UPDATE PROJECT';
          this.btnName = 'Update';
          this.getProjectById(this.id);
        }
      },
      (error: any) => {}
    );
  }

  getResearchAnalyst() {
    const filters = new Map();
    const filter = {
      where: {
        designation: 11,
      },
      fields: {
        id: true,
        name: true,
        designation: true,
        email: true,
        userId: true,
        repotingManagerId: true,
      },
    };
    filters.set('filter', JSON.stringify(filter));

    return this.employeeService.getAll(filters).subscribe(
      (employees: any) => {
        this.rAList = employees;
      },
      (error: any) => {}
    );
  }

  getResearchMgr() {
    const filters = new Map();
    const filter = {
      where: {
        designation: 10,
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

  researchMgrRemove() {
    return false;
  }
  researchMgrAdded() {}

  getKeyAccMgrs() {
    const filters = new Map();
    const filter = {
      where: {
        designation: 7,
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

    return this.employeeService.getAllEnabled(filters).subscribe(
      (employees: any) => {
        this.keyAccMgrList = employees;
      },
      (error: any) => {}
    );
  }

  onSelectSector(sector_id) {
    this.projectFormGrp.patchValue({ sector: sector_id.text });
    this.industryGroupList = this.industryGroup?.filter((a) => a.sectorId == sector_id.id);
  }

  onIndustryGroup(groupId) {
    this.projectFormGrp.patchValue({ industryGroup: groupId.text });
    this.industryList = this.Industry?.filter((a) => a.industryGroupId == groupId.id);
  }

  onSelectIndustry(industry_id) {
    this.projectFormGrp.patchValue({ insustry: industry_id.id });
    this.subIndustryList = this.subindustry?.filter((a) => a.industryId == industry_id.id);
  }
  onSelectSubindustry(subindustry) {
    this.summary = this.descriptionObj[subindustry.text];
  }
  cancelForm() {
    //this.router.navigate(['/projects']);
  }
}
