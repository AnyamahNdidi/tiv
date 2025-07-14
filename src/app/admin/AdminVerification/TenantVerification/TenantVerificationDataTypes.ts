// RequestDataType.ts

export type RequestStatus = "Pending" | "Ongoing" | "Failed" | "Passed";

export type VerificationCheckStatus = "Pending" | "Passed" | "Failed";

export type EmploymentCheck = {
  status: VerificationCheckStatus;
  lineManagerCheck: VerificationCheckStatus;
  idAndIncomeCheck: VerificationCheckStatus;
  uploads: Upload[];
};

export type SectionKey = "identity_check" | "credit_check" | "employment_check";

export type VerificationChecks = {
  identity_check: VerificationCheckStatus;
  credit_check: VerificationCheckStatus;
  employment_check: EmploymentCheck;
};

export type Upload = {
  name: string;
  url: string;
};

export type RequestData = {
  requestId: string;
  landlordName: string;
  tenantName: string;
  tenantEmail: string;
  tenantContact: string;
  gender: string;
  dateRequested: string;
  createdAt: string;
  status: RequestStatus;
  completedAt: string;
  verificationChecks: VerificationChecks;
};
export type RequestSummaryDataType = {
  summary: {
    totalRequest: number;
    CompletedVerification: number;
    failedVerification: number;
    ongoingVerification: number;
  };
};
