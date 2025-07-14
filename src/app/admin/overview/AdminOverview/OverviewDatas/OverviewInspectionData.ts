import {
  OverviewInspectionType,
  InspectionType,
} from "../OverviewTypes/OverviewInspectionType";

export const overviewInspectionData: OverviewInspectionType = {
  summary: {
    totalInspectionsRequested: 80,
    totalCompleted: 50,
    totalPending: 30,
  },
  agents: {
    total: 30,
    active: 23,
    inactive: 7,
  },
  revenue: {
    totalReceived: 30000,
    agentPaid: 12000,
    revenueGenerated: 18000,
  },
};

export const inspectionData: InspectionType = {
  requests: [
    {
      requestId: "#10010101010",
      tenantName: "Reginald Pepple",
      email: "info@cityvj.com",
      address: "10 Abdul Hassab Street",
      dateRequested: "22 Sep 2024",
      agentAssigned: "Amadi Yakubu",
      status: "Due",
    },
    {
      requestId: "#10010101011",
      tenantName: "Sarah Johnson",
      email: "sarah@example.com",
      address: "5 Victoria Island Road",
      dateRequested: "23 Sep 2024",
      agentAssigned: "Ibrahim Musa",
      status: "Completed",
    },
  ],
};
