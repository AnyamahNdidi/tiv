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

  const [filters, setFilters] = useState(() => {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);

    return {
      search: "",
      date_from: sevenDaysAgo.toISOString().split("T")[0],
      date_to: today.toISOString().split("T")[0],
      page: 1,
      page_size: 6,
      search_by_day: 0,
    };
  });
  const queryParams = {
    ...filters,
    search_by_day: filters.search_by_day || undefined, // Remove if 0 or empty
    search: filters.search || undefined,
    page: filters.page.toString(),
    page_size: filters.page_size.toString(),
  };
  const { data: inspectionData, isLoading: inspectionLoading } =
    useGetInspectionOverviewQuery(
      Object.fromEntries(
        Object.entries(queryParams).filter(([_, value]) => value !== undefined)
      )
    );

  const handleDateChange = (start: string, end: string) => {
    setFilters((prev) => ({
      ...prev,
      date_from: start,
      date_to: end,
      page: 1, // Reset page when dates change
      search_by_day: 0, // Reset search by day when using date range
    }));
  };

  if (inspectionLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#EC5F34]"></div>
      </div>
    );
  }

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
            filters={filters}
            setFilters={setFilters}
            totalPages={Math.ceil(
              (inspectionData?.inspections?.total || 0) / filters.page_size
            )}
          />
        )}
      </div>
    </div>
  );
}
