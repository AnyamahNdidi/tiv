"use client";
import React, { useState } from "react";
import { StatusBadge } from "@/components/StatusBadge";
import PaginationControls from "@/components/PaginationControl";
import { useGetRevenueQuery } from "@/lib/redux/api/overviewApi";

interface Transaction {
  id: number;
  plan: string;
  status: string;
  amount: number;
  date: string;
  transaction_id: string;
  user: {
    name: string;
    email: string;
  };
}

export default function OverviewRevenueTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const { data: revenueData, isLoading } = useGetRevenueQuery({});

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#EC5F34]"></div>
      </div>
    );
  }

  const transactions = revenueData?.transactions?.data || [];
  const totalPages = Math.ceil(
    revenueData?.transactions?.total_count / itemsPerPage
  );

  return (
    <div className="p-4 sm:p-6 md:p-12 bg-[#F5F5F5] w-full overflow-x-auto">
      <div className="bg-white shadow rounded-md overflow-hidden p-2">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max text-left">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm rounded-lg">
                <th className="py-3 px-4">Transaction ID</th>
                <th className="py-3 px-4">Full Name</th>
                <th className="py-3 px-4">Email Address</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Plan</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction: Transaction) => (
                <tr
                  key={transaction.id}
                  className="border-t border-gray-50 text-sm"
                >
                  <td className="py-3 px-4 font-medium text-gray-700">
                    {transaction.transaction_id}
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-700">
                    {transaction.user.name}
                  </td>
                  <td className="py-3 px-4 text-gray-700">
                    {transaction.user.email}
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-700">
                    {new Date(transaction.date).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-700">
                    {transaction.plan}
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-700">
                    ₦{transaction.amount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-700">
                    <StatusBadge status={transaction.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={(value) => {
            setItemsPerPage(value);
            setCurrentPage(1);
          }}
        />
      </div>
    </div>
  );
}
