import { Component, OnInit, ViewChild } from '@angular/core';
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


@Component({
  selector: 'app-plDashboard',
  templateUrl: './pldb.component.html',
  styleUrls: ['./pldb.component.scss'],
  providers: [DateToLocalPipe],
})

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

export class plDashboardComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  statData!: any;
  statDatac!:any;
  OverviewChart: any;
  OverviewChart1: any;
  OverviewChart11: any;
  OverviewChartprj: any;
  OverviewChartevnt: any;
    OverviewChart1e1: any;
  OverviewChart110: any;
  OverviewChartp: any;
  creatorsData!:any;     //creatorsModel[];
  ActiveProjects: any;
  MyTask: any;
  TeamMembers: any;
  ydata:any;
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

clientsforall: any;
expertstatus:any;
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
 subpnlPrevdayData:any;completedCounts
 subpnlPrevMonthData:any;
 
 subpnlProfitCurMonthData:any;
 subpnlProfitPrevdayData:any;
 subpnlProfitPrevMonthData:any;
 defaultFormat = 'DD MMM yyy';
 
 
 RMCurMonthData:any;
 RMcurdayData:any;
 salesleadsforall: any;
 
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
    ) {

      this.whoaim = JSON.parse(sessionStorage.getItem('user')!); 

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

  mySelectedDates: any[] = [];


  



/*
var date = new Date(), y = date.getFullYear(), m = date.getMonth();
var firstDay = new Date(y, m, 1);
var lastDay = new Date(y, m + 1, 0);



*/
 evedt:any[]=[];
 eventxdata:any[]=[];
 eventydata:any[]=[];

 private async geteventchart() {


  let filter = {
    "startDate":this.firstDay,
    "endDate": this.lastDay,
    "subPnLId":"5981b354af00822a984768b6" ,
    "region "  : "APAC"
  }
   var apacev;

   apacev= await this.eventcount4periodBySpl(filter,'APAC') 

   filter = {
    "startDate": this.firstDay,
    "endDate":  this.lastDay,
    "subPnLId":"59de091ab209590806c49166",
    "region "  : "AMERICAS"  }
   var apacev1;

   apacev1=await this.eventcount4periodBySpl(filter,'AMERICAS')

   filter = {
    "startDate": this.firstDay,
    "endDate":  this.lastDay,
    "subPnLId":"5aeff14beeca133f51d9b74f",
    "region "  : "EMEA" }
   var apacev2;

   apacev2=await this.eventcount4periodBySpl(filter,'EMEA')

  

 }

cdata:any={};
eventcnt=0;



   private  eventcount4periodBySpl(datafilter,region) {



/*
    let filter = {
      "startDate": "2023-05-01",
      "endDate": new Date,
      "subPnLId":"5bdfc4f21d10940605ee7992"   // APAC
  }  */
  let filter=datafilter;

  
  //get number of expected event by key accmanager id for a period
    fetch('https://middle.krsherpa.com/dashboard/eventcount4periodBySpl', {
      method: "POST",
      body: JSON.stringify(filter),
      headers: { 
        "Content-Type": "application/json",
      },
    }
    ).then(r => r.json()).then(result => {
      
      this.eventcnt=this.eventcnt+1
   console.log(result)

  var rr= {"region":region,
result:result
}

   this.evedt.push(rr)

  


if ( this.eventcnt>2)
{
//this.eventxdata=['APAC',] 

console.log(this.evedt)

const regions = [];
const completedCounts = [];
const upcomingCounts = [];

this.evedt.forEach((entry) => {
  const { region, result } = entry;
  const { counts } = result;

  regions.push(region.toString());

  const completedCount = counts.find((item) => item._id === "Completed");
  const completed = completedCount ? completedCount.count : 0;
  completedCounts.push(completed);

  const upcomingCount = counts.find((item) => item._id === "Upcoming");
  const upcoming = upcomingCount ? upcomingCount.count : 0;
  upcomingCounts.push(upcoming);
});

console.log("Regions 1:", regions);
console.log("Completed Counts:", completedCounts);
console.log("Upcoming Counts:", upcomingCounts);





this.eventydata=[
  {
    name: 'Completed',
    data: completedCounts,
  },
  {
    name: 'Upcoming',
    data: upcomingCounts,
  },
];

this.eventxdata=regions;

console.log("this.eventxdata 1:", this.eventxdata);



this.drawchart();

}







    },
      (error: any) => {
        this.isLoading = false;
      }
    );
  
  }



  drawchartprj()
  {

   // OverviewChartprj: any;
   // OverviewChartevnt: any;
   /*
   prjcountE :any;
   prjcountA :any;
   prjcountUS :any;

   prjExpectedEventcountE :any;
   prjExpectedEventcountA :any;
   prjExpectedEventcountUS :any;
*/

   var reg=["AMERICAS","APAC","EMEA"]
var  seris=[
    {
      name: 'project count',
      data: [this.prjcountUS["count"],this.prjcountA["count"],this.prjcountE["count"]],
    }
  ];



    this.OverviewChartprj = 

      {
        chart: {
          type: 'bar',
          height: 250,
          width: '100%',
          toolbar: {
            show: false
          }
        },
        series: seris,
        xaxis: {
          categories: reg,
          labels: {
            style: {
              colors: ['#333'],
              fontSize: '12px'
            }
          }
        },
        yaxis: {
          labels: {
            style: {
              colors: '#333',
              fontSize: '12px'
            }
          }
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: false,
            distributed: false,
            columnWidth: '20%', // Adjust this value as desired
            maxBarWidth: 50, // Adjust this value as desired
          }
        },
        dataLabels: {
          enabled: false
        },
        colors: ['#1c77d2','#72c7cb','#6357a0'],
        grid: {
          borderColor: '#f1f1f1',
          padding: {
            left: 10,
            right: 10
          }
        }
      };



  }


  drawchartevnt()
  {

   // OverviewChartprj: any;
   // OverviewChartevnt: any;

 /*
   prjcountE :any;
   prjcountA :any;
   prjcountUS :any;

   prjExpectedEventcountE :any;
   prjExpectedEventcountA :any;
   prjExpectedEventcountUS :any;
*/
debugger

var reg=["AMERICAS","APAC","EMEA"]
var  seris=[
    {
      name: 'Expected Events count',
      data: [this.prjExpectedEventcountUS,this.prjExpectedEventcountA,this.prjExpectedEventcountE],
    }
  ];

  console.log(this.prjExpectedEventcountUS,this.prjExpectedEventcountA,this.prjExpectedEventcountE)



    this.OverviewChartevnt = 
      {
        chart: {
          type: 'bar',
          height: 250,
          width: '100%',
          toolbar: {
            show: false
          }
        },
        series: seris,
        xaxis: {
          categories: reg,
          labels: {
            style: {
              colors: ['#333'],
              fontSize: '12px'
            }
          }
        },
        yaxis: {
          labels: {
            style: {
              colors: '#333',
              fontSize: '12px'
            }
          }
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: false,
            distributed: false,
            columnWidth: '20%', // Adjust this value as desired
            maxBarWidth: 50, // Adjust this value as desired
          }
        },
        dataLabels: {
          enabled: false
        },
        colors: ['#1c77d2','#72c7cb','#6357a0','#213f98'],
        grid: {
          borderColor: '#f1f1f1',
          padding: {
            left: 10,
            right: 10
          }
        }
      };



  }

  drawchart()
  {

  

    this.OverviewChart11 = 

      {
        chart: {
          type: 'bar',
          height: 250,
          width: '100%',
          toolbar: {
            show: false
          }
        },
        series: this.eventydata,
        xaxis: {
          categories: this.eventxdata,
          labels: {
            style: {
              colors: '#091F82',
              fontSize: '11px'
            }
          }
        },
        yaxis: {
          labels: {
            style: {
              colors: '#091F82',
              fontSize: '11px'
            }
          }
        },
        plotOptions: {
          bar: {
            borderRadius: 5,
            horizontal: false,
            distributed: false,
            columnWidth: '70%', // Adjust this value as desired
            maxBarWidth: 50, // Adjust this value as desired
          }
        },
        dataLabels: {
          enabled: true
        },
        colors: ['#4085ec','#4cb5bd'],
        grid: {
          borderColor: '#f1f1f1',
          padding: {
            left: 10,
            right: 10
          }
        }
      };



  }






  drawchartold()
  {

  

    this.OverviewChart11 = {



      series: this.eventydata,
      chart: {
        height: 200,
        type: 'bar',
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
     
      markers: {
        size: [0, 4, 0],
        strokeWidth: 2,
        hover: {
          size: 4,
        }
      },
      xaxis: {
        categories: this.eventxdata,
        //  ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        axisTicks: {
          show: false
        },
        axisBorder: {
          show: true
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
          },
          axisBorder: {
            show: true,
            color: '#78909C',
            offsetX: 0,
            offsetY: 0
        },
        },
        yaxis: {
          lines: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: '#78909C',
            offsetX: 0,
            offsetY: 0
        },
        labels: {
          show: true,
          align: 'right',
          minWidth: 0,
          maxWidth: 160,
          style: {
              colors: ['black'],
              fontSize: '12px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 400,
              cssClass: 'apexcharts-yaxis-label',
          },
        },
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

      colors: ['#1c77d2', '#72c7cb', '#72c7cb'],
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

  private  projectcount4periodBySpl(datafilter,region) {



    /*
        let filter = {
          "startDate": "2023-05-01",
          "endDate": new Date,
          "subPnLId":"5bdfc4f21d10940605ee7992"   // APAC
      }  */
      let filter=datafilter;
    
      
      //get number of expected event by key accmanager id for a period
        fetch('https://middle.krsherpa.com/dashboard/eventcount4periodBySpl', {
          method: "POST",
          body: JSON.stringify(filter),
          headers: { 
            "Content-Type": "application/json",
          },
        }
        ).then(r => r.json()).then(result => {
          
          this.eventcnt=this.eventcnt+1
       console.log(result)
    
      var rr= {"region":region,
    result:result
    }
    
       this.evedt.push(rr)
    
      
    
    
    if ( this.eventcnt>2)
    {
    //this.eventxdata=['APAC',] 
    
    console.log(this.evedt)
    
    const regions = [];
    const completedCounts = [];
    const upcomingCounts = [];
    
    this.evedt.forEach((entry) => {
      const { region, result } = entry;
      const { counts } = result;
    
      regions.push(region.toString());
    
      const completedCount = counts.find((item) => item._id === "Completed");
      const completed = completedCount ? completedCount.count : 0;
      completedCounts.push(completed);
    
      const upcomingCount = counts.find((item) => item._id === "Upcoming");
      const upcoming = upcomingCount ? upcomingCount.count : 0;
      upcomingCounts.push(upcoming);
    });
    
    console.log("Regions 1:", regions);
    console.log("Completed Counts:", completedCounts);
    console.log("Upcoming Counts:", upcomingCounts);
    
    
    
    
    
    this.eventydata=[
      {
        name: 'Completed',
        data: completedCounts,
      },
      {
        name: 'Upcoming',
        data: upcomingCounts,
      },
    ];
    
    this.eventxdata=regions;
    
    console.log("this.eventxdata 1:", this.eventxdata);
    
    
    
    this.drawchart();
    
    }
     
    
        },
          (error: any) => {
            this.isLoading = false;
          }
        );
      
      }
    

      expertcntresult: any;

      async expcount(filter: any) {

        console.log('expcount', filter)
    
        await fetch('https://middle.krsherpa.com/dashboard/Expertcount4POClisteach', {
    
          method: "POST",
          body: JSON.stringify(filter),
          headers: {
    
            "Content-Type": "application/json",
    
          },
        })
          .then(r => r.json()).then(result => {
    
            console.log('expcount', result)
    
    
            // result.emp = filter.emp;
    
            //console.log(filter.emp)
    
            //  this.EventcountCnt.push(result)
    
            this.expertcntresult = result;
    
            return (result)
    
    
          });
    
        return null
    
      }




      getTeamexperts4EMEA() {

        let filter = {
          "emps":"60e16f74f55a3e6edbcd4de4,642d5ab7c569d7367593ca88,62e62b11e50d9d1435e0c680,645331e07f8cd62ba8fc68d5"
        }

        const userIdsE = this.getUserIdsByRegion(this.empsByRegion, "EMEA");


        const idss = userIdsE.join(",");

        filter = {  "emps":idss}
        console.log('userIdsE',idss)

        // debugger
      
        fetch('https://middle.krsherpa.com/dashboard/Expertcount4POClisteach', {
      
          method: "POST",
          body: JSON.stringify(filter),
          headers: {
      
            "Content-Type": "application/json",
      
          },
        })
        .then(r => r.json()).then(result => {
          console.log(result)
          
          var xarry = [];
          var Recruitedarray = [];
          var Recruitedarray1= [];
          var Contactedarray1= [];
          var Contactedarray = [];
         
          console.log("xarry"+xarry); 
      
          for (let index = 0; index < result.length; index++) {       
            const element = result[index];
            xarry.push(result._id); 
            console.log(xarry)
            var totalRecruited = 0;
            var totalContacted = 0;
            var Recruited=0;
            var Contacted=0;
          for (let index = 0; index < element.statusCounts.length; index++) {
            const element1 = element.statusCounts[index];
            console.log("element2",element1);
            if (element1.status =="Recruited") {
              Recruited=element1.count;
              totalRecruited += element1.count;
              //console.log(totalRecruited)
            }
            if (element1.status =="Contacted") {
              Contacted=element1.count;
              totalContacted += element1.count;
              //console.log(Contacted)
            }
           
          }
          Recruitedarray.push(Recruited)
          Contactedarray.push(Contacted)
      
          Recruitedarray1.push(totalRecruited);
          Contactedarray1.push(totalContacted);
          
          }
         
          var sumRecruited = Recruitedarray1.reduce((a, b) => a + b, 0);
          //console.log("Sum of Recruited: ", sumRecruited);
      
          var sumContacted = Contactedarray1.reduce((a, b) => a + b, 0);
          //console.log("Sum of Recruited: ", sumContacted);
      
          const names = result.map(item =>(item._id));
          
         //const names = result.map(item => this.getempname1(item._id));
         console.log(names[0])
          const name = result.map(item => item.statusCounts);
          //console.log("names"+names)
          //console.log(name)
           
          const totalsum=[sumRecruited,sumContacted];
          const name1=["Recruited","Contacted"]
          
      
          var series = [
            {
            name: 'count',
            type: 'bar',
            data: Recruitedarray,
          },
          {
            name: 'status',
            type: 'bar',
            data: Contactedarray,
             distributed: true
          },
        ]
      
          var x =  names
      
      
          this._myexperty('["#1c77d2", "#72c7cb", "#6357a0"]', totalsum, name1);
          console.log("x value"+ x)
      
        },
          (error: any) => {
            this.isLoading = false;
          }
        );
      }    
      Expertcount4POClisteach:any;

      private _myexperty(colors: any, x: any, y: any) {
        //console.log("Recruited",x)
        //console.log("Contacted",y)
        colors = this.getChartColorsArray(colors);
        this.Expertcount4POClisteach = {
          series: x,
          labels: y,
          chart: {
            type: "pie",
            height: 250,
          },
          plotOptions: {
            pie: {
              donut: {
                size: "76%",
              },
            },
          },
          dataLabels: {
            enabled: false,
          },
          legend: {
            show: false,
            position: 'bottom',
            horizontalAlign: 'center',
            offsetX: 0,
            offsetY: 0,
            markers: {
              width: 20,
              height: 6,
              radius: 2,
            },
            itemMargin: {
              horizontal: 12,
              vertical: 0
            },
          },
          stroke: {
            width: 0
          },
          yaxis: {
            labels: {
              formatter: function (value: any) {
                return value + " " + " Experts";
              }
            },
            tickAmount: 4,
            min: 0
          },
          colors: colors
        };
      }
      




      getTeamexperts4APAC() {

        let filter = {
          "emps":"60e16f74f55a3e6edbcd4de4,642d5ab7c569d7367593ca88,62e62b11e50d9d1435e0c680,645331e07f8cd62ba8fc68d5"
        }

        const userIdsE = this.getUserIdsByRegion(this.empsByRegion, "APAC");


        const idss = userIdsE.join(",");

        filter = {  "emps":idss}
        console.log('userIdsE',idss)

        // debugger
      
        fetch('https://middle.krsherpa.com/dashboard/Expertcount4POClisteach', {
      
          method: "POST",
          body: JSON.stringify(filter),
          headers: {
      
            "Content-Type": "application/json",
      
          },
        })
        .then(r => r.json()).then(result => {
          console.log(result)
          
          var xarry = [];
          var Recruitedarray = [];
          var Recruitedarray1= [];
          var Contactedarray1= [];
          var Contactedarray = [];
         
          console.log("xarry"+xarry); 
      
          for (let index = 0; index < result.length; index++) {       
            const element = result[index];
            xarry.push(result._id); 
            console.log(xarry)
            var totalRecruited = 0;
            var totalContacted = 0;
            var Recruited=0;
            var Contacted=0;
          for (let index = 0; index < element.statusCounts.length; index++) {
            const element1 = element.statusCounts[index];
            console.log("element2",element1);
            if (element1.status =="Recruited") {
              Recruited=element1.count;
              totalRecruited += element1.count;
              //console.log(totalRecruited)
            }
            if (element1.status =="Contacted") {
              Contacted=element1.count;
              totalContacted += element1.count;
              //console.log(Contacted)
            }
           
          }
          Recruitedarray.push(Recruited)
          Contactedarray.push(Contacted)
      
          Recruitedarray1.push(totalRecruited);
          Contactedarray1.push(totalContacted);
          
          }
         
          var sumRecruited = Recruitedarray1.reduce((a, b) => a + b, 0);
          //console.log("Sum of Recruited: ", sumRecruited);
      
          var sumContacted = Contactedarray1.reduce((a, b) => a + b, 0);
          //console.log("Sum of Recruited: ", sumContacted);
      
          const names = result.map(item =>(item._id));
          
         //const names = result.map(item => this.getempname1(item._id));
         console.log(names[0])
          const name = result.map(item => item.statusCounts);
          //console.log("names"+names)
          //console.log(name)
           
          const totalsum=[sumRecruited,sumContacted];
          const name1=["Recruited","Contacted"]
          
      
          var series = [
            {
            name: 'count',
            type: 'bar',
            data: Recruitedarray,
          },
          {
            name: 'status',
            type: 'bar',
            data: Contactedarray,
             distributed: true
          },
        ]
      
          var x =  names
      
      
          this._myexpertyAPAC('["#1c77d2", "#72c7cb", "#6357a0"]', totalsum, name1);
          console.log("x value"+ x)
      
        },
          (error: any) => {
            this.isLoading = false;
          }
        );
      }    
      Expertcount4POClisteachAPAC:any;

      private _myexpertyAPAC(colors: any, x: any, y: any) {
        //console.log("Recruited",x)
        //console.log("Contacted",y)
        colors = this.getChartColorsArray(colors);
        this.Expertcount4POClisteachAPAC = {
          series: x,
          labels: y,
          chart: {
            type: "pie",
            height: 250,
          },
          plotOptions: {
            pie: {
              donut: {
                size: "76%",
              },
            },
          },
          dataLabels: {
            enabled: false,
          },
          legend: {
            show: false,
            position: 'bottom',
            horizontalAlign: 'center',
            offsetX: 0,
            offsetY: 0,
            markers: {
              width: 20,
              height: 6,
              radius: 2,
            },
            itemMargin: {
              horizontal: 12,
              vertical: 0
            },
          },
          stroke: {
            width: 0
          },
          yaxis: {
            labels: {
              formatter: function (value: any) {
                return value + " " + " Experts";
              }
            },
            tickAmount: 4,
            min: 0
          },
          colors: colors
        };
      }
      


      getTeamexperts4US() {

        let filter = {
          "emps":"60e16f74f55a3e6edbcd4de4,642d5ab7c569d7367593ca88,62e62b11e50d9d1435e0c680,645331e07f8cd62ba8fc68d5"
        }

        const userIdsE = this.getUserIdsByRegion(this.empsByRegion, "AMERICAS ");


        const idss = userIdsE.join(",");

        filter = {  "emps":idss}
        console.log('userIdsE',idss)

        // debugger
      
        fetch('https://middle.krsherpa.com/dashboard/Expertcount4POClisteach', {
      
          method: "POST",
          body: JSON.stringify(filter),
          headers: {
      
            "Content-Type": "application/json",
      
          },
        })
        .then(r => r.json()).then(result => {
          console.log(result)
          
          var xarry = [];
          var Recruitedarray = [];
          var Recruitedarray1= [];
          var Contactedarray1= [];
          var Contactedarray = [];
         
          console.log("xarry"+xarry); 
      
          for (let index = 0; index < result.length; index++) {       
            const element = result[index];
            xarry.push(result._id); 
            console.log(xarry)
            var totalRecruited = 0;
            var totalContacted = 0;
            var Recruited=0;
            var Contacted=0;
          for (let index = 0; index < element.statusCounts.length; index++) {
            const element1 = element.statusCounts[index];
            console.log("element2",element1);
            if (element1.status =="Recruited") {
              Recruited=element1.count;
              totalRecruited += element1.count;
              //console.log(totalRecruited)
            }
            if (element1.status =="Contacted") {
              Contacted=element1.count;
              totalContacted += element1.count;
              //console.log(Contacted)
            }
           
          }
          Recruitedarray.push(Recruited)
          Contactedarray.push(Contacted)
      
          Recruitedarray1.push(totalRecruited);
          Contactedarray1.push(totalContacted);
          
          }
         
          var sumRecruited = Recruitedarray1.reduce((a, b) => a + b, 0);
          //console.log("Sum of Recruited: ", sumRecruited);
      
          var sumContacted = Contactedarray1.reduce((a, b) => a + b, 0);
          //console.log("Sum of Recruited: ", sumContacted);
      
          const names = result.map(item =>(item._id));
          
         //const names = result.map(item => this.getempname1(item._id));
         console.log(names[0])
          const name = result.map(item => item.statusCounts);
          //console.log("names"+names)
          //console.log(name)
           
          const totalsum=[sumRecruited,sumContacted];
          const name1=["Recruited","Contacted"]
          
      
          var series = [
            {
            name: 'count',
            type: 'bar',
            data: Recruitedarray,
          },
          {
            name: 'status',
            type: 'bar',
            data: Contactedarray,
             distributed: true
          },
        ]
      
          var x =  names
      
      
          this._myexpertyUS('["#884EA0", "#2471A3", "#2E4053"]', totalsum, name1);
          console.log("x value"+ x)
      
        },
          (error: any) => {
            this.isLoading = false;
          }
        );
      }    
      Expertcount4POClisteachUS:any;

      private _myexpertyUS(colors: any, x: any, y: any) {
        //console.log("Recruited",x)
        //console.log("Contacted",y)
        colors = this.getChartColorsArray(colors);
        this.Expertcount4POClisteachUS = {
          series: x,
          labels: y,
          chart: {
            type: "pie",
            height: 250,
          },
          plotOptions: {
            pie: {
              donut: {
                size: "76%",
              },
            },
          },
          dataLabels: {
            enabled: false,
          },
          legend: {
            show: false,
            position: 'bottom',
            horizontalAlign: 'center',
            offsetX: 0,
            offsetY: 0,
            markers: {
              width: 20,
              height: 6,
              radius: 2,
            },
            itemMargin: {
              horizontal: 12,
              vertical: 0
            },
          },
          stroke: {
            width: 0
          },
          yaxis: {
            labels: {
              formatter: function (value: any) {
                return value + "" + " Experts";
              }
            },
            tickAmount: 4,
            min: 0
          },
          colors: colors
        };
      }
      

  barchar1: any;
  yAxisbarData:any;
  xAxisbarData:any;
  colors:any=["#1E90FF", "#00008B", "#1E90FF"];





  drawbarchart()
  {


    this.barchar1 = {



      series: [{
        name: 'Test',
        type: 'bar',
        data: this.yAxisbarData,
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
        categories: this.xAxisbarData,
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

   prjcountE :any;
   prjcountA :any;
   prjcountUS :any;

   prjExpectedEventcountE :any;
   prjExpectedEventcountA :any;
   prjExpectedEventcountUS :any;

  empsByRegion:any;
  
 emplist:any[]=[];
   empByRegion() {

    let filter = {
      "startDate": "2023-04-03",
      "endDate": new Date,
      "subPnLId":"59de091ab209590806c49166"
  }
  //get number of expected event by key accmanager id for a period
    fetch('https://middle.krsherpa.com/dashboard/empByRegion', {
      method: "POST",
      body: JSON.stringify(filter),
      headers: { 
        "Content-Type": "application/json",
      },
    }
    ).then(r => r.json()).then(result => {
      
  this.empsByRegion=result;


   console.log(result)

// Extract the employees list
const employees = [];
this.empsByRegion.forEach(item => {
  this.emplist.push(...item.employees);
});

this.getTeamexperts4EMEA()

this.getTeamexperts4APAC()

this.getTeamexperts4US()
// Print the employees list



   const userIdsE = this.getUserIdsByRegionAndDesignation(this.empsByRegion, "EMEA", 7);
   const userIdsA = this.getUserIdsByRegionAndDesignation(this.empsByRegion, "APAC", 7);
   const userIdsUS = this.getUserIdsByRegionAndDesignation(this.empsByRegion, "AMERICAS ", 7);

   console.log(userIdsE)


   let filter = {
    "startDate":  this.firstDay ,
    "endDate":this.lastDay,
    "emps":userIdsE.join(',')
}
   fetch('https://middle.krsherpa.com/dashboard/projectcount4periodByemplist', {
    method: "POST",
    body: JSON.stringify(filter),
    headers: { 
      "Content-Type": "application/json",
    },
  }
  ).then(r => r.json()).then(async result => {
    
this.prjcountE=result[0];

await  this.KACWiseExpEventCnt(userIdsE.join(','),'E')




//prjcountE :any;
//prjcountA :any;
//prjcountUS :any;


let filter = {
  "startDate":  this.firstDay ,
  "endDate": this.lastDay,
  "emps":userIdsA.join(',')
}
 fetch('https://middle.krsherpa.com/dashboard/projectcount4periodByemplist', {
  method: "POST",
  body: JSON.stringify(filter),
  headers: { 
    "Content-Type": "application/json",
  },
}
).then(r => r.json()).then(async resulta => {
  
this.prjcountA=resulta[0];

//prjcountE :any;
//prjcountA :any;
//prjcountUS :any;
await this.KACWiseExpEventCnt(userIdsA.join(','),'A')


let filter = {
  "startDate":  this.firstDay ,
  "endDate": this.lastDay,
  "emps":userIdsUS.join(',')
}
 fetch('https://middle.krsherpa.com/dashboard/projectcount4periodByemplist', {
  method: "POST",
  body: JSON.stringify(filter),
  headers: { 
    "Content-Type": "application/json",
  },
}
).then(r => r.json()).then(async resultu => {
  
this.prjcountUS=resultu[0];

await this.KACWiseExpEventCnt(userIdsUS.join(','),'U')


this.drawchartprj();

console.log('prjcountE',this.prjcountE)
console.log('prjcountA',this.prjcountA)
console.log('prjcountUS',this.prjcountUS)


},
(error: any) => {
this.isLoading = false;
}
);





},
(error: any) => {
this.isLoading = false;
}
);





},
(error: any) => {
  this.isLoading = false;
}
);



    },
      (error: any) => {
        this.isLoading = false;
      }
    );
  
  }

   getIdsByReportingManagerId(data, reportingManagerId) {
    let result = [];
  
    data.forEach(item => {
      if (item.repotingManagerId === reportingManagerId) {
        result.push(item._id);
        result = result.concat(this.getIdsByReportingManagerId(data, item._id));
      }
    });
  
    return result;
  }


//get number of expected event by key accmanager id for a period
private KACWiseExpEventCnt(emplst,type) {

  let filter = {
    "startDate":  this.firstDay ,
    "endDate": this.lastDay,
    "emps":emplst
  }

  fetch('https://middle.krsherpa.com/dashboard/KAClistExpEventCnt', {
    method: "POST",
    body: JSON.stringify(filter),
    headers: { 
      "Content-Type": "application/json",
    },
  }
  ).then(r => r.json()).then(result => {
    

console.log(result)

if (type=="A")
{
  this.prjExpectedEventcountA=result[0]?.totalExpectedNumEvent
}
else if (type=="E")
{
  this.prjExpectedEventcountE=result[0]?.totalExpectedNumEvent
}
else if (type=="U")
{
  this.prjExpectedEventcountUS=result[0]?.totalExpectedNumEvent
  this.drawchartevnt();
}



return result;



  },
    (error: any) => {
      this.isLoading = false;
    }
  );

}



getUserIdsByRegion(data, region) {
  const employees = data.find(item => item._id === region)?.employees;
  if (!employees) {
    return [];
  }

  return employees   
    .map(employee => employee.userId);
}



   getUserIdsByRegionAndDesignation(data, region, designation) {
    const employees = data.find(item => item._id === region)?.employees;
    if (!employees) {
      return [];
    }
  
    return employees
      .filter(employee => employee.designation === designation)
      .map(employee => employee.userId);
  }

  firstDay:any;
  lastDay:any;

  ngOnInit(): void {

this.getClientlist() 


    var date = new Date(),
     y = date.getFullYear(),
      m = date.getMonth();
    this.firstDay = new Date(y, m, 1);
    this.lastDay = new Date(y, m + 1, 0);

  
 this.empByRegion();

 this.geteventchart();

const region = "EMEA";
const designation = 11;
/*

*/
this.getExpCounts("60a2b8466fc81f44dca3c215");




this.ydata=[
  {
    name: 'Series 1',
    data: [30, 40, 45, 50, 49],
  },
  {
    name: 'Series 2',
    data: [23, 12, 54, 61, 32],
  },
];
//this.boxtext1='Active Projects'
//this.boxvalue1=25;


//60a2b8466fc81f44dca3c215 RM abani

//this._OverviewChart1('["#1E90FF", "#00008B", "#1E90FF"]');

  

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
    
    this.clientsforallfetch()
this.salesleadsforallfetch();
this.Expertsstatus()

   
   

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
          height: 250,
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




  private clientsforallfetch() {
    let filter = {
      'text': "text"
    }

    // console.log(nid);

    fetch('https://middle.krsherpa.com/dashboard/clientsforall', {
      method: "POST",
      body: JSON.stringify(filter),
      headers: {
        "Content-Type": "application/json",
      },

    }
    ).then(r => r.json()).then(result => {
      // Result now contains the response text, do what you want...
      debugger
      console.log('data is:', result);
      const ncount1 = result.map(item => item.count);
      const nid1 = result.map(item => item._id || 'Non MSA');
      ncount1[1]= ncount1[1]+ncount1[2]
      ncount1.pop()
      nid1.pop()
      debugger
      console.log(ncount1);
      console.log("checking :-" + nid1);
      this._clientsforall('["#4085ec", "#4cb5bd", "#79cbf9"," #763087"]', ncount1, nid1);
    },
      (error: any) => {
        this.isLoading = false;
      }
    );

  }


  leadstatus:any;

  getstausname(id: any) {
  
    this.leadstatus= [
      { id: 1, stage: 'Contacted' },
      { id: 2, stage: 'Interested' },
      { id: 3, stage: 'In Progress' },
    { id: 4, stage: 'Converted To Client' },
    { id: 5, stage: 'Others' },
    ];
  
    //console.log(id);
    let lead = this.leadstatus?.find((x) => x.id === id);
    //console.log(reportingMgr.name)
    return lead?.stage;
  }


  private _clientsforall(colors: any, x: any, y: any,) {
    colors = this.getChartColorsArray(colors);
    this.clientsforall = {
      series: x,
      labels: y,
      chart: {
        type: "pie",
        height: 250,
      },
      plotOptions: {
        pie: {
          donut: {
            size: "76%",
          },
        },
      },
      dataLabels: {
        enabled: true,
      },
      legend: {
        show: true,
        position: 'bottom',
        horizontalAlign: 'center',
        offsetX: 0,
        offsetY: 0,
        markers: {
          width: 20,
          height: 6,
          radius: 2,
        },
        itemMargin: {
          horizontal: 12,
          vertical: 0
        },
      },
      stroke: {
        width: 0
      },
      yaxis: {
        labels: {
          formatter: function (value: any) {
            return value + " " + " ";
          }
        },
        tickAmount: 4,
        min: 0
      },
      colors: colors
    };
  }

  private salesleadsforallfetch() {
    let filter = {
      "emp": "59de091ab209590806c49166",
    }

    // console.log(nid);

    fetch('https://middle.krsherpa.com/dashboard/salesleadsforall', {
      method: "POST",
      body: JSON.stringify(filter),
      headers: {
        "Content-Type": "application/json",
      },

    }
    ).then(r => r.json()).then(result => {
      // Result now contains the response text, do what you want...
      debugger
      console.log('data is:', result);
      const ncount1 = result.map(item => item.count);

      const nid1 = result.map(item =>this.getstausname(item._id));
      debugger
      console.log(ncount1);
      console.log("checking :-" + nid1);
      this._salesleadsforall('["#4085ec", "#4cb5bd", "#79cbf9"," #763087","#fa9869"]', ncount1, nid1);
    },
      (error: any) => {
        this.isLoading = false;
      }
    );

  }

  // pie chart salesleadsforall  start :-
  private _salesleadsforall(colors: any, x: any, y: any) {
    colors = this.getChartColorsArray(colors);
    this.salesleadsforall = {
      series: x,
      labels: y,
      chart: {
        type: "pie",
        height: 250,
      },
      plotOptions: {
        pie: {
          donut: {
            size: "76%",
          },
        },
      },
      dataLabels: {
        enabled: true,
      },
      legend: {
        show: true,
        position: 'bottom',
        horizontalAlign: 'center',
        offsetX: 0,
        offsetY: 0,
        markers: {
          width: 20,
          height: 6,
          radius: 2,
        },
        itemMargin: {
          horizontal: 12,
          vertical: 0
        },
      },
      stroke: {
        width: 0
      },
      yaxis: {
        labels: {
          formatter: function (value: any) {
            return value + " " + " ";
          }
        },
        tickAmount: 4,
        min: 0
      },
      colors: colors
    };
  }



  private Expertsstatus() {
    let filter = {
      "emp": "59de091ab209590806c49166",
    }

    // console.log(nid);

    fetch('https://middle.krsherpa.com/dashboard/Expertcountwithstatus', {
      method: "POST",
      body: JSON.stringify(filter),
      headers: {
        "Content-Type": "application/json",
      },

    }
    ).then(r => r.json()).then(result => {
      // Result now contains the response text, do what you want...
      debugger
      console.log('data is:', result);
      const ncount1 = result.map(item => item.count);

      const nid1 = result.map(item =>item._id.status);
      debugger
      console.log(ncount1);
      console.log("checking :-" + nid1);
      this._Expertsstatus('["#4085ec", "#4cb5bd", "#79cbf9","#763087","#fa9869"]', ncount1, nid1);
    },
      (error: any) => {
        this.isLoading = false;
      }
    );

  }

  // pie chart salesleadsforall  start :-
  private _Expertsstatus(colors: any, x: any, y: any) {
    colors = this.getChartColorsArray(colors);
    this.expertstatus = {
      series: x,
      labels: y,
      chart: {
        type: "pie",
        height: 250,
      },
      plotOptions: {
        pie: {
          donut: {
            size: "76%",
            expandOnClick: true
          },
        },
      },
      dataLabels: {
        enabled: true,
      },
      legend: {
        show: true,
        position: 'bottom',
        horizontalAlign: 'center',
        formatter: function(val, opts) {
          var seriesIndex = opts.seriesIndex;
          var dataPointIndex = opts.dataPointIndex;
          var yValue = opts.w.config.series[seriesIndex];

          return val + ": " + yValue;
        },
        offsetX: 0,
        offsetY: 0,
        markers: {
          width: 20,
          height: 6,
          radius: 2,
        },
        itemMargin: {
          horizontal: 12,
          vertical: 0
        },
      },
      stroke: {
        width: 0
      },
      yaxis: {
        labels: {
          formatter: function (value: any) {
            return value + " " + " ";
          }
        },
        tickAmount: 4,
        min: 0
      },
      colors: colors
    };
  }



  async getClientlist() {
    this.clientList = await this.clientsService.getclmindata();
    this.getclientscount();

    console.log(this.clientList)
  }

  getclientname(id: any) {
  //  console.log(this.clientList);
  var result="";
    let client = this.clientList?.find((x) => x.id === id);
   // console.log(client?.companyName)
    var nm=client?.companyName
    if (nm)
    { 
      nm=nm.replace('(','')
      nm=nm.replace(')','')
      return nm?.toString();
    }
    else{
return "";
    }
  }


  clientcount:any;

  projectcounts:any;

  //second coloum graph start
   getclientscount() {
  
    let filter = {
      "clientId":"5d4009004b488a0d4ad2c508,5dba64118a0f8a737178cb6c,5ad58bceeeca133f51d9abbb,599ed7ff98366418de5d12bd"
    }
    // debugger
  
     fetch('https://middle.krsherpa.com/dashboard/projectlistbyclientsAll', {
  
      method: "POST",
      body: JSON.stringify(filter),
      headers: {
  
        "Content-Type": "application/json",
  
      },
    })
      .then(r => r.json()).then(result => {
        console.log("result2"+result[0])
        
       
       // result.sort(function(a.count, b.count){return b - a});

        result.sort((a, b) => {
          return  b.count-a.count;
      });

       // const names = result.map(item =>this.getclientname(item._id));
        const names = result.map(item =>this.getclientname(item._id).toString());
        const name = result.map(item => item.count);
      

        
        console.log("names"+names)
        console.log(name)
         
        this.projectcounts=result;
        
  
        var series = [
          {
          name: 'count',
          type: 'bar',
          data: name,
        }
       
      ]
  
        var x =  names
        this._OverviewChart12('["#4085ec", "#00008B", "#1E90FF"]', series, x);
  
     
  
  
      //  const namelst = result.map(item =>this.getclientname(item._id).toString());
       // const count = result.map(item => item.count);
       
        //var status = nid1[0].status
    
        
        //console.log(nid1);
        var status: string;
       
  
  
  
  
  
      },
        (error: any) => {
          this.isLoading = false;
        }
      );
  }
  
  private _OverviewChart12(colors: any, series, x) {
  
    colors = this.getChartColorsArray(colors);
  
    this.clientcount = {
      series: series,
      chart: {
        height: 400,
        type: 'bar',
       width:2500,
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
        width: [1, 1, 1],
      },
      fill: {
        opacity: [1, 0.1, 1]
      },
      markers: {
        size: [2, 4, 0],
        strokeWidth: 2,
        hover: {
          size: 4,
        }
      },
   dataLabels: {
          enabled: false,
          style: {
            colors: ['#1c77d2'], // Set the desired color for the labels (red in this case)
          },        
        
        },
      xaxis: {
        categories: x,
        axisTicks: {
          show: false 
        },
        labels:
        {
          formatter: function (y: any) {
            if (typeof y !== "undefined") {
              return y.slice(0, 15);
            }
            return y;
  
          }
        },
        axisBorder: {
          show: true
        },
        tooltip: {
          enabled: true
        }
      },
      yaxis: {
        labels: {
          rotate: -45,
          offsetY: 0,
          offsetX: -10,
        },
      },
      grid: {
        show: true,
        xaxis: {
          lines: {
            show: false,
          }       
        },
        yaxis: {
          lines: {
            show: false,
          },
          labels: {
            style: {
              colors: '#091F82',
              fontSize: '16px'
            }
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
          borderRadius: 5,
          horizontal: false,
          distributed: false,
          columnWidth: '70%', // Adjust this value as desired
          maxBarWidth: 50, // Adjust this value as desired
        }
      },
  
      colors: colors,
      tooltip: {
        shared: false,
        y: [{
          formatter: function (y: any) {           
            return y;
  
          }
        }]
      }
    };
  //prjcolChart  prjpieChart
  /*
  // Get the chart element by its id
  var chart = ApexCharts.getChartByID('prjcolChart');
  
  // Update the chart options (if needed)
  chart.updateOptions({
    // Updated chart options here
  });
  
  // Force refresh the chart
  chart.render();
  */
  
  
  
  }
  
  

}
