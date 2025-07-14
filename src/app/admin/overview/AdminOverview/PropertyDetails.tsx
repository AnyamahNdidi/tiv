"use client";
import React, { useState } from "react";

import { Icon } from "@iconify/react";
import EditPropertyModal from "./OverviewModals/EditPropertyModal";
import DeactivateModal from "./OverviewModals/DeactivateModal";
import { StatusBadge } from "@/components/StatusBadge";
// import { PropertyDetailsType } from "./OverviewTypes/OverviewTenantTypes";
import { LandlordDetailsType } from "../../AdminVerification/LandlordVerification/landlordDataType";

export type OccupantType = {
  id: number;
  full_name: string;
  contact: string;
  email: string;
  occupancy_date: string;
  renewal_date: string;
  status: string;
};

export type PropertyDetailsType = {
  property: {
    id: number;
    property_name: string;
    property_type: string;
    address: string;
    number_of_flats: number;
    number_of_rooms: number;
    date_added: string;
  };
  occupants: {
    data: OccupantType[];
    page: number;
    page_size: number;
    total_count: number;
  };
};
interface PropertyDetailsProps {
  property: PropertyDetailsType;
  landlord?: LandlordDetailsType | null;
  onClose: () => void;
}

const ITEMS_PER_PAGE = 6;

const PropertyDetails: React.FC<PropertyDetailsProps> = ({
  property,
  onClose,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);

  console.log("props", property);
  const propertyData = property.property;
  const occupants = property.occupants || [];
  const totalPages = Math.ceil(occupants?.data?.length / ITEMS_PER_PAGE);

  const paginatedOccupants = occupants?.data?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="min-h-screen p-6 relative">
      {/* Modals */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <EditPropertyModal onClose={() => setShowEditModal(false)} />
        </div>
      )}

      {showDeactivateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <DeactivateModal onClose={() => setShowDeactivateModal(false)} />
        </div>
      )}

      <div
        className={`max-w-5xl mx-auto space-y-6 duration-300 ${
          showEditModal ? "pointer-events-none opacity-50" : ""
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-start">
          <button
            onClick={onClose}
            aria-label="Go back"
            className="text-md text-gray-600 mt-1 font-bold cursor-pointer"
          >
            ←
          </button>

          <div className="flex-1 ml-4">
            <div className="flex items-center space-x-2">
              <h2 className="text-xl font-semibold text-gray-900">
                {propertyData?.property_name}
              </h2>
              <span className="bg-green-100 text-green-600 text-xs font-medium px-2.5 py-0.5 rounded">
                {propertyData?.property_type}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Created at{" "}
              {new Date(propertyData?.date_added).toLocaleDateString()}
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              className="border border-gray-200 bg-white text-sm px-4 py-2 hover:bg-gray-200 cursor-pointer rounded-lg"
              onClick={() => setShowEditModal(true)}
            >
              Edit details
            </button>

            <button
              className="bg-red-700 text-white text-sm px-4 py-2 cursor-pointer rounded-lg hover:bg-red-600"
              onClick={() => setShowDeactivateModal(true)}
            >
              Delete property
            </button>
          </div>
        </div>

        {/* Property Details */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-base font-medium text-gray-900 mb-4">
            Property information
          </h3>
          <hr className="w-full border-t border-gray-100 my-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10 text-sm">
            <div>
              <p className="text-gray-500">Property name</p>
              <p className="font-medium text-gray-900 break-words">
                {propertyData?.property_name}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Property type</p>
              <p className="font-medium text-gray-900 break-words">
                {propertyData?.property_type}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Number of Rooms</p>
              <p className="font-medium text-gray-900 break-words">
                {propertyData?.number_of_rooms}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Property Location</p>
              <p className="font-medium text-gray-900 break-words">
                {propertyData?.address}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Date Added</p>
              <p className="font-medium text-gray-900 break-words">
                {new Date(propertyData?.date_added).toLocaleDateString()}
              </p>
            </div>

            {/* <div>
              <p className="text-gray-500">Maintenance</p>
              <p className="font-medium text-gray-900 break-words">
                {property.maintenance || "None"}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Lease Terms</p>
              <p className="font-medium text-gray-900 break-words">
                {property.leaseTerms}
              </p>
            </div>
            <div>
              <p className="text-gray-500">Property Location</p>
              <p className="font-medium text-gray-900 break-words">
                {property.location}
              </p>
            </div> */}
            {/* <div>
              <p className="text-gray-500">Security features</p>
              <p className="font-medium text-gray-900 break-words">
                {property.securityFeatures}
              </p>
            </div> */}
          </div>

          {/* <div className="space-y-3 bg-gray-100 w-full p-2 rounded-xl text-sm mt-6">
            <p className="font-semibold">Property description</p>
            <p className="text-gray-600">{property.propertyDescription}</p>
          </div> */}
        </div>

        {/* Occupants Table */}
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h3 className="text-base font-medium text-gray-900 mb-4">
            Occupants
          </h3>

          <div className="overflow-x-auto rounded-xl border border-gray-100 p-1 w-full">
            {occupants?.data?.length === 0 ? (
              <p className="text-center text-gray-500 text-sm py-6">
                No tenants have been added to this property yet.
              </p>
            ) : (
              <>
                <table className="w-full text-left p-2" role="table">
                  <thead>
                    <tr className="bg-gray-100 text-gray-600 text-sm">
                      <th className="py-3 px-4 rounded-tl-lg rounded-bl-lg">
                        Full name
                      </th>
                      <th className="py-3 px-4">Occupancy date</th>
                      <th className="py-3 px-4">Renewal date</th>
                      <th className="py-3 px-4 rounded-tr-lg rounded-br-lg"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedOccupants?.map((record, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-100 text-sm"
                      >
                        <td className="py-5 px-4 text-gray-700">
                          {record?.full_name}
                        </td>
                        <td className="py-3 px-4 text-gray-700">
                          {record?.occupancy_date}
                        </td>
                        <td className="py-3 px-4 text-gray-700">
                          {record?.renewal_date}
                        </td>
                        <td>
                          <StatusBadge status="View profile" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination */}
                <div className="flex flex-wrap justify-between items-center mt-4 mb-4 text-gray-600 text-sm">
                  <div className="flex items-center gap-4">
                    <select
                      className="border border-gray-100 p-2 rounded-md w-14 h-9"
                      disabled
                    >
                      <option>6</option>
                    </select>
                    per page
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      className={`hover:bg-red-100 p-2 rounded-md ${
                        currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                      aria-label="Previous page"
                    >
                      <Icon icon="akar-icons:chevron-left" />
                    </button>
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-md">
                      {currentPage}
                    </span>
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className={`hover:bg-red-100 p-2 rounded-md ${
                        currentPage === totalPages
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                      aria-label="Next page"
                    >
                      <Icon icon="akar-icons:chevron-right" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
