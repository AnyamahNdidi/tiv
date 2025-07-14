import {
  OverviewMetrics,
  LandlordOnboarding,
  RevenueFromLandlord,
  InspectionRequest,
} from "../OverviewTypes/OverviewOperationsType";

export const overviewMetrics: OverviewMetrics = {
  totalRequested: 100,
  completed: 50,
  pending: 20,
  failed: 20,
  ongoing: 10,
};

export const landlordOnboarding: LandlordOnboarding = {
  total: 30,
  active: 23,
  inactive: 7,
};

export const revenueFromLandlord: RevenueFromLandlord = {
  totalReceived: 30000,
  verifications: 12000,
  tenantManagement: 18000,
};

export const inspectionRequests: InspectionRequest[] = [
  {
    accountId: "#10010101010",
    tenantName: "Gbenga Sanoki",
    email: "info@cityvj.com",
    dateRequested: "22 Sep 2024",
    agentAssigned: "Amadi Yakubu",
    status: "Due",
  },
];
