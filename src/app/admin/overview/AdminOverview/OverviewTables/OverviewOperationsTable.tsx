"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { inspectionRequests } from "../OverviewDatas/OverviewOperationsData";
import { InspectionRequest } from "../OverviewTypes/OverviewOperationsType";
import { StatusBadge } from "@/components/StatusBadge";
import PaginationControls from "@/components/PaginationControl"; 

export default function OverviewOperationsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const filteredRequests = inspectionRequests.filter((request) =>
    request.tenantName.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredRequests.length / itemsPerPage)
  );

  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-3 shadow rounded-lg bg-white w-full overflow-x-auto">
      {/* Top Bar */}
      <div className="mb-8 flex flex-wrap justify-between gap-4">
        <h1 className="text-xl font-semibold text-gray-800">
          Inspection Requests
        </h1>
        <div className="relative w-full sm:w-[400px] max-w-md">
          <Icon
            icon="eva:search-outline"
            className="absolute top-3 left-3 text-gray-700 text-lg"
          />
          <input
            type="text"
            placeholder="Search tenant name"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to page 1 on search
            }}
            className="pl-10 pr-4 py-2 w-full shadow text-gray-500 rounded-lg bg-white"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden p-2">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max text-left">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm">
                <th className="py-3 px-4 rounded-tl-lg rounded-bl-lg">
                  Tenant Name
                </th>
                <th className="py-3 px-4">Account ID</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Date Requested</th>
                <th className="py-3 px-4">Agent Assigned</th>
                <th className="py-3 px-4 rounded-tr-lg rounded-br-lg">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedRequests.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center text-gray-500 py-10 text-sm"
                  >
                    No inspection requests found.
                  </td>
                </tr>
              ) : (
                paginatedRequests.map((request: InspectionRequest, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-100 text-sm hover:bg-gray-50"
                  >
                    <td className="py-4 px-4 font-medium text-gray-700 flex items-center gap-3">
                      <div className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center font-semibold">
                        {request.tenantName.charAt(0)}
                      </div>
                      {request.tenantName}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {request.accountId}
                    </td>
                    <td className="py-3 px-4 text-gray-600">{request.email}</td>
                    <td className="py-3 px-4 font-medium text-gray-700">
                      {request.dateRequested}
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-700">
                      {request.agentAssigned}
                    </td>
                    <td className="py-3 px-4 flex items-center gap-2">
                      <StatusBadge status={request.status} />
                      <button className="ml-auto px-3 py-1 border border-gray-200 text-gray-600 rounded-md text-xs hover:bg-gray-100 transition">
                        Profile
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ✅ Reusable Pagination Component */}
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={(value) => {
            setItemsPerPage(value);
            setCurrentPage(1); // reset page when items per page changes
          }}
        />
      </div>
    </div>
  );
}
