export interface UserData {
  accountId: string;
  fullName: string;
  email: string;
  dateCreated: string;
  role: string;
  status: string;
}

export interface UserSummary {
  totalAccessGranted: number;
  activeUsers: number;
  inactiveUsers: number;
}

export interface OverviewUserType {
  summary: UserSummary;
}
