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
