import { ChartOptions } from './CleintDB.model';
import { EventInput } from '@fullcalendar/angular';
import { getCurrencySymbol } from '@angular/common';

let eventGuid = 0;
export function createEventId() {
    return String(eventGuid++);
}

/**
 * Stat Counder Data
 */
 const statDatac = [{
    title: 'ACTIVE PROJECTS',
    value: 2,
    icon: 'briefcase',
    persantage: '5',
    profit: '',
    month: 'Projects'
  }, {
    title: 'Events',
    value: 5,
    icon: 'award',
    persantage: '7',
    profit: '',
    month: 'Events'
  }, {
    title: 'TOTAL HOURS',
    value: 12.30,
    icon: 'clock',
    persantage: '320 mins',
    profit: '',
    year: ''
  }
];


/**
 * Stat Counder Data
 */
const statData = [{
  title: 'TOTAL INVESTED',
  value: 2390.68,
  icon: 'ri-money-dollar-circle-fill',
  persantage: '6.24',
  profit: 'up'
}, {
  title: 'TOTAL CHANGE',
  value: 19523.25,
  icon: 'ri-arrow-up-circle-fill',
  persantage: '3.67',
  profit: 'up'
}, {
  title: 'DAY CHANGE',
  value: 14799.44,
  icon: 'ri-arrow-down-circle-fill',
  persantage: '4.80',
  profit: 'down'
}
];

/**
 * Top Collection Data
 */
const topCollectionData = [
  {
      id: 1,
      img: 'assets/images/nft/gif/img-5.gif',
      category: "Artworks",
      items: "4700+",
  },
  {
      id: 2,
      img: 'assets/images/nft/img-04.jpg',
      category: "Crypto Card",
      items: "743+",
  },
  {
      id: 3,
      img: 'assets/images/nft/gif/img-5.gif',
      category: "3d Style",
      items: "4781+",
  },
  {
      id: 4,
      img: 'assets/images/nft/img-06.jpg',
      category: "Collectibles",
      items: "3468+",
  },
];




/**
 * Active Projects
 */
 const ActiveProjects = [
  {
    Pname: "Brand Logo Design",
    profile: 'assets/images/users/avatar-1.jpg',
    Uname: 'Donald Risher',
    progress: 53,
    assignee: [
        {
          profile: 'assets/images/users/avatar-1.jpg'
        },
        {
          profile: 'assets/images/users/avatar-2.jpg'
        },
        {
          profile: 'assets/images/users/avatar-3.jpg'
        },
      ],
    status: 'Progress',
    date: '06 Sep 2021'
  },
  {
    Pname: "Redesign - Landing Page",
    profile: 'assets/images/users/avatar-2.jpg',
    Uname: 'Prezy William',
    progress: 0,
    assignee: [
        {
          profile: 'assets/images/users/avatar-5.jpg'
        },
        {
          profile: 'assets/images/users/avatar-6.jpg'
        }
      ],
    status: 'Pending',
    date: '13 Nov 2021'
  },
  {
    Pname: "Multipurpose Landing Template",
    profile: 'assets/images/users/avatar-3.jpg',
    Uname: 'Boonie Hoynas',
    progress: 100,
    assignee: [
        {
          profile: 'assets/images/users/avatar-7.jpg'
        },
        {
          profile: 'assets/images/users/avatar-8.jpg'
        }
      ],
    status: 'Completed',
    date: '26 Nov 2021'
  },
  {
    Pname: "Chat Application",
    profile: 'assets/images/users/avatar-5.jpg',
    Uname: 'Pauline Moll',
    progress: 64,
    assignee: [
        {
          profile: 'assets/images/users/avatar-2.jpg'
        }
      ],
    status: 'Progress',
    date: '15 Dec 2021'
  },
  {
    Pname: "Create Wireframe",
    profile: 'assets/images/users/avatar-6.jpg',
    Uname: 'James Bangs',
    progress: 77,
    assignee: [
        {
          profile: 'assets/images/users/avatar-1.jpg'
        },
        {
          profile: 'assets/images/users/avatar-6.jpg'
        },
        {
          profile: 'assets/images/users/avatar-4.jpg'
        }
      ],
    status: 'Progress',
    date: '21 Dec 2021'
  }
];

/**
 * My Task
 */
 const MyTask = [
  {
    name: "Create new Admin Template",
    dedline: '03 Nov 2021',
    status: 'Completed',
    assignee: 
    {
      name: 'Mary Stoner',
      profile: 'assets/images/users/avatar-2.jpg'
    }
  },
  {
    name: "Marketing Coordinator",
    dedline: '17 Nov 2021',
    status: 'Progress',
    assignee: 
    {
      name: 'Den Davis',
      profile: 'assets/images/users/avatar-7.jpg'
    }
  },
  {
    name: "Administrative Analyst",
    dedline: '26 Nov 2021',
    status: 'Completed',
    assignee: 
    {
      name: 'Alex Brown',
      profile: 'assets/images/users/avatar-6.jpg'
    }
  },
  {
    name: "E-commerce Landing Page",
    dedline: '10 Dec 2021',
    status: 'Pending',
    assignee: 
    {
      name: 'Prezy Morin',
      profile: 'assets/images/users/avatar-5.jpg'
    }
  },
  {
    name: "UI/UX Design",
    dedline: '22 Dec 2021',
    status: 'Progress',
    assignee: 
    {
      name: 'Stine Nielsen',
      profile: 'assets/images/users/avatar-1.jpg'
    }
  },
  {
    name: "Projects Design",
    dedline: '31 Dec 2021',
    status: 'Pending',
    assignee: 
    {
      name: 'Jansh William',
      profile: 'assets/images/users/avatar-4.jpg'
    }
  }
  
];

/**
 * Team Members
 */
 const TeamMembers = [
  {
    name: "Create new Admin Template",
    dedline: '03 Nov 2021',
    status: 'Completed',
    assignee: 
    {
      name: 'Mary Stoner',
      profile: 'assets/images/users/avatar-2.jpg'
    }
  },
  {
    name: "Marketing Coordinator",
    dedline: '17 Nov 2021',
    status: 'Progress',
    assignee: 
    {
      name: 'Den Davis',
      profile: 'assets/images/users/avatar-7.jpg'
    }
  },
  {
    name: "Administrative Analyst",
    dedline: '26 Nov 2021',
    status: 'Completed',
    assignee: 
    {
      name: 'Alex Brown',
      profile: 'assets/images/users/avatar-6.jpg'
    }
  },
  {
    name: "E-commerce Landing Page",
    dedline: '10 Dec 2021',
    status: 'Pending',
    assignee: 
    {
      name: 'Prezy Morin',
      profile: 'assets/images/users/avatar-5.jpg'
    }
  },
  {
    name: "UI/UX Design",
    dedline: '22 Dec 2021',
    status: 'Progress',
    assignee: 
    {
      name: 'Stine Nielsen',
      profile: 'assets/images/users/avatar-1.jpg'
    }
  },
  {
    name: "Projects Design",
    dedline: '31 Dec 2021',
    status: 'Pending',
    assignee: 
    {
      name: 'Jansh William',
      profile: 'assets/images/users/avatar-4.jpg'
    }
  }
];




const category = [
  {
      name: '--Select--',
      value: '',
      option: "selected"
  },
  {
    name: 'Danger',
    value: 'bg-danger',
    option: ""
  },
  {
      name: 'Success',
      value: 'bg-success',
      option: ""
  },
  {
      name: 'Primary',
      value: 'bg-primary',
      option: ""
  },
  {
      name: 'Info',
      value: 'bg-info',
      option: ""
  },
  {
      name: 'Dark',
      value: 'bg-dark',
      option: ""
  },
  {
      name: 'Warning',
      value: 'bg-warning',
      option: ""
  }
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



export { statDatac,category, calendarEvents,statData,topCollectionData, ActiveProjects, MyTask, TeamMembers };