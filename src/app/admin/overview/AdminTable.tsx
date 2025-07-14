"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { verificationRequests } from "@/data/verificationData";

const ITEMS_PER_PAGE = 6;

export default function AdminTable() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(verificationRequests.length / ITEMS_PER_PAGE);
  const paginatedRequests = verificationRequests.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="p-6 bg-[#F5F5F5] w-full overflow-x-auto">
      {/* Search Bar */}
      <div className="mb-8 flex flex-wrap justify-between gap-4">
        <div className="relative w-full sm:w-[400px] max-w-md">
          <Icon
            icon="eva:search-outline"
            className="absolute top-3 left-3 text-gray-300 text-lg"
          />
          <input
            type="text"
            placeholder="Search request"
            className="pl-10 pr-4 py-2 w-full text-gray-400 rounded-lg bg-white"
          />
        </div>

        <div className="bg-[#EC5F34] w-full sm:w-[200px] text-white font-semibold flex justify-center items-center rounded-md">
          <button>+ Request Verification</button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-md overflow-hidden p-2">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm rounded-lg">
                <th className="py-3 px-4">
                  <input
                    type="checkbox"
                    className="w-5 h-5 ring-1 ring-gray-200 appearance-none rounded-md text-blue-500"
                  />
                </th>
                <th className="py-3 px-4">Request ID</th>
                <th className="py-3 px-4">Tenant</th>
                <th className="py-3 px-4">Email address</th>
                <th className="py-3 px-4">Identity check</th>
                <th className="py-3 px-4">Credit check</th>
                <th className="py-3 px-4">Employment check</th>
                <th className="py-3 px-4">Request status</th>
                <th className="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {paginatedRequests.map((request) => (
                <tr
                  key={request.id}
                  className="border-t text-gray-100 text-sm space-y-4"
                >
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      className="w-5 h-5 ring-1 ring-gray-200 appearance-none rounded-md text-blue-500"
                    />
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-700">
                    {request.id}
                  </td>
                  <td className="py-3 px-4 flex text-gray-700 items-center gap-6">
                    <span className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-600 rounded-full font-semibold">
                      {request.tenantName.charAt(0)}
                    </span>
                    <div>
                      {request.tenantName}
                      <br />
                      <span className="text-gray-400 text-xs">
                        {request.phone}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-700">{request.email}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={request.identityCheck} />
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={request.creditCheck} />
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={request.employmentCheck} />
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={request.requestStatus} />
                  </td>
                  <td className="py-3 px-4">
                    <div className="bg-gray-100 justify-center rounded-full items-center flex w-8 h-8">
                      <Icon
                        icon="akar-icons:chevron-right"
                        className="text-gray-600 text-sm"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap justify-between items-center mt-4 mb-4 text-gray-600 text-sm">
          <div className="flex items-center gap-4">
            <select className="border border-gray-100 p-2 rounded-md w-14 h-9">
              <option>6</option>
            </select>
            per page
          </div>
          <div className="flex items-center gap-2">
            <button
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
      </div>
    </div>
  );
}

// Status Badge Component
const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles: Record<string, string> = {
    pending: "bg-gray-100 text-gray-700",
    completed: "bg-green-200 text-green-700",
    pass: "bg-green-200 text-green-700",
    fail: "bg-red-200 text-red-700",
  };

  return (
    <span
      className={`px-2 py-1 rounded-sm text-xs ${
        statusStyles[status.toLowerCase()] || "bg-gray-200 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
};


