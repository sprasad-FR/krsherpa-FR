import { SalesLeadContact } from './salesLeadContact.model';

export interface SalesLead {
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
  leadStatus: number;
  labels: string;
  assigneeId: string;
  secondary_assigneeId1: string;
  secondary_assigneeId2: string;
  salesOwner: string;
  leadSource: number;
  leadReference: string;
  timeZone: string;
  leadContactId: string;
  additionalLeadContactIds: string[];
  salesassociates: string[];
  description: string;
  createdBy: number;
  updatedBy: number;
  updatedAt: string;
  createdAt: string;
  deletedBy: number;
  deletedAt: string;
  attachments: Object[];
  phonecode: string;

  salesLeadContact?: SalesLeadContact;
}

// Search Data
export interface SalesBoardSearchResult {
  tables: SalesLead[];
  total: number;
}
