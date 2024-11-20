export interface GridJsModel {
  id: string;
  name: string;
  email: string;
  position: string;
  company: string;
  country: string;
}


export interface projects { 
    
  id?: string;
  _id?:string;
  country?: string;
  industry?: string;
Client:string; 
  name?: string;
  clientId?: string;
  projectType?: string;
  status?: string;
  statuscls?: string;
  engagementType?: string;
  expectedNumEvent?: string; 
  createdAt?: string;
  updatedAt?: string;
  completedEventcount?: string; 
  leadAttachedcount?: string; 
  givenToAccMgrcount?: string;
  givenToClientcount?: string;
  expertlist?:string;
  charge_code: string,
  team_location: string,
  scope: string,
  project_type: string,
  networks_count: string,
  number_of_calls: string,
  start_date: string,
  end_date: string,
  company_of_interest: string,
  clientstatus: string,
  clientProjectID: string,
  users: [
    {}
  ],
  project_location: [
    {}
  ],
  workstreams: [
    {}
  ],
  function: [
    {}
  ],
  screening_questions: [
    string
  ],
  calls: [
    {}
  ],
}






// Search Data
export interface projectSearchResult {
  tables: projects[];
  total: number;
}