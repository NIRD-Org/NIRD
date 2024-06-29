import AdminHeader from "@/components/admin/AdminHeader";
import React from "react";
import LCVAView from "../../components/LCVAView";

function LCVAViewDetails() {
  return (
    <div>
      <AdminHeader>LCVA Details</AdminHeader>
      <LCVAView />
    </div>
  );
}

export default LCVAViewDetails;
