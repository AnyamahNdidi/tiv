import React, { useState } from "react";
import { InspectionRequestDataType } from "./InspectionRequestDataType";
import AssignToAgentModal from "./AssignToAgentModal";
import { StatusBadge } from "@/components/StatusBadge";
import ModalWrapper from "@/components/ModalWrapper";
import { useUpdateInspectionStatusMutation } from "@/lib/redux/api/inspectionApi";
import { toast } from "sonner";

type InspectionDetailsProps = {
  inspection: InspectionRequestDataType[];
  onClose: () => void;
};

const InspectionRequestDetails: React.FC<InspectionDetailsProps> = ({
  inspection,
  onClose,
}) => {
  console.log("inspection ", inspection);
  const latest = inspection[0];
  console.log("latest ", latest);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateStatus, { isLoading }] = useUpdateInspectionStatusMutation();
  const [activeStatus, setActiveStatus] = useState<
    "completed" | "refound" | null
  >(null);

  const handleStatusUpdate = async (status: "completed" | "refound") => {
    setActiveStatus(status);
    const toastId = toast.loading(`Updating status to ${status}...`);

    try {
      await updateStatus({
        id: latest.id,
        status,
      }).unwrap();

      toast.success(`Status updated to ${status} successfully!`, {
        id: toastId,
      });
      onClose(); // Close the modal/return to list view
    } catch (error) {
      toast.error("Failed to update status", {
        id: toastId,
        description:
          error instanceof Error ? error.message : "Please try again.",
      });
    } finally {
      setActiveStatus(null);
    }
  };

  if (!latest) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <p className="text-gray-600">No inspection data available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 relative">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start flex-wrap gap-2 sm:gap-4 justify-between">
          {/* Back Button */}
          <button
            onClick={onClose}
            className="text-sm text-gray-600 font-medium"
            aria-label="Go back"
          >
            ←
          </button>

          {/* Title and Status */}
          <div className="flex flex-col xs:flex-row items-start xs:items-center gap-1 flex-1 min-w-[180px]">
            <h2 className="text-base font-semibold text-gray-900">
              {latest.fullname || "Unnamed"}
            </h2>
            <span className="text-xs px-2 py-0.5 font-medium">
              <StatusBadge status={latest.status} />
            </span>
            <p className="text-xs text-gray-500 xs:ml-2">
              Created at {latest.createdAt ?? "N/A"}
            </p>
          </div>

          {/* Assign Button */}
          <div className="flex gap-2">
            <button
              className={`text-xs sm:text-sm border text-white px-3 py-1.5 rounded-md whitespace-nowrap flex items-center justify-center gap-2 ${
                activeStatus === "completed" && isLoading
                  ? "bg-green-700"
                  : "bg-green-600 hover:bg-green-700"
              }`}
              onClick={() => handleStatusUpdate("completed")}
              disabled={isLoading && activeStatus === "completed"}
            >
              {activeStatus === "completed" && isLoading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Mark as Completed"
              )}
            </button>

            <button
              className={`text-xs sm:text-sm border text-white px-3 py-1.5 rounded-md whitespace-nowrap flex items-center justify-center gap-2 ${
                activeStatus === "refound" && isLoading
                  ? "bg-red-600"
                  : "bg-red-600 hover:bg-red-600"
              }`}
              onClick={() => handleStatusUpdate("refound")}
              disabled={isLoading && activeStatus === "refound"}
            >
              {activeStatus === "refound" && isLoading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Refound"
              )}
            </button>
            {/* <button
              className="text-xs sm:text-sm border text-white bg-red-600 px-3 py-1.5 rounded-md hover:bg-red-700 whitespace-nowrap"
              onClick={() => setIsModalOpen(true)}
            >
              Assign to agent
            </button> */}
          </div>
        </div>

        {/* Inspection Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-base font-medium text-gray-900 mb-4">
            Inspection Details
          </h3>
          <hr className="border-gray-100 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-10 text-sm">
            {[
              { label: "Requester full name", value: latest.fullname },
              { label: "Email", value: latest.email },
              { label: "Phone number", value: latest.phone },

              { label: "Date Requested", value: latest.date_requested },
              // {
              //   label: "Landlord/Agent contact",
              //   value: latest.landlordAgentNumber,
              // },
              {
                label: "Tenant Identity",
                value: latest.tenant_identity,
              },
            ].map((item, index) => (
              <div key={index}>
                <p className="text-gray-500">{item.label}</p>
                <p className="text-gray-800 font-medium">
                  {item.value || "N/A"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ModalWrapper onClose={() => setIsModalOpen(false)}>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <AssignToAgentModal onClose={() => setIsModalOpen(false)} />
          </div>
        </ModalWrapper>
      )}
    </div>
  );
};

export default InspectionRequestDetails;
