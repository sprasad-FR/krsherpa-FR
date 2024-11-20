const statData = [
  {
    icon: 'bx bx-copy-alt',
    title: 'Lead Attached',
    value: '2',
    description: 'My Contribution is 2',
  },
  {
    icon: 'bx bx-archive-in',
    title: 'Experts Attached',
    value: '3',
    description: 'My Contribution is 3',
  },
  {
    icon: 'bx bx-purchase-tag-alt',
    title: 'GTAM',
    value: '2',
    description: 'My Contribution is 2',
  },
  {
    icon: 'bx bx-purchase-tag-alt',
    title: 'GTC',
    value: '1',
    description: 'My Contribution is 0',
  },
  {
    icon: 'bx bx-purchase-tag-alt',
    title: 'Events Scheduled',
    value: '4',
    description: 'Scheduled by me is 1',
  },
  {
    icon: 'bx bx-purchase-tag-alt',
    title: 'Events Completed',
    value: '2',
    description: 'Scheduled by me is 1',
  },
];

const projectDetails = {
  id: '237c1ce8c04b1f2776f8',
  projectId: 202003001,
  name: 'Senior Angular Developer and Consultant',
  clientName: 'Razorback Technologies Private Limited',
  keyAccManager: '237c1ce8c04b1f2776f8',
  researchManager: '237c1ce8c04b1f2776f8',
  researchAnalyst: ['237c1ce8c04b1f2776f8', '237c1ce8c04b1f2776f8'],
  clientUsers: ['237c1ce8c04b1f2776f8', '237c1ce8c04b1f2776f8', '237c1ce8c04b1f2776f8'],
  projectType: 1,
  status: 1,
  engagementType: 1,
  startDate: '2020-02-01',
  endDate: '2020-03-30',
  dueDate: '2020-03-30',
  expectedNumEvent: 10,
  sector: 1,
  industry: 1,
  subIndustry: 1,
  notes: [
    {
      id: '1',
      content: 'This is first note.',
      createdBy: '',
      createdAt: '',
      updatedBy: '',
      updatedAt: '',
      deletedBy: '',
      deletedAt: '',
    },
    {
      id: '1',
      content: 'This is second note.',
      createdBy: '',
      createdAt: '',
      updatedBy: '',
      updatedAt: '',
      deletedBy: '',
      deletedAt: '',
    },
  ],
};

const projectStatus = [
  {
    id: 0,
    text: 'In Progress',
    colorClass: ' badge badge-primary',
  },
  {
    id: 1,
    text: 'Closed',
    colorClass: 'badge-success',
  },
  {
    id: 2,
    text: 'Hold',
    colorClass: 'badge-info',
  },
];

const engagementTypes = [
  {
    id: 0,
    text: 'Phone Interviews',
  },
  {
    id: 1,
    text: 'In-person Meetings',
  },
  {
    id: 2,
    text: 'Workshops',
  },
  {
    id: 3,
    text: 'Technical IDIs',
  },
  {
    id: 4,
    text: 'Field Visits',
  },
  {
    id: 5,
    text: 'Targeted Custom Surveys',
  },
  {
    id: 6,
    text: 'Term Engagements',
  },
  {
    id: 7,
    text: 'Executive/Board Placements',
  },
];

export { statData, projectDetails, projectStatus, engagementTypes };
