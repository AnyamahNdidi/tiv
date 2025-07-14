export interface SummaryData {
  totalInspectionsRequested: number;
  totalCompleted: number;
  totalPending: number;
}

export interface AgentsData {
  total: number;
  active: number;
  inactive: number;
}

export interface RevenueData {
  totalReceived: number;
  agentPaid: number;
  revenueGenerated: number;
}

export interface InspectionRequest {
  requestId: string;
  tenantName: string;
  email: string;
  address: string;
  dateRequested: string;
  agentAssigned: string;
  status: string;
}

export interface OverviewInspectionType {
  summary: SummaryData;
  agents: AgentsData;
  revenue: RevenueData;
}

export interface InspectionType {
  requests: InspectionRequest[];
}
