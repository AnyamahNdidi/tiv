"use client";
import React, { useState } from "react";
import LandlordTable from "./LandlordTable";
import LandlordProfile from "./LandlordProfile";
import { LandlordDetailsType } from "./landlordDataType";
import { useGetVerificationProfileQuery } from "@/lib/redux/api/verificationApi";

export default function Verification() {
  const [selectedLandlord, setSelectedLandlord] =
    useState<LandlordDetailsType | null>(null);
  const {
    data: verificationData,
    isLoading,
    error,
  } = useGetVerificationProfileQuery({});
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
    />
  );
}
