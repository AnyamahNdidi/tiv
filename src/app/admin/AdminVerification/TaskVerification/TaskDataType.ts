// RequestDataType.ts

export type RequestStatus = "Pending" | "Ongoing" | "Failed" | "Passed";

export type VerificationCheckStatus = "Pending" | "Passed" | "Failed";

export type EmploymentCheck = {
  status: VerificationCheckStatus;
  lineManagerCheck: VerificationCheckStatus;
  idAndIncomeCheck: VerificationCheckStatus;
  uploads: Upload[];
};

export type VerificationChecks = {
  identityCheck: VerificationCheckStatus;
  creditCheck: VerificationCheckStatus;
  employmentCheck: EmploymentCheck;
};

export type Upload = {
  name: string;
  url: string;
};

export type TaskData = {
  id: number;
  uuid: string;
  landlord_name: string;
  full_name: string;
  email: string;
  phone: string;
  status: string;
  created_at: string;
  // verificationChecks: VerificationChecks;
};
export type TaskSummaryDataType = {
  summary: {
    totalRequest: number;
    CompletedVerification: number;
    failedVerification: number;
    ongoingVerification: number;
  };
};
