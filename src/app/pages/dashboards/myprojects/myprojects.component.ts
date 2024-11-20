import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import * as moment from 'moment';
import { statData,statDatac, ActiveProjects, MyTask, TeamMembers ,creatorsData, creatorsListData} from './data';
import {topCollectionModel} from '../CleintDB/CleintDB.model';
import {topCollectionData} from '../CleintDB/data';
//import {creatorsModel, creatorsListModel} from './creators.model';
import { SwiperComponent, SwiperDirective } from 'ngx-swiper-wrapper';
import { SwiperOptions } from 'swiper';
import { DateToLocalPipe } from '../../../core/pipe';
import {ClientsService} from '../../../core/services/clients.service';

import {ProjectService} from '../../../core/services/project.service';
import { UserService } from '../../../core/services/kruser.service';

import {EmployeeService} from '../../../core/services/employee.service';

import {ExpertService} from '../../../core/services/expert.service';


import {EventkrService} from '../../../core/services/krevent.service';

//import {EventkrService} from '../../../core/services/krevent.service';



/**
 * Projects Component
 */

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


@Component({
  selector: 'app-myprojects',
  templateUrl: './myprojects.component.html',
  styleUrls: ['./myprojects.component.scss'],
  providers: [DateToLocalPipe],
})
export class myprojectsComponent implements OnInit {
  products:any;
  service:any;
  onCheckboxChange:any;
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  statData!: any;
  statDatac!:any;
  OverviewChart: any;
  OverviewChart1: any;
  OverviewChart11: any;
    OverviewChart1e1: any;
  OverviewChart110: any;
  OverviewChartp: any;
  creatorsData!:any;     //creatorsModel[];
  ActiveProjects: any;
  MyTask: any;
  TeamMembers: any;
  status7: any;
  @ViewChild('scrollRef') scrollRef:any;
  topCollectionData!:topCollectionModel[];
 // clientsService:ClientsService;
 semiCircleChart: any;
//gs ------from old --------

boxtext1:any;
boxvalue1:number=0;
boxtext2:any;
boxvalue2:any;
boxtext3:any;
boxvalue3:any;
boxtext4:any;
boxvalue4:any;
boxtext5:any;
boxvalue5:any;
boxtext6:any;
boxvalue6:any;



 // bread crumb items
 //breadCrumbItems: Array<{}>;

 //barchartdata:any[3];
 barchartdata:any = [];
 barchartdata1:any = [];
 barchartevntdata:any = [];
 barchartexpdata:any = [];
   isLoading: boolean = false;
  // krExpertsList: Expert;
   clientList: any[] = [];
   salesLeadList: any[] = [];
   projectList: any[] = [];
   eventList: any[] = [];
   salesLeadContactData: any;
 //  usersArray: Users[] = [];
   //statData: any = '';
   expertStatData: any;
 
   clientId: string='';
 
   noOfProjects: number=0
   noOfSalesLead: number=0
   noOfClients: number=0
   roles: string='';
   username: any;
   loginUser: any[]= [];
   firstName: any;
   client: any;
  // clientbyuser: Clients;
   cid: any;
   whoaim: any;
   noOfEvents: any;
   projectByEmp: any[]= [];
   clientByEmp: any[]= [];
   salesLeadByEmp: any[]= [];
   eventsByEmp: any[]= [];
   userType: any;
   clientData: any;
   todaysEvent: any[]=[];
   upcomingEventList: any[]= [];
   completedEventList: any[]= [];
   cancelledEventList: any[]= [];
   stageStatusDisplay: string[]= [];
   expert: any;
   expertData: any;
   totalEarning: any;
   totalHours: any;
   clientUserData: any;
   clientUser: any;
   paymentPreference: any[]= [];
   //bankDetailsForm: FormGroup;
   hideBankDetails: boolean=false
   expertId: string='';
   clientUserById: any;
   //expertList: Expert[];
  /* pendingExp: Expert[];
   signedExp: Expert[];
   todaysEvent: any[];
   projectForClient: Project[];
   clientSales: SalesLead[];
   empList: any[];
   myteamExperts: any[];
   mypendingExp: Expert[];
   mysignedExp: Expert[];
   raByRM: any[]; */
 barid:string='';
 barid1:string='';  //
 revenue:string='';
 evnt:string='';
 exprt:string='';
 
 portfolioChart: any;
 subpnlCurMonthData:any;
 subpnlPrevdayData:any;
 subpnlPrevMonthData:any;
 
 subpnlProfitCurMonthData:any;
 subpnlProfitPrevdayData:any;
 subpnlProfitPrevMonthData:any;
 defaultFormat = 'DD MMM yyy';
 
 
 RMCurMonthData:any;
 RMcurdayData:any;
 
 
 RMProfitCurMonthData:any;
 RMProfitcurdayData:any;
 
 
 ExpertRegion:any[]=[];

 ExpertRegionCount:any[]=[];


 ClientdashData:any;
 
 concount:number=0;
 reccount:number=0;
 ripcount:number=0;
 qrycount:number=0;
 totcount:number=0;
 supcount:number=0;
 
 extotal:number=0;


 isnewTab:boolean=false;
 //@ViewChild(BarComponent) child:BarComponent;
// @ViewChild(PieComponent) piechild:PieComponent;
// @ViewChild(BarexComponent) exchild:BarexComponent;


//gs-------from old ------------


  constructor(private clientsService:ClientsService,
    private projectService:ProjectService,
     private employeeService:EmployeeService,
       private expertService:ExpertService,
      private eventService:EventkrService,  
     private readonly userService: UserService,
      private router: Router,
    ) {

     // this.whoaim = JSON.parse(sessionStorage.getItem('user'));

      this.whoaim = JSON.parse(localStorage.getItem('user'));
   }
 // roles:any;

clients:any;


  getExpCounts(id:any)
  {
//"5a27db8fd7d1377e69ed21e9" sanya
    const filters = new Map();
    const filter = {
      where: {},
    };
   // debugger
id="5a27db8fd7d1377e69ed21e9";
 //  let start=new Date().getFullYear().toString()+"-"+new Date().getMonth().toString()+"-"+"01"; 
  //let  end=new Date().getFullYear().toString()+"-"+new Date().getMonth().toString()+"-"+new Date().getDay().toString()
 let start="2010-01-01";

  let end="2023-01-31"
  
  }


  ngOnInit(): void {
   this.fetch1();
 
this.getExpCounts("60a2b8466fc81f44dca3c215");


//this.boxtext1='Active Projects'
//this.boxvalue1=25;


//60a2b8466fc81f44dca3c215 RM abani

this._OverviewChart1('["#1E90FF", "#00008B", "#1E90FF"]');

  

    /**
     * BreadCrumb
     */
        //roles:any;
        this.roles=sessionStorage['usr'];
     this.breadCrumbItems = [
      { label: 'Dashboards' },
      { label: 'Projects', active: true }
    ];
    this.topCollectionData = topCollectionData;
    /**
     * Fetches the data
     */
     
     this.statDatac=statDatac;

    // Chart Color Data Get Function
    
   
    this.subpnlCurMonthData= [{ "id":"", "GTAM ": "0", "GTC ": "0","Evntcnt":"0","Convrate":"0","AvgGP":""}];

    this.subpnlPrevdayData= [{"id":"","GTAM ": "0", "GTC ": "0","Evntcnt":"0","Convrate":"0","AvgGP":""}];
    
    this.subpnlPrevMonthData= [{"id":"","GTAM ": "0", "GTC ": "0","Evntcnt":"0","Convrate":"0","AvgGP":""}];
    
    
    this.subpnlProfitCurMonthData= [{"id":"","calls ": "0", "events": "0","revenue":"0","GP":"0"}];
    
    this.subpnlProfitPrevdayData=  [{"id":"","calls ": "0", "events": "0","revenue":"0","GP":"0"}];
    
    this.subpnlProfitPrevMonthData=  [{"id":"","calls ": "0", "events": "0","revenue":"0","GP":"0"}];
    
    
    this.subpnlCurMonthData=[];
    this.subpnlPrevdayData=[];
    this.subpnlPrevMonthData=[];
    
    this.subpnlProfitCurMonthData=[];
    this.subpnlProfitPrevdayData=[];
    this.subpnlProfitPrevMonthData=[];
    
    this.RMCurMonthData=[];
    this.RMcurdayData=[];
    this.RMProfitCurMonthData=[];
    this.RMProfitcurdayData=[];
    
    this.ClientdashData=[];



    this.creatorsData = creatorsData;

  }

  // Chart Colors Set
  private getChartColorsArray(colors:any) {
    colors = JSON.parse(colors);
    return colors.map(function (value:any) {
      var newValue = value.replace(" ", "");
      if (newValue.indexOf(",") === -1) {
        var color = getComputedStyle(document.documentElement).getPropertyValue(newValue);
            if (color) {
            color = color.replace(" ", "");
            return color;
            }
            else return newValue;;
        } else {
            var val = value.split(',');
            if (val.length == 2) {
                var rgbaColor = getComputedStyle(document.documentElement).getPropertyValue(val[0]);
                rgbaColor = "rgba(" + rgbaColor + "," + val[1] + ")";
                return rgbaColor;
            } else {
                return newValue;
            }
        }
    });
  }

  /**
 * Projects Overview
 */

  changesr()
  {

console.log('in chart');


    this.OverviewChart.series=  [{
      name: 'Experts Count',
      type: 'bar',
      data: [34, 65, 46, 68, 49, 61, 42, 44, 78, 52, 63, 67]
  }, {
      name: 'Revenue',
      type: 'area',
      data: [89.25, 98.58, 68.74, 108.87, 77.54, 84.03, 51.24, 28.57, 92.57, 42.36, 88.51, 36.57]
  }]

  }

  private _OverviewChart(colors:any,x:any[],y:any[]) {

    colors = this.getChartColorsArray(colors);



    this.OverviewChart = {
      series: [{
          name: 'Experts Count',
          type: 'bar',
          data: y
      }],
      chart: {
          height: 250,
          type: 'line',
        //  background:'linear-gradient(185deg, rgba(179,233,240,1) 0%, rgba(49,66,244,1) 100%)',
         
        // background:' linear-gradient(174deg, rgba(63,94,251,1) 0%, rgba(158,82,179,1) 50%, rgba(252,70,107,1) 100%)',
         
     // background:'linear-gradient(22deg, rgba(42,51,51,1) 0%, rgba(82,179,145,1) 62%, rgba(191,175,179,1) 100%)',
         
        
        toolbar: {
              show: false,
          },
          events: {
            dataPointSelection: (event:any, chartContext:any, config:any) =>{
           //   alert(chartContext);
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
  
   
    
    //.chart.background='linear-gradient(174deg, rgb(31, 32, 34) 0%, rgb(196, 185, 199) 50%, rgb(122, 121, 121) 100%)';
     
  }

 

  private _portfolioChart(colors:any) {


    //let arr= this.ExpertRegion.filter(x=>x.mgrid== '5fbb2bf997ccc319db183148') //'60a2b8466fc81f44dca3c215')

    let arr=[];


debugger

    let Contacted = arr.reduce(function (accumulator, item) {
      return accumulator + item.conCount;
    }, 0);


    let Recruited = arr.reduce(function (accumulator, item) {
      return accumulator + item.recCount;
    }, 0);


    let InProgress = arr.reduce(function (accumulator, item) {
      return accumulator + item.ripCount;
    }, 0);

    this.extotal=Contacted+Recruited+InProgress;


    /*
    console.log('getrgnCnt xx', this.ExpertRegionCount.find(x=>x.Region==='APAC'));

   this.rgnarry.push(this.ExpertRegionCount.find((x)=>x.Region=='APAC').count)

   let v1= this.ExpertRegionCount.find(x=>x.Region=='APAC')['count'];
   let v2= this.getrgnCnt('EMEA');
   let v3= this.getrgnCnt('AMERICAS') 

   
    console.log('getrgnCnt', this.rgnarry);
*/

    colors = this.getChartColorsArray(colors);
    this.portfolioChart = {
      series: [Contacted,Recruited,InProgress],
      labels: ["Contacted", "Recruited", "In Progress"],
      chart: {
          type: "pie",
          height: 278,
         // background:'linear-gradient(185deg, rgba(179,233,240,1) 0%, rgba(49,66,244,1) 100%)',
          events: {
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
            }},
      },
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
      legend: {
          show: true,
          position: 'bottom',
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
    };
  }



  private _OverviewChart1(colors:any) {

    colors = this.getChartColorsArray(colors);


  

    this.OverviewChart11={
      series: [{
          name: 'TRR',
          type: 'bar',
          data: [5, 8, 15, 16, 21, 25, 21, 13, 30, 20, 9, 18]
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
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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

//   click modal routing
selectedid:any;

editemp(id: any) {
 // this.submitted = false;



//const url = this._router.serializeUrl(
// this._router.createUrlTree(['/callreports']));
//window.open('#' + url, '_blank');

const urlTree: UrlTree = this.router.createUrlTree(['projectsall/project', id]);
// this.router.navigateByUrl(urlTree,);
const url: string = this.router.serializeUrl(urlTree);
window.open(url, '_blank');






  
}



















   completedlist:any=[];
   pendinglist:any=[];
// fetch start calling
private fetch1() {

  // this.projectService.getAllMin(filters).subscribe(   getAll

  let filter = {
    "empid": this.whoaim.id        //"5e5deadc98f9c9472e8762df"
  }
  // debugger

  console.log( this.whoaim.id );

  // console.log(nid);
//https//middle.krsherpa.com/dashboard/getlatest5Events4status:
  fetch('https://middle.krsherpa.com/dashboard/getlatest5Projects4status', {
    method: "POST",
    body: JSON.stringify(filter),
    headers: {

      // "Access-Control-Allow-Headers": "*", // this will allow all CORS requests
      // "Access-Control-Allow-Methods": 'OPTIONS,POST,GET', // this states the allowed methods
      "Content-Type": "application/json",
      // "timeout": "2000000" 
      //'Access-Control-Allow-Origin':'*',
      //"Accept":"*/*",
      // "mode": "no-cors",
      // this shows the expected content type
    },
    /* headers: {
        "Content-Type": "application/json",
      //  "Access-Control-Allow-Credentials": "true",
     //    "Access-Control-Allow-Methods":"GET,HEAD,OPTIONS,POST,PUT",
       //  'Access-Control-Allow-Origin':'*',
       //  "Access-Control-Allow-Headers": "Origin, Credentials, Content-Type, Access-Control-Request-Headers"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },  */
  }
  ).then(r => r.json()).then(result => {
    // Result now contains the response text, do what you want...
    debugger
    console.log('data cd:', result);
    this.completedlist=result['0'].projects;
    this.pendinglist=result['1'].projects;
    console.log('completlist data',this.completedlist);
  },
    (error: any) => {
      this.isLoading = false;
    }
  );

}


 


}
