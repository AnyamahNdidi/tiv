import React, { useState, useEffect } from "react";

import { Icon } from "@iconify/react";
import EditProfileModal from "./OverviewModals/EditProfileModal";
import DeactivateModal from "./OverviewModals/DeactivateModal";
import ModalWrapper from "@/components/ModalWrapper";

import { LandlordDetailsType } from "../../AdminVerification/LandlordVerification/landlordDataType";

interface TenantDetailsType {
  id: number;
  full_name: string;
  phone: string;
  email: string;
  property_name: string;
  move_in: string;
  renewal_date: string;
  status: string;
}

interface InvoiceType {
  // Add invoice properties based on your data structure
  title: string;
  purpose: string;
  role: string;
  dateCreated: string;
}

interface TenantDetailsProps {
  tenant: {
    tenant: TenantDetailsType;
    invoices: {
      page: number;
      page_size: number;
      total_count: number;
      data: InvoiceType[];
    };
  };
  onClose: () => void;
}

const ITEMS_PER_PAGE = 6;

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return isNaN(date.getTime())
    ? "Invalid Date"
    : date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
};

const TenantOverViewDetails: React.FC<TenantDetailsProps> = ({
  tenant,
  onClose,
}) => {
  console.log("this is tenants details", tenant);
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const tenantData = tenant.tenant;
  const history = tenant.invoices.data || [];
  const totalPages = Math.max(1, Math.ceil(history.length / ITEMS_PER_PAGE));

  const paginatedRequests = history.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Sync current page if history shrinks
  useEffect(() => {
    if ((currentPage - 1) * ITEMS_PER_PAGE >= history.length) {
      setCurrentPage(Math.max(1, totalPages));
    }
  }, [history, currentPage, totalPages]);

  // Body scroll toggle
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow =
      showEditModal || showDeactivateModal ? "hidden" : originalOverflow;
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [showEditModal, showDeactivateModal]);

  // Reset page when modals close
  useEffect(() => {
    if (!showEditModal && !showDeactivateModal) {
      setCurrentPage(1);
    }
  }, [showEditModal, showDeactivateModal]);

  return (
    <div className="min-h-screen p-4 sm:p-6 relative overflow-x-hidden bg-gray-50">
      {/* Modals */}
      {showEditModal && (
        <ModalWrapper onClose={() => setShowEditModal(false)}>
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            aria-modal="true"
            role="dialog"
          >
            <EditProfileModal onClose={() => setShowEditModal(false)} />
          </div>
        </ModalWrapper>
      )}

      {showDeactivateModal && (
        <ModalWrapper onClose={() => setShowDeactivateModal(false)}>
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            aria-modal="true"
            role="dialog"
          >
            <DeactivateModal onClose={() => setShowDeactivateModal(false)} />
          </div>
        </ModalWrapper>
      )}

      <div
        className={`max-w-5xl mx-auto space-y-6 duration-300 ${
          showEditModal || showDeactivateModal
            ? "pointer-events-none opacity-50"
            : ""
        }`}
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex items-start gap-3">
            <button
              onClick={onClose}
              aria-label="Go back"
              className="text-md text-gray-600 font-bold cursor-pointer"
            >
              ←
            </button>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-semibold text-gray-900">
                  {tenantData.full_name}
                </h2>
                <span className="bg-green-100 text-green-600 text-xs font-medium px-2.5 py-0.5 rounded">
                  {tenantData.status}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {/* Created at {formatDate(tenant.createdAt)} */}
              </p>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <button
              className="border border-gray-200 bg-white text-sm px-4 py-2 hover:bg-gray-200 cursor-pointer rounded-lg"
              onClick={() => setShowEditModal(true)}
            >
              Edit profile
            </button>

            <button
              className="bg-red-700 text-white text-sm px-4 py-2 cursor-pointer rounded-lg hover:bg-red-600"
              onClick={() => setShowDeactivateModal(true)}
            >
              Deactivate
            </button>
          </div>
        </div>

        {/* Tenant Details */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          <h3 className="text-base font-medium text-gray-900 mb-4">
            Tenant details
          </h3>
          <hr className="w-full border-t border-gray-100 my-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10 text-sm">
            {[
              { label: "Full Name", value: tenantData.full_name },
              { label: "Phone number", value: tenantData.phone },
              { label: "Email", value: tenantData.email },
              { label: "Property Name", value: tenantData.property_name },
              { label: "Move In Date", value: formatDate(tenantData.move_in) },
              {
                label: "Renewal Date",
                value: formatDate(tenantData.renewal_date),
              },
              { label: "Status", value: tenantData.status },
            ].map((item, index) => (
              <div key={index}>
                <p className="text-gray-500">{item.label}</p>
                <p className="font-medium text-gray-900 break-words">
                  {item.value || "N/A"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* History Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          <h3 className="text-base font-medium text-gray-900 mb-4">History</h3>

          <div className="overflow-x-auto rounded-xl border border-gray-100 p-1 w-full">
            {history.length === 0 ? (
              <p className="text-gray-500 text-sm px-4 py-3">
                No history available.
              </p>
            ) : (
              <>
                <div className="min-w-[600px]">
                  <table className="w-full text-left text-sm" role="table">
                    <thead>
                      <tr className="bg-gray-100 text-gray-600 text-sm">
                        <th className="py-3 px-4 rounded-tl-lg rounded-bl-lg">
                          Title
                        </th>
                        <th className="py-3 px-4">Purpose</th>
                        <th className="py-3 px-4">Role</th>
                        <th className="py-3 px-4 rounded-tr-lg rounded-br-lg">
                          Date Created
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedRequests.map((record) => (
                        <tr
                          key={`${record.title}-${record.dateCreated}`}
                          className="border-b border-gray-100 text-sm"
                        >
                          <td className="py-5 px-4 text-gray-700">
                            {record.title}
                          </td>
                          <td className="py-3 px-4 text-gray-700">
                            {record.purpose}
                          </td>
                          <td className="py-3 px-4 text-gray-700">
                            {record.role}
                          </td>
                          <td className="py-3 px-4 text-gray-700">
                            {formatDate(record.dateCreated)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex flex-wrap justify-between items-center mt-4 mb-2 text-gray-600 text-sm">
                  <div className="flex items-center gap-2">
                    <select className="border border-gray-100 p-2 rounded-md w-14 h-9">
                      <option>6</option>
                    </select>
                    per page
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      aria-label="Previous page"
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      className={`hover:bg-red-100 p-2 rounded-md ${
                        currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <Icon icon="akar-icons:chevron-left" />
                    </button>
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-md">
                      {currentPage}
                    </span>
                    <button
                      aria-label="Next page"
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className={`hover:bg-red-100 p-2 rounded-md ${
                        currentPage === totalPages
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      <Icon icon="akar-icons:chevron-right" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantOverViewDetails;
