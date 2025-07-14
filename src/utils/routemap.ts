export const routeMap: Record<string, string> = {
  // Overview
  Overview: "/admin/overview",

  // Verification
  "Verification - Landlord Management":
    "/admin/AdminVerification/LandlordVerification",
  "Verification - Tenant Verification":
    "/admin/AdminVerification/TenantVerification",
  "Verification - Tasks": "/admin/AdminVerification/TaskVerification",

  // Finance
  "Finance - Transaction": "/admin/AdminFinance",
  "Finance - Transaction Dump": "/admin/AdminFinance/TransactionDump",

  // Inspection
  "Inspection - Tenant Inspection": "/admin/AdminInspection/Inspection",
  "Inspection - Inspection List":
    "/admin/AdminInspection/Agent/AgentRegistration",
  "Inspection - Agents Account": "/admin/AdminInspection/Agent/AgentAccount",

  // Users
  Users: "/admin/AdminUsers",

  // Reports
  Reports: "/admin/AdminReports",
  Settings: "/admin/settings",
};
