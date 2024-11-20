export interface ClientInvoice {
  id?: string;
  entity?: number;
  invoiceNo?: string;
  invoiceDate?: string;
  invoiceStartDate?: string;
  convertionrate: number;
  invoiceEndDate?: string;
  events?: string[];
  total?: number;
  status?: string;
  eventId?: string[];
  clientId?: string;
  clientName?: string;
  taxamount?: number;
  kraddress?:string[];
  clientaddress?:string[];
  discount?:number;
  taxes?:object[];
  client?: object[];
  billingclientId?:string;
  checked?: boolean;
}

export interface Generic {
  id?: string;
  name: string;
  type: string;
  dataArray?: string[];

}
