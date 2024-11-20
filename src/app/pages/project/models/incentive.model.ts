export interface Incentives {
  fullName?: string;
  id?: string;
  salutation?: string;
  firstName?: string;
  lastName?: string;
  primaryEmail?: string;
  contactNo?: string;
  state?: string;
  city?: string;
  industry?: number;
  krRelationshipMgr?: any;
  status?: string;
  currentEmployer?: string;
  designation?: string;
  rate?: number;
  currency?: string;
  rateType?: string;
  terms?: boolean;
  isLead?: boolean;
  workDetails?: string;
  sourceType?: string;
  sourceUrl?: string;
  merged_id?: string;
  rateForClient?: number;
  createdAt?: string;
  updatedAt?: string;
  isComplianceVerified?: boolean;
  complianceComment?: string;
  bankName?: string;
  branchName?: string;
  bankAccountNumber?: string;
  bankAccountType?: string;
  ifscCode?: string;
  panCard?: string;
  shiftCode?: string;
  notes?: string;
}
// Search Data
export interface ExpertSearchResult {
  tables: Incentives[];
  total: number;
}
