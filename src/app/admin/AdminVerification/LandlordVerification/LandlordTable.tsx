import React, { useState } from "react";
import { landlordsummaryData, landlordDetails } from "./landlordData";
import { Icon } from "@iconify/react";
import { LandlordDetailsType } from "./landlordDataType";
import { StatusBadge } from "@/components/StatusBadge";
import Link from "next/link";

interface LandlordTableProps {
  selectedLandlord: LandlordDetailsType | null;
  setSelectedLandlord: (landlord: LandlordDetailsType | null) => void;
  verificationData: any;
  filters?: {
    search: string;
    search_by_day: string | number;
    date_from: string;
    date_to: string;
    page: number;
    page_size: number;
  };
  setFilters?: React.Dispatch<
    React.SetStateAction<{
      search: string;
      search_by_day: string | number;
      date_from: string;
      date_to: string;
      page: number;
      page_size: number;
    }>
  >;
}
const ITEMS_PER_PAGE = 6;

export default function LandlordTable({
  setSelectedLandlord,
  verificationData,
  filters,
  setFilters,
}: LandlordTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);
  const [searchTerm, setSearchTerm] = useState("");

  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (value: string) => {
    setFilters?.((prev) => ({
      ...prev,
      search: value || "",
      page: 1,
    }));
  };

  // Handle search by day with proper integer parsing
  const handleSearchByDay = (value: string) => {
    const numValue = parseInt(value);
    if (!isNaN(numValue) || value === "") {
      setFilters?.((prev) => ({
        ...prev,
        search_by_day: value === "" ? "" : numValue,
        page: 1,
      }));
    }
  };

  // Format date to YYYY-MM-DD
  const handleDateChange = (type: "from" | "to", date: string) => {
    const dateKey = type === "from" ? "date_from" : "date_to";
    setFilters?.((prev) => {
      const newFilters = {
        ...prev,
        [dateKey]: date,
        page: 1,
      };

      // If both dates are set, ensure date_from is not after date_to
      if (newFilters.date_from && newFilters.date_to) {
        if (new Date(newFilters.date_from) > new Date(newFilters.date_to)) {
          if (type === "from") {
            newFilters.date_to = date;
          } else {
            newFilters.date_from = date;
          }
        }
      }

      return newFilters;
    });
  };
  // Filter and paginate data from API
  const filteredData =
    verificationData?.users?.data.filter((user: any) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        user.id.toString().includes(searchLower) ||
        user.full_name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower)
      );
    }) || [];

  const tableData = verificationData?.users?.data || [];
  const totalPages = verificationData?.users?.total_pages || 1;

  const paginatedlandorddetails = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    setFilters?.((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  const handlePrevPage = () => {
    setFilters?.((prev) => ({
      ...prev,
      page: Math.max(1, prev.page - 1),
    }));
  };

  const handleLandlordProfile = (landlord: LandlordDetailsType) => {
    setSelectedLandlord(landlord);
  };

  const handleItemsPerPageChange = (value: number) => {
    setFilters?.((prev) => ({
      ...prev,
      page_size: value,
      page: 1,
    }));
  };

  const { summary } = verificationData || {
    summary: {
      total_users: 0,
      total_verified_users: 0,
      total_active_users: 0,
      total_verifications_used: 0,
    },
  };

  return (
    <div className="w-full overflow-x-hidden">
      <div className="max-w-screen mx-auto space-y-10 px-4 sm:px-8 md:px-12 py-6 md:py-12">
        <h1 className="font-semibold text-[20px] sm:text-[24px] md:text-[28px]">
          Landlord Profile
        </h1>

        {/* Summary Cards */}
        <div className="flex flex-col md:flex-row gap-4">
          {[
            {
              label: "Total Users",
              value: summary.total_users,
            },
            {
              label: "Total Verified Users",
              value: summary.total_verified_users,
            },
            { label: "Total Active Users", value: summary.total_active_users },
            {
              label: "Total Verifications",
              value: summary.total_verifications_used,
            },
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

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
          <div className="relative w-full sm:w-[400px]">
            <Icon
              icon="eva:search-outline"
              className="absolute top-3 left-3 text-gray-700 text-lg"
            />
            <input
              type="text"
              value={filters?.search}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search by ID, name or email"
              className="pl-10 pr-4 py-2 w-full text-sm text-gray-500 rounded-lg bg-white border border-gray-200"
            />
          </div>

          <div
            onClick={() => setShowFilters(!showFilters)}
            className="flex p-3 gap-2 bg-white rounded-xl justify-center items-center cursor-pointer w-fit"
          >
            <Icon
              icon="icon-park-outline:filter"
              width="16"
              height="16"
              className="text-gray-400"
            />
            <p className="text-sm">Filters</p>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white p-4 rounded-lg shadow space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-gray-600">Search by Day</label>
                <input
                  type="number"
                  value={filters?.search_by_day}
                  onChange={(e) => handleSearchByDay(e.target.value)}
                  placeholder="Enter days"
                  min="0"
                  className="w-full mt-1 p-2 border rounded"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Date From</label>
                <input
                  type="date"
                  value={filters?.date_from}
                  onChange={(e) => handleDateChange("from", e.target.value)}
                  className="w-full mt-1 p-2 border rounded"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Date To</label>
                <input
                  type="date"
                  value={filters?.date_to}
                  onChange={(e) => handleDateChange("to", e.target.value)}
                  className="w-full mt-1 p-2 border rounded"
                />
              </div>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="bg-white shadow rounded-lg p-2 overflow-x-auto">
          <table className="min-w-[900px] w-full text-left text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-600">
                <th className="py-3 px-4 rounded-tl-lg rounded-bl-lg">
                  <input
                    type="checkbox"
                    className="w-5 h-5 ring-1 ring-gray-200 appearance-none rounded-md text-blue-500"
                  />
                </th>
                <th className="py-3 px-4 whitespace-nowrap">Account ID</th>
                <th className="py-3 px-4 whitespace-nowrap">Full Name</th>
                <th className="py-3 px-4 whitespace-nowrap">Email address</th>
                <th className="py-3 px-4 whitespace-nowrap">Status</th>
                <th className="py-3 px-4 whitespace-nowrap">Date created</th>
                <th className="py-3 px-4 rounded-tr-lg rounded-br-lg"></th>
              </tr>
            </thead>
            <tbody>
              {tableData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Icon
                        icon="mingcute:search-3-line"
                        className="w-12 h-12 text-gray-400"
                      />
                      <p className="text-gray-500 text-lg">No results found</p>
                      <p className="text-gray-400 text-sm">
                        Try adjusting your search or filter criteria
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                tableData.map((landlord: any, index: any) => (
                  <tr
                    key={index}
                    className="border-t border-gray-100 text-gray-700"
                  >
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        className="w-5 h-5 ring-1 ring-gray-200 appearance-none rounded-md text-blue-500"
                      />
                    </td>
                    <td className="py-5 px-4 whitespace-nowrap">
                      #{landlord.id}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap flex items-center gap-3">
                      <span className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-600 rounded-full font-semibold text-sm">
                        {landlord.full_name.charAt(0)}
                      </span>
                      {landlord.full_name}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      {landlord.email}
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={landlord.status} />
                    </td>
                    <td className="py-3 px-4">
                      {" "}
                      {new Date(landlord.date_created).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        }
                      )}
                    </td>
                    <td
                      className="py-3 px-4 font-medium text-gray-700 cursor-pointer whitespace-nowrap"
                      // onClick={() => handleLandlordProfile(landlord)}
                    >
                      <Link href={`LandlordVerification/${landlord.id}`}>
                        <StatusBadge status="View profile" />
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap justify-between items-center mt-4 mb-4 text-gray-600 text-sm">
          <div className="flex items-center gap-4">
            <select
              value={filters?.page_size}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
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
              disabled={filters?.page === 1}
              className={`hover:bg-red-100 p-2 rounded-md ${
                filters?.page === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <Icon icon="akar-icons:chevron-left" />
            </button>
            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-md">
              {filters?.page}
            </span>
            <button
              onClick={handleNextPage}
              disabled={filters?.page === totalPages}
              className={`hover:bg-red-100 p-2 rounded-md ${
                filters?.page === totalPages
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
