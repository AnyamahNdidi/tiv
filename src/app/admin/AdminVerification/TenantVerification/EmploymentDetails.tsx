import React from "react";
import { Icon } from "@iconify/react";
import { EmploymentCheck } from "./TenantVerificationDataTypes";

interface Props {
  data: EmploymentCheck;
}

const EmploymentDetails: React.FC<Props> = ({ data }) => {
  return (
    <div className="space-y-6 mt-4">
      <div className="flex justify-between">
        <span className="text-gray-600">Line Manager Check</span>
        <span className="text-gray-900 font-medium">
          {data.lineManagerCheck}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-600">ID & Income Check</span>
        <span className="text-gray-900 font-medium">
          {data.idAndIncomeCheck}
        </span>
      </div>

      <hr className="w-full border-t border-gray-100 my-4" />

      <div>
        <h4 className="text-sm font-medium text-gray-900 mt-4 mb-2">Uploads</h4>
        {data?.uploads?.length === 0 ? (
          <p className="text-sm text-gray-400 italic">No documents uploaded.</p>
        ) : (
          <ul className="space-y-3">
            {data?.uploads?.map((upload, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between px-4 py-3 border border-gray-100 rounded-md bg-gray-50"
              >
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <Icon icon="ph:file" className="text-lg text-gray-500" />
                  {upload?.name}
                </div>
                <a href={upload.url} target="_blank" rel="noopener noreferrer">
                  <button className="flex items-center text-sm px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-100">
                    <Icon icon="tabler:download" className="mr-1" />
                    Download
                  </button>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EmploymentDetails;
