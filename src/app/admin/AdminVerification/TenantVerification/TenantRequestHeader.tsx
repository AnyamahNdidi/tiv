import React from "react";
import { StatusBadge } from "@/components/StatusBadge";

interface Props {
  status: string;
  createdAt: string;
  onClose: () => void;
  onReject: () => void;
}

const RequestHeader: React.FC<Props> = ({
  status,
  createdAt,
  onClose,
  onReject,
}) => (
  <div className="flex flex-wrap justify-between items-start gap-4">
    <button
      onClick={onClose}
      className="text-sm sm:text-md text-gray-600 font-semibold"
      aria-label="Go back"
    >
      ←
    </button>

    <div className="flex-1">
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
          Tenant Verification Request
        </h2>
        <StatusBadge status={status} />
      </div>
      <p className="text-sm text-gray-500">Created at {createdAt}</p>
    </div>

    <div className="flex gap-2">
      <button className="px-4 py-2 rounded text-gray-700 bg-white text-sm font-semibold cursor-pointer">
        Accept
      </button>
      <button
        onClick={onReject}
        className="px-4 py-2 rounded bg-[#EC5F34] hover:bg-rose-600 text-white text-sm font-semibold cursor-pointer"
      >
        Reject
      </button>
    </div>
  </div>
);

export default RequestHeader;
