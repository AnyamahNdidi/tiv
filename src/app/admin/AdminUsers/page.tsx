"use client";
import React, { useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { User } from "./UserDataTypes";
import { useRouter } from "next/navigation";
import { StatusBadge } from "@/components/StatusBadge";
import PaginationControls from "@/components/PaginationControl";
import { useListAdminUsersQuery } from "@/lib/redux/api/adminUserApi";
import CreateAdminModal from "./CreateAdminModal";
import CreateRoleModal from "./CreateRoleModal";

interface AdminUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  admin_roles: string;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    admin_roles: string;
  };
}
const UserTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const router = useRouter();
  const [showRoleModal, setShowRoleModal] = useState(false);

  const { data: listUserData, isLoading } = useListAdminUsersQuery({});

  console.log("listUserData ", listUserData);

  const filteredUsers = useMemo(() => {
    if (!listUserData) return [];
    return listUserData.filter((user: AdminUser) => {
      const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
      return (
        user.id.toString().includes(searchTerm.toLowerCase()) ||
        fullName.includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [searchTerm, listUserData]);

  const paginatedUsers = useMemo(() => {
    return filteredUsers.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [currentPage, itemsPerPage, filteredUsers]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handleViewUser = (user: AdminUser) => {
    router.push(`/admin/AdminUsers/${user.id}`);
  };

  return (
    <div className="space-y-6 py-6 px-4 sm:px-12">
      <div>
        <h1 className="font-semibold text-[20px] md:text-[24px] mb-4">Users</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-[#EC5F34] px-6 text-white text-center font-bold rounded-[25px] py-4 hover:bg-[#D54E2A] transition-colors"
          >
            New Account
          </button>
          <button
            onClick={() => setShowRoleModal(true)}
            className="bg-[#EC5F34] px-6 text-white text-center font-bold rounded-[25px] py-4 hover:bg-[#D54E2A] transition-colors"
          >
            Create Role
          </button>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="relative w-full sm:w-[400px] max-w-md">
          <Icon
            icon="eva:search-outline"
            className="absolute top-3 left-3 text-gray-700 text-lg"
          />
          <input
            type="text"
            placeholder="Search by name"
            className="pl-10 pr-4 py-2 w-full text-gray-500 rounded-lg bg-white border border-gray-300"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden p-2">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100 text-gray-600 text-sm">
                <th className="py-3 px-4 border border-gray-100 rounded-tl-lg rounded-bl-lg">
                  <input
                    type="checkbox"
                    className="w-5 h-5 ring-1 ring-gray-200 appearance-none rounded-md text-blue-500"
                  />
                </th>
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4 rounded-tr-lg rounded-br-lg">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="text-center py-8">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#EC5F34]"></div>
                    </div>
                  </td>
                </tr>
              ) : filteredUsers.length > 0 ? (
                filteredUsers.map((user: AdminUser) => (
                  <tr
                    key={user.id}
                    className="border-t border-gray-100 text-sm"
                  >
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        className="w-5 h-5 ring-1 ring-gray-200 appearance-none rounded-md text-blue-500"
                      />
                    </td>
                    <td className="py-3 px-4">#{user.id}</td>
                    <td className="py-3 px-4 flex items-center gap-2">
                      <div className="bg-red-100 text-red-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold">
                        {user.first_name.charAt(0)}
                      </div>
                      <span>{`${user.first_name} ${user.last_name}`}</span>
                    </td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs">
                        {user.admin_roles}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleViewUser(user as any)}
                        className="px-3 py-1 text-xs border border-gray-200 rounded hover:bg-gray-50"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    No admin users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredUsers.length > 0 && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />
        )}
      </div>
      {showCreateModal && (
        <CreateAdminModal onClose={() => setShowCreateModal(false)} />
      )}
      {showRoleModal && (
        <CreateRoleModal onClose={() => setShowRoleModal(false)} />
      )}
    </div>
  );
};

export default UserTable;
