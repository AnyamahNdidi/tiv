import React, { useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { AgentDetailedInfo } from "../AgentDataTypes";
import { agents } from "../AgentData";
import { StatusBadge } from "@/components/StatusBadge";
import PaginationControls from "@/components/PaginationControl"; // ✅ Import it

interface AgentAccTableProps {
  selectedAccount: AgentDetailedInfo | null;
  setSelectedAccount: (account: AgentDetailedInfo | null) => void;
  agents: AgentDetailedInfo[];
}

const AgentAccTable: React.FC<AgentAccTableProps> = ({
  setSelectedAccount,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAgents = useMemo(() => {
    return agents.filter((account: AgentDetailedInfo) => {
      const fullName = account.fullName.toLowerCase();
      return (
        account.registrationId.toString().includes(searchTerm.toLowerCase()) ||
        fullName.includes(searchTerm.toLowerCase()) ||
        account.emailAddress.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [searchTerm]);

  const paginatedAgents = useMemo(() => {
    return filteredAgents.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [currentPage, itemsPerPage, filteredAgents]);

  const totalPages = Math.ceil(filteredAgents.length / itemsPerPage);

  const handleAccountDetails = (account: AgentDetailedInfo) => {
    setSelectedAccount(account);
  };

  return (
    <div className="space-y-6">
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
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

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
                <th className="py-3 px-4">City</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 rounded-tr-lg rounded-br-lg"></th>
              </tr>
            </thead>
            <tbody>
              {paginatedAgents.map((account, index) => (
                <tr key={index} className="border-t border-gray-100 text-sm">
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      className="w-5 h-5 ring-1 ring-gray-200 appearance-none rounded-md text-blue-500"
                    />
                  </td>
                  <td className="py-5 px-4">#{account.registrationId}</td>
                  <td className="py-3 px-4">{account.fullName}</td>
                  <td className="py-3 px-4">{account.emailAddress}</td>
                  <td className="py-3 px-4">{account.city}</td>
                  <td className="py-3 px-4">{account.status}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={account.status} />
                  </td>
                  <td
                    className="py-3 px-4 font-medium text-gray-700 cursor-pointer"
                    onClick={() => handleAccountDetails(account)}
                  >
                    <StatusBadge status="View" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ✅ Reusable Pagination Controls */}
        <div className="mt-4 mb-4 px-2">
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />
        </div>
      </div>
    </div>
  );
};

export default AgentAccTable;
