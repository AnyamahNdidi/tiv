import React from "react";
import { StatusBadge } from "@/components/StatusBadge";

interface InspectionDetailsProps {
  inspection: {
    id: number;
    tenant_name: string;
    account_id: string;
    email: string;
    date_requested: string;
    address: string;
    property_type: string | null;
    landlord_contact: string;
    location: string | null;
    link: string | null;
    paid: boolean;
    section: string;
    status: string;
  };
  onClose: () => void;
}

const InspectionDetails: React.FC<InspectionDetailsProps> = ({
  inspection,
  onClose,
}) => {
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
                {inspection.tenant_name}
              </h2>
              <span className="text-xs px-2 py-0.5 font-medium">
                <StatusBadge status={inspection.status} />
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Created at {inspection.date_requested ?? "N/A"}
            </p>
          </div>
        </div>

        {/* Inspection Info */}
        <div className="bg-white rounded-xl border-gray-200 p-4 sm:p-6">
          <h3 className="text-base font-medium text-gray-900 mb-4">
            Inspection details
          </h3>
          <hr className="border-gray-100 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-10 text-sm">
            {[
              { label: "Full Name", value: inspection.tenant_name },
              { label: "Date Requested", value: inspection.date_requested },
              { label: "Email Address", value: inspection.email },
              { label: "Address", value: inspection.address },
              { label: "Property Type", value: inspection.property_type },
              { label: "Landlord Contact", value: inspection.landlord_contact },
              { label: "Location", value: inspection.location },
              { label: "Section", value: inspection.section },
              {
                label: "Payment Status",
                value: inspection.paid ? "Paid" : "Unpaid",
              },
              { label: "Account ID", value: inspection.account_id },
              { label: "Link", value: inspection.link },
              { label: "Status", value: inspection.status },
            ].map((item, index) => (
              <div key={index}>
                <p className="text-gray-500">{item.label}</p>
                <p className="text-gray-800 font-medium break-words">
                  {item.value || "N/A"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspectionDetails;
