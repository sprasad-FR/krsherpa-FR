export interface complianceActions {
  id: string;
  userId: string;
  salesLeadId: string;
  projectId: string;
  eventId: string;
  status: string;
  statuscode: number;
  comment: string;
  actions: Array<object>;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}


