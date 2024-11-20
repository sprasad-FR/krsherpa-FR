import { Component, Input, ViewChild,OnInit, OnChanges, AfterViewInit, ElementRef, TemplateRef } from '@angular/core';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
//import { Console } from 'console';
import { forEach } from 'lodash';
//import { Component, ViewChild,  } from '@angular/core';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarnewComponent implements OnInit {

  @ViewChild('calendar') calendar: FullCalendarComponent;
  //@ViewChild(NgbModal) eventmodal: NgbModal;
  @ViewChild('myTemplate') myTemplate: TemplateRef<any>;
//[options]="calendarOptions"

  //@Input() 
  dates: any[];

  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: '',
      center: 'title',
      right: ''
    },
    initialView: "dayGridMonth",
    themeSystem: "bootstrap",

    weekends: true,
    editable: true,
    eventBackgroundColor: 'aqua',
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    //  dateClick: this.openModal.bind(this),
    //  eventClick: this.handleEventClick.bind(this),
    // eventsSet: this.handleEvents.bind(this)
  };
  constructor(private elementRef: ElementRef,
    private modalService: NgbModal,) {

   // this.fetch1()




  }

  ngAfterViewInit() {
  
  }
  whoaim:any;
  ngOnInit(): void {


    this.whoaim = JSON.parse(localStorage.getItem('user') );
    console.log("test")
    this.getevents();
/*
    if (this.calendar) {
      this.calendarOptions = this.getCalendarOptions();
      this.calendar.getApi().render();

    } */
  }

  private getCalendarOptions(): CalendarOptions {
    return {
      initialView: 'dayGridMonth',
      events: this.generateEventArray(),
      eventDidMount: this.handleEventDidMount.bind(this),
      eventClick: this.handleEventClick.bind(this),
      //  eventClassNames: this.setEventClassNames.bind(this)
    };
  }


  mySelectedDates: any[] = [];

  async  getevents() {
    this.mySelectedDates=[];

    // this.projectService.getAllMin(filters).subscribe(   getAll
  
    let filter = {
      "startDate": "2023-04-03",
    "endDate": "2023-07-30",
      "empid": this.whoaim.id   //"5e5deadc98f9c9472e8762df"   //"5e5deadc98f9c9472e8762df"
    }
    // debugger
  
     await fetch('https://middle.krsherpa.com/dashboard/getEvents4empperiod', {
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
    }
    ).then(r => r.json()).then(result => {
      // Result now contains the response text, do what you want...
      debugger
      console.log('data cd:', result);
  

      let color = 'green'; // Default color

    


      const upcomming=result[0]?.events;
      const completed=result[1]?.events;
      console.log('data completed:', completed);

      for (let index = 0; index < completed.length; index++) {
        const element = completed[index];
        console.log(element)

      // Assign different colors based on conditions
      if (element.status === 'Upcoming') {
        color = 'blue';
      } else if (element.status === 'Ongoing') {
        color = 'yellow';
      } else if (element.status === 'Completed') {
        color = 'green';
      }


        this.mySelectedDates.push(
          {
                title:element.projectName?element.projectName:"",
                start: element.eventAt,//element.eventAt,
              //  ClassNames: ['status1'], // Event status for styling
                color:color,
                'eventId':element._id
            
              }
  
        )
      }
  
      for (let index = 0; index < upcomming.length; index++) {
        const element = upcomming[index];

      // Assign different colors based on conditions
      if (element.status === 'Upcoming') {
        color = 'blue';
      } else if (element.status === 'Ongoing') {
        color = 'yellow';
      } else if (element.status === 'Completed') {
        color = 'green';
      }
        this.mySelectedDates.push(
          {
            title:element.projectName?element.projectName:"",
            start: element.eventAt,
            ClassNames: ['status1'], // Event status for styling
            color:color,
            'eventId':element._id
            
          }
  
        )
      }
     
      console.log(this.mySelectedDates);
  
      this.dates=this.mySelectedDates;
    //  this.getCalendarOptions();

     // this.calendarOptions = this.getCalendarOptions();
      this.calendar.options=this.getCalendarOptions();
      this.calendar.getApi().render();

    },
      (error: any) => {
        this.isLoading = false;
      }
    );
  
  }



  private generateEventArray(): any[] {

    console.log(this.dates);

    return this.dates.map(date => ({
      title: date.title,
      start: date.start, 
      color:"yellow",    
      backgroundColor: date.color,
      eventBackgroundColor : date.color,
      id:date.eventId
     // eventColor: '#378006' 
    }));
  }

  private handleEventDidMount(info: any) {
    const eventEl = info.el;
    const eventTitle = info.event.title;

    eventEl.setAttribute('data-toggle', 'tooltip');
    eventEl.setAttribute('data-title', eventTitle);

    eventEl.addEventListener('mouseenter', this.handleEventMouseEnter.bind(this));
    eventEl.addEventListener('mouseleave', this.handleEventMouseLeave.bind(this));
  }

  private handleEventMouseEnter(event: MouseEvent) {
    const eventEl = event.target as HTMLElement;
    const eventTitle = eventEl.getAttribute('data-title');

    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.textContent = eventTitle;

    eventEl.appendChild(tooltip);
  }

  private handleEventMouseLeave(event: MouseEvent) {
    const eventEl = event.target as HTMLElement;
    const tooltip = eventEl.querySelector('.tooltip');

    if (tooltip) {
      eventEl.removeChild(tooltip);
    }
  }

  // calender color
  variableevent: any;
  eventdate: any;
  eventtime: any;
  eventclosingtime: any;
  isLoading: boolean = false;

  eventTitle: any;
  eventTime: any;
  eventId: any;

  eventStatusColors = {
    'status1': 'event-status-1',
    'status2': 'event-status-2',
    'status3': 'event-status-3',
    // Add more event status colors as needed
  };


  setEventClassNames(info: any): string {

    //console.log(info)
    const eventStatus = info.event.extendedProps.status;
    //console.log(eventStatus)
    const eventColorClass = this.eventStatusColors[eventStatus];

    return eventColorClass;
  }
  //color end
  private handleEventClick(info: any) {


console.log(info.event.extendedProps);


    const eventTitle = info.event.title;
    const eventDetails = 'Event details';
    this.variableevent = 'dance events'
    this.eventdate =info.event.start;
    this.eventtime = "eventtime:12:00";
    this.eventclosingtime = "eventclosingtime:12:00";

    this.eventTitle=info.event.title;
    this.eventTime=info.event.start;
    this.eventId=info.event.id;

    // const modalElement = this.variableevent.nativeElement.querySelector('#eventModal');
    // modalElement.querySelector('.modal-title').innerText = "yuytuu88i";//eventTitle
    // modalElement.querySelector('.modal-body').innerText = eventDetails;
    // modalElement.classList.add('show');
    // const modalBackdrop = document.createElement('div');
    // modalBackdrop.classList.add('modal-backdrop', 'fade', 'show');
    // document.body.appendChild(modalBackdrop);
    this.modalService.open(this.myTemplate, { size: 'md', centered: true });
  }

  completedlist: any;
  pendinglist: any;

  async fetch1() {

    // this.projectService.getAllMin(filters).subscribe(   getAll

    let filter = {
      "empid": "5e5deadc98f9c9472e8762df"   //"5e5deadc98f9c9472e8762df"
    }
    // debugger

    await fetch('https://middle.krsherpa.com/dashboard/getlatest5Events4status', {
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
    }
    ).then(r => r.json()).then(result => {
      // Result now contains the response text, do what you want...
      debugger
      //console.log('data cd:', result);


      for (let index = 0; index < result[0].projects.length; index++) {
        const element = result[0].projects[index];
        console.log(element)
        this.dates.push(
          {
            title: element.projectName ? element.projectName : "",
            start: '2023-06-08',
            ClassNames: ['status1'], // Event status for styling
            color: "grey"

          }

        )
      }

      for (let index = 0; index < result[1].projects.length; index++) {
        const element = result[1].projects[index];
        this.dates.push(
          {
            title: element.projectName ? element.projectName : "",
            start: '2023-06-05',
            ClassNames: ['status1'], // Event status for styling
            color: "green"
          }

        )
      }

      this.dates = this.dates;

      this.completedlist = result[0].projects;
      this.pendinglist = result[1].projects;
      console.log(this.dates);

    },
      (error: any) => {
        this.isLoading = false;
      }
    );

  }

}



