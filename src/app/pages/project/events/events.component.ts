import { Project } from './../models/project.model';
import { from } from 'rxjs';
import { ClientsService } from '../../../core/services/clients.service';
import { ProjectService } from './../../../core/services/project.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Logger } from '../../../core/logger.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../../../core/services/employee.service';
import { ExpertService } from '../../../core/services/expert.service';
import { currencies, options, eventTypes } from './../../../../../../shared-libs';
import { EventService } from '../../../core/services/event.service';
import {Event } from '../../../core/models/event.model';
import * as moment from 'moment';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { Expert } from '../models/expert.model';
import { employeeUser } from '../models/employee.model';
import { DateToLocalPipe } from '../../../core/pipe';
import { EmailService } from '../../../core/services/email.service';
import { EmailJsTemplates } from '../../../core/models/options';
import { complianceActionsService } from '../../../core/services/complianceActions.service';
import {  Input, Output,  } from '@angular/core';
const log = new Logger('Events Component');
import { EventEmitter } from '@angular/core';


 
 
@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
  providers: [DateToLocalPipe],
})
export class EventsComponent implements OnInit {
  isLoading: boolean = false;
  eventFormGrp: FormGroup;
  error: any = [];
  eventsList: Event[];
  krExpertsList: Expert[];
  researchMgrList: employeeUser[];
  currenciesList: any[];
  rateTypes: string[];
  eventTypes: any[];
  expert: any;
  id: string;
  projectData: Project;
  event: Event;
  eventAt: string;
  eventModalTitle: string;
  btnName: string;
  eid: string;
  localstorageEmp: any[];
  emailReceiver: any[];
  reportingMgrEmail: any;
  reportingMgr: any;
  compliance: any;
  arrOfEMpIds: any[];
  emailToSend: any[];
  eventType: { id: number; text: string }[];
  whoaim: any;
  roles: string;
  selectedResearchMgr: any;
  selectedExpert: any;
  today: string;
  datetime: Date;
  empList: any;
  emailVariableObj: any;


@Input() itemid: string='';
@Input() readonly: boolean=true;
@Output() sendslot = new EventEmitter();
// sendrch,cancellcall,getcallinfo
@Output() esendrch = new EventEmitter();
@Output() ecancellcall = new EventEmitter();
@Output() egetcallinfo = new EventEmitter();
@Output() egetupdates = new EventEmitter();

  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
   // private toasterService: ToastrService,
    private route: ActivatedRoute,
    private readonly expertService: ExpertService,
    private readonly eventService: EventService,
    private readonly employeeService: EmployeeService,
    private readonly projectService: ProjectService,
    private emailService: EmailService,
    public complianceService: complianceActionsService,
    private router: Router
  ) {
    this.whoaim = JSON.parse(localStorage.getItem('user'));
    this.roles = this.whoaim?.roles[0];
    this.empList = JSON.parse(window.localStorage.getItem('emp'));
  }

  ngOnInit(): void {
    this.currenciesList = currencies;
    this.rateTypes = options.rateTypes;
    this.eventType = eventTypes;

    this.eventModalTitle = 'Add New Event';
    this.btnName = 'Create';
    this.id =this.itemid;// this.route.snapshot.paramMap.get('id');
    {
      this.fetchData();
    }
    this.eventForm();
  }

  RefreshList() {
    this.refreshed = false;
    this.refreshed = true;
    this.fetchData();
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
      (error: any) => {}
    );
  }

  //**gs
  getcompliancestatusclr(id: string, isok: boolean) {
    if (id != null && this.compliancealldata != undefined) {
      const rec = this.compliancealldata?.find((x) => x.salesLeadId === id && x.statuscode > 0);
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

  getcompliancestatus(id: string) {
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
    return ''
  }

  idforCompliance: string;

  // Open client user form modal
  createClientUser(clientUserFormModal: any, saleid: any) {
    this.idforCompliance = saleid;

    this.modalService.open(clientUserFormModal, { size: 'lg', windowClass: 'modal-holder' });
  }

  private fetchData() {
    this.getEvents();
    this.getExpertsList();
    this.getResearchMgrList();
    this.getProjectData();
    let days = 0;

    let currentDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
    let day = currentDate.getDate();
    let strDate = day < 10 ? '0' + day : day;
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();

    let strMonth = month < 10 ? '0' + month : month;

    this.today = year + '-' + strMonth + '-' + strDate + 'T00:00';
    this.datetime = new Date(2021, 11, 28, 10, 50);
  }
  private updateEvents(id: string) {
    this.eventService.show(id).subscribe(
      (response) => {
        this.event = response;

        this.event.eventAt = this.event.eventAt.toLocaleString().split('T')[0];

        this.eventFormGrp.patchValue(this.event);
        this.event.eventAt = this.event.eventAt.toLocaleString();
      },
      (error: any) => {}
    );
  }

  sendtimeslot(expert,call)
  {
  this.sendslot.emit({expert,call});
  }


  getupdates(expert,call)
  {
  this.egetupdates.emit({expert,call});
  }
 
// sendrch,cancellcall,getcallinfo,egetupdates
  sendrch(expert,call)
  {
  this.esendrch.emit({expert,call});
  }

  cancellcall(expert,call)
  {
  this.ecancellcall.emit({expert,call});
  }

  getcallinfo(expert,call)
  {
  this.egetcallinfo.emit({expert,call});
  }



  getUserName(id) {
    let emp = this.empList?.find((x) => x.userId == id);
    if (emp) {
      return emp?.name;
    }
    return '';
  }

  editEvent(newEventFormModal, id: string) {
    this.eventModalTitle = 'Update Event';
    this.btnName = 'Update';
    this.modalService.open(newEventFormModal, { centered: true, windowClass: 'modal-holder' });
    this.updateEvents(id);
    this.eid = id;
  }
  // Get events list
  private getEvents() {
    const filters = new Map();
    const filter = {
      where: {
        projectId: this.id,
      },
      include: [
     /*   {
          relation: 'krResearchMgr',
        },
        {
          relation: 'expert',
        },
        {
          relation: 'project',
        }, */
      ],
    };

    filters.set('filter', JSON.stringify(filter));

    this.eventService.getAll(filters).subscribe(
      (response) => {

        console.log('events',response)
        
        this.eventsList = response;
      },
      (error: any) => {}
    );
  }

  // Event Form Builder
  eventForm() {
    this.eventFormGrp = this.formBuilder.group({
      eventId: [null, [Validators.required]],
      // smeNum: [null, [Validators.required]],
      expertId: [null, [Validators.required]],
      krResearchMgrId: [null, [Validators.required]],
      eventAt: [null, [Validators.required]],
      type: [null, [Validators.required]],
      status: [null, [Validators.nullValidator]],
      expertRateType: [null, [Validators.required]],
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
    });

    this.isLoading = false;
  }
  getProjectData() {
    this.projectService.show(this.id).subscribe((project: any) => {
      this.projectData = project;
    });
  }

  // Create / update events
  submitData() {
    // if(this.eventFormGrp.valid){
    let eventData = this.eventFormGrp.value;
    const momnt = moment();
    eventData.projectId = this.id;
    this.projectService.show(eventData.projectId).subscribe(
      (project: any) => {
        this.projectData = project;

        eventData.clientId = project.clientId;

        eventData.status = 'Upcoming';
        eventData.eventId =
          momnt.year() + '' + momnt.month() + '' + momnt.day() + '' + momnt.hour() + '' + momnt.second();
        eventData.eventAt = new Date(eventData.eventAt);

        eventData = _.pickBy(eventData, _.identity);

        if (this.eid) {
          this.eventService.update(this.eid, eventData).subscribe(
            (response) => {
              log.debug('response: ', response);

              this.isLoading = false;
              //gs    this.toasterService.success('Event updated successfully.', 'Success!');
            },
            (error) => {
              log.error(error);
              log.debug('Not Updated', eventData);
              this.error = error;
              this.isLoading = false;
            }
          );
        } else {
          this.eventService.create(eventData).subscribe(
            (response) => {
              log.debug('response: ', response);

              this.isLoading = false;

              //gs    this.toasterService.success('Event created successfully.', 'Success!');
              //email notification
              this.arrOfEMpIds = [];
              this.arrOfEMpIds.concat(this.projectData?.researchAnalyst);
              this.arrOfEMpIds.concat(this.projectData?.researchManagerId);
              this.arrOfEMpIds.push(this.projectData?.keyAccMgrId);
              var selectedEmailPeople = this.empList?.filter((e) => this.arrOfEMpIds.indexOf(e.id) != -1);
              this.emailToSend = selectedEmailPeople?.map((a) => a.email);
              this.emailToSend.push(this.empList?.find((x) => x.designation == 12).email);
              this.emailService.sendEmail(
                EmailJsTemplates.NewEvent,
                this.emailToSend,
                'Informative & System Prompt',
                this.emailVariableObj
              );
              this.getEvents();
            },
            (error) => {
              log.error(error);
              log.debug('Not Created', eventData);
              this.error = error;
            }
          );
        }
      },
      (error: any) => {}
    );

    this.modalService.dismissAll();
    // }
    // else{
    //   console.log('Form not valid', this.eventFormGrp);
    // }
  }

  // Open event form modal
  createNewEventForm(newEventFormModal: any) {
    this.modalService.open(newEventFormModal, { centered: true, windowClass: 'modal-holder' });
    //this.selectedResearchMgr = this.researchMgrList.find((x) => x.userId == this.projectData.researchManagerId).userId;
    
   /* 
    this.selectedExpert = this.krExpertsList.find(
      (x) => x.userId == this.projectData?.leadAttached.find((y) => y.userId).userId
    ).userId;
    }

    */


  }

  
  getExpertName(id) {
    let expert = this.krExpertsList?.filter((x) => x.userId == id);

    if (expert  && expert.length>0)
    {
    return expert[0]?.firstName + ' ' + expert[0]?.lastName;
    }
    else
    {
     return ''

    }

  }
  
  // Get experts list
  private getExpertsList() {

    this.krExpertsList= this.expertService.getexmindata();

    /*this.expertService.getAll().subscribe(
      (experts: any) => {
        this.krExpertsList = experts;
      },
      (error: any) => {}
    ); */
  }

  // Get KR Research Managers list
  private getResearchMgrList() {
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

  // Update patch data on server (Common function)
  private updateOnServer(eventId: string, updateData: any, action: string) {
    this.eventService.updateOnly(eventId, updateData).subscribe(
      (response) => {
        this.isLoading = false;
        //gs    this.toasterService.success(`Event has been ${action}ed.`, 'Success!');
      },
      (error) => {
        log.error(error);
        // this.error = error;
        this.isLoading = false;
        //gs    this.toasterService.error(`Error in ${action}ing expert/lead.`, 'Error!');
      }
    );
  }
}
