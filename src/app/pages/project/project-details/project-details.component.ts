import { Component, Input, Output, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
const log = new Logger('Overview Component');
import { Logger } from '../../../core/logger.service';
import { EventService } from '../../../core/services/event.service';
import { SalesLeadCommentService } from '../../../core/services/sales-lead-comment.service';
import { UserService } from '../../../core/services/kruser.service';
import { Event as Events } from '../../../core/models/event.model';
import { EmailJsTemplates } from '../../../core/models/options';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
// import { ToastrService } from 'ngx-toastr';
import { projectTypes } from '../../../../../../shared-libs';
import { employeeUser } from '../models/employee.model';
import { projectStatus, engagementTypes } from '../overview/project.data';
import { ClientsService } from '../../../core/services/clients.service';
import { EmailService } from '../../../core/services/email.service';
import { EmployeeService } from '../../../core/services/employee.service';
import { ProjectService } from '../../../core/services/project.service';
import { DateToLocalPipe,getCompanyTypePipe,GetInitialsPipe } from '../pipe';





@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
  providers: [DateToLocalPipe,getCompanyTypePipe,GetInitialsPipe ],

})
export class ProjectDetailsComponent implements OnInit {
  userData: any;
  isLoading: boolean;
  roles: any;
  empList: any;
  id: string;
  reportingMgrEmail: any;
  currentUser: any;
  emailToSend: any[];
  allEmployee: employeeUser[];
  breadCrumbItems: { label: string; active: boolean }[];
  projectDetails: any;
  showComplianceButton: boolean;
  notes: any;
  notesAdded: boolean;
  researchAnalysts: any;
  eventList: Events[];
  keyAccMgrList: employeeUser;

  isMcKinsey:boolean=false;

@Input() itemid: string='';
@Input() readonly: boolean=true;

  constructor(
    public readonly eventService: EventService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    // private toasterService: ToastrService,
    private readonly projectService: ProjectService,
    private readonly clientService: ClientsService,
    private readonly employeeService: EmployeeService,
    private emailService: EmailService,
    private readonly userService: UserService
  ) {
    this.isLoading = true;
    this.userData = JSON.parse(window.localStorage.getItem('user'));
    this.roles = this.userData.roles[0];
    this.empList = JSON.parse(window.localStorage.getItem('emp'));
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Dashboard', active: true }];

    this.id = this.itemid;// '6258ff6976264b02817eb0a5';// this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.fetchData();
    }
    let reportingMgr = this.empList?.find((x:any) => x.userId == this.userData?.id);
    //get email id of reporting manager
    this.reportingMgrEmail = this.empList?.find((x:any) => x.reportingManagerId == reportingMgr?.reportingManagerId);
    this.currentUser = this.empList?.find((x:any) => x.userId == this.userData?.id);
    this.emailToSend = [];
    if (this.reportingMgrEmail?.email) {
      this.emailToSend.push(this.reportingMgrEmail?.email);
    }
    this.isLoading = false;
    // this.employeeService.getAll().subscribe(
    //   (res) => {
    //     this.allEmployee = res;
    //     // this.getNamesFromIds();
    //   },
    //   (error: any) => {}
    // );
  }
  private fetchData() {
    this.getProjectDetail();
    this.getCompletedEvents();
    // this.getUsers();
  }

  idforCompliance: string;

  // Open client user form modal
  createClientUser(clientUserFormModal: any, saleid: any) {
    this.idforCompliance = saleid;

    this.modalService.open(clientUserFormModal, { size: 'lg', windowClass: 'modal-holder' });
  }
  private getProjectDetail() {
    this.projectService.show(this.id).subscribe(
      (project: any) => {
        this.projectDetails = project;
        this.getKeyAccMgr(this.projectDetails?.keyAccMgrId);
        // if (this.givenToClient != undefined || this.projectDetails.leadAttached != undefined) {
        //   this.rateOfLeadprojectDetailsToGTCConv = Math.floor(
        //     (this.projectDetails.givenToClient.length / this.projectDetails.leadAttached.length) * 100
        //   );
        // } else {
        //   this.rateOfLeadToGTCConv = 0;
        // }

        // this.arrOfEMpIds = [];
        // this.arrOfEMpIds.concat(this.projectDetails?.researchManagerId);
        // this.arrOfEMpIds.push(this.projectDetails?.keyAccMgrId);
        // let selectedEmailPeople = this.empList?.filter((e) => this.arrOfEMpIds.indexOf(e.id) != -1);
        // this.emailToSend = selectedEmailPeople?.map((a) => a.email);

        if (this.userData.roles.indexOf('compliance') != -1 && this.projectDetails.isComplianceVerified == false) {
          // if (userData.roles.indexOf('compliance') != -1) {
          this.showComplianceButton = true;
        } else {
          this.showComplianceButton = false;
        }

        this.notes = this.projectDetails.notes;
        if (this.notes?.length) {
          this.notes = this.notes.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
        }
        this.bindData();
        // this.getClient(this.projectDetails.clientId);

        // this.statData = [
        //   {
        //     icon: 'bx bx-copy-alt',
        //     title: 'Lead Attached',
        //     value: project?.leadAttached ? project.leadAttached.length : 0,
        //     description: 'My Contribution is 2',
        //   },
        //   {
        //     icon: 'bx bx-archive-in',
        //     title: 'Experts Attached',
        //     value: project?.leadAttached ? project.leadAttached.length : 0,
        //     description: 'My Contribution is 3',
        //   },
        //   {
        //     icon: 'bx bx-purchase-tag-alt',
        //     title: 'GTAM',
        //     value: project?.givenToAccMgr ? project.givenToAccMgr.length : 0,
        //     description: 'My Contribution is 2',
        //   },
        //   {
        //     icon: 'bx bx-purchase-tag-alt',
        //     title: 'GTC',
        //     value: project?.givenToClient ? project.givenToClient.length : 0,
        //     description: 'My Contribution is 0',
        //   },
        //   {
        //     icon: 'bx bx-purchase-tag-alt',
        //     title: 'Expected Events',
        //     value: project?.expectedNumEvent ? project.expectedNumEvent : 0,
        //     description: 'Scheduled by me is 1',
        //   },
        //   {
        //     icon: 'bx bx-purchase-tag-alt',
        //     title: 'Events Completed',
        //     value: this.eventList?.length ? this.eventList?.length : 0,
        //     description: 'Scheduled by me is 1',
        //   },
        // ];
        // this.getNamesFromIds();
      },
      (error: any) => {}
    );
  }
  // getNamesFromIds() {
  //   this.getResearchAnalysts(this.projectDetails?.researchAnalyst);
  //   this.getResearchManagers(this.projectDetails?.researchManagerId);

  //   this.getKeyAccMgr(this.projectDetails?.keyAccMgrId);
  // }
  private getCompletedEvents() {
    const filters = new Map();
    const filter = {
      where: {
        and: [{ projectId: this.id }, { status: 'Completed' }],
      },
    };
    filters.set('filter', JSON.stringify(filter));
    this.eventService.getAll(filters).subscribe(
      (response) => {
        this.eventList = response;
      },
      (error: any) => {}
    );
  }

  // private getClient(id: string) {
  //   this.clientService.show(id).subscribe(
  //     (client: any) => {
  //       this.projectClient = client;
  //       this.projectClient.clientUser = this.projectClient.clientUser.filter(
  //         (a) => this.projectDetails.clientUsers.indexOf(a.userId) != -1
  //       );
  //     },
  //     (error: any) => {}
  //   );
  // }

  // private async getResearchMgr(id: string) {
  //   if (!id) {
  //     return;
  //   }
  //   this.researchMgr = await this.allEmployee.find((a) => a.userId == id);
  // }
  // private getResearchAnalysts(ids: string[]) {
  //   if (!ids || this.notesAdded == true) {
  //     return;
  //   }
  //   if (this.allEmployee?.length) {
  //     ids.forEach((id) => {
  //       this.researchAnalysts.push(this.allEmployee.find((a) => a.userId == id));
  //     });
  //   }
  // }
  // private getResearchManagers(ids: string[]) {
  //   if (!ids || this.notesAdded == true) {
  //     return;
  //   } else {
  //     if (this.allEmployee?.length) {
  //       ids.forEach((id) => {
  //         this.researchManagers.push(this.allEmployee.find((a) => a.userId == id));
  //       });
  //     }
  //   }
  // }

  // createComment(commentDescription) {
  //   if (!commentDescription.value) {
  //     return false;
  //   }
  //   this.newComment = {};
  //   this.newComment.userId = this.userData.id;
  //   this.newComment.description = commentDescription.value;

  //   if (!this.commentsArray) {
  //     this.commentsArray = {};
  //   }
  //   if (!this.commentsArray.comments) {
  //     this.commentsArray.comments = [];
  //   }
  //   if (!this.projectDetails?.comments) {
  //     this.projectDetails.comments = [];
  //   }
  //   this.projectDetails.comments;
  //   this.commentsArray = {
  //     comments: this.projectDetails.comments,
  //   };

  //   this.commentsArray.comments.push(this.newComment);
  //   this.projectService.updateOnly(this.id, this.commentsArray).subscribe(
  //     (data) => {
  //       commentDescription.value = null;
  //       this.isLoading = false;
  //     },
  //     (error: string) => {
  //       log.error('comments:', error);
  //       this.isLoading = false;
  //     }
  //   );
  // }

  // getUsers() {
  //   this.userService.getUsers().subscribe(
  //     (userArray: any) => {
  //       this.usersArray = userArray;
  //     },
  //     (error: any) => {}
  //   );
  // }
  // getUserName(id: string) {
  //   if (id != null && this.usersArray != undefined) {
  //     const user = this.usersArray.find((x) => x.id === id);

  //     if (!user) {
  //       return 'Unknown User';
  //     } else {
  //       if (!user.firstName && !user.lastName) {
  //         return user?.username;
  //       } else if (!user.lastName) {
  //         return user.firstName;
  //       } else {
  //         return user?.firstName + ' ' + user?.lastName;
  //       }
  //     }
  //   } else {
  //     return '--';
  //   }
  // }

  private getKeyAccMgr(id: string) {
    if (!id) {
      return;
    } else {
      this.keyAccMgrList = this.empList.find((a) => a.userId == id);
    }
  }

  private bindData() {
    this.projectDetails['status'] = _.find(projectStatus, { id: this.projectDetails.status });

    this.projectDetails['projectType'] = _.find(projectTypes, { id: this.projectDetails.projectType });

    this.projectDetails['engagementType'] = _.find(engagementTypes, { id: this.projectDetails.engagementType });
    // this.projectDetails['sector'] = _.find(sectors, { id: this.projectDetails.sector });
    // this.projectDetails['industry'] = _.find(industry, { id: this.projectDetails.industry });

    // this.projectDetails['subIndustry'] = _.find(industry, { id: this.projectDetails.subIndustry });
  }

  /**
   * Open new angle form modal
   * @param newAngleFormDataModal center modal data
   */
  newAngleModal(newAngleFormDataModal: any) {
    this.modalService.open(newAngleFormDataModal, { size: 'lg', centered: true, windowClass: 'modal-holder' });
  }

  // Save description or notes
  // storeDescrition() {
  //   if (this.descriptionField == null || this.descriptionField == '' || this.descriptionField == undefined) {
  //     this.error = true;
  //     return;
  //   }
  //   if (!this.projectNote) {
  //     this.projectNote = {};
  //   }
  //   if (!this.projectNote?.notes?.length) {
  //     this.projectNote.notes = [];
  //   }
  //   this.isLoading = true;
  //   if (!this.projectDetails?.notes) {
  //     this.projectDetails.notes = [];
  //   }
  //   this.projectDetails.notes;
  //   this.projectNote = {
  //     notes: this.projectDetails.notes,
  //   };

  //   this.projectNote.notes.push({
  //     id: this.projectDetails.notes.length + 1,
  //     content: this.descriptionField,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   });

  //   this.projectService.updateOnly(this.projectDetails.id, this.projectNote).subscribe(
  //     (response) => {
  //       this.descriptionField = null;
  //       this.projectDetails['notes'] = this.projectNote.notes;
  //       this.notesAdded = true;
  //       this.isLoading = false;
  //       this.toasterService.success('New angle has been added.', 'Success!');
  //       // email notification
  //       let emailVariableObj = {};
  //       this.emailService.sendEmail(EmailJsTemplates.project, this.emailToSend, 'Informative', emailVariableObj);
  //       this.getProjectDetail();
  //     },
  //     (error) => {
  //       log.error(error);
  //       // this.error = error;
  //       this.isLoading = false;
  //       this.toasterService.error('Error in adding note.', 'Error!');
  //     }
  //   );
  //   this.modalService.dismissAll();
  // }

  // ComplienceConfirmation(complianceModal: any) {
  //   this.complianceModalTitle = 'Add Comment';
  //   this.modalService.open(complianceModal, { centered: true, windowClass: 'modal-holder' });
  // }

  // markCompliance(val) {
  //   this.projectService.show(this.id).subscribe(
  //     (res) => {
  //       this.ProjectDataForCompliance = res;
  //       if (val == 'verify') {
  //         this.ProjectDataForCompliance.isComplianceVerified = true;
  //       } else {
  //         this.ProjectDataForCompliance.isComplianceVerified = this.ProjectDataForCompliance?.isComplianceVerified;
  //       }
  //       this.ProjectDataForCompliance.complianceComment = this.complianceComment;
  //       this.ProjectDataForCompliance.startDate = this.ProjectDataForCompliance?.startDate
  //         .toLocaleString()
  //         .split('T')[0];
  //       this.ProjectDataForCompliance.dueDate = this.ProjectDataForCompliance?.dueDate.toLocaleString().split('T')[0];

  //       this.projectService.update(this.id, this.ProjectDataForCompliance).subscribe(
  //         (res) => {
  //           log.debug('response: ', res);
  //           this.isLoading = false;
  //           this.getProjectDetail();
  //         },
  //         (error) => {
  //           log.error(error);
  //           log.debug('Not Updated', this.ProjectDataForCompliance);
  //           this.error = error;
  //           this.isLoading = false;
  //         }
  //       );
  //     },
  //     (error: any) => {
  //       this.isLoading = false;
  //     }
  //   );
  //   this.modalService.dismissAll();
  // }
}
