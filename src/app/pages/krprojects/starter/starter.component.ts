import { Component, OnInit } from '@angular/core';
import {  TeamModel } from '../overview/overview.model';
import { TeamService } from '../overview/overview.service';
//import {DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss']
})

/**
 * Starter Component
 */
export class StarterComponent implements OnInit {
  teamOverviewList$!: any[];
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  workingDetailsArray:any;
  expertData:any;
  
  constructor() {
    this.teamOverviewList$ = [];

   }


    /**
   * Open modal
   * @param content modal content
   */
    openModal(content: any) {
       }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
   
     this.breadCrumbItems = [
      { label: 'Pages' },
      { label: 'Starter', active: true }
    ];
  }

}
