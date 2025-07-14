"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { users } from "../OverviewDatas/OverviewUserData";
import { UserData } from "../OverviewTypes/OverviewUserTypes";
import { StatusBadge } from "@/components/StatusBadge";
import PaginationControls from "@/components/PaginationControl";

interface Props {
  usersOverView: any;
  onViewDetails: (userId: number) => void;
}

export default function OverviewUserTable({
  usersOverView,
  onViewDetails,
}: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const filteredUsers =
    usersOverView?.data?.filter((user: any) =>
      user.full_name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  console.log("filtered users", filteredUsers);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white p-4 md:p-8 m-2 md:m-8 rounded-xl shadow-md w-full">
      {/* Search and Header */}
      <div className="mb-6 flex flex-wrap justify-between items-center gap-4">
        <h1 className="text-lg md:text-xl font-semibold text-gray-800">
          Users ({usersOverView?.users?.total_count || 0})
        </h1>
        <div className="relative w-full sm:w-[300px] max-w-sm">
          <Icon
            icon="eva:search-outline"
            className="absolute top-3 left-3 text-gray-400 text-lg"
          />
          <input
            type="text"
            placeholder="Search users"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10 pr-4 py-2 w-full text-sm text-gray-700 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-200"
          />
        </div>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto">
        <table className="w-full table-auto text-left">
          <thead className="bg-gray-100 text-gray-600 font-medium text-xs">
            <tr>
              <th className="px-2 py-3 whitespace-nowrap">ID</th>
              <th className="px-2 py-3 whitespace-nowrap">Full Name</th>
              <th className="px-2 py-3 whitespace-nowrap">Email</th>
              <th className="px-2 py-3 whitespace-nowrap">Date Created</th>
              <th className="px-2 py-3 whitespace-nowrap">Status</th>
              <th className="px-2 py-3 whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedUsers.map((user: any) => (
              <tr key={user.id} className="hover:bg-gray-50 transition">
                <td className="px-2 py-2 text-xs text-gray-800 font-medium whitespace-nowrap">
                  #{user.id}
                </td>
                <td className="px-2 py-2 text-xs whitespace-nowrap flex items-center gap-2">
                  <div className="bg-red-100 text-red-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold">
                    {user.full_name.charAt(0)}
                  </div>
                  <span className="text-gray-700">{user.full_name}</span>
                </td>
                <td className="px-2 py-2 text-xs text-gray-600 whitespace-nowrap">
                  {user.email}
                </td>
                <td className="px-2 py-2 text-xs text-gray-700 whitespace-nowrap">
                  {new Date(user.date_created).toLocaleDateString()}
                </td>
                <td className="px-2 py-2 whitespace-nowrap">
                  <StatusBadge status={user.status} />
                </td>
                <td className="px-2 py-2 whitespace-nowrap">
                  <button
                    onClick={() => onViewDetails(user.id)}
                    className="px-2 py-1 border border-gray-300 text-gray-600 rounded text-xs hover:bg-gray-100"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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
  );
}
