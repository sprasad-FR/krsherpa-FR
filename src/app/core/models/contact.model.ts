export interface ContactUser {
  id?: number;
  image?: string;
  name: string;
  mobile?: string;
  alternateMobile?: string;
  email?: string;
  secondaryEmail?: string;
  companyName?: string;
  addressLine1?: string;
  addressLine2?: string;
  designation?: number;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
  notes?: string;
}
