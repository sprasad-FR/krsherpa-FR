import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { statData, statDatac, ActiveProjects, MyTask, TeamMembers, creatorsData, creatorsListData } from './data';
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
//import { Console } from 'console';

//import {EventkrService} from '../../../core/services/krevent.service';


@Component({
  selector: 'app-rmdb',
  templateUrl: './rmdb.component.html',
  styleUrls: ['./rmdb.component.scss'],
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

export class rmdbComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  statData!: any;
  statDatac!: any;
  portfolioChart: any;
  OverviewChart: any;
  OverviewChart1: any;
  OverviewChart11: any;
  OverviewChartgtam: any;
  getProjectevent: any;
  KACWiseExpEventChart: any;
  TRRCount4empEventChart: any;
  OverviewChart1e1: any;
  OverviewChart110: any;
  OverviewChartp: any;
  creatorsData!: any;     //creatorsModel[];
  ActiveProjects: any;
  MyTask: any;
  TeamMembers: any;
  status7: any;
  @ViewChild('scrollRef') scrollRef: any;
  topCollectionData!: topCollectionModel[];
  // clientsService:ClientsService;
  semiCircleChart: any;
  //gs ------from old --------

  boxtext1: any;
  boxvalue1: number = 0;
  boxtext2: any;
  boxvalue2: any;
  boxtext3: any;
  boxvalue3: any;
  boxtext4: any;
  boxvalue4: any;
  boxtext5: any;
  boxvalue5: any;
  boxtext6: any;
  boxvalue6: any;



  // bread crumb items
  //breadCrumbItems: Array<{}>;

  //barchartdata:any[3];
  barchartdata: any = [];
  barchartdata1: any = [];
  barchartevntdata: any = [];
  barchartexpdata: any = [];
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

  clientId: string = '';

  noOfProjects: number = 0
  noOfSalesLead: number = 0
  noOfClients: number = 0
  roles: string = '';
  username: any;
  loginUser: any[] = [];
  firstName: any;
  client: any;
  // clientbyuser: Clients;
  cid: any;
  whoaim: any;
  noOfEvents: any;
  projectByEmp: any[] = [];
  clientByEmp: any[] = [];
  salesLeadByEmp: any[] = [];
  eventsByEmp: any[] = [];
  userType: any;
  clientData: any;
  todaysEvent: any[] = [];
  upcomingEventList: any[] = [];
  completedEventList: any[] = [];
  cancelledEventList: any[] = [];
  stageStatusDisplay: string[] = [];
  expert: any;
  expertData: any;
  totalEarning: any;
  totalHours: any;
  clientUserData: any;
  clientUser: any;
  paymentPreference: any[] = [];
  //bankDetailsForm: FormGroup;
  hideBankDetails: boolean = false
  expertId: string = '';
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
  barid: string = '';
  barid1: string = '';  //
  revenue: string = '';
  evnt: string = '';
  exprt: string = '';


  subpnlCurMonthData: any;
  subpnlPrevdayData: any;
  subpnlPrevMonthData: any;

  subpnlProfitCurMonthData: any;
  subpnlProfitPrevdayData: any;
  subpnlProfitPrevMonthData: any;
  defaultFormat = 'DD MMM yyy';


  RMCurMonthData: any;
  RMcurdayData: any;


  RMProfitCurMonthData: any;
  RMProfitcurdayData: any;


  ExpertRegion: any[] = [];

  ExpertRegionCount: any[] = [];


  ClientdashData: any;

  concount: number = 0;
  reccount: number = 0;
  ripcount: number = 0;
  qrycount: number = 0;
  totcount: number = 0;
  supcount: number = 0;

  extotal: number = 0;
  //@ViewChild(BarComponent) child:BarComponent;
  // @ViewChild(PieComponent) piechild:PieComponent;
  // @ViewChild(BarexComponent) exchild:BarexComponent;

  colors: any;
  member: any;
  //gs-------from old ------------


  constructor(
    private clientsService: ClientsService,
    private projectService: ProjectService,
    private employeeService: EmployeeService,
    private expertService: ExpertService,
    private eventService: EventkrService,
    private readonly userService: UserService,

  ) {

    this.whoaim = JSON.parse(sessionStorage.getItem('user')!);


  }
  // roles:any;

  clients: any;


  getExpCounts(id: any) {
    //"5a27db8fd7d1377e69ed21e9" sanya
    const filters = new Map();
    const filter = {
      where: {},
    };
    // debugger
    id = "5a27db8fd7d1377e69ed21e9";
    //  let start=new Date().getFullYear().toString()+"-"+new Date().getMonth().toString()+"-"+"01"; 
    //let  end=new Date().getFullYear().toString()+"-"+new Date().getMonth().toString()+"-"+new Date().getDay().toString()
    let start = "2010-01-01";

    let end = "2023-01-31"

  }


  ngOnInit(): void {


    this.getExpCounts("60a2b8466fc81f44dca3c215");


    this.empByRegion();

    //this.KACWiseExpEventCount()

    this.geteventcount4periodByemp()



    this.colors = [
      "#33b2df",
      "#546E7A",
      "#d4526e",
      "#13d8aa",
      "#A5978B",
      "#2b908f",
      "#f9a3a4",
      "#90ee7e",
      "#f48024",
      "#69d2e7"
    ]



    //this.boxtext1='Active Projects'
    //this.boxvalue1=25;


    //60a2b8466fc81f44dca3c215 RM abani

    // var series=[{
    //   name: '_id',
    //   type: 'bar',
    //   data: ["totalExpectedNumEvent"]
    // }]
    // {
    //   name: '_id',
    //   type: 'bar',
    //   data: ["totalExpectedNumEvent"]
    // }]

    // var x=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    // this._OverviewChart1('["#1E90FF", "#00008B", "#1E90FF"]',series,x);



    /**
     * BreadCrumb
     */
    //roles:any;
    this.roles = sessionStorage['usr'];
    this.breadCrumbItems = [
      { label: 'Dashboards' },
      { label: 'Projects', active: true }
    ];
    this.topCollectionData = topCollectionData;
    /**
     * Fetches the data
     */
    /*
        this.statDatac = statDatac;
    
        // Chart Color Data Get Function
    
    
        this.subpnlCurMonthData = [{ "id": "", "GTAM ": "0", "GTC ": "0", "Evntcnt": "0", "Convrate": "0", "AvgGP": "" }];
    
        this.subpnlPrevdayData = [{ "id": "", "GTAM ": "0", "GTC ": "0", "Evntcnt": "0", "Convrate": "0", "AvgGP": "" }];
    
        this.subpnlPrevMonthData = [{ "id": "", "GTAM ": "0", "GTC ": "0", "Evntcnt": "0", "Convrate": "0", "AvgGP": "" }];
    
    
        this.subpnlProfitCurMonthData = [{ "id": "", "calls ": "0", "events": "0", "revenue": "0", "GP": "0" }];
    
        this.subpnlProfitPrevdayData = [{ "id": "", "calls ": "0", "events": "0", "revenue": "0", "GP": "0" }];
    
        this.subpnlProfitPrevMonthData = [{ "id": "", "calls ": "0", "events": "0", "revenue": "0", "GP": "0" }];
    
    
        this.subpnlCurMonthData = [];
        this.subpnlPrevdayData = [];
        this.subpnlPrevMonthData = [];
    
        this.subpnlProfitCurMonthData = [];
        this.subpnlProfitPrevdayData = [];
        this.subpnlProfitPrevMonthData = [];
    
        this.RMCurMonthData = [];
        this.RMcurdayData = [];
        this.RMProfitCurMonthData = [];
        this.RMProfitcurdayData = [];
    
        this.ClientdashData = [];
    
    
    
        this.creatorsData = creatorsData;
    
    */


  }


  // Chart Colors Set
  private getChartColorsArray(colors: any) {
    colors = JSON.parse(colors);
    return colors.map(function (value: any) {
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

  changesr() {

    console.log('in chart');


    this.OverviewChart.series = [{
      name: 'Experts Count',
      type: 'bar',
      data: [34, 65, 46, 68, 49, 61, 42, 44, 78, 52, 63, 67]
    }, {
      name: 'Revenue',
      type: 'area',
      data: [89.25, 98.58, 68.74, 108.87, 77.54, 84.03, 51.24, 28.57, 92.57, 42.36, 88.51, 36.57]
    }]

  }

  private _OverviewChart(colors: any, x: any[], y: any[]) {

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
          dataPointSelection: (event: any, chartContext: any, config: any) => {
            //   alert(chartContext);
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
          formatter: function (y: any) {
            if (typeof y !== "undefined") {
              return y.toFixed(0);
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



    //.chart.background='linear-gradient(174deg, rgb(31, 32, 34) 0%, rgb(196, 185, 199) 50%, rgb(122, 121, 121) 100%)';

  }

  //fetch start
  geteventcount() {

    let filter = {
      "start": "2020-05-01", "end": "2023-05-01"
    }
    // debugger

    fetch('https://middle.krsherpa.com/dashboard/KACWiseExpEventCnt', {

      method: "POST",
      body: JSON.stringify(filter),
      headers: {

        "Content-Type": "application/json",

      },
    })
      .then(r => r.json()).then(result => {
        // Result now contains the response text, do what you want...

        //console.log(result)

        const names = result.map(item => this.getempname(item._id));
        const name = result.map(item => item.totalExpectedNumEvent);


        var series = [{
          name: 'count',
          type: 'bar',
          data: name
        }]

        var x = names// ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

        this._OverviewChart1('["#1E90FF", "#00008B", "#1E90FF"]', series, x);

        //console.log(names)

      },
        (error: any) => {
          this.isLoading = false;
        }
      );
  }


  empsByRegion: any;

  emplist: any[] = [];
  private empByRegion() {

    let filter = {
      "startDate": "2023-04-03",
      "endDate": new Date,
      "subPnLId": "59de091ab209590806c49166"
    }
    //get number of expected event by key accmanager id for a period
    fetch('https://middle.krsherpa.com/dashboard/empByRegion', {

      method: "POST",
      body: JSON.stringify(filter),
      headers: {

        "Content-Type": "application/json",

      },
    })
      .then(r => r.json()).then(result => {

        this.empsByRegion = result;


        //console.log(result)

        //Extract the employees list
        //const employees = [];
        this.empsByRegion.forEach(item => {
          this.emplist.push(...item.employees);

        });

        console.log( this.emplist);
        const getemp = this.getempname("640ea0a6c3fc8f07af1cffaf");

        //console.log(getemp);

        this.geteventcount();

        //this.getProjectGTAMGTC();

        this.getgtambyregion();

        //this.geteventcountapac();

        this.geteventcount4periodByemp();

        this.getKACWiseExpEventCnt()
        //this.getKACWiseExpEventCnt1()


      })

  }


  getIdsByReportingManagerId(data, reportingManagerId) {
    let result = [];

    data.forEach(item => {
      if (item.repotingManagerId === reportingManagerId) {
        result.push(item.userId);
        result = result.concat(this.getIdsByReportingManagerId(data, item.userId));
      }
    });

    return result;
  }




  getempname(id: any) {
    //console.log(id);
    let reportingMgr = this.emplist?.find((x) => x.userId === id);
    //console.log(reportingMgr.name)
    return reportingMgr.name;
  }


  getempnamebyid(id: any) {
    //console.log(id);
    let reportingMgr = this.emplist?.find((x) => x.userId === id);
    //console.log(reportingMgr)
    return reportingMgr.name;
  }

  //fetch end

  private _OverviewChart1(colors: any, series, x) {

    colors = this.getChartColorsArray(colors);

    this.OverviewChart11 = {
      series: series,
      chart: {
        height: 350,
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
          formatter: function (y: any) {
            if (typeof y !== "undefined") {
              return y.toFixed(0);
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


  //getProjectGTAMGTCCount start 04/06/23


  async getProjectGTAMGTCCount(filter) {

    // let filter = {

    //   "startDate": "2023-05-03",
    //   "endDate": "2023-06-03",
    //   "empid":"642d903480516776a9a977d1",
    //   "region":"xxxx"
    // }
    //get number of expected event by key accmanager id for a period

    //console.log(filter)
    await fetch('https://middle.krsherpa.com/dashboard/getProjectGTAMGTCCount4EmpPeriod', {

      method: "POST",
      body: JSON.stringify(filter),
      headers: {

        "Content-Type": "application/json",

      },
    })
      .then(r => r.json()).then(result => {

        //console.log(result)

        result.emp = filter.empid;

        //console.log(filter.empid)

        this.kacGTAMlist.push(result)

        return (result)

      })

  }

  kacGTAMlist: any[] = [];

  async getgtambyregion() {

    const userIdsUS = this.getUserIdsByRegionAndDesignation(this.empsByRegion, "EMEA", 11);

    //console.log(userIdsUS)


    for (let index = 0; index < userIdsUS.length; index++) {
      const element = userIdsUS[index];
      // console.log(element)
      let filter = {

        "startDate": "2023-01-03",
        "endDate": "2023-06-03",
        "empid": element,
        "region": "xxxx"
      }

      //console.log(filter)

      var result = await this.getProjectGTAMGTCCount(filter);
      // console.log(result)
    }

    const names = this.kacGTAMlist.map(item => this.getempname(item.emp));
    const name1 = this.kacGTAMlist.map(item => item.givenToAccMgrcountttot);
    const name2 = this.kacGTAMlist.map(item => item.givenToClientcounttot);
    const name3 = this.kacGTAMlist.map(item => item.leadAttachedcounttot);

    //console.log(this.kacGTAMlist)

    var series = [{
      name: 'LEAD',
      type: 'bar',
      data: name3,
      distributed: true
    },
    {
      name: 'GTAM',
      type: 'bar',
      data: name1,
      distributed: true
    },
    {
      name: 'GTC',
      type: 'bar',
      data: name2,
      distributed: true
    },

    ]

    var x = names
    //console.log(name)
    this._OverviewChart2('["#33b2df","#546E7A","#d4526e","#13d8aa","#A5978B","#2b908f","#f9a3a4","#90ee7e","#f48024","#69d2e7"]', series, x);


    //console.log(this.kacGTAMlist)

  }

  // OverviewChartgtam:any

  private _OverviewChart2(colors: any, series, x) {

    colors = this.getChartColorsArray(colors);

    this.OverviewChartgtam = {
      series: series,
      chart: {
        height: 350,
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
          formatter: function (y: any) {
            if (typeof y !== "undefined") {
              return y.toFixed(0);
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

  //getProjectGTAMGTCCount end




  //eventcount4periodByemp start 04/06/23

  async eventcount4periodByemp(filter) {


    //console.log(filter)


    await fetch('https://middle.krsherpa.com/dashboard/eventcount4periodByemp', {

      method: "POST",
      body: JSON.stringify(filter),
      headers: {

        "Content-Type": "application/json",

      },
    })
      .then(r => r.json()).then(result => {

        //console.log(result)

        result['emp'] = filter.emp;
        
        //console.log( result['emp'] )

        this.kacGTAMeventcount.push(result['emp'])
       // console.log(this.kacGTAMeventcount)
        return (result['emp'])


      })


  }

  kacGTAMeventcount: any[] = [];

  async geteventcount4periodByemp() {

    //console.log(this.emplist)
    const reportingManagerId = "5aa630cdeeca133f51d98f98";
    const ids = this.getIdsByReportingManagerId(this.emplist, reportingManagerId);

    //console.log(ids)
    for (let index = 0; index < ids.length; index++) {
      const element = ids[index];
      //console.log(element)

      let filter = {

        "startDate": "2020-04-03",
        "endDate": "2024-05-04",
        "emp": element,
        "region": "APAC"
      }

      //console.log(filter)

      var result =await this.eventcount4periodByemp(filter);
      //console.log(result)

    }

    const names = this.kacGTAMeventcount.map(item => this.getempname(item));
    const name1 = this.kacGTAMeventcount.map(item => item);

    //console.log(name1)
    //console.log(names)

    var series = [

      {
        name: 'GTAM',
        type: 'bar',
        data: name1,
        distributed: true
      },

    ]

    var x = names;
    //console.log(x)
    this._OverviewChart3('["#33b2df","#546E7A","#d4526e","#13d8aa","#A5978B","#2b908f","#f9a3a4","#90ee7e","#f48024","#69d2e7"]', series,x);


    //console.log(this.kacGTAMeventcount)

  }

  // OverviewChartgtam:any

  private _OverviewChart3(colors: any, series, x) {

    colors = this.getChartColorsArray(colors);

    this.getProjectevent = {
      series: series,
      chart: {
        height: 350,
        type: 'line',

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
          formatter: function (y: any) {
            if (typeof y !== "undefined") {
              return y.toFixed(0);
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





  getUserIdsByRegionAndDesignation(data, region, designation) {
    const employees = data.find(item => item._id === region)?.employees;
    //console.log(employees)
    if (!employees) {
      return [];
    }

    return employees
      .filter(employee => employee.designation === designation)
      .map(employee => employee.userId);
  }
  //eventcount4periodByemp end


 ///KACWiseExpEvent start

  async KACWiseExpEventCount(filter) {

  
    await fetch(' https://middle.krsherpa.com/dashboard/KACWiseExpEventCnt', {

      method: "POST",
      body: JSON.stringify(filter),
      headers: {

        "Content-Type": "application/json",

      },
    })
      .then(r => r.json()).then(result => {

      //console.log(result)

       result.emp = filter.emp;

        //console.log(filter.emp)

          this.KACWiseExpEventCnt.push(result)

          //console.log(this.KACWiseExpEventCnt)

        return (result)


        });


  }

  KACWiseExpEventCnt: any[] = [];

  async getKACWiseExpEventCnt() {

    const userIdsUS = this.getUserIdsByRegionAndDesignation(this.empsByRegion, "EMEA", 7);

    console.log(userIdsUS)



    let filter =  {
      "start": "2023-0-03",
  
      "end": "2024-06-04",       
  
      "region":"APAC"
  }
  
    var result = await this.KACWiseExpEventCount(filter);

 //console.log(result)

    const x = this.KACWiseExpEventCnt[0].map(item => this.getempname(item._id));
    const name1 = this.KACWiseExpEventCnt[0].map(item => item.totalExpectedNumEvent);
    
    this.member=x;
    console.log(this.member)
    //console.log(name1)

    var series = [
    {
      name: 'Event count',
      type: 'bar',
      data: name1,
      distributed: true
    },
    ]

    //var x = names
    this._OverviewChart4('["#33b2df","#546E7A","#d4526e","#13d8aa","#A5978B","#2b908f","#f9a3a4","#90ee7e","#f48024","#69d2e7"]', series, x);

   //console.log(this.KACWiseExpEventCnt)

  }
  private _OverviewChart4(colors: any, series,x) {

    colors = this.getChartColorsArray(colors);

    this.KACWiseExpEventChart = {
      series: series,
      chart: {
        height: 350,
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
          formatter: function (y: any) {
            if (typeof y !== "undefined") {
              return y.toFixed(0);
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

  ///KACWiseExpEvent end
  


}


