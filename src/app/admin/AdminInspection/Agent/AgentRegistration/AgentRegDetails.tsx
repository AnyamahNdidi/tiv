import React from "react";
import { AgentDetailedInfo } from "../AgentDataTypes";
import { StatusBadge } from "@/components/StatusBadge";

type RegistrationDetailsProps = {
  registration: any[];
  onClose: () => void;
};

const AgentRegDetails: React.FC<RegistrationDetailsProps> = ({
  registration,
  onClose,
}) => {
  const latest = registration[0];

  console.log("Latest registration:", latest);

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 relative bg-gray-50">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <button
            onClick={onClose}
            className="text-sm text-gray-600 font-medium w-fit"
          >
            ←
          </button>

          <div className="flex-1 sm:ml-4">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold text-gray-900">
                {latest.tenant_name}
              </h2>
              <span className="text-xs px-2 py-0.5 font-medium">
                <StatusBadge status={latest?.status} />
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Created at {latest?.date_requested ?? "N/A"}
            </p>
          </div>

          {/* <div className="flex flex-col sm:flex-row gap-2">
            <button className="px-4 py-2 rounded text-gray-700 bg-white text-sm font-semibold border border-gray-300">
              Accept
            </button>
            <button className="px-4 py-2 rounded bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold">
              Reject
            </button>
          </div> */}
        </div>

        {/* Registration Info */}
        <div className="bg-white rounded-xl border-gray-200 p-4 sm:p-6">
          <h3 className="text-base font-medium text-gray-900 mb-4">
            Registration details
          </h3>
          <hr className="border-gray-100 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-10 text-sm">
            {[
              { label: "Full Name", value: latest?.tenant_name },
              { label: "Date Requested", value: latest?.date_requested },
              { label: "Email Address", value: latest?.email },
              { label: "Gender", value: latest?.gender },
              { label: "State", value: latest?.state },
              { label: "LGA", value: latest?.lga },
            ].map((item, index) => (
              <div key={index}>
                <p className="text-gray-500">{item.label}</p>
                <p className="text-gray-800 font-medium break-words">
                  {item.value || "N/A"}
                </p>
              </div>
            ))}
          </div>

          <hr className="border-gray-100 mb-8 mt-8" />

          <div className="space-y-6 text-sm">
            <p className="text-gray-600">
              Do you currently have a job or other commitments?
              <span className="text-black font-semibold ml-1">
                {latest.jobCommitment}
              </span>
            </p>
            <p className="text-gray-600">
              Are you looking for part time or full time flexibility?
              <span className="text-black font-semibold ml-1">
                {latest.flexibility}
              </span>
            </p>
            <p className="text-gray-600">
              Do you own a functional smartphone with a working camera?
              <span className="text-black font-semibold ml-1">
                {latest.hasSmartphoneWithCamera}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentRegDetails;
