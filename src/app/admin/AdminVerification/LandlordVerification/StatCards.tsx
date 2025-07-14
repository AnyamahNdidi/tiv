import React from "react";

const StatCard = ({ title, value }: { title: string; value: number }) => (
  <div className="bg-white p-4 rounded-xl shadow-sm">
    <p className="text-sm sm:text-base text-[#475467]">{title}</p>
    <p className="text-xl sm:text-2xl font-semibold text-[#101828] mt-2">
      {value}
    </p>
  </div>
);

export default StatCard;
