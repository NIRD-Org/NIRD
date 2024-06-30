import AdminHeader from "@/components/admin/AdminHeader";
import React from "react";
import TrainingView from "./cview";

function TrainingViewDetails() {
  return (
    <div>
      <AdminHeader>Training Details</AdminHeader>
      <TrainingView />
    </div>
  );
}

export default TrainingViewDetails;
