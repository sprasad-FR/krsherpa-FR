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
  selector: 'app-rmdb1',
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

export class RmdbComponent implements OnInit {

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

  getclients()
  {

 

 this.employeeService.getAll().subscribe(
  (client: any) => {
    this.clients=client;
    console.log('data',client);

    //  console.log('compliancealldata Details', this.compliancealldata);
    //   var userData = JSON.parse(window.localStorage.getItem('user'));
  },
  (error: any) => {}
);
  
  }


  private getProject(uid:any) {

    debugger
    const filters = new Map();
    const filter = {
      include: [
        {
          relation: 'keyAccMgr',
        },
        {
          relation: 'researchManager',
        },
        {
          relation: 'client',
        },
      ],
      where: {},
      order: 'createdAt desc',
      limit:50,
    };

    if (this.roles === 'researchAnalyst') {
      filter.where = { researchAnalyst: this.whoaim?.id };
    }
    if (this.roles === 'researchManager') {
      filter.where = { researchManagerId: this.whoaim?.id };
    }
    if (this.roles === 'keyAccountManager') {
      filter.where = { keyAccMgrId: this.whoaim?.id };
    }
    if (this.roles === 'client') {
      filter.where = { clientId: this.client?.id };
    }
    if (
      this.roles === 'admin' ||
      this.roles === 'compliance' ||
      this.roles === 'mainPLHead' ||
      this.roles === 'subPLHead'
    ) {
      // filter.where = {};
    }
    if (this.roles === 'expert') {
      filter.where = { 'leadAttached.id': this.expert.id } || { 'givenToAccMgr.id': this.expert.id } || {
          'givenToClient.id': this.expert.id,
        };
    }

    if (
      this.roles != 'admin' &&
      this.roles != 'researchManager' &&
      this.roles != 'keyAccountManager' &&
      this.roles != 'researchAnalyst' &&
      this.roles != 'client' &&
      this.roles != 'expert' &&
      this.roles != 'compliance' &&
      this.roles != 'mainPLHead' &&
      this.roles != 'subPLHead'
    ) {
    //  filter.where = { assigneeId: this.whoaim.id };
    }




    filter.where = {"or":[{"researchAnalyst":uid},{"researchManagerId":uid},{"keyAccMgrId":uid}, {"subPnL":uid}] };



    filters.set('filter', JSON.stringify(filter));
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
      },
      (error: any) => {}
    );
  }

  renderDate(date: string, args?: any) {
    const dateFormat = args ? args : this.defaultFormat;
    return date ? moment.utc(date).local().format(dateFormat) : date;
  }


  getEventCounts(id:any)
  {
//"5a27db8fd7d1377e69ed21e9" sanya
    const filters = new Map();
    const filter = {
      where: {},
    };
   
id="5a27db8fd7d1377e69ed21e9";
 //  let start=new Date().getFullYear().toString()+"-"+new Date().getMonth().toString()+"-"+"01"; 
  //let  end=new Date().getFullYear().toString()+"-"+new Date().getMonth().toString()+"-"+new Date().getDay().toString()
 let start="2010-01-01";

  let end="2023-01-31"
   // {"eventAt":{"gte" :start}},  {"eventAt":{"lt" :end}}

  //  {"where":{"and":[{"_id":{"ne":null}}],"or":[{}]},"skip":0}


    filter.where = {"or":[{"researchAnalystId":id},{"researchMgrId":id},{"keyAccountManager":id}, {"subPnL":id}],"and":[{"status":"Completed"}, {"eventAt":{"gte" :start}},  {"eventAt":{"lt" :end}}] };

 // filter.where = {"and":   [{"sourceType":type4},{"createdAt":{"gte" :start}}]};

    filters.set('filter', JSON.stringify(filter));

 this.eventService.getCount(filters).subscribe(
  (client: any) => {
    this.boxvalue2=client;
    this.boxtext2="Completed Events";

    console.log('data',client);

    //  console.log('compliancealldata Details', this.compliancealldata);
    //   var userData = JSON.parse(window.localStorage.getItem('user'));
  },
  (error: any) => {  console.log('error',error);}
);


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


  getEvents(uid:any) {
    const filters = new Map();
    const filter = {
      include: [
        {
          relation: 'krResearchMgr',
        },
        {
          relation: 'expert',
        },
        {
          relation: 'project',
        },
      ],
      where: {},

    };

    if (this.roles === 'researchManager') {
      filter.where = { researchMgrId: uid };
    }
    if (this.roles === 'researchAnalyst') {
      filter.where = { researchAnalystId: uid};
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
      // filter.where = {};
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


    filter.where = {"or":[{"researchAnalystId":uid},{"researchMgrId":uid},{"keyAccountManager":uid}, {"subPnL":uid}]};



    filters.set('filter', JSON.stringify(filter));
    this.eventService.getAll(filters).subscribe(
      (events) => {
        this.eventList = events;
        this.todaysEvent = this.eventList.filter((x) => new Date(x.eventAt) === new Date());
        this.upcomingEventList = this.eventList.filter((x) => x.status === 'Upcoming').sort(x=>x.eventAt ).reverse();
        this.completedEventList = this.eventList.filter((x) => x.status === 'Completed').sort(x=>x.eventAt ).reverse();
        this.cancelledEventList = this.eventList.filter((x) => x.status === 'Cancelled').sort(x=>x.eventAt ).reverse();
             if (this.roles === 'admin') {
          this.statData[3].value = this.eventList.length;
        }
        if (this.roles === 'expert') {
          this.expertStatData[1].value = this.eventList.length;
        }
      },
      (error: any) => {}
    );
  }




  getPrjCounts(id:any)
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
   // {"eventAt":{"gte" :start}},  {"eventAt":{"lt" :end}}

  //  {"where":{"and":[{"_id":{"ne":null}}],"or":[{}]},"skip":0}


   


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
   // {"eventAt":{"gte" :start}},  {"eventAt":{"lt" :end}}

  //  {"where":{"and":[{"_id":{"ne":null}}],"or":[{}]},"skip":0}


   


filter.where = {"or":[{"krRelationshipMgrId":id}],"and":[{"status":"Recruited"}] };

// filter.where = {"and":   [{"sourceType":type4},{"createdAt":{"gte" :start}}]};

   filters.set('filter', JSON.stringify(filter));

this.expertService.getCount(filters).subscribe(
 (client: any) => {
   this.boxvalue4=client;
   this.boxtext4="Total Experts";

   console.log('data',client);

   //  console.log('compliancealldata Details', this.compliancealldata);
   //   var userData = JSON.parse(window.localStorage.getItem('user'));
 },
 (error: any) => {}
);


filter.where = {"or":[{"krRelationshipMgrId":id}],"and":[{"status":"Recruited","terms":true}] };

// filter.where = {"and":   [{"sourceType":type4},{"createdAt":{"gte" :start}}]};

   filters.set('filter', JSON.stringify(filter));

this.expertService.getCount(filters).subscribe(
 (client: any) => {
   this.boxvalue5=client;
   this.boxtext5="Experts Signed";

   console.log('data',client);

   //  console.log('compliancealldata Details', this.compliancealldata);
   //   var userData = JSON.parse(window.localStorage.getItem('user'));
 },
 (error: any) => {}
);


filter.where = {"or":[{"krRelationshipMgrId":id}],"and":[{"status":"Recruited","terms":false}] };

// filter.where = {"and":   [{"sourceType":type4},{"createdAt":{"gte" :start}}]};

   filters.set('filter', JSON.stringify(filter));

this.expertService.getCount(filters).subscribe(
 (client: any) => {
   this.boxvalue6=client;
   this.boxtext6="Experts Not Signed";

   console.log('data',client);

   //  console.log('compliancealldata Details', this.compliancealldata);
   //   var userData = JSON.parse(window.localStorage.getItem('user'));
 },
 (error: any) => {}
);

/* */

  
  }

  getrgnCnt(rgn:any)
  {
    //debugger
    console.log('region data',this.ExpertRegionCount.find(x=>x.Region==rgn));

   return this.ExpertRegionCount.find(x=>x.Region==rgn)?.['count']

  }



  getPOCCount()
  {

 

 this.expertService.expertPOCcount().subscribe(
  (experts: any) => {
    this.ExpertRegion=experts;
    console.log('ExpertRegion',experts);


    this.ExpertRegionCount=this.getRegionCount();

    console.log('ExpertRegionCount',this.ExpertRegionCount);

    // Chart Color Data Get Function
    this._portfolioChart('["#3be618", "#188be6", "#3f5efb", "--vz-success"]');
 
    
    let arr= this.ExpertRegion.filter(x=>x.mgrid=='5fbb2bf997ccc319db183148')
    console.log('arr', arr);
              var resultx = arr.map((a: { name: any; }) => a.name);

              var resulty = arr.map((a: { conCount: any; }) => a.conCount);

              console.log('resultx', resultx);
              console.log('resulty', resulty);

              this._OverviewChart('["--vz-primary", "--vz-warning", "--vz-success"]',resultx,resulty );




/*
    let arr= this.ExpertRegion.filter(x=>x.region=='EMEA')

    console.log('arr', arr);
    var resultx = arr.map((a: { name: any; }) => a.name);

    var resulty = arr.map((a: { Count: any; }) => a.Count);

    console.log('resultx', resultx);
    console.log('resulty', resulty);

    this._OverviewChart('["--vz-primary", "--vz-warning", "--vz-success"]',resultx,resulty );

*/


    //  console.log('compliancealldata Details', this.compliancealldata);
    //   var userData = JSON.parse(window.localStorage.getItem('user'));
  },
  (error: any) => {}
);
  
  }


  get()
  {

 

 this.expertService.expertPOCcount().subscribe(
  (experts: any) => {
    this.ExpertRegion=experts;
    console.log('ExpertRegion',experts);


    //var resulty = arr.map((a: { Count: any; }) => a.Count);  recCount, ripCount




    this.ExpertRegionCount=this.getRegionCount();
    console.log('ExpertRegionCount',this.ExpertRegionCount);

    // Chart Color Data Get Function
    this._portfolioChart('["#3be618", "#188be6", "#3f5efb", "--vz-success"]');
   
    //  console.log('compliancealldata Details', this.compliancealldata);
    //   var userData = JSON.parse(window.localStorage.getItem('user'));
  },
  (error: any) => {}
);
  
  }




  ngOnInit(): void {


    debugger
    
    this.getPOCCount();

    this._semiCircleChart('["--vz-primary"]');

this.getEventCounts("60a2b8466fc81f44dca3c215");

this.getExpCounts("60a2b8466fc81f44dca3c215");
this.getPrjCounts("60a2b8466fc81f44dca3c215");

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
     this.fetchData();
     this.statDatac=statDatac;

    // Chart Color Data Get Function
    
    this._status7('["--vz-success", "--vz-primary", "--vz-warning", "--vz-danger"]');


    this.getProject("60a2b8466fc81f44dca3c215")
    this.getEvents("60a2b8466fc81f44dca3c215")



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


    this.getRMDashdata("59de0a38b209590806c49169");  //"59de0a38b209590806c49169");

    this.creatorsData = creatorsData;

  }


/********************RM****/

getRMDashdata(uid:any) {


  const filters = new Map();
    const filter = {
      
 
       where: {},
      
     };
 
      filter.where = {
           and: [
                       
               {   
                // "repotingManagerId":"5aeff14beeca133f51d9b74f"  //"59de0a38b209590806c49169"
                      // For account managers          //this.leadForm.value.employeeId,
               },
               // {"repotingManagerId":this.whoaim?.id  //  "5aeff14beeca133f51d9b74f"  //'ObjectId("5aeff14beeca133f51d9b74f")'     // For account managers          //this.leadForm.value.employeeId,
               //}
           ],
         };
 
     filters.set('filter', JSON.stringify(filter));
 
   //console.log (filters);
 
    this.employeeService.getAll(filters).subscribe((res) => {
 
            //console.log('this.employeeService1');
         console.log(res);
           let allEmployee = res;
           //console.log (res);
 
          
            let emparry: any[] = [];
 
           //set Employee list on localstorage
    for (let index = 0; index < allEmployee.length; index++)  {
     
 //console.log('datatype', allEmployee);
 
 if (allEmployee[index].repotingManagerId==uid)
 {
 emparry.push({id:allEmployee[index].userId,name:allEmployee[index].name});
 
 }
 //emparry.push(allEmployee[index].userId);
      }
    console.log ('rm dashboard 1');
    console.log (emparry);
 
 /**/
 
 
 this.subpnlCurMonthData= [{ "id":"", "GTAM ": "0", "GTC ": "0","Evntcnt":"0","Convrate":"0","AvgGP":""}];
 
 this.subpnlPrevdayData= [{"id":"","GTAM ": "0", "GTC ": "0","Evntcnt":"0","Convrate":"0","AvgGP":""}];
 
 this.subpnlPrevMonthData= [{"id":"","GTAM ": "0", "GTC ": "0","Evntcnt":"0","Convrate":"0","AvgGP":""}];
 
 
 this.subpnlProfitCurMonthData= [{"id":"","calls ": "0", "events": "0","revenue":"0","GP":"0"}];
 
 this.subpnlProfitPrevdayData=  [{"id":"","calls ": "0", "events": "0","revenue":"0","GP":"0"}];
 
 this.subpnlProfitPrevMonthData=  [{"id":"","calls ": "0", "events": "0","revenue":"0","GP":"0"}];
 
 /*
 
 */
 
 if (emparry)
   {
    
  for (let index = 0; index < emparry.length; index++)  { 
 
 
 
 
 this.RMCurMonthData.push({ id:emparry[index].id, name:emparry[index].name, FTRR: "0", CRM: "0",SR:"0",TRR :"0",Total:"",AvgHon:""});
 this.RMcurdayData.push({ id:emparry[index].id, name:emparry[index].name, FTRR: "0", CRM: "0",SR:"0",TRR :"0",Total:"",AvgHon:""});
 this.RMProfitCurMonthData.push({id:emparry[index].id, name:emparry[index].name, calls: "0", events: "0",GP:"0",Inc:"0"});
 this.RMProfitcurdayData.push({ id:emparry[index].id, name:emparry[index].name, calls: "0", events: "0",GP:"0",Inc:"0"});
 
 //RMCurMonthData
 //RMcurdayData
  //console.log ('emparry 2');
    // console.log (emparry[index]);
 
 
   this.getRMEventCount(emparry[index].id,1); //  1= lastmonth
 //this.getGTC(emparry[index],1);
 this.getRMProfitabilityCount(emparry[index].id,1);
 this.getRMProfitabilityProgEntCount (emparry[index].id,1);
 
   this.getRMEventCount(emparry[index].id,2); //  1= lastmonth
 //this.getGTC(emparry[index],1);
 this.getRMProfitabilityCount(emparry[index].id,2);
 this.getRMProfitabilityProgEntCount (emparry[index].id,2);
 
 
 }
 
 }
 




 
 //console.log ('this.subpnlCurMonthData',this.subpnlCurMonthData);
 
 });
 
 
 
 
 
 }
 

/******RM***/



getRMEventCount(uid:any,type:any) {

 // this.ClInvoiceTotal=0;
 //debugger
 //this.barchartdata=[];
   let year = new Date().getFullYear();
   let month = new Date().getMonth()+1;
     let dt = new Date().getDate();
 
     year=2023; //gs
 
 var start='2010' +"-1"+"-1";   //gs
 
 var end=year +"-"+month+"-"+dt;
 
 
 if (type==1)  //cur day
 {
 
 let dtp=dt-1;
 let dtn=dt+1;
 
 
 let txtmon=month+"";
 if (month < 10) {
   txtmon = "0" + month;
 }
 
 let txtdtp=dtp+"";
 if (dtp < 10) {
   //txtdtp = "0" + dtp;
 }
 let txtdtn=dtn+"";
 if (dtn < 10) {
  // txtdtn = "0" + dtn;
 }
 
  start=year +"-"+txtmon+"-"+txtdtp; 
 
  end=year +"-"+txtmon+"-"+txtdtn;
 
 }
 else    //current month sofar
 {
 
 let txtmon=month+"";
 if (month < 10) {
   txtmon = "0" + month;
 }
 start=year +"-"+txtmon+"-1"; 
 
 end=year +"-"+txtmon+"-"+dt;
 
 }
 
 
 start='2010' +"-01"+"-1";   //gs
 
 
 console.log('start',start);
 //debugger
 ////console.log('end',end);
 
 let totgtgpnt=0;
 let totmincnt=0;
 let totevcnt=0;
     const filters = new Map();
    const filter = {
      
 
       where: {},
       order: 'createdAt DESC',
     };
 
      filter.where = {
           and: [
              
                 {"givenToAccMgr.attachedBy":uid},         
               {"givenToAccMgr.createdAt":{"gte":start}},
             {"givenToAccMgr.createdAt":{"lt":end}}
          //    {"createdAt":{"gte" :start}},
           //  {"createdAt":{"lt" :end}}
           ],
         };
      
     //  {"givenToAccMgr.createdAt":{"gte" :new Date(start)}},
           //  {"givenToAccMgr.createdAt":{"lt" :new Date(end)}}
 
     filters.set('filter', JSON.stringify(filter));
 
     this.projectService.getAll(filters).subscribe(
       (projects5: any) => {
 
 //debugger
 
      //console.log("projects5 ",projects5);
         //console.log("projects cnt",projects5.length);
         this.isLoading = false;
  ////console.log("projects givenToAccMgr",projects[1].givenToAccMgr)
 let totgtamcnt=0;
 let totgtcmcnt=0;
 let avghon=0;
   for (let index = 0; index < projects5.length; index++)  {
  //console.log("project"+index,projects5[index]?.givenToAccMgr?.length);
 if ((projects5[index]?.rate )&& (projects5[index]?.rate>0))
 {
 avghon=avghon+projects5[index]?.rate;
 }
    if (projects5[index]?.givenToAccMgr?.length>0)
    {
     //console.log("in 1");
 
     //const result = projects5[index]?.givenToAccMgr.filter( (project:any)=> (project["createdAt"]> start && project["createdAt"]< end) &&(project["attachedBy"]==uid))
     const result = projects5[index]?.givenToAccMgr.filter( (project:any)=> (project["attachedBy"]==uid))
   
 //console.log("in 1 -cont",result?.length);
 
     if (result?.length>0)
     {
           //console.log("in 1");
       totgtamcnt=totgtamcnt+result.length; 
 
     }
     if (projects5[index]?.givenToClient?.length>0)
     {
 
   //  const result1 = projects5[index]?.givenToClient.filter( (project:any)=> (project["createdAt"]> start && project["createdAt"]< end) &&(project["attachedBy"]==uid)&&(project["isnew"]=='Yes')  )
     
   const result1 = projects5[index]?.givenToClient.filter( (project:any)=> ((project["attachedBy"]==uid)&&(project["isnew"]=='Yes')  ))
     
 //console.log("in 1 -cont",result?.length);
 
     if (result1?.length>0)
     {
           //console.log("in 1");
       totgtcmcnt=totgtcmcnt+result1.length; 
 
     }
   }
 
    }
 
 
  }
 
 
 
   //this.RMCurMonthData=[{ id:emparry[index], FTRR: "0", CRM: "0",SR:"0",TRR :"0",Total:"",,Avg. Hon:""}];
   //this.RMcurdayData=[{ id:emparry[index], FTRR: "0", CRM: "0",SR:"0",TRR :"0",Total:"",,Avg. Hon:""}];
   if (type==1)
   {
     const obj= this.RMcurdayData.find((x:any)=>x.id==uid)
   //this.subpnlCurMonthData= {"GTAM ": "0", "GTC ": "0","Evntcnt":"0","Convrate":"0","AvgGP":""};
    // this.subpnlPrevMonthData.GTAM=totgtamcnt;
    obj.CRM=totgtamcnt-totgtcmcnt;
    obj.FTRR=totgtcmcnt;
     obj.TRR=totgtgpnt +totgtcmcnt;
      obj.AvgHon=avghon/ projects5.length;
   }
   else
   {
     const obj= this.RMCurMonthData.find((x:any)=>x.id==uid)
     //this.subpnlCurMonthData.GTAM=totgtamcnt;
    obj.CRM=totgtamcnt-totgtcmcnt;
    obj.FTRR=totgtcmcnt;
     obj.TRR=totgtgpnt +totgtcmcnt;
      obj.AvgHon=avghon/projects5.length;
   }
 
 


   debugger

   var resultx = this.RMCurMonthData.map((a: { name: any; }) => a.name);
  
   var resulty = this.RMCurMonthData.map((a: { TRR: any; }) => a.TRR);
  
   resultx=["Aishwarya Bawa","Beulah Preeti","Mohammad Omair","Muskan Gakhreja","Paarika Bhardwaj","Shekhar Ubale","Sonal Sultania","Soniya Mondal"]
   resulty=[3,1,5,8,12,4,0,6]
  
   this.GetProductivity('',resultx,resulty);


   resulty=[5,0,4,8,6,74,0,8]
  this.GetProfitability('',resultx,resulty);

 
 }
 
       ,
       (error: any) => {
 
      debugger   
       }
     );
   }
 
 
 
 getRMProfitabilityCount(uid:any,type:any) {
 
  //this.ClInvoiceTotal=0;
 
 //this.barchartdata=[];
   let year = new Date().getFullYear();
   let month = new Date().getMonth()+1;
     let dt = new Date().getDate();
 
 var start=year +"-1"+"-1"; 
 
 var end=year +"-"+month+"-"+dt;
 
 
  if (type==1)  //day
 {
 
 let dtp=dt-1;
 let dtn=dt+1;
 
 
 let txtmon=month+"";
 if (month < 10) {
   txtmon = "0" + month;
 }
 
 let txtdtp=dtp+"";
 if (dtp < 10) {
   //txtdtp = "0" + dtp;
 }
 let txtdtn=dtn+"";
 if (dtn < 10) {
  // txtdtn = "0" + dtn;
 }
 
  start=year +"-"+txtmon+"-"+txtdtp; 
 
  end=year +"-"+txtmon+"-"+txtdtn;
 
 }
 else    //current month sofar
 {
 
 let txtmon=month+"";
 if (month < 10) {
   txtmon = "0" + month;
 }
 start=year +"-"+txtmon+"-1"; 
 
 end=year +"-"+txtmon+"-"+dt;
 
 }
 start='2010' +"-01"+"-1";   //gs
 ////console.log('start getsubpnlProfitabilityCount Completed',start);
 
 //console.log('end getsubpnlProfitabilityCount Completed',end);
 
 let totgtgpnt=0;
 let totmincnt=0;
 let totproft=0;
 let totevcnt=0;
     const filters = new Map();
    const filter = {
      
 
       where: {},
       order: 'createdAt DESC',
     };
     filter.where = {
           and: [
                       
               {"researchAnalystId" : uid                 //this.leadForm.value.employeeId,
               },
            // {"createdAt":{"gte" :"2202-"}},
            // {"createdAt":{"lt" :end}}
               {"eventAt":{"gt" :start}},
             {"eventAt":{"lt" :end}},
               {"status": "Completed"}
           ],
         };
     filters.set('filter', JSON.stringify(filter));
 
     this.eventService.getAll(filters).subscribe(
       (response) => {
       let  eventLstcn= response;
 
 debugger
 
 
       totevcnt=eventLstcn.length;
 
       ////console.log("eventLstcn getsubpnlProfitabilityCount Completed",eventLstcn);
      // eventLst= response;
       //  this.unbilledEvents = this.eventList?.filter((x) => x.clientInvoiceId == '');
        // this.billedEvents = this.eventList?.filter((x) => x.clientInvoiceId != '');
   // this.billedEvents = this.eventList?.filter((x) => x.clientInvoiceId != '');
 
 for (let index = 0; index < eventLstcn.length; index++)  {
       
 
 
     if (eventLstcn[index]?.clientPayableAmount && eventLstcn[index]?.clientPayableAmount !=undefined)
     {
 
     totproft=totproft+(eventLstcn[index].clientPayableAmount!);
 
 if (eventLstcn[index]?.expertPayment && eventLstcn[index]?.expertPayment!=undefined )
 {
     totgtgpnt=totgtgpnt+(eventLstcn[index]?.clientPayableAmount!-parseInt(eventLstcn[index]?.expertPayment!));
 }
 else{
 
   totgtgpnt=totgtgpnt+(eventLstcn[index]?.clientPayableAmount!-0);
 }
 
    totmincnt=totmincnt+eventLstcn[index]?.eventDuration!;
 
 }
 
 }
 /*
 
   this.RMProfitCurMonthData.push({ id:emparry[index], calls: "0", events: "0",GP:"0",Inc:"0"});
 this.RMProfitcurdayData.push({ id:emparry[index], calls: "0", events: "0",GP:"0",Inc:"0"}); 
 */
 if (type==1)
 {
   const obj= this.RMProfitcurdayData.find((x:any)=>x.id==uid)
 //this.subpnlCurMonthData= {"GTAM ": "0", "GTC ": "0","Evntcnt":"0","Convrate":"0","AvgGP":""};
  // this.subpnlPrevMonthData.GTAM=totgtamcnt;
  obj.events=totevcnt;
  
   obj.GP=totgtgpnt;
   obj.Inc='';
 }
 else if (type==2)
 {
   const obj= this.RMProfitCurMonthData.find((x:any)=>x.id==uid)
   //this.subpnlPrevdayData.GTAM=totgtamcnt;
    obj.events=totevcnt;
 
   obj.GP=totgtgpnt;
   obj.Inc='';
 }
 else
 {
   const obj= this.subpnlProfitCurMonthData.find((x:any)=>x.id==uid)
   //this.subpnlCurMonthData.GTAM=totgtamcnt;
 obj.events=totevcnt;
  obj.revenue=totproft;
   obj.GP=totgtgpnt;
 }
 
 //this.subpnlProfitCurMonthData= {"calls ": "0", "events": "0","revenue":"0","GP":"0"};
 
 //this.subpnlProfitPrevdayData=  {"calls ": "0", "events": "0","revenue":"0","GP":"0"};
 
 //this.subpnlProfitPrevMonthData=  {"calls ": "0", "events": "0","revenue":"0","GP":"0"};
 /* //--
 
 if (type==1)
 {
 
 //this.subpnlCurMonthData= {"GTAM ": "0", "GTC ": "0","Evntcnt":"0","Convrate":"0","AvgGP":""};
 this.subpnlProfitPrevMonthData.events=totevcnt;
 this.subpnlProfitPrevMonthData.revenue=totproft;
 this.subpnlProfitPrevMonthData.GP=totmincnt;
 
 }
 else if (type==2)
 {
 //this.subpnlCurMonthData= {"GTAM ": "0", "GTC ": "0","Evntcnt":"0","Convrate":"0","AvgGP":""};
 
 
 this.subpnlProfitPrevdayData.events=totevcnt;
 this.subpnlProfitPrevdayData.revenue=totproft;
 this.subpnlProfitPrevdayData.GP=totmincnt;
 }
 else
 {
 //this.subpnlCurMonthData= {"GTAM ": "0", "GTC ": "0","Evntcnt":"0","Convrate":"0","AvgGP":""};
 
 
 this.subpnlProfitCurMonthData.events=totevcnt;
 this.subpnlProfitCurMonthData.revenue=totproft;
 this.subpnlProfitCurMonthData.GP=totmincnt;
 
 } //--
 */
 
 
       },
       (error: any) => {}
     );
 
 
 
 
 
   }
 
 
 
 
 getRMProfitabilityProgEntCount(uid:any,type:any) {
 
  //this.ClInvoiceTotal=0;
 
 //this.barchartdata=[];
   let year = new Date().getFullYear();
   let month = new Date().getMonth()+1;
     let dt = new Date().getDate();
 
 var start=year +"-1"+"-1"; 
 
 var end=year +"-"+month+"-"+dt;
 
 
  if (type==1)  //day
 {
 
 let dtp=dt-1;
 let dtn=dt+1;
 
 
 let txtmon=month+"";
 if (month < 10) {
   txtmon = "0" + month;
 }
 
 let txtdtp=dtp+"";
 if (dtp < 10) {
   //txtdtp = "0" + dtp;
 }
 let txtdtn=dtn+"";
 if (dtn < 10) {
  // txtdtn = "0" + dtn;
 }
 
  start=year +"-"+txtmon+"-"+txtdtp; 
 
  end=year +"-"+txtmon+"-"+txtdtn;
 
 }
 else    //current month sofar
 {
 
 let txtmon=month+"";
 
 if (month < 10) {
 
   txtmon = "0" + month;
 
 }
 
 
 start=year +"-"+txtmon+"-1"; 
 
 end=year +"-"+txtmon+"-"+dt;
 
 
 }
 
 
 //console.log('start',start);
 
 //console.log('end',end);
 
 let totgtgpnt=0;
 let totmincnt=0;
 let totproft=0;
 let totevcnt=0;
     const filters = new Map();
    const filter = {
      
 
       where: {},
       order: 'createdAt DESC',
     };
     filter.where = {
           and: [
                       
               {"researchAnalystId" : uid             //this.leadForm.value.employeeId,
               },
            // {"createdAt":{"gte" :"2202-"}},
            // {"createdAt":{"lt" :end}}
               {"eventAt":{"gt" :start}},
              {"eventAt":{"lt" :end}},
               {"status": "Upcoming"}
           ],
         };
     filters.set('filter', JSON.stringify(filter));
 
     this.eventService.getAll(filters).subscribe(
 
       (response) => {
       let  eventLstcn= response;
 
       totevcnt=eventLstcn.length;
 
       //console.log("eventLstcn getsubpnlProfitabilityCount",eventLstcn)
      // eventLst= response;
       //  this.unbilledEvents = this.eventList?.filter((x) => x.clientInvoiceId == '');
        // this.billedEvents = this.eventList?.filter((x) => x.clientInvoiceId != '');
   // this.billedEvents = this.eventList?.filter((x) => x.clientInvoiceId != '');
 
   /*
 for (let index = 0; index < eventLstcn.length; index++)  {
       
 
 
     if (eventLstcn[index]?.clientPayableAmount && eventLstcn[index]?.clientPayableAmount !=undefined)
     {
 
     totproft=totproft+(eventLstcn[index]?.clientPayableAmount;
 
     totgtgpnt=totgtgpnt+(eventLstcn[index]?.clientPayableAmount-parseInt(eventLstcn[index]?.expertPayment));
 
     totmincnt=totmincnt+eventLstcn[index]?.eventDuration;
 
     }
 
     
 
 }  */
 //this.RMProfitCurMonthData.push({ id:emparry[index], calls: "0", events: "0",GP:"0",Inc:"0"});
 //this.RMProfitcurdayData.push({ id:emparry[index], calls: "0", events: "0",GP:"0",Inc:"0"});
 
 
 if (type==1)
 {
   const obj= this.RMProfitcurdayData.find((x:any)=>x.id==uid)
 //this.subpnlCurMonthData= {"GTAM ": "0", "GTC ": "0","Evntcnt":"0","Convrate":"0","AvgGP":""};
  // this.subpnlPrevMonthData.GTAM=totgtamcnt;
  obj.calls=totevcnt;
 }
 else 
 {
   const obj= this.RMProfitCurMonthData.find((x:any)=>x.id==uid)
   //this.subpnlPrevdayData.GTAM=totgtamcnt;
  obj.calls=totevcnt;
 }
 
       },
       (error: any) => {}
     );
   }
 
 
 
 
 
 
 /*****RM*** */

 
 /********************RM****/





  private _semiCircleChart(colors:any) {
    colors = this.getChartColorsArray(colors);
    this.semiCircleChart = {
      series: [79],
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





  private getRegionCount():any[] {

    const results = Object.values( this.ExpertRegion.reduce((obj, item) => {
      obj[item.region] = obj[item.region] || { Region: item.region, count: 0 };
      obj[item.region].count= obj[item.region].count+item.Count;       
      return obj;}, {}))

      return results;

  }



  private getMgrCount():any[] {

    const results = Object.values( this.ExpertRegion.reduce((obj, item) => {
      obj[item.repotingManagerId] = obj[item.repotingManagerId] || { repotingManagerId: item.repotingManagerId, count: 0 };
      obj[item.region].count= obj[item.region].count+item.Count;       
      return obj;}, {}))

      return results;

  }

  rgnarry:any[]=[];
   /**
 * My Portfolio Chart  this.ExpertRegion
 */

   private _portfolioChart(colors:any) {


    let arr= this.ExpertRegion.filter(x=>x.mgrid== '5fbb2bf997ccc319db183148') //'60a2b8466fc81f44dca3c215')




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



  private _portfolioChart2(colors:any) {

    console.log('getrgnCnt xx', this.ExpertRegionCount.find(x=>x.Region==='APAC'));

   this.rgnarry.push(this.ExpertRegionCount.find((x)=>x.Region=='APAC').count)

   let v1= this.ExpertRegionCount.find(x=>x.Region=='APAC')['count'];
   let v2= this.getrgnCnt('EMEA');
   let v3= this.getrgnCnt('AMERICAS')
   

   
    console.log('getrgnCnt', this.rgnarry);
    colors = this.getChartColorsArray(colors);
    this.portfolioChart = {
      series: [v1,v2,v3],
      labels: ["APAC", "EMEA", "AMERICAS"],
      chart: {
          type: "pie",
          height: 278,
         // background:'linear-gradient(185deg, rgba(179,233,240,1) 0%, rgba(49,66,244,1) 100%)',
          events: {
            dataPointSelection: (event:any, chartContext:any, config:any) =>{
             // alert(config.w.config.labels[config.dataPointIndex]);
              console.log(chartContext, config);
             


              this.OverviewChart.series=  [{
                name: 'Experts Count',
                type: 'bar',
                data: []
            }]
          



              let arr= this.ExpertRegion.filter(x=>x.region==config.w.config.labels[config.dataPointIndex])

              console.log('arr', arr);
              var resultx = arr.map((a: { name: any; }) => a.name);

              var resulty = arr.map((a: { Count: any; }) => a.Count);

              console.log('resultx', resultx);
              console.log('resulty', resulty);

              this._OverviewChart('["--vz-primary", "--vz-warning", "--vz-success"]',resultx,resulty );


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
  
  /**
   * Swiper Responsive setting
   */
  public Responsive: SwiperOptions = {
    slidesPerView: 1,
    loop: true,
    navigation: true,
    spaceBetween: 25,
    breakpoints:{
      768:{
        slidesPerView: 2, 
      },
      1200:{
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

  private GetProductivity(colors:any,x:any[],y:any[]) {

    colors= '[ "#66CDAA", "#1E90FF"]'

    colors = this.getChartColorsArray(colors);

   


    this.OverviewChart110={
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
    

    
    colors= '[ "#66CDAA", "#1E90FF"]'

    colors = this.getChartColorsArray(colors);



    this.OverviewChart1e1={
      series: [{
          name: 'Events',
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
    

    colors= '["#008000", "#00008B", "#1E90FF"]'

    colors = this.getChartColorsArray(colors);


    this.OverviewChart1={
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



  /**
 *  Status7
 */
  private _status7(colors:any) {
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
