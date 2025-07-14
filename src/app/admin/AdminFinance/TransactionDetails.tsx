"use client";

import React, { useState } from "react";
import { TransactionDataType } from "./TransactionDataType";
import { StatusBadge } from "@/components/StatusBadge";
import PaginationControls from "@/components/PaginationControl";

type TransactionDetailsProps = {
  transaction: TransactionDataType[];
  onClose: () => void;
};

const TransactionDetails: React.FC<TransactionDetailsProps> = ({
  transaction,
  onClose,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  console.log("transaction this ", transaction);

  const totalPages = Math.ceil(transaction.length / itemsPerPage);

  const paginatedRequests = transaction.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const latest = transaction[0];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-start gap-4">
          <button
            onClick={onClose}
            className="text-md text-gray-600 font-medium"
          >
            ←
          </button>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                {latest.name}
              </h2>
              <span className="text-xs px-2 py-0.5 rounded font-medium">
                <StatusBadge status={latest?.status} />
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Created at {latest?.date ?? "N/A"}
            </p>
          </div>

          <button className="text-sm border border-gray-200 bg-white px-4 py-2 rounded-md hover:bg-gray-100">
            Download receipt
          </button>
        </div>

        {/* Transaction Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4">
            Transaction details
          </h3>
          <hr className="border-gray-100 mb-5 sm:mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 sm:gap-y-8 gap-x-6 sm:gap-x-10 text-sm sm:text-[15px]">
            {[
              { label: "Transaction ID", value: latest?.transaction_id },
              { label: "Customer name", value: latest?.user?.name },
              { label: "Email", value: latest?.user?.email },
              { label: "Subscription Plan", value: latest?.plan },
              { label: "Phone number", value: latest?.phoneNumber },
            ].map((item, index) => (
              <div key={index}>
                <p className="text-gray-500">{item.label}</p>
                <p className="text-gray-800 font-medium break-words">
                  {item.value || "N/A"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction History Table */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-base font-medium text-gray-900 mb-4">
            Transaction
          </h3>

          <div className="bg-white shadow rounded-lg overflow-x-auto p-3 sm:p-4">
            {transaction.length === 0 ? (
              <p className="text-sm text-gray-500 px-4 py-3">
                No Transaction available.
              </p>
            ) : (
              <>
                <table className="min-w-full text-left text-xs sm:text-sm">
                  <thead className="bg-gray-50 text-gray-600 whitespace-nowrap">
                    <tr>
                      <th className="px-4 py-3 font-medium">Date</th>
                      {/* <th className="px-4 py-3 font-medium">Activity</th> */}
                      <th className="px-4 py-3 font-medium">Amount</th>
                      <th className="px-4 py-3 font-medium">Reference ID</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="whitespace-nowrap">
                    {paginatedRequests.map((record, index) => (
                      <tr key={index} className="border-t border-gray-100">
                        <td className="px-4 py-4">{record.date}</td>
                        {/* <td className="px-4 py-4">{record.activity}</td> */}
                        <td className="px-4 py-4">${record.amount}</td>
                        <td className="px-4 py-4 text-blue-600 break-all">
                          {record.transaction_id}
                        </td>
                        <td className="px-4 py-4">
                          <StatusBadge status={record.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* ✅ Integrated PaginationControls */}
                <PaginationControls
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                  itemsPerPage={itemsPerPage}
                  setItemsPerPage={setItemsPerPage}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
