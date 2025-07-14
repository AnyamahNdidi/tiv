export const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles: Record<string, string> = {
    Pending: "bg-yellow-200 text-yellow-700",
    Inactive: "bg-red-200 text-red-700",
    Failed: "bg-red-200 text-red-700",
    Blocked: "bg-red-200 text-red-700",
    Due: "bg-yellow-200 text-yellow-800",
    Completed: "bg-green-200 text-green-700",
    Cancelled: "bg-red-200 text-red-700",
    active: "bg-green-200 text-green-700",
    Active: "bg-green-200 text-green-700",
    successful: "bg-green-200 text-green-700",
    Activated: "bg-green-200 text-green-700",
    Evicted: "bg-red-200 text-red-700",
    Deactivated: "bg-red-200 text-red-700",
    pending: "bg-yellow-200 text-yellow-700",
    Ongoing: "bg-yellow-200 text-yellow-700",
    Suspended: "bg-yellow-200 text-yellow-700",
    completed: "bg-green-200 text-green-700",
    pass: "bg-green-200 text-green-700",
    Passed: "bg-green-200 text-green-700",
    fail: "bg-red-200 text-red-700",
    Flat: "bg-blue-200 text-blue-700",
    Bungalow: "bg-purple-200 text-purple-700",
    Duplex: "bg-indigo-200 text-indigo-700",
    "Self-Contain": "bg-teal-200 text-teal-700",
    initiate: "bg-blue-200 text-blue-700",
  };

  return (
    <span
      className={`px-2 py-1 rounded-sm text-xs font-semibold ${
        statusStyles[status] || "bg-white border border-gray-200 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
};
