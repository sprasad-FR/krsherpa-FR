import { Component, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Logger } from '../../../../core/logger.service';
import { EmployeeService } from '../../../../core//services/employee.service';
import { ExpertService } from '../../../../core//services/expert.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import { ToastrService } from 'ngx-toastr';
import { currencies, options } from '../../../../../../../shared-libs';
import { Expert } from '../../../../core//models/expert.model';
import { LeadSource } from '../../../../core/models/default.model';
import { leadSourceArray } from '../../../../core/models/options';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailJsTemplates } from '../../../../core/models/options';
import { EmailService } from '../../../../core/services/email.service';

const log = new Logger('Create Lead Form Component');
@Component({
  selector: 'app-create-lead-form',
  templateUrl: './create-lead-form.component.html',
  styleUrls: ['./create-lead-form.component.scss'],
})
export class CreateLeadFormComponent implements OnInit {
  industriesList: any;
  currenciesList: any;
  researchMgrList: any;
  rateTypes: any[];
  error: any | undefined;
  leadFormGrp: FormGroup;
  isLoading: boolean = false;
  breadCrumbItems: Array<{}>;
  pageTitle: string;
  btnName: string;
  // status: any[];
  status: Array<{}>;
  expertData: Expert;
  leadSourceArray: LeadSource[];
  id: string;
  EmailJsTemplates: object;
  @Input() itemid: string='';
  @Input() readonly: boolean=true;
  constructor(
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    //private toasterService: ToastrService,
    private readonly expertService: ExpertService,
    private readonly employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {
    this.pageTitle = 'Create Expert';
    this.btnName = 'Create';
    this.fetchData();
  }

  private fetchData() {
    // this.industriesList = industriesList;
    this.currenciesList = currencies;
    this.rateTypes = options.rateTypes;
    this.status = options.status;
    this.leadSourceArray = leadSourceArray;
    this.getResearchMgr();
    this.createForm();
  }

  submitData() {
    const expertData = this.leadFormGrp.value;

    if (this.leadFormGrp.valid) {
      expertData['workDetails'] = expertData.workDetails;
      if (this.id) {
        this.expertService.update(this.id, expertData).subscribe(
          (response) => {
            log.debug('response: ', response);

            this.isLoading = false;
            this.router.navigate(['/expert/expertlist']);
            //gs    this.toasterService.success('Expert updated successfully.', 'Success!');
            //   this.emailService.sendEmail(EmailJsTemplates.ExpertPortal, ['madhura.dharmik@wizgle.com','ragini.dahake@gmail.com', 'shubham@wizgle.com'],
            //   {
            //     name: 'sherpa',
            //     notes: 'Email Testing!'
            // });
          },
          (error) => {
            log.error(error);
            log.debug('Not Updated', expertData);
            this.error = error;
            this.isLoading = false;
          }
        );
      } else {
        this.expertService.create(expertData).subscribe(
          (response) => {
            log.debug('response: ', response);

            // this.router.navigate(['/expert/expertlist']);
            //gs    this.toasterService.success('Expert lead created successfully.', 'Success!');
          },
          (error) => {
            log.error(error);
            log.debug('Not Created', expertData);
            this.error = error;
          }
        );
      }
    }
  }

  cancelForm() {
    this.router.navigate(['/expert/expertlist']);
  }

  getResearchMgr() {
    const filters = new Map();
    const filter = {
      where: {
        designation: 2,
      },
      fields: {
        id: true,
        name: true,
        designation: true,
        email: true,
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
  createForm() {
    this.status = options.status;
    this.leadFormGrp = this.formBuilder.group({
      salutation: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      contactNo: [null, [Validators.required]],
      primaryEmail: [null, [Validators.required]],
      status: [null, [Validators.nullValidator]],
      currentEmployer: [null, [Validators.nullValidator]],
      designation: [null, [Validators.required]],
      state: [null, [Validators.required]],
      city: [null, [Validators.required]],
      industry: [null, [Validators.required]],
      rate: [null, [Validators.nullValidator]],
      currency: [null, [Validators.nullValidator]],
      rateType: [null, [Validators.nullValidator]],
      isLead: [null, [Validators.nullValidator]],
      term: [null, [Validators.nullValidator]],
      workDetails: [null, [Validators.nullValidator]],
      sourceType: [null, [Validators.nullValidator]],
      sourceUrl: [null, [Validators.nullValidator]],
      krRelationshipMgr: [null, [Validators.nullValidator]],
    });
  }
}
