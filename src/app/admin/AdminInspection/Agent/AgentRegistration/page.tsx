"use client";

import React, { useState } from "react";
import { agentRegSummary, agents } from "../AgentData";
import AgentRegTable from "./AgentRegTable";
import { AgentDetailedInfo } from "../AgentDataTypes";
import AgentRegDetails from "./AgentRegDetails";
import DateRangeSelector from "@/components/DateRangeSelector"; // ✅ Import the component
import { useGetInspectionOverviewQuery } from "@/lib/redux/api/overviewApi";

const regOverview = agentRegSummary;

export default function AgentRegistration() {
  const [, setStartDate] = useState("");
  const [, setEndDate] = useState("");
  const [selectedregistrationRequest, setSelectedregistrationRequest] =
    useState<AgentDetailedInfo | null>(null);
  const { data: inspectionData, isLoading: inspectionLoading } =
    useGetInspectionOverviewQuery({});

  // ✅ Callback for date range change
  const handleDateChange = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
    // Optional: filter `agents` based on `createdAt` within range here
  };

  return (
    <div className="px-6 md:px-12 py-6">
      {!selectedregistrationRequest && (
        <>
          <h1 className="font-semibold text-[20px] md:text-[24px] mb-4">
            Agent Registration
          </h1>

          {/* ✅ Replaced old calendar logic */}
          <DateRangeSelector onDateChange={handleDateChange} />

          {/* Overview Cards */}
          <div className="flex flex-wrap lg:flex-nowrap gap-4">
            {[
              {
                label: "Total Inspections",
                value: inspectionData?.total_inspections,
              },
              { label: "Total Pending", value: inspectionData?.total_pending },
              {
                label: "Total Completed",
                value: inspectionData?.total_completed,
              },

              {
                label: "Total Approved",
                value: inspectionData?.totalApproved || 0,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white shadow-md rounded-lg w-full sm:w-[48%] md:w-full p-5 space-y-3"
              >
                <h3 className="text-sm text-gray-600">{item.label}</h3>
                <p className="text-3xl font-bold text-gray-800">
                  {item.value?.toLocaleString() ?? "0"}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="mt-10">
        {selectedregistrationRequest ? (
          <AgentRegDetails
            registration={[selectedregistrationRequest]}
            onClose={() => setSelectedregistrationRequest(null)}
          />
        ) : (
          <AgentRegTable
            selectedregistrationRequest={selectedregistrationRequest}
            setselectedRegistrationRequest={setSelectedregistrationRequest}
            agents={inspectionData?.inspections?.data || []}
          />
        )}
      </div>
    </div>
  );
}
