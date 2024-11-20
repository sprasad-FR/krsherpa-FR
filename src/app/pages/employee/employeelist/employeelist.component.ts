import { Component, OnInit } from '@angular/core';

import {employeeUser} from '../../../core/models/employee.model';
import {QueryList, ViewChildren} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import {employee} from './employee.model';
import { GridJs } from './data';
import { GridJsService } from './employee.service';
import { NgbdGridJsSortableHeader, SortEvent } from './employee-sortable.directive';


import {EmployeeService} from '../../../core/services/employee.service';


@Component({
  selector: 'app-employeelist',
  templateUrl: './employeelist.component.html',
  styleUrls: ['./employeelist.component.scss'],
  providers: [GridJsService, DecimalPipe]
})

/**
 * Starter Component
 */
export class EmployeelistComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  btnName: any;
emps:any[]=[];

  // Table data
  gridjsList$!: Observable<employee[]>;
  total$!: Observable<number>;
  @ViewChildren(NgbdGridJsSortableHeader) headers!: QueryList<NgbdGridJsSortableHeader>;






  constructor(private modalService: NgbModal,public service: GridJsService, private formBuilder: UntypedFormBuilder,  private employeeService:EmployeeService,) { 
    this.gridjsList$ = service.countries$;
    this.total$ = service.total$;

  }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
     this.breadCrumbItems = [
      { label: 'Home' },
      { label: 'Employee', active: true }
    ];

this.getemps();

  }

  selectedid:any;

  editemp(id: any, content:any) {
   // this.submitted = false;
if (id=='0')
{
  this.selectedid='';
}
else{
   this.selectedid=id;
}
    this.modalService.open(content, { size: 'lg', centered: true });
   // var modelTitle = document.querySelector('.modal-title') as HTMLAreaElement;
   // modelTitle.innerHTML = 'Edit Order';
   // var updateBtn = document.getElementById('add-btn') as HTMLAreaElement;
   // updateBtn.innerHTML = "Update";

  
    
  }



  getemps()
  { 

 this.employeeService.getAll().subscribe(
  (client: any) => {
    this.emps=client;

    this.service.emps=client;

    this.gridjsList$=this.service.countries$;
    
    console.log('data',this.gridjsList$);

    //  console.log('compliancealldata Details', this.compliancealldata);
    //   var userData = JSON.parse(window.localStorage.getItem('user'));
  },
  (error: any) => {}
);
  
  }

  /**
  * Sort table data
  * @param param0 sort the column
  *
  */
  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }

}



