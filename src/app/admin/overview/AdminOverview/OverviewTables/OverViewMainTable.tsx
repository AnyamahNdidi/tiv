"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useGetTenantsQuery } from "@/lib/redux/api/overviewApi";
import { StatusBadge } from "@/components/StatusBadge";
import PaginationControls from "@/components/PaginationControl";
import {
  PropertyDetailsType,
  TenantDetailsType,
} from "../OverviewTypes/OverviewTenantTypes";

const ITEMS_PER_PAGE = 6;

type TenantType = {
  id: number;
  property: string;
  full_name: string;
  contact: string;
  email: string;
  occupancy_date: string;
  renewal_date: string;
  status: string;
};

type PropertyType = {
  id: number;
  property_name: string;
  property_type: string;
  property_location: string;
  occupants: number;
  date_added: string;
};

type Props = {
  setSelectedTenant: (tenant: any) => void;
  setSelectedProperty: (property: any | null) => void;
  selectedProperty: PropertyDetailsType | null;
};

export default function OverviewMainTable({
  setSelectedTenant,
  setSelectedProperty,
  selectedProperty,
}: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<"tenants" | "properties">(
    "tenants"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);

  const { data, isLoading } = useGetTenantsQuery({});

  const filteredTenants = (data?.tenants?.data || []).filter(
    (tenant: TenantType) => {
      const query = searchQuery.toLowerCase();
      return (
        tenant.full_name.toLowerCase().includes(query) ||
        tenant.property.toLowerCase().includes(query) ||
        tenant.email.toLowerCase().includes(query)
      );
    }
  );

  const filteredProperties = (data?.properties?.data || []).filter(
    (property: PropertyType) => {
      const query = searchQuery.toLowerCase();
      return (
        property.property_name.toLowerCase().includes(query) ||
        property.property_type.toLowerCase().includes(query) ||
        property.property_location.toLowerCase().includes(query)
      );
    }
  );

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-3 bg-white shadow w-full overflow-x-auto rounded-lg">
      {/* Tabs and Search */}
      <div className="mb-8 flex flex-wrap justify-between gap-4">
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
            Tenants ({data?.total_tenants || 0})
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
            Properties ({data?.total_properties || 0})
          </button>
        </div>

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

      {/* Data Tables */}
      {activeTab === "tenants" ? (
        <div className="bg-white shadow rounded-lg overflow-hidden p-2">
          <div className="w-full overflow-x-auto">
            <table className="min-w-[800px] w-full text-left text-[13px]">
              <thead>
                <tr className="bg-gray-100 text-gray-600">
                  <th className="py-3 px-4">Property</th>
                  <th className="py-3 px-4">Full Name</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Occupancy Date</th>
                  <th className="py-3 px-4">Renewal Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTenants.map((tenant: TenantType) => (
                  <tr
                    key={tenant.id}
                    className="border-t border-gray-100 hover:bg-gray-50 text-[12px]"
                  >
                    <td className="py-3 px-4">{tenant.property}</td>
                    <td className="py-3 px-4">{tenant.full_name}</td>
                    <td className="py-3 px-4">{tenant.contact}</td>
                    <td className="py-3 px-4">{tenant.email}</td>
                    <td className="py-3 px-4">{tenant.occupancy_date}</td>
                    <td className="py-3 px-4">{tenant.renewal_date}</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={tenant.status} />
                    </td>
                    <td
                      className="py-3 px-4 cursor-pointer"
                      onClick={() =>
                        setSelectedTenant({
                          id: tenant.id as any,
                          propertyName: tenant.property,
                          first_name: tenant.full_name.split(" ")[0],
                          last_name: tenant.full_name
                            .split(" ")
                            .slice(1)
                            .join(" "),
                          phoneNumber: tenant.contact,
                          email: tenant.email,
                          occupancyDate: tenant.occupancy_date,
                          renewalDate: tenant.renewal_date,
                          status: tenant.status,
                        })
                      }
                    >
                      <StatusBadge status="View" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-hidden p-2">
          <div className="w-full overflow-x-auto">
            <table className="min-w-[800px] w-full text-left text-[13px]">
              <thead>
                <tr className="bg-gray-100 text-gray-600">
                  <th className="py-3 px-4">Property Name</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Occupants</th>
                  <th className="py-3 px-4">Date Added</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProperties.map((property: PropertyType) => (
                  <tr
                    key={property.id}
                    className="border-t border-gray-100 hover:bg-gray-50 text-[12px]"
                  >
                    <td className="py-3 px-4">{property.property_name}</td>
                    <td className="py-3 px-4">{property.property_type}</td>
                    <td className="py-3 px-4">{property.property_location}</td>
                    <td className="py-3 px-4">{property.occupants}</td>
                    <td className="py-3 px-4">
                      {new Date(property.date_added).toLocaleDateString()}
                    </td>
                    <td
                      className="py-3 px-4 cursor-pointer"
                      onClick={() =>
                        setSelectedProperty({
                          id: property.id,
                          propertyName: property.property_name,
                          propertyType: property.property_type,
                          location: property.property_location,
                          occupants: property.occupants,
                          dateAdded: property.date_added,
                          propertyDescription: "",
                        })
                      }
                    >
                      <StatusBadge status="View" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
      />
    </div>
  );
}
