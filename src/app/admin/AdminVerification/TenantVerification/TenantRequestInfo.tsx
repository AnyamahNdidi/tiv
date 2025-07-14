import React from "react";
import { RequestData } from "./TenantVerificationDataTypes";

const RequestInfo: React.FC<{ request: RequestData }> = ({ request }) => (
  <div className="bg-white rounded-xl p-6 py-8">
    <h3 className="text-sm font-medium text-gray-900 mb-4">Request details</h3>
    <hr className="w-full border-t border-gray-100 my-4" />
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-10 text-sm">
      <div>
        <p className="text-gray-500">Landlord name</p>
        <p className="font-medium text-gray-900">{request.landlordName}</p>
      </div>
      <div>
        <p className="text-gray-500">Tenant name</p>
        <p className="font-medium text-gray-900">{request.tenantName}</p>
      </div>
      <div>
        <p className="text-gray-500">Tenant email</p>
        <p className="font-medium text-gray-900">{request.tenantEmail}</p>
      </div>
      <div>
        <p className="text-gray-500">Tenant contact</p>
        <p className="font-medium text-gray-900">{request.tenantContact}</p>
      </div>
      <div>
        <p className="text-gray-500">Gender</p>
        <p className="font-medium text-gray-900">{request.gender}</p>
      </div>
      <div>
        <p className="text-gray-500">Date requested</p>
        <p className="font-medium text-gray-900">{request.dateRequested}</p>
      </div>
    </div>
  </div>
);

export default RequestInfo;
