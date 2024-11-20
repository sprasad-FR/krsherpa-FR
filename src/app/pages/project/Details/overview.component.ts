import { Comments } from '../../../core/models/project.model';
import { Component, Input, Output, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { engagementTypes, projectStatus } from './project.data';
//import _ from 'lodash';
import { ProjectService } from '../../../core/services/project.service';
import { ActivatedRoute } from '@angular/router';
import { ClientsService } from '../../../core/services/clients.service';
import { industry, projectTypes, sectors, descriptionObj } from '../../../../../../shared-libs';
import { EmployeeService } from '../../../core/services/employee.service';
// import { ToastrService } from 'ngx-toastr';
import { Logger } from '../../../core/logger.service';
import Swal from 'sweetalert2';

import { EventService } from '../../../core/services/event.service';


import {  Event } from '../../../core/models/event.model';
import { Project } from '../models/project.model';
import { EmailService } from '../../../core/services/email.service';
import { SalesLeadCommentService } from '../../../core/services/sales-lead-comment.service';

import { UserService } from '../../../core/services/kruser.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { employeeUser } from '../models/employee.model';
import { SalesLeadComment } from '../../../core/models/salesLeadComment.model';
import { EmailJsTemplates } from '../../../core/models/options';
import { complianceActionsService } from '../../../core/services/complianceActions.service';
const log = new Logger('Overview Component');
import { DateToLocalPipe,getCompanyTypePipe,GetInitialsPipe } from '../pipe';

import { mckService } from '../../../core/services/mck.service';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  providers: [DateToLocalPipe,getCompanyTypePipe,GetInitialsPipe ],

})
export class OverviewComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  isLoading: boolean = false;
  error: any | undefined;
  projectDetails: any;
  projectClient: any;
  id: string;
  researchMgr: any;
  researchAnalysts: any = [];
  researchManagers: any = [];
  keyAccMgrList: any;
  statData: any;
  projectNote: any;
  complianceModalTitle: string;
  descriptionField: string = '';
  arrayNote: any;
  notes: any[];
  content: any[];
  showComplianceButton: boolean;
  eventList: Event[];
  ProjectDataForCompliance: Project;
  complianceComment: string;
  EmailJsTemplates: object;
  roles: any;
  public Editor = ClassicEditor;
  usersArray: any;
  allEmployee: employeeUser[];
  userData: any;
  notesAdded: boolean = false;
  rateOfLeadToGTCConv: number;
  empList: any;
  reportingMgrEmail: any;
  currentUser: any;
  emailToSend: any[];
  arrOfEMpIds: any[];
  newComment: any;
  commentsArray: any;



@Input() itemid: string='';
@Input() readonly: boolean=true;
  constructor(
    public readonly eventService: EventService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
   // private toasterService: ToastrService,
    private readonly projectService: ProjectService,
    private readonly clientService: ClientsService,
     private readonly MckService: mckService,
    private readonly employeeService: EmployeeService,
    private emailService: EmailService,
    private readonly userService: UserService,
    public complianceService: complianceActionsService
  ) {
    this.isLoading = true;
    this.userData = JSON.parse(window.localStorage.getItem('user'));
    this.roles = this.userData.roles[0];
    this.empList = JSON.parse(window.localStorage.getItem('emp'));
  }

  ngOnInit() {
  //  this.breadCrumbItems = [{ label: 'Dashboard', active: true }];
debugger
    this.id = this.itemid;//this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.fetchData();
    }
  /*
    this.isLoading = false;
    this.employeeService.getAllmin().subscribe(
      (res) => {
        this.empList=res
        this.allEmployee = res;
        this.getNamesFromIds();
      },
      (error: any) => {}
    );

 let reportingMgr = this.empList?.find((x:any) => x.userId == this.userData?.id);
    //get email id of reporting manager
    this.reportingMgrEmail = this.empList?.find((x:any) => x.reportingManagerId == reportingMgr?.reportingManagerId);
    this.currentUser = this.empList?.find((x:any) => x.userId == this.userData?.id);
   this.emailToSend = [];
   if (this.reportingMgrEmail?.email) {
     this.emailToSend.push(this.reportingMgrEmail?.email);
   }
*/

  }
  private fetchData() {
    this.getProjectDetail();
    this.getCompletedEvents();
    this.getUsers();
    this.getcomplianceDetails();
  }

  RefreshList() {
    this.refreshed = false;
    this.refreshed = true;
    this.fetchData();
  }

  testmck() {
  


    this.MckService.getlinks("{'status':'0'}").subscribe(
  (client: any) => {
    //  this.isLoading = false;
   
    console.log('mck Details', client);
  
  },
  (error: any) => {

    console.log(error);
  }
);


  }
  
  compliancealldata: any;

  getcomplianceDetails() {
    const filters = new Map();

    const filter = {
      where: {
        and: [
          {
            compliancetype: 'project',
          },
        ],
      },
    };

    filters.set('filter', JSON.stringify(filter));
    this.complianceService.getAll(filters).subscribe(
      (client: any) => {
        //  this.isLoading = false;
        this.compliancealldata = client;
        console.log('compliancealldata Details', this.compliancealldata);
        var userData = JSON.parse(window.localStorage.getItem('user'));
      },
      (error: any) => {

        console.log(error);
      }
    );
  }

  refreshed: boolean;
  idforCompliance: string;

  // Open client user form modal
  createClientUser(clientUserFormModal: any, saleid: any) {
    this.idforCompliance = saleid;

    this.modalService.open(clientUserFormModal, { size: 'lg', windowClass: 'modal-holder' });
  }

  private getProjectDetail() {


    const filters = new Map();
    const filter = {
      where: {
        designation: 11,
      },
      
    };
    filters.set('filter', JSON.stringify(filter));

    this.projectService.show(this.id,filters).subscribe(
      (project: any) => {
        this.projectDetails = project;
        this.projectDetails['subIndustryDesc'] = descriptionObj[project.subIndustry];
        this.complianceComment = project.complianceComment;
        if (this.projectDetails.givenToClient != undefined || this.projectDetails.leadAttached != undefined) {
          this.rateOfLeadToGTCConv = Math.floor(
            (this.projectDetails.givenToClient?.length / this.projectDetails.leadAttached?.length) * 100
          );
        } else {
          this.rateOfLeadToGTCConv = 0;
        }

        this.arrOfEMpIds = [];
        this.arrOfEMpIds.concat(this.projectDetails?.researchManagerId);
        this.arrOfEMpIds.push(this.projectDetails?.keyAccMgrId);
        let selectedEmailPeople = this.empList?.filter((e) => this.arrOfEMpIds.indexOf(e.id) != -1);
        this.emailToSend = selectedEmailPeople?.map((a) => a.email);

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
        this.getClient(this.projectDetails.clientId);

        this.statData = [
          {
            icon: 'bx bx-copy-alt',
            title: 'Profile Attached',
            value: project?.leadAttached ? project.leadAttached?.length : 0,
            description: 'My Contribution is 2',
          },
          {
            icon: 'bx bx-purchase-tag-alt',
            title: 'GTAM',
            value: project?.givenToAccMgr ? project.givenToAccMgr?.length : 0,
            description: 'My Contribution is 2',
          },
          {
            icon: 'bx bx-purchase-tag-alt',
            title: 'GTC',
            value: project?.givenToClient ? project.givenToClient?.length : 0,
            description: 'My Contribution is 0',
          },
          {
            icon: 'bx bx-purchase-tag-alt',
            title: 'Expected Events',
            value: project?.expectedNumEvent ? project.expectedNumEvent : 0,
            description: 'Scheduled by me is 1',
          },
          {
            icon: 'bx bx-purchase-tag-alt',
            title: 'Events Completed',
            value: this.eventList?.length ? this.eventList?.length : 0,
            description: 'Scheduled by me is 1',
          },
        ];
        this.getNamesFromIds();
      },
      (error: any) => {}
    );
  }


  getNamesFromIds() {
    this.getResearchAnalysts(this.projectDetails?.researchAnalyst);
    this.getResearchManagers(this.projectDetails?.researchManagerId);

    this.getKeyAccMgr(this.projectDetails?.keyAccMgrId);
  }
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

  private getClient(id: string) {
    this.clientService.show(id).subscribe(
      (client: any) => {
        this.projectClient = client;
        this.projectClient.clientUser = this.projectClient?.clientUser?.filter(
          (a) => this.projectDetails.clientUsers.indexOf(a.userId) != -1
        );
      },
      (error: any) => {}
    );
  }

  private async getResearchMgr(id: string) {
    if (!id) {
      return;
    }
    this.researchMgr = await this.allEmployee.find((a) => a.userId == id);
  }
  private getResearchAnalysts(ids: string[]) {
    if (!ids || this.notesAdded == true) {
      return;
    }
    if (this.allEmployee?.length) {
      ids.forEach((id) => {
        this.researchAnalysts.push(this.allEmployee.find((a) => a.userId == id));
      });
    }
  }
  private getResearchManagers(ids: string[]) {
    if (!ids || this.notesAdded == true) {
      return;
    } else {
      if (this.allEmployee?.length) {
        ids.forEach((id) => {
          this.researchManagers.push(this.allEmployee.find((a) => a.userId == id));
        });
      }
    }
  }

  createComment(commentDescription) {
    if (!commentDescription.value) {
      return false;
    }
    this.newComment = {};
    this.newComment.userId = this.userData.id;
    this.newComment.description = commentDescription.value;

    if (!this.commentsArray) {
      this.commentsArray = {};
    }
    if (!this.commentsArray.comments) {
      this.commentsArray.comments = [];
    }
    if (!this.projectDetails?.comments) {
      this.projectDetails.comments = [];
    }
    this.projectDetails.comments;
    this.commentsArray = {
      comments: this.projectDetails.comments,
    };

    this.commentsArray.comments.push(this.newComment);
    this.projectService.updateOnly(this.id, this.commentsArray).subscribe(
      (data) => {
        commentDescription.value = null;
        this.isLoading = false;
      },
      (error: string) => {
        log.error('comments:', error);
        this.isLoading = false;
      }
    );
    return true;
  }

  deleteComment(commentId) {
    // const swalWithBootstrapButtons = Swal.mixin({
    //   customClass: {
    //     confirmButton: 'btn btn-success',
    //     cancelButton: 'btn btn-danger ml-2',
    //   },
    //   buttonsStyling: false,
    // });
    // swalWithBootstrapButtons
    //   .fire({
    //     title: 'Are you sure?',
    //     text: 'Delete the comment',
    //     icon: 'warning',
    //     confirmButtonText: 'Delete',
    //     cancelButtonText: 'Cancel',
    //     showCancelButton: true,
    //   })
    //   .then((result) => {
    //     if (result.value) {
    //       this.salesLeadCommentService.delete(commentId).subscribe(
    //         (data) => {
    //           this.getSalesLeadComments();
    //         },
    //         (error: string) => {
    //           log.error('comments:', error);
    //         }
    //       );
    //     }
    //   });
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
      const user = this.usersArray.find((x:any) => x.id === id);

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

  private getKeyAccMgr(id: string) {
    if (!id) {
      return;
    }
    if (this.allEmployee?.length) {
      this.keyAccMgrList = this.allEmployee.find((a) => a.userId == id);
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
  storeDescrition() {
    if (this.descriptionField == null || this.descriptionField == '' || this.descriptionField == undefined) {
      this.error = true;
      return;
    }
    if (!this.projectNote) {
      this.projectNote = {};
    }
    if (!this.projectNote?.notes?.length) {
      this.projectNote.notes = [];
    }
    this.isLoading = true;
    if (!this.projectDetails?.notes) {
      this.projectDetails.notes = [];
    }
    this.projectDetails.notes;
    this.projectNote = {
      notes: this.projectDetails.notes,
    };

    this.projectNote.notes.push({
      id: this.projectDetails.notes?.length + 1,
      content: this.descriptionField,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.projectService.updateOnly(this.projectDetails.id, this.projectNote).subscribe(
      (response) => {
        this.descriptionField = null;
        this.projectDetails['notes'] = this.projectNote.notes;
        this.notesAdded = true;
        this.isLoading = false;
        //gs    this.toasterService.success('New angle has been added.', 'Success!');
        // email notification
        let emailVariableObj = {
          notificationType: 'skipEmail',
        };
        this.emailService.sendEmail(EmailJsTemplates.project, this.emailToSend, 'Informative', emailVariableObj);
        this.getProjectDetail();
      },
      (error) => {
        log.error(error);
        // this.error = error;
        this.isLoading = false;
        //gs    this.toasterService.error('Error in adding note.', 'Error!');
      }
    );
    this.modalService.dismissAll();
  }

  ComplienceConfirmation(complianceModal: any) {
    this.complianceModalTitle = 'Add Comment';
    this.modalService.open(complianceModal, { centered: true, windowClass: 'modal-holder' });
  }

  markCompliance(val) {
    this.projectService.show(this.id).subscribe(
      (res) => {
        //this.ProjectDataForCompliance = res;
        if (!this.ProjectDataForCompliance) {
          this.ProjectDataForCompliance = {};
        }

        this.ProjectDataForCompliance.isComplianceVerified = val == 'verify';
        this.ProjectDataForCompliance.complianceComment = this.complianceComment;

        this.projectService.updateOnly(this.id, this.ProjectDataForCompliance).subscribe(
          (res) => {
            log.debug('response: ', res);
            this.isLoading = false;
            //this.getProjectDetail();
          },
          (error) => {
            log.error(error);
            log.debug('Not Updated', this.ProjectDataForCompliance);
            this.error = error;
            this.isLoading = false;
          }
        );
      },
      (error: any) => {
        this.isLoading = false;
      }
    );
    this.modalService.dismissAll();
  }
}
