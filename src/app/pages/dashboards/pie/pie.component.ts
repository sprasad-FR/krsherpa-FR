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
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss'],
  providers: [DateToLocalPipe],
})
export class pieComponent implements OnInit {
 
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


  getExpCounts(id: any) {
    //"5a27db8fd7d1377e69ed21e9" sanya
    const filters = new Map();
    const filter = {
      where: {},
    };
    //  debugger
    id = "5a27db8fd7d1377e69ed21e9";
    //  let start=new Date().getFullYear().toString()+"-"+new Date().getMonth().toString()+"-"+"01"; 
    //let  end=new Date().getFullYear().toString()+"-"+new Date().getMonth().toString()+"-"+new Date().getDay().toString()
    let start = "2010-01-01";

    let end = "2023-01-31"

  }

  invalue: any;
  // valnum :any;
  ngOnInit(): void {

   

  
    // this._simpleDonutChart('["--vz-primary", "--vz-warning", "--vz-info"]');

    this._portfolioChart('["#3be618", "#188be6", "#3f5efb", "--vz-success"]');
 


  }

  

// chart page :-
       



 private _portfolioChart(colors:any) {


  /*
  console.log('getrgnCnt xx', this.ExpertRegionCount.find(x=>x.Region==='APAC'));

 this.rgnarry.push(this.ExpertRegionCount.find((x)=>x.Region=='APAC').count)

 let v1= this.ExpertRegionCount.find(x=>x.Region=='APAC')['count'];
 let v2= this.getrgnCnt('EMEA');
 let v3= this.getrgnCnt('AMERICAS') 

 
  console.log('getrgnCnt', this.rgnarry);
*/
//series: this.yAxisData,
//labels: this.xAxisData,
//colors: this.colors,

console.log(this.xAxisData)

  colors = this.colors   //this.getChartColorsArray(colors);
  this.portfolioChart = {
    series: this.yAxisData, //[Contacted,Recruited,InProgress],
    labels: this.xAxisData, //["Contacted", "Recruited", "In Progress"],
    legend: {
      position: "bottom",
      formatter: function(val:any, opts:any) {
        return val + " - " + opts.w.globals.series[opts.seriesIndex];
      }},
    chart: {
        type: "pie",
        height: 208,
       // background:'linear-gradient(185deg, rgba(179,233,240,1) 0%, rgba(49,66,244,1) 100%)',
       /*  events: {
        

         
        

          dataPointSelection: (event:any, chartContext:any, config:any) =>{
           // alert(config.w.config.labels[config.dataPointIndex]);
            

           this.OverviewChart.series=  [{
            name: 'Experts Count',
            type: 'bar',
            data: []
        }];
            let arr= this.ExpertRegion.filter(x=>x.mgrid=='5fbb2bf997ccc319db183148')
var s=config.w.config.labels[config.dataPointIndex];

           // let arr= this.ExpertRegion.filter(x=>x.region==config.w.config.labels[config.dataPointIndex])

if (s=='Contacted')
{
           
            console.log('arr', arr);
            var resultx = arr.map((a: { name: any; }) => a.name);

            var resulty = arr.map((a: { conCount: any; }) => a.conCount);

            console.log('resultx', resultx);
            console.log('resulty', resulty);

            this._OverviewChart('["--vz-primary", "--vz-warning", "--vz-success"]',resultx,resulty );

}
else if (s=='Recruited')
{
           
            console.log('arr', arr);
            var resultx = arr.map((a: { name: any; }) => a.name);

            var resulty = arr.map((a: { recCount: any; }) => a.recCount);

            console.log('resultx', resultx);
            console.log('resulty', resulty);

            this._OverviewChart('["--vz-primary", "--vz-warning", "--vz-success"]',resultx,resulty );

}
          }}  
          

  private GetProfitability(colors:any,x:any[],y:any[]) {

    colors= '[ "#1E90FF", "#1E90FF"]'

    colors = this.getChartColorsArray(colors);

   


    this.OverviewChartp={
      series: [{
          name: 'TRR',
          type: 'bar',
          data: y
      }],
      chart: {
          height: 150,
          type: 'line',
          //background:'linear-gradient(185deg, rgba(179,233,240,1) 0%, rgba(49,66,244,1) 100%)',
         
       //  background:'linear-gradient(22deg, rgba(37,33,41,1) 0%, rgba(179,82,179,1) 49%, rgba(191,175,179,1) 100%)',
         
        toolbar: {
              show: false,
          },
          events: {
            dataPointSelection: (event:any, chartContext:any, config:any) =>{
            //  alert(chartContext);
              console.log(chartContext, config);
            }},
      },
      stroke: {
          curve: 'smooth',
          dashArray: [0, 3, 0],
          width: [0,1, 0],
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
          categories: x,
          axisTicks: {
              show: false
          },
          axisBorder: {
              show: false
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
     
      colors: colors, 
      tooltip: {
      shared: true,
      y: [{
          formatter: function (y:any) {
            if(typeof y !== "undefined") {
              return  y.toFixed(0);
            }
            return y;
            
          }
        }, {
          formatter: function (y:any) {
            if(typeof y !== "undefined") {
              return   "$" + y.toFixed(2) + "k";
            }
            return y;
            
          }
        }, {
          formatter: function (y:any) {
            if(typeof y !== "undefined") {
              return y.toFixed(0);
            }
            return y;
            
          }
        }]
      }
    };

  }


          
          ,
    }, */
    plotOptions: {
        pie: {
            offsetX: 0,
            offsetY: 0,
            
              dataLabels: {
                offset: -5,
              },
            
        },
    },
    dataLabels: {
        enabled: true,
        formatter: function (val:any, opts:any) {
          return opts.w.config.series[opts.seriesIndex]
      },
    },   
    yaxis: {
        labels: {
            formatter: function (value:any) {
                return "" + value ;
            },
          
        },
       
    },
    value: {
      show: true,
      fontSize: '16px',
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontWeight: 400,
      color: 'black',
      offsetY: 16,
      formatter: function (val:any) {
        return val
      }
    },
    stroke: {
        lineCap: "round",
        width: 0
    },
    colors: colors
  }
}

 }





}














