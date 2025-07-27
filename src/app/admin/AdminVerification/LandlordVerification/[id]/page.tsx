"use client";

import React, { useState, useEffect, use } from "react";

import { StatusBadge } from "@/components/StatusBadge";
import {
  LandlordDetailsType,
  PropertyDetailsType,
  TenantDetailsType,
} from "../landlordDataType";
import EditProfileModal from "../../VerificationModals/EditProfileModal";
import {
  ITEMS_PER_PAGE,
  verificationColumns,
} from "@/config/LandlordProfileVerificationTableConfig";
import { landlordDetails } from "../landlordData";
import TenantDetails from "@/app/admin/overview/AdminOverview/TenantDetails";
import PropertyDetails from "@/app/admin/overview/AdminOverview/PropertyDetails";
import ModalWrapper from "@/components/ModalWrapper";
import DeactivateModal from "../../VerificationModals/DeactivateModal";
import StatCard from "../StatCards";
import DetailsSection from "../DetailsSection";
import OverviewTenantTable from "@/app/admin/overview/AdminOverview/OverviewTables/OverviewTenantTable";
import TableSection from "../TableSection";
import { paginate } from "@/utils/paginate";
import { useGetUserVerificationSummaryQuery } from "@/lib/redux/api/verificationApi";

interface Props {
  landlord: LandlordDetailsType;
  onBack: () => void;
  params: {
    id: string; // Changed from Promise<{id: any}> to just the id
  };
}

export default function LandlordProfile({ landlord, onBack, params }: Props) {
  const { id } = params;

  const {
    data: verificationSummary,
    isLoading,
    error,
  } = useGetUserVerificationSummaryQuery(id);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);
  const [requestPage, setRequestPage] = useState(1);

  const [selectedTenant, setSelectedTenant] =
    useState<TenantDetailsType | null>(null);
  const [selectedProperty, setSelectedProperty] =
    useState<PropertyDetailsType | null>(null);
  const [selectedTenantLandlord, setSelectedTenantLandlord] =
    useState<LandlordDetailsType | null>(null);
  const [selectedPropertyLandlord, setSelectedPropertyLandlord] =
    useState<LandlordDetailsType | null>(null);

  useEffect(() => {
    setRequestPage(1);
  }, [itemsPerPage, showEditModal, showDeactivateModal]);

  useEffect(() => {
    const total = Math.ceil(
      landlord?.verificationRequests.length / itemsPerPage
    );
    if (requestPage > total) setRequestPage(1);
  }, [itemsPerPage, landlord, requestPage]);

  const landlordData = landlordDetails[0];

  if (selectedTenant) {
    return (
      <TenantDetails
        tenant={selectedTenant as any}
        landlord={selectedTenantLandlord}
        onClose={() => {
          setSelectedTenant(null);
          setSelectedTenantLandlord(null);
        }}
      />
    );
  }

  if (selectedProperty) {
    return (
      <PropertyDetails
        property={selectedProperty as any}
        landlord={selectedPropertyLandlord}
        onClose={() => {
          setSelectedProperty(null);
          setSelectedPropertyLandlord(null);
        }}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#EC5F34]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500">Error loading verification details</div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 min-h-screen max-w-screen">
      {/* {showEditModal && (
        <ModalWrapper onClose={() => setShowEditModal(false)}>
          <EditProfileModal onClose={() => setShowEditModal(false)} />
        </ModalWrapper>
      )}
      {showDeactivateModal && (
        <ModalWrapper onClose={() => setShowDeactivateModal(false)}>
          <DeactivateModal onClose={() => setShowDeactivateModal(false)} />
        </ModalWrapper>
      )} */}

      <div
        className={`space-y-6 max-w-6xl mx-auto ${
          showEditModal || showDeactivateModal
            ? "opacity-50 pointer-events-none"
            : ""
        }`}
      >
        <div className="flex flex-wrap justify-between items-start gap-4">
          <button
            onClick={onBack}
            className="text-sm sm:text-md text-gray-600 font-semibold"
            aria-label="Go back"
          >
            ←
          </button>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                {verificationSummary?.user_info?.first_name}{" "}
                {verificationSummary?.user_info?.last_name}
              </h2>
              <span className=" text-xs font-medium px-2.5 py-0.5 rounded-full">
                <StatusBadge
                  status={verificationSummary?.user_info?.active_user}
                />
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Created at{" "}
              {new Date(
                verificationSummary?.user_info?.createdAt
              ).toLocaleDateString()}
            </p>
          </div>
          {/* <div className="flex flex-wrap gap-2">
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
          </div> */}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <StatCard
            title="Tenant verifications sent"
            value={
              verificationSummary?.summary?.total_verifications_logged || 0
            }
          />
          <StatCard
            title="Total properties added"
            value={verificationSummary?.summary?.total_property_added || 0}
          />
          <StatCard
            title="Total tenants added"
            value={verificationSummary?.summary?.total_tenant_added || 0}
          />
        </div>

        <DetailsSection landlord={verificationSummary?.user_info} />

        <OverviewTenantTable
          setSelectedTenant={(tenant, lnd) => {
            setSelectedTenant(tenant as any);
            setSelectedTenantLandlord(lnd || null);
          }}
          setSelectedProperty={(property, lnd) => {
            setSelectedProperty(property);
            setSelectedPropertyLandlord(lnd || null);
          }}
          selectedProperty={selectedProperty}
          landlord={verificationSummary}
        />

        <TableSection
          title="Verification Requests"
          columns={verificationColumns as any}
          data={paginate(
            verificationSummary?.verification_list.data,
            requestPage,
            itemsPerPage
          )}
          currentPage={requestPage}
          totalPages={Math?.max(
            1,
            Math.ceil(landlord?.verificationRequests.length / itemsPerPage)
          )}
          setCurrentPage={setRequestPage}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />
      </div>
    </div>
  );
}
