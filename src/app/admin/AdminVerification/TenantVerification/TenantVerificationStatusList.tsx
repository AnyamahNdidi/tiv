import React from "react";
import { Icon } from "@iconify/react";
import { StatusBadge } from "@/components/StatusBadge";
import EmploymentDetails from "./EmploymentDetails";
import { VerificationChecks } from "./TenantVerificationDataTypes";
import { SectionKey } from "./TenantVerificationDataTypes"; // adjust path if needed

interface Props {
  checks: VerificationChecks;
  openSections: Record<SectionKey, boolean>;
  toggleSection: (section: SectionKey) => void;
}

const VerificationStatusList: React.FC<Props> = ({
  checks,
  openSections,
  toggleSection,
}) => {
  return (
    <div className="bg-white rounded-xl p-6 py-8">
      <h3 className="text-md font-semibold text-gray-900 mb-4">
        Verification status
      </h3>
      <ul className="space-y-6 text-sm">
        {/* Identity Check */}
        <li className="border border-gray-100 rounded-xl py-4 px-2">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection("identity_check")}
          >
            <div className="flex gap-4 items-center">
              <span className="text-gray-700 font-semibold">
                Identity check
              </span>
              <StatusBadge status={checks?.identity_check} />
            </div>
            <Icon
              icon={`mdi:chevron-${
                openSections?.identity_check ? "up" : "down"
              }`}
              className="text-gray-500 w-5 h-5"
            />
          </div>
        </li>

        {/* Credit Check */}
        <li className="border border-gray-100 rounded-xl py-4 px-2">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleSection("credit_check")}
          >
            <div className="flex gap-4 items-center">
              <span className="text-gray-700 font-semibold">Credit check</span>
              <StatusBadge status={checks?.credit_check} />
            </div>
            <Icon
              icon={`mdi:chevron-${openSections?.credit_check ? "up" : "down"}`}
              className="text-gray-500 w-5 h-5"
            />
          </div>
        </li>

        {/* Employment Check */}
        <li className="border border-gray-100 rounded-xl py-4 px-2">
          <div
            className="flex items-center justify-between cursor-pointer mb-2"
            onClick={() => toggleSection("employment_check")}
          >
            <div className="flex gap-4 items-center">
              <span className="text-gray-700 font-semibold">
                Employment check
              </span>
              <StatusBadge status={checks?.employment_check as any} />
            </div>
            <Icon
              icon={`mdi:chevron-${
                openSections?.employment_check ? "up" : "down"
              }`}
              className="text-gray-500 w-5 h-5"
            />
          </div>

          {openSections?.employment_check && (
            <EmploymentDetails data={checks?.employment_check} />
          )}
        </li>
      </ul>
    </div>
  );
};

export default VerificationStatusList;
