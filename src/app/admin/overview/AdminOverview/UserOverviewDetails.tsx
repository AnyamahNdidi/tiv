import React, { useState } from "react";
import { StatusBadge } from "@/components/StatusBadge";

import ModalWrapper from "@/components/ModalWrapper";
import StatCard from "../../AdminVerification/LandlordVerification/StatCards";
import TableSection from "../../AdminVerification/LandlordVerification/TableSection";
import { ITEMS_PER_PAGE } from "@/config/LandlordProfileVerificationTableConfig";
import EditProfileModal from "./OverviewModals/EditProfileModal";
import DeactivateModal from "./OverviewModals/DeactivateModal";
import { paginate } from "@/utils/paginate";
import OverviewTenantTable from "./OverviewTables/OverviewTenantTable";
import { verificationColumns } from "@/config/LandlordProfileVerificationTableConfig";
import { TenantDetailsType } from "./OverviewTypes/OverviewTenantTypes";
import { PropertyDetailsType } from "./PropertyDetails";
import { Icon } from "@iconify/react";
import VerifyUserModal from "./VerifyUserModal";
import VerifyBVNModal from "./VerifyBVNModal";
import BlockUserModal from "./BlockUserModal";

interface UserDetailsProps {
  user: {
    user_info: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      phone: number;
      total_available_token: number;
      total_verification_done: number;
      active_user: string;
      Wallet_balance: number;
    };
    summary: {
      total_property_added: number;
      total_tenant_added: number;
      total_verifications_logged: number;
    };
    property_list: {
      data: any[];
    };
    tenant_list: {
      data: any[];
    };
    verification_list: {
      data: any[];
    };
  };
  onClose: () => void;
  userId: number;
}

const UserOverviewDetails: React.FC<UserDetailsProps> = ({
  user,
  onClose,
  userId,
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTenant, setSelectedTenant] =
    useState<TenantDetailsType | null>(null);
  const [selectedProperty, setSelectedProperty] =
    useState<PropertyDetailsType | null>(null);

  const [showVerifyUserModal, setShowVerifyUserModal] = useState(false);
  const [showVerifyBVNModal, setShowVerifyBVNModal] = useState(false);
  const [showBlockUserModal, setShowBlockUserModal] = useState(false);

  console.log("o boy", user);

  return (
    <div className="p-4 sm:p-6 space-y-6 min-h-screen max-w-screen">
      {showEditModal && (
        <ModalWrapper onClose={() => setShowEditModal(false)}>
          <EditProfileModal onClose={() => setShowEditModal(false)} />
        </ModalWrapper>
      )}
      {showDeactivateModal && (
        <ModalWrapper onClose={() => setShowDeactivateModal(false)}>
          <DeactivateModal onClose={() => setShowDeactivateModal(false)} />
        </ModalWrapper>
      )}
      {showVerifyUserModal && (
        <ModalWrapper onClose={() => setShowVerifyUserModal(false)}>
          <VerifyUserModal
            onClose={() => setShowVerifyUserModal(false)}
            userId={userId}
          />
        </ModalWrapper>
      )}
      {showVerifyBVNModal && (
        <ModalWrapper onClose={() => setShowVerifyBVNModal(false)}>
          <VerifyBVNModal
            onClose={() => setShowVerifyBVNModal(false)}
            userId={userId}
          />
        </ModalWrapper>
      )}
      {showBlockUserModal && (
        <ModalWrapper onClose={() => setShowBlockUserModal(false)}>
          <BlockUserModal
            onClose={() => setShowBlockUserModal(false)}
            userId={userId}
          />
        </ModalWrapper>
      )}

      <div
        className={`space-y-6 max-w-6xl mx-auto ${
          showEditModal || showDeactivateModal
            ? "opacity-50 pointer-events-none"
            : ""
        }`}
      >
        <div className="flex flex-wrap justify-between items-start gap-4">
          <button
            onClick={onClose}
            className="text-sm sm:text-md text-gray-600 font-semibold"
            aria-label="Go back"
          >
            ←
          </button>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                {user.user_info.first_name} {user.user_info.last_name}
              </h2>
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full">
                <StatusBadge status={user.user_info.active_user} />
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowEditModal(true)}
              className="border border-gray-300 bg-white text-sm px-3 py-1.5 hover:bg-gray-100 rounded-lg"
            >
              Edit profile
            </button>
            <button
              onClick={() => setShowDeactivateModal(true)}
              className="bg-red-700 text-white text-sm px-3 py-1.5 rounded-lg hover:bg-red-600"
            >
              Deactivate
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            title="Available Tokens"
            value={user.user_info.total_available_token}
          />
          <StatCard
            title="Wallet Balance"
            value={`₦${user.user_info.Wallet_balance}`}
          />
          <StatCard
            title="Total Properties"
            value={user.summary.total_property_added}
          />
          <StatCard
            title="Total Tenants"
            value={user.summary.total_tenant_added}
          />
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          <h3 className="text-base font-medium text-gray-900 mb-4">
            User Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <p className="text-gray-500">Full Name</p>
                <p className="font-medium">
                  {user.user_info.first_name} {user.user_info.last_name}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Email</p>
                <p className="font-medium">{user.user_info.email}</p>
              </div>
              <div>
                <p className="text-gray-500">Phone Number</p>
                <p className="font-medium">{user.user_info.phone}</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-gray-500">Verifications Done</p>
                <p className="font-medium">
                  {user.user_info.total_verification_done}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Verifications Logged</p>
                <p className="font-medium">
                  {user.summary.total_verifications_logged}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Status</p>
                <p className="font-medium">
                  <StatusBadge status={user.user_info.active_user} />
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
          <h3 className="text-base font-medium text-gray-900 mb-4">
            User Actions
          </h3>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setShowVerifyUserModal(true)}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <Icon icon="mdi:check-circle" className="w-5 h-5" />
              Verify User
            </button>
            <button
              onClick={() => setShowVerifyBVNModal(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Icon icon="mdi:id-card" className="w-5 h-5" />
              Verify BVN
            </button>
            <button
              onClick={() => setShowBlockUserModal(true)}
              className="flex items-center gap-2 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
            >
              <Icon icon="mdi:block-helper" className="w-5 h-5" />
              Block User
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <OverviewTenantTable
            setSelectedTenant={(tenant) => {
              setSelectedTenant(tenant as any);
            }}
            setSelectedProperty={(property) => {
              setSelectedProperty(property as any);
            }}
            selectedProperty={selectedProperty as any}
            landlord={user as any}
          />

          <TableSection
            title="Verification Requests"
            columns={[
              { label: "Full Name", key: "full_name" },
              { label: "Email", key: "email" },
              { label: "Phone", key: "phone" },
              { label: "Date", key: "date" },
              { label: "Status", key: "status" },
              { label: "Address", key: "address" },
            ]}
            data={user.verification_list.data.map((item: any) => ({
              full_name:
                item.full_name || `${item.first_name} ${item.last_name}`,
              email: item.email,
              phone: item.phone,
              date: item.created_at || item.date,
              status: item.status,
              address: item.address,
            }))}
            currentPage={currentPage}
            totalPages={Math.ceil(
              user.verification_list.data.length / itemsPerPage
            )}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />
        </div>
      </div>
    </div>
  );
};

export default UserOverviewDetails;
