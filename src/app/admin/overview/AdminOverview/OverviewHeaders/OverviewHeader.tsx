"use client";
import React, { useState } from "react";
import OverviewRevenueChart from "../OverviewCharts/OverviewRevenueChart";
import OverviewRevenueTable from "../OverviewTables/OverviewRevenueTable";
import OverviewTenantChart from "../OverviewCharts/OverviewTenantChart";
import OverviewTenantTable from "../OverviewTables/OverviewTenantTable";
import OverviewInspectionChart from "../OverviewCharts/OverviewInspectionChart";
import OverviewInspectionTable from "../OverviewTables/OverviewInspectionTable";
// import OverviewOperationsChart from "../OverviewCharts/OverviewOperationsChart";
// import OverviewOperationsTable from "../OverviewTables/OverviewOperationsTable";
// import OverviewUserChart from "../OverviewCharts/OverviewUserChart";
// import OverviewUserTable from "../OverviewTables/OverviewUserTable";
import { useGetUserDetailsQuery } from "@/lib/redux/api/overviewApi";
import TenantDetails from "../TenantDetails";
import PropertyDetails from "../PropertyDetails";
import {
  TenantDetailsType,
  PropertyDetailsType,
} from "../../../AdminVerification/LandlordVerification/landlordDataType";
import { landlordDetails } from "../../../AdminVerification/LandlordVerification/landlordData";
import DateRangeSelector from "@/components/DateRangeSelector"; // update the path as needed
import OverviewMainTable from "../OverviewTables/OverViewMainTable";
import {
  useGetTenantByIdQuery,
  useGetPropertyByIdQuery,
} from "@/lib/redux/api/overviewApi";
import {
  useGetInspectionOverviewQuery,
  useGetUserOverviewQuery,
  useGetInspectionDetailsQuery,
} from "@/lib/redux/api/overviewApi";
import TenantOverViewDetails from "../TenantOverViewDetails";
import OverviewUserChart from "../OverviewCharts/OverviewUserChart";
import OverviewUserTable from "../OverviewTables/OverviewUserTable";
import UserOverviewDetails from "../UserOverviewDetails";
import InspectionDetails from "../InspectionDetails";

const TABS = {
  REVENUE: "Revenue",
  TENANT: "Tenant Management",
  INSPECTION: "Inspection",
  // OPERATIONS: "Operations",
  USERS: "Users",
};

const OverviewHeader = () => {
  const [filters, setFilters] = useState(() => {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);

    return {
      search: "",
      date_from: sevenDaysAgo.toISOString().split("T")[0],
      date_to: today.toISOString().split("T")[0],
      page: 1,
      page_size: 6,
      search_by_day: 0,
    };
  });

  const [activeTab, setActiveTab] = useState<string>(TABS.REVENUE);
  const [, setStartDate] = useState("");
  const [, setEndDate] = useState("");
  const [selectedTenant, setSelectedTenant] =
    useState<TenantDetailsType | null>(null);
  const [selectedProperty, setSelectedProperty] =
    useState<PropertyDetailsType | null>(null);
  const [selectedTenantId, setSelectedTenantId] = useState<number | null>(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(
    null
  );
  const { data: inspectionData, isLoading: inspectionLoading } =
    useGetInspectionOverviewQuery(filters);
  const { data: userOverView, isLoading: userLoading } =
    useGetUserOverviewQuery({});

  const landlordData = landlordDetails[0];
  const { data: tenantData, isLoading: tenantLoading } = useGetTenantByIdQuery(
    selectedTenantId,
    { skip: !selectedTenantId }
  );

  const { data: propertyData, isLoading: propertyLoading } =
    useGetPropertyByIdQuery(selectedPropertyId, { skip: !selectedPropertyId });
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const { data: userDetailsData, isLoading: userDetailsLoading } =
    useGetUserDetailsQuery(selectedUserId, { skip: !selectedUserId });
  const [selectedInspectionId, setSelectedInspectionId] = useState<
    number | null
  >(null);
  const { data: inspectionDetails, isLoading: inspectionDetailsLoading } =
    useGetInspectionDetailsQuery(selectedInspectionId, {
      skip: !selectedInspectionId,
    });

  const handleDateChange = (start: string, end: string) => {
    setFilters((prev) => ({
      ...prev,
      date_from: start,
      date_to: end,
      page: 1, // Reset to first page when dates change
    }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case TABS.REVENUE:
        return (
          <>
            <OverviewRevenueChart />
            <OverviewRevenueTable />
          </>
        );
      case TABS.TENANT:
        if (selectedTenantId) {
          if (tenantLoading) return <div>Loading tenant details...</div>;
          return (
            <TenantOverViewDetails
              tenant={tenantData}
              onClose={() => {
                setSelectedTenantId(null);
                setSelectedTenant(null);
              }}
            />
          );
        }

        if (selectedPropertyId) {
          if (propertyLoading) return <div>Loading property details...</div>;
          return (
            <PropertyDetails
              property={propertyData}
              onClose={() => {
                setSelectedPropertyId(null);
                setSelectedProperty(null);
              }}
            />
          );
        }

        return (
          <>
            <OverviewTenantChart />
            <OverviewMainTable
              setSelectedTenant={(tenant) => {
                setSelectedTenantId(tenant.id);
                setSelectedTenant(tenant);
              }}
              setSelectedProperty={(property) => {
                if (property) {
                  setSelectedPropertyId(property.id);
                  setSelectedProperty(property);
                }
              }}
              selectedProperty={selectedProperty}
            />
            {/* <OverviewTenantTable
              setSelectedTenant={setSelectedTenant as any}
              setSelectedProperty={setSelectedProperty}
              selectedProperty={null}
              landlord={landlordData}
            /> */}
          </>
        );
      case TABS.INSPECTION:
        if (inspectionLoading) return <div>Loading inspection data...</div>;

        if (selectedInspectionId) {
          if (inspectionDetailsLoading)
            return <div>Loading inspection details...</div>;
          if (!inspectionDetails) return null;

          return (
            <InspectionDetails
              inspection={inspectionDetails}
              onClose={() => setSelectedInspectionId(null)}
            />
          );
        }

        return (
          <>
            <OverviewInspectionChart data={inspectionData} />
            <OverviewInspectionTable
              inspections={inspectionData?.inspections}
              onViewDetails={(inspectionId) =>
                setSelectedInspectionId(inspectionId)
              }
              filters={filters}
              setFilters={setFilters}
            />
          </>
        );
      // case TABS.OPERATIONS:
      //   return (
      //     <>
      //       <OverviewOperationsChart />
      //       <OverviewOperationsTable />
      //     </>
      //   );
      case TABS.USERS:
        if (selectedUserId) {
          if (userDetailsLoading) return <div>Loading user details...</div>;
          return (
            <UserOverviewDetails
              user={userDetailsData}
              onClose={() => setSelectedUserId(null)}
              userId={selectedUserId}
            />
          );
        }
        return (
          <>
            <OverviewUserChart data={userOverView} />
            <OverviewUserTable
              usersOverView={userOverView?.users}
              onViewDetails={(userId) => setSelectedUserId(userId)}
            />
          </>
        );
      default:
        return null;
    }
  };

  const showHeader = !(
    (activeTab === TABS.TENANT && (selectedTenant || selectedProperty)) ||
    (activeTab === TABS.USERS && selectedUserId) ||
    (activeTab === TABS.INSPECTION && selectedInspectionId)
  );

  return (
    <div className="w-full">
      <div className="max-w-screen w-full">
        {/* Header Section */}
        {showHeader && (
          <div className="bg-white shadow-sm flex flex-col">
            <div className="space-y-6 px-4 py-6 md:px-8">
              <h1 className="font-semibold text-[24px] md:text-[28px]">
                Overview
              </h1>

              {/* Tabs Navigation */}
              <div className="flex flex-wrap gap-4">
                {Object.values(TABS).map((tab) => (
                  <button
                    key={tab}
                    role="tab"
                    aria-selected={activeTab === tab}
                    aria-controls={`${tab
                      .toLowerCase()
                      .replace(/\s/g, "-")}-panel`}
                    className={`py-2 text-sm font-medium focus:outline-none ${
                      activeTab === tab
                        ? "text-black border-b-2 border-[#EC5F34]"
                        : "text-gray-500"
                    }`}
                    onClick={() => {
                      setActiveTab(tab);
                      setSelectedTenant(null);
                      setSelectedProperty(null);
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Date Range Selector */}
        {showHeader && (
          <DateRangeSelector
            onDateChange={(start, end) => {
              setStartDate(start);
              setEndDate(end);
            }}
          />
        )}

        {/* Tab Content */}
        <div className="px-4 md:px-12 pb-12">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default OverviewHeader;
