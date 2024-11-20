export interface SalesPerson {
  id: number;
  person: string;
}
export interface Events {
  expertRate: number;
  eventDuration: number;
  expertPayment: number;
  salesPerson: string;
  salesIncentives: number;
  contactPerson: string;
  expertIncentives: number;
  clientPayableAmount: number;
}
// Search Data
export interface EventsSearchResult {
  tables: Events[];
  total: number;
}
