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
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
  providers: [DateToLocalPipe],
})
export class barComponent implements OnInit {
 
  @Input() xAxisData: string[];
  @Input() yAxisData: number[];
  @Input() colors: string[];

  OverviewChart11: any;


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


  invalue: any;
  // valnum :any;
  ngOnInit(): void {

  this. drawchart();
    // this._simpleDonutChart('["--vz-primary", "--vz-warning", "--vz-info"]');

  }


  //OverviewChart11: any;
  drawchart()
  {


    this.OverviewChart11 = {



      series: [{
        name: 'Test',
        type: 'bar',
        data: this.yAxisData,
        // [5, 8, 15, 16, 21, 25, 21, 13, 30, 20, 9, 18]
      }],
      chart: {
        height: 200,
        type: 'line',
        //  background:'linear-gradient(185deg, rgba(179,233,240,1) 0%, rgba(49,66,244,1) 100%)',

        //background:'linear-gradient(22deg, rgba(37,33,41,1) 0%, rgba(179,82,139,1) 49%, rgba(191,175,179,1) 100%)',

        toolbar: {
          show: false,
        },
        events: {
          dataPointSelection: (event: any, chartContext: any, config: any) => {
            //  alert(chartContext);
            console.log(chartContext, config);
          }
        },
      },
      stroke: {
        curve: 'smooth',
        dashArray: [0, 3, 0],
        width: [0, 1, 0],
      },
      fill: {
        opacity: [1, 0.1, 1]
      },
      markers: {
        size: [0, 4, 0],
        strokeWidth: 2,
        hover: {
          size: 4,
        }
      },

      xaxis: {
        categories: this.xAxisData,
        //  ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        axisTicks: {
          show: false
        },
        axisBorder: {
          show: false
        },
        tooltip: {
          enabled: false
        }
      },
      grid: {
        show: true,
        xaxis: {
          lines: {
            show: true,
          }
        },
        yaxis: {
          lines: {
            show: false,
          }
        },
        padding: {
          top: 0,
          right: -2,
          bottom: 15,
          left: 10
        },
      },
      legend: {
        show: true,
        horizontalAlign: 'center',
        offsetX: 0,
        offsetY: -5,
        markers: {
          width: 9,
          height: 9,
          radius: 6,
        },
        itemMargin: {
          horizontal: 10,
          vertical: 0
        },
      },
      plotOptions: {
        bar: {
          columnWidth: '30%',
          barHeight: '70%'
        }
      },

      colors: this.colors,
      tooltip: {
        shared: true,
        y: [{
          formatter: function (y: any) {
            if (typeof y !== "undefined") {
              return y.toFixed(0);
            }
            return y;

          }
        }, {
          formatter: function (y: any) {
            if (typeof y !== "undefined") {
              return "$" + y.toFixed(2) + "k";
            }
            return y;

          }
        }, {
          formatter: function (y: any) {
            if (typeof y !== "undefined") {
              return y.toFixed(0);
            }
            return y;

          }
        }]
      }
    };




  }

// chart page :-
     




}
















