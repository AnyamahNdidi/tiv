import React from "react";
import PaginationControls from "@/components/PaginationControl";

interface TableData {
  full_name: string;
  email: string;
  phone: string;
  date: string;
  status: string;
  address: string;
}

interface Column {
  label: string;
  key: keyof TableData;
}

interface Props {
  title: string;
  columns: Column[];
  data: TableData[];
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (value: number) => void;
}

const TableSection = ({
  title,
  columns,
  data,
  currentPage,
  totalPages,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
}: Props) => (
  <div className="bg-white rounded-xl p-6 space-y-4 shadow-sm">
    <h3 className="text-sm sm:text-base font-semibold text-[#101828]">
      {title}
    </h3>
    <div className="overflow-x-auto rounded-xl border border-gray-100">
      <table className="min-w-full text-left text-xs sm:text-sm">
        <thead>
          <tr className="bg-gray-100 text-[#667085]">
            {columns.map((col, i) => (
              <th key={i} className="py-3 px-4 font-medium">
                {col.label}
              </th>
            ))}
            <th className="py-3 px-4 font-medium">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="text-center py-4 text-gray-400"
              >
                No data available
              </td>
            </tr>
          ) : (
            data?.map((item, idx) => (
              <tr
                key={`${item.email}-${idx}`}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                {columns.map(({ key }, i) => {
                  const value = item[key];
                  const displayValue =
                    key === "date"
                      ? new Date(value).toLocaleDateString()
                      : value;

                  return (
                    <td
                      key={`${item.email}-${key}`}
                      className="py-3 px-4 text-gray-700"
                    >
                      {i === 0 ? (
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-semibold">
                            {item.full_name.charAt(0)}
                          </div>
                          {value}
                        </div>
                      ) : (
                        displayValue
                      )}
                    </td>
                  );
                })}
                <td className="px-4 py-3">
                  <button
                    className="bg-white border border-gray-200 text-gray-700 rounded-sm text-xs px-2 py-1"
                    aria-label="View verification request"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          )}
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
);

export default TableSection;
