export interface VerificationRequest {
  status: "Pending" | "Verified" | "Not Verified";
  id: string;
  date: string;
  time: string;
  tenantName: string;
  phone: string;
  email: string;
  identityCheck: string;
  creditCheck: string;
  employmentCheck: string;
  requestStatus: string;
}

export interface VerificationSummary {
  totalRequests: number;
  completedVerifications: number;
  pendingVerifications: number;
}
