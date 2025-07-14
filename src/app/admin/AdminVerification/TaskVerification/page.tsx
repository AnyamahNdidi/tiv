"use client";
import React, { useState } from "react";
import TaskTable from "./TaskTable";
import TaskDetails from "./TaskDetails";
import { TaskData } from "./TaskDataType";
import { useGetWorkplaceVerificationsQuery } from "@/lib/redux/api/verificationApi";

export default function Task() {
  const [selectedTask, setSelectedTask] = useState<TaskData | null>(null);
  const { data: verificationData, isLoading } =
    useGetWorkplaceVerificationsQuery({});

  return (
    <main className="">
      {selectedTask ? (
        <TaskDetails
          request={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      ) : (
        <TaskTable
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
          verificationData={verificationData}
        />
      )}
    </main>
  );
}
