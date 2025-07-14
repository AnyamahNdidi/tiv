export interface RevenueData {
  title: string;
  amount: number;
  period: string;
  growth?: number;
}

export interface Transaction {
  id: string;
  fullName: string;
  email: string;
  timestamp: string;
  activity: string;
  amount: number;
  status: string;
}
