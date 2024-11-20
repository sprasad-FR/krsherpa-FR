import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Logger } from '../core/logger.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Expert } from '../core/models/expert.model';
import { DateToLocalPipe,getCompanyTypePipe,GetInitialsPipe } from '../core/pipe';
import { ExpertService } from '../core/services/expert.service';
import { industry } from '../../../../shared-libs';
import * as _ from 'lodash';
import { EmployeeService } from '../core/services/employee.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

declare const Buffer

import Swal from 'sweetalert2';
const log = new Logger('Expert Confirmmation Component');
@Component({
  selector: 'app-confirm-expert',
  templateUrl: './confirm-expert.component.html',
  styleUrls: ['./confirm-expert.component.scss'],
})
export class ConfirmExpertComponent implements OnInit {
  isLoading: boolean = false;
  error: any | undefined;
  krExpertsList: any;
  rateForClient: any;
  industry: string;
  expertDataForConfirmation: Expert;
  id: string;
  expertData: Expert;
  ex: any;
  currentEmployer: any;
  userData: any;
  expert: any;
  constructor(
    private readonly expertService: ExpertService,
    private route: ActivatedRoute,
    private readonly employeeService: EmployeeService,
    private modalService: NgbModal,
    private router: Router,
    private toasterService: ToastrService
  ) {
    this.userData = JSON.parse(window.localStorage.getItem('user'));
    this.expert = JSON.parse(localStorage.getItem('expert'));
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      //GetData
      this.fetchData();
    }
  }

  private fetchData() {
    this.getExperts();
  }

  private getResearchMgr(id: string) {
    this.isLoading = true;

    if (!id) {
      return;
    }

    this.employeeService.show(id).subscribe(
      (researchMgr: any) => {
        this.expertData['krRelationshipMgr'] = researchMgr;
      },
      (error: any) => {
        this.isLoading = false;
      }
    );
  }

  private getExperts() {
    this.expertService.show(this.id).subscribe(
      (experts: Expert) => {

        experts.primaryEmail=this.encDta(experts.primaryEmail)
        experts.contactNo=this.encDta(experts.contactNo)
        experts.alternateEmail=this.encDta(experts.alternateEmail)
        experts.alternatePhone=this.encDta(experts.alternatePhone)  

       
        this.expertData = experts;


        if (this.expertData.krRelationshipMgr) {
          this.getResearchMgr(this.expertData.krRelationshipMgr);
        }
        // this.industry = industry.find((x) => x.id == this.expertData.industry).text;
        (this.rateForClient = this.expertData.rate), console.log('Expert data:', this.expertData);
      },
      (error: any) => {}
    );
  }


  encDta(data:any) {


    if (data==undefined || data==null || data=='')
    {
    return " ";
    }
  
  return Buffer.from(data.substring(5), 'base64').toString('ascii');
   //return window.atob((data).substring(5));
  
  }


  acceptTerms(val) {
    this.expertService.show(this.id).subscribe(
      (experts: Expert) => {

        experts.primaryEmail=this.encDta(experts.primaryEmail)
        experts.contactNo=this.encDta(experts.contactNo)
        experts.alternateEmail=this.encDta(experts.alternateEmail)
        experts.alternatePhone=this.encDta(experts.alternatePhone)  

        this.expertDataForConfirmation = experts;
        if (val == 'accepted') {
          this.expertDataForConfirmation.terms = true;
        } else {
          this.expertDataForConfirmation.terms = experts.terms;
        }

        this.expertService.updateOnly(this.id, this.expertDataForConfirmation).subscribe(
          (response) => {
            log.debug('response: ', response);
            this.isLoading = false;
            this.expertData.terms = true;
            this.expertData.termsAcceptDate = new Date().toLocaleDateString()
            localStorage.setItem('expert', JSON.stringify(this.expertData));
            this.router.navigate(['/expert-dashboard']);
            this.getExperts();
          },
          (error) => {
            log.error(error);
            log.debug('Not Updated', this.expertData);
            this.error = error;
            this.isLoading = false;
          }
        );
      },
      (error: any) => {}
    );
  }



  
}
