export interface Project {
  id?: string;
  projectId?: number;
  name?: string;
  clientId?: string;
  keyAccMgrId?: string;
  additionalkeyAccMgrIds?: string[];
  researchManagerId?: string[];
  researchAnalyst?: any[];
  clientUsers?: object[];
  projectType?: number;
  status?: number;
  engagementType?: number;
  startDate?: string;
  endDate?: string;
  dueDate?: string;
  expectedNumEvent?: string;
  sector?: string;
  industryGroup?: string;
  industry?: string;
  subIndustry?: string;
  isComplianceVerified?: boolean;
  complianceComment?: string;
  notes?: object[];
  leadAttached?: any[];
  givenToAccMgr?: any[];
  givenToClient?: any[];
  projectDescription?: string;
  attachments?: object[];
  comments?: object[];
  createdAt?: string;
  datasrc?:string;
  network_project_id?:string;
  screening_questions?:string[];
  screeningQuestions?:string;   //old
  workstreams?: object[];
  workstreamcalls?: object[];  
}

export interface projectSearchResult {
  tables: Project[];
  total: number;
}
export interface Comments {
  // id: string;
  userId: string;
  description: string;
  createdAt: string;
}
