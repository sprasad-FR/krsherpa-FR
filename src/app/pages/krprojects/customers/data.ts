// import {Country} from './invoice.model';
import { EventInput } from '@fullcalendar/angular';


let eventGuid = 0;
export function createEventId() {
    return String(eventGuid++);
}



const Customers =  [
  {
    _id:"1",
    name: "Mary Cousar",
    email: "marycousar@velzon.com",
    phone: "580-464-4694",
    date: "06 Apr, 2021",
    status: "Active",
    statusClass: "success",
    isSelected:false
  },
  {
    _id:"2",
    name: "Jeff Taylor",
    email: "jefftaylor@velzon.com",
    phone: "863-577-5537",
    date: "15 Feb, 2021",
    status: "Active",
    statusClass: "success",
    isSelected:false
  },
  {
    _id:"3",
    name: "Robert McMahon",
    email: "robertmcmahon@velzon.com",
    phone: "786-253-9927",
    date: "12 Jan, 2021",
    status: "Active",
    statusClass: "success",
    isSelected:false
  },
  {
    _id:"4",
    name: "Michael Morris",
    email: "michaelmorris@velzon.com",
    phone: "805-447-8398",
    date: "19 May, 2021",
    status: "Block",
    statusClass: "danger",
    isSelected:false  },
  {
    _id:"5",
    name: "Kevin Dawson",
    email: "kevindawson@velzon.com",
    phone: "213-741-4294",
    date: "14 Apr, 2021",
    status: "Active",
    statusClass: "success",
    isSelected:false
  },
  {
    _id:"6",
    name: "Carolyn Jones",
    email: "carolynjones@velzon.com",
    phone: "414-453-5725",
    date: "07 Jun, 2021",
    status: "Active",
    statusClass: "success",
    isSelected:false
  },
  {
    _id:"7",
    name: "Glen Matney",
    email: "glenmatney@velzon.com",
    phone: "515-395-1069",
    date: "02 Nov, 2021",
    status: "Active",
    statusClass: "success",
    isSelected:false
  },
  {
    _id:"8",
    name: "Charles Kubik",
    email: "charleskubik@velzon.com",
    phone: "231-480-8536",
    date: "25 Sep, 2021",
    status: "Block",
    statusClass: "danger",
    isSelected:false  },
  {
    _id:"8",
    name: "Herbert Stokes",
    email: "herbertstokes@velzon.com",
    phone: "312-944-1448",
    date: "20 Jul, 2021",
    status: "Block",
    statusClass: "danger",
    isSelected:false  },
  {
    _id:"9",
    name: "Timothy Smith",
    email: "timothysmith@velzon.com",
    phone: "973-277-6950",
    date: "13 Dec, 2021",
    status: "Active",
    statusClass: "success",
    isSelected:false
  },
  {
    _id:"10",
    name: "Johnny Evans",
    email: "johnnyevans@velzon.com",
    phone: "407-645-1767",
    date: "01 Oct, 2021",
    status: "Block",
    statusClass: "danger",
    isSelected:false  },
  {
    _id:"11",
    name: "Kevin Dawson",
    email: "kevindawson@velzon.com",
    phone: "213-741-4294",
    date: "14 Apr, 2021",
    status: "Active",
    statusClass: "success",
    isSelected:false
  },
];



var date = new Date();
var d = date.getDate();
var m = date.getMonth();
var y = date.getFullYear();

const calendarEvents: EventInput[] = [


  {
      id: createEventId(),
      title: 'All Day Event',
      start: new Date(y, m, 9),     
      backgroundColor:'green',
      textColor:'green',
     // display: 'background'
  },
  {
      id: createEventId(),
      title: 'Visit Online Course',
      start: new Date(y, m, 15),     
      end: new Date(y, m, 15), 
      className: 'fc-bgevent',
      backgroundColor:'green',
    //  display: 'background'
  },
  {
      id: createEventId(),
      title: 'World Leprosy Day',
      start: new Date(y, m, 13),     
      allDay: false,
      className: 'bg-soft-info',
      backgroundColor:'green',
     
  }

  
];


export { Customers,calendarEvents };
