"use client";
import React, { useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { User } from "../AdminUsers/UserDataTypes";
import { users } from "../AdminUsers/UserData";
import { StatusBadge } from "@/components/StatusBadge";
import PaginationControls from "@/components/PaginationControl";

const ReportTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = useMemo(() => {
    return users.filter((user: User) => {
      const fullName = user?.first_name.toLowerCase();
      return (
        user?.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fullName.includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [searchTerm]);

  const paginatedUsers = useMemo(() => {
    return filteredUsers.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [currentPage, itemsPerPage, filteredUsers]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / itemsPerPage)
  );

  const handleViewUser = (user: User) => {
    console.log("View user clicked:", user);
  };

  return (
    <div className="space-y-6 py-6 px-4 sm:px-12">
      {/* Header Section */}
      <div>
        <h1 className="font-semibold text-[20px] md:text-[24px] mb-4">
          Report
        </h1>

        <div className="bg-[#EC5F34] w-48 text-white text-center font-bold rounded-[25px] py-4">
          <p>Report To IT</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex justify-between items-center">
        <div className="relative w-full sm:w-[400px] max-w-md">
          <Icon
            icon="eva:search-outline"
            className="absolute top-3 left-3 text-gray-700 text-lg"
          />
          <input
            type="text"
            placeholder="Search by name, email, or ID"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10 pr-4 py-2 w-full text-gray-700 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-red-300"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden p-2">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm">
                <th className="py-3 px-4 border border-gray-100 rounded-tl-lg rounded-bl-lg">
                  <input
                    type="checkbox"
                    className="w-5 h-5 ring-1 ring-gray-200 appearance-none rounded-md text-blue-500"
                  />
                </th>
                <th className="py-3 px-4">Ticket ID</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 rounded-tr-lg rounded-br-lg">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((user, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-100 text-sm hover:bg-gray-50"
                  >
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        className="w-5 h-5 ring-1 ring-gray-200 appearance-none rounded-md text-blue-500"
                      />
                    </td>
                    <td className="py-3 px-4">{user.id}</td>
                    <td className="py-3 px-4">{user.first_name}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">{user.admin_roles}</td>
                    <td className="py-3 px-4">
                      {/* <StatusBadge status={user.status} /> */}
                    </td>
                    <td
                      className="py-3 px-4 font-medium text-blue-500 cursor-pointer"
                      onClick={() => handleViewUser(user)}
                    >
                      <StatusBadge status="View" />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-6 text-gray-500 text-sm"
                  >
                    No users found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 🔄 Use PaginationControls Component Here */}
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

export default ReportTable;
