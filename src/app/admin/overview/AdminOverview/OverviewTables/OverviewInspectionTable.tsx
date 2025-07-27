"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { inspectionData } from "../OverviewDatas/OverviewInspectionData";
import { InspectionRequest } from "../OverviewTypes/OverviewInspectionType";
import { StatusBadge } from "@/components/StatusBadge";
import PaginationControls from "@/components/PaginationControl";

interface InspectionTableProps {
  inspections: {
    page: number;
    page_size: number;
    total_count: number;
    data: Array<{
      id: number;
      tenant_name: string;
      account_id: string;
      email: string;
      date_requested: string;
      status: string;
    }>;
  };
  onViewDetails: (id: number) => void;
  filters: {
    search: string;
    date_from: string;
    date_to: string;
    page: number;
    page_size: number;
    search_by_day: number;
  };
  setFilters: React.Dispatch<React.SetStateAction<any>>;
}

export default function OverviewInspectionTable({
  inspections,
  onViewDetails,
  filters,
  setFilters,
}: InspectionTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  if (!inspections) return null;

  const filteredRequests = inspections.data.filter((request) =>
    request.tenant_name.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredRequests.length / itemsPerPage)
  );

  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (value: string) => {
    setFilters((prev: any) => ({
      ...prev,
      search: value,
      page: 1,
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev: any) => ({
      ...prev,
      page,
    }));
  };

  const handleItemsPerPageChange = (pageSize: number) => {
    setFilters((prev: any) => ({
      ...prev,
      page_size: pageSize,
      page: 1,
    }));
  };

  return (
    <div className="p-3 md:px-10 lg:px-10 w-full overflow-x-auto">
      {/* Search Header */}
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
            placeholder="Search Requests"
            value={filters.search}
            onChange={(e) => handleSearch(e.target.value)}
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
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 rounded-tr-lg rounded-br-lg"></th>
              </tr>
            </thead>
            <tbody>
              {paginatedRequests.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-gray-500 py-10">
                    No inspection requests found.
                  </td>
                </tr>
              ) : (
                paginatedRequests.map((request, index) => (
                  <tr key={index} className="border-t border-gray-100 text-sm">
                    <td className="py-5 px-4">{request.tenant_name}</td>
                    <td className="py-3 px-4">{request.account_id}</td>
                    <td className="py-3 px-4">{request.email}</td>
                    <td className="py-3 px-4 font-medium text-gray-700">
                      {new Date(request.date_requested).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={request.status} />
                    </td>
                    <td className="py-3 px-4 font-medium text-gray-700 cursor-pointer">
                      <button
                        onClick={() => onViewDetails(request.id)}
                        className="text-[#EC5F34] hover:text-[#e0502a] font-medium"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {inspections.data.length > 0 && (
          <PaginationControls
            currentPage={filters.page}
            totalPages={Math.ceil(inspections.total_count / filters.page_size)}
            setCurrentPage={handlePageChange}
            itemsPerPage={filters.page_size}
            setItemsPerPage={handleItemsPerPageChange}
          />
        )}
      </div>
    </div>
  );
}
