export type AgentRegSummary = {
  totalFunnel: number;
  totalPending: number;
  totalApproved: number;
  totalDeclined: number;
};
export type AgentAccSummary = {
  totalAgents: number;
  totalActive: number;
  totalBlocked: number;
  totalSuspended: number;
};

export type AgentActivity = {
  date: string;
  location: string;
  status: string;
};

export type AgentDetailedInfo = {
  account_id: string;
  tenant_name: string;
  email: string;
  phoneNumber: string;
  address: string;
  gender: string;
  state: string;
  lga: string;
  date_requested: string;
  propertyType: string;
  jobCommitment: string;
  flexibility: string;
  hasSmartphoneWithCamera: string;
  createdAt: string;
  reviewerName: string;
  status: "Active" | "Blocked" | "Suspended" | "Failed";
  activities: AgentActivity[];
};
