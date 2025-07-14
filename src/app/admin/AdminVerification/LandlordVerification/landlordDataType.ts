export type PropertyOccupant = {
  occupancyDate: string;
  renewalDate: string;
  fullName: string;
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
  occupants: PropertyOccupant[];
};

export type VerificationRequest = {
  fullName: string;
  address: string;
  date: string;
};

export type TenantHistory = {
  title: string;
  purpose: string;
  role: string;
  dateCreated: string;
};

export type TenantDetailsType = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  occupancyDate: string;
  renewalDate: string;
  propertyName: string;
  gender: string;
  status: string;
  createdAt: string;
  history: TenantHistory[];
};

export type LandlordDetailsType = {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  status: string;
  dateCreated: string;
  createdAt: string;
  totalVerificationsSent: number;
  totalPropertiesAdded: number;
  totalTenantsAdded: number;
  property_list: any;
  tenant_list: any;
  verificationRequests: VerificationRequest[];
};

// Declare the LandlordSummaryDataType type
export type LandlordSummaryDataType = {
  summary: {
    totalInspectionsRequested: number;
    totalCompleted: number;
    totalPending: number;
  };
};
