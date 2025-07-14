import { verificationSummary } from "@/data/verificationData";

const Header = () => {
  return (
    <div className="flex flex-col justify-center gap-6 md:p-">
      <div className="space-y-1">
        <h1 className="font-extrabold text-[24px] md:text-[28px]">Overview</h1>
        <p className="text-[14px] text-gray-600">
          View and manage tenant verification requests
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex gap-4 mt-2 mb-4">
        <div className="bg-white p-4 rounded-md shadow w-full sm:w-[280px] md:w-[350px]">
          <h3 className="text-lg font-bold">
            {verificationSummary.totalRequests}
          </h3>
          <p className="text-[14px] text-gray-600">Total request sent</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow w-full sm:w-[280px] md:w-[350px]">
          <h3 className="text-lg font-bold">
            {verificationSummary.completedVerifications}
          </h3>
          <p className="text-[14px] text-gray-600">Completed verification</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow w-full sm:w-[280px] md:w-[350px]">
          <h3 className="text-lg font-bold">
            {verificationSummary.pendingVerifications}
          </h3>
          <p className="text-[14px] text-gray-600">Pending verifications</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
