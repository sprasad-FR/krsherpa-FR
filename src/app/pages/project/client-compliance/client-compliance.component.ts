import { Component, Input, ElementRef,Output,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from '../../../core/services/clients.service';
import { EmailService } from '../../../core/services/email.service';
import { Clients } from '../../../core/models/clients.model';
import { ToastService } from '../../toast-service';  ;
import { EmailJsTemplates, EmailTitleDescription } from '../../../core/models/options';


import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-client-compliance',
  templateUrl: './client-compliance.component.html',
  styleUrls: ['./client-compliance.component.scss'],
})
export class ClientComplianceComponent implements OnInit {
  id: any;
  isLoading: boolean = false;
  clientDetails: Clients;
  clientDetailsUpdate: Clients;
  showComplianceButton: boolean;
  roles: string;
  anotherRole: string;
  //role: string = 'admin-compliace';
  emailReceiver: any[];
  modificationsDetails: string = '';
  EmailJsTemplates: object;
  @Input() itemid: string='';
  @Input() readonly: boolean=true;
  whoaim: any;
  data: any[];
  rules: any[];
  allroles: any[];
  empList: any[];
  emailToSend: any;
  constructor(
    private route: ActivatedRoute,
    private clientService: ClientsService,
    private toasterService: ToastService,
    private emailService: EmailService,
    private router: Router,

    public modalService: NgbModal
  ) {
    this.whoaim = JSON.parse(localStorage.getItem('user'));
    this.empList = JSON.parse(localStorage.getItem('emp'));
  }

  ngOnInit(): void {
    this.roles = this.whoaim?.roles[0];
    if (this.roles === 'client') {
      this.anotherRole = this.whoaim?.roles[1];
    }
 
    if ( this.itemid && this.itemid !='')
    {
    this.id =this.itemid//  this.route.snapshot.paramMap.get('id')!;
    }
    else{
     this.id = this.route.snapshot.paramMap.get('id');
    }
    this.roles = this.whoaim.roles[0];
    this.allroles = this.whoaim.roles;
   
    if (this.id) {
      //GetData
      this.getClientDetails();
    }
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }
  getClientDetails() {
    this.clientService.show(this.id).subscribe(
      (client: any) => {
        this.isLoading = false;
        this.clientDetails = client;
        this.rules = this.clientDetails?.compliace?.rules;
        if (this.whoaim?.roles.indexOf('compliance') != -1 && this.clientDetails?.isComplianceVerified == false) {
          // if (userData.roles.indexOf('compliance') != -1) {
          this.showComplianceButton = true;
        } else {
          this.showComplianceButton = false;
        }
      },
      (error: any) => {}
    );
  }
  addRule() {
    this.clientDetails?.compliace?.rules.push([]);
  }
  currentRequestedRules = [];
  requestModifications() {
    if (this.currentRequestedRules?.length == 0 || this.modificationsDetails === '') {
      return;
    }
    if (!this.clientDetails?.compliace['modification']) {
      this.clientDetails.compliace['modification'] = [];
    }
    this.clientDetails?.compliace['modification'].push({
      rules: this.currentRequestedRules,
      details: this.modificationsDetails,
    });
    this.update('Modification Requested successfully.');
  }

  update(msg: string) {
  //  this.clientDetailsUpdate = {};
    this.clientDetailsUpdate['compliace'] = this.clientDetails?.compliace;
    this.clientService.updateOnly(this.id, this.clientDetailsUpdate).subscribe(
      (response) => {
        this.isLoading = false;
        this.modalService.dismissAll();
        this.router.navigate(['/clients/assignments']);
        this.toasterService.success(msg, 'Success!');
        let arrOfEMpIds = [];
        let emailNotification = [];
        emailNotification.push(this.empList?.find((x) => x.designation == 3)?.email);
        emailNotification.push(this.empList?.find((x) => x.designation == 12)?.email);
        emailNotification.push(this.empList?.find((x) => x.designation == 4)?.email);

        this.emailReceiver = emailNotification;


        
        // email notification
        let emailVariableObj = {
          notificationType: 'skipEmail',
          emailData: EmailTitleDescription.complianceRequest,
        };


        emailVariableObj['Module'] = 'Client' ;
        emailVariableObj['name'] = this.clientDetails?.companyName;
        emailVariableObj['Action'] = 'Client Compliance' ;
        emailVariableObj['Actiontype'] = 'Informative' ;
        emailVariableObj['link'] = '/clients/show/' + this.id;
       // emailVariableObj['description'] = '/clients/show/' + this.id;



        this.emailService.sendEmail(
          EmailJsTemplates.complianceRequest,
          this.emailReceiver,
          'Approval',
          emailVariableObj
        );

        let emailVariableObj1 = {
          emailData: EmailTitleDescription.complianceRequestEmail,
          complianceUser: this.empList?.find((x) => x.designation == 12)?.name,
          clientUser: this.whoaim.firstname,
          clientName: this.clientDetails?.companyName,
          remark: this.modificationsDetails,
        };
        this.emailService.sendEmail(
          EmailJsTemplates.complianceRequestEmail,
          this.emailReceiver,
          'Approval',
          emailVariableObj1
        );
      },
      (error) => {
        this.isLoading = false;
      }
    );
    this.modalService.dismissAll();
  }

  confirmModification() {
    this.update('Modification Updated Successfully.');
  }

  addRemoveRule(e, i: number) {
    if (e.target.checked) {
      this.currentRequestedRules.push(this.clientDetails?.compliace['rules'][i]);
    } else {
      this.currentRequestedRules = this.removeItemOnce(this.clientDetails?.compliace['rules'][i]);
    }
  }
  removeRule(i) {
    this.clientDetails?.compliace['rules'].splice(i, 1);
  }
  resolve(i) {
    this.clientDetails?.compliace['modification'].splice(i, 1);
  }
  removeItemOnce(value) {
    var index = this.currentRequestedRules?.indexOf(value);
    if (index > -1) {
      this.currentRequestedRules?.splice(index, 1);
    }
    return this.currentRequestedRules;
  }

  openModal(changeRequest) {
    this.modalService.open(changeRequest, { centered: true, windowClass: 'modal-holder' });
  }
}
