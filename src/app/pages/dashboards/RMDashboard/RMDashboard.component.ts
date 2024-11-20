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
import { forEach } from 'lodash';

//import {EventkrService} from '../../../core/services/krevent.service';


@Component({
  selector: 'app-RMDashboard',
  templateUrl: './RMDashboard.component.html',
  styleUrls: ['./RMDashboard.component.scss'],
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

export class RMDashboardComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  statData!: any;
  statDatac!:any;
  whoaim:any;
 //@ViewChild(BarComponent) child:BarComponent;
// @ViewChild(PieComponent) piechild:PieComponent;
// @ViewChild(BarexComponent) exchild:BarexComponent;
roles: string='';
krroles: string[]=[];
member: any;
//gs-------from old ------------

TRRcountChart: any;
EventcountChart: any;
ExpcountChart: any;

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

firstDay:any;
lastDay:any;
isLoading: boolean = false;



 ngOnInit():  void  {


  var date = new Date(),
   y = date.getFullYear(),
    m = date.getMonth();
  this.firstDay = new Date(y, m, 1);
  this.lastDay = new Date(y, m + 1, 0);


 this.empByRegion();
//this.geteventchart();


const region = "EMEA";
const designation = 11;
/*

*/


//this.semiCircleChart=null;
  var date = new Date(),
   y = date.getFullYear(),
    m = date.getMonth();
  this.firstDay = new Date(y, m, 1);
  this.lastDay = new Date(y, m + 1, 0);

console.log( this.firstDay,this.lastDay)

this.isLoading=true;

  this.whoaim = JSON.parse(localStorage.getItem('user'));
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





}



empsByRegion:any;
  
emplist:any[]=[];


prjcountE :any;
prjcountA :any;
prjcountUS :any;

prjExpectedEventcountE :any;
prjExpectedEventcountA :any;
prjExpectedEventcountUS :any;


 async empByRegion() {

   let filter = {
     "startDate": "2023-04-03",
     "endDate": new Date,
     "subPnLId":"59de091ab209590806c49166"
 }
 //get number of expected event by key accmanager id for a period
  await fetch('https://middle.krsherpa.com/dashboard/empByRegion', {
     method: "POST",
     body: JSON.stringify(filter),
     headers: { 
       "Content-Type": "application/json",
     },
   }
   ).then(r => r.json()).then( async result => {
     
 this.empsByRegion=result;

 

  console.log(result)

// Extract the employees list
const employees = [];
await this.empsByRegion.forEach(item => {
 this.emplist.push(...item.employees);
});

await this.GetTeam();

await  this.TRRCountCnt();

await this.EventCnt();
// Print the employees list

//await this.ExpCnt();

await this.getTeamexperts()

   },
     (error: any) => {
       this.isLoading = false;
     }
   );
 
 }



 GetTeam( ) {


var x=this.getusrIdsByReportingManagerId(this.emplist,this.whoaim?.id)

this.member =x.map(item => this.getempname(item));


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


getempname(id: any) {
  //console.log(id);
  let reportingMgr = this.emplist?.find((x) => x.userId === id);
  //console.log(reportingMgr.name)
  return reportingMgr.name;
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

      console.log('EventcountCnt',result)

if (result)
{

   result.forEach(item => {
if (item._id=="Completed")
{
  result.completed = item.count;
}
else if (item._id=="Upcoming")
{
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

expertcntresult:any;

async expcount(filter:any) {

  console.log('expcount',filter)

  await fetch('https://middle.krsherpa.com/dashboard/Expertcount4POClisteach', {

    method: "POST",
    body: JSON.stringify(filter),
    headers: {

      "Content-Type": "application/json",

    },
  })
    .then(r => r.json()).then(result => {

      console.log('expcount',result)


     // result.emp = filter.emp;

      //console.log(filter.emp)

    //  this.EventcountCnt.push(result)

    this.expertcntresult=result;

      return (result)


    });

return null

}


TRRcountCnt: any[] = [];

EventcountCnt: any[] = [];


async TRRCountCnt() {

  const reportingManagerId = "5aa630cdeeca133f51d98f98";

  //const ids = this.getIdsByReportingManagerId(this.emplist, reportingManagerId);
var ids=this.getusrIdsByReportingManagerId(this.emplist,this.whoaim?.id)
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
var ids=this.getusrIdsByReportingManagerId(this.emplist,this.whoaim?.id)
  //console.log(ids)

  for (let index = 0; index < ids.length; index++) {
    const element = ids[index];

    let filter = {
      "startDate":this.firstDay,
      "endDate": this.lastDay,
      "emp": element
    }

    //console.log(filter)
    var result = await this.eventcount(filter);

  }

var emplst=[];
var complst=[];
var uplst=[];

for (let index = 0; index < this.EventcountCnt.length; index++) {
  const element = this.EventcountCnt[index];

 // emplst.push(element.emp)


  
}
  const name1 = this.EventcountCnt.map(item => item.completed || 0 );
  const name2 = this.EventcountCnt.map(item => item.upcoming || 0 );



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
var ids=this.getusrIdsByReportingManagerId(this.emplist,this.whoaim?.id)
  //console.log(ids)


    let filter = {
      "startDate":this.firstDay,
      "endDate": this.lastDay,
      "emps":  ids.join(",")
    }

    //console.log(filter)
    var result = await this.expcount(filter);

    var emplst=[];
    var conplst=[];
    var reclst=[];

       var alllist=[];
  


    
       this.expertcntresult.forEach(item1 => {

        item1.statusCounts.forEach(item => {

    if (item.status=="Recruited")
    {
      item1.Recruited = item.count;

      
    }
    else if (item.status=="Contacted")
    {
      item1.Contacted = item.count;
    }
      
    
       }); 
    
      }); 

  




    console.log(result)




  const name1 = this.expertcntresult.map(item => item.Recruited || 0 );
  const name2 = this.expertcntresult.map(item => item.Contacted || 0 );



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

getflor(val)
{
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


getTeamexperts() {


  // debugger

  var ids=this.getusrIdsByReportingManagerId(this.emplist,this.whoaim?.id)
  //console.log(ids)


let filter={
"emps": ids.join(",")
}



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
      name: 'Recruited',
      type: 'bar',
      data: Recruitedarray,
    },
    {
      name: 'Contacted',
      type: 'bar',
      data: Contactedarray,
       distributed: true
    },
  ]

    var x =  names

    const xnames = result.map(item => this.getempname(item._id));


    this._OExpertcount4POClist('["#FF6347", "#00FF00", "#1E90FF"]', series, xnames);


    this._myexperty('["#7B68EE", "#FFB6C1", "#1E90FF"]', totalsum, name1);
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
          return value + " " + " Experts";
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
        columnWidth: '20%',
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
