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
import { ClientsService } from '../../../core/services/clients.service';
import { EventService } from '../../../core/services/event.service';
import { ProjectService } from '../../../core/services/project.service';


const log = new Logger('Client User Component');

@Component({
  selector: 'app-complianceActions',
  templateUrl: './complianceActions.component.html',
  styleUrls: ['./complianceActions.component.scss'],
})
export class complianceActionsComponent implements OnInit {
  error: boolean;
  cuEmail: any;
  emailMatch: string;
  validEmailString: string;
  validNumberString: string;
  allroles: any[];
  constructor(
    private complianceService: complianceActionsService,
    private modalService: NgbModal,
    private employeeService: EmployeeService,
   // private readonly toasterService: ToastrService,
    private route: ActivatedRoute,
    private userService: UserService,
    private emailService: EmailService,
    private clientService: ClientsService,
     private eventService: EventService,
      private  projectService: ProjectService,

  ) {
    this.whoaim = JSON.parse(sessionStorage.getItem('user'));
    this.roles = this.whoaim?.roles[0];
     this.allroles = this.whoaim?.roles;

     console.log("compliance roles", this.allroles)
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
  emailToSend: string[]=["noreply@knowledgeridge.com"];
  Curdiv: any;
  currole: string;  
  statuscomment: string;
  Raised: boolean = true;
  verified: string;
  Resolved: boolean = false;
  Approved: boolean = false;
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
    this.getUsers();
    this._fetchData();

    this.whoaim = JSON.parse(localStorage.getItem('user'));
    this.roles = this.whoaim?.roles[0];
     this.allroles = this.whoaim?.roles;

     console.log("compliance roles", this.allroles)



    this.currole = this.whoaim?.roles[0];
    console.log(this.currole);
    //this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      //GetData
      //  this._fetchData();
    }
  }

  private _fetchData() {
    this.getcomplianceDetails();
  }

  GetComVerified() {
    if (this.compliancealldata != null && this.compliancealldata != undefined && this.compliancealldata.length != 0) {
      var rec = this.compliancealldata.filter((item) => item.statuscode > 0);
      if (rec != null && rec != undefined && rec.length != 0) {
        console.log('in 1');
        console.log(rec);
        this.verified = 'No';
        return 'No';
      } else {
        console.log('in 2');

        this.verified = 'Yes';
        return 'Yes';
      }
    } else {
      console.log('in 3');
      this.verified = 'No';
      return 'No';
    }
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
      notificationType: 'Informative',
      emailData: this.comment + 'in module ' + this.compliancetype,
    };
    this.emailService.sendComplianceEmail('template_7ee8ggb', this.NotifyUsers, 'Informative', emailVariableObj);
  }
  //subPnlHeadId,accountManagerId, assigneeId,plheadId
  
  getMailids4ClientDetails(id:string) {
    this.clientService.show(id).subscribe(
      (client: any) => {
this.emailToSend.push(this.getUsermail(client.plheadId))
  this.emailToSend.push(this.getUsermail(client.accountManagerId))
  this.emailToSend.push(this.getUsermail(client.assigneeId))
      this.emailToSend.push(this.getUsermail(client.subPnlHeadId))
       
 //console.log('emailToSend Details', this.emailToSend)


      },
      (error: any) => {}
    );
  }




  getMailids4EventDetails(id:string) {
    this.eventService.show(id).subscribe(
      (client: any) => {

    


this.emailToSend.push(this.getUsermail(client.researchMgrId))
  this.emailToSend.push(this.getUsermail(client.keyAccountManager))
  this.emailToSend.push(this.getUsermail(client.subPnL))
   
       
 //console.log('emailToSend Details', this.emailToSend)


      },
      (error: any) => {}
    );
  }


  getMailids4ProjectDetails(id:string) {

    this.projectService.show(id).subscribe(
      (client: any) => {
this.emailToSend.push(this.getUsermail(client.researchMgrId))
  this.emailToSend.push(this.getUsermail(client.keyAccountManager))
 //console.log('emailToSend Details', this.emailToSend)


      },
      (error: any) => {}
    );
  }


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
      actions: [{ comment: 'Please take compliance action', status: 'Initiated', userId: this.whoaim?.id, date: new Date() }],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.complianceService.create(this.compliancedata).subscribe(
      (response) => {
        log.debug('response: ', response);

        //  this.clientDetails.clientUser = this.clientUserData?.clientUser;
        this.isLoading = false;

        // gs this.toasterService.success('Compliance created successfully.', 'Success!');

 /////////////////////notifications//////////////////////

if (this.compliancetype=='client')
{
  console.log('this.compliancetype', this.compliancetype);

      //  this.getMailids4ClientDetails(this.saleid);

     this.clientService.show(this.saleid).subscribe(
      (client: any) => {
this.emailToSend.push(this.getUsermail(client.plheadId))
  this.emailToSend.push(this.getUsermail(client.accountManagerId))
  this.emailToSend.push(this.getUsermail(client.assigneeId))
      this.emailToSend.push(this.getUsermail(client.subPnlHeadId))    

        //compliance@knowledgeridge.com
  this.emailToSend.push('compliance@knowledgeridge.com');


        let emailVariableObj = {
          notificationType: 'Informative',
          emailData: this.comment + 'in module ' + this.compliancetype,
          comment:this.comment,
          module:this.compliancetype,
          status:"Compliance created"
        };

        console.log('this.emailToSend',this.emailToSend);

        this.emailService.sendComplianceEmail('template_7ee8ggb', this.emailToSend, 'Informative', emailVariableObj);

 },
      (error: any) => {}
    );
  

}
else if (this.compliancetype=='event')
{
    console.log('this.compliancetype', this.compliancetype);

       // this.getMailids4EventDetails(this.saleid);
 this.eventService.show(this.saleid).subscribe(
      (client: any) => {

    


this.emailToSend.push(this.getUsermail(client.researchMgrId))
  this.emailToSend.push(this.getUsermail(client.keyAccountManager))
  this.emailToSend.push(this.getUsermail(client.subPnL))
        

        //compliance@knowledgeridge.com
  this.emailToSend.push('compliance@knowledgeridge.com');


        let emailVariableObj = {
          notificationType: 'Informative',
          emailData: this.comment + 'in module ' + this.compliancetype,
          comment:this.comment,
          module:this.compliancetype,
          status:"Compliance created"
        };

        console.log('this.emailToSend'+this.emailToSend);

        this.emailService.sendComplianceEmail('template_7ee8ggb', this.emailToSend, 'Informative', emailVariableObj);

      },
      (error: any) => {}

    );
  


}
else if (this.compliancetype=='project')
{
  console.log('this.compliancetype', this.compliancetype);

      //  this.getMailids4ProjectDetails(this.saleid);

     
    this.projectService.show(this.saleid).subscribe(
      (client: any) => {
this.emailToSend.push(this.getUsermail(client.researchMgrId))
  this.emailToSend.push(this.getUsermail(client.keyAccountManager))
 //console.log('emailToSend Details', this.emailToSend)
   

        //compliance@knowledgeridge.com
  this.emailToSend.push('compliance@knowledgeridge.com');


        let emailVariableObj = {
          notificationType: 'Informative',
          emailData: this.comment + 'in module ' + this.compliancetype,
          comment:this.comment,
          module:this.compliancetype,
          status:"Compliance created"
        };

        console.log('this.emailToSend'+this.emailToSend);
   this.emailService.sendComplianceEmail('template_7ee8ggb', this.emailToSend, 'Informative', emailVariableObj);

 },
      (error: any) => {}

    );
  



}
else if (this.compliancetype=='profile')
{


      //  this.getMailids4ProjectDetails(this.saleid);

        

        //compliance@knowledgeridge.com
  this.emailToSend.push('compliance@knowledgeridge.com');


        let emailVariableObj = {
          notificationType: 'Informative',
          emailData: this.comment + 'in module ' + this.compliancetype,
          comment:this.comment,
          module:this.compliancetype,
          status:"Compliance created"
        };

        console.log('this.emailToSend'+this.emailToSend);

}
/////////////notifications/////////////////////////
        this.Refreshlist.emit();
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

            // gs this.toasterService.success('Compliance status updated successfully.', 'Success!');

            this.getcomplianceDetails();
         
            //compliance@knowledgeridge.com

            //emailids.push("saravanangan@gmail.com");
/*
            let emailVariableObj = {
              notificationType: 'Informative',
              emailData: this.comment + ' in  ' + this.compliancetype + ' module',
            };  */

           // this.emailService.sendEmail('template_7ee8ggb', emailids, 'Informative', emailVariableObj);


////////////////////notification///////////////////


if (this.compliancetype=='client')
{
  console.log('this.compliancetype', this.compliancetype);

      //  this.getMailids4ClientDetails(this.saleid);

     this.clientService.show(this.saleid).subscribe(
      (client: any) => {
this.emailToSend.push(this.getUsermail(client.plheadId))
  this.emailToSend.push(this.getUsermail(client.accountManagerId))
  this.emailToSend.push(this.getUsermail(client.assigneeId))
      this.emailToSend.push(this.getUsermail(client.subPnlHeadId))    

        //compliance@knowledgeridge.com
  this.emailToSend.push('compliance@knowledgeridge.com');


        let emailVariableObj = {
          notificationType: 'Informative',
          emailData: this.comment + 'in module ' + this.compliancetype,
          comment:this.comment,
          module:this.compliancetype,
          status:"Compliance updated"
        };

        console.log('this.emailToSend',this.emailToSend);

        this.emailService.sendComplianceEmail('template_7ee8ggb', this.emailToSend, 'Informative', emailVariableObj);

 },
      (error: any) => {}
    );
  

}
else if (this.compliancetype=='event')
{
    console.log('this.compliancetype', this.compliancetype);

       // this.getMailids4EventDetails(this.saleid);
 this.eventService.show(this.saleid).subscribe(
      (client: any) => {

    


this.emailToSend.push(this.getUsermail(client.researchMgrId))
  this.emailToSend.push(this.getUsermail(client.keyAccountManager))
  this.emailToSend.push(this.getUsermail(client.subPnL))
        

        //compliance@knowledgeridge.com
  this.emailToSend.push('compliance@knowledgeridge.com');


        let emailVariableObj = {
          notificationType: 'Informative',
          emailData: this.comment + 'in module ' + this.compliancetype,
          comment:this.comment,
          module:this.compliancetype,
          status:"Compliance updated"
        };

        console.log('this.emailToSend'+this.emailToSend);

        this.emailService.sendComplianceEmail('template_7ee8ggb', this.emailToSend, 'Informative', emailVariableObj);

      },
      (error: any) => {}

    );
  


}
else if (this.compliancetype=='project')
{
  console.log('this.compliancetype', this.compliancetype);

      //  this.getMailids4ProjectDetails(this.saleid);

     
    this.projectService.show(this.saleid).subscribe(
      (client: any) => {
this.emailToSend.push(this.getUsermail(client.researchMgrId))
  this.emailToSend.push(this.getUsermail(client.keyAccountManager))
 //console.log('emailToSend Details', this.emailToSend)
   

        //compliance@knowledgeridge.com
  this.emailToSend.push('compliance@knowledgeridge.com');


        let emailVariableObj = {
          notificationType: 'Informative',
          emailData: this.comment + 'in module ' + this.compliancetype,
          comment:this.comment,
          module:this.compliancetype,
          status:"Compliance updated"
        };

        console.log('this.emailToSend'+this.emailToSend);
   this.emailService.sendComplianceEmail('template_7ee8ggb', this.emailToSend, 'Informative', emailVariableObj);

 },
      (error: any) => {}

    );
  



}
else if (this.compliancetype=='profile')
{


      //  this.getMailids4ProjectDetails(this.saleid);

        

        //compliance@knowledgeridge.com
  this.emailToSend.push('compliance@knowledgeridge.com');


        let emailVariableObj = {
          notificationType: 'Informative',
          emailData: this.comment + 'in module ' + this.compliancetype,
          comment:this.comment,
          module:this.compliancetype,
          status:"Compliance created"
        };

        console.log('this.emailToSend'+this.emailToSend);

}





////////////////////notification///////////////////




            this.Refreshlist.emit();



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


 this.modalReference.close();


  }

  usersArray: any;

  /**
   * fetches the table value
   */
  getUsers1() {
    this.userService.getUsers().subscribe(
      (userArray: any) => {
        this.usersArray = userArray;
      },
      (error: any) => {}
    );
  }


  getUsers() {
    this.employeeService.getAll().subscribe(
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
      if (user && user.name) {
        return user.name +' ';
      } else {
        return   ' ' ;
      }
    } else {
      return '--';
    }
  }

  getUsermail(id: string) {
    console.log('id is',id);
    if (id != null && this.usersArray != undefined) {  
      console.log('usersArray', this.usersArray);
     // var user = this.usersArray.find(x => x.id == id);  
console.log(id);
      const user = this.usersArray.find((obj) => {
console.log('in loop');
console.log(obj.userId);
console.log(id);
  return obj.userId == id;
});
//console.log('user found1', this.usersArray.find((x) => x.id == id));
/*
const first = arr.find((obj) => {
  return obj.id === 2;
}); */
        //i => i.id === 1
      if (user)
      {
console.log('user found1',user.email);
      if (user.email) {
        return user.email;
      } else {
        return '';
      }
    }
     else {
        return '';
      }

    } else {
      return '';
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

              this.toasterService.success('Client user updated successfully.', 'Success!');
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
          this.toasterService.success('User created successfully .', 'Success!');

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

              this.toasterService.success('Client user created successfully.', 'Success!');
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
  modalReference : any;
  openModalforupdate(mdl, id, statusid) {
  this.modalReference =  this.modalService.open(mdl, { size: 'sm', centered: true, windowClass: 'modal-holder' });
    // this.clientUser = this.clientDetails.clientUser.find((x) => x.id === id);
    this.currenteditid = id;
    this.currentstatusid = statusid;
  }
}
