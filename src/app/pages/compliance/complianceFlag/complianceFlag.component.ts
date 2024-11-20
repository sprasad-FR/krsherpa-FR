import { EmailJsTemplates, EmailTitleDescription } from '../../../core/models/options';
import { Component, Input, Output, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Logger } from '../../../core/logger.service';
import { complianceActionsService } from '../../../core/services/complianceActions.service';
import { UserService } from '../../../core/services/kruser.service';
import { EmployeeService } from '../../../core/services/employee.service';
import { complianceActions } from '../../../core/models/complianceActions.model';
import { NgbModal, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
//import { ToastrService } from 'ngx-toastr';
import { EmailService } from '../../../core/services/email.service';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
//import { Pipe, MathcesCom } from '@angular/core';
import { EventEmitter } from '@angular/core';

const log = new Logger('Client User Component');

@Component({
  selector: 'app-complianceFlag',
  templateUrl: './complianceFlag.component.html',
  styleUrls: ['./complianceFlag.component.scss'],
})
export class complianceFlagComponent implements OnInit {
  error: boolean;
  cuEmail: any;
  emailMatch: string;
  validEmailString: string;
  validNumberString: string;

  constructor(
    private complianceService: complianceActionsService,
    private modalService: NgbModal,
    private employeeService: EmployeeService,
   // private readonly toasterService: ToastrService,
    private route: ActivatedRoute,
    private userService: UserService,
    private emailService: EmailService
  ) {
    this.whoaim = JSON.parse(localStorage.getItem('user'));
    this.roles = this.whoaim?.roles[0];
  }

  compliancealldata: complianceActions[];
  id: string;
  userId: string;
  salesLeadId: string;
  projectId: string;
  status: string;
  actions: Array<object>;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  cid: string;
  change: boolean;
  selecteditemId: any;
  compliancedata: any;
  comment: string;
  modalBtn: string;
  btnDisable: boolean = false;
  editClientAsUser: any;
  isCompliance: boolean;
  whoaim: any;
  roles: string;
  isLoading: boolean = false;
  emailToSend: any[];
  Curdiv: any;
  currole: string;
  statuscomment: string;
  Raised: boolean = true;
  verified: string;
  Resolved: boolean = false;
  Approved: boolean = false;
  allroles: any[];
  @Input() saleid: string;
  @Input() clientid: string;
  @Input() projectid: string;
  @Input() eventid: string;
  @Input() compliancetype: string;
  @Input() compliancetypeIdendityid: string;
  @Input() NotifyUserid: string;
  @Input() NotifyUsers: any[];
  @Output() Refreshlist = new EventEmitter();
  ngOnInit(): void {
   // this.getUsers();
    this._fetchData();
    this.currole = this.whoaim?.roles[0];

    this.allroles = this.whoaim?.roles;
    
    console.log('this.saleid');
    console.log(this.saleid);
    //this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      //GetData
      //  this._fetchData();
    }
  }

  ngOnChanges(): void {
    this.getcomplianceDetails();
    this.GetComVerified();
    this.getcompliancestatus();
  }

  private _fetchData() {
  //  console.log('this.saleid 1');
  //  console.log(this.saleid);
  }

  GetComVerified() {
    if (this.compliancealldata != null && this.compliancealldata != undefined && this.compliancealldata.length != 0) {
      var rec = this.compliancealldata.filter((item) => item.statuscode > 0);
      if (rec != null && rec != undefined && rec.length != 0) {
       // console.log('in 1');
       // console.log(rec);
        this.verified = 'No';
        return 'No';
      } else {
      //  console.log('in 2');

        this.verified = 'Yes';
        return 'Yes';
      }
    } else {
     // console.log('in 3');
      this.verified = 'No';
      return 'No';
    }
  }

  getcompliancestatus() {
    var id;

    id = this.saleid;

    if (id != null && this.compliancealldata != undefined) {
      this.whoaim = JSON.parse(localStorage.getItem('user'));
      this.roles = this.whoaim?.roles[0];

      const rec = this.compliancealldata?.find((x) => x.salesLeadId === id && x.statuscode > 0);

      if (rec != null && rec != undefined) {
        return 'font-size: 1.2rem;color:red;';
      } else {
        const rec1 = this.compliancealldata?.find((x) => x.salesLeadId === id);
        if (rec1 != null && rec1 != undefined) {
          return 'font-size: 1.2rem;color:green;';
        } else {
          if (this.roles == 'compliance') {
            return 'font-size: 1.2rem;color:blue;';
          } else {
            return 'display:none;';
          }
        }
      }
    }
    return '';
  }

  getcomplianceDetailsfiltered(statusCode: number) {
    //  this.getcomplianceDetails();
    if (this.compliancealldata != null && this.compliancealldata != undefined) {
      return this.compliancealldata.filter((item) => item.statuscode == statusCode);
    } else {
      return null;
    }
  }

  getcomplianceDetails() {
    const filters = new Map();

    const filter = {
      where: {
        and: [
          {
            salesLeadId: this.saleid,
          },
        ],
      },
    };

    filters.set('filter', JSON.stringify(filter));
    this.complianceService.getAll(filters).subscribe(
      (client: any) => {
        this.isLoading = false;
        this.compliancealldata = client;
        //  console.log('compliancealldata Details', this.compliancealldata);
        //   var userData = JSON.parse(window.localStorage.getItem('user'));
      },
      (error: any) => {}
    );
  }

  sendClientNotifications(id: string, txt: string) {
    let emailVariableObj = {
      notificationType: 'skipEmail',
      emailData: this.comment,
    };
    this.emailService.sendEmail(EmailJsTemplates.complianceRequest, this.NotifyUsers, 'Informative', emailVariableObj);
  }
  //subPnlHeadId,accountManagerId, assigneeId,plheadId
  /*
  getClientDetails(id:string) {
    this.clientService.show(id).subscribe(
      (client: any) => {
        this.isLoading = false;
        this.clientDetails = client;
        this.complianceComment = this.clientDetails?.complianceComment;
        var userData = JSON.parse(window.localStorage.getItem('user'));
        this.getProjectByClient();
      },
      (error: any) => {}
    );
  }

*/

  // Open client user form modal
  createClientUser(clientUserFormModal: any) {
    this.modalService.open(clientUserFormModal, { size: 'lg', windowClass: 'modal-holder' });
    this.modalBtn = 'Save';
    this.id = '';
    this.userId = '';
    this.salesLeadId = '';
    this.projectId = '';
    this.status = '';
    this.comment = '';
  }
  //Create new client user

  showhide(num: any) {
    // *ngIf="Curdiv==2"
    if (this.Curdiv == num) {
      this.Curdiv = 550;
    } else {
      this.Curdiv = num;
    }
  }

  refresh() {
    this.getcomplianceDetails();
    this.GetComVerified();
  }

  submitClientUser() {
    console.log(this.comment);
    if (!this.comment) {
      this.error = true;
      //  return;
    }
    let rolesArr = [];
    if (this.isCompliance == true) {
      rolesArr = ['client', 'compliance'];
    } else {
      rolesArr = ['client'];
    }
    /*
  "userId": "test",
  "salesLeadId": "string",
  "projectId": "string",
  "status": "string",
  "actions": [
    {}
  ],
  "createdAt": "2022-04-17T06:59:17.968Z",
  "updatedAt": "2022-04-17T06:59:17.969Z",
  "deletedAt": "2022-04-17T06:59:17.969Z"  
///*************************************** */
    /*
this.paymentPreference = paymentPreference;

    this.username = this.whoaim?.username;
    this.firstName = this.whoaim?.firstName;
    this.roles = this.whoaim?.roles[0];
    this.userType =
      this.whoaim?.roles[0].charAt(0).toUpperCase() +
      this.whoaim?.roles[0]


*/

    this.compliancedata = {
      //  @Input() clientid: string;
      // @Input() projectid: string;
      // @Input() eventid: string;
      // comment: this.comment,
      userId: this.whoaim?.id,
      salesLeadId: this.saleid, //this.salesLeadId,
      projectId: this.projectid, //this.projectId,
      eventId: this.eventid, //this.projectId,
      compliancetype: this.compliancetype,
      status: 'Initiated', // this.status,
      statuscode: 1, // this.status,""
      comment: this.comment,
      actions: [{ comment: 'Please take action', status: 'Initiated', userId: this.whoaim?.id, date: new Date() }],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.complianceService.create(this.compliancedata).subscribe(
      (response) => {
        log.debug('response: ', response);

        //  this.clientDetails.clientUser = this.clientUserData?.clientUser;
        this.isLoading = false;

        // gs this.toasterService.success('Compliance created successfully.', 'Success!');

        this.getcomplianceDetails();

        this.Refreshlist.emit();
        this.refresh();
      },
      (error) => {
        console.log(this.comment);

        log.error(error);
        log.debug('Not Created', this.compliancedata);
        // this.error = error;
      }
    );
  }

  // Show leads Attached
  viewRaised() {
    // this.getcomplianceDetails();
    this.Raised = true;
    this.Resolved = false;
    this.Approved = false;
  }

  // Show leads/client given to account manager
  viewResolved() {
    //  this.getcomplianceDetails();
    this.Raised = false;
    this.Resolved = true;
    this.Approved = false;
  }

  // Show experts given to client
  viewApproved() {
    //  this.getcomplianceDetails();
    this.Raised = false;
    this.Resolved = false;
    this.Approved = true;
  }

  statusupdt: string;
  submitstatus() {
    //// currenteditid:any;
    //currentstatusid:any;
    this.complianceService.show(this.currenteditid).subscribe(
      (client: any) => {
        this.isLoading = false;
        this.compliancedata = client;

        if (this.currentstatusid == 0) {
          this.statusupdt = 'approved';
        } else if (this.currentstatusid == 1) {
          this.statusupdt = 'initiated';
        } else if (this.currentstatusid == 500) {
          this.statusupdt = 'reviewed';
        } else if (this.currentstatusid == 10) {
          this.statusupdt = 'rejected';
        }

        console.log('complianc  data Details', this.compliancedata);
        var userData = JSON.parse(window.localStorage.getItem('user'));
        // console.log('userData Details', userData?);
        this.compliancedata['statuscode'] = this.currentstatusid;
        this.compliancedata['status'] = this.statusupdt;
        this.compliancedata['actions'].push({
          comment: this.statuscomment,
          status: this.statusupdt,
          userId: this.whoaim?.id,
          date: new Date(),
        });

        this.complianceService.updateOnly(this.currenteditid, this.compliancedata).subscribe(
          (response) => {
            log.debug('response: ', response);

            // this.clientDetails.clientUser = this.clientUserData?.clientUser;
            this.isLoading = false;

            // gs // gs this.toasterService.success('Compliance status updated successfully.', 'Success!');
            let emailVariableObj = {
              notificationType: 'Informative',
              emailData: this.comment,
            };

            this.getcomplianceDetails();
            var emailids: string[] = ['saravanannida@gmail.com'];

            //compliance@knowledgeridge.com

            emailids.push('saravanangan@gmail.com');

            this.emailService.sendEmail(EmailJsTemplates.complianceRequest, emailids, 'Informative', emailVariableObj);

            this.Refreshlist.emit();
            this.refresh();
            //this.modalser.dismiss('');
            //  this.modalService.Close('StatusupdateFormModal');
            /*
        //email notification
        let emailVariableObj = {
          notificationType: 'skipEmail',
          emailData: EmailTitleDescription.clientusers,
        };
        this.emailService.sendEmail(
          EmailJsTemplates.clientusers,
          this.emailToSend,
          'Informative',
          emailVariableObj
        );*/
          },
          (error) => {
            log.error(error);
            // log.debug('Not Created', this.clientUserData);
            this.error = error;
          }
        );
      },
      (error: any) => {}
    );
  }

  usersArray: any;

  /**
   * fetches the table value
   */
  getUsers() {
    this.userService.getUsers().subscribe(
      (userArray: any) => {
        this.usersArray = userArray;
      },
      (error: any) => {}
    );
  }

  getUserName(id: string) {
    console.log(id);
    if (id != null && this.usersArray != undefined) {
      console.log('usersArray', this.usersArray);
      const user = this.usersArray.find((x) => x.id === id);
      if (!user.lastName) {
        return user.firstName;
      } else {
        return user.firstName + ' ' + user.lastName;
      }
    } else {
      return '--';
    }
  }

  getbg(id: number) {
    if (id == 1) {
      return 'initiated';
    } else if (id == 0) {
      return 'reviewed'; // "approved";
    } else if (id == 500) {
      return 'reviewed';
    } else {
      return '';
    }
  }

  submitClientUser1() {
    if (!this.comment) {
      this.error = true;
      return;

      /*
    //Create empty array if null
    if (!this.clientDetails?.clientUser) {
      this.clientUserData = {
        clientUser: [],
      };
    } else {
      this.clientUserData = {
        clientUser: this.clientDetails.clientUser,
      };
    }

    this.cid = Math.random().toString(36).substr(2, 9);

    if (this.selectedClientUserId) {
      let clientUserEdit = this.clientDetails?.clientUser.find((x) => x.id == this.selectedClientUserId);

      this.editClientAsUser = {
        firstName: this.clientUserName,
      };

      this.userService.updateById(clientUserEdit?.userId, this.editClientAsUser).subscribe(
        async (user) => {
          // gs this.toasterService.success('User edited successfully .', 'Success!');
          //email notification
          let emailVariableObj = {
            notificationType: 'skipEmail',
            emailData: EmailTitleDescription.clientusers,
          };
          this.emailService.sendEmail(EmailJsTemplates.clientusers, this.emailToSend, 'Informative', emailVariableObj);

          let index = this.clientDetails?.clientUser.indexOf(clientUserEdit);

          this.clientDetails.clientUser.splice(index, 1);

          this.clientUserData.clientUser.push({
            id: clientUserEdit.id,
            clientId: clientUserEdit.clientId,
            userId: clientUserEdit.userId,
            isCompliance: this.isCompliance,
            name: this.clientUserName,
            designation: this.clientUserDesignation,
            mobile: this.clientUserMobile,
            email: clientUserEdit.email,
            password: clientUserEdit.password,
            createdAt: clientUserEdit.createdAt,
            updatedAt: new Date(),
          });
          this.clientService.updateOnly(this.id, this.clientUserData).subscribe(
            (response) => {
              log.debug('response: ', response);

              this.clientDetails.clientUser = this.clientUserData?.clientUser;
              this.isLoading = false;

              // gs this.toasterService.success('Client user updated successfully.', 'Success!');
              //email notification
              let emailVariableObj = {
                notificationType: 'skipEmail',
                emailData: EmailTitleDescription.clientusers,
              };
              this.emailService.sendEmail(
                EmailJsTemplates.clientusers,
                this.emailToSend,
                'Informative',
                emailVariableObj
              );
            },
            (error) => {
              log.error(error);
              log.debug('Not Created', this.clientUserData);
              this.error = error;
            }
          );
        },
        (error) => {}
      );
    } else {
      let rolesArr = [];
      if (this.isCompliance == true) {
        rolesArr = ['client', 'compliance'];
      } else {
        rolesArr = ['client'];
      }
      this.clientAsUser = {
        firstName: this.clientUserName,
        username: this.clientUserEmail,
        password: this.password,
        roles: rolesArr,
      };

      this.userService.register(this.clientAsUser).subscribe(
        async (user) => {
          // gs this.toasterService.success('User created successfully .', 'Success!');

          this.clientUserData.clientUser.push({
            id: this.cid,
            clientId: this.id,
            userId: (await user).id,
            isCompliance: this.isCompliance,
            name: this.clientUserName,
            designation: this.clientUserDesignation,
            mobile: this.clientUserMobile,
            email: this.clientUserEmail,
            password: this.password,
            createdAt: new Date(),
            updatedAt: new Date(),
          });

          this.clientService.updateOnly(this.id, this.clientUserData).subscribe(
            (response) => {
              log.debug('response: ', response);

              this.clientDetails.clientUser = this.clientUserData?.clientUser;
              this.isLoading = false;

              // gs this.toasterService.success('Client user created successfully.', 'Success!');
            },
            (error) => {
              log.error(error);
              log.debug('Not Created', this.clientUserData);
              this.error = error;
            }
          );
        },
        (error) => {}
      );

 */
    }

    this.modalService.dismissAll();
  }

  selectClientUser(selectClientUserModal: any) {
    this.modalService.open(selectClientUserModal, { centered: true, windowClass: 'modal-holder' });
  }
  //Open modal for update client user
  updateClientUser(clientUserFormModal: any, clientUser) {
    /*
    this.selectedClientUserId = clientUser;
    var clientUserEdit = this.clientDetails.clientUser.find((x) => x.id == this.selectedClientUserId);
    this.clientUserName = clientUserEdit.name;
    this.clientUserDesignation = clientUserEdit.designation;
    this.clientUserMobile = clientUserEdit.mobile;
    this.clientUserEmail = clientUserEdit.email;
    this.password = clientUserEdit.password;

    this.modalService.open(clientUserFormModal, { size: 'lg', windowClass: 'modal-holder' });

    this.modalBtn = 'Update'; 
     */
  }
  openModal(profile, id) {
    this.modalService.open(profile, { size: 'sm', centered: true, windowClass: 'modal-holder' });
    //this.clientUser = this.clientDetails.clientUser.find((x) => x.id === id);
  }
  checkEmail(event: any) {
    var email = event.target.value;
    const filters = new Map();
    const filter = {
      where: {
        'clientUser.email': email,
      },
    };
    filters.set('filter', JSON.stringify(filter));

    this.complianceService.getAll(filters).subscribe(
      (data: any) => {
        this.cuEmail = data;
        if (this.cuEmail.length > 0) {
          this.emailMatch = 'Email Already Exist';
          this.btnDisable = true;
        } else {
          this.emailMatch = '';
          this.btnDisable = false;
        }
      },
      (error: any) => {
        this.emailMatch = '';
      }
    );
  }
  checkEmailValidation(event) {
    var re = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');
    if (re.test(event.target.value)) {
      this.validEmailString = '';
      this.btnDisable = false;
    } else {
      this.validEmailString = 'Please enter valid email id';
      this.btnDisable = true;
    }
  }

  checkMobileNumber(event) {
    let value = event.target.value;
    if (value != undefined || value != null || value != '') {
      var re = new RegExp('^[0-9]*$');
      if (re.test(event.target.value)) {
        this.validNumberString = '';
        this.btnDisable = false;
      } else {
        this.validNumberString = 'Please enter valid mobile number';
        this.btnDisable = true;
      }
    }
  }

  currenteditid: any;
  currentstatusid: any;
  openModalforupdate(mdl, id, statusid) {
    this.modalService.open(mdl, { size: 'sm', centered: true, windowClass: 'modal-holder' });
    // this.clientUser = this.clientDetails.clientUser.find((x) => x.id === id);
    this.currenteditid = id;
    this.currentstatusid = statusid;
  }
}
