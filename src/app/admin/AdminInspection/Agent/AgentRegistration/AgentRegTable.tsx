import React, { useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { AgentDetailedInfo } from "../AgentDataTypes";
// import { agents } from "../AgentData";
import { StatusBadge } from "@/components/StatusBadge";
import PaginationControls from "@/components/PaginationControl"; // ✅ import here

interface AgentRegTableProps {
  selectedregistrationRequest: AgentDetailedInfo | null;
  setselectedRegistrationRequest: (
    registration: AgentDetailedInfo | null
  ) => void;
  agents: AgentDetailedInfo[];
  filters: {
    search: string;
    date_from: string;
    date_to: string;
    page: number;
    page_size: number;
    search_by_day: number;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      search: string;
      date_from: string;
      date_to: string;
      page: number;
      page_size: number;
      search_by_day: number;
    }>
  >;
  totalPages: number;
}

const AgentRegTable: React.FC<AgentRegTableProps> = ({
  setselectedRegistrationRequest,
  agents,
  filters,
  setFilters,
  totalPages,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");

  console.log("agents", agents);

  const filteredTransactions = useMemo(() => {
    return agents.filter((registration: AgentDetailedInfo) => {
      const fullName = registration.tenant_name.toLowerCase();
      return (
        registration?.account_id
          .toString()
          .includes(searchTerm.toLowerCase()) ||
        fullName.includes(searchTerm.toLowerCase()) ||
        registration.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [searchTerm]);

  const paginatedTransactions = useMemo(() => {
    return filteredTransactions.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [currentPage, itemsPerPage, filteredTransactions]);

  console.log("paginatedTransactions", paginatedTransactions);

  // const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const handleRegistrationDetails = (registration: AgentDetailedInfo) => {
    setselectedRegistrationRequest(registration);
  };
  const handleSearch = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      search: value,
      page: 1,
    }));
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({
      ...prev,
      page,
    }));
  };

  const handleItemsPerPageChange = (pageSize: number) => {
    setFilters((prev) => ({
      ...prev,
      page_size: pageSize,
      page: 1,
    }));
  };

  const renderTableContent = () => {
    if (agents.length === 0) {
      return (
        <tr>
          <td colSpan={7} className="text-center py-8">
            <div className="flex flex-col items-center justify-center gap-2">
              <Icon icon="carbon:no-data" className="w-12 h-12 text-gray-400" />
              <p className="text-gray-500">
                {filters.search
                  ? `No results found for "${filters.search}"`
                  : "No registration data available"}
              </p>
            </div>
          </td>
        </tr>
      );
    }

    return agents.map((registration, index) => (
      <tr
        key={registration.account_id}
        className="border-t border-gray-100 text-sm"
      >
        <td className="py-3 px-4">
          <input
            type="checkbox"
            className="w-5 h-5 ring-1 ring-gray-200 appearance-none rounded-md text-blue-500"
          />
        </td>
        <td className="py-5 px-4">#{registration.account_id}</td>
        <td className="py-3 px-4">{registration.tenant_name}</td>
        <td className="py-3 px-4">{registration.email}</td>
        <td className="py-3 px-4">{registration.date_requested}</td>
        <td className="py-3 px-4">
          <StatusBadge status={registration.status} />
        </td>
        <td
          className="py-3 px-4 font-medium text-gray-700 cursor-pointer"
          onClick={() => handleRegistrationDetails(registration)}
        >
          <StatusBadge status="View" />
        </td>
      </tr>
    ));
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="flex justify-between items-center">
        <div className="relative w-full sm:w-[400px] max-w-md">
          <Icon
            icon="eva:search-outline"
            className="absolute top-3 left-3 text-gray-700 text-lg"
          />
          <input
            type="text"
            placeholder="Search by name, email or ID"
            className="pl-10 pr-4 py-2 w-full text-gray-500 rounded-lg bg-white"
            value={filters.search}
            onChange={(e) => handleSearch(e.target.value)}
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
                  <input
                    type="checkbox"
                    className="w-5 h-5 ring-1 ring-gray-200 appearance-none rounded-md text-blue-500"
                  />
                </th>
                <th className="py-3 px-4">Registration ID</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email address</th>
                {/* <th className="py-3 px-4">City</th> */}
                <th className="py-3 px-4">Date</th>
                {/* <th className="py-3 px-4">Status</th> */}
                <th className="py-3 px-4 rounded-tr-lg rounded-br-lg">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>{renderTableContent()}</tbody>
          </table>
        </div>

        {/* ✅ Pagination Controls Component */}
        {agents.length > 0 && (
          <div className="mt-4 flex items-center justify-between px-4">
            <div className="text-sm text-gray-500">
              Showing {agents.length} results
            </div>
            <PaginationControls
              currentPage={filters.page}
              totalPages={totalPages}
              setCurrentPage={handlePageChange}
              itemsPerPage={filters.page_size}
              setItemsPerPage={handleItemsPerPageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentRegTable;
