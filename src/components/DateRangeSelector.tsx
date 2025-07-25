"use client";

import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

type DateRangeLabel = "Last 7 Days" | "Last 14 Days" | "Last 30 Days";

interface DateRangeSelectorProps {
  onDateChange: (start: string, end: string) => void;
}

const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({
  onDateChange,
}) => {
  const [dateRangeLabel, setDateRangeLabel] =
    useState<DateRangeLabel>("Last 7 Days");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const updateDateRange = () => {
      const today = new Date();
      setEndDate(formatDate(today));

      const rangeMapping: Record<DateRangeLabel, number> = {
        "Last 7 Days": 7,
        "Last 14 Days": 14,
        "Last 30 Days": 30,
      };

      const newStart = new Date(today);
      newStart.setDate(today.getDate() - rangeMapping[dateRangeLabel]);
      const formattedStart = formatDate(newStart);
      setStartDate(formattedStart);
      onDateChange(formattedStart, formatDate(today));
    };

    updateDateRange();
  }, [dateRangeLabel, onDateChange]);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-5 px-4 lg:px-12">
      {/* Dropdown */}
      <div className="flex items-center gap-2 bg-white rounded-sm w-full sm:w-[180px] h-8 justify-center cursor-pointer">
        <Icon
          icon="majesticons:calendar"
          width="16"
          height="16"
          className="text-gray-400"
        />
        <select
          className="text-xs sm:text-sm font-medium bg-transparent border-none focus:outline-none cursor-pointer"
          value={dateRangeLabel}
          onChange={(e) => setDateRangeLabel(e.target.value as DateRangeLabel)}
        >
          <option value="Last 7 Days">Last 7 Days</option>
          <option value="Last 14 Days">Last 14 Days</option>
          <option value="Last 30 Days">Last 30 Days</option>
        </select>
      </div>

      {/* Display Date Range */}
      <div className="flex gap-2 items-center text-sm">
        <span className="bg-gray-200 rounded-sm w-[120px] h-8 flex items-center justify-center text-center">
          {startDate}
        </span>
        <span>-</span>
        <span className="bg-gray-200 rounded-sm w-[120px] h-8 flex items-center justify-center text-center">
          {endDate}
        </span>
      </div>
    </div>
  );
};

export default DateRangeSelector;
