import { ChartOptions } from './pie.model';

/**
 * Stat Counder Data
 */
//  const statData = [{
//     title: 'ACTIVE PROJECTS',
//     value: 5,
//     icon: 'briefcase',
//     persantage: '5.02',
//     profit: 'down',
//     month: 'Projects'
//   }, {
//     title: 'Events',
//     value: 9,
//     icon: 'award',
//     persantage: '3.58',
//     profit: 'up',
//     month: 'events'
//   }, {
//     title: 'Billable Time',
//     value: 320,
//     icon: 'clock',
//     persantage: '10.35 ',
//     profit: 'down',
//     month: 'minutes'
//   }
// ];


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
    },
    
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
    },
   
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

const creatorsData  = [
  {
      id: 1,
      img: 'assets/images/nft/img-01.jpg',
      title: "Aishwarya Bawa",
      price: "4,754 ETH",
  },
  {
      id: 2,
      img: 'assets/images/users/avatar-5.jpg',
      title: "Beulah Preeti",
      price: "81,369 ETH",
  },
  {
      id: 3,
      img: 'assets/images/nft/img-06.jpg',
      title: "Mohammad Omair",
      price: "13,156 ETH",
  },
  {
      id: 4,
      img: 'assets/images/nft/gif/img-5.gif',
      title: "Muskan Gakhreja",
      price: "34,754 ETH",
  },
  {
      id: 5,
      img: 'assets/images/users/avatar-8.jpg',
      title: "Paarika Bhardwaj",
      price: "13,841 ETH",
  },
  {
      id: 6,
      img: 'assets/images/nft/img-04.jpg',
      title: "Shekhar Ubale",
      price: "26,834 ETH",
  },
  {
      id: 7,
      img: 'assets/images/nft/img-05.jpg',
      title: "Sonal Sultania",
      price: "18,034 ETH",
  },
  {
      id: 8,
      img: 'assets/images/nft/img-02.jpg',
      title: "Soniya Mondal",
      price: "63,710 ETH",
  },
];

// Creators List Data
const creatorsListData = [
  {
      id: 1,
      cardImg: 'assets/images/nft/img-03.jpg',
      img: 'assets/images/users/avatar-2.jpg',
      title: "Michael Morris",
      products: "9784",
      followbtn: "Unfollow",
      content: "You can make an NFT of a digital painting, a text, a piece of music, a video."
  },
  {
      id: 2,
      cardImg: 'assets/images/nft/gif/img-2.gif',
      img: 'assets/images/users/avatar-6.jpg',
      title: "Charles Kubik",
      products: "4678",
      isFollowBtn: true,
      followbtn: "Follow",
      content: "You can make an NFT of a digital painting, a text, a piece of music, a video."
  },
  {
      id: 3,
      cardImg: 'assets/images/nft/img-05.jpg',
      img: 'assets/images/nft/img-06.jpg',
      title: "Alexis Clarke",
      products: "861",
      followbtn: "Unfollow",
      content: "You can make an NFT of a digital painting, a text, a piece of music, a video."
  },
  {
      id: 4,
      cardImg: 'assets/images/nft/img-06.jpg',
      img: 'assets/images/nft/gif/img-1.gif',
      title: "James Morris",
      products: "30174",
      followbtn: "Unfollow",
      content: "You can make an NFT of a digital painting, a text, a piece of music, a video."
  },
  {
      id: 5,
      cardImg: 'assets/images/nft/gif/img-3.gif',
      img: 'assets/images/users/avatar-8.jpg',
      title: "Herbert Stokes",
      products: "6487",
      isFollowBtn: true,
      followbtn: "Follow",
      content: "You can make an NFT of a digital painting, a text, a piece of music, a video."
  },
  {
      id: 6,
      cardImg: 'assets/images/nft/img-03.jpg',
      img: 'assets/images/users/avatar-2.jpg',
      title: "Michael Morris",
      products: "10137",
      followbtn: "Unfollow",
      content: "You can make an NFT of a digital painting, a text, a piece of music, a video."
  },
  {
      id: 7,
      cardImg: 'assets/images/nft/gif/img-2.gif',
      img: 'assets/images/users/avatar-6.jpg',
      title: "Tonya Noble",
      products: "364",
      isFollowBtn: true,
      followbtn: "Follow",
      content: "You can make an NFT of a digital painting, a text, a piece of music, a video."
  },
  {
      id: 8,
      cardImg: 'assets/images/nft/img-05.jpg',
      img: 'assets/images/nft/img-06.jpg',
      title: "Nancy Martino",
      products: "9513",
      followbtn: "Unfollow",
      content: "You can make an NFT of a digital painting, a text, a piece of music, a video."
  },
  {
      id: 9,
      cardImg: 'assets/images/nft/img-01.jpg',
      img: 'assets/images/nft/gif/img-1.gif',
      title: "Kevin Dawson",
      products: "6374",
      isFollowBtn: true,
      followbtn: "Follow",
      content: "You can make an NFT of a digital painting, a text, a piece of music, a video."
  },
  {
      id: 10,
      cardImg: 'assets/images/nft/gif/img-4.gif',
      img: 'assets/images/users/avatar-10.jpg',
      title: "Glen Matney",
      products: "7809",
      followbtn: "Unfollow",
      content: "You can make an NFT of a digital painting, a text, a piece of music, a video."
  },
];




export { statData, statDatac, ActiveProjects, MyTask, TeamMembers ,creatorsData, creatorsListData};



/**
 * Top Selleing
 */
const TopPages = [
  {
      page: "/themesbrand/skote-25867",
      active: '99',
      users: '25.3',
  },
  {
      page: "/dashonic/chat-24518",
      active: '86',
      users: '22.7',
  },
  {
      page: "/skote/timeline-27391",
      active: '64',
      users: '18.7',
  },
  {
      page: "/themesbrand/minia-26441",
      active: '53',
      users: '14.2',
  },
  {
      page: "/dashon/dashboard-29873",
      active: '33',
      users: '12.6',
  },
  {
      page: "/doot/chats-29964",
      active: '20',
      users: '10.9',
  },
  {
      page: "/minton/pages-29739",
      active: '10',
      users: '07.3',
  }
];

export { TopPages };

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
export {  };


