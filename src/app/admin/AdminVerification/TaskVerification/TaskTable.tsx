import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { tasks, tasksummaryData } from "./TaskData";
import { TaskData } from "./TaskDataType";
import { StatusBadge } from "@/components/StatusBadge";

interface TaskTableProps {
  selectedTask: TaskData | null;
  setSelectedTask: (task: TaskData) => void;
  verificationData: {
    summary: {
      total_true: number;
      total_false: number;
    };
    pagination: {
      page: number;
      page_size: number;
      total_count: number;
    };
    data: Array<{
      id: number;
      uuid: string;
      landlord_name: string;
      full_name: string;
      email: string;
      phone: string;
      status: string;
      created_at: string;
    }>;
  };
  filters: {
    search: string;
    page: number;
    page_size: number;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      search: string;
      page: number;
      page_size: number;
    }>
  >;
}

const ITEMS_PER_PAGE = 6;

export default function RequestTable({
  selectedTask,
  setSelectedTask,
  verificationData,
  filters,
  setFilters,
}: TaskTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(ITEMS_PER_PAGE);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const summary = {
    totalRequest: verificationData?.pagination?.total_count || 0,
    CompletedVerification: verificationData?.summary?.total_true || 0,
    ongoingVerification:
      verificationData?.data?.filter((item) => item.status === "Ongoing")
        .length || 0,
    failedVerification: verificationData?.summary?.total_false || 0,
  };

  const filteredRequests =
    verificationData?.data?.filter(
      (task) =>
        task.uuid.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.email.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  // const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);

  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      search: value,
      page: 1,
    }));
  };

  const handleItemsPerPageChange = (value: number) => {
    setFilters((prev) => ({
      ...prev,
      page_size: value,
      page: 1,
    }));
  };
  const totalPages = Math.ceil(
    (verificationData?.pagination?.total_count || 0) / filters.page_size
  );

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const tableData = verificationData?.data || [];

  return (
    <div className="w-full max-w-screen overflow-x-hidden">
      <div className="max-w-screen mx-auto space-y-10 px-4 sm:px-8 md:px-12 py-6 md:py-12">
        <h1 className="font-semibold text-[24px] md:text-[28px]">
          Verification Task
        </h1>

        {!selectedTask && (
          <>
            {/* Summary Cards */}
            <div className="flex flex-col md:flex-row gap-4">
              {[
                { label: "Total Requests", value: summary.totalRequest },
                { label: "Completed", value: summary.CompletedVerification },
                { label: "Ongoing", value: summary.ongoingVerification },
                { label: "Failed", value: summary.failedVerification },
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
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-6 gap-4">
              <h2 className="text-lg font-semibold">All tasks</h2>
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
                    value={filters.search}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>

                {/* <div className="flex p-3 gap-2 bg-white rounded-xl justify-center items-center cursor-pointer w-fit">
                  <Icon
                    icon="icon-park-outline:filter"
                    width="16"
                    height="16"
                    className="text-gray-400"
                  />
                  <p className="text-sm">Filters</p>
                </div> */}
              </div>
            </div>

            {/* Table */}
            <div className="bg-white shadow rounded-lg overflow-hidden p-2 mt-6">
              <div className="overflow-x-auto">
                <table className="min-w-[900px] w-full text-left text-sm">
                  <thead>
                    <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                      <th className="py-3 px-4">Request ID</th>
                      <th className="py-3 px-4">Landlord Name</th>
                      <th className="py-3 px-4">Tenant Name</th>
                      <th className="py-3 px-4">Tenant Email</th>
                      <th className="py-3 px-4">Phone</th>
                      <th className="py-3 px-4">Date Requested</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData?.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-8 text-center">
                          <div className="flex flex-col items-center justify-center gap-2">
                            <Icon
                              icon="mingcute:search-3-line"
                              className="w-12 h-12 text-gray-400"
                            />
                            <p className="text-gray-500 text-lg">
                              {filters.search
                                ? "No results found for your search"
                                : "No tasks available"}
                            </p>
                            <p className="text-gray-400 text-sm">
                              {filters.search
                                ? "Try adjusting your search criteria"
                                : "Check back later for new tasks"}
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      tableData?.map((task) => (
                        <tr
                          key={task.id}
                          className="border-t border-gray-100 text-sm"
                        >
                          <td className="py-3 px-4">
                            #{task.uuid.slice(0, 8)}
                          </td>
                          <td className="py-3 px-4 flex items-center gap-6">
                            <span className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-600 rounded-full font-semibold">
                              {task.landlord_name.charAt(0)}
                            </span>
                            {task.landlord_name}
                          </td>
                          <td className="py-3 px-4">{task.full_name}</td>
                          <td className="py-3 px-4">{task.email}</td>
                          <td className="py-3 px-4">{task.phone}</td>
                          <td className="py-3 px-4">
                            {new Date(task.created_at).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <StatusBadge status={task.status} />
                          </td>
                          <td
                            className="py-3 px-4 cursor-pointer"
                            onClick={() => setSelectedTask(task)}
                          >
                            <StatusBadge status="View" />
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {/* <div className="flex flex-wrap justify-between items-center mt-4 mb-4 text-gray-600 text-sm">
                <div className="flex items-center gap-4">
                  <select
                    value={itemsPerPage}
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
              </div> */}
              <div className="flex flex-wrap justify-between items-center mt-4 mb-4 text-gray-600 text-sm">
                <div className="flex items-center gap-4">
                  <select
                    value={filters.page_size}
                    onChange={(e) =>
                      handleItemsPerPageChange(Number(e.target.value))
                    }
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
                    onClick={() =>
                      handlePageChange(Math.max(1, filters.page - 1))
                    }
                    disabled={filters.page === 1}
                    className={`hover:bg-red-100 p-2 rounded-md ${
                      filters.page === 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <Icon icon="akar-icons:chevron-left" />
                  </button>
                  <span className="bg-red-100 text-red-600 px-3 py-1 rounded-md">
                    {filters.page}
                  </span>
                  <button
                    onClick={() =>
                      handlePageChange(Math.min(totalPages, filters.page + 1))
                    }
                    disabled={filters.page === totalPages}
                    className={`hover:bg-red-100 p-2 rounded-md ${
                      filters.page === totalPages
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    <Icon icon="akar-icons:chevron-right" />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
