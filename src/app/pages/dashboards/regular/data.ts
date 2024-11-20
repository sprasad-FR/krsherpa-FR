import { ChartOptions } from './regular.model';

/**
 * Stat Counder Data
 */
 const statData = [{
    title: 'ACTIVE PROJECTS',
    value: 5,
    icon: 'briefcase',
    persantage: '5.02',
    profit: 'down',
    month: 'Projects'
  }, {
    title: 'Events',
    value: 9,
    icon: 'award',
    persantage: '3.58',
    profit: 'up',
    month: 'events'
  }, {
    title: 'Billable Time',
    value: 320,
    icon: 'clock',
    persantage: '10.35 ',
    profit: 'down',
    month: 'minutes'
  }
];


/**
 * Stat Counder Data
 */
const statDatac = [{
  title: 'Total Compliance Issues',
  value: 12,
  icon: 'briefcase',
  persantage: '5.02',
  profit: 'down',
  month: ''
}, {
  title: 'Pending Compliance',
  value: 9,
  icon: 'award',
  persantage: '3.58',
  profit: 'up',
  month: ''
}, {
  title: 'Resolved Compliance',
  value: 3,
  icon: 'clock',
  persantage: '10.35 ',
  profit: 'down',
  month: ''
}
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
    name: "Send Calendar invite",
    dedline: '03 Feb 2023',
    status: '',
    assignee: 
    {
      name: 'Mary Stoner',
      profile: 'assets/images/users/avatar-2.jpg'
    }
  },
  {
    name: "Meeting Coordinator",
    dedline: '17 Jan 2023',
    status: 'Progress',
    assignee: 
    {
      name: 'Den Davis',
      profile: 'assets/images/users/avatar-7.jpg'
    }
  },
  {
    name: "Administrative work",
    dedline: '17 Jan 2023',
    status: 'Completed',
    assignee: 
    {
      name: 'Alex Brown',
      profile: 'assets/images/users/avatar-6.jpg'
    }
  },
 /* {
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
  }, */
  {
    name: "Projects Discussion",
    dedline: '31 Jan 2023',
    status: 'Pending',
    assignee: 
    {
      name: 'Jansh William',
      profile: 'assets/images/users/avatar-4.jpg'
    }
  }
  
];


/**
 * Group List
 */
const tileBoxs1 =  [
  {
    id: 1,
    label: "Total Earnings",
    labelClass: "muted",
    percentage: "+16.24 %",
    percentageClass: "success",
    percentageIcon: "ri-arrow-right-up-line",
    counter: 559.25,
    caption: "View net earnings",
    icon: "bx bx-dollar-circle",
    iconClass: "success",
    decimals: 2,
    prefix: "$",
    suffix: "k",
  },
  {
    id: 2,
    label: "Orders",
    labelClass: "white-50",
    percentage: "-3.57 %",
    percentageClass: "warning",
    percentageIcon: "ri-arrow-right-down-line",
    counter: 36894,
    caption: "View all orders",
    icon: "bx bx-shopping-bag",
    iconClass: "light",
    bgColor: "bg-info",
    counterClass: "text-white",
    captionClass: "text-white-50",
    decimals: 1,
    prefix: "",
    suffix: "",
  },
  {
    id: 3,
    label: "Customers",
    labelClass: "muted",
    percentage: "+29.08 %",
    percentageClass: "success",
    percentageIcon: "ri-arrow-right-up-line",
    counter: 183.35,
    caption: "See details",
    icon: "bx bx-user-circle",
    iconClass: "warning",
    decimals: 2,
    prefix: "",
    suffix: "M",
  },
  {
    id: 4,
    label: "My Balance",
    labelClass: "muted",
    percentage: "+0.00 %",
    percentageClass: "muted",
    percentageIcon: "ri-arrow-right-up-line",
    counter: 165.89,
    caption: "Withdraw money",
    icon: "bx bx-wallet",
    iconClass: "primary",
    decimals: 2,
    prefix: "$",
    suffix: "K",
  },
]

// TitleBoxs2
const tileBoxs2 = [
  {
      id: 1,
      label: "Active Projects",
      badge: "ri-arrow-up-circle-line text-success",
      icon: "ri-space-ship-line",
      counter: 197,
      decimals: 0,
      suffix: "",
      prefix: "",
  },
  {
      id: 2,
      label: "Upcoming events",
      badge: "ri-arrow-up-circle-line text-success",
      icon: "ri-exchange-dollar-line",
      counter: 489.4,
      decimals: 1,
      suffix: "k",
      prefix: "$",
  },
  {
      id: 3,
      label: "Completed events",
      badge: "ri-arrow-down-circle-line text-danger",
      icon: "ri-pulse-line",
      counter: 32.89,
      decimals: 2,
      suffix: "%",
      prefix: "",
  },
  {
      id: 4,
      label: "Failed events",
      badge: "ri-arrow-up-circle-line text-success",
      icon: "ri-trophy-line",
      counter: 1596.5,
      decimals: 1,
      prefix: "$",
      separator: ",",
      suffix: "",
  },
  
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



// otherWidgets
const otherWidgets = [
  {
      id: 1,
      title: "SME leads",
      subTitle: "SME leads",
      subItem: [
          {
              id: 1,
              icon: "1",
              iconClass: "success",
              label: "Contacted",
          },
          {
              id: 2,
              icon: "1",
              iconClass: "info",
              label: "Recruiting In Progress",
          },
          {
              id: 3,
              icon: "1",
              iconClass: "primary",
              label: "Do not call",
          },
      ],
      progressBar: [
          { id: 1, bgColor: "bg-success", width: 30 },
          { id: 2, bgColor: "bg-info", width: 50 },
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
            icon: "1",
            iconClass: "success",
            label: "Signed up",
        },
        {
            id: 2,
            icon: "100",
            iconClass: "info",
            label: "T&C pending",
        },
        
    ],
    progressBar: [
        { id: 1, bgColor: "bg-success", width: "50%" },
        { id: 2, bgColor: "bg-info", width: "50%" },
      
    ],
  },
  {
    id: 3,
    title: "SME Payments",
    subTitle: "CSME Payments",
    subItem: [
        {
            id: 1,
            icon: "12",
            iconClass: "success",
            label: "Paid",
        },
        {
            id: 2,
            icon: "4",
            iconClass: "info",
            label: "Unpaid",
        },
       
    ],
    progressBar: [
        { id: 1, bgColor: "bg-success", width: "100%" },
        { id: 2, bgColor: "bg-info", width: "100%" },
        { id: 1, bgColor: "bg-success", width: "100%" },
    ],
  },
];
export { statData,statDatac, ActiveProjects, otherWidgets,MyTask,tileBoxs2, TeamMembers };