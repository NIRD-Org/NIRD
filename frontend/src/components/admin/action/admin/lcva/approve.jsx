import React from "react";
import ApprovalForm from "../../components/ApprovalForm"; 
import LCVAView from "./cview";

const LCVAApprovalPage = () => {
  return (
    <ApprovalForm
      endpoint="/api/v1/lcva"
      headerText="LCVA Details"
      DetailsView={LCVAView}
    />
  );
};

export default LCVAApprovalPage;
