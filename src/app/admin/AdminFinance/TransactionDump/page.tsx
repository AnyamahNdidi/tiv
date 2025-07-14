"use client";

import React, { useState } from "react";
import TransactionTable from "../TransactionTable";
import TransactionDetails from "../TransactionDetails";
import { transactionData } from "../TransactionData";
import { TransactionDataType } from "../TransactionDataType";
import DateRangeSelector from "@/components/DateRangeSelector";
import { useGetFinanceRevenueDumpQuery } from "@/lib/redux/api/financeApi";

interface TransactionUser {
  name: string;
  email: string;
}

interface Transaction {
  id: number;
  plan: string;
  status: string;
  amount: number;
  date: string;
  transaction_id: string;
  user: TransactionUser;
}

interface TenantTransaction {
  id: number;
  plan: string;
  status: string;
  amount: number;
  date: string;
}

export default function TransactionDump() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const { data: revenueDump, isLoading } = useGetFinanceRevenueDumpQuery({});

  const transactions = revenueDump?.transactions?.data || [];

  return (
    <div className="p-4 sm:p-6 md:p-12 w-full max-w-screen overflow-x-hidden">
      {!selectedTransaction && (
        <>
          <h1 className="font-semibold text-[20px] md:text-[24px] mb-4">
            Transaction
          </h1>

          <DateRangeSelector
            onDateChange={(start, end) => {
              setStartDate(start);
              setEndDate(end);
            }}
          />
        </>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#EC5F34]"></div>
        </div>
      ) : selectedTransaction ? (
        <TransactionDetails
          transaction={[selectedTransaction as any]}
          onClose={() => setSelectedTransaction(null)}
        />
      ) : (
        <TransactionTable
          selectedTransaction={selectedTransaction}
          setSelectedTransaction={setSelectedTransaction}
          transactionData={transactions}
        />
      )}
    </div>
  );
}
