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
}

const AgentRegTable: React.FC<AgentRegTableProps> = ({
  setselectedRegistrationRequest,
  agents,
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

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const handleRegistrationDetails = (registration: AgentDetailedInfo) => {
    setselectedRegistrationRequest(registration);
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
            placeholder="Search by name"
            className="pl-10 pr-4 py-2 w-full text-gray-500 rounded-lg bg-white"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on new search
            }}
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
            <tbody>
              {paginatedTransactions.map((registration, index) => (
                <tr key={index} className="border-t border-gray-100 text-sm">
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
                  {/* <td className="py-3 px-4">{registration.status}</td> */}
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
              ))}
            </tbody>
          </table>
        </div>

        {/* ✅ Pagination Controls Component */}
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />
      </div>
    </div>
  );
};

export default AgentRegTable;
