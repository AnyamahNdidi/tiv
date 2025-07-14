"use client";
import React, { useState } from "react";
import RequestTable from "./RequestTable";
import RequestDetails from "./TenantVerificationDetails";
import { RequestData } from "./TenantVerificationDataTypes";
import { useGetVerificationRequestsQuery } from "@/lib/redux/api/verificationApi";

export default function Verification() {
  const [selectedRequest, setSelectedRequest] = useState<RequestData | null>(
    null
  );
  const {
    data: verificationRequests,
    isLoading,
    error,
  } = useGetVerificationRequestsQuery({});

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#EC5F34]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500">Error loading verification requests</div>
    );
  }

  return (
    <div>
      {selectedRequest ? (
        <RequestDetails
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
        />
      ) : (
        <RequestTable
          selectedRequest={selectedRequest}
          setSelectedRequest={setSelectedRequest as any}
          verificationData={verificationRequests}
        />
      )}
    </div>
  );
}
