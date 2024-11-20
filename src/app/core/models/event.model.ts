export interface Event {
  id?: string;
  eventId?: number;
  smeNum?: number;

  eventAt?: string;
  type?: string;
  status?: string;
  expertRateType?: string;
  expertMinDuration?: string;
  expertRate?: number;
  expertCurrency?: string;
  rateForClient?: number;
  clientCurrency?: string;
  multiplicationFactor?: number;
  notes?: string;
  krResearchMgrId?: string;
  keyAccountManager?: string;
  subPnL?: string;
  rescheduleHistory?: any[];
  cancelReason?: any[];
  projectId?: string;
  expertId?: string;
  expertPayment?: string;
  expertInvoiceId?: string;
  clientInvoiceId?: string;
  eventDuration?: number;
  clientPayableAmount?: number;
  isComplianceVerified?: boolean;
  complianceComment?: string;
  clientId?: string;
  createdBy?: number;
  updatedBy?: number;
  updatedAt?: string;
  createdAt?: string;
  deletedBy?: number;
  deletedAt?: string;
  
}
// Search Data
export interface EventSearchResult {
  tables: Event[];
  total: number;
}
