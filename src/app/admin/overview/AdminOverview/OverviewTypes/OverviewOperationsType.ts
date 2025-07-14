export interface OverviewMetrics {
  totalRequested: number;
  completed: number;
  pending: number;
  failed: number;
  ongoing: number;
}

export interface LandlordOnboarding {
  total: number;
  active: number;
  inactive: number;
}

export interface RevenueFromLandlord {
  totalReceived: number;
  verifications: number;
  tenantManagement: number;
}

export interface InspectionRequest {
  accountId: string;
  tenantName: string;
  email: string;
  dateRequested: string;
  agentAssigned: string;
  status: "Due" | "Completed" | "Pending" | "Failed";
}
