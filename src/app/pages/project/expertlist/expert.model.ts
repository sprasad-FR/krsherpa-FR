export interface GridJsModel {
  id: string;
  name: string;
  email: string;
  position: string;
  company: string;
  country: string;
}


export interface expert { 
  fullName?: string;
  id?: string;
  firstName?: string;
  lastName?: string;
  country?: string;
  industry?: string;
  krRelationshipMgr?: any;
  krRelationshipMgrid?: any;
  status?: string;
  currentEmployer?: string;
  designation?: string;
  createdAt?: Date;
  updatedAt?: Date;
}


// Search Data
export interface ExpertSearchResult {
  tables: expert[];
  total: number;
}