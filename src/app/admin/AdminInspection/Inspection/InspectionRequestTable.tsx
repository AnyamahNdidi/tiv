import React, { useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { InspectionRequestDataType } from "./InspectionRequestDataType";
import { StatusBadge } from "@/components/StatusBadge";
import PaginationControls from "@/components/PaginationControl"; // ✅ Adjust path as needed

interface TransactionTableProps {
  selectedInspectionRequest: InspectionRequestDataType | null;
  setselectedInspectionRequest: (
    inspection: InspectionRequestDataType | null
  ) => void;
  inspectionRequests: any;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  setselectedInspectionRequest,
  inspectionRequests,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredInspectionRequest = useMemo(() => {
    return inspectionRequests?.data.filter((inspection: any) => {
      const fullName = inspection?.name?.toLowerCase();
      return (
        inspection?.requestId
          ?.toString()
          ?.includes(searchTerm?.toLowerCase()) ||
        fullName?.includes(searchTerm?.toLowerCase()) ||
        inspection?.email?.toLowerCase()?.includes(searchTerm.toLowerCase())
      );
    });
  }, [searchTerm, inspectionRequests]);

  const paginatedInspectionRequest = useMemo(() => {
    return filteredInspectionRequest?.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [currentPage, itemsPerPage, filteredInspectionRequest]);

  const totalPages = Math.ceil(
    filteredInspectionRequest?.length / itemsPerPage
  );

  const handleInspectionDetails = (inspection: InspectionRequestDataType) => {
    setselectedInspectionRequest(inspection);
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
                <th className="py-3 px-4">Request ID</th>
                <th className="py-3 px-4">Full Name</th>
                <th className="py-3 px-4">Phone</th>
                <th className="py-3 px-4">Address</th>
                {/* <th className="py-3 px-4">Assigned Agent</th> */}
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 rounded-tr-lg rounded-br-lg"></th>
              </tr>
            </thead>
            <tbody>
              {paginatedInspectionRequest?.length > 0 ? (
                paginatedInspectionRequest.map(
                  (inspection: any, index: any) => (
                    <tr
                      key={index}
                      className="border-t border-gray-100 text-sm"
                    >
                      <td className="py-3 px-4">
                        <input
                          type="checkbox"
                          className="w-5 h-5 ring-1 ring-gray-200 appearance-none rounded-md text-blue-500"
                        />
                      </td>
                      <td className="py-5 px-4">
                        #{inspection.tenant_identity}
                      </td>
                      <td className="py-3 px-4">{inspection.fullname}</td>
                      <td className="py-3 px-4">{inspection.email}</td>
                      <td className="py-3 px-4">
                        <StatusBadge status={inspection.phone} />
                      </td>
                      {/* <td className="py-3 px-4">{inspection.assignedAgent}</td> */}
                      <td className="py-3 px-4">
                        <StatusBadge status={inspection.status} />
                      </td>
                      <td
                        className="py-3 px-4 font-medium text-gray-700 cursor-pointer"
                        onClick={() => handleInspectionDetails(inspection)}
                      >
                        <StatusBadge status="View" />
                      </td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td colSpan={8} className="py-6 text-center text-gray-500">
                    No inspections found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ✅ Replaced this with PaginationControls */}
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

export default TransactionTable;
