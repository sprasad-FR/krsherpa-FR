import { ChartOptions } from './projects.model';

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

export { statData,statDatac, ActiveProjects, MyTask, TeamMembers };