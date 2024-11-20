import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { statData, statDatac, ActiveProjects, otherWidgets, MyTask, tileBoxs2, TeamMembers } from './data';
import { topCollectionModel } from '../CleintDB/CleintDB.model';
import { topCollectionData } from '../CleintDB/data';
import { SwiperComponent, SwiperDirective } from 'ngx-swiper-wrapper';
import { SwiperOptions } from 'swiper';
import { DateToLocalPipe } from '../../../core/pipe';
import { ClientsService } from '../../../core/services/clients.service';

import { ProjectService } from '../../../core/services/project.service';
import { UserService } from '../../../core/services/kruser.service';

import { EmployeeService } from '../../../core/services/employee.service';

import { ExpertService } from '../../../core/services/expert.service';

import { ActivatedRoute, Router, UrlTree } from '@angular/router';


import { EventkrService } from '../../../core/services/krevent.service';

//import {EventkrService} from '../../../core/services/krevent.service';

import { TitleBox1Model, TitleBox2Model, TitleBox3Model, TitleBox4Model, otherWidgetsModel, widgetsActivitiesModel, widgetsTasksModel } from '../../apps/widgets/widgets.model';


@Component({
  selector: 'app-regular',
  templateUrl: './regular.component.html',
  styleUrls: ['./regular.component.scss'],
  providers: [DateToLocalPipe],
})

/**
 * Projects Component
 */
export class RegularComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  statData!: any;
  statDatac!: any;
  OverviewChart: any;
  OverviewChart1: any;
  OverviewChart11: any;
  OverviewChart1e1: any;
  OverviewChart110: any;
  ActiveProjects: any;
  ActivePrjcnt: number;
  upEvntscnt: number;
  comEvntscnt: number;
  avghon: any;
  failEvntscnt: number;
  otherWidgets!: otherWidgetsModel[];
  MyTask: any;
  TeamMembers: any;
  status7: any;
  tileBoxs2!: TitleBox2Model[];
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
  krroles: string[] = [];
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
  trrcnt: any;
  srcnt: any;
  crmcnt: any;
  ftrrcnt: any;


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

  portfolioChart: any;
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


  signexpertx: any;
  signexperty: any;
  myexpertx: any;
  myexperty: any;

  salesleadsforemp: any;
  myexpertypiechart: any;
  



  //@ViewChild(BarComponent) child:BarComponent;
  // @ViewChild(PieComponent) piechild:PieComponent;
  // @ViewChild(BarexComponent) exchild:BarexComponent;


  //gs-------from old ------------


  constructor(private clientsService: ClientsService,
    private router: Router,
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

  getclients() {



    this.employeeService.getAll().subscribe(
      (client: any) => {
        this.clients = client;
        console.log('data', client);

        //  console.log('compliancealldata Details', this.compliancealldata);
        //   var userData = JSON.parse(window.localStorage.getItem('user'));
      },
      (error: any) => { }
    );

  }


  private getProject(uid: any) {

    debugger
    const filters = new Map();
    const filter = {

      /*  include: [
          {
            relation: 'keyAccMgr',
          },
          {
            relation: 'researchManager',
          },
          {
            relation: 'client',
          },
        ],*/

      where: {},
      order: 'createdAt desc',
      limit: 1000,

    };


    /*
    
        if (
          this.roles === 'admin' ||
          this.roles === 'compliance' ||
          this.roles === 'mainPLHead' ||
          this.roles === 'subPLHead'    
        ) {
          filter.where = {status:0};
        }
        else{
    
        filter.where = {"and":[{status:0},{"datasrc":{ neq: 'importOld'} }],"or":[{ assigneeId: uid },{"researchAnalyst":uid},{"researchManagerId":uid},{"keyAccMgrId":uid}, {"subPnL":uid}] };
        }
     */

    if (
      this.roles == 'admin' ||
      this.roles == 'compliance' ||
      this.roles == 'mainPLHead' ||
      this.roles == 'subPLHead'
    ) {

      filter.where = { "and": [{ "status": 0 }, { "datasrc": { neq: 'importOld' } }] };

    }
    else {

      //   filter.where = {"or":[{"researchAnalystId":id},{"researchMgrId":id},{"keyAccountManager":id}, {"subPnL":id}],"and":[{"eventAt":{"gte" :start}}] };
      filter.where = { "or": [{ "researchAnalyst": this.whoaim.id }, { "researchManagerId": this.whoaim.id }, { "keyAccMgrId": this.whoaim.id }, { "subPnL": this.whoaim.id }], "and": [{ "status": 0 }] };

      // filter.where = {"or":[{ assigneeId: id },{"researchAnalyst":id},{"researchManager":id},{"keyAccountManager":id},{"assigneeId":id}, {"subPnL":id}],"and":[{"status":0}] };


    }





    filters.set('filter', JSON.stringify(filter));

    //  this.projectService.getAllMin(filters).subscribe(
    this.projectService.getAll(filters).subscribe(
      (projects: any) => {

        this.projectList = projects;

        if (this.roles === 'admin') {
          //gs   this.statData[2].value = this.projectList.length;
        }
        if (this.roles === 'expert') {
          //gs    this.expertStatData[0].value = this.projectList.length;
        }
        // this.bindData();



        this.ActivePrjcnt = this.projectList.length;



      },
      (error: any) => { }
    );
  }


  leadstatus:any;

  getstausname(id: any) {
  
    this.leadstatus= [
      { id: 1, stage: 'Contacted' },
      { id: 2, stage: 'Interested' },
      { id: 3, stage: 'In Progress' },
    { id: 4, stage: 'Converted To Client' },
    ];
  
    //console.log(id);
    let lead = this.leadstatus?.find((x) => x.id === id);
    //console.log(reportingMgr.name)
    return lead.stage;
  }

  renderDate(date: string, args?: any) {
    const dateFormat = args ? args : this.defaultFormat;
    return date ? moment.utc(date).local().format(dateFormat) : date;
  }


  getEventCounts(id: any) {
    //"5a27db8fd7d1377e69ed21e9" sanya
    const filters = new Map();
    const filter = {
      where: {},
    };

    //id="5a27db8fd7d1377e69ed21e9";

    var mon = new Date().getMonth() + 1;

    var smon = '';

    if (mon < 10) {
      smon = '0' + mon.toString();
    }
    else {
      smon = mon.toString();;
    }


    let start = new Date().getFullYear().toString() + "-" + smon + "-" + "01";
    let end = new Date().getFullYear().toString() + "-" + smon + "-" + new Date().getDate().toString()
    //let start="2010-01-01";

    //let end="2023-01-31"
    // {"eventAt":{"gte" :start}},  {"eventAt":{"lt" :end}}

    //  {"where":{"and":[{"_id":{"ne":null}}],"or":[{}]},"skip":0}

    if (
      this.roles === 'admin' ||
      this.roles === 'compliance' ||
      this.roles === 'mainPLHead'
    ) {

      filter.where = { "and": [{ "eventAt": { "gte": start } }] };
    }
    else {

      filter.where = { "or": [{ "researchAnalystId": id }, { "researchMgrId": id }, { "keyAccountManager": id }, { "subPnL": id }], "and": [{ "eventAt": { "gte": start } }] };

    }
    //  filter.where = {"or":[{"researchAnalystId":id},{"researchMgrId":id},{"keyAccountManager":id}, {"subPnL":id}],"and":[{"status":"Completed"}, {"eventAt":{"gte" :start}},  {"eventAt":{"lt" :end}}] };

    // filter.where = {"and":   [{"sourceType":type4},{"createdAt":{"gte" :start}}]};

    filters.set('filter', JSON.stringify(filter));

    this.eventService.getAll(filters).subscribe(
      // this.eventService.getCount(filters).subscribe(
      (events: any) => {

        debugger

        this.upEvntscnt = events.filter((x) => x.status == 'Upcoming')?.length

        console.log(events.filter((x) => x.status == 'Completed'))


        this.comEvntscnt = events.filter((x) => x.status == 'Completed')?.length


        this.failEvntscnt = events.find((x) => x.status == 'Failed' || x.status == 'Cancelled')?.length



        var lst = events.filter((x) => x.status == 'Completed' && x.expertCurrency == 'USD');

        if (lst && lst.length > 0) {

          let sum = 0;
          sum = lst.reduce(function (s, a) {
            return s + a.expertRate;
          }, 0);

          this.avghon = (sum / lst.length).toFixed(1);

        }



        // this.boxvalue2=events;
        // this.boxtext2="Completed Events";

        console.log('data', events);

        //  console.log('compliancealldata Details', this.compliancealldata);
        //   var userData = JSON.parse(window.localStorage.getItem('user'));
      },
      (error: any) => { console.log('error', error); }
    );

    /*
    filter.where = {"or":[{"researchAnalystId":id},{"researchMgrId":id},{"keyAccountManager":id}, {"subPnL":id}],"and":[{"status":{"ne": "Completed"}}, {"eventAt":{"gte" :start}},  {"eventAt":{"lt" :end}}] };
    
    // filter.where = {"and":   [{"sourceType":type4},{"createdAt":{"gte" :start}}]};
    
       filters.set('filter', JSON.stringify(filter));
    
    this.eventService.getCount(filters).subscribe(
     (client: any) => {
      debugger
    if (client && Number(client)>0)
    {
       this.boxvalue3=client;
    }
    else{
      this.boxvalue3=0;
    }
    
       this.boxtext3="Scheduled Events";
    
       console.log('data',client);
    
       //  console.log('compliancealldata Details', this.compliancealldata);
       //   var userData = JSON.parse(window.localStorage.getItem('user'));
     },
     (error: any) => {}
    );
    */

    /*
    filter.where = {"or":[{"researchAnalyst":id},{"researchManagerId":id},{"keyAccMgrId":id}, {"subPnL":id}],"and":[{"status":0}] };
    
    // filter.where = {"and":   [{"sourceType":type4},{"createdAt":{"gte" :start}}]};
    
       filters.set('filter', JSON.stringify(filter));
    
    this.projectService.getCount(filters).subscribe(
     (client: any) => {
       this.boxvalue1=client;
       this.boxtext1="Active Projects";
    
       console.log('data',client);
    
       //  console.log('compliancealldata Details', this.compliancealldata);
       //   var userData = JSON.parse(window.localStorage.getItem('user'));
     },
     (error: any) => {}
    );
    
    /* */


  }


  getEvents(uid: any) {
    const filters = new Map();
    const filter = {
      include: [
        /*   {
             relation: 'krResearchMgr',
           },
           {
             relation: 'expert',
           }, 
           {
             relation: 'project',
           }, */
      ],
      where: {},
      order: 'createdAt desc',
      limit: 1000,

    };

    if (this.roles === 'researchManager') {
      filter.where = { researchMgrId: uid };
    }
    if (this.roles === 'researchAnalyst') {
      filter.where = { researchAnalystId: uid };
    }
    if (this.roles === 'keyAccountManager') {
      filter.where = { keyAccountManager: uid };
    }
    if (this.roles === 'expert') {
      filter.where = { expertId: this.whoaim.id };
    }
    if (this.roles === 'client') {
      filter.where = { clientId: this.client.id };
    }
    if (
      this.roles === 'admin' ||
      this.roles === 'compliance' ||
      this.roles === 'mainPLHead' ||
      this.roles === 'subPLHead'
    ) {
      filter.where = {};
    }

    if (
      this.roles != 'admin' &&
      this.roles != 'researchManager' &&
      this.roles != 'keyAccountManager' &&
      this.roles != 'researchAnalyst' &&
      this.roles != 'expert' &&
      this.roles != 'client' &&
      this.roles != 'compliance' &&
      this.roles != 'mainPLHead' &&
      this.roles != 'subPLHead'
    ) {
      //  filter.where = { assigneeId: this.whoaim.id };
    }
    if (
      this.roles === 'admin' ||
      this.roles === 'compliance' ||
      this.roles === 'mainPLHead' ||
      this.roles === 'subPLHead'
    ) {

      filter.where = { "and": [{ "status": 0 }, { "datasrc": { neq: 'importOld' } }] };

    }
    else {

      filter.where = { "or": [{ "researchAnalystId": uid }, { "researchMgrId": uid }, { "keyAccountManager": uid }, { "subPnL": uid }] };
    }


    filters.set('filter', JSON.stringify(filter));
    this.eventService.getAll(filters).subscribe(
      (events) => {
        this.eventList = events;
        this.todaysEvent = this.eventList.filter((x) => new Date(x.eventAt) === new Date());
        this.upcomingEventList = this.eventList.filter((x) => x.status === 'Upcoming').sort(x => x.eventAt).reverse();
        this.completedEventList = this.eventList.filter((x) => x.status === 'Completed').sort(x => x.eventAt).reverse();
        this.cancelledEventList = this.eventList.filter((x) => x.status === 'Cancelled').sort(x => x.eventAt).reverse();

        if (this.roles === 'admin') {
          this.statData[3]!.value = this.eventList?.length;
        }
        if (this.roles === 'expert') {
          this.expertStatData[1]!.value = this.eventList?.length;
        }


      },
      (error: any) => { }
    );
  }




  getPrjCounts(id: any) {
    //"5a27db8fd7d1377e69ed21e9" sanya
    const filters = new Map();
    const filter = {
      where: {},
    };
    // debugger

    //  let start=new Date().getFullYear().toString()+"-"+new Date().getMonth().toString()+"-"+"01"; 
    //let  end=new Date().getFullYear().toString()+"-"+new Date().getMonth().toString()+"-"+new Date().getDay().toString()

    // {"eventAt":{"gte" :start}},  {"eventAt":{"lt" :end}}

    //  {"where":{"and":[{"_id":{"ne":null}}],"or":[{}]},"skip":0}



    if (
      this.roles === 'admin' ||
      this.roles === 'compliance' ||
      this.roles === 'mainPLHead'
    ) {

      filter.where = { "and": [{ "status": 0 }] };
    }
    else {

      filter.where = { "or": [{ "researchAnalyst": id }, { "researchManagerId": id }, { "keyAccMgrId": id }, { "subPnL": id }] };
      filter.where['and'] = [{ "status": 0 }];

    }
    // filter.where = {"and":   [{"sourceType":type4},{"createdAt":{"gte" :start}}]};

    filters.set('filter', JSON.stringify(filter));

    this.projectService.getCount(filters).subscribe(
      (client: any) => {
        this.boxvalue1 = client;
        this.boxtext1 = "Active Projects";

        console.log('data', client);

        //  console.log('compliancealldata Details', this.compliancealldata);
        //   var userData = JSON.parse(window.localStorage.getItem('user'));
      },
      (error: any) => { }
    );

    /* */


  }

  // pie chart salesleadsforemp  start :-
  private _salesleadsforemp(colors: any, x: any, y: any) {
    colors = this.getChartColorsArray(colors);
    this.salesleadsforemp = {
      series: x,
      labels: y,
      chart: {
        type: "pie",
        height: 219,
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
            return value + " " + " Leads";
          }
        },
        tickAmount: 4,
        min: 0
      },
      colors: colors
    };
  }

  private salesleadsforempfetch() {
    let filter = {
      "emp": this.whoaim?.id, //"59de091ab209590806c49166",
    }

    // console.log(nid);

    fetch('https://middle.krsherpa.com/dashboard/salesleadsforemp', {
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
      this._salesleadsforemp('["#7B68EE", "#FFB6C1", "#1E90FF"]', ncount1, nid1);
    },
      (error: any) => {
        this.isLoading = false;
      }
    );
  }
  // pie chart salesleadsforemp  end :-


  getTrrCounts(id: any) {
    //"5a27db8fd7d1377e69ed21e9" sanya
    /*
 "startDate": "2023-05-03",
 "endDate": "2023-07-07",
 "emp":"62e5fdaae50d9d1435e0c674"
 */

    let filter = {
      "startDate": this.firstDay ,
      "endDate": this.lastDay ,
      "emp": this.whoaim.id
    }

    //get number of expected event by key accmanager id for a period
    fetch('https://middle.krsherpa.com/dashboard/TRRCount4emp', {
      method: "POST",
      body: JSON.stringify(filter),
      headers: {
        "Content-Type": "application/json",
      },
    }
    ).then(r => r.json()).then(result => {
      console.log('getExpertCountByPOC result', result);
      //  this.completed5=result;

      this.srcnt = result.new
      this.crmcnt = result.CRM //result.filter((x) => x.status === 'CRM').length;
      this.ftrrcnt =result.FTRR  //result.filter((x) => x.status === 'FTRR').length;
      this.trrcnt = this.crmcnt + this.ftrrcnt;

      //this.trrcnt=22;

      var clr = '["red"]';
      var perc: any;
      if (this.trrcnt > 13 && this.trrcnt < 20) {
        clr = '["yellow"]'

      } else if (this.trrcnt > 20) {
        clr = '["green"]'
      }
      perc = ((this.trrcnt / 24) * 100).toFixed(1);

      console.log('data', perc);

      this._semiCircleChart(clr, perc);
      console.log('data', result);






      console.log('getExpertCountByPOC data', this.completed5);
    },
      (error: any) => {
        this.isLoading = false;
      }
    );






    /* */


  }


  getTrrCounts1(id: any) {
    //"5a27db8fd7d1377e69ed21e9" sanya
    const filters = new Map();
    const filter = {
      where: {},
    };
    // debugger
    var mon = new Date().getMonth() + 1;

    var smon = '';

    if (mon < 10) {
      smon = '0' + mon.toString();
    }
    else {
      smon = mon.toString();;
    }


    let start = new Date().getFullYear().toString() + "-" + smon + "-" + "01";


    if (
      this.roles === 'admin' ||
      this.roles === 'compliance' ||
      this.roles === 'mainPLHead'
    ) {
      filter.where = { "and": [{ "status": 0 }] };
    }
    else {
      filter.where = { "and": [{ "givenToAccMgr.attachedBy": id }, { "givenToAccMgr.gtamDate": { "gte": start } }, { "status": 0 }] };
    }
    // filter.where = {"and":   [{"sourceType":type4},{"givenToAccMgr.gtamDate":{"gte" :start}}]};

    filters.set('filter', JSON.stringify(filter));

    this.projectService.getAll(filters).subscribe(
      (prjs: any) => {

        debugger;

        this.srcnt = prjs.filter((x) => x.status === 'SR').length
        this.crmcnt = prjs.filter((x) => x.status === 'CRM').length;
        this.ftrrcnt = prjs.filter((x) => x.status === 'FTRR').length;
        this.trrcnt = this.crmcnt + this.ftrrcnt;

        //this.trrcnt=22;

        var clr = '["red"]';
        var perc: any;
        if (this.trrcnt > 13 && this.trrcnt < 20) {
          clr = '["yellow"]'

        } else if (this.trrcnt > 20) {
          clr = '["green"]'
        }
        perc = ((this.trrcnt / 24) * 100).toFixed(1);

        this._semiCircleChart(clr, perc);
        console.log('data', prjs);

        //  console.log('compliancealldata Details', this.compliancealldata);
        //   var userData = JSON.parse(window.localStorage.getItem('user'));
      },
      (error: any) => {


      }
    );

    /* */


  }





  expertcnt: any;

  getExpCounts(id: any) {
    //"5a27db8fd7d1377e69ed21e9" sanya
    const filters = new Map();
    const filter = {
      where: {},
      "fields": {
        "id": true,
        "status": true,
        "terms": true,
      }
    };
    // debugger
    //id="5a27db8fd7d1377e69ed21e9";
    //  let start=new Date().getFullYear().toString()+"-"+new Date().getMonth().toString()+"-"+"01"; 
    //let  end=new Date().getFullYear().toString()+"-"+new Date().getMonth().toString()+"-"+new Date().getDay().toString()
    let start = "2010-01-01";

    let end = "2023-01-31"
    // {"eventAt":{"gte" :start}},  {"eventAt":{"lt" :end}}

    //  {"where":{"and":[{"_id":{"ne":null}}],"or":[{}]},"skip":0}




    if (
      this.roles === 'admin' ||
      this.roles === 'compliance' ||
      this.roles === 'mainPLHead'
    ) {
      filter.where = { "and": [{ "krRelationshipMgrId": { neq: null } }] };

    }
    else {

      filter.where = { "krRelationshipMgrId": id };
    }
    // filter.where = {"and":   [{"sourceType":type4},{"createdAt":{"gte" :start}}]};

    filters.set('filter', JSON.stringify(filter))

    this.expertService.getexmin(filters).subscribe(
      (exprts: any) => {

        debugger


        var conex = exprts.filter((x) => x.status == 'Contacted')?.length


        var ripex = exprts.filter((x) => x.status == 'Recruiting In Progress')?.length


        var docex = exprts.filter((x) => x.status == 'Do not call')?.length


        var termsex = exprts.filter((x) => x.status == 'Recruited' && x.terms == true)?.length


        var termsfalseex = exprts.filter((x) => x.status == 'Recruited' && x.terms == false)?.length


        this.expertcnt = [
          {
            id: 1,
            title: "SME leads",
            subTitle: "SME leads",
            subItem: [
              {
                id: 1,
                icon: conex,
                iconClass: "success",
                label: "Contacted",
              },
              {
                id: 2,
                icon: ripex,
                iconClass: "info",
                label: "Recruiting In Progress",
              },
              {
                id: 3,
                icon: docex,
                iconClass: "primary",
                label: "Do not call",
              },
            ],
            progressBar: [
              { id: 1, bgColor: "bg-success", width: 30 },
              { id: 2, bgColor: "bg-warning", width: 50 },
              { id: 3, width: 20 },
            ],
          },
          {
            id: 2,
            title: "Recruited SME's",
            subTitle: "Recruited SME's",
            subItem: [
              {
                id: 1,
                icon: termsex,
                iconClass: "success",
                label: "Signed up",
              },
              {
                id: 2,
                icon: termsfalseex,
                iconClass: "info",
                label: "T&C pending",
              },

            ],
            progressBar: [
              { id: 1, bgColor: "bg-success", width: "100%" },
              { id: 2, bgColor: "bg-warning", width: "100%" },
              { id: 2, bgColor: "bg-info", width: "100%" },
            ],
          },
          {
            id: 3,
            title: "SME Payments",
            subTitle: "CSME Payments",
            subItem: [
              {
                id: 1,
                icon: "0",
                iconClass: "success",
                label: "Paid",
              },
              {
                id: 2,
                icon: "0",
                iconClass: "info",
                label: "Unpaid",
              },
              {
                id: 2,
                icon: "0",
                iconClass: "warning",
                label: "Bank Details Awaited",
              },

            ],
            progressBar: [
              { id: 1, bgColor: "bg-success", width: "100%" },
              { id: 2, bgColor: "bg-warning", width: "100%" },
              { id: 1, bgColor: "bg-success", width: "100%" },
            ],
          },
        ];


        this.boxvalue4 = exprts.length;
        this.boxtext4 = "Total Experts";

        console.log('data', exprts);

        //  console.log('compliancealldata Details', this.compliancealldata);
        //   var userData = JSON.parse(window.localStorage.getItem('user'));
      },
      (error: any) => {

        debugger

      }
    );


    /* */

  }



  getExpCounts1(id: any) {
    //"5a27db8fd7d1377e69ed21e9" sanya
    const filters = new Map();
    const filter = {
      where: {},
      "fields": {
        "id": true,
        "status": true,
        "terms": true,
      }
    };
    // debugger
    //id="5a27db8fd7d1377e69ed21e9";
    //  let start=new Date().getFullYear().toString()+"-"+new Date().getMonth().toString()+"-"+"01"; 
    //let  end=new Date().getFullYear().toString()+"-"+new Date().getMonth().toString()+"-"+new Date().getDay().toString()
    let start = "2010-01-01";

    let end = "2023-01-31"
    // {"eventAt":{"gte" :start}},  {"eventAt":{"lt" :end}}

    //  {"where":{"and":[{"_id":{"ne":null}}],"or":[{}]},"skip":0}





    filter.where = { "or": [{ "krRelationshipMgrId": id }], "and": [{ "status": "Recruited" }] };

    // filter.where = {"and":   [{"sourceType":type4},{"createdAt":{"gte" :start}}]};

    filters.set('filter', JSON.stringify(filter));

    this.expertService.getCount(filters).subscribe(
      (client: any) => {
        this.boxvalue4 = client;
        this.boxtext4 = "Total Experts";

        console.log('data', client);

        //  console.log('compliancealldata Details', this.compliancealldata);
        //   var userData = JSON.parse(window.localStorage.getItem('user'));
      },
      (error: any) => { }
    );


    filter.where = { "or": [{ "krRelationshipMgrId": id }], "and": [{ "status": "Recruited", "terms": true }] };

    // filter.where = {"and":   [{"sourceType":type4},{"createdAt":{"gte" :start}}]};

    filters.set('filter', JSON.stringify(filter));

    this.expertService.getCount(filters).subscribe(
      (client: any) => {
        this.boxvalue5 = client;
        this.boxtext5 = "Experts Signed";

        console.log('data', client);

        //  console.log('compliancealldata Details', this.compliancealldata);
        //   var userData = JSON.parse(window.localStorage.getItem('user'));
      },
      (error: any) => { }
    );


    filter.where = { "or": [{ "krRelationshipMgrId": id }], "and": [{ "status": "Recruited", "terms": false }] };

    // filter.where = {"and":   [{"sourceType":type4},{"createdAt":{"gte" :start}}]};

    filters.set('filter', JSON.stringify(filter));

    this.expertService.getCount(filters).subscribe(
      (client: any) => {
        this.boxvalue6 = client;
        this.boxtext6 = "Experts Not Signed";

        console.log('data', client);

        //  console.log('compliancealldata Details', this.compliancealldata);
        //   var userData = JSON.parse(window.localStorage.getItem('user'));
      },
      (error: any) => { }
    );

    /* */

  }



  getrgnCnt(rgn: any) {
    //debugger
    console.log('region data', this.ExpertRegionCount.find(x => x.Region == rgn));

    return this.ExpertRegionCount.find(x => x.Region == rgn)?.['count']

  }



  getPOCCount() {



    this.expertService.expertPOCcount().subscribe(
      (experts: any) => {
        this.ExpertRegion = experts;
        console.log('ExpertRegion', experts);


        this.ExpertRegionCount = this.getRegionCount();
        console.log('ExpertRegionCount', this.ExpertRegionCount);

        // Chart Color Data Get Function
        this._portfolioChart('["#3be618", "#188be6", "#3f5efb", "--vz-success"]');



        let arr = this.ExpertRegion.filter(x => x.region == 'EMEA')

        console.log('arr', arr);
        var resultx = arr.map((a: { name: any; }) => a.name);

        var resulty = arr.map((a: { Count: any; }) => a.Count);

        console.log('resultx', resultx);
        console.log('resulty', resulty);

        this._OverviewChart('["--vz-primary", "--vz-warning", "--vz-success"]', resultx, resulty);




        //  console.log('compliancealldata Details', this.compliancealldata);
        //   var userData = JSON.parse(window.localStorage.getItem('user'));
      },
      (error: any) => { }
    );

  }


  get() {



    this.expertService.expertPOCcount().subscribe(
      (experts: any) => {
        this.ExpertRegion = experts;
        console.log('ExpertRegion', experts);


        this.ExpertRegionCount = this.getRegionCount();
        console.log('ExpertRegionCount', this.ExpertRegionCount);

        // Chart Color Data Get Function
        this._portfolioChart('["#3be618", "#188be6", "#3f5efb", "--vz-success"]');

        //  console.log('compliancealldata Details', this.compliancealldata);
        //   var userData = JSON.parse(window.localStorage.getItem('user'));
      },
      (error: any) => { }
    );

  }

  firstDay: any;
  lastDay: any;

  ngOnInit(): void {

    this.myexperty = [0, 0]

    this.signexperty = [0, 0]



    this.semiCircleChart = null;
    var date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();
    this.firstDay = new Date(y, m, 1);
    this.lastDay = new Date(y, m + 1, 0);

    console.log(this.firstDay, this.lastDay)

    this.isLoading = true;

    this.whoaim = JSON.parse(localStorage.getItem('user'));

    this.projectcount4periodByemp();
    this.eventcount4periodByemp();

    this.Expertsignupcount4POC();
    this.Expertcount4POC();
    this.roles = this.whoaim?.roles[0];
    this.krroles = this.whoaim?.roles;

    this.username = this.whoaim?.username;
    this.firstName = this.whoaim?.firstName;


    this.userType =
      this.whoaim?.roles[0].charAt(0).toUpperCase() +
      this.whoaim?.roles[0]
        .slice(1)
        .split(/(?=[A-Z])/)
        .join(' ');
    console.log(this.whoaim);

    this.getTrrCounts("5981b353af00822a984768b3");

    //this.getPrjCounts(this.whoaim.id );


    //  this.getPOCCount();
    /*
      
    
    this.getEventCounts("5981b353af00822a984768b3");
    
     this.getExpCounts("5a27db8fd7d1377e69ed21e9");
    this.getPrjCounts("5a27db8fd7d1377e69ed21e9");
    */
    //this.boxtext1='Active Projects'
    //this.boxvalue1=25;
    this.tileBoxs2 = tileBoxs2;

    //this._OverviewChart1('["#1E90FF", "#00008B", "#1E90FF"]');



    /**
     * BreadCrumb
     */
    //roles:any;

    this.breadCrumbItems = [
      { label: 'Dashboards' },
      { label: 'Projects', active: true }
    ];
    this.topCollectionData = topCollectionData;
    /**
     * Fetches the data
     */
    //  this.fetchData();
    this.statDatac = statDatac;

    // Chart Color Data Get Function

    this._status7('["--vz-success", "--vz-primary", "--vz-warning", "--vz-danger"]');

    //this.getTrrCounts(this.whoaim.id );

    //this.getEventCounts(this.whoaim.id );

    // this.getExpCounts(this.whoaim.id );
    // this.getProject(this.whoaim.id)
    //  this.getEvents(this.whoaim.id)

    // this.otherWidgets = otherWidgets;
    this.salesleadsforempfetch()

  }





  completed5: any;
  //new added api:-
  private getExpertCountByPOC() {

    let filter = {
      "emp": this.whoaim.id
    }
    //get number of expected event by key accmanager id for a period
    fetch('https://middle.krsherpa.com/dashboard/getExpertCountByPOC', {
      method: "POST",
      body: JSON.stringify(filter),
      headers: {
        "Content-Type": "application/json",
      },
    }
    ).then(r => r.json()).then(result => {
      console.log('getExpertCountByPOC result', result);
      this.completed5 = result;
      console.log('getExpertCountByPOC data', this.completed5);
    },
      (error: any) => {
        this.isLoading = false;
      }
    );

  }





  private _semiCircleChart(colors: any, valu: any) {
    colors = this.getChartColorsArray(colors);
    this.semiCircleChart = {
      series: [valu],
      chart: {
        type: "radialBar",
        height: 150,
        offsetY: -20,
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: {
            background: "#e7e7e7",
            strokeWidth: "97%",
            margin: 5, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              color: "#999",
              opacity: 1,
              blur: 2,
            },
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              offsetY: -2,
              fontSize: "22px",
            },
          },
        },
      },
      grid: {
        padding: {
          top: -10,
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          shadeIntensity: 0.4,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 53, 91],
        },
      },
      labels: ["Average Results"],
      colors: colors,
    };

  }





  private getRegionCount(): any[] {

    const results = Object.values(this.ExpertRegion.reduce((obj, item) => {
      obj[item.region] = obj[item.region] || { Region: item.region, count: 0 };
      obj[item.region].count = obj[item.region].count + item.Count;
      return obj;
    }, {}))

    return results;

  }
  rgnarry: any[] = [];
  /**
* My Portfolio Chart  this.ExpertRegion
*/

  private _portfolioChart(colors: any) {

    console.log('getrgnCnt xx', this.ExpertRegionCount.find(x => x.Region === 'APAC'));

    this.rgnarry.push(this.ExpertRegionCount.find((x) => x.Region == 'APAC').count)

    let v1 = this.ExpertRegionCount.find(x => x.Region == 'APAC')['count'];
    let v2 = this.getrgnCnt('EMEA');
    let v3 = this.getrgnCnt('AMERICAS')



    console.log('getrgnCnt', this.rgnarry);
    colors = this.getChartColorsArray(colors);
    this.portfolioChart = {
      series: [v1, v2, v3],
      labels: ["APAC", "EMEA", "AMERICAS"],
      chart: {
        type: "pie",
        height: 278,
        // background:'linear-gradient(185deg, rgba(179,233,240,1) 0%, rgba(49,66,244,1) 100%)',
        events: {
          dataPointSelection: (event: any, chartContext: any, config: any) => {
            // alert(config.w.config.labels[config.dataPointIndex]);
            console.log(chartContext, config);



            let arr = this.ExpertRegion.filter(x => x.region == config.w.config.labels[config.dataPointIndex])

            console.log('arr', arr);
            var resultx = arr.map((a: { name: any; }) => a.name);

            var resulty = arr.map((a: { Count: any; }) => a.Count);

            console.log('resultx', resultx);
            console.log('resulty', resulty);

            this._OverviewChart('["--vz-primary", "--vz-warning", "--vz-success"]', resultx, resulty);


          }
        },
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
        formatter: function (val: any, opts: any) {
          return opts.w.config.series[opts.seriesIndex]
        },
      },
      legend: {
        show: true,
        position: 'bottom',
      },
      yaxis: {
        labels: {
          formatter: function (value: any) {
            return "" + value;
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
        formatter: function (val: any) {
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


  openlnk(cnt: string, status: any) {

    //  alert(cnt)
    if (cnt != '0') {
      var id = this.whoaim.id;
      // id='5a27db8fd7d1377e69ed21e9'
      const urlTree: UrlTree = this.router.createUrlTree(['expert/expertlist/' + id + '/' + status]);
      // this.router.navigateByUrl(urlTree,);
      const url: string = this.router.serializeUrl(urlTree);
      window.open(url, '_blank');

    }

  }



  private Expertsignupcount4POC() {

    let filter = {
      "emp": this.whoaim.id
    }
    //get number of expected event by key accmanager id for a period
    fetch('https://middle.krsherpa.com/dashboard/Expertsignupcount4POC', {
      method: "POST",
      body: JSON.stringify(filter),
      headers: {
        "Content-Type": "application/json",
      },
    }
    ).then(r => r.json()).then(result => {
      console.log('Expertsignupcount4POC result', result)
      if (result[0]?.count) {
        var res = result[0].count


        this.signexperty = [res, this.signups - res]

        this.signexpertx = ['Signed Up', 'Pending']

      }
      // this.completed=result['0'].count;
      //  console.log('Expertsignupcount4POC data',this.completed);
    },
      (error: any) => {
        this.isLoading = false;
      }
    );

  }



  signups: any;

  completed1: any;
  //new added api:-
  private Expertcount4POC() {

    let filter = {
      "emp": this.whoaim.id
    }
    //get number of expected event by key accmanager id for a period
    fetch('https://middle.krsherpa.com/dashboard/Expertcount4POC', {
      method: "POST",
      body: JSON.stringify(filter),
      headers: {
        "Content-Type": "application/json",
      },
    }
    ).then(r => r.json()).then(result => {


      this.signups = this.getItemBystatus(result[0].statusCounts, "Recruited")



      this.myexperty = [this.getItemBystatus(result[0].statusCounts, "Recruited"), this.getItemBystatus(result[0].statusCounts, "Contacted")]

      this.myexpertx = ['Recruited', 'Contacted']


      console.log('Expertcount4POC result', result);
      console.log('Expertcount4POC result', result[0].statusCounts);

      //   this.completed1=result;
      console.log('Expertcount4POC data', this.completed1);

      const Recruited=this.myexperty;
      const Contacted=this.myexpertx;
      
      this._myexperty('["#5CB3FF", "#FF2400"]', Recruited, Contacted);
    },
      (error: any) => {
        this.isLoading = false;
      }
    );

  }

  private _myexperty(colors: any, x: any, y: any) {
    console.log("Recruited",x)
    console.log("Contacted",y)
    colors = this.getChartColorsArray(colors);
    this.myexpertypiechart = {
      series: x,
      labels: y,
      chart: {
        type: "pie",
        height: 219,
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
            return value + "" + " Experts ";
          }
        },
        tickAmount: 4,
        min: 0
      },
      colors: colors
    };
  }




  completed2: any;
  //new added api:-
  private eventcount4periodByemp() {


    let filter = {
      startDate: this.firstDay,
      endDate: this.lastDay,
      "emp": this.whoaim.id
    }
    //get number of expected event by key accmanager id for a period
    fetch('https://middle.krsherpa.com/dashboard/eventcount4periodByemp', {
      method: "POST",
      body: JSON.stringify(filter),
      headers: {
        "Content-Type": "application/json",
      },
    }
    ).then(r => r.json()).then(result => {
      console.log('eventcount4periodByemp result', result);

      this.upEvntscnt = this.getItemById(result, "Upcoming")

      this.comEvntscnt = this.getItemById(result, "Completed")
      this.failEvntscnt = this.getItemById(result, "Cancelled")

    },
      (error: any) => {
        this.isLoading = false;
      }
    );

  }

  private getItemById(data, id) {
    for (let i = 0; i < data.length; i++) {
      if (data[i]._id === id) {
        return data[i].count;
      }
    }
    return 0; // If the ID is not found, return 0 or any default value you prefer
  }

  private getItemBystatus(data, id) {
   var retval=0
    for (let i = 0; i < data.length; i++) {
      if (data[i].status === id) {
        retval= data[i].count;
      }
    }
    return retval; // If the ID is not found, return 0 or any default value you prefer
  }

  //new added api:-
  private projectcount4periodByemp() {


    let filter = {
      startDate: this.firstDay,
      endDate: this.lastDay,
      "emp": this.whoaim.id
    }
    //get number of expected event by key accmanager id for a period
    fetch('https://middle.krsherpa.com/dashboard/projectcount4periodByemp', {
      method: "POST",
      body: JSON.stringify(filter),
      headers: {
        "Content-Type": "application/json",
      },
    }
    ).then(r => r.json()).then(result => {
      console.log('projectcount4periodByemp result', result);
      // this.completed2=result?.count;
      this.ActivePrjcnt = this.getItemById(result, 0)

    },
      (error: any) => {
        this.isLoading = false;
      }
    );

  }



  private _portfolioChart2(colors: any) {

    console.log('getrgnCnt xx', this.ExpertRegionCount.find(x => x.Region === 'APAC'));

    this.rgnarry.push(this.ExpertRegionCount.find((x) => x.Region == 'APAC').count)

    let v1 = this.ExpertRegionCount.find(x => x.Region == 'APAC')['count'];
    let v2 = this.getrgnCnt('EMEA');
    let v3 = this.getrgnCnt('AMERICAS')



    console.log('getrgnCnt', this.rgnarry);
    colors = this.getChartColorsArray(colors);
    this.portfolioChart = {
      series: [v1, v2, v3],
      labels: ["APAC", "EMEA", "AMERICAS"],
      chart: {
        type: "pie",
        height: 278,
        // background:'linear-gradient(185deg, rgba(179,233,240,1) 0%, rgba(49,66,244,1) 100%)',
        events: {
          dataPointSelection: (event: any, chartContext: any, config: any) => {
            // alert(config.w.config.labels[config.dataPointIndex]);
            console.log(chartContext, config);



            let arr = this.ExpertRegion.filter(x => x.region == config.w.config.labels[config.dataPointIndex])

            console.log('arr', arr);
            var resultx = arr.map((a: { name: any; }) => a.name);

            var resulty = arr.map((a: { Count: any; }) => a.Count);

            console.log('resultx', resultx);
            console.log('resulty', resulty);

            this._OverviewChart('["--vz-primary", "--vz-warning", "--vz-success"]', resultx, resulty);


          }
        },
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
        formatter: function (val: any, opts: any) {
          return opts.w.config.series[opts.seriesIndex]
        },
      },
      legend: {
        show: true,
        position: 'bottom',
      },
      yaxis: {
        labels: {
          formatter: function (value: any) {
            return "" + value;
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
        formatter: function (val: any) {
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

  /**
   * Swiper Responsive setting
   */
  public Responsive: SwiperOptions = {
    slidesPerView: 1,
    loop: true,
    navigation: true,
    spaceBetween: 25,
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 3,
      }
    }
  };


  public collection: SwiperOptions = {
    slidesPerView: 1,
    loop: true,
    spaceBetween: 10
  };


  ngAfterViewInit() {
    this.scrollRef.SimpleBar.getScrollElement().scrollTop = 600;
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



    //.chart.background='linear-gradient(174deg, rgb(31, 32, 34) 0%, rgb(196, 185, 199) 50%, rgb(122, 121, 121) 100%)';

  }



  private _OverviewChart1(colors: any) {

    colors = this.getChartColorsArray(colors);




    this.OverviewChart11 = {
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



    colors = '[ "#66CDAA", "#1E90FF"]'

    colors = this.getChartColorsArray(colors);



    this.OverviewChart1e1 = {
      series: [{
        name: 'Events',
        type: 'bar',
        data: [5, 8, 15, 16, 21, 25, 21, 13, 30, 20, 9, 18]
      }],
      chart: {
        height: 300,
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

    colors = '[ "#66CDAA", "#1E90FF"]'

    colors = this.getChartColorsArray(colors);



    this.OverviewChart110 = {
      series: [{
        name: 'TRR',
        type: 'bar',
        data: [5, 8, 15, 16, 21, 25, 21, 13, 30, 20, 9, 18, 21, 13, 30, 20, 9, 18]
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
        categories: ['Emp1', 'Emp2', 'Emp3', 'Emp4', 'Emp1', 'Emp1', 'Emp1', 'Emp1', 'Emp1', 'Emp1', 'Emp1', 'Emp1', 'Emp1', 'Emp1', 'Emp1', 'Emp1', 'Emp1', 'Emp1'],
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

    colors = '["#008000", "#00008B", "#1E90FF"]'

    colors = this.getChartColorsArray(colors);


    this.OverviewChart1 = {
      series: [{
        name: 'Number of Projects',
        type: 'bar',
        data: [34, 65, 46, 68, 49, 61, 42, 44, 78, 52, 63, 67]
      }, {
        name: 'Revenue',
        type: 'area',
        data: [89.25, 98.58, 68.74, 108.87, 77.54, 84.03, 51.24, 28.57, 92.57, 42.36, 88.51, 36.57]
      }, {
        name: 'Active Projects',
        type: 'bar',
        data: [8, 12, 7, 17, 21, 11, 5, 9, 7, 29, 12, 35]
      }],
      chart: {
        height: 250,
        type: 'line',
        //  background:'linear-gradient(185deg, rgba(179,233,240,1) 0%, rgba(49,66,244,1) 100%)',

        //  background:'linear-gradient(22deg, rgba(37,33,41,1) 0%, rgba(179,82,139,1) 49%, rgba(191,175,179,1) 100%)',

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
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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


    //.chart.background='linear-gradient(174deg, rgb(31, 32, 34) 0%, rgb(196, 185, 199) 50%, rgb(122, 121, 121) 100%)';

  }



  /**
 *  Status7
 */
  private _status7(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.status7 = {
      series: [125, 42, 58, 89],
      labels: ["Completed", "In Progress", "Yet to Start", "Cancelled"],
      chart: {
        type: "donut",
        height: 230,
      },
      plotOptions: {
        pie: {
          offsetX: 0,
          offsetY: 0,
          donut: {
            size: "90%",
            labels: {
              show: false,
            }
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      stroke: {
        lineCap: "round",
        width: 0
      },
      colors: colors
    };
  }

  /**
   * Fetches the data
   */
  private fetchData() {
    this.statData = statData;
    this.ActiveProjects = ActiveProjects;
    this.MyTask = MyTask;
    this.TeamMembers = TeamMembers;
  }


  /* private crtevnt(event, chartContext, config) {
     alert(chartContext);
     console.log(chartContext, config);
   }*/

}
