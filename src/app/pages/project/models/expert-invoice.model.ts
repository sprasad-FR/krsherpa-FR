export interface ExpertInvoice {
  id?: string;
  entity?: number;
  invoiceNo?: string;
  invoiceDate?: string;
  invoiceStartDate?: string;
  invoiceEndDate?: string;
  events?: string[];
  total?: number;
  status?: string;
  expertId?: string;
  eventId?: string[];
  expert?: object[];
  event?: object[];
  checked?: boolean;
}
