export interface GridJsModel {
  id: string;
  name: string;
  email: string;
  position: string;
  company: string;
  country: string;
}


export interface client { 
  id: string;
  companyName: string;
  companyType: string;
  contactNo: string;
  email: string;
  serviceStartDate: string;
  salesLeadContact: string;
}


export interface SalesLeadtbl1 {
  id: string;
  companyName: string;
  companyType: string;
  contactNo: string;
  email: string;
  city: string;
  state: string;
  country: string;
  salesOwner: string;
  updatedAt: string;
  //salesLeadContact: Object[];
}

export interface SalesLeadtbl {
  id: string;
  companyName: string;
  companyType: string;
  contactNo: string;
  leadstatus: string;
  labels: string;
  assigneeId: string;
  assigneename: string;
  secondary_assigneeId1: string;
  secondary_assigneeId2: string;
  salesOwner: string;
  leadSource: string;
  leadContactId: string;
  updatedAt: string;
  salesLeadContactname: string;
  salesLeadContactid: string;
}

export interface SalesLeadtbl1 {
  id: string;
  companyName: string;
  companyType: string;
  contactNo: string;
  email: string;
  fax: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  url: string;
  leadStatus: string;
  labels: string;
  assigneeId: string;
  secondary_assigneeId1: string;
  secondary_assigneeId2: string;
  salesOwner: string;
  leadSource: string;
  leadReference: string;
  timeZone: string;
  leadContactId: string;
  description: string;
  createdBy: number;
  updatedBy: number;
  updatedAt: string;
  createdAt: string;
  deletedBy: number;
  deletedAt: string; 
  phonecode: string;
  //salesLeadContact: Object[];
}
export interface SalesLeadContact {
  id: string;
  name: string;
  email: string;
  linkedinurl: string;
  designation: string;
  primary_phonecode: string;
  contactNo: number;
  alternateMobile: number;
  notes?: object[];

  createdBy?: number;
  updatedBy?: number;
  updatedAt?: string;
  createdAt?: string;
  deletedBy?: number;
  deletedAt?: string;
  lastContacted?: string;
}
