import { Component, ViewChild, OnInit, Input } from '@angular/core';
import * as moment from 'moment';
import { statData, TopPages, statDatac, ActiveProjects, MyTask, TeamMembers, creatorsData, creatorsListData } from './data';
import { topCollectionModel } from '../CleintDB/CleintDB.model';
import { topCollectionData } from '../CleintDB/data';
//import {creatorsModel, creatorsListModel} from './creators.model';
import { SwiperComponent, SwiperDirective } from 'ngx-swiper-wrapper';
import { SwiperOptions } from 'swiper';
import { DateToLocalPipe } from '../../../core/pipe';
import { ClientsService } from '../../../core/services/clients.service';

import { ProjectService } from '../../../core/services/project.service';
import { UserService } from '../../../core/services/kruser.service';

import { EmployeeService } from '../../../core/services/employee.service';

import { ExpertService } from '../../../core/services/expert.service';


import { EventkrService } from '../../../core/services/krevent.service';

//import {EventkrService} from '../../../core/services/krevent.service';



/**
 * Projects Component
 */
/*
 interface creatorsModel {
  id: number;
  img: string;
  title: string;
  price: string;
}

 interface creatorsListModel {
  id: number;
  cardImg: string;
  img: string;
  title: string;
  products: string;
  isFollowBtn?:any;
  followbtn: string;
  content: string;
}
*/

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss'],
  providers: [DateToLocalPipe],
})
export class areaComponent implements OnInit {
 
  @Input() xAxisData: string[];
  @Input() yAxisData: number[];
  @Input() colors: string[];




 //crypto added
  

  portfolioChart: any;
  
  //@ViewChild(BarComponent) child:BarComponent;
  // @ViewChild(PieComponent) piechild:PieComponent;
  // @ViewChild(BarexComponent) exchild:BarexComponent;


  //gs-------from old ------------


  constructor(
    // private clientsService:ClientsService,
    // private projectService:ProjectService,
    //  private employeeService:EmployeeService,
    //    private expertService:ExpertService,
    //   private eventService:EventkrService,  
    //  private readonly userService: UserService,
  ) {

   // this.whoaim = JSON.parse(sessionStorage.getItem('user')!);


  }
  // roles:any;

  clients: any;

  public chartOptions: any;   // Partial<ChartOptions>;
  public chartSeries:any;   // ApexAxisChartSeries | any[];

  splineAreaChart:any;

  invalue: any;
  // valnum :any;
  ngOnInit(): void {

   

  
    // this._simpleDonutChart('["--vz-primary", "--vz-warning", "--vz-info"]');

    this._portfolioChart('["#3be618", "#188be6", "#3f5efb", "--vz-success"]');
 


  }

  

// chart page :-
       



 private _portfolioChart(colors:any) {



  this.splineAreaChart = {
    series:this.yAxisData,
    chart: {
        height: 350,
        type: "area"
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: "smooth"
    },
    xaxis: {
      
        categories:  this.xAxisData
    },   
    colors: this.colors,

  };







  this.chartOptions = {
    chart: {
      type: 'area',
    //  height: 250,
    },
    xaxis: {
      categories: this.xAxisData,
    },
    yaxis: {
      title: {
        text: 'Series Value',
      },
    },
    colors:this.colors,
  };


  this.chartSeries =this.yAxisData;

/*
  this.chartSeries = [
    {
      name: 'Series 1',
      data: [30, 40, 25, 50, 49],
    },
    {
      name: 'Series 2',
      data: [23, 12, 54, 61, 32],
    },
    {
      name: 'Series 3',
      data: [42, 32, 65, 22, 35],
    },
  ];

*/

}

 }




















