export type RevenueOverview = {
  totalRevenue: number;
  subscription: number;
  inspection: number;
  fundWallet: number;
};

export type TenantManagement = {
  totalFunded: number;
  availableFund: number;
  tenantCharge: number;
};

export type InspectionRevenue = {
  totalReceived: number;
  agentPaid: number;
  revenueGenerated: number;
};

export type TransactionRecordType = {
  transactionId: string;
  name: string;
  email: string;
  transactLink: string;
  status: "Successful" | "Failed" | "Pending";
  transactionType: string;
  amount: number;
  phoneNumber: string;
  subscriptionPlan: string;
  createdAt: string;
  transactions: [];
};

export type TransactionDataType = {
  transaction_id: string;
  name: string;
  email: string;
  transactLink: string;
  activity: string;
  transactionStatus: string;
  status: string;
  transactionType: string;
  amount: number;
  phoneNumber: string;
  plan: string;
  date: string;
  user: {
    name: string;
    email: string;
    phoneNumber: string;
  };
};

export interface DashboardStatsType {
  revenueOverview: RevenueOverview;
  tenantManagement: TenantManagement;
  inspectionRevenue: InspectionRevenue;
}
