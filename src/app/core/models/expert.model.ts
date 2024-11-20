export interface Expert {
  fullName?: string;
  id?: string;
  userId?: string;
  password?: string;
  salutation?: string;
  firstName?: string;
  lastName?: string;
  primaryEmail?: string;
  phoneCode?: string;
  alternateEmail: string,
  alternatePhone:string,
  alternatePhoneCountryCode:string,
  contactNo?: string;
  country?: string;
  state?: string;
  city?: string;
 skills: string; 
 education: string;
  sector: string;
  about: string;
  industryGroup: string;
  industry?: string;
  subindustry?: string;
  krRelationshipMgr?: any;
  krRelationshipMgr2?: string;
  termsAcceptDate?: string;
  status?: string;
  currentEmployer?: string;
  designation?: string;
  rate?: number;
  currency?: string;
  rateType?: string;
  terms: boolean;
  isLead?: boolean;
  keyword?: string;
  workDetails?: string;
  sourceType?: string;
  sourceUrl?: string;
  merged_id?: string;
  rateForClient?: number;
  createdAt?: Date;
  updatedAt?: Date;
  isComplianceVerified?: boolean;
  krRelationshipMgrId?: string;
  complianceComment?: string;
  bankName?: string;
  branchName?: string;
  bankAccountNumber?: string;
  beneficiaryname: string,
  bankAccountType?: string;
  ifscCode?: string;
  panCard?: string;
  paypalCode?: string; 
  amazonCode:  string;
  PayCurrency: string;
  PayCountry: string;
  attachments:Attachments[];
  achBeneficiaryName: string;
  achAccountNo: string;
  achBankName: string;
  achBankAddress: string;
  achSwiftCode: string;
  achBeneficiaryCountry: string;
  achBeneficiaryAddress: string;
  achAccountType: string;
  achPostalCode: string;
  ibanno: string;
routingno: string;
  shiftCode?: string;
  notes?: string;
  paymentPreference?: string;
  workingDetails?: WorkingDetailsItem[];
  biography?: string;
  datasrc?: string;   
  attachedBy?:string; 
  attachedTo?:string; 
  attachedDate?:any; 
  allocatedTo?:string; 
  allocatedTill: string;
  allocatedDate: any;
}

export interface WorkingDetailsItem {
  id?: string;
  companyName?: string;
  companyType?: string;
  jobTitle?: string;
  startYear?: string;
  startMonth?: string;
  endMonth?: string;
  endYear?: string;
  isCurrentEmployeer?: string;
}


export interface Attachments {
  type?: string;
  s3name?: string;
  name?: string;
  date?:Date;
}

// Search Data
export interface ExpertSearchResult {
  tables: Expert[];
  total: number;
}
