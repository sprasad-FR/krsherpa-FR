export interface Country {
  name: string;
  code: string;
}
export interface CompanyType {
  id: string;
  type: string;
}
export interface Users {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
}
export interface Stages {
  id: number;
  stage: string;
}

export interface LeadSource {
  id: number;
  lead: string;
}

export interface CStatus {
  id: number;
  status: string; 
}

export interface ChartType {
  chart?: any;
  plotOptions?: any;
  colors?: any;
  series?: any;
  markers?: any;
  xaxis?: any;
  tooltip?: any;
  fill?: any;
  stroke?: any;
  labels?: any;
  legend?: any;
  type?: any;
  height?: any;
  dataLabels?: any;
}
export interface BillingCycle {
  label: string;
}
export interface CountryCurrency {
  currency: string;
  country: string;
}
