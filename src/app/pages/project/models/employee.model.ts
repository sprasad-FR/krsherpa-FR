export interface employeeUser {
  designationStr: any;
  id?: string;
  name?: string;
  contactNo?: string;
  alternateMobile?: string;
  email?: string;
  addressLine1?: string;
  addressLine2?: string;
  designation?: number;
  password?: string;
  repotingManagerId?: string;
  userId?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  status?: string;
  type?: string;
  incentives?: number;
  panCard?: string;
  aadharCardNo?: string;
  bankAccountType?: string;
  bankAccountNumber?: string;
  bankName?: string;
  branchName?: string;
  ifscCode?: string;
  shiftCode?: string;
 variablesalary?: string;
  image?: string;
  incentiveids?: any;
}

export interface EmployeeSearchResult {
  tables: employeeUser[];
  total: number;
}
