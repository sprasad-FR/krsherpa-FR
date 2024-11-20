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
  country?: string;
  industry?: string;
Clientname:string; 
  name?: string;
  clientId?: string;
  projectType?: string;
  status?: string;
  statuscls?: string;
  engagementType?: string;
  expectedNumEvent?: string; 
  createdAt?: string;
  updatedAt?: string;
  startdate: string;
  

}






// Search Data
export interface projectSearchResult {
  tables: projects[];
  total: number;
}