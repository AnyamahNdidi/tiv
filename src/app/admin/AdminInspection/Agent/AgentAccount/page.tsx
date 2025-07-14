"use client"
import React, { useState } from "react";
import { agentAccSummary, agents } from "../AgentData";
import AgentAccTable from "./AgentAccTable";
import { AgentDetailedInfo } from "../AgentDataTypes";
import AgentAccDetails from "./AgentAccDetails";
import DateRangeSelector from "@/components/DateRangeSelector"; // ✅ Import your component

const accOverview = agentAccSummary;

export default function AgentRegistration() {
  const [, setStartDate] = useState("");
  const [, setEndDate] = useState("");
  const [selectedAccount, setSelectedAccount] =
    useState<AgentDetailedInfo | null>(null);

  // ✅ Callback when date range is selected
  const handleDateChange = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
    // Optionally, filter agents here based on the date
  };

  return (
    <div className="px-6 md:px-12 py-6">
      {!selectedAccount && (
        <>
          <h1 className="font-semibold text-[20px] md:text-[24px] mb-4">
            Agent Account
          </h1>

          {/* ✅ Plug in the date range selector */}
          <DateRangeSelector onDateChange={handleDateChange} />

          {/* Overview Cards */}
          <div className="flex flex-wrap lg:flex-nowrap gap-4">
            {[
              { label: "Total Agents", value: accOverview.totalAgents },
              { label: "Total Active", value: accOverview.totalActive },
              { label: "Total Blocked", value: accOverview.totalBlocked },
              { label: "Total Suspended", value: accOverview.totalSuspended },
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
        {selectedAccount ? (
          <AgentAccDetails
            account={[selectedAccount]}
            onClose={() => setSelectedAccount(null)}
          />
        ) : (
          <AgentAccTable
            selectedAccount={selectedAccount}
            setSelectedAccount={setSelectedAccount}
            agents={agents} // You can filter this based on `startDate` and `endDate` if needed
          />
        )}
      </div>
    </div>
  );
}
