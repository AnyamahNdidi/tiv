"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";

import OverviewPropertyTable from "./OverviewPropertyTable";
import { StatusBadge } from "@/components/StatusBadge";
import PaginationControls from "@/components/PaginationControl";
import { LandlordDetailsType } from "@/app/admin/AdminVerification/LandlordVerification/landlordDataType";
import {
  PropertyDetailsType,
  TenantDetailsType,
} from "../OverviewTypes/OverviewTenantTypes";
import { useGetTenantsQuery } from "@/lib/redux/api/overviewApi";

const ITEMS_PER_PAGE = 6;

type Props = {
  landlord: LandlordDetailsType; // 👈 add this
  setSelectedTenant: (
    tenant: TenantDetailsType,
    landlord?: LandlordDetailsType
  ) => void;
  setSelectedProperty: (
    property: PropertyDetailsType | null,
    landlord?: LandlordDetailsType
  ) => void;
  selectedProperty: PropertyDetailsType | null;
};

export default function OverviewTenantTable({
  landlord,
  setSelectedTenant,
  setSelectedProperty,
  selectedProperty,
}: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<"tenants" | "properties">(
    "tenants"
  );
  console.log("landlord", landlord);
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);

  const landlordData: LandlordDetailsType[] = [landlord];

  const allTenants: {
    tenant: TenantDetailsType;
  }[] = (landlord?.tenant_list?.data || []).map((tenant: any) => ({
    tenant: {
      propertyName: tenant.property,
      first_name: tenant.full_name.split(" ")[0],
      last_name: tenant.full_name.split(" ").slice(1).join(" "),
      phoneNumber: tenant.phone,
      email: tenant.email,
      occupancyDate: tenant.occupancy_date,
      renewalDate: tenant.renewal_date,
      status: tenant.status || "Active",
      address: tenant.address,
    },
  }));

  const allProperties: {
    property: PropertyDetailsType;
    landlord: LandlordDetailsType;
  }[] = (landlord?.property_list?.data || []).map((property: any) => ({
    property: {
      propertyName: property.property_name,
      propertyType: property.property_type,
      location: property.location,
      numberOfRooms: property.number_of_rooms,
      dateAdded: property.date_added,
      propertyDescription: "",
      occupants: [],
    },
    landlord,
  }));

  const filteredTenants = (allTenants || []).filter((item) => {
    if (!item || !item.tenant) return false;

    const query = searchQuery.toLowerCase();
    return (
      item.tenant.first_name?.toLowerCase().includes(query) ||
      item.tenant.last_name?.toLowerCase().includes(query)
    );
  });

  const filteredProperties = (allProperties || []).filter((item) => {
    if (!item || !item.property) return false;

    const query = searchQuery.toLowerCase();
    const occupantMatch = item.property.occupants?.some((occupant) =>
      occupant?.fullName?.toLowerCase().includes(query)
    );

    return (
      item.property.propertyName?.toLowerCase().includes(query) ||
      item.property.propertyDescription?.toLowerCase().includes(query) ||
      item.property.location?.toLowerCase().includes(query) ||
      occupantMatch
    );
  });

  const paginatedTenants = filteredTenants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages =
    activeTab === "tenants"
      ? Math.ceil(filteredTenants.length / itemsPerPage)
      : Math.ceil(filteredProperties.length / itemsPerPage);

  return (
    <div className="p-3 bg-white shadow w-full overflow-x-auto rounded-lg">
      {/* Tabs and Search */}
      <div className="mb-8 flex flex-wrap justify-between gap-4">
        {/* Tabs */}
        <div className="flex w-full sm:w-[200px] rounded-md overflow-hidden text-sm font-semibold">
          <button
            onClick={() => {
              setActiveTab("tenants");
              setCurrentPage(1);
            }}
            className={`w-1/2 py-2 ${
              activeTab === "tenants"
                ? "bg-[#EC5F34] text-white"
                : "bg-white text-gray-500"
            }`}
          >
            Tenants
          </button>
          <button
            onClick={() => {
              setActiveTab("properties");
              setCurrentPage(1);
            }}
            className={`w-1/2 py-2 ${
              activeTab === "properties"
                ? "bg-[#EC5F34] text-white"
                : "bg-white text-gray-500"
            }`}
          >
            Properties
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-[400px] max-w-md">
          <Icon
            icon="eva:search-outline"
            className="absolute top-3 left-3 text-gray-700 text-lg"
          />
          <input
            type="text"
            placeholder={
              activeTab === "tenants" ? "Search Tenants" : "Search Properties"
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full text-gray-500 rounded-lg bg-white shadow"
          />
        </div>
      </div>

      {/* Data Table */}
      {activeTab === "tenants" ? (
        <div className="bg-white shadow rounded-lg overflow-hidden p-2">
          <div className="w-full overflow-x-auto">
            <table className="min-w-[800px] w-full text-left text-[13px]">
              <thead>
                <tr className="bg-gray-100 text-gray-600 ">
                  <th className="py-3 px-4">Property Occupied</th>
                  <th className="py-3 px-4">Full Name</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Occupancy Date</th>
                  <th className="py-3 px-4">Renewal Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTenants.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="text-center text-gray-500 py-10 text-sm"
                    >
                      No Tenants found.
                    </td>
                  </tr>
                ) : (
                  paginatedTenants.map(({ tenant }, index) => (
                    <tr
                      key={index}
                      className="border-t border-gray-100 hover:bg-gray-50 text-[12px]"
                    >
                      <td className="py-3 px-4">{tenant.propertyName}</td>
                      <td className="py-3 px-4">
                        {tenant.first_name} {tenant.last_name}
                      </td>
                      <td className="py-3 px-4">{tenant.phoneNumber}</td>
                      <td className="py-3 px-4">{tenant.email}</td>
                      <td className="py-3 px-4">{tenant.occupancyDate}</td>
                      <td className="py-3 px-4">{tenant.renewalDate}</td>
                      <td className="py-3 px-4">
                        <StatusBadge status={tenant.status} />
                      </td>
                      <td
                        className="py-3 px-4 cursor-pointer"
                        onClick={() => setSelectedTenant(tenant, landlord)}
                      >
                        <StatusBadge status="View" />
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
      ) : (
        <OverviewPropertyTable
          selectedProperty={selectedProperty}
          setSelectedProperty={(property) => {
            if (!property) return;
            const match = allProperties.find(
              (p) => p.property.propertyName === property.propertyName
            );
            if (match) {
              setSelectedProperty(property, match.landlord);
            }
          }}
          filteredProperties={paginatedProperties.map(
            ({ property }) => property
          )}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          setItemsPerPage={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      )}
    </div>
  );
}
