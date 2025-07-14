"use client";
import React, { useState } from "react";
import InspectionRequestTable from "./InspectionRequestTable";
import { InspectionRequestDataType } from "./InspectionRequestDataType";
import InspectionRequestDetails from "./InspectionRequestDetails";

import DateRangeSelector from "@/components/DateRangeSelector";
import { useGetPendingInspectionsQuery } from "@/lib/redux/api/inspectionApi";

export default function TransactionDump() {
  const [, setStartDate] = useState("");
  const [, setEndDate] = useState("");
  const [selectedInspectionRequest, setSelectedInspectionRequest] =
    useState<InspectionRequestDataType | null>(null);

  const {
    data: inspectionRequests,
    isLoading,
    error,
  } = useGetPendingInspectionsQuery({});

  const handleDateChange = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
  };
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#EC5F34]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10 px-12 py-6">
      {!selectedInspectionRequest && (
        <>
          <h1 className="font-semibold text-[20px] md:text-[24px] mb-4">
            Tenant Inspection
          </h1>

          {/* ✅ Replaced old dropdown with DateRangeSelector */}
          <DateRangeSelector onDateChange={handleDateChange} />
        </>
      )}

      {selectedInspectionRequest ? (
        <InspectionRequestDetails
          inspection={[selectedInspectionRequest]}
          onClose={() => setSelectedInspectionRequest(null)}
        />
      ) : (
        <InspectionRequestTable
          selectedInspectionRequest={selectedInspectionRequest}
          setselectedInspectionRequest={setSelectedInspectionRequest}
          inspectionRequests={inspectionRequests}
        />
      )}
    </div>
  );
}
