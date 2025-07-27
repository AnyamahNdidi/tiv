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
  filters: {
    search: string;
    date_from: string;
    date_to: string;
    page: number;
    page_size: number;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      search: string;
      date_from: string;
      date_to: string;
      page: number;
      page_size: number;
    }>
  >;
  revenueDump?: {
    total: number;
    data: Transaction[];
  };
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  setSelectedTransaction,
  transactionData,
  filters,
  setFilters,
  revenueDump,
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
  const handleSearch = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      search: value,
      page: 1, // Reset page when searching
    }));
  };

  const handleItemsPerPageChange = (value: number) => {
    setFilters((prev) => ({
      ...prev,
      page_size: value,
      page: 1,
    }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters((prev) => ({
      ...prev,
      page: newPage,
    }));
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
            placeholder="Search by name, email or transaction ID"
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
              {transactionData.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Icon
                        icon="mingcute:search-3-line"
                        className="w-12 h-12 text-gray-400"
                      />
                      <p className="text-gray-500 text-lg">
                        {filters.search
                          ? "No results found"
                          : "No transactions available"}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {filters.search
                          ? "Try adjusting your search"
                          : "Check back later"}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                transactionData?.map((transaction) => (
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
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        /> */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-2">
            <select
              value={filters.page_size}
              onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
              className="border rounded px-2 py-1"
            >
              <option value={6}>6</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
            <span className="text-sm text-gray-600">per page</span>
          </div>

          <PaginationControls
            currentPage={filters.page}
            totalPages={Math.ceil(
              (revenueDump?.total || 0) / filters.page_size
            )}
            setCurrentPage={handlePageChange}
            itemsPerPage={filters.page_size}
            setItemsPerPage={handleItemsPerPageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
