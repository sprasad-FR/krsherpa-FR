export interface Clients {
  id: string;
  companyName?: string;
  companyType?: string;
  contactNo?: string;
  phonecode?: string;
  email?: string;
  fax?: string;
  url?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  leadStatus?: number;
  labels?: string;
  assigneeId?: string;
  salesOwner?: string;
  leadSource?: number;
  leadReference?: string;
  timeZone?: string;
  leadContactId?: string;
  plheadId?: string;
  accountManagerId?: string;
  subPnlHeadId?: string;
  isComplianceVerified?: boolean;
  complianceComment?: string;
  isInternationalLead?: boolean;
  isAgreementDone?: boolean;
  agreementType?: boolean;
  salesLeadId?: string;
  serviceStartDate?: string;
  serviceEndDate?: string;
  billingCycle?: string;
  initialInvoiceDate?: string;
  packageType?: boolean;
  currency?: string;
  amount?: number;
  availableCredits?: number;
  costPerCredit?: number;
  msaValue?: number;
  krpiAccess?: string;
  krpiEventAccessNumber?: string;
  usersPerEvent?: number;
  onDemandTopics?: number;
  preEventCounsultation?: number;
  clientUser?: object[];
  parentid?:string;
  // clientUser?: [
  //   {
  //   id?: string,
  //   name?: string,
  //   designation?: string,
  //   email?: string,
  //   password?:string,
  //  createdAt?: string,
  //   updatedAt?: string,
  // }

  // ];

  createdBy?: number;
  updatedBy?: number;
  updatedAt?: string;
  createdAt?: string;
  deletedBy?: number;
  deletedAt?: string;
}

// Search Data
export interface ClientsSearchResult {
  tables?: Clients[];
  total?: number;
}
