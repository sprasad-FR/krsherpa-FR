import { ChartType } from '../default.model';

const dummyData = {
  name: 'Jane Thomas',
  tag1: 'FrontEnd',
  tag2: 'UI',
  designation: 'Sales Manager',
  company: 'Congizant LTD',
  companyType: 'Technology Services',
  emailId: 'abyys@gmail.com',
  contactNo: '+919019326282',
  alternateNo: '+919019326283',
  description: 'To play an importatnt role in investigation vinit in the sentence',
  address: 'At khamla New york Maharashtra India 440022',
  internationalLead: 'No',
  baseCurrency: '--',
  industryType: '--',
  industryGroup: '--',
  timeZone: 'Pune, Maharashtra (GMT +5.30)',
  salesOwner: 'Praveer D',
  salesOwnerImg: ['//dummyimage.com/50x50/e8e8e8/5a5a63'],
  createdDate: '08 Jan, 2020',
  lastUpdatedDate: '12 Sep, 2020',
};

const incentiveChartData: ChartType = {
  series: [
    {
      name: 'BTC',
      data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14],
    },
  ],
  chart: {
    type: 'area',
    height: 40,
    sparkline: {
      enabled: true,
    },
  },
  stroke: {
    curve: 'smooth',
    width: 2,
  },
  colors: ['#50a5f1'],
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      inverseColors: false,
      opacityFrom: 0.45,
      opacityTo: 0.05,
      stops: [25, 100, 100, 100],
    },
  },
  tooltip: {
    fixed: {
      enabled: false,
    },
    x: {
      show: false,
    },
    marker: {
      show: false,
    },
  },
};

export { incentiveChartData, dummyData };
