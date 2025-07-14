import { RevenueData, Transaction } from "../OverviewTypes/OverviewRevenueTypes";

export const revenueOverview: RevenueData[] = [
  {
    title: "Total Revenue Generated",
    amount: 124400.00,
    period: "Within 3 Months",
    growth: 100,
  },
  {
    title: "Tenant Management",
    amount: 124400.00,
    period: "Within 3 Months",
  },
  {
    title: "Property Inspection",
    amount: 14000.00,
    period: "Within 3 Months",
  },
  {
    title: "Verification",
    amount: 24000.00,
    period: "Within 3 Months",
  },
];

export const transactions: Transaction[] = [
  {
    id: "#1000100",
    fullName: "Reginald Pepple",
    email: "info@cityvj.com",
    timestamp: "11th August, 2024",
    activity: "Subscription",
    amount: 1500.0,
    status: "View transaction",
  },
  {
    id: "#1000101",
    fullName: "Reginald Pepple",
    email: "info@cityvj.com",
    timestamp: "11th August, 2024",
    activity: "Fund wallet",
    amount: 1500.0,
    status: "View transaction",
  },
  {
    id: "#1000102",
    fullName: "Reginald Pepple",
    email: "info@cityvj.com",
    timestamp: "11th August, 2024",
    activity: "Subscription",
    amount: 1500.0,
    status: "View transaction",
  },
];
