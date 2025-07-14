"use client";
import React, { useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { StatusBadge } from "@/components/StatusBadge";
import PaginationControls from "@/components/PaginationControl";

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

interface TransactionTableProps {
  selectedTransaction: Transaction | null;
  setSelectedTransaction: (transaction: Transaction | null) => void;
  transactionData: Transaction[];
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  setSelectedTransaction,
  transactionData,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransactions = useMemo(() => {
    return transactionData.filter((transaction) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        transaction.transaction_id.toLowerCase().includes(searchLower) ||
        transaction.user.name.toLowerCase().includes(searchLower) ||
        transaction.user.email.toLowerCase().includes(searchLower)
      );
    });
  }, [searchTerm, transactionData]);

  const paginatedTransactions = useMemo(() => {
    return filteredTransactions.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [currentPage, itemsPerPage, filteredTransactions]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

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
            placeholder="Search by name, email or transaction ID"
            className="pl-10 pr-4 py-2 w-full text-gray-500 rounded-lg bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden p-2">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max text-left">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm">
                <th className="py-3 px-4">Transaction ID</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email address</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Transaction Type</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {paginatedTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="border-t border-gray-100 text-sm"
                >
                  <td className="py-5 px-4">#{transaction.transaction_id}</td>
                  <td className="py-3 px-4">{transaction.user.name}</td>
                  <td className="py-3 px-4">{transaction.user.email}</td>
                  <td className="py-3 px-4">
                    <StatusBadge status={transaction.status} />
                  </td>
                  <td className="py-3 px-4">{transaction.plan}</td>
                  <td className="py-3 px-4">
                    ₦{transaction.amount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td
                    className="py-3 px-4 font-medium text-gray-700 cursor-pointer"
                    onClick={() => setSelectedTransaction(transaction)}
                  >
                    <StatusBadge status="View transaction" />
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
          setItemsPerPage={setItemsPerPage}
        />
      </div>
    </div>
  );
};

export default TransactionTable;
