
import { Component, Input, Output, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import { forEach } from 'lodash';

//import {EventkrService} from '../../../core/services/krevent.service';


@Component({
  selector: 'app-splDashboard',
  templateUrl: './splDashboard.component.html',
  styleUrls: ['./splDashboard.component.scss'],
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

export class splDashboardComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  statData!: any;
  statDatac!: any;
  whoaim: any;
  //@ViewChild(BarComponent) child:BarComponent;
  // @ViewChild(PieComponent) piechild:PieComponent;
  // @ViewChild(BarexComponent) exchild:BarexComponent;
  roles: string = '';
  krroles: string[] = [];
  member: any;
  //gs-------from old ------------

  TRRcountChart: any;
  EventcountChart: any;
  ExpcountChart: any;
  clientsforall: any;
  salesleadsforall: any;
  salesleadsforemp: any;


  constructor(private clientsService: ClientsService,
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
  extotal:any;
  firstDay: any;
  previousday: any;
  today: any;
  lastDay: any;
  isLoading: boolean = false;

  portfolioChart: any;
  OverviewChart: any;

  ngOnInit(): void {

    this.Previouscomplete = [];
    this.Previousupcoming = [];

    this.eventupcoming = [];
    this.eventcomplete = [];

 
    this.Previouscompletekac = [];
    this.Previousupcomingkac = [];

    this.eventupcomingkac = [];
    this.eventcompletekac = [];



    var date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth();
    var d = date.getDate();
    this.firstDay = new Date(y, m, 1);
    this.lastDay = new Date(y, m + 1, 0);
    this.previousday = new Date(y, m, d - 4);
    this.today = new Date(y, m, d);
    this.empByRegion();
    //this.geteventchart();


    const region = "EMEA";
    const designation = 11;
    /*
    
    */


    //this.semiCircleChart=null;


    console.log(this.firstDay, this.lastDay)

    this.isLoading = true;

    this.whoaim = JSON.parse(localStorage.getItem('user'));


    
    //this.whoaim["id"]="5aeff14beeca133f51d9b74f" ;
    /*
        this.projectcount4periodByemp();
        this.eventcount4periodByemp();
    
        this.Expertsignupcount4POC();
        this.Expertcount4POC();
        */
    this.roles = this.whoaim?.roles[0];
    this.krroles = this.whoaim?.roles;

    // this.username = this.whoaim?.username;
    // this.firstName = this.whoaim?.firstName;

this.getClientlist() ;



    this.clientsforallfetch();
    this.salesleadsforallfetch();
    this.salesleadsforempfetch();

this.geteventcount();

  }
  clientList :any;


  async getClientlist() {
    this.clientList = await this.clientsService.getclmindata();

    console.log(this.clientList)
  }

  private _clientsforall(colors: any, x: any, y: any,) {
    colors = this.getChartColorsArray(colors);
    this.clientsforall = {
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
            return value + "k" + " Users";
          }
        },
        tickAmount: 4,
        min: 0
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
      this._clientsforall('["--vz-primary", "--vz-orange", "--vz-green"," --vz-pink"]', ncount1, nid1);
    },
      (error: any) => {
        this.isLoading = false;
      }
    );

  }
  // pie chart clientsforall  end :-


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

  // pie chart salesleadsforall  start :-
  private _salesleadsforall(colors: any, x: any, y: any) {
    colors = this.getChartColorsArray(colors);
    this.salesleadsforall = {
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
      const nid1 = result.map(item => this.getstausname(item._id));
      debugger
      console.log(ncount1);
      console.log("checking :-" + nid1);
      this._salesleadsforall('["--vz-primary", "--vz-orange", "--vz-green","--vz-pink","--vz-red"]', ncount1, nid1);
    },
      (error: any) => {
        this.isLoading = false;
      }
    );

  }
  // pie chart salesleadsforall  end :-


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
            return value + "k" + " Users";
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
      "emp": "59de091ab209590806c49166",
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
      const nid1 = result.map(item => item._id);
      debugger
      console.log(ncount1);
      console.log("checking :-" + nid1);
      this._salesleadsforemp('["--vz-pink"]', ncount1, nid1);
    },
      (error: any) => {
        this.isLoading = false;
      }
    );
  }




  projectproduct: any;
  projectproductpday: any;
  eventproduct: any;

  eventupcoming: any;
  Previousdaycount: any;
  eventcomplete: any;
  Previouscomplete: any;
  Previousupcoming: any;

 // "givenToClientcount": 44, "givenToAccMgrcountt": 52, "leadAttachedcount": 59

  pgivenToClientcount: any;
  pgivenToAccMgrcountt: any;
  pleadAttachedcount: any;
  
  givenToClientcount: any;
  givenToAccMgrcountt: any;
  leadAttachedcount: any;

  Projectcounpday() {
    let filter = {

      "startDate": this.previousday,
      "endDate": this.today,
      "emps": this.teamuid?.join(","),
      "region": "xxxx"
    }

    fetch('https://middle.krsherpa.com/dashboard/getProjectGTAMGTCCount4KAClistPeriod', {

      method: "POST",
      body: JSON.stringify(filter),
      headers: {

        "Content-Type": "application/json",

      },
    })
      .then(r => r.json()).then(result => {

        console.log(result)

        this.pgivenToClientcount=result.givenToClientcount
        this.pgivenToAccMgrcountt=result.givenToAccMgrcountt
        this.pleadAttachedcount=result.leadAttachedcount



        result.emp = filter.emps;
        this.projectproductpday = result
        console.log(this.projectproductpday)
        return (result)

      })
  }



  Projectcount() {

console.log ('this.teamuid', this.teamuid)


    let filter = {

      "startDate": this.firstDay,
      "endDate": this.lastDay,
      "emps":this.teamuid?.join(","),
      "region": "xxxx"
    }

    fetch('https://middle.krsherpa.com/dashboard/getProjectGTAMGTCCount4KAClistPeriod', {

      method: "POST",
      body: JSON.stringify(filter),
      headers: {

        "Content-Type": "application/json",

      },
    })
      .then(r => r.json()).then(result => {

        console.log(result)

        this.givenToClientcount=result.givenToClientcount
        this.givenToAccMgrcountt=result.givenToAccMgrcountt
        this.leadAttachedcount=result.leadAttachedcount

        result.emp = filter.emps;
        this.projectproduct = result
        console.log(this.projectproduct)
        return (result)

      })
  }

  //Projectcount end

  // event count

  eventscount() {
    let filter = {

      "startDate": this.firstDay,
      "endDate": this.lastDay,
      "emp": this.whoaim?.id,
      "region": "xxxx"
    }

    fetch('https://middle.krsherpa.com/dashboard/eventcount4periodByempByCur', {

      method: "POST",
      body: JSON.stringify(filter),
      headers: {

        "Content-Type": "application/json",

      },
    })
      .then(r => r.json()).then(result => {

        console.log('eventscount', result)

        result.emp = filter.emp;
        this.eventproduct = result[0]
        this.eventcomplete = result[1]
        this.eventupcoming = result[0]

        this.eventcomplete = result?.filter(obj => obj._id === "Completed");
        this.eventupcoming = result?.filter(obj => obj._id === "Upcoming");


        if (  !this.eventcomplete)
        {
        this.eventcomplete[0]=0 ;
    
        }
    
    if ( ! this.eventupcoming)
    {
    this.eventupcoming[0]=0;
    }
    
        return (result)

      })
  }

  Previousday() {
    let filter = {
      "startDate": this.previousday,
      "endDate": this.today,
      "emp": this.whoaim?.id,
      "region": "xxxx"
    }

    fetch('https://middle.krsherpa.com/dashboard/eventcount4periodByempByCur', {

      method: "POST",
      body: JSON.stringify(filter),
      headers: {

        "Content-Type": "application/json",

      },
    })
      .then(r => r.json()).then(result => {

        console.log(result)

        result.emp = filter.emp;


        this.Previouscomplete = result?.filter(obj => obj._id === "Completed");
        this.Previousupcoming = result?.filter(obj => obj._id === "Upcoming");
      
    if (  !this.Previouscomplete)
    {
    this.Previouscomplete[0]=0 ;

    }

if ( ! this.Previousupcoming)
{
this.Previousupcoming[0]=0;
}


        console.log(this.Previouscomplete)
        console.log(this.Previousupcoming)
        return (result)

      })
  }

//******************************* */


projectproductkac: any;
projectproductpdaykac: any;
eventproductkac: any;

eventupcomingkac: any;
Previousdaycountkac: any;
eventcompletekac: any;
Previouscompletekac: any;
Previousupcomingkac: any;

// "givenToClientcount": 44, "givenToAccMgrcountt": 52, "leadAttachedcount": 59

pgivenToClientcountkac: any;
pgivenToAccMgrcounttkac: any;
pleadAttachedcountkac: any;

givenToClientcountkac: any;
givenToAccMgrcounttkac: any;
leadAttachedcountkac: any;

Projectcounpdaykac(id) {
  let filter = {

    "startDate": this.previousday,
    "endDate": this.today,
    "empid": id,
    "region": "xxxx"
  }

  fetch('https://middle.krsherpa.com/dashboard/getProjectGTAMGTCCount4KACPeriod', {

    method: "POST",
    body: JSON.stringify(filter),
    headers: {

      "Content-Type": "application/json",

    },
  })
    .then(r => r.json()).then(result => {

      console.log(result)

      this.pgivenToClientcountkac=result.givenToClientcount
      this.pgivenToAccMgrcounttkac=result.givenToAccMgrcountt
      this.pleadAttachedcountkac=result.leadAttachedcount



      result.emp = filter.empid;
      this.projectproductpdaykac = result
      console.log(this.projectproductpdaykac)
      return (result)

    })
}



Projectcountkac(id) {
  let filter = {

    "startDate": this.firstDay,
    "endDate": this.lastDay,
    "empid": id,
    "region": "xxxx"
  }

  fetch('https://middle.krsherpa.com/dashboard/getProjectGTAMGTCCount4KACPeriod', {

    method: "POST",
    body: JSON.stringify(filter),
    headers: {

      "Content-Type": "application/json",

    },
  })
    .then(r => r.json()).then(result => {

      console.log(result)

      this.givenToClientcountkac=result.givenToClientcount
      this.givenToAccMgrcounttkac=result.givenToAccMgrcountt
      this.leadAttachedcountkac=result.leadAttachedcount

      result.emp = filter.empid;
      this.projectproductkac = result
      console.log(this.projectproductkac)
      return (result)

    })
}

//Projectcount end

// event count

eventscountkac(id) {
  let filter = {

    "startDate": this.firstDay,
    "endDate": this.lastDay,
    "emp": id,
    "region": "xxxx"
  }

  fetch('https://middle.krsherpa.com/dashboard/eventcount4periodByempByCur', {

    method: "POST",
    body: JSON.stringify(filter),
    headers: {

      "Content-Type": "application/json",

    },
  })
    .then(r => r.json()).then(result => {

      console.log('eventscount', result)

      result.emp = filter.emp;
      this.eventproductkac = result[0]
      this.eventcompletekac = result[1]
      this.eventupcomingkac = result[0]

      this.eventcompletekac = result?.filter(obj => obj._id === "Completed");
      this.eventupcomingkac = result?.filter(obj => obj._id === "Upcoming");


      if (  !this.eventcompletekac)
      {
      this.eventcompletekac[0]=0 ;
  
      }
  
  if ( ! this.eventupcomingkac)
  {
  this.eventupcomingkac[0]=0;
  }
  
      return (result)

    })
}

Previousdaykac(id) {
  let filter = {
    "startDate": this.previousday,
    "endDate": this.today,
    "emp": id,
    "region": "xxxx"
  }

  fetch('https://middle.krsherpa.com/dashboard/eventcount4periodByempByCur', {

    method: "POST",
    body: JSON.stringify(filter),
    headers: {

      "Content-Type": "application/json",

    },
  })
    .then(r => r.json()).then(result => {

      console.log(result)

      result.emp = filter.emp;


      this.Previouscompletekac = result?.filter(obj => obj._id === "Completed");
      this.Previousupcomingkac = result?.filter(obj => obj._id === "Upcoming");
    
  if (  !this.Previouscompletekac)
  {
  this.Previouscompletekac[0]=0 ;

  }

if ( ! this.Previousupcomingkac)
{
this.Previousupcomingkac[0]=0;
}


      console.log(this.Previouscompletekac)
      console.log(this.Previousupcomingkac)
      return (result)

    })
}





/**************************** */




  empsByRegion: any;

  emplist: any[] = [];


  prjcountE: any;
  prjcountA: any;
  prjcountUS: any;

  prjExpectedEventcountE: any;
  prjExpectedEventcountA: any;
  prjExpectedEventcountUS: any;


  async empByRegion() {

    let filter = {
      "startDate": "2023-04-03",
      "endDate": new Date,
      "subPnLId": "5aeff14beeca133f51d9b74f"  //59de091ab209590806c49166
    }
    //get number of expected event by key accmanager id for a period
    await fetch('https://middle.krsherpa.com/dashboard/empByRegion', {
      method: "POST",
      body: JSON.stringify(filter),
      headers: {
        "Content-Type": "application/json",
      },
    }
    ).then(r => r.json()).then(async result => {

      this.empsByRegion = result;



      console.log(result)

      // Extract the employees list
      const employees = [];
      await this.empsByRegion.forEach(item => {
        this.emplist.push(...item.employees);
      });

      await this.GetTeam();

      await this.TRRCountCnt();



      await this.EventCnt();
      // Print the employees list

      await this.ExpCnt();

 await this.getTeamexperts();


 this.Projectcount();
 this.eventscount();
 this.Previousday()


    },
      (error: any) => {
        this.isLoading = false;
      }
    );

  }



  GetTeam() {


    var x = this.getusrIdsByReportingManagerId(this.emplist, this.whoaim?.id)

    this.member = x.map(item => this.getempname(item));
    
    this.getTeamByReportingManagerId(this.emplist, this.whoaim?.id,7)

  }


  getusrIdsByReportingManagerId(data, reportingManagerId) {
    let result = [];

    data.forEach(item => {
      if (item.repotingManagerId === reportingManagerId) {
        result.push(item.userId);
        result = result.concat(this.getIdsByReportingManagerId(data, item.userId));
      }
    });

    return result;
  }



  getIdsByReportingManagerId(data, reportingManagerId) {
    let result = [];

    data.forEach(item => {
      if (item.repotingManagerId === reportingManagerId) {
        result.push(item.userId);
        // result = result.concat(this.getIdsByRepoEventcountCntrtingManagerId(data, item.userId));
      }
    });

    return result;
  }

team:any;
teamuid:any;
  getTeamByReportingManagerId(data, reportingManagerId,designation) {
    let result = [];
    let uidresult = [];
    data.forEach(item => {
      if (item.repotingManagerId === reportingManagerId && item.designation === designation ) {
        result.push(item);
        uidresult.push(item.userId);
        // result = result.concat(this.getIdsByRepoEventcountCntrtingManagerId(data, item.userId));
      }
    });

    this.team=result
this.teamuid=uidresult;

    return result;
  }
  selecteduser:any;

  onSelectuser(event)
  {


console.log(event)
//alert(this.selecteduser)

var id=event.userId
this.Projectcounpdaykac(id)

this.Projectcountkac(id) 
this.eventscountkac(id) 
this.Previousdaykac(id)


  }



  getIdsByRegion(data, region) {
    let result: any;

    data.forEach(item => {
      if (item._id.trim() === region.trim()) {
        // result.push(item.userId);
        result = data.map(item => item.userId);
        // result = result.concat(this.getIdsByRepoEventcountCntrtingManagerId(data, item.userId));
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


  getclientname(id: any) {
    console.log(this.clientList);
    let client = this.clientList?.find((x) => x.id === id);
    console.log(client.companyName)
    var nm=client.companyName
    return nm.toString();
  }


  getempnamebyid(id: any) {
    //console.log(id);
    let reportingMgr = this.emplist?.find((x) => x.userId === id);
    //console.log(reportingMgr)
    return reportingMgr.name;
  }

  async TRRcount(filter) {


    await fetch('https://middle.krsherpa.com/dashboard/TRRCount4emp', {

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

        this.TRRcountCnt.push(result)

        //console.log(this.TRRcountCnt)

        return (result)


      });
  }


  async eventcount(filter) {


    await fetch('https://middle.krsherpa.com/dashboard/eventcount4periodByemp', {

      method: "POST",
      body: JSON.stringify(filter),
      headers: {

        "Content-Type": "application/json",

      },
    })
      .then(r => r.json()).then(result => {

        console.log('EventcountCnt', result)

        if (result) {

          result.forEach(item => {
            if (item._id == "Completed") {
              result.completed = item.count;
            }
            else if (item._id == "Upcoming") {
              result.upcomming = item.count;
            }


          });


        }

        result.emp = filter.emp;

        //console.log(filter.emp)

        this.EventcountCnt.push(result)

        //   console.log(this.EventcountCnt)

        return (result)


      });
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


  TRRcountCnt: any[] = [];

  EventcountCnt: any[] = [];


  async TRRCountCnt() {

    const reportingManagerId = "5aa630cdeeca133f51d98f98";

    //const ids = this.getIdsByReportingManagerId(this.emplist, reportingManagerId);
    var ids = this.getusrIdsByReportingManagerId(this.emplist, this.whoaim?.id)
    //console.log(ids)

    for (let index = 0; index < ids.length; index++) {
      const element = ids[index];

      let filter = {
        "startDate": this.firstDay,
        "endDate": this.lastDay,
        "emp": element
      }

      //console.log(filter)
      var result = await this.TRRcount(filter);

    }


    const name1 = this.TRRcountCnt.map(item => item.CRM);
    const name2 = this.TRRcountCnt.map(item => item.FTRR);



    const x = this.TRRcountCnt.map(item => this.getempname(item.emp));

    //console.log(x)
    //console.log(name1)

    var series = [
      {
        name: 'CRM',
        type: 'bar',
        data: name1,
        distributed: true
      }, {
        name: 'FTRR',
        type: 'bar',
        data: name2,
        distributed: true
      },
    ]


    this._TRRcountChart('["#33b2df","#546E7A","#d4526e","#13d8aa","#A5978B","#2b908f","#f9a3a4","#90ee7e","#f48024","#69d2e7"]', series, x);

    //console.log(this.KACWiseExpEventCnt)

  }


  async EventCnt() {

    const reportingManagerId = "5aa630cdeeca133f51d98f98";

    //const ids = this.getIdsByReportingManagerId(this.emplist, reportingManagerId);
    var ids = this.getusrIdsByReportingManagerId(this.emplist, this.whoaim?.id)
    //console.log(ids)

    for (let index = 0; index < ids.length; index++) {
      const element = ids[index];

      let filter = {
        "startDate": this.firstDay,
        "endDate": this.lastDay,
        "emp": element
      }

      //console.log(filter)
      var result = await this.eventcount(filter);

    }

    var emplst = [];
    var complst = [];
    var uplst = [];

    for (let index = 0; index < this.EventcountCnt.length; index++) {
      const element = this.EventcountCnt[index];

      // emplst.push(element.emp)



    }
    const name1 = this.EventcountCnt.map(item => item.completed || 0);
    const name2 = this.EventcountCnt.map(item => item.upcoming || 0);



    const x = this.EventcountCnt.map(item => this.getempname(item.emp));

    //console.log(x)
    //console.log(name1)

    var series = [
      {
        name: 'Completed',
        type: 'bar',
        data: name1,
        distributed: true
      }, {
        name: 'Upcoming',
        type: 'bar',
        data: name2,
        distributed: true
      },
    ]


    this._EventcountChart('["#2b908f","#f9a3a4","#90ee7e","#f48024","#69d2e7"]', series, x);

    //console.log(this.KACWiseExpEventCnt)

  }



  async ExpCnt() {

    const reportingManagerId = "5aa630cdeeca133f51d98f98";

    //const ids = this.getIdsByReportingManagerId(this.emplist, reportingManagerId);
    var ids = this.getIdsByReportingManagerId(this.emplist, this.whoaim?.id)
    console.log(ids)


    let filter = {
      "startDate": this.firstDay,
      "endDate": this.lastDay,
      "emps": ids.join(",")
    }

    //console.log(filter)
    var result = await this.expcount(filter);

    var emplst = [];
    var conplst = [];
    var reclst = [];

    var alllist = [];




    this.expertcntresult?.forEach(item1 => {

      item1?.statusCounts?.forEach(item => {

        if (item.status == "Recruited") {
          item1.Recruited = item.count;


        }
        else if (item.status == "Contacted") {
          item1.Contacted = item.count;
        }


      });

    });






    console.log(result)




    const name1 = this.expertcntresult.map(item => item.Recruited || 0);
    const name2 = this.expertcntresult.map(item => item.Contacted || 0);



    const x = this.expertcntresult.map(item => this.getempname(item._id));

    //console.log(x)
    //console.log(name1)

    var series = [
      {
        name: 'Recruited',
        type: 'bar',
        data: name1,
        distributed: true
      }, {
        name: 'Contacted',
        type: 'bar',
        data: name2,
        distributed: true
      },
    ]


    this._ExpcountChart('["#2b908f","#f9a3a4","#90ee7e","#f48024","#69d2e7"]', series, x);

    //console.log(this.KACWiseExpEventCnt)

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


  private _EventcountChart(colors: any, series, x) {

    colors = this.getChartColorsArray(colors);

    this.EventcountChart = {
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
        // dashArray: [0, 3, 0],
        width: [1, 1, 1],
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


  private _ExpcountChart(colors: any, series, x) {

    colors = this.getChartColorsArray(colors);

    this.ExpcountChart = {
      series: series,
      chart: {
        height: 350,
        width: '100%',
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
        // dashArray: [0, 3, 0],
        width: [1, 1, 1],
      },
      fill: {
        opacity: [1, 1, 1]
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

  getflor(val) {
    return Math.floor(val)
  }

  private _TRRcountChart(colors: any, series, x) {

    colors = this.getChartColorsArray(colors);

    this.TRRcountChart = {
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
        // dashArray: [0, 3, 0],
        width: [1, 1, 1],
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
  OverviewChart112:any; 
  pieChart3:any; 




  private _pieChart3(colors: any, count, y: any) {
    colors = this.getChartColorsArray(colors);
  
console.log('y valuse', y)
    this.pieChart3 = {
      series: count,
      labels: y,
      chartOptions: {
        labels:y,
        
      },
      chart: {
          type: "pie",
          height: 278,
         // background:'linear-gradient(185deg, rgba(179,233,240,1) 0%, rgba(49,66,244,1) 100%)',
          events: {
            dataPointSelection: (event:any, chartContext:any, config:any) =>{
             // alert(config.w.config.labels[config.dataPointIndex]);
              

            
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

  /*
    this.pieChart3 = {
      series: count,
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
        },
        tickAmount: 4,
        min: 0
      },
      colors: colors
    };

*/
//prjcolChart  prjpieChart
/*
// Get the chart element by its id
var chart = ApexCharts.getChartByID('prjpieChart');

// Update the chart options (if needed)
chart.updateOptions({
  // Updated chart options here
});

// Force refresh the chart
chart.render();  */

  }

projectcounts:any;

//second coloum graph start
async geteventcount() {

  let filter = {
    "clientId":"5d4009004b488a0d4ad2c508,5dba64118a0f8a737178cb6c,5ad58bceeeca133f51d9abbb,599ed7ff98366418de5d12bd"
  }
  // debugger

  await fetch('https://middle.krsherpa.com/dashboard/projectlistbyclient', {

    method: "POST",
    body: JSON.stringify(filter),
    headers: {

      "Content-Type": "application/json",

    },
  })
    .then(r => r.json()).then(result => {
      console.log("result2"+result)
      
     
      const names = result.map(item =>this.getclientname(item._id));
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
      this._OverviewChart12('["#1E90FF", "#00008B", "#1E90FF"]', series, x);

      console.log("x value"+ x)


      const namelst = result.map(item =>this.getclientname(item._id).toString());
      const count = result.map(item => item.count);
     
      //var status = nid1[0].status
  
      console.log(namelst);
      //console.log(nid1);
      var status: string;
      this._pieChart3('["--vz-red", "--vz-green","--vz-pink","--vz-yellow" ]',count,namelst);
  





    },
      (error: any) => {
        this.isLoading = false;
      }
    );
}

private _OverviewChart12(colors: any, series, x) {

  colors = this.getChartColorsArray(colors);

  this.OverviewChart112 = {
    series: series,
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
      width: [1, 1, 1],
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
      labels:
      {
        formatter: function (y: any) {
          if (typeof y !== "undefined") {
            return y.slice(0, 8);
          }
          return y;

        }
      },
      axisBorder: {
        show: false
      },
      tooltip: {
        enabled: true
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
        columnWidth: '20%',
        barHeight: '70%',
        maxBarWidth: 20, 

      }
    },

    colors: colors,
    tooltip: {
      shared: false,
      y: [{
        formatter: function (y: any) {
          if (typeof y !== "undefined") {
            return y.slice(0, 8);
          }
          return y;

        }
      }, {
        formatter: function (y: any) {
          if (typeof y !== "undefined") {
            return  y.slice(0, 8);
          }
          return y;

        }
      }, {
        formatter: function (y: any) {
          if (typeof y !== "undefined") {
            return  y.slice(0, 8);
          }
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


getTeamexperts() {

  let filter = {
    "emps":"60e16f74f55a3e6edbcd4de4,642d5ab7c569d7367593ca88,62e62b11e50d9d1435e0c680,645331e07f8cd62ba8fc68d5"
  }
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
    this._OExpertcount4POClist('["#1E90FF", "#00008B", "#1E90FF"]', series, x);


    this._myexperty('["#1E90FF", "#00008B", "#1E90FF"]', totalsum, name1);
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
          return value + "k" + " Users";
        }
      },
      tickAmount: 4,
      min: 0
    },
    colors: colors
  };
}

Expertcount4POClist:any;

private _OExpertcount4POClist(colors: any, series, x) {

  colors = this.getChartColorsArray(colors);

  this.Expertcount4POClist = {
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


}
