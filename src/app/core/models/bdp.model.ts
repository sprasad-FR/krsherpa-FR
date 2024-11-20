export interface bdpUser {
  id?: number;
  status?: string;

  type: string;

  name?: string;
  phonecode?: string;
  contactNo?: string;
  alternateMobile?: string;
  email?: string;
  companyName?: string;
  addressLine1?: string;
  addressLine2?: string;
  designation?: number;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;

  firmName?: string;

  employeeId?: string;

  dateOfReg?: string;
  panCard?: string;
  baseCurrency?: string;
  incentiveType?: string;

  bankAccountType?: string;
  bankAccountNumber?: string;
  bankName?: string;
  branchName?: string;
  ifscCode?: string;
  shiftCode?: string;

  image?: string;

  notes?: string;
}

export interface BdpSearchResult {
  tables: bdpUser[];
  total: number;
}
