"use client";
import React, { useState } from "react";
import LandlordTable from "./LandlordTable";
import LandlordProfile from "./LandlordProfile";
import { LandlordDetailsType } from "./landlordDataType";
import { useGetVerificationProfileQuery } from "@/lib/redux/api/verificationApi";

const ITEMS_PER_PAGE = 6;
export default function Verification() {
  const [selectedLandlord, setSelectedLandlord] =
    useState<LandlordDetailsType | null>(null);

  const [filters, setFilters] = useState({
    search: "",
    search_by_day: "",
    date_from: "",
    date_to: "",
    page: 1,
    page_size: ITEMS_PER_PAGE,
  });
  const {
    data: verificationData,
    isLoading,
    error,
  } = useGetVerificationProfileQuery(
    Object.fromEntries(
      Object.entries(filters).filter(([_, value]) => value !== "")
    )
  );
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#EC5F34]"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error loading verification data</div>;
  }

  return selectedLandlord ? (
    <LandlordProfile
      landlord={selectedLandlord}
      onBack={() => setSelectedLandlord(null)}
    />
  ) : (
    <LandlordTable
      setSelectedLandlord={setSelectedLandlord}
      selectedLandlord={null}
      verificationData={verificationData}
      filters={filters}
      setFilters={setFilters as any}
    />
  );
}
