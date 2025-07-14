export type HeaderData = {
  revenue: number;
  totalTenants: number;
  totalProperties: number;
};

export type TenantDetailsType = {
  first_name: string;
  last_name: string;
  email: string;
  phoneNumber: string;
  propertyName: string;
  occupancyDate: string;
  renewalDate: string;
  gender: string;
  status: string;
  createdAt: string;
  history: HistoryItem[];
};

export type HistoryItem = {
  [x: string]: string;
  title: string;
  purpose: string;
  role: string;
  dateCreated: string;
};

export type PropertyDetailsType = {
  propertyName: string;
  maintenance: string[];
  location: string;
  securityFeatures: string;
  leaseTerms: string;
  dateAdded: string;
  propertyType: string;
  occupantsNumber: number;
  createdAt: string;
  propertyDescription: string;
  occupants: {
    occupancyDate: string;
    renewalDate: string;
    fullName: string;
  }[];
};
