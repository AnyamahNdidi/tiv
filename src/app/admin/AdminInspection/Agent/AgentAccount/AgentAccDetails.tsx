"use client";
import React, { useState } from "react";
import { AgentDetailedInfo } from "../AgentDataTypes";
import { StatusBadge } from "@/components/StatusBadge";
import PaginationControls from "@/components/PaginationControl"; 

type AccountDetailsProps = {
  account: AgentDetailedInfo[];
  onClose: () => void;
};

const AgentRegDetails: React.FC<AccountDetailsProps> = ({
  account,
  onClose,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const totalPages = Math.ceil(account.length / itemsPerPage);

  const paginatedAccount = Array.isArray(account)
    ? account.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : [];

  const latest = account[0];

  return (
    <div className="min-h-screen p-6 relative">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <button
            onClick={onClose}
            className="text-sm text-gray-600 font-medium w-fit"
          >
            ← Back
          </button>

          <div className="flex-1 sm:ml-4">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg font-semibold text-gray-900">
                Agent Account
              </h2>
              <span className="text-xs px-2 py-0.5 font-medium">
                <StatusBadge status={latest?.propertyType} />
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1 break-words">
              Created at {latest?.createdAt ?? "N/A"}
            </p>
          </div>

          <button className="px-4 py-2 rounded bg-rose-500 hover:bg-rose-600 text-white text-sm font-semibold">
            Deactivate
          </button>
        </div>

        {/* account Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 space-y-10">
          <div>
            <h3 className="text-base font-medium text-gray-900 mb-4">
              Agent Information
            </h3>
            <hr className="border-gray-100 mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-10 text-sm">
              {[
                { label: "Full Name", value: latest?.fullName },
                { label: "State", value: latest?.city },
                { label: "Email", value: latest?.emailAddress },
                { label: "Phone number", value: latest?.phoneNumber },
                { label: "Location", value: latest?.address },
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

          {/* Activities */}
          <div>
            <h3 className="text-base font-medium text-gray-900 mb-4">
              Activities
            </h3>

            <div className="overflow-x-auto rounded-lg border border-gray-100">
              {account.length === 0 ? (
                <p className="text-sm text-gray-500 px-4 py-3">
                  No Activity available.
                </p>
              ) : (
                <>
                  <table className="w-full text-sm text-gray-700">
                    <thead className="bg-gray-50 text-gray-600">
                      <tr>
                        <th className="text-left px-4 py-3 font-medium">
                          Date
                        </th>
                        <th className="text-left px-4 py-3 font-medium">
                          Location
                        </th>
                        <th className="text-left px-4 py-3 font-medium">
                          Status
                        </th>
                        <th className="text-left px-4 py-3 font-medium"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedAccount.map((record, index) => (
                        <tr
                          key={index}
                          className="border-t border-gray-100 hover:bg-gray-50 transition"
                        >
                          <td className="px-4 py-4">{record.createdAt}</td>
                          <td className="px-4 py-4">{record.address}</td>
                          <td className="px-4 py-4">{record.status}</td>
                          <td className="px-4 py-4">
                            <StatusBadge status="View" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* ✅ Reusable Pagination */}
                  <div className="mt-6 px-4">
                    <PaginationControls
                      currentPage={currentPage}
                      totalPages={totalPages}
                      setCurrentPage={setCurrentPage}
                      itemsPerPage={itemsPerPage}
                      setItemsPerPage={setItemsPerPage}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentRegDetails;
