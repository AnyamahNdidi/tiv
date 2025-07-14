import React from "react";
import { LandlordDetailsType } from "./landlordDataType";

const DetailsSection = ({ landlord }: { landlord: LandlordDetailsType }) => (
  <div className="bg-white rounded-xl p-6 space-y-6 shadow-sm">
    <h3 className="text-sm sm:text-base font-semibold text-[#101828]">
      Landlord details
    </h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-[#475467]">
      <DetailItem label="First name" value={landlord?.first_name} />
      <DetailItem label="Last name" value={landlord?.last_name} />
      <DetailItem label="Phone number" value={landlord?.phone} />
      <DetailItem label="Email address" value={landlord?.email} />
    </div>
  </div>
);

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-xs text-[#667085]">{label}</p>
    <p className="font-medium text-[#101828] mt-1">{value}</p>
  </div>
);

export default DetailsSection;
