"use client";
import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { requests, requestsummaryData } from "./TenantVerificationData";
import { RequestData } from "./TenantVerificationDataTypes";
import { StatusBadge } from "@/components/StatusBadge";
import Link from "next/link";

interface VerificationRequest {
  id: string;
  landlord_name: string;
  full_name: string;
  tenant_email: string;
  email: string;
  phone: string;
  date_requested: string;
  status: string;
}

interface RequestTableProps {
  selectedRequest: VerificationRequest | null;
  setSelectedRequest: (request: VerificationRequest) => void;
  verificationData: {
    summary: {
      total_request: number;
      total_passed: number;
      total_pending: number;
      total_failed: number;
    };
    data: VerificationRequest[];
  };
}
const ITEMS_PER_PAGE = 6;

export default function RequestTable({
  selectedRequest,
  setSelectedRequest,
  verificationData,
}: RequestTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);
  const [searchQuery, setSearchQuery] = useState("");

  // const { summary, data: requests } = verificationData;
  console.log("request data", verificationData);

  const {
    summary = {
      total_request: 0,
      total_passed: 0,
      total_pending: 0,
      total_failed: 0,
    },
    data: requests = [],
  } = verificationData || {};
  // console.log("request data", summary);

  const filteredRequests = (requests || []).filter((request: any) => {
    if (!request) return false;

    const searchLower = searchQuery.toLowerCase();
    return (
      (request.id?.toString() || "").includes(searchLower) ||
      (request.full_name || "").toLowerCase().includes(searchLower) ||
      (request.email || "").toLowerCase().includes(searchLower)
    );
  });

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="w-full overflow-x-hidden">
      <div className="max-w-screen mx-auto space-y-10 px-4 sm:px-8 md:px-12 py-6 md:py-12">
        <h1 className="font-semibold text-[20px] sm:text-[24px] md:text-[28px]">
          Tenant Verification Requests
        </h1>

        {!selectedRequest && (
          <>
            {/* Summary Cards */}
            <div className="flex flex-col md:flex-row gap-4">
              {[
                {
                  label: "Total Requests",
                  value: summary?.total_request || 0,
                },
                { label: "Passed", value: summary?.total_passed || 0 },
                { label: "Pending", value: summary?.total_pending || 0 },
                { label: "Failed", value: summary?.total_failed || 0 },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white shadow-md rounded-lg w-full md:w-1/4 p-4 sm:p-5 space-y-3 sm:space-y-5"
                >
                  <h3 className="text-[14px] sm:text-[15px] text-gray-600">
                    {item.label}
                  </h3>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-800">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
              <div className="relative w-full sm:w-[400px]">
                <Icon
                  icon="eva:search-outline"
                  className="absolute top-3 left-3 text-gray-700 text-lg"
                />
                <input
                  type="text"
                  placeholder="Search by ID, name or email"
                  className="pl-10 pr-4 py-2 w-full text-sm text-gray-500 rounded-lg bg-white border border-gray-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex p-3 gap-2 bg-white rounded-xl justify-center items-center cursor-pointer w-fit">
                <Icon
                  icon="icon-park-outline:filter"
                  width="16"
                  height="16"
                  className="text-gray-400"
                />
                <p className="text-sm">Filters</p>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white shadow rounded-lg p-2 overflow-x-auto">
              <table className="min-w-[900px] w-full text-left text-sm">
                <thead>
                  <tr className="bg-gray-100 text-gray-600">
                    <th className="py-3 px-4 whitespace-nowrap">Request ID</th>
                    <th className="py-3 px-4 whitespace-nowrap">
                      Landlord Name
                    </th>
                    <th className="py-3 px-4 whitespace-nowrap">Tenant Name</th>
                    <th className="py-3 px-4 whitespace-nowrap">
                      Tenant Email
                    </th>
                    <th className="py-3 px-4 whitespace-nowrap">Phone</th>
                    <th className="py-3 px-4 whitespace-nowrap">
                      Date Requested
                    </th>
                    <th className="py-3 px-4 whitespace-nowrap">Status</th>
                    <th className="py-3 px-4 rounded-tr-lg rounded-br-lg"></th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedRequests.map((request) => (
                    <tr
                      key={request.id}
                      className="border-t border-gray-100 text-gray-700"
                    >
                      <td className="py-3 px-4">{request.id}</td>
                      <td className="py-3 px-4 flex items-center gap-3">
                        <span className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-600 rounded-full font-semibold text-sm">
                          {request.landlord_name.charAt(0)}
                        </span>
                        {request.landlord_name}
                      </td>
                      <td className="py-3 px-4">{request.full_name}</td>
                      <td className="py-3 px-4">{request.email}</td>
                      <td className="py-3 px-4">{request.phone}</td>
                      <td className="py-3 px-4">
                        {new Date(request.date_requested).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </td>
                      <td
                        className="py-3 px-4 font-medium text-gray-700 cursor-pointer"
                        onClick={() => {}}
                      >
                        <StatusBadge status={request.status} />
                      </td>
                      <td
                        className="py-3 px-4 cursor-pointer"
                        // onClick={() => setSelectedRequest(request as any)}
                      >
                        <Link href={`TenantVerification/${request.id}`}>
                          <StatusBadge status="View profile" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-wrap justify-between items-center mt-4 mb-4 text-gray-600 text-sm">
              <div className="flex items-center gap-4">
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="border border-gray-100 p-2 rounded-md w-14 h-9"
                >
                  <option value={6}>6</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
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
          </>
        )}
      </div>
    </div>
  );
}
