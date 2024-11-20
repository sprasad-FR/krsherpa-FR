import { Component, OnInit } from '@angular/core';
import { CalendarOptions, EventClickArg, EventApi, isArraysEqual } from '@fullcalendar/angular';
import {  calendarEvents, createEventId } from '../customers/data';

@Component({
  selector: 'app-orders-details',
  templateUrl: './orders-details.component.html',
  styleUrls: ['./orders-details.component.scss']
})

/**
 * OrdersDetails Component
 */
export class OrdersDetailsComponent implements OnInit {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'dayGridMonth,dayGridWeek,dayGridDay',
      center: 'title',
      right: 'prevYear,prev,next,nextYear'
    },
    initialView: "dayGridMonth",
    themeSystem: "bootstrap",
    initialEvents: calendarEvents,
    weekends: true,
    editable: true,
    eventBackgroundColor:'aqua',
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
  //  dateClick: this.openModal.bind(this),
  //  eventClick: this.handleEventClick.bind(this),
   // eventsSet: this.handleEvents.bind(this)
  };
  currentEvents: EventApi[] = [];




  constructor() {

   }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
     this.breadCrumbItems = [
      { label: 'Ecommerce' },
      { label: 'Order Details', active: true }
    ];

  }

}
